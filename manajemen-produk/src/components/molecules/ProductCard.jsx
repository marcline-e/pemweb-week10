import Button from "../atoms/Button";
import { formatPrice } from "../../utils/formatPrice";

// Molecule: satu kartu produk (ID, nama, harga, tombol Edit & Hapus)
function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <span className="product-id">ID: {product.id}</span>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">{formatPrice(product.price)}</p>

      <div className="product-actions">
        <Button variant="secondary" size="sm" onClick={() => onEdit(product)}>
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(product)}>
          Hapus
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;