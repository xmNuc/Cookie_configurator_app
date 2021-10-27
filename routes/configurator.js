const express = require('express');

const configuratorRouter = express.Router();

configuratorRouter
  .get('/select-base/:baseName', (req, res) => {
    const { baseName } = req.params;
    res.cookie('cookieBase', baseName).render('configurator/base-selected', {
      baseName,
    });
  })
  .get('/add-addon/:addonName', (req, res) => {
    const { addonName } = req.params;
    const { cookieAddons } = req.cookies;

    const addons = cookieAddons ? JSON.parse(cookieAddons) : [];
    addons.push(addonName);

    res
      .cookie('cookieAddons', JSON.stringify(addons))
      .render('configurator/added', {
        addonName,
      });
  });

module.exports = {
  configuratorRouter,
};
