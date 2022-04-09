import React from 'react'
import { BiMessageAltError } from 'react-icons/bi'

function ErrorText({ test, message }) {
  return (
    <p className='text-sm text-red-500 '>
      <i className='flex'>
        { test ?
          test === 'success' ?
            ''
            :<><BiMessageAltError className='self-center mr-1'/>  {message +'!'} </>
          : '' }
      </i>
    </p>
  )
}

export default ErrorText