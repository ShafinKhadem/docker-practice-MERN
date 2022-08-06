var express = require('express');
var router = express.Router();
router.use(express.json());

const mongoose = require('mongoose');
const MONGO_CONN =  process.env.MONGO_CONN || 'admin:password@localhost:27017'
mongoose.connect(`mongodb://${MONGO_CONN}/users`, {authSource: "admin"}).catch(error => console.error(error));
mongoose.connection.on('error', err => {
  console.error(err);
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String
});

const User = mongoose.model('User', userSchema);

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await User.find();
  res.send(users);
});

router.post('/', async function (req, res, next) {
  const user = new User(req.body);
  res.send(await user.save());
});

router.patch('/', async function (req, res, next) {
  res.send(await User.replaceOne({email: req.body.email}, req.body));
});

router.delete('/', async function (req, res, next) {
  res.send(await User.deleteOne({email: req.body.email}));
});

module.exports = router;
