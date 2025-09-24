const { app } = require('../app');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

app.use(session({
    secret: 'krypto le superchien',
    resave: false,
    saveUninitialized:false,
    cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 14
    },
    store: new MongoStore({
        mongoUrl:'mongodb+srv://ballistayacine:Codeur@cluster0.kmk7yki.mongodb.net/arcadiagames?retryWrites=true&w=majority&appName=Cluster0',
        ttl: 60 * 60 * 24 * 14
    })
}));