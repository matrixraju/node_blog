/*
|--------------------------------------------------------------------------
| Application Primary Pakages Installation
|--------------------------------------------------------------------------
|
*/
const result = require('dotenv').config();
const express = require('express');
global.app = express(); //= Define Express App As Global
global.express = express; //= Define Express As Global

const reload = require('reload');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const moment = require('moment');

let server = require('http').createServer(app);
const port = process.env.APP_PORT || 8000;
const host = process.env.APP_HOST || 'http://127.0.0.1';
//=========================================================================
/*
|--------------------------------------------------------------------------
| Application Http / Https Allow Cross Domain Request Installation
|--------------------------------------------------------------------------
|
*/


let corsOptions = {
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    preflightContinue: false,
    credentials: true
};
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: '50mb' }));     // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({                 // to support URL-encoded bodies
    extended: true,
    limit: '50mb'
}));

var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
  }));

var flash = require('connect-flash');
app.use(flash());

app.use(function (error, req, res, next) {
   
    if (error.message === "invalid json") {
        sendError(res, myCustomErrorMessage);
    } else {
        next();
    }
});
const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use(function (req, res, next) {
    res.locals.error_message = req.flash('error_message');
    res.locals.success_message = req.flash('success_message');
    res.locals.req = req;
    res.locals._ = require('lodash');
    next();
});
//=========================================================================
/*
|--------------------------------------------------------------------------
| Application Include, Helper, and Console Library Installation
|--------------------------------------------------------------------------
|
*/
require('./config/include');

Helper('string');
Console('kernal');
Console('scheduler');
//=========================================================================
/*
|--------------------------------------------------------------------------
| Application Log Generation Installation
|--------------------------------------------------------------------------
|
*/
let accessLogStream = rfs(`access-${moment().format('YYYY-MM-DD')}.log`, {
    path: path.join(__dirname, 'public/log')
});
app.use(morgan('common', { stream: accessLogStream }));
//=========================================================================
/*
|--------------------------------------------------------------------------
| Application Static path Folder Name Installation
|--------------------------------------------------------------------------
|
*/
app.use(express.static(path.join(__dirname, 'public')));
//==========================================================================

/*
|--------------------------------------------------------------------------
| Application Provider Registration
|--------------------------------------------------------------------------
|
*/
Providers('RouteServiceProvider')(app);
//==========================================================================

/*
|--------------------------------------------------------------------------
| Application  View engine Installation
|--------------------------------------------------------------------------
|
*/

var engine = require('ejs-locals');
app.engine('ejs', engine);

app.set('views', path.join(__dirname, 'app/Views'));
app.set('view engine', 'ejs');
//==========================================================================
/*
|--------------------------------------------------------------------------
| Application  create a server with Http / Https Installation
|--------------------------------------------------------------------------
|
*/
reload(app).then(function (reloadReturned) {

    if (_.toBoolean(getConfig('app.secure'))) {
        var options = {
            key: fs.readFileSync('/etc/ssl/private/ssl-cert-snakeoil.key'),
            //ssl key file path
            cert: fs.readFileSync('/etc/ssl/certs/ssl-cert-snakeoil.pem'),
            //ssl pem file path
            requestCert: true,
            rejectUnauthorized: false
        };
        server = require('https').createServer(options, app);
    }
    server.listen(port, (req, res, next) => {
        console.log("\x1b[32m%s\x1b[0m", `Node server started on : <${host}:${port}>`);
    });
}).catch(function (err) {
    console.error('Reload could not start, could not start server/sample app', err);
});
//==========================================================================