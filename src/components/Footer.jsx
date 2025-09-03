// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 24,
        padding: "16px",
        textAlign: "center",
        background: "#f3f4f6",
        color: "#4b5563",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      © {new Date().getFullYear()} Vitrinim. Tüm hakları saklıdır.
    </footer>
  );
}
