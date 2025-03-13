const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex); //runs the getIndex function to render the EJS template of the home screen
router.get("/profile", ensureAuth, postsController.getProfile); //check that the user is logged in and run the .getProfile method to render the user profile
router.get("/feed", ensureAuth, postsController.getFeed); //check that the user is logged in and run the .getFeed() method 
router.get("/login", authController.getLogin); //get request that runs the .getLogin method from the authController using the /login route - takes user to the log in screen
router.post("/login", authController.postLogin); //post request that runs the .postLogin method from the authControlelr using the /login route - logs the user in 
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
