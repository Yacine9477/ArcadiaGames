const express = require('express');
const morgan = require('morgan');
const path = require('path');
const errorHandler = require('errorhandler');
const index = require('./routes');
require('./database');


const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(index);



if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
} else {
   app.use((err, req, res, next) => {
    let code = parseInt(err.code, 10);
    if (isNaN(code)) code = 500;
    res.status(code).json({
        code: code,
        message: code === 500 ? null : err.message
    });
});
}

app.listen(port);