import { useState } from "react";
import Modal from "../molecules/Modal";
import Button from "../atoms/Button";

// Organism: pop-up form produk, dipakai untuk mode "add" dan "edit"
function ProductFormModal({ mode, product, onClose, onSubmit }) {
  const isEdit = mode === "edit";

  // State form: kalau edit, isi awal = data lama; kalau tambah, kosong
  const [name, setName] = useState(isEdit ? product.name : "");
  const [price, setPrice] = useState(isEdit ? String(product.price) : "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // cegah halaman reload saat form dikirim

    const trimmedName = name.trim();
    const numericPrice = Number(price);

    // Validasi
    if (trimmedName === "") {
      setError("Nama produk wajib diisi.");
      return;
    }
    if (!numericPrice || numericPrice <= 0) {
      setError("Harga harus lebih dari 0.");
      return;
    }

    onSubmit({ name: trimmedName, price: numericPrice });
  };

  return (
    <Modal title={isEdit ? "Edit Produk" : "Tambah Produk"} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          {isEdit && <span className="form-id">ID: {product.id}</span>}

          <div className="form-group">
            <label htmlFor="name">Nama Produk</label>
            <input
              id="name"
              type="text"
              placeholder="Contoh: Pulpen"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Harga (Rp)</label>
            <input
              id="price"
              type="number"
              placeholder="Contoh: 5000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span className="form-hint">Harga harus lebih dari 0.</span>
          </div>

          {error && <p className="form-error">{error}</p>}
        </div>

        <div className="modal-footer">
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" variant="primary">
            {isEdit ? "Simpan Perubahan" : "Simpan Produk"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ProductFormModal;