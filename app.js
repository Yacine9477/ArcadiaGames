const express = require('express');
const morgan = require('morgan');
const path = require('path');
const errorHandler = require('errorhandler');
const index = require('./routes');
require('./database');
const pool = require('./database/mysql');


const app = express();
exports.app = app;
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

require('./config/session.config');
require('./config/passport.config');

app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(index);

// app.get('/', async (req, res) => {
//     try {
//         const [rows] = await pool.query('SELECT * FROM test')
//         res.render('test', {data: rows});
//     } catch(e) {
//         console.error(e);
//         res.status(500).send('Erreur serveur');
//     }
// })


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