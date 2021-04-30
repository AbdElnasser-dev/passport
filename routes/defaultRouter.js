const router = require ('express').Router ();

router.get ('/', (req, res) => {
  res.render ('home', {title: 'Passport Auth'});
});

router.get ('/login', (req, res) => {
  res.render ('login', {title: 'login Page'});
});

router.get ('/register', (req, res) => {
  res.render ('register', {title: 'register Page'});
});




module.exports = router;
