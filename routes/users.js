const router = require('express').Router();

// controllers
const { signup, login } = require("../controllers/AuthController");
const { getSingleUser, getUsers, deleteUser} = require("../controllers/UsersController")

router.get('/', getUsers)
router.get('/:id', getSingleUser)
router.delete('/:id', deleteUser)
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
