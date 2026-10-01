# GeoFind — MapTiler Location API

Interface HTML sederhana dan responsif untuk mengambil data lokasi menggunakan **MapTiler Geocoding API**.

## Data yang ditampilkan

- Lokasi
- Negara
- Provinsi
- Kecamatan
- Longitude
- Latitude
- Feature Type
- Link koordinat ke Google Maps

## Teknologi

- HTML5
- CSS3
- JavaScript (Fetch API)
- MapTiler Geocoding API

## Cara menjalankan

### 1. Clone repository

```bash
git clone https://github.com/USERNAME/NAMA-REPOSITORY.git
cd NAMA-REPOSITORY
```

### 2. Masukkan API Key

Buka file `config.js`, kemudian ganti:

```javascript
const MAPTILER_API_KEY = "GANTI_DENGAN_API_KEY_MAPTILER";
```

menjadi API key milik kamu.

API key dapat dibuat di:
https://cloud.maptiler.com/account/keys/

> Jangan upload API key pribadi yang tidak dibatasi. Untuk repository publik, sebaiknya gunakan key yang dibatasi berdasarkan domain/referrer jika fitur tersebut tersedia pada akun MapTiler.

### 3. Jalankan

Cara paling mudah menggunakan VS Code + Live Server:

1. Buka folder project di VS Code.
2. Klik kanan `index.html`.
3. Pilih **Open with Live Server**.
4. Masukkan lokasi, misalnya `Yogyakarta`.
5. Klik **Cari Lokasi**.

## Contoh GET Request

Format endpoint yang digunakan:

```text
https://api.maptiler.com/geocoding/{LOKASI}.json?key={API_KEY}&language=id&limit=1
```

Contoh:

```text
https://api.maptiler.com/geocoding/Yogyakarta.json?key=API_KEY&language=id&limit=1
```

## Dokumentasi API

MapTiler Geocoding API:
https://docs.maptiler.com/cloud/api/geocoding/

## Screenshot Hasil GET

> **Tambahkan screenshot hasil GET di bagian ini setelah menjalankan aplikasi.**

### Screenshot Browser

Simpan screenshot dengan nama:

```text
screenshots/hasil-browser.png
```

Kemudian ubah bagian ini menjadi:

```markdown
![Hasil GET Browser](screenshots/hasil-browser.png)
```

### Screenshot Postman

Simpan screenshot dengan nama:

```text
screenshots/hasil-postman.png
```

Kemudian tambahkan:

```markdown
![Hasil GET Postman](screenshots/hasil-postman.png)
```

## Struktur Project

```text
maptiler-location-app/
├── index.html
├── style.css
├── script.js
├── config.js
├── .gitignore
└── README.md
```

## Git Commands

Setelah membuat repository GitHub:

```bash
git init
git add .
git commit -m "feat: create MapTiler location API interface"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPOSITORY.git
git push -u origin main
```
