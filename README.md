<h1 align="center">Costify</h1>

<p align="center">
  <img src="assets/readme/costify-banner.png" alt="Costify Banner" width="100%">
</p>

<p align="center">
  <strong>Calculate Smart. Sell Confident.</strong>
</p>

<p align="center">
  Simple web app untuk menghitung modal, HPP, profit, margin, dan harga jual.
</p>

---

## About Costify

**Costify** adalah aplikasi web sederhana yang dirancang untuk membantu proses perhitungan biaya produksi dan penentuan harga jual.

Costify membantu menghitung:

- Modal produksi
- Total biaya
- HPP per unit
- Profit
- Markup
- Profit margin
- Harga jual
- Harga jual rekomendasi

Costify dibuat dengan pendekatan **simple, flexible, responsive, dan local-first** agar nyaman digunakan melalui desktop maupun smartphone.

---

## Main Calculation Flow

Alur dasar Costify:

```text
Komponen Biaya
      ↓
Total Modal
      ↓
Jumlah Produk
      ↓
HPP per Unit
      ↓
Target Profit / Margin
      ↓
Harga Jual
```

---

## Flexible Cost Input

Costify tidak membatasi pengguna dengan kategori biaya yang sudah ditentukan.

Pengguna dapat membuat sendiri setiap komponen biaya sesuai kebutuhan.

Contoh:

```text
Nama Komponen        Nominal

Filament             Rp15.000
Listrik               Rp2.000
Kemasan               Rp2.500
Ring Keychain         Rp1.000

+ Tambah Biaya
```

Setiap komponen biaya nantinya dapat:

- Ditambahkan
- Diubah
- Dihapus
- Diberi nama secara manual
- Diisi nominal sesuai kebutuhan

Dengan sistem ini, Costify dapat digunakan untuk berbagai jenis produk dan kebutuhan bisnis.

---

## Core Calculations

### Total Modal

```text
Total Modal =
Jumlah seluruh komponen biaya
```

### HPP per Unit

```text
HPP per Unit =
Total Modal ÷ Jumlah Produk
```

### Markup

```text
Markup (%) =
Profit ÷ HPP × 100
```

### Profit Margin

```text
Margin (%) =
Profit ÷ Harga Jual × 100
```

### Harga Jual

Harga jual dapat dihitung berdasarkan target markup atau margin yang ditentukan pengguna.

Costify juga direncanakan memiliki mode harga jual manual untuk menghitung profit, markup, dan margin dari harga jual yang sudah ditentukan.

---

## Planned V1 Features

Costify V1 akan berfokus pada kalkulator utama.

- [ ] Input nama produk
- [ ] Input jumlah produk
- [ ] Dynamic cost components
- [ ] Tambah komponen biaya
- [ ] Edit komponen biaya
- [ ] Hapus komponen biaya
- [ ] Hitung total modal
- [ ] Hitung HPP per unit
- [ ] Markup calculation
- [ ] Profit margin calculation
- [ ] Manual selling price
- [ ] Profit per unit
- [ ] Harga jual rekomendasi
- [ ] Pembulatan harga jual
- [ ] Reset kalkulator
- [ ] Responsive mobile layout
- [ ] Responsive desktop layout
- [ ] Local data storage

---

## Web App & PWA

Costify dirancang sebagai web application yang dapat digunakan langsung melalui browser.

Pada tahap berikutnya, Costify akan dikembangkan menjadi **Progressive Web App (PWA)** sehingga dapat:

- Di-install ke Home Screen
- Memiliki application icon
- Dibuka seperti aplikasi biasa
- Mendukung penggunaan offline
- Berjalan di desktop maupun smartphone
- Menyimpan data secara lokal

```text
Costify Web
     ↓
Responsive Web App
     ↓
Progressive Web App
     ↓
Install to Device
```

---

## Tech Stack

Costify dibangun menggunakan:

- **React**
- **TypeScript**
- **Vite**
- **CSS**
- **Browser Local Storage**

Rencana pengembangan berikutnya:

