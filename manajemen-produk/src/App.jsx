import ProductCard from "./components/molecules/ProductCard";
import { initialProducts } from "./data/products";

function App() {
  // Sementara: cuma buat ngetes tombol, nanti diganti logic beneran
  const handleEdit = (product) => console.log("Edit:", product);
  const handleDelete = (product) => console.log("Hapus:", product);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Manajemen Produk</h1>
          <p className="subtitle">Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
      </header>

      <div className="product-grid">
        <ProductCard
          product={initialProducts[0]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;