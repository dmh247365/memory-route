exports.getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'All Routes'
  });
};

app.getRoute = (req, res) => {
  res.status(200).render('route', {
    title: 'Blarrrrg'
  });
};
