<p align="center">
  <img src="assets/readme/costify-banner.png" alt="Costify Banner">
</p>

<h1 align="center">Costify</h1>

<p align="center">
  <strong>Calculate Smart. Sell Confident.</strong>
</p>

<p align="center">
  Simple web app untuk menghitung modal, HPP, profit, markup, margin, dan harga jual produk.
</p>

---

## ✨ Features

### 🧮 Cost Calculator

Hitung seluruh biaya produksi dalam satu tempat.

- Nama produk
- Jumlah produk
- Komponen biaya dinamis
- Tambah dan hapus komponen biaya
- Total modal
- HPP per unit

Komponen biaya tidak menggunakan kategori tetap, sehingga pengguna bebas memasukkan biaya seperti:

- Material
- Listrik
- Packaging
- Aksesoris
- Ongkos produksi
- Biaya tambahan lainnya

---

### 💰 Selling Price Calculator

Costify menyediakan tiga metode untuk menentukan harga jual.

#### Markup

Harga jual dihitung berdasarkan persentase keuntungan terhadap HPP.

```text
Profit Target = HPP × Markup
Harga Jual = HPP + Profit Target
```

#### Margin

Harga jual dihitung berdasarkan target margin dari harga jual.

```text
Harga Jual = HPP / (1 - Margin)
```

#### Manual Selling Price

Pengguna dapat menentukan harga jual sendiri dan Costify akan menghitung:

- Profit per unit
- Markup aktual
- Margin aktual
- Potensi profit total

---

### 🎯 Recommended Selling Price

Untuk mode **Markup** dan **Margin**, hasil harga jual otomatis dibulatkan ke atas ke kelipatan:

```text
Rp500
```

Contoh:

```text
HPP               Rp2.050
Markup             30%
Harga Jual Hitung  Rp2.665
Harga Rekomendasi  Rp3.000
Profit Aktual      Rp950
```

Profit aktual dihitung menggunakan **harga jual akhir setelah pembulatan**, bukan harga sebelum pembulatan.

---

### 📊 Calculation Summary

Costify menampilkan ringkasan hasil berupa:

- Nama produk
- Jumlah produksi
- Metode perhitungan
- Total modal
- HPP per unit
- Profit target
- Harga jual hitung
- Harga jual akhir
- Profit aktual per unit
- Markup aktual
- Margin aktual
- Potensi profit total
- Status profit atau rugi

---

### 💾 Local Storage

Perhitungan dapat disimpan langsung di browser menggunakan **Local Storage**.

Saat ini Costify tidak membutuhkan:

- Database server
- Akun pengguna
- Backend
- API eksternal

Data tetap tersedia selama Local Storage browser tidak dihapus.

---

### 🕘 Calculation History

Halaman **Riwayat** menyimpan seluruh perhitungan yang sudah disimpan.

Setiap riwayat menampilkan:

- Nama produk
- Tanggal perhitungan
- Jumlah produk
- Metode perhitungan
- Total modal
- HPP per unit
- Harga jual
- Profit per unit
- Markup aktual
- Margin aktual
- Potensi profit
- Komponen biaya

---

### ✏️ Edit Calculation

Perhitungan lama dapat dibuka kembali ke kalkulator.

Semua data sebelumnya otomatis dimuat sehingga pengguna dapat mengubah:

- Nama produk
- Jumlah produk
- Komponen biaya
- Nilai biaya
- Metode harga jual
- Markup
- Margin
- Harga jual manual

Saat perubahan disimpan, Costify memperbarui data lama tanpa membuat riwayat duplikat.

---

### 🗑️ Delete History

Perhitungan yang sudah tidak diperlukan dapat dihapus dari halaman **Riwayat**.

Costify meminta konfirmasi sebelum data benar-benar dihapus.

---

### 📦 Product Overview

Halaman **Produk** otomatis dibuat berdasarkan data yang tersedia di Riwayat.

Produk dengan nama yang sama akan digabung menjadi satu produk.

Contoh:

```text
RIWAYAT

Keychain Custom
Keychain Custom
Phone Stand
```

Akan menghasilkan:

```text
PRODUK

Keychain Custom
2 perhitungan

Phone Stand
1 perhitungan
```

Setiap produk menampilkan informasi terbaru berupa:

- Jumlah perhitungan
- HPP terbaru
- Harga jual terbaru
- Profit per unit
- Margin aktual
- Total modal terbaru
- Metode perhitungan
- Tanggal perhitungan terakhir
- Status profit atau rugi

Riwayat tetap menyimpan seluruh versi perhitungan sehingga perubahan biaya produk dari waktu ke waktu tetap dapat dilihat.

---

## 📱 Responsive Design

Costify dibuat agar nyaman digunakan pada desktop maupun mobile.

### Desktop

Menggunakan top navigation:

```text
Costify | Kalkulator | Riwayat | Produk
```

### Mobile

Menggunakan:

- Mobile brand header
- Bottom navigation

```text
Kalkulator | Riwayat | Produk
```

