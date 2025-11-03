import React from 'react'

function formatPct(n) {
  if (n === null || n === undefined) return '—'
  const sign = n > 0 ? '+' : ''
  return `${sign}${n.toFixed(2)}%`
}

function formatCurrency(n) {
  if (n === null || n === undefined) return '—'
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n)
  } catch {
    return `$${n}`
  }
}

export default function CoinCard({ coin }) {
  const change24 = coin.price_change_percentage_24h
  const change7d = coin.price_change_percentage_7d_in_currency

  const trendClass24 = change24 > 0 ? 'pos' : change24 < 0 ? 'neg' : ''
  const trendClass7d  = change7d > 0 ? 'pos' : change7d < 0 ? 'neg' : ''

  return (
    <article className="card">
      <div className="card-head">
        <img src={coin.image} alt={`${coin.name} logo`} width="32" height="32" />
        <div className="card-title">
          <h3>{coin.name}</h3>
          <span className="symbol">{coin.symbol.toUpperCase()}</span>
        </div>
      </div>
      <div className="row">
        <span className="label">Price</span>
        <span className="value">{formatCurrency(coin.current_price)}</span>
      </div>
      <div className="row">
        <span className="label">Market Cap</span>
        <span className="value">{formatCurrency(coin.market_cap)}</span>
      </div>
      <div className="row">
        <span className="label">24h</span>
        <span className={`value ${trendClass24}`}>{formatPct(change24)}</span>
      </div>
      <div className="row">
        <span className="label">7d</span>
        <span className={`value ${trendClass7d}`}>{formatPct(change7d)}</span>
      </div>
    </article>
  )
}
