const express = require('express');
const { COOKIE_BASES, COOKIE_ADDONS } = require('../data/cookies-data');
const { getAddonsdFromReq } = require('../utils/get-addons-from-req');
const { handlebarsHelpers } = require('../utils/handlenars-helpers');

const orderRouter = express.Router();

orderRouter
  .get('/summary', (req, res) => {
    const { cookieBase } = req.cookies;
    const addons = getAddonsdFromReq(req);

    const sum =
      (cookieBase
        ? handlebarsHelpers.findPrice(Object.entries(COOKIE_BASES), cookieBase)
        : 0) +
      addons.reduce((prev, curr) => {
        return (
          prev +
          handlebarsHelpers.findPrice(Object.entries(COOKIE_ADDONS), curr)
        );
      }, 0);

    res.render('order/summary', {
      cookie: {
        base: cookieBase,
        addons: addons,
      },
      bases: Object.entries(COOKIE_BASES),
      addons: Object.entries(COOKIE_ADDONS),
      sum,
    });
  })

  .get('/thanks', (req, res) => {
    const { cookieBase } = req.cookies;
    const addons = getAddonsdFromReq(req);

    const sum =
      (cookieBase
        ? handlebarsHelpers.findPrice(Object.entries(COOKIE_BASES), cookieBase)
        : 0) +
      addons.reduce((prev, curr) => {
        return (
          prev +
          handlebarsHelpers.findPrice(Object.entries(COOKIE_ADDONS), curr)
        );
      }, 0);

    res
      .clearCookie('cookieBase')
      .clearCookie('cookieAddons')
      .render('order/thanks', {
        sum,
      });
  });

module.exports = {
  orderRouter,
};
