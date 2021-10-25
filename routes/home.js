const express = require('express');
const { COOKIE_BASES, COOKIE_ADDONS } = require('../data/cookies-data');
const { handlebarsHelpers } = require('../handlenars-helpers');
// const handlebarsHelpers = require('../handlenars-helpers');

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
  const { cookieBase } = req.cookies;

  const sum =
    handlebarsHelpers.findPrice(Object.entries(COOKIE_BASES), cookieBase) +
    ['coconut', 'honey'].reduce((prev, curr) => {
      return (
        prev + handlebarsHelpers.findPrice(Object.entries(COOKIE_ADDONS), curr)
      );
    }, 0);

  res.render('home/index', {
    cookie: {
      base: cookieBase,
      addons: ['coconut', 'honey'],
    },
    bases: Object.entries(COOKIE_BASES),
    addons: Object.entries(COOKIE_ADDONS),
    sum,
  });
});

module.exports = {
  homeRouter,
};
