const express = require("express");
const app = express();
const db = require('../db');
const shortid = require("shortid");
const { get } = require("../db");
const mongoose = require('mongoose');
const Session = require('../models/session.model');
const Book = require('../models/book.model');

module.exports = {
  check: async (req, res, next) => {
    if (!req.signedCookies.sessionId) {
      var sessionId = mongoose.Types.ObjectId();
      res.cookie('sessionId', sessionId, {
        signed: true
      });
      var newSession = new Session({
        _id: sessionId,
        cart: []
      });
      newSession.save().then((r) => {
        if (r) {
          console.log(r);
        }
      });
      next();
      return;
    }

    var sessionId = req.signedCookies.sessionId;
    var data = await Session.findById(sessionId);
    var sessionCart = data.cart;
    if (!sessionCart) {
      next();
      return;
    }
    console.log(sessionCart);
    var total = sessionCart.reduce((acc, curr) => acc + curr.count, 0);
    console.log(total);

    req.sessionCart = sessionCart;
    res.locals.totalCart = total;
    res.locals.sessionCart = sessionCart;
    next();
    
  }
}