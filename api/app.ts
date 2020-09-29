import {PrismaClient} from "@prisma/client";
import graphql from './graphql'
import rest from './rest'
import './generated/typings'

/**
 * Addition of the prisma client
 */
const db = new PrismaClient();

/**
 * Initialization of the GraphQL API then REST
 */
const schema = graphql(db)
rest(schema, db);
