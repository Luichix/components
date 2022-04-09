import React, { useState } from 'react'

const InputText = ({ name, type, place, state, setState }) => {
  const [border, setborder] = useState('border')
  const validRegExp = /(?=.*?[<>])/
  const changeHandler = (event) => {
    if(!validRegExp.test(event.target.value)) {
      setState({ ...state, field: event.target.value })}
  }


  const blurHandler = () => {
    if(state.field.trim().length > 5) {
      setState({ ...state, valid: 'success'  })
      setborder('border-solid border-1 border-pr')
    } else {
      setState({ ...state, valid: 'error' })
      setborder('border-solid border-1 border-red-500')
    }
  }

  return (
    <input
      id={name}
      required
      type={type}
      className={`${border} py-3 px-2 grow text-base rounded-md text-gray-500 outline-none focus:shadow-md`}
      placeholder={place}
      value = {state.field}
      onChange= {changeHandler}
      onBlur={blurHandler}
    />
  )
}

export default InputText