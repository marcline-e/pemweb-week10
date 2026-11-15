import Modal from "../molecules/Modal";
import Button from "../atoms/Button";
import { formatPrice } from "../../utils/formatPrice";

// Organism: pop-up konfirmasi hapus produk
function DeleteProductModal({ product, onClose, onConfirm }) {
  return (
    <Modal title="Hapus Produk?" onClose={onClose}>
      <div className="modal-body">
        <div className="delete-icon" aria-hidden="true">🗑️</div>
        <p className="delete-text">Produk yang dihapus tidak dapat dikembalikan.</p>

        <div className="product-preview">
          <span className="product-id">ID: {product.id}</span>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">{formatPrice(product.price)}</p>
        </div>
      </div>

      <div className="modal-footer">
        <Button variant="secondary" onClick={onClose}>
          Batal
        </Button>
        <Button variant="danger" onClick={() => onConfirm(product.id)}>
          Hapus Produk
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteProductModal;