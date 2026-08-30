import { useState } from 'react'
import './App.css'
import costifyLogo from './assets/images/costify-logo.png'

type CostItem = {
  id: number
  name: string
  amount: string
}

type CalculationMode = 'markup' | 'margin' | 'manual'

function App() {
  const [productName, setProductName] = useState('')
  const [productQuantity, setProductQuantity] = useState('1')

  const [calculationMode, setCalculationMode] =
    useState<CalculationMode>('markup')

  const [markupPercent, setMarkupPercent] = useState('30')
  const [marginPercent, setMarginPercent] = useState('30')
  const [manualSellingPrice, setManualSellingPrice] = useState('')

  const [costItems, setCostItems] = useState<CostItem[]>([
    {
      id: 1,
      name: '',
      amount: '',
    },
  ])

  const addCostItem = () => {
    setCostItems((currentItems) => [
      ...currentItems,
      {
        id: Date.now(),
        name: '',
        amount: '',
      },
    ])
  }

  const removeCostItem = (id: number) => {
    setCostItems((currentItems) => {
      if (currentItems.length === 1) {
        return currentItems
      }

      return currentItems.filter((item) => item.id !== id)
    })
  }

  const updateCostItem = (
    id: number,
    field: 'name' | 'amount',
    value: string,
  ) => {
    setCostItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    )
  }

  const resetCalculator = () => {
    setProductName('')
    setProductQuantity('1')

    setCalculationMode('markup')

    setMarkupPercent('30')
    setMarginPercent('30')
    setManualSellingPrice('')

    setCostItems([
      {
        id: 1,
        name: '',
        amount: '',
      },
    ])
  }

  const totalModal = costItems.reduce((total, item) => {
    const amount = Number(item.amount) || 0

    return total + amount
  }, 0)

  const quantity = Number(productQuantity) || 0

  const hppPerUnit =
    quantity > 0
      ? totalModal / quantity
      : 0

  const markup = Math.max(
    Number(markupPercent) || 0,
    0,
  )

  const margin = Math.max(
    Number(marginPercent) || 0,
    0,
  )

  const manualPrice = Math.max(
    Number(manualSellingPrice) || 0,
    0,
  )

  let targetProfitPerUnit = 0
  let calculatedSellingPrice = 0

  if (calculationMode === 'markup') {
    targetProfitPerUnit =
      hppPerUnit * (markup / 100)

    calculatedSellingPrice =
      hppPerUnit + targetProfitPerUnit
  }

  if (calculationMode === 'margin') {
    if (margin > 0 && margin < 100) {
      calculatedSellingPrice =
        hppPerUnit / (1 - margin / 100)

      targetProfitPerUnit =
        calculatedSellingPrice - hppPerUnit
    }
  }

  if (calculationMode === 'manual') {
    calculatedSellingPrice = manualPrice

    targetProfitPerUnit =
      calculatedSellingPrice - hppPerUnit
  }

  const finalSellingPrice =
    calculationMode === 'manual'
      ? calculatedSellingPrice
      : calculatedSellingPrice > 0
        ? Math.ceil(calculatedSellingPrice / 500) * 500
        : 0

  const actualProfitPerUnit =
    finalSellingPrice - hppPerUnit

  const totalPotentialProfit =
    actualProfitPerUnit * quantity

  const actualMarkup =
    hppPerUnit > 0
      ? (actualProfitPerUnit / hppPerUnit) * 100
      : 0

  const actualMargin =
    finalSellingPrice > 0
      ? (actualProfitPerUnit / finalSellingPrice) * 100
      : 0

  const isLoss =
    finalSellingPrice > 0 &&
    actualProfitPerUnit < 0

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const getModeLabel = () => {
    if (calculationMode === 'markup') {
      return 'Markup'
    }

    if (calculationMode === 'margin') {
      return 'Margin'
    }

    return 'Harga Jual Manual'
  }

  return (
    <main className="app">
      <div className="app-container">
        <header className="app-header">
          <img
            src={costifyLogo}
            alt="Costify"
            className="costify-logo"
          />

          <p>Calculate Smart. Sell Confident.</p>
        </header>

        <section className="calculator-card">
          <div className="section-header">
            <h2>Informasi Produk</h2>

            <p>
              Masukkan informasi dasar produk yang ingin dihitung.
            </p>
          </div>

          <div className="product-form">
            <div className="form-group">
              <label htmlFor="productName">
                Nama Produk
              </label>

              <input
                id="productName"
                type="text"
                placeholder="Contoh: Keychain Custom"
                value={productName}
                onChange={(event) =>
                  setProductName(event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="productQuantity">
                Jumlah Produk
              </label>

              <input
                id="productQuantity"
                type="number"
                min="1"
                value={productQuantity}
                onChange={(event) =>
                  setProductQuantity(event.target.value)
                }
              />
            </div>
          </div>
        </section>

        <section className="calculator-card cost-card">
          <div className="section-title-row">
            <div className="section-header">
              <h2>Komponen Biaya</h2>

              <p>
                Tambahkan seluruh biaya yang digunakan
                untuk membuat produk.
              </p>
            </div>

            <button
              type="button"
              className="add-cost-button"
              onClick={addCostItem}
            >
              + Tambah Biaya
            </button>
          </div>

          <div className="cost-list">
            {costItems.map((item, index) => (
              <div
                className="cost-item"
                key={item.id}
              >
                <div className="cost-number">
                  {index + 1}
                </div>

                <div className="form-group cost-name">
                  <label htmlFor={`cost-name-${item.id}`}>
                    Nama Biaya
                  </label>

                  <input
                    id={`cost-name-${item.id}`}
                    type="text"
                    placeholder="Contoh: Filament"
                    value={item.name}
                    onChange={(event) =>
                      updateCostItem(
                        item.id,
                        'name',
                        event.target.value,
                      )
                    }
                  />
                </div>

                <div className="form-group cost-amount">
                  <label htmlFor={`cost-amount-${item.id}`}>
                    Nominal
                  </label>

                  <div className="currency-input">
                    <span>Rp</span>

                    <input
                      id={`cost-amount-${item.id}`}
                      type="number"
                      min="0"
                      placeholder="0"
                      value={item.amount}
                      onChange={(event) =>
                        updateCostItem(
                          item.id,
                          'amount',
                          event.target.value,
                        )
                      }
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="remove-cost-button"
                  onClick={() =>
                    removeCostItem(item.id)
                  }
                  disabled={costItems.length === 1}
                  aria-label={`Hapus biaya ${index + 1}`}
                  title="Hapus biaya"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cost-summary">
            <div>
              <span className="summary-label">
                Total Modal
              </span>

              <span className="summary-description">
                Total seluruh komponen biaya
              </span>
            </div>

            <strong className="summary-value">
              {formatRupiah(totalModal)}
            </strong>
          </div>

          <div className="cost-summary">
            <div>
              <span className="summary-label">
                HPP per Unit
              </span>

              <span className="summary-description">
                Total modal ÷ jumlah produk
              </span>
            </div>

            <strong className="summary-value">
              {formatRupiah(hppPerUnit)}
            </strong>
          </div>
        </section>

        <section className="calculator-card cost-card">
          <div className="section-header">
            <h2>Harga & Profit</h2>

            <p>
              Pilih metode yang ingin digunakan untuk menentukan
              harga jual produk.
            </p>
          </div>

          <div className="calculation-mode">
            <button
              type="button"
              className={
                calculationMode === 'markup'
                  ? 'mode-button active'
                  : 'mode-button'
              }
              onClick={() =>
                setCalculationMode('markup')
              }
            >
              Markup
            </button>

            <button
              type="button"
              className={
                calculationMode === 'margin'
                  ? 'mode-button active'
                  : 'mode-button'
              }
              onClick={() =>
                setCalculationMode('margin')
              }
            >
              Margin
            </button>

            <button
              type="button"
              className={
                calculationMode === 'manual'
                  ? 'mode-button active'
                  : 'mode-button'
              }
              onClick={() =>
                setCalculationMode('manual')
              }
            >
              Harga Jual Manual
            </button>
          </div>

          <div className="target-input-area">
            {calculationMode === 'markup' && (
              <div className="form-group">
                <label htmlFor="markupPercent">
                  Target Markup (%)
                </label>

                <input
                  id="markupPercent"
                  type="number"
                  min="0"
                  step="1"
                  value={markupPercent}
                  onChange={(event) =>
                    setMarkupPercent(event.target.value)
                  }
                />
              </div>
            )}

            {calculationMode === 'margin' && (
              <div className="form-group">
                <label htmlFor="marginPercent">
                  Target Margin (%)
                </label>

                <input
                  id="marginPercent"
                  type="number"
                  min="0"
                  max="99.99"
                  step="1"
                  value={marginPercent}
                  onChange={(event) =>
                    setMarginPercent(event.target.value)
                  }
                />

                {margin >= 100 && (
                  <span className="input-error">
                    Margin harus lebih kecil dari 100%.
                  </span>
                )}
              </div>
            )}

            {calculationMode === 'manual' && (
              <div className="form-group">
                <label htmlFor="manualSellingPrice">
                  Harga Jual
                </label>

                <div className="currency-input">
                  <span>Rp</span>

                  <input
                    id="manualSellingPrice"
                    type="number"
                    min="0"
                    placeholder="Contoh: 3000"
                    value={manualSellingPrice}
                    onChange={(event) =>
                      setManualSellingPrice(
                        event.target.value,
                      )
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <div className="cost-summary">
            <div>
              <span className="summary-label">
                Profit Target per Unit
              </span>

              <span className="summary-description">
                Keuntungan sebelum penyesuaian harga
              </span>
            </div>

            <strong className="summary-value">
              {formatRupiah(targetProfitPerUnit)}
            </strong>
          </div>

          <div className="cost-summary">
            <div>
              <span className="summary-label">
                Harga Jual Hitung
              </span>

              <span className="summary-description">
                Harga hasil metode perhitungan
              </span>
            </div>

            <strong className="summary-value">
              {formatRupiah(calculatedSellingPrice)}
            </strong>
          </div>

          <div className="cost-summary">
            <div>
              <span className="summary-label">
                {calculationMode === 'manual'
                  ? 'Harga Jual Digunakan'
                  : 'Harga Jual Rekomendasi'}
              </span>

              <span className="summary-description">
                {calculationMode === 'manual'
                  ? 'Harga jual yang kamu tentukan'
                  : 'Dibulatkan ke atas ke kelipatan Rp500'}
              </span>
            </div>

            <strong className="summary-value">
              {formatRupiah(finalSellingPrice)}
            </strong>
          </div>

          <div className="cost-summary">
            <div>
              <span className="summary-label">
                Profit Aktual per Unit
              </span>

              <span className="summary-description">
                Harga jual akhir − HPP per unit
              </span>
            </div>

            <strong className="summary-value">
              {formatRupiah(actualProfitPerUnit)}
            </strong>
          </div>

          <div className="profit-metrics">
            <div className="metric-card">
              <span>Markup Aktual</span>

              <strong>
                {formatPercent(actualMarkup)}%
              </strong>
            </div>

            <div className="metric-card">
              <span>Margin Aktual</span>

              <strong>
                {formatPercent(actualMargin)}%
              </strong>
            </div>
          </div>

          <div className="cost-summary">
            <div>
              <span className="summary-label">
                Potensi Profit Total
              </span>

              <span className="summary-description">
                Profit aktual × jumlah produk
              </span>
            </div>

            <strong className="summary-value">
              {formatRupiah(totalPotentialProfit)}
            </strong>
          </div>
        </section>

        <section className="calculator-card final-card">
          <div className="final-header">
            <div className="section-header">
              <h2>Ringkasan Hasil</h2>

              <p>
                Ringkasan akhir perhitungan produk.
              </p>
            </div>

            <span
              className={
                isLoss
                  ? 'result-status loss'
                  : 'result-status profit'
              }
            >
              {isLoss ? 'Rugi' : 'Profit'}
            </span>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <span>Produk</span>
              <strong>
                {productName.trim() || 'Belum diisi'}
              </strong>
            </div>

            <div className="result-card">
              <span>Jumlah</span>
              <strong>
                {quantity > 0 ? quantity : 0} unit
              </strong>
            </div>

            <div className="result-card">
              <span>Metode</span>
              <strong>
                {getModeLabel()}
              </strong>
            </div>

            <div className="result-card">
              <span>HPP / Unit</span>
              <strong>
                {formatRupiah(hppPerUnit)}
              </strong>
            </div>

            <div className="result-card featured">
              <span>Harga Jual Akhir</span>
              <strong>
                {formatRupiah(finalSellingPrice)}
              </strong>
            </div>

            <div className="result-card">
              <span>Profit / Unit</span>
              <strong>
                {formatRupiah(actualProfitPerUnit)}
              </strong>
            </div>

            <div className="result-card">
              <span>Margin Aktual</span>
              <strong>
                {formatPercent(actualMargin)}%
              </strong>
            </div>

            <div className="result-card">
              <span>Potensi Profit</span>
              <strong>
                {formatRupiah(totalPotentialProfit)}
              </strong>
            </div>
          </div>

          <button
            type="button"
            className="reset-button"
            onClick={resetCalculator}
          >
            Reset Kalkulator
          </button>
        </section>
      </div>
    </main>
  )
}

export default App