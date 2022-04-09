import React, { useState } from 'react'

const InputSelect = ({ name, state, setState, option, data }) => {
  const [border, setborder] = useState('border')

  const changeHandler = (event) => {
    setState({ ...state, field: event.target.value.trim() })
  }

  const blurHandler = () => {
    if(state.field.trim().length > 0) {
      setState({ ...state, valid: 'success'  })
      setborder('border-solid border-1 border-pr')
    } else {
      setState({ ...state, valid: 'error' })
      setborder('border-solid border-1 border-red-500')
    }
  }


  return (
    <select
      id={name}
      value={state.field}
      onChange= {changeHandler}
      className={`${border} py-3 px-2 grow text-base rounded-md text-gray-500 outline-none focus:shadow-md`}
      onBlur={blurHandler}
    >
      <option value='' defaultValue='' disabled='disabled'>{option}</option>
      {data.map((e, i) => (<option key={i} value={e}>{e}</option>))}
    </select>
  )
}

export default InputSelect