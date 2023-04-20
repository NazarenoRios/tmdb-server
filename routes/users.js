const express = require("express");
const router = express.Router();

const validateUser = require("../middleware/auth");
const { register, login, validation, logout, googlelogin, persistence } = require("../controllers/auth");
const { profile, changePassword, users, user, searchUser } = require("../controllers/user");

router.post("/register", register)

router.post("/login", login);

router.get("/me",validateUser, validation)

router.get("/persistence/:id", persistence)

router.post("/logout", logout)

router.put("/googlelogin", googlelogin);

router.put("/profile/:id",profile)

router.put("/changePassword/:id",changePassword)

router.get("/",users)

router.get("/user/:id",user)

router.get("/search",searchUser)


module.exports = router;
