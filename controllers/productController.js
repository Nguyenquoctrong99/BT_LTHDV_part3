const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.index = async (req, res) => {
  const { search, supplier } = req.query;
  let filter = {};
  if (search) filter.name = { $regex: search, $options: 'i' };
  if (supplier) filter.supplier = supplier;

  const products = await Product.find(filter).populate('supplier');
  const suppliers = await Supplier.find();

  res.render('products/index', { products, suppliers, selectedSupplier: supplier, search });
};

exports.form = async (req, res) => {
  const suppliers = await Supplier.find();
  const product = req.params.id ? await Product.findById(req.params.id) : {};
  res.render('products/form', { product, suppliers });
};

exports.create = async (req, res) => {
  const { id, name, price, quantity, supplier } = req.body;
  if (id) {
    await Product.findByIdAndUpdate(id, { name, price, quantity, supplier });
  } else {
    await Product.create({ name, price, quantity, supplier });
  }
  res.redirect('/products');
};

exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
};
