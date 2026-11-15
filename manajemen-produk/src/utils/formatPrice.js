// Mengubah angka jadi format Rupiah, contoh: 5000 -> "Rp5.000"
export function formatPrice(value) {
  return "Rp" + value.toLocaleString("id-ID");
}