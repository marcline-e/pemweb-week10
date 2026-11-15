const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // supaya bisa baca body JSON

app.use('/products', productRoutes);

// Route yang tidak terdaftar
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' });
});

// Error handler (JSON tidak valid, error database, dll)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Body bukan JSON yang valid' });
  }
  console.error(err);
  res.status(500).json({ message: 'Terjadi kesalahan pada server' });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
