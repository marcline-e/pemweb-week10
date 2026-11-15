import { useState } from "react";
import ProductList from "./components/organisms/ProductList";
import { initialProducts } from "./data/products";

function App() {
  // State: papan tulis daftar produk, awalnya diisi data awal
  const [products, setProducts] = useState(initialProducts);

  // Sementara: cuma log ke console, nanti diganti pop-up
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

      <div className="toolbar">
        <span className="product-count">{products.length} produk</span>
      </div>

      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;