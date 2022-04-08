import React, { useState } from 'react'

const PasswordInputField = ({ handleValidation, handlePasswordChange, passwordValue, passwordError }) => {
  return(
    <div className='flex flex-col gap-2'>
      <p className='text-gray-800 text-sm'>Password</p>
      <input
        name='password'
        type='password'
        placeholder='Password'
        className='py-3 px-2 text-base border rounded-md font-normal outline-none focus:shadow-md text-gray-700'
        value={passwordValue}
        onChange={handlePasswordChange}
        onKeyUp={handleValidation}
        required
      />
      <p className='font-xs text-pr'>
        <i>{passwordError}</i>
      </p>
    </div>
  )
}

const ConfirmPasswordInputField = ({ handleValidation, handleConfirmPasswordChange, confirmPasswordValue, confirmPasswordError }) => {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-gray-800 text-sm'>Confirm password</p>
      <input
        name='confirmPassword'
        type='password'
        placeholder='Password'
        className='py-3 px-2 text-base border rounded-md font-normal outline-none focus:shadow-md text-gray-700'
        value={confirmPasswordValue}
        onChange={handleConfirmPasswordChange}
        onKeyUp={handleValidation}
        required
      />
      <p className='font-xs text-pr'>
        <i>{confirmPasswordError}</i>
      </p>
    </div>
  )
}

function Password({ setValidPassword }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const handlePasswordChange = (event) => {
    const passwordInputValue = event.target.value.trim()
    setPassword(passwordInputValue)
  }

  const handleConfirmPasswordChange = (event) => {
    const passwordConfirmInputValue = event.target.value.trim()
    setConfirmPassword(passwordConfirmInputValue)
  }

  const handleValidation = (event) => {
    const passwordInputValue = event.target.value.trim()
    const passwordInputFieldName = event.target.name

    if(passwordInputFieldName==='password'){
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
      setPasswordError(errMessage)
    }


    if(passwordInputFieldName==='confirmPassword' ||
  (passwordInputFieldName==='password' && confirmPassword.length>0)){
      if(confirmPassword!== password){
        setConfirmPasswordError('Confirm password is not matched')
      } else {
        setConfirmPasswordError('')
        setValidPassword(password)
      }
    }
  }
  return (
    <div className='w-full grid grid-cols-1 pt-6 lg:grid-cols-2 gap-3'>
      <PasswordInputField
        handlePasswordChange={handlePasswordChange}
        handleValidation={handleValidation}
        passwordValue={password}
        passwordError={passwordError}
      />
      <ConfirmPasswordInputField
        handleConfirmPasswordChange={handleConfirmPasswordChange}
        handleValidation={handleValidation}
        confirmPasswordValue={confirmPassword}
        confirmPasswordError={confirmPasswordError}
      />
    </div>
  )
}

export default Password