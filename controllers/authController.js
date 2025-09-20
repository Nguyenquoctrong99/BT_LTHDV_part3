const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.postRegister = async (req, res) => {
  const { username, email, phone, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ username, email, phone, password: hashed });
  res.redirect('/auth/login');
};

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render('login', { error: 'Sai email hoặc mật khẩu' });
  }
  req.session.userId = user._id;
  res.redirect('/');
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/auth/login'));
};
