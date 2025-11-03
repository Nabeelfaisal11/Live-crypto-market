import React from 'react'
import CoinCard from './CoinCard.jsx'

export default function CoinList({ coins }) {
  if (!coins.length) {
    return <p className="empty">No coins match your search.</p>
  }
  return (
    <div className="grid">
      {coins.map(c => <CoinCard key={c.id} coin={c} />)}
    </div>
  )
}
