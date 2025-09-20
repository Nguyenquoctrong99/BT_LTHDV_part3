const Supplier = require('../models/Supplier');

exports.index = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('suppliers/index', { suppliers });
};

exports.form = async (req, res) => {
  const id = req.params.id;
  const supplier = id ? await Supplier.findById(id) : {};
  res.render('suppliers/form', { supplier });
};

exports.create = async (req, res) => {
  const { id, name, address, phone } = req.body;
  if (id) {
    await Supplier.findByIdAndUpdate(id, { name, address, phone });
  } else {
    await Supplier.create({ name, address, phone });
  }
  res.redirect('/suppliers');
};

exports.delete = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.redirect('/suppliers');
};
