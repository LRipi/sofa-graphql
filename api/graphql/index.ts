import {makeSchema, queryComplexityPlugin} from "@nexus/schema";
import {Post} from "./Post";
import {User} from "./User";
import {nexusSchemaPrisma} from "nexus-plugin-prisma/schema";
import path from "path";
import {GraphQLServer} from "graphql-yoga";
import {PrismaClient} from "@prisma/client/scripts/default-index";
import {createRateLimitRule} from 'graphql-rate-limit';
import {shield} from "graphql-shield";
import {applyMiddleware} from "graphql-middleware";

/**
 * This function allows to create the API schema, to launch the server
 * GraphQL and return the schema for initialization of the REST API.
 * @param db
 */
export default function (db: PrismaClient) {
    const rateLimitUserRule = createRateLimitRule({identifyContext: (ctx) => ctx.id});
    const rateLimitDraftsRule = createRateLimitRule({identifyContext: (ctx) => ctx.id});

    const permissions = shield({
        Query: {
            user: rateLimitUserRule({window: "1min", max: 10}),
            drafts: rateLimitDraftsRule({window: "1min", max: 10})
        }
    });

    /**
     * Creation of schemas from the types defined in the imported folders
     */
    const schema = makeSchema({
        types: [
            Post, User
        ],
        plugins: [
            nexusSchemaPrisma(),
            queryComplexityPlugin()
        ],
        outputs: {
            schema: path.join(__dirname, '../generated/schema.graphql'),
            typegen: path.join(__dirname, '../generated/typings.ts'),
        },
    })

    applyMiddleware(schema, permissions)

    /**
     * Permet l'initialisation du serveur et d'utiliser prisma
     */
    const server = new GraphQLServer({
        schema,
        context: ctx => ({
            ...ctx,
            db
        })
    })

    server.start(() => console.log(`GraphQL server is running on http://localhost:4000`));
    return schema;
}
