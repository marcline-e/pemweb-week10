import { useState } from "react";
import ProductList from "./components/organisms/ProductList";
import SearchBar from "./components/molecules/SearchBar";
import { initialProducts } from "./data/products";

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");

  // Kacamata filter: ambil produk yang namanya mengandung kata kunci
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

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
        <SearchBar value={search} onChange={setSearch} />
        <span className="product-count">{products.length} produk</span>
      </div>

      <ProductList
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <p className="footer-info">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>
    </div>
  );
}

export default App;