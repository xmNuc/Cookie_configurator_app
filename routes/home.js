const express = require('express');
const { COOKIE_BASES, COOKIE_ADDONS } = require('../data/cookies-data');
const { handlebarsHelpers } = require('../handlenars-helpers');
// const handlebarsHelpers = require('../handlenars-helpers');

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
  const { cookieBase, cookieAddons } = req.cookies;

  const addons = cookieAddons ? JSON.parse(cookieAddons) : [];

  const sum =
    (cookieBase
      ? handlebarsHelpers.findPrice(Object.entries(COOKIE_BASES), cookieBase)
      : 0) +
    addons.reduce((prev, curr) => {
      return (
        prev + handlebarsHelpers.findPrice(Object.entries(COOKIE_ADDONS), curr)
      );
    }, 0);

  res.render('home/index', {
    cookie: {
      base: cookieBase,
      addons: addons,
    },
    bases: Object.entries(COOKIE_BASES),
    addons: Object.entries(COOKIE_ADDONS),
    sum,
  });
});

module.exports = {
  homeRouter,
};
