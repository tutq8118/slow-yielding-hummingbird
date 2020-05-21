// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const port = 8000;

const cookieParser = require('cookie-parser')

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: false
}));

const usersRoute = require('./routes/user.route');
const booksRoute = require('./routes/book.route');
const transactionsRoute = require('./routes/transaction.route');
const cookieMiddleware = require('./middlewares/cookie.middleware');

app.set("view engine", "pug");
app.set("views", "./views");
app.set('requestsCounter', 0);

app.use(cookieParser());
app.use(express.static('public'));

var count = 0;

app.get('*', (req, res, next) => {
  if (!req.cookies.test) {
    res.cookie('test', 1);
    count = 0;
  } else {
    count++
  }
  res.locals.count = count;
  next();
}, cookieMiddleware.count);

app.use('/users', usersRoute);
app.use('/books', booksRoute);
app.use('/transactions', transactionsRoute);

app.get("/", (request, response) => {
  response.render("");
});



// listen for requests :)

// const listener = app.listen(process.env.PORT, () => {
//   console.log("Your app is listening on port " + listener.address().port);
// });

app.listen(port, () => console.log(`Your app listening at http://localhost:${port}`));