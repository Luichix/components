import React from 'react'

import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai'
import ErrorText from './ErrorText'

function InputGroup({ name, state,  message, children  }) {


  return (
    <div className="flex flex-col gap-2 pt-6 transition-all duration-300 ease-linear" >
      <label htmlFor={name} className={
        state.valid ?
          state.valid === 'success' ? 'text-pr text-sm'
            : 'text-red-500 text-sm'
          : 'text-gray-800 text-sm'}>{name}</label>
      <div className='flex'>
        {children}
        <div className='w-4 px-2 right-0 grow-0 self-center '>
          { state.valid ?
            state.valid === 'success' ?
              <i className='text-pr'><AiFillCheckCircle /></i>
              :
              <i className='text-red-500'> <AiFillCloseCircle /></i>
            : ''
          }
        </div>
      </div>
      <ErrorText test={state.valid} message={message} />
    </div>
  )
}

export default InputGroup