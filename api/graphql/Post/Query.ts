import {extendType} from "@nexus/schema";
import {Post} from "./";

export const Query = extendType({
    type: 'Query',
    definition(t) {
        /**
         * So here we could imagine to have the GraphQL method to be converted
         * as a GET method like so ->
         * GET /drafts
         */
        t.field('drafts', {
            nullable: false,
            type: Post.Type,
            list: true,
            complexity: ({ args, childComplexity }) => args.count * childComplexity,
            resolve(_root, _args, ctx) {
                return ctx.db.post.findMany({ where: { published: false } })
            },
        })

        /**
         * So here we could imagine to have the GraphQL method to be converted
         * as a GET method like so ->
         * GET /drafts/published
         */
        t.list.field('posts', {
            type: Post.Type,
            complexity: ({ args, childComplexity }) => args.count * childComplexity,
            resolve(_root, _args, ctx) {
                return ctx.db.post.findMany({ where: { published: true } })
            },
        })
    },
})
