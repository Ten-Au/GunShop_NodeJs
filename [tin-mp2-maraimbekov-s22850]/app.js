var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const fmt = require('./utils/dateFormatting');
const authUtils = require('./utils/authUtils')


var app = express();


// add session
const session = require('express-session');
app.use(session({
  secret: 'my_secret_password',
  resave: false
}));

app.use(cors());


app.use((req,res,next) => {
  res.locals.fmt = fmt;
  next();
})






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  const admin = req.session.admin;
  res.locals.admin = admin;
  if(!res.locals.loginError){
    res.locals.loginError = undefined;
  }
  next();
});

var indexRouter = require('./routes/index');
const customerRouter = require('./routes/customerRoute');
const appointmentRouter = require('./routes/appointmentRoute')
const gunSellerRouter = require('./routes/gunSellerRoute')

const authApiRouter = require('./routes/api/AuthApiRoute')
const customerApiRouter = require('./routes/api/CustomerApiRoute');
const gunSellerApiRouter = require('./routes/api/GunSellerApiRoute');
const appointmentApiRouter = require('./routes/api/AppointmentApiRoute');

app.use('/customers/details', authUtils.permitAuthenticatedUser, customerRouter)
app.use('/customers/edit', authUtils.permitAuthenticatedUser, customerRouter)
app.use('/customers/delete', authUtils.permitOnlyForAdmin, customerRouter)

app.use('/appointments/details', authUtils.permitAuthenticatedUser, appointmentRouter)
app.use('/appointments/edit', authUtils.permitAuthenticatedUser, appointmentRouter)
app.use('/appointments/delete', authUtils.permitAuthenticatedUser, appointmentRouter)

app.use('/gunsellers/details', authUtils.permitAuthenticatedUser, gunSellerRouter)
app.use('/gunsellers/edit', authUtils.permitOnlyForAdmin, gunSellerRouter)
app.use('/gunsellers/delete', authUtils.permitOnlyForAdmin, gunSellerRouter)




// routes

app.use('/', indexRouter);
app.use('/Customers', authUtils.permitAuthenticatedUser, customerRouter);
app.use('/Appointments', authUtils.permitAuthenticatedUser, appointmentRouter)
app.use('/GunSellers', authUtils.permitAuthenticatedUser, gunSellerRouter)

// api routes
app.use('/api/auth', authApiRouter);
app.use('/api/customers', customerApiRouter);
app.use('/api/gunsellers', gunSellerApiRouter);
app.use('/api/appointments', appointmentApiRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
