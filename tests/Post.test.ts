import {createTestContext} from './__helpers'

const ctx = createTestContext()
it('ensures that a draft can be created and published', async () => {
    await ctx.client.send(`
    mutation {
      createUser(firstName: "Léo", lastName: "Riberon") {
        id
      }
    }
  `)
    // Create a new draft
    const draftResult = await ctx.client.send(`
    mutation {
      createDraft(title: "Nexus", body: "...", authorId: 1) {
        id
        title
        body
        published
        author {
          id
          firstName
          lastName
        }
      }
    }
  `)
    // Snapshot that draft and expect `published` to be false
    expect(draftResult).toMatchInlineSnapshot(`
    Object {
      "createDraft": Object {
        "body": "...",
        "id": 1,
        "published": false,
        "title": "Nexus",
        "author": Object {
          "id": 1,
          "firstName": "Léo",
          "lastName": "Riberon"
        },
      },
    }
  `)
    // Publish the previously created draft
    const publishResult = await ctx.client.send(`
    mutation publishDraft($draftId: Int!) {
      publish(draftId: $draftId) {
        id
        title
        body
        published
      }
    }
  `, {draftId: draftResult.createDraft.id})
    expect(publishResult).toMatchInlineSnapshot(`
    Object {
      "publish": Object {
        "body": "...",
        "id": 1,
        "published": true,
        "title": "Nexus",
      },
    }
  `)

    const persistedData = await ctx.app.db.client.post.findMany()

    expect(persistedData).toMatchInlineSnapshot(`
   Array [
     Object {
       "body": "...",
       "id": 1,
       "published": true,
       "title": "Nexus",
     },
   ]
  `)

    expect(persistedData).toMatchInlineSnapshot()
})
