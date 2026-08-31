import { useEffect, useState } from 'react'
import {
  AlertCircle,
  Calculator as CalculatorIcon,
  CalendarDays,
  CheckCircle2,
  Clock3,
  History as HistoryIcon,
  Layers3,
  Package as PackageIcon,
  Pencil,
  ReceiptText,
  Save,
  Trash2,
  TrendingUp,
  WalletCards,
} from 'lucide-react'
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'

import './App.css'
import costifyLogo from './assets/images/costify-logo.png'

type CostItem = {
  id: number
  name: string
  amount: string
}

type CalculationMode = 'markup' | 'margin' | 'manual'

type SavedCostItem = {
  id: number
  name: string
  amount: number
}

type SavedCalculation = {
  id: string
  createdAt: string
  updatedAt?: string
  productName: string
  quantity: number
  costItems: SavedCostItem[]
  totalModal: number
  hppPerUnit: number
  calculationMode: CalculationMode
  targetValue: number
  targetProfitPerUnit: number
  calculatedSellingPrice: number
  finalSellingPrice: number
  actualProfitPerUnit: number
  actualMarkup: number
  actualMargin: number
  totalPotentialProfit: number
}

type ProductSummary = {
  key: string
  productName: string
  calculationCount: number
  latestCalculation: SavedCalculation
}

type SaveFeedback = {
  type: 'success' | 'error'
  message: string
} | null

const STORAGE_KEY = 'costify-calculations'

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

const formatDateTime = (value: string) => {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Tanggal tidak tersedia'
  }

  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

const getCalculationModeLabel = (
  mode: CalculationMode,
) => {
  if (mode === 'markup') {
    return 'Markup'
  }

  if (mode === 'margin') {
    return 'Margin'
  }

  return 'Harga Jual Manual'
}

const readSavedCalculations = (): SavedCalculation[] => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY)

    if (!storedData) {
      return []
    }

    const parsedData = JSON.parse(storedData)

    if (!Array.isArray(parsedData)) {
      return []
    }

    return parsedData
  } catch {
    return []
  }
}

const getCalculationTimestamp = (
  calculation: SavedCalculation,
) => {
  const dateValue =
    calculation.updatedAt ?? calculation.createdAt

  const timestamp = new Date(dateValue).getTime()

  return Number.isNaN(timestamp) ? 0 : timestamp
}

const buildProductSummaries = (
  calculations: SavedCalculation[],
): ProductSummary[] => {
  const groupedProducts = new Map<
    string,
    SavedCalculation[]
  >()

  calculations.forEach((calculation) => {
    const normalizedName = calculation.productName
      .trim()
      .toLocaleLowerCase('id-ID')

    const currentGroup =
      groupedProducts.get(normalizedName) ?? []

    currentGroup.push(calculation)

    groupedProducts.set(
      normalizedName,
      currentGroup,
    )
  })

  return Array.from(
    groupedProducts.entries(),
  )
    .map(([key, groupedCalculations]) => {
      const sortedCalculations = [
        ...groupedCalculations,
      ].sort(
        (a, b) =>
          getCalculationTimestamp(b) -
          getCalculationTimestamp(a),
      )

      const latestCalculation =
        sortedCalculations[0]!

      return {
        key,
        productName:
          latestCalculation.productName,
        calculationCount:
          groupedCalculations.length,
        latestCalculation,
      }
    })
    .sort(
      (a, b) =>
        getCalculationTimestamp(
          b.latestCalculation,
        ) -
        getCalculationTimestamp(
          a.latestCalculation,
        ),
    )
}

function App() {
  return (
    <div className="app-shell">
      <DesktopNavbar />
      <MobileBrandHeader />

      <div className="page-shell">
        <Routes>
          <Route
            path="/"
            element={<CalculatorPage />}
          />

          <Route
            path="/edit/:id"
            element={<CalculatorPage />}
          />

          <Route
            path="/history"
            element={<HistoryPage />}
          />

          <Route
            path="/products"
            element={<ProductsPage />}
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </div>

      <MobileBottomNav />
    </div>
  )
}

function DesktopNavbar() {
  return (
    <header className="desktop-navbar">
      <div className="navbar-container">
        <NavLink
          to="/"
          className="navbar-brand"
          aria-label="Costify"
        >
          <img
            src={costifyLogo}
            alt="Costify"
            className="navbar-logo"
          />
        </NavLink>

        <nav
          className="desktop-nav-links"
          aria-label="Navigasi utama"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? 'desktop-nav-link active'
                : 'desktop-nav-link'
            }
          >
            Kalkulator
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive
                ? 'desktop-nav-link active'
                : 'desktop-nav-link'
            }
          >
            Riwayat
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? 'desktop-nav-link active'
                : 'desktop-nav-link'
            }
          >
            Produk
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

function MobileBrandHeader() {
  return (
    <header className="mobile-brand-header">
      <NavLink
        to="/"
        className="mobile-brand-link"
        aria-label="Costify"
      >
        <img
          src={costifyLogo}
          alt="Costify"
          className="mobile-brand-logo"
        />
      </NavLink>
    </header>
  )
}

function MobileBottomNav() {
  return (
    <nav
      className="mobile-bottom-nav"
      aria-label="Navigasi mobile"
    >
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive
            ? 'mobile-nav-link active'
            : 'mobile-nav-link'
        }
      >
        <span className="mobile-nav-icon">
          <CalculatorIcon />
        </span>

        <span>Kalkulator</span>
      </NavLink>

      <NavLink
        to="/history"
        className={({ isActive }) =>
          isActive
            ? 'mobile-nav-link active'
            : 'mobile-nav-link'
        }
      >
        <span className="mobile-nav-icon">
          <HistoryIcon />
        </span>

        <span>Riwayat</span>
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive
            ? 'mobile-nav-link active'
            : 'mobile-nav-link'
        }
      >
        <span className="mobile-nav-icon">
          <PackageIcon />
        </span>

        <span>Produk</span>
      </NavLink>
    </nav>
  )
}

function CalculatorPage() {
  const { id: editId } = useParams()
  const navigate = useNavigate()

  const isEditing = Boolean(editId)

  const [productName, setProductName] = useState('')
  const [productQuantity, setProductQuantity] =
    useState('1')

  const [calculationMode, setCalculationMode] =
    useState<CalculationMode>('markup')

  const [markupPercent, setMarkupPercent] =
    useState('30')

  const [marginPercent, setMarginPercent] =
    useState('30')

  const [
    manualSellingPrice,
    setManualSellingPrice,
  ] = useState('')

  const [saveFeedback, setSaveFeedback] =
    useState<SaveFeedback>(null)

  const [costItems, setCostItems] = useState<
    CostItem[]
  >([
    {
      id: 1,
      name: '',
      amount: '',
    },
  ])

  useEffect(() => {
    if (!editId) {
      return
    }

    const savedCalculations =
      readSavedCalculations()

    const calculation =
      savedCalculations.find(
        (item) => item.id === editId,
      )

    if (!calculation) {
      setSaveFeedback({
        type: 'error',
        message:
          'Data perhitungan yang ingin diedit tidak ditemukan.',
      })

      return
    }

    setProductName(calculation.productName)

    setProductQuantity(
      String(calculation.quantity),
    )

    setCalculationMode(
      calculation.calculationMode,
    )

    if (
      calculation.calculationMode ===
      'markup'
    ) {
      setMarkupPercent(
        String(calculation.targetValue),
      )
    }

    if (
      calculation.calculationMode ===
      'margin'
    ) {
      setMarginPercent(
        String(calculation.targetValue),
      )
    }

    if (
      calculation.calculationMode ===
      'manual'
    ) {
      setManualSellingPrice(
        String(calculation.targetValue),
      )
    }

    if (
      Array.isArray(calculation.costItems) &&
      calculation.costItems.length > 0
    ) {
      setCostItems(
        calculation.costItems.map(
          (item) => ({
            id: item.id,
            name: item.name,
            amount: String(item.amount),
          }),
        ),
      )
    }
  }, [editId])

  const addCostItem = () => {
    setSaveFeedback(null)

    setCostItems((currentItems) => [
      ...currentItems,
      {
        id: Date.now(),
        name: '',
        amount: '',
      },
    ])
  }

  const removeCostItem = (
    id: number,
  ) => {
    setSaveFeedback(null)

    setCostItems((currentItems) => {
      if (currentItems.length === 1) {
        return currentItems
      }

      return currentItems.filter(
        (item) => item.id !== id,
      )
    })
  }

  const updateCostItem = (
    id: number,
    field: 'name' | 'amount',
    value: string,
  ) => {
    setSaveFeedback(null)

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
    setSaveFeedback(null)

    setCostItems([
      {
        id: 1,
        name: '',
        amount: '',
      },
    ])
  }

  const totalModal = costItems.reduce(
    (total, item) => {
      const amount =
        Number(item.amount) || 0

      return total + amount
    },
    0,
  )

  const quantity =
    Number(productQuantity) || 0

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
        hppPerUnit /
        (1 - margin / 100)

      targetProfitPerUnit =
        calculatedSellingPrice -
        hppPerUnit
    }
  }

  if (calculationMode === 'manual') {
    calculatedSellingPrice =
      manualPrice

    targetProfitPerUnit =
      calculatedSellingPrice -
      hppPerUnit
  }

  const finalSellingPrice =
    calculationMode === 'manual'
      ? calculatedSellingPrice
      : calculatedSellingPrice > 0
        ? Math.ceil(
            calculatedSellingPrice /
              500,
          ) * 500
        : 0

  const actualProfitPerUnit =
    finalSellingPrice - hppPerUnit

  const totalPotentialProfit =
    actualProfitPerUnit * quantity

  const actualMarkup =
    hppPerUnit > 0
      ? (actualProfitPerUnit /
          hppPerUnit) *
        100
      : 0

  const actualMargin =
    finalSellingPrice > 0
      ? (actualProfitPerUnit /
          finalSellingPrice) *
        100
      : 0

  const isLoss =
    finalSellingPrice > 0 &&
    actualProfitPerUnit < 0

  const getTargetValue = () => {
    if (
      calculationMode === 'markup'
    ) {
      return markup
    }

    if (
      calculationMode === 'margin'
    ) {
      return margin
    }

    return manualPrice
  }

  const saveCalculation = () => {
    if (!productName.trim()) {
      setSaveFeedback({
        type: 'error',
        message:
          'Isi nama produk terlebih dahulu sebelum menyimpan.',
      })

      return
    }

    if (quantity <= 0) {
      setSaveFeedback({
        type: 'error',
        message:
          'Jumlah produk harus lebih dari 0.',
      })

      return
    }

    if (totalModal <= 0) {
      setSaveFeedback({
        type: 'error',
        message:
          'Masukkan minimal satu komponen biaya.',
      })

      return
    }

    if (
      calculationMode ===
        'margin' &&
      margin >= 100
    ) {
      setSaveFeedback({
        type: 'error',
        message:
          'Target margin harus lebih kecil dari 100%.',
      })

      return
    }

    if (
      finalSellingPrice <= 0
    ) {
      setSaveFeedback({
        type: 'error',
        message:
          'Harga jual harus lebih dari Rp0.',
      })

      return
    }

    const savedCostItems: SavedCostItem[] =
      costItems
        .filter((item) => {
          const amount =
            Number(item.amount) || 0

          return (
            item.name.trim() !==
              '' ||
            amount > 0
          )
        })
        .map((item) => ({
          id: item.id,

          name:
            item.name.trim() ||
            'Biaya tanpa nama',

          amount:
            Number(item.amount) || 0,
        }))

    const savedCalculations =
      readSavedCalculations()

    const previousCalculation =
      editId
        ? savedCalculations.find(
            (item) =>
              item.id === editId,
          )
        : undefined

    const now =
      new Date().toISOString()

    const calculation: SavedCalculation =
      {
        id:
          editId ??
          `${Date.now()}`,

        createdAt:
          previousCalculation
            ?.createdAt ?? now,

        updatedAt:
          isEditing
            ? now
            : undefined,

        productName:
          productName.trim(),

        quantity,

        costItems:
          savedCostItems,

        totalModal,
        hppPerUnit,

        calculationMode,

        targetValue:
          getTargetValue(),

        targetProfitPerUnit,
        calculatedSellingPrice,
        finalSellingPrice,

        actualProfitPerUnit,
        actualMarkup,
        actualMargin,

        totalPotentialProfit,
      }

    try {
      let updatedCalculations:
        SavedCalculation[]

      if (isEditing) {
        const calculationExists =
          savedCalculations.some(
            (item) =>
              item.id === editId,
          )

        if (!calculationExists) {
          setSaveFeedback({
            type: 'error',
            message:
              'Data yang ingin diperbarui tidak ditemukan.',
          })

          return
        }

        updatedCalculations =
          savedCalculations.map(
            (item) =>
              item.id === editId
                ? calculation
                : item,
          )
      } else {
        updatedCalculations = [
          calculation,
          ...savedCalculations,
        ]
      }

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          updatedCalculations,
        ),
      )

      if (isEditing) {
        navigate('/history')
        return
      }

      setSaveFeedback({
        type: 'success',
        message:
          'Perhitungan berhasil disimpan.',
      })
    } catch {
      setSaveFeedback({
        type: 'error',
        message:
          isEditing
            ? 'Perubahan gagal disimpan. Coba lagi.'
            : 'Perhitungan gagal disimpan. Coba lagi.',
      })
    }
  }

  return (
    <main className="app">
      <div className="app-container">
        <div className="page-header">
          <span className="page-eyebrow">
            {isEditing
              ? 'Costify Edit'
              : 'Costify Calculator'}
          </span>

          <h1>
            {isEditing
              ? 'Edit Perhitungan'
              : 'Kalkulator'}
          </h1>

          <p>
            {isEditing
              ? 'Ubah data perhitungan yang sudah disimpan sebelumnya.'
              : 'Hitung modal, HPP, profit, margin, dan harga jual produk dalam satu tempat.'}
          </p>
        </div>

        <section className="calculator-card">
          <div className="section-header">
            <h2>
              Informasi Produk
            </h2>

            <p>
              Masukkan informasi dasar
              produk yang ingin dihitung.
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
                onChange={(event) => {
                  setProductName(
                    event.target.value,
                  )

                  setSaveFeedback(null)
                }}
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
                onChange={(event) => {
                  setProductQuantity(
                    event.target.value,
                  )

                  setSaveFeedback(null)
                }}
              />
            </div>
          </div>
        </section>

        <section className="calculator-card cost-card">
          <div className="section-title-row">
            <div className="section-header">
              <h2>
                Komponen Biaya
              </h2>

              <p>
                Tambahkan seluruh biaya
                yang digunakan untuk
                membuat produk.
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
            {costItems.map(
              (item, index) => (
                <div
                  className="cost-item"
                  key={item.id}
                >
                  <div className="cost-number">
                    {index + 1}
                  </div>

                  <div className="form-group cost-name">
                    <label
                      htmlFor={`cost-name-${item.id}`}
                    >
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
                    <label
                      htmlFor={`cost-amount-${item.id}`}
                    >
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
                      removeCostItem(
                        item.id,
                      )
                    }
                    disabled={
                      costItems.length ===
                      1
                    }
                    aria-label={`Hapus biaya ${index + 1}`}
                    title="Hapus biaya"
                  >
                    ×
                  </button>
                </div>
              ),
            )}
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
            <h2>
              Harga & Profit
            </h2>

            <p>
              Pilih metode yang ingin
              digunakan untuk menentukan
              harga jual produk.
            </p>
          </div>

          <div className="calculation-mode">
            <button
              type="button"
              className={
                calculationMode ===
                'markup'
                  ? 'mode-button active'
                  : 'mode-button'
              }
              onClick={() => {
                setCalculationMode(
                  'markup',
                )

                setSaveFeedback(null)
              }}
            >
              Markup
            </button>

            <button
              type="button"
              className={
                calculationMode ===
                'margin'
                  ? 'mode-button active'
                  : 'mode-button'
              }
              onClick={() => {
                setCalculationMode(
                  'margin',
                )

                setSaveFeedback(null)
              }}
            >
              Margin
            </button>

            <button
              type="button"
              className={
                calculationMode ===
                'manual'
                  ? 'mode-button active'
                  : 'mode-button'
              }
              onClick={() => {
                setCalculationMode(
                  'manual',
                )

                setSaveFeedback(null)
              }}
            >
              Harga Jual Manual
            </button>
          </div>

          <div className="target-input-area">
            {calculationMode ===
              'markup' && (
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
                  onChange={(event) => {
                    setMarkupPercent(
                      event.target.value,
                    )

                    setSaveFeedback(
                      null,
                    )
                  }}
                />
              </div>
            )}

            {calculationMode ===
              'margin' && (
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
                  onChange={(event) => {
                    setMarginPercent(
                      event.target.value,
                    )

                    setSaveFeedback(
                      null,
                    )
                  }}
                />

                {margin >= 100 && (
                  <span className="input-error">
                    Margin harus lebih
                    kecil dari 100%.
                  </span>
                )}
              </div>
            )}

            {calculationMode ===
              'manual' && (
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
                    value={
                      manualSellingPrice
                    }
                    onChange={(event) => {
                      setManualSellingPrice(
                        event.target.value,
                      )

                      setSaveFeedback(
                        null,
                      )
                    }}
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
                Keuntungan sebelum
                penyesuaian harga
              </span>
            </div>

            <strong className="summary-value">
              {formatRupiah(
                targetProfitPerUnit,
              )}
            </strong>
          </div>

          <div className="cost-summary">
            <div>
              <span className="summary-label">
                Harga Jual Hitung
              </span>

              <span className="summary-description">
                Harga hasil metode
                perhitungan
              </span>
            </div>

            <strong className="summary-value">
              {formatRupiah(
                calculatedSellingPrice,
              )}
            </strong>
          </div>

          <div className="cost-summary">
            <div>
              <span className="summary-label">
                {calculationMode ===
                'manual'
                  ? 'Harga Jual Digunakan'
                  : 'Harga Jual Rekomendasi'}
              </span>

              <span className="summary-description">
                {calculationMode ===
                'manual'
                  ? 'Harga jual yang kamu tentukan'
                  : 'Dibulatkan ke atas ke kelipatan Rp500'}
              </span>
            </div>

            <strong className="summary-value">
              {formatRupiah(
                finalSellingPrice,
              )}
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
              {formatRupiah(
                actualProfitPerUnit,
              )}
            </strong>
          </div>

          <div className="profit-metrics">
            <div className="metric-card">
              <span>
                Markup Aktual
              </span>

              <strong>
                {formatPercent(
                  actualMarkup,
                )}
                %
              </strong>
            </div>

            <div className="metric-card">
              <span>
                Margin Aktual
              </span>

              <strong>
                {formatPercent(
                  actualMargin,
                )}
                %
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
              {formatRupiah(
                totalPotentialProfit,
              )}
            </strong>
          </div>
        </section>

        <section className="calculator-card final-card">
          <div className="final-header">
            <div className="section-header">
              <h2>
                Ringkasan Hasil
              </h2>

              <p>
                Ringkasan akhir
                perhitungan produk.
              </p>
            </div>

            <span
              className={
                isLoss
                  ? 'result-status loss'
                  : 'result-status profit'
              }
            >
              {isLoss
                ? 'Rugi'
                : 'Profit'}
            </span>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <span>Produk</span>

              <strong>
                {productName.trim() ||
                  'Belum diisi'}
              </strong>
            </div>

            <div className="result-card">
              <span>Jumlah</span>

              <strong>
                {quantity > 0
                  ? quantity
                  : 0}{' '}
                unit
              </strong>
            </div>

            <div className="result-card">
              <span>Metode</span>

              <strong>
                {getCalculationModeLabel(
                  calculationMode,
                )}
              </strong>
            </div>

            <div className="result-card">
              <span>HPP / Unit</span>

              <strong>
                {formatRupiah(
                  hppPerUnit,
                )}
              </strong>
            </div>

            <div className="result-card featured">
              <span>
                Harga Jual Akhir
              </span>

              <strong>
                {formatRupiah(
                  finalSellingPrice,
                )}
              </strong>
            </div>

            <div className="result-card">
              <span>
                Profit / Unit
              </span>

              <strong>
                {formatRupiah(
                  actualProfitPerUnit,
                )}
              </strong>
            </div>

            <div className="result-card">
              <span>
                Margin Aktual
              </span>

              <strong>
                {formatPercent(
                  actualMargin,
                )}
                %
              </strong>
            </div>

            <div className="result-card">
              <span>
                Potensi Profit
              </span>

              <strong>
                {formatRupiah(
                  totalPotentialProfit,
                )}
              </strong>
            </div>
          </div>

          {saveFeedback && (
            <div
              className={`save-feedback ${saveFeedback.type}`}
              role="status"
            >
              {saveFeedback.type ===
              'success' ? (
                <CheckCircle2 />
              ) : (
                <AlertCircle />
              )}

              <span>
                {saveFeedback.message}
              </span>
            </div>
          )}

          <div className="result-actions">
            <button
              type="button"
              className="save-button"
              onClick={
                saveCalculation
              }
            >
              <Save />

              {isEditing
                ? 'Simpan Perubahan'
                : 'Simpan Perhitungan'}
            </button>

            <button
              type="button"
              className="reset-button"
              onClick={() => {
                if (isEditing) {
                  navigate(
                    '/history',
                  )

                  return
                }

                resetCalculator()
              }}
            >
              {isEditing
                ? 'Batal Edit'
                : 'Reset Kalkulator'}
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

function HistoryPage() {
  const [
    savedCalculations,
    setSavedCalculations,
  ] = useState<SavedCalculation[]>(
    () => readSavedCalculations(),
  )

  const deleteCalculation = (
    calculation: SavedCalculation,
  ) => {
    const confirmed =
      window.confirm(
        `Hapus riwayat "${calculation.productName}"?`,
      )

    if (!confirmed) {
      return
    }

    const updatedCalculations =
      savedCalculations.filter(
        (item) =>
          item.id !== calculation.id,
      )

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        updatedCalculations,
      ),
    )

    setSavedCalculations(
      updatedCalculations,
    )
  }

  return (
    <main className="app">
      <div className="app-container">
        <div className="page-header history-page-header">
          <div>
            <span className="page-eyebrow">
              Costify History
            </span>

            <h1>Riwayat</h1>

            <p>
              Lihat kembali perhitungan
              yang sudah kamu simpan
              sebelumnya.
            </p>
          </div>

          {savedCalculations.length >
            0 && (
            <div className="history-count">
              <HistoryIcon />

              <span>
                {
                  savedCalculations.length
                }{' '}
                tersimpan
              </span>
            </div>
          )}
        </div>

        {savedCalculations.length ===
        0 ? (
          <section className="empty-state-card">
            <div className="empty-state-icon">
              <HistoryIcon />
            </div>

            <h2>
              Belum ada riwayat
            </h2>

            <p>
              Simpan perhitungan dari
              halaman Kalkulator dan
              hasilnya akan muncul di
              sini.
            </p>

            <NavLink
              to="/"
              className="empty-state-action"
            >
              <CalculatorIcon />
              Buka Kalkulator
            </NavLink>
          </section>
        ) : (
          <div className="history-list">
            {savedCalculations.map(
              (calculation) => (
                <article
                  className="history-card"
                  key={
                    calculation.id
                  }
                >
                  <div className="history-card-header">
                    <div className="history-title-area">
                      <div className="history-icon-box">
                        <ReceiptText />
                      </div>

                      <div>
                        <h2>
                          {
                            calculation.productName
                          }
                        </h2>

                        <div className="history-meta">
                          <span>
                            <Clock3 />

                            {formatDateTime(
                              calculation.createdAt,
                            )}
                          </span>

                          <span>
                            {
                              calculation.quantity
                            }{' '}
                            unit
                          </span>

                          <span>
                            {getCalculationModeLabel(
                              calculation.calculationMode,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="history-actions">
                      <span
                        className={
                          calculation.actualProfitPerUnit <
                          0
                            ? 'history-status loss'
                            : 'history-status profit'
                        }
                      >
                        {calculation.actualProfitPerUnit <
                        0
                          ? 'Rugi'
                          : 'Profit'}
                      </span>

                      <NavLink
                        to={`/edit/${calculation.id}`}
                        className="history-edit-button"
                      >
                        <Pencil />
                        Edit
                      </NavLink>

                      <button
                        type="button"
                        className="history-delete-button"
                        onClick={() =>
                          deleteCalculation(
                            calculation,
                          )
                        }
                        aria-label={`Hapus riwayat ${calculation.productName}`}
                        title="Hapus riwayat"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>

                  <div className="history-main-grid">
                    <div className="history-value-card">
                      <span>
                        <WalletCards />
                        Total Modal
                      </span>

                      <strong>
                        {formatRupiah(
                          calculation.totalModal,
                        )}
                      </strong>
                    </div>

                    <div className="history-value-card">
                      <span>
                        <ReceiptText />
                        HPP / Unit
                      </span>

                      <strong>
                        {formatRupiah(
                          calculation.hppPerUnit,
                        )}
                      </strong>
                    </div>

                    <div className="history-value-card featured">
                      <span>
                        Harga Jual
                      </span>

                      <strong>
                        {formatRupiah(
                          calculation.finalSellingPrice,
                        )}
                      </strong>
                    </div>

                    <div className="history-value-card">
                      <span>
                        <TrendingUp />
                        Profit / Unit
                      </span>

                      <strong>
                        {formatRupiah(
                          calculation.actualProfitPerUnit,
                        )}
                      </strong>
                    </div>
                  </div>

                  <div className="history-secondary-grid">
                    <div>
                      <span>
                        Markup Aktual
                      </span>

                      <strong>
                        {formatPercent(
                          calculation.actualMarkup,
                        )}
                        %
                      </strong>
                    </div>

                    <div>
                      <span>
                        Margin Aktual
                      </span>

                      <strong>
                        {formatPercent(
                          calculation.actualMargin,
                        )}
                        %
                      </strong>
                    </div>

                    <div>
                      <span>
                        Potensi Profit
                      </span>

                      <strong>
                        {formatRupiah(
                          calculation.totalPotentialProfit,
                        )}
                      </strong>
                    </div>
                  </div>

                  <div className="history-cost-section">
                    <div className="history-cost-header">
                      <h3>
                        Komponen Biaya
                      </h3>

                      <span>
                        {
                          calculation
                            .costItems
                            .length
                        }{' '}
                        komponen
                      </span>
                    </div>

                    <div className="history-cost-list">
                      {calculation.costItems.map(
                        (
                          costItem,
                        ) => (
                          <div
                            className="history-cost-item"
                            key={
                              costItem.id
                            }
                          >
                            <span>
                              {
                                costItem.name
                              }
                            </span>

                            <strong>
                              {formatRupiah(
                                costItem.amount,
                              )}
                            </strong>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        )}
      </div>
    </main>
  )
}

function ProductsPage() {
  const [savedCalculations] =
    useState<SavedCalculation[]>(
      () => readSavedCalculations(),
    )

  const productSummaries =
    buildProductSummaries(
      savedCalculations,
    )

  return (
    <main className="app">
      <div className="app-container">
        <div className="page-header products-page-header">
          <div>
            <span className="page-eyebrow">
              Costify Products
            </span>

            <h1>Produk</h1>

            <p>
              Ringkasan produk berdasarkan
              perhitungan yang sudah kamu
              simpan.
            </p>
          </div>

          {productSummaries.length >
            0 && (
            <div className="products-count">
              <PackageIcon />

              <span>
                {
                  productSummaries.length
                }{' '}
                produk
              </span>
            </div>
          )}
        </div>

        {productSummaries.length ===
        0 ? (
          <section className="empty-state-card">
            <div className="empty-state-icon">
              <PackageIcon />
            </div>

            <h2>
              Belum ada produk
            </h2>

            <p>
              Produk akan terbentuk
              otomatis setelah kamu
              menyimpan perhitungan dari
              Kalkulator.
            </p>

            <NavLink
              to="/"
              className="empty-state-action"
            >
              <CalculatorIcon />
              Buka Kalkulator
            </NavLink>
          </section>
        ) : (
          <>
            <div className="products-overview">
              <div className="products-overview-item">
                <span>
                  Produk Unik
                </span>

                <strong>
                  {
                    productSummaries.length
                  }
                </strong>
              </div>

              <div className="products-overview-item">
                <span>
                  Total Perhitungan
                </span>

                <strong>
                  {
                    savedCalculations.length
                  }
                </strong>
              </div>
            </div>

            <div className="products-grid">
              {productSummaries.map(
                (product) => {
                  const latest =
                    product.latestCalculation

                  const latestDate =
                    latest.updatedAt ??
                    latest.createdAt

                  const isLoss =
                    latest.actualProfitPerUnit <
                    0

                  return (
                    <article
                      className="product-card"
                      key={product.key}
                    >
                      <div className="product-card-header">
                        <div className="product-title-area">
                          <div className="product-icon-box">
                            <PackageIcon />
                          </div>

                          <div>
                            <h2>
                              {
                                product.productName
                              }
                            </h2>

                            <div className="product-meta">
                              <span>
                                <Layers3 />

                                {
                                  product.calculationCount
                                }{' '}
                                perhitungan
                              </span>

                              <span>
                                <CalendarDays />

                                {formatDateTime(
                                  latestDate,
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <span
                          className={
                            isLoss
                              ? 'product-status loss'
                              : 'product-status profit'
                          }
                        >
                          {isLoss
                            ? 'Rugi'
                            : 'Profit'}
                        </span>
                      </div>

                      <div className="product-metrics">
                        <div className="product-metric-card">
                          <span>
                            HPP Terbaru
                          </span>

                          <strong>
                            {formatRupiah(
                              latest.hppPerUnit,
                            )}
                          </strong>
                        </div>

                        <div className="product-metric-card featured">
                          <span>
                            Harga Jual Terbaru
                          </span>

                          <strong>
                            {formatRupiah(
                              latest.finalSellingPrice,
                            )}
                          </strong>
                        </div>

                        <div className="product-metric-card">
                          <span>
                            Profit / Unit
                          </span>

                          <strong>
                            {formatRupiah(
                              latest.actualProfitPerUnit,
                            )}
                          </strong>
                        </div>

                        <div className="product-metric-card">
                          <span>
                            Margin Aktual
                          </span>

                          <strong>
                            {formatPercent(
                              latest.actualMargin,
                            )}
                            %
                          </strong>
                        </div>
                      </div>

                      <div className="product-footer">
                        <div>
                          <span>
                            Total Modal Terbaru
                          </span>

                          <strong>
                            {formatRupiah(
                              latest.totalModal,
                            )}
                          </strong>
                        </div>

                        <div>
                          <span>
                            Metode
                          </span>

                          <strong>
                            {getCalculationModeLabel(
                              latest.calculationMode,
                            )}
                          </strong>
                        </div>
                      </div>
                    </article>
                  )
                },
              )}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default App