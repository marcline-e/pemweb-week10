import { useState } from "react";
import ProductList from "./components/organisms/ProductList";
import ProductFormModal from "./components/organisms/ProductFormModal";
import DeleteProductModal from "./components/organisms/DeleteProductModal";
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

  // Tambah: array BARU = produk lama + produk baru
  const handleAdd = ({ name, price }) => {
    const newId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProducts([...products, { id: newId, name, price }]);
    closeModal();
  };

  // Edit: array BARU, produk yang id-nya cocok diganti datanya
  const handleUpdate = ({ name, price }) => {
    setProducts(
      products.map((p) =>
        p.id === modal.product.id ? { ...p, name, price } : p
      )
    );
    closeModal();
  };

  // Hapus: array BARU berisi semua produk KECUALI yang id-nya dihapus
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    closeModal();
  };

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
        onDelete={(product) => setModal({ type: "delete", product })}
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

      {modal?.type === "delete" && (
        <DeleteProductModal
          product={modal.product}
          onClose={closeModal}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default App;