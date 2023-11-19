import React from "react"

const CustomButton = ({ children, styles, ...attributes }) => {
  return (
    <button
    type="button"
    className={`flex items-center justify-center px-4 py-2 rounded-[50px] ${styles}`}
    {...attributes}
  >
    {children}
  </button>
  )
}

export default CustomButton