import {objectType} from "@nexus/schema";
import {User} from "../User";

export const Type = objectType({
    name: 'Post',
    description: `This type describe the post that could exist on the database.`,
    definition(t) {
        t.int('id', { description: "The id of the post" })
        t.string('title', { description: "The title of the post" })
        t.string('body', { description: "The body of the post" })
        t.boolean('published', { description: "Parameter if the post is public or not" })
        t.int('authorId', { description: "The author ID of the post"});
        t.field("author", {
            type: User.Type,
            description: "The author who wrote the post",
            async resolve(root, args, ctx) {
                return ctx.db.user.findOne({where: {id: root.authorId}});
            }
        })
    },
})
