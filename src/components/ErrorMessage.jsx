import React from 'react'
export default function ErrorMessage({ message }) {
  return (
    <div className="error" role="alert">
      {message || 'Something went wrong.'}
    </div>
  )
}
