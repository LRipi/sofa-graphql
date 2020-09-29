import {objectType} from "@nexus/schema";

export const Type = objectType({
    name: 'User',
    description: `This type describe the users that has sign up on the application.`,
    definition(t) {
        t.int('id', { description: "The id of the user" })
        t.string('firstName', { description: "The first name of the user" })
        t.string('lastName', { description: "The last name of the post" })
    },
});
