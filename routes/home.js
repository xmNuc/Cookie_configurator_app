const express = require('express');

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
  res.render('home/index', {
    cookie: {
      base: 'light',
      addons: ['coconut', 'honey'],
    },
    bases: Object.bases(COOKIE_BASES),
  });
});

module.exports = {
  homeRouter,
};
