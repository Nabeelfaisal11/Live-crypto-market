import React, { useEffect, useMemo, useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import CoinList from './components/CoinList.jsx'
import Loader from './components/Loader.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'

const VS_CURRENCY = 'usd'
const PER_PAGE = 20

export default function App() {
  const [coins, setCoins] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  async function fetchCoins({ pageNumber = 1, append = false } = {}) {
    setLoading(true)
    setError('')
    try {
      const url = new URL('https://api.coingecko.com/api/v3/coins/markets')
      url.searchParams.set('vs_currency', VS_CURRENCY)
      url.searchParams.set('order', 'market_cap_desc')
      url.searchParams.set('per_page', PER_PAGE.toString())
      url.searchParams.set('page', pageNumber.toString())
      url.searchParams.set('sparkline', 'false')
      url.searchParams.set('price_change_percentage', '24h,7d')

      const res = await fetch(url, { headers: { 'accept': 'application/json' } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setCoins(prev => append ? [...prev, ...data] : data)
    } catch (e) {
      setError('Failed to load data. Please try again in a moment.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // initial load
  useEffect(() => {
    fetchCoins({ pageNumber: 1, append: false })
  }, [])

  // filter client-side by name/symbol for simplicity
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return coins
    return coins.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.symbol.toLowerCase().includes(q)
    )
  }, [coins, query])

  function handleLoadMore() {
    const next = page + 1
    setPage(next)
    fetchCoins({ pageNumber: next, append: true })
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Crypto Tracker</h1>
        <p className="subtitle">Live Market Data </p>
      </header>

      <SearchBar value={query} onChange={setQuery} placeholder="Search by name or symbol (e.g., bitcoin, eth)..." />

      {loading && !coins.length ? <Loader /> : null}
      {error ? <ErrorMessage message={error} /> : null}

      {!loading && !error ? (
        <>
          <CoinList coins={filtered} />
          <div className="actions">
            <button className="btn" onClick={handleLoadMore} disabled={loading}>
              {loading ? 'Loading...' : 'Load more'}
            </button>
          </div>
        </>
      ) : null}

      <footer className="footer">
        <small>
          Data from CoinGecko • Prices in {VS_CURRENCY.toUpperCase()}
        </small>
      </footer>
    </div>
  )
}
