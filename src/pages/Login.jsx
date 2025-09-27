import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Buraya gerçek kimlik doğrulama gelecek (Supabase/Firebase/kendi API)
      // Şimdilik maket akış:
      if (!email || !pass) throw new Error("E-posta ve şifre gerekli.");
      // “başarılı giriş”
      navigate("/"); // girişten sonra anasayfaya alıyoruz (ileride /profil)
    } catch (err) {
      alert(err.message || "Giriş başarısız.");
    } finally {
  // güvenlik: formu temizle
  setEmail("");
  setPass("");
  setLoading(false);
}
  };

  return (
    <main style={{ maxWidth: 420, margin: "40px auto", padding: "24px" }}>
      <h1 style={{ marginBottom: 16 }}>Giriş Yap</h1>
      <form onSubmit={onSubmit} autoComplete="off" style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>E-posta</span>
          <input
            type="email"
            name="email"
            placeholder="ornek@posta.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            style={{ padding: "10px 12px" }}
          />
        </label>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Şifre</span>
          <input
            type="password"
            name="new-password"
            placeholder="••••••••"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            autoComplete="new-password"
            style={{ padding: "10px 12px" }}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 12px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Giriş yapılıyor..." : "Giriş yap"}
        </button>
      </form>
      <p style={{ marginTop: 12 }}>
        Hesabın yok mu? <Link to="/kayit">Kayıt ol</Link>
      </p>
    </main>
  );
}
