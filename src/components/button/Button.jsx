import React from 'react'
import './button.scss'

const Button = ({btnTitle, btnClassName, onClick}) => {
  return (
    <button
    onClick={onClick}
    className={btnClassName ? btnClassName : 'btn-primary'}
    >
        {btnTitle ? btnTitle : 'Submit'}
    </button>
  )
}

export default Button