import {extendType, stringArg} from "@nexus/schema";
import {User} from ".";

export const Mutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createUser', {
            type: User.Type,
            nullable: false,
            args: {
                firstName: stringArg({
                    required: true,
                    description: "The first name of the user."
                }),
                lastName: stringArg({
                    required: true,
                    description: "The last name of the user."
                }),
            },
            resolve(_root, args, ctx) {
                const draft = {
                    firstName: args.firstName,
                    lastName: args.lastName,
                }
                return ctx.db.user.create({ data: draft })
            },
        })
    },
})
