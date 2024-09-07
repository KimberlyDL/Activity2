const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const path = require('path');
const {engine} = require('express-handlebars');

//local modules
const routes = require(path.join(__dirname, 'router', 'routes.js'))(__dirname);

//server initialization
const app = express();

//set view engine
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine' , 'hbs');


//middlewares
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.errors = req.flash('errors');
    res.locals.formData = req.flash('formData');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


const db = require(path.join(__dirname, 'models'));

//routes 
app.use('/', routes);



module.exports = app;