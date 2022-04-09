import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

function Password({ state, setState }) {
  const [border, setborder] = useState('border')
  const [see, setSee] = useState(false)

  const validRegExp = /(?=.*?[<>])/

  const handlePasswordChange = (event) => {
    if(!validRegExp.test(event.target.value)) {
      setState({ ...state, field: event.target.value.trim() })}
  }

  const seeHandle = (event) => {
    event.preventDefault()
    if(see) setSee(false)
    else setSee(true)
  }

  const handleValidation = (event) => {
    const passwordInputValue = event.target.value.trim()

    const uppercaseRegExp = /(?=.*?[A-Z])/
    const lowercaseRegExp = /(?=.*?[a-z])/
    const digitsRegExp = /(?=.*[0-9])/
    const specialCharRegExp = /(?=.*[#?!@$%^&*-])/
    const minLengthRegExp = /.{8,}/

    const passwordLength = passwordInputValue.length
    const uppercasePassword = uppercaseRegExp.test(passwordInputValue)
    const lowercasePassword = lowercaseRegExp.test(passwordInputValue)
    const digitsPassword = digitsRegExp.test(passwordInputValue)
    const specialCharPassword = specialCharRegExp.test(passwordInputValue)
    const minLengthPassword = minLengthRegExp.test(passwordInputValue)

    let errMessage = ''
    if(passwordLength===0){
      errMessage='Password is empty'
    } else if(!uppercasePassword) {
      errMessage='At least one Uppercase'
    } else if(!lowercasePassword){
      errMessage='At least one Lowercase'
    } else if(!digitsPassword){
      errMessage='At least one digit'
    }else if(!specialCharPassword){
      errMessage=('At least one Special Characters')
    }else if(!minLengthPassword){
      errMessage=('At least minimun 8 characters')
    }else{
      errMessage=''
    }


    if(errMessage==='') {
      setState({ ...state, valid: 'success', message: errMessage  })
      setborder('border-solid border-1 border-pr')

    } else {
      setState({ ...state, valid: 'error', message: errMessage })
      setborder('border-solid border-1 border-red-500')
    }

  }

  return (
    <div className='flex flex-col grow gap-2 relative'>
      <input
        name='password'
        type={see ? 'text' : 'password'}
        placeholder='8+ characters required'
        className={`${border} py-3 pl-2 pr-16 text-base rounded-md font-normal outline-none focus:shadow-md text-gray-700`}
        value={state.field}
        onChange={handlePasswordChange}
        onKeyUp={handleValidation}
        onBlur={handleValidation}
        required
      />
      <button
        onClick={seeHandle}
        className='my-2.5 mx-2 py-2 px-2 bg-pr absolute right-0 text-xl border rounded-md font-normal outline-none focus:shadow-md text-white' >
        <i>{see ? <AiFillEye/> : <AiFillEyeInvisible/>}</i>
      </button>
    </div>
  )
}

export default Password