const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/supplier_product_crud')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Cấu hình view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Cấu hình session
app.use(
  session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

// Truyền session vào tất cả view
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Routes
const indexRoutes = require('./routes/index');
const supplierRoutes = require('./routes/suppliers');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

app.use('/', indexRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);
app.use('/auth', authRoutes);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
