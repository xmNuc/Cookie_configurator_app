const express = require('express');
const { COOKIE_ADDONS } = require('../data/cookies-data');
const { getAddonsdFromReq } = require('../utils/get-addons-from-req');

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

    if (!COOKIE_ADDONS[addonName]) {
      return res.render('error', {
        descryption: `There is no aaddon ${addonName}.`,
      });
    }

    const addons = getAddonsdFromReq(req);
    addons.push(addonName);

    res
      .cookie('cookieAddons', JSON.stringify(addons))
      .render('configurator/added', {
        addonName,
      });
  })
  .get('/delete-addon/:addonName', (req, res) => {
    const { addonName } = req.params;

    const addons = getAddonsdFromReq(req).filter(
      (addon) => addon !== addonName
    );

    res
      .cookie('cookieAddons', JSON.stringify(addons))
      .render('configurator/deleted', {
        addonName,
      });
  });
module.exports = {
  configuratorRouter,
};
