const express = require('express');
const morgan = require('morgan');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongosanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const bodyParse = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const Router = require('./routes/index');

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ['GEt', 'PATCH', 'POST', 'DELETE', 'PUT'],
        credentials: true
    })
);

app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }))
app.use(helmet());
app.use(morgan('dev'));

const limiter = rateLimit({
    max: 3000,
    window: 60 * 60 * 1000,
    message: "Too may request from this ip, please try again later"
});

app.use('api', limiter);
app.use(express.urlencoded({ extended: true }));

app.use(mongosanitize());
app.use(xss());

app.use('/api/v1',Router);

module.exports = app;