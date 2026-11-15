import { useState } from "react";
import ProductList from "./components/organisms/ProductList";
import ProductFormModal from "./components/organisms/ProductFormModal";
import SearchBar from "./components/molecules/SearchBar";
import Button from "./components/atoms/Button";
import { initialProducts } from "./data/products";

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  // null = tertutup | {type:"add"} | {type:"edit", product} | {type:"delete", product}
  const [modal, setModal] = useState(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const closeModal = () => setModal(null);

  // Tambah: bikin array BARU = produk lama + produk baru
  const handleAdd = ({ name, price }) => {
    const newId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProducts([...products, { id: newId, name, price }]);
    closeModal();
  };

  // Edit: bikin array BARU, produk yang id-nya cocok diganti datanya
  const handleUpdate = ({ name, price }) => {
    setProducts(
      products.map((p) =>
        p.id === modal.product.id ? { ...p, name, price } : p
      )
    );
    closeModal();
  };

  // Sementara: hapus masih log ke console, pop-up-nya di langkah berikutnya
  const handleDelete = (product) => console.log("Hapus:", product);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Manajemen Produk</h1>
          <p className="subtitle">Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <Button onClick={() => setModal({ type: "add" })}>+ Tambah Produk</Button>
      </header>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <span className="product-count">{products.length} produk</span>
      </div>

      <ProductList
        products={filteredProducts}
        onEdit={(product) => setModal({ type: "edit", product })}
        onDelete={handleDelete}
      />

      <p className="footer-info">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>

      {modal?.type === "add" && (
        <ProductFormModal mode="add" onClose={closeModal} onSubmit={handleAdd} />
      )}

      {modal?.type === "edit" && (
        <ProductFormModal
          mode="edit"
          product={modal.product}
          onClose={closeModal}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}

export default App;