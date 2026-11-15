const prisma = require('../lib/prisma');

// ---------- Helper validasi ----------
const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const validateProduct = ({ name, price }) => {
  const errors = [];
  if (typeof name !== 'string' || name.trim() === '') {
    errors.push('name wajib diisi dan berupa string');
  }
  if (typeof price !== 'number' || !Number.isInteger(price) || price < 0) {
    errors.push('price wajib diisi dan berupa angka bulat >= 0');
  }
  return errors;
};

// GET /products -> 200 + array seluruh produk
const getAllProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// GET /products/:id -> 200 + objek produk, 400 id tidak valid, 404 tidak ada
const getProductById = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'id harus berupa angka bulat positif' });

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// POST /products -> 201 + produk baru, atau 400 jika data tidak valid
const createProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body || {};
    const errors = validateProduct({ name, price });
    if (errors.length) return res.status(400).json({ message: 'Validasi gagal', errors });

    const newProduct = await prisma.product.create({
      data: { name: name.trim(), price },
    });
    res.status(201).json({ message: 'Produk berhasil dibuat', data: newProduct });
  } catch (err) {
    next(err);
  }
};

// PUT /products -> body sama dengan POST + id  { "id": 1, "name": "...", "price": 0 }
// (PUT /products/:id juga didukung, id diambil dari URL)
const updateProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body || {};
    const rawId = req.params.id ?? (req.body || {}).id;

    const id = parseId(rawId);
    const errors = validateProduct({ name, price });
    if (!id) errors.unshift('id wajib diisi dan berupa angka bulat positif');
    if (errors.length) return res.status(400).json({ message: 'Validasi gagal', errors });

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Produk tidak ditemukan' });

    const updated = await prisma.product.update({
      where: { id },
      data: { name: name.trim(), price },
    });
    res.status(200).json({ message: 'Produk berhasil diupdate', data: updated });
  } catch (err) {
    next(err);
  }
};

// DELETE /products/:id -> 200 + produk yang dihapus, 400 id tidak valid, 404 tidak ada
const deleteProduct = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'id harus berupa angka bulat positif' });

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Produk tidak ditemukan' });

    const deleted = await prisma.product.delete({ where: { id } });
    res.status(200).json({ message: 'Produk berhasil dihapus', data: deleted });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
