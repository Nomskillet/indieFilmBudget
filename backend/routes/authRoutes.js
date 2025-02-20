const express = require("express");
// require("dotenv").config();
const signup = require("../controllers/users/signup");
const login = require("../controllers/users/login");



const router = express.Router();

// ✅ 1. User Signup Route
router.post("/signup", signup);

// ✅ 2. User Login Route
router.post("/login", login);

module.exports = router;
