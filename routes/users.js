const router = require('express').Router();

// controllers
const verifyJwt= require('../middlewares/verifyJwt')
const { signup, login } = require("../controllers/AuthController");
const { getSingleUser, getUsers, deleteUser} = require("../controllers/UsersController")

router.get('/', verifyJwt(), getUsers)
router.get('/:id', verifyJwt(), getSingleUser)
router.delete('/:id', verifyJwt(), deleteUser)
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
