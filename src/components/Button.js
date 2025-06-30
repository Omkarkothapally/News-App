import React from 'react'

const Button = ({ onClick }) => {
  return (
    <div>
      <button type="button" className="btn btn-dark" onClick={onClick}>
        Hide
      </button>
    </div>
  )
}

export default Button
