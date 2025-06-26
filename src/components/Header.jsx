<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vitrinim - Türkiye'nin İlan Platformu</title>
  <link rel="icon" type="image/png" href="favicon.png">
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
    header { background-color: #f97316; color: white; padding: 20px; text-align: center; }
    header .logo-container { display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap; }
    header .logo-container img { width: 40px; height: 40px; }
    nav { background: #f3f4f6; padding: 10px; display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; }
    nav a { text-decoration: none; color: #111827; font-weight: bold; padding: 5px 10px; }
    .hero { padding: 40px 20px; text-align: center; background: #fff7ed; }
    .hero h1 { font-size: 2em; color: #111827; }
    .hero p { font-size: 1.1em; color: #4b5563; }
    .search-box { margin: 20px auto; max-width: 600px; display: flex; flex-wrap: wrap; gap: 10px; }
    .search-box input { flex: 1 1 70%; padding: 10px; font-size: 1em; }
    .search-box button { flex: 1 1 28%; padding: 10px; background: #f97316; color: white; border: none; font-weight: bold; cursor: pointer; }
    .categories { display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; padding: 20px; }
    .category { background: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center; width: 120px; font-weight: bold; }
    .category:hover { background: #e5e7eb; cursor: pointer; }
    .form-section { max-width: 700px; margin: 40px auto; padding: 20px; background: #f9fafb; border-radius: 8px; }
    .form-section h2 { text-align: center; color: #111827; }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
    .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 4px; }
    .form-group button { background: #f97316; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .admin-panel { max-width: 900px; margin: 40px auto; background: #f3f4f6; padding: 30px; border-radius: 10px; }
    .admin-panel h2 { text-align: center; margin-bottom: 30px; color: #111827; }
    .admin-section { margin-bottom: 30px; }
    .admin-section h3 { margin-bottom: 10px; color: #4b5563; }
    .admin-table { width: 100%; border-collapse: collapse; }
    .admin-table th, .admin-table td { border: 1px solid #d1d5db; padding: 10px; text-align: left; }
    .admin-table th { background-color: #e5e7eb; }
    footer { background: #111827; color: white; text-align: center; padding: 20px; margin-top: 40px; }
    @media (max-width: 600px) {
      header .logo-container { flex-direction: column; gap: 10px; }
      .search-box { flex-direction: column; }
      .search-box input, .search-box button { flex: 1 1 100%; }
      .category { width: 100px; padding: 10px; font-size: 0.9em; }
    }
  </style>
  <meta name="description" content="Vitrinim, Türkiye'nin en güvenilir ilan platformu. Emlak, araç, 2. el eşya ve daha fazlası için ücretsiz ilan verin.">
  <meta name="keywords" content="ilan, emlak, ikinci el, araba, vitrinim, satılık, kiralık, Türkiye">
  <meta name="author" content="Serpil">
</head>
<body>
  <header>
    <div class="logo-container">
      <img src="logo.png" alt="Vitrinim Logo">
      <h1>Vitrinim</h1>
    </div>
    <p>Türkiye'nin güvenilir ilan platformu</p>
  </header>
  <nav>
    <a href="#">Ana Sayfa</a>
    <a href="#ilan-ver">İlan Ver</a>
    <a href="#kayit">Kayıt Ol</a>
    <a href="#giris">Giriş Yap</a>
    <a href="#admin">Admin Paneli</a>
    <a href="#">Kategoriler</a>
    <a href="#">Hakkımızda</a>
    <a href="#">İletişim</a>
  </nav>
  <section class="hero">
    <h1>Aradığını Bul, Satmak İstediğini Listele</h1>
    <p>Ev, arsa, ikinci el eşya ve daha fazlası için doğru yerdesin</p>
    <div class="search-box">
      <input type="text" placeholder="Ne arıyorsunuz?">
      <button>Ara</button>
    </div>
  </section>
  <section id="admin" class="admin-panel">
    <h2>Admin Paneli</h2>
    <div class="admin-section">
      <h3>Bekleyen İlanlar</h3>
      <table class="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Başlık</th>
            <th>Kullanıcı</th>
            <th>Kategori</th>
            <th>Durum</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>101</td>
            <td>Satılık Daire</td>
            <td>serpil89</td>
            <td>Emlak</td>
            <td>Beklemede</td>
            <td><button>Onayla</button> <button>Sil</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="admin-section">
      <h3>Kullanıcı Yönetimi</h3>
      <table class="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Kullanıcı Adı</th>
            <th>E-posta</th>
            <th>Rol</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>serpil89</td>
            <td>serpil@example.com</td>
            <td>Üye</td>
            <td><button>Yükselt</button> <button>Sil</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <footer>
    &copy; 2025 Vitrinim. Tüm hakları saklıdır.
  </footer>
</body>
</html>
