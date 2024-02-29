import React from 'react'

const InputDate = ({className, ...other}) => {
  return (
    <input {...other} type='date' className={`${className} py-2 px-3 bg-white flex justify-between items-center rounded border rounded-[4px] border-[#929292]`} />
  )
}

export default InputDate