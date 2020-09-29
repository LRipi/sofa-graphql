import {extendType, intArg, stringArg} from "@nexus/schema";
import {Post} from "./";

export const Mutation = extendType({
    type: 'Mutation',
    definition(t) {
        /**
         * So here we could imagine to have the GraphQL method to be converted
         * as a POST method like so ->
         * POST /drafts
         */
        t.field('createDraft', {
            type: Post.Type,
            nullable: false,
            args: {
                title: stringArg({
                    required: true,
                    description: "The title of the new draft."
                }),
                body: stringArg({
                    required: true,
                    description: "The body of the draft."
                }),
                authorId: intArg({
                    required: true,
                    description: "The author's id of the draft."
                }),
            },
            resolve(_root, args, ctx) {
                const draft = {
                    title: args.title,
                    body: args.body,
                    authorId: args.authorId,
                    author: {
                        connect: { id: args.authorId }
                    }
                }
                return ctx.db.post.create({data: draft})
            },
        })

        /**
         * So here we could imagine to have the GraphQL method to be converted
         * as a PUT method like so ->
         * PUT /drafts/{draftId}/publish
         */
        t.field('publishDraft', {
            type: Post.Type,
            args: {
                /**
                 * How could we set this parameter as path parameters in REST
                 * with SOFA ?
                 */
                draftId: intArg({
                    required: true,
                    description: "The draft's id of the post to make it public."
                }),
            },
            resolve(_root, args, ctx) {
                return ctx.db.post.update({
                    where: { id: args.draftId },
                    data: {
                        published: true,
                    },
                });
            },
        })

        /**
         * So here we could imagine to have the GraphQL method to be converted
         * as a PUT method like so ->
         * PUT /drafts/{draftId}
         */
        t.field('updateDraft', {
            type: Post.Type,
            nullable: false,
            args: {
                /**
                 * How could we set this parameter as path parameters in REST
                 * with SOFA ?
                 */
                draftId: intArg({
                    required: true,
                    description: "The draft's id of the post to make it public."
                }),
                title: stringArg({
                    required: true,
                    description: "The title of the new draft."
                }),
                body: stringArg({
                    required: true,
                    description: "The body of the draft."
                }),
                authorId: intArg({
                    required: true,
                    description: "The author's id of the draft."
                }),
            },
            resolve(_root, args, ctx) {
                const draft = {
                    title: args.title,
                    body: args.body,
                }
                return ctx.db.post.update({where: { id: args.draftId }, data: draft})
            },
        })

        /**
         * So here we could imagine to have the GraphQL method to be converted
         * as a DELETE method like so ->
         * DELETE /drafts/{draftId}
         */
        t.field('deleteDraft', {
            type: Post.Type,
            args: {
                /**
                 * How could we set this parameter as path parameters in REST
                 * with SOFA ?
                 */
                draftId: intArg({
                    required: true,
                    description: "The draft's id of the post to make it public."
                }),
            },
            resolve(_root, args, ctx) {
                return ctx.db.post.delete({
                    where: { id: args.draftId }
                });
            },
        })
    },
})