Layout kalkulator, riwayat, dan produk otomatis menyesuaikan ukuran layar.

---

## 🛠️ Tech Stack

Costify saat ini menggunakan:

- React
- TypeScript
- Vite
- React Router
- Lucide React
- CSS
- Browser Local Storage

---

## 📐 Calculation Formula

### Total Modal

```text
Total Modal = Total seluruh komponen biaya
```

### HPP per Unit

```text
HPP per Unit = Total Modal / Jumlah Produk
```

### Markup

```text
Markup (%) = Profit / HPP × 100
```

### Margin

```text
Margin (%) = Profit / Harga Jual × 100
```

### Selling Price from Markup

```text
Harga Jual = HPP + (HPP × Markup)
```

### Selling Price from Margin

```text
Harga Jual = HPP / (1 - Margin)
```

Margin harus lebih kecil dari:

```text
100%
```

### Actual Profit

```text
Profit Aktual = Harga Jual Akhir - HPP
```

### Actual Markup

```text
Markup Aktual = Profit Aktual / HPP × 100
```

### Actual Margin

```text
Margin Aktual = Profit Aktual / Harga Jual Akhir × 100
```

### Total Potential Profit

```text
Potensi Profit Total = Profit Aktual per Unit × Jumlah Produk
```

---

## 🚀 Getting Started

### Requirements

Pastikan sudah menginstal:

- Node.js
- npm
- Git

---

### Clone Repository

```bash
git clone <repository-url>
```

Masuk ke folder project:

```bash
cd costify
```

---

### Install Dependencies

```bash
npm install
```

---

### Run Development Server

```bash
npm run dev
```

Buka alamat yang ditampilkan oleh Vite di browser.

Biasanya:

```text
http://localhost:5173
```

---

### Production Build

```bash
npm run build
```

Untuk melihat hasil production build secara lokal:

```bash
npm run preview
```

---

## 📂 Project Structure

```text
costify/
├── assets/
│   └── readme/
│       └── costify-banner.png
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── costify-logo.png
│   │
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── README.md
├── index.html
├── package.json
└── vite.config.ts
```

---

## 🗺️ Development Status

### Core Calculator

- [x] React + TypeScript + Vite setup
- [x] Dynamic cost components
- [x] Total modal calculation
- [x] HPP calculation
- [x] Markup calculation
- [x] Margin calculation
- [x] Manual selling price
- [x] Recommended selling price
- [x] Rp500 price rounding
- [x] Actual profit calculation
- [x] Actual markup
- [x] Actual margin
- [x] Potential total profit

### Navigation

- [x] React Router
- [x] Desktop navigation
- [x] Mobile header
- [x] Mobile bottom navigation
- [x] Responsive layout

### Storage & History

- [x] Browser Local Storage
- [x] Save calculation
- [x] Calculation history
- [x] Edit calculation
- [x] Update existing calculation
- [x] Delete calculation
- [x] Delete confirmation

### Products

- [x] Automatic product grouping
- [x] Unique product list
- [x] Calculation count per product
- [x] Latest HPP
- [x] Latest selling price
- [x] Latest profit
- [x] Latest margin
- [x] Latest calculation date
- [x] Profit / loss status

### Next

- [ ] Repository public release
- [ ] Progressive Web App
- [ ] Web app manifest
- [ ] App icons
- [ ] Service worker
- [ ] Installable mobile experience
- [ ] Offline support
- [ ] Production deployment
- [ ] Vercel deployment

---

## 🔒 Data Storage

Costify saat ini menggunakan browser **Local Storage**.

Artinya:

- Data tersimpan pada browser dan perangkat yang digunakan.
- Data belum tersinkronisasi antarperangkat.
- Menghapus browser data atau Local Storage dapat menghapus data Costify.
- Costify saat ini tidak mengirim data perhitungan ke server eksternal.
- Costify belum membutuhkan akun pengguna.

Arsitektur penyimpanan dapat dikembangkan lebih lanjut apabila kebutuhan aplikasi bertambah.

---

## 🎯 Project Goal

Costify dibuat untuk membuat proses menentukan harga jual menjadi lebih cepat, jelas, dan mudah dipahami.

Daripada hanya menebak harga jual, Costify membantu melihat hubungan antara:

```text
Modal
  ↓
HPP
  ↓
Markup / Margin
  ↓
Harga Jual
  ↓
Profit
```

---

## 🔮 Planned Improvements

Beberapa pengembangan yang direncanakan:

- Progressive Web App
- Offline mode
- Install Costify di smartphone
- Search riwayat
- Filter riwayat
- Search produk
- Product detail page
- Backup dan restore data
- Export data
- Improved Local Storage management
- IndexedDB jika kebutuhan penyimpanan bertambah
- Production deployment
- Vercel deployment

---

## 📄 License

License akan ditentukan sebelum public release.

---

<p align="center">
  <strong>Costify</strong>
</p>

<p align="center">
  <em>Calculate Smart. Sell Confident.</em>
</p>