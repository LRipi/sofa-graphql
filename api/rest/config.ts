import express from 'express';
import session from "express-session";
import bodyParser from "body-parser";

import cors = require('cors');
import compression = require('compression');
import helmet = require('helmet');
import cookieParser = require('cookie-parser');
import logger = require('morgan');
import rateLimit = require('express-rate-limit');

/**
 * This feature allows you to configure express to receive REST calls,
 * to generate logs and protect this endpoint.
 * @param app Application express
 */
export default function (app: express.Express) {
    // Define request limiter per user to avoid DOS attack
    const limiterOption: rateLimit.Options = {
        windowMs: 60 * 1000, // 15 minutes
        max: 10 // limit each IP to 10 requests per windowMs
    };
    const limiter = rateLimit(limiterOption);

    // Protections against attack
    const corsOptions: cors.CorsOptions = {
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"]
    };

    // Minimize risk of XSS attacks by restricting the client from reading the cookie
    // and only send cookie over https
    const sessionOptions: session.SessionOptions = {
        secret: 'external-api',
        name: 'external-api',
        saveUninitialized: true,
        resave: true,
        cookie: {
            httpOnly: true,
            secure: true,
            maxAge: 60000 * 60 * 24
        }
    };

    app.use(bodyParser.json());
    app.use(cors(corsOptions));
    app.use(session(sessionOptions));
    app.use(helmet());
    app.use(compression());
    app.use(limiter);
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(logger('dev'));
}