- Progressive Web App
- Service Worker
- Offline Support
- IndexedDB
- Local Data Persistence

---

## Project Structure

Struktur awal project:

```text
costify/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── assets/
│   └── readme/
│       └── costify-banner.png
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

Struktur dapat berkembang mengikuti kebutuhan aplikasi selama development.

---

## Development Roadmap

### V1 — Core Calculator

Fokus utama:

```text
Modal
  ↓
HPP
  ↓
Profit
  ↓
Markup / Margin
  ↓
Harga Jual
```

Target V1:

- Kalkulator modal
- Dynamic cost input
- HPP per unit
- Profit calculation
- Markup calculation
- Margin calculation
- Harga jual manual
- Harga jual rekomendasi
- Responsive layout

---

### V2 — Local Data

Direncanakan:

- Riwayat perhitungan
- Simpan produk
- Edit produk
- Duplicate calculation
- Local storage
- Product history

---

### V3 — Progressive Web App

Direncanakan:

- PWA manifest
- Application icon
- Install to device
- Offline mode
- Service worker
- App-like experience

---

## Future Development

Setelah fitur utama stabil, Costify dapat dikembangkan lebih lanjut dengan:

- Dashboard
- Statistik biaya
- Statistik profit
- Product library
- Cost templates
- Export data
- Import data
- Backup data
- Restore data
- IndexedDB storage
- Data visualization
- Multi-product calculation

---

## Design Principles

Costify dikembangkan dengan beberapa prinsip utama.

### Simple

Interface dibuat sederhana agar pengguna dapat langsung memahami cara penggunaan tanpa proses belajar yang panjang.

### Flexible

Komponen biaya tidak dibatasi oleh kategori tertentu.

Pengguna bebas menentukan kebutuhan biaya sesuai produk masing-masing.

### Responsive

Costify dirancang agar dapat digunakan dengan nyaman pada:

- Desktop
- Laptop
- Tablet
- Smartphone

### Local First

Sebagian besar fitur utama dirancang agar dapat berjalan tanpa server.

Data dapat disimpan secara lokal pada perangkat pengguna.

### Offline Friendly

Ketika dukungan PWA sudah diterapkan, Costify akan tetap dapat digunakan untuk kalkulasi dasar meskipun tanpa koneksi internet.

---

## Example Calculation

Contoh sederhana:

```text
Nama Produk:
Keychain Custom

Jumlah Produk:
1

Komponen Biaya:

Filament          Rp15.000
Listrik            Rp2.000
Kemasan            Rp2.500
Ring Keychain      Rp1.000
──────────────────────────
Total Modal       Rp20.500
```

Karena jumlah produk adalah `1`:

```text
HPP per Unit
Rp20.500
```

Jika target markup:

```text
30%
```

Maka:

```text
Profit
Rp6.150

Harga Jual
Rp26.650
```

Costify kemudian dapat memberikan rekomendasi pembulatan harga jual, misalnya:

```text
Rp27.000
```

---

## Development Status

**Status:** Early Development

Current progress:

- [x] Application name finalized
- [x] Costify visual identity created
- [x] Costify web banner created
- [x] GitHub repository created
- [x] Project direction changed to Web App
- [x] Initial application concept created
- [x] V1 calculation concept created
- [ ] React + Vite + TypeScript initialization
- [ ] Project structure
- [ ] Costify design system
- [ ] Responsive layout
- [ ] Calculator UI
- [ ] Dynamic cost input
- [ ] Calculation logic
- [ ] Local storage
- [ ] PWA support
- [ ] Testing

---

## Project Goal

Costify dibuat untuk membuat proses menghitung biaya produksi dan menentukan harga jual menjadi lebih cepat, jelas, dan mudah dipahami.

Costify tidak hanya ditujukan sebagai kalkulator sederhana, tetapi sebagai alat bantu perhitungan bisnis yang fleksibel dan mudah digunakan.

<p align="center">
  <strong>Calculate Smart. Sell Confident.</strong>
</p>

---

<p align="center">
  <strong>Costify</strong><br>
  Built with React, TypeScript & Vite
</p>