module.exports = {
  ensureAuth: function (req, res, next) { 
    if (req.isAuthenticated()) {//check if the user is logged in 
      return next();  // if true run the next part of the function in the route 
    } else {
      res.redirect("/"); //if user is not logged in/authenticated redirect to the home/login page
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
};
