import ProductCard from "../molecules/ProductCard";

// Organism: grid berisi banyak ProductCard
function ProductList({ products, onEdit, onDelete }) {
  // Conditional rendering: kalau kosong, tampilkan pesan
  if (products.length === 0) {
    return <p className="empty-state">Produk tidak ditemukan.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ProductList;