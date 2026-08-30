<h1 align="center">Costify</h1>

<p align="center">
  <img src="assets/readme/costify-banner.png" alt="Costify Banner" width="100%">
</p>

<p align="center">
  <strong>Hitung Modal, HPP, Profit & Harga Jual.</strong>
</p>

<p align="center">
  A simple Flutter application for calculating production costs, HPP, profit, and selling prices.
</p>

---

## About Costify

**Costify** adalah aplikasi Flutter sederhana yang dirancang untuk membantu menghitung:

* Modal produksi
* Total biaya
* HPP per unit
* Profit
* Markup / margin
* Harga jual

Costify dibuat dengan pendekatan sederhana, fleksibel, dan mudah digunakan.

Pengguna dapat menentukan sendiri komponen biaya sesuai kebutuhan tanpa bergantung pada kategori biaya yang sudah ditentukan aplikasi.

---

## Main Concept

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
Target Profit
      ↓
Harga Jual
```

---

## Flexible Cost Input

Costify menggunakan sistem komponen biaya yang fleksibel.

Pengguna dapat menambahkan sendiri nama dan nominal biaya sesuai kebutuhan.

Contoh:

```text
Nama Komponen        Nominal

Filament             Rp15.000
Listrik               Rp2.000
Kemasan               Rp2.500
Ring Keychain         Rp1.000

+ Tambah Biaya
```

Setiap komponen dapat:

* Ditambahkan
* Diubah
* Dihapus
* Diberi nama secara manual
* Diisi nominal sesuai kebutuhan

Dengan sistem ini, Costify dapat digunakan untuk berbagai jenis produk.

---

## Core Calculation

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

### Profit

```text
Profit =
HPP × Persentase Profit
```

### Harga Jual

```text
Harga Jual =
HPP + Profit
```

Costify juga direncanakan mendukung perhitungan berdasarkan **markup**, **margin**, dan **harga jual manual**.

---

## Planned V1 Features

Costify V1 akan berfokus pada kalkulator utama.

* [ ] Input nama produk
* [ ] Input jumlah produk
* [ ] Dynamic cost components
* [ ] Tambah komponen biaya
* [ ] Edit komponen biaya
* [ ] Hapus komponen biaya
* [ ] Hitung total modal
* [ ] Hitung HPP per unit
* [ ] Target profit
* [ ] Markup calculation
* [ ] Margin calculation
* [ ] Manual selling price
* [ ] Profit per unit
* [ ] Harga jual rekomendasi
* [ ] Pembulatan harga jual
* [ ] Reset kalkulator
* [ ] Offline calculation

---

## Tech Stack

Costify dibangun menggunakan:

* **Flutter**
* **Dart**
* Local-first architecture
* Offline calculation

Untuk tahap awal, Costify tidak membutuhkan server atau layanan cloud.

Penyimpanan lokal dapat ditambahkan ketika fitur riwayat dan penyimpanan produk mulai dikembangkan.

---

## Project Structure

Struktur project awal:

```text
costify/
├── android/
├── ios/
├── lib/
├── test/
├── assets/
│   └── readme/
│       └── costify-banner.png
├── pubspec.yaml
└── README.md
```

Struktur internal `lib/` akan dikembangkan secara bertahap mengikuti kebutuhan aplikasi.

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
Harga Jual
```

### Future Development

Setelah kalkulator utama stabil, Costify dapat dikembangkan dengan fitur:

* Riwayat perhitungan
* Simpan produk
* Edit produk
* Duplicate calculation
* Database lokal
* Dashboard
* Statistik biaya
* Statistik profit
* Export data
* Backup data

---

## Development Status

**Status:** Early Development

Current progress:

* [x] Nama aplikasi ditentukan
* [x] Logo Costify dibuat
* [x] Banner Costify dibuat
* [x] GitHub repository dibuat
* [ ] Flutter project initialization
* [ ] Application structure
* [ ] Costify theme
* [ ] Calculator UI
* [ ] Calculation logic
* [ ] Dynamic cost input
* [ ] Testing

---

## Project Goal

Costify dibuat untuk membuat proses menghitung biaya produksi dan menentukan harga jual menjadi lebih sederhana.

<p align="center">
  <strong>Calculate Better. Sell Smarter.</strong>
</p>

---

<p align="center">
  <strong>Costify</strong><br>
  Built with Flutter
</p>
