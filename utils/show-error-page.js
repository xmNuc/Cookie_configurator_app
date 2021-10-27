function showErrorPage(req, descryption) {
  return res.render('error', { descryption });
}

module.exports = {
  showErrorPage,
};
