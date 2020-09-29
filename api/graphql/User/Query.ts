import {extendType} from "@nexus/schema";
import {User} from "./";

export const Query = extendType({
    type: 'Query',
    definition(t) {
        t.field('user', {
            nullable: false,
            type: User.Type,
            list: true,
            complexity: ({ args, childComplexity }) => args.count * childComplexity,
            resolve(_root, _args, ctx) {
                return ctx.db.user.findMany({})
            },
        })
    },
})
