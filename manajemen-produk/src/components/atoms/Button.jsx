// Atom: tombol yang bisa dipakai ulang di mana saja
function Button({ children, variant = "primary", size, onClick, type = "button" }) {
  const className = `btn btn-${variant}${size === "sm" ? " btn-sm" : ""}`;

  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;