import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Password from '../components/Password'
import firebaseApp from '../firebase/firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { userService } from '../services/user'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Signin = () => {
  let navigate = useNavigate()
  const auth = getAuth(firebaseApp)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [industry, setIndustry] = useState('')
  const [employee, setEmployee] = useState('<50')
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const handleChecked = () => {
    if(checked) setChecked(false)
    else setChecked(true)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if(!checked ) {
      console.log('Para continuar debe de aceptar los terminos y condiciones de nuestra politica de privacidad')
      return
    }

    const infoUser = await createUserWithEmailAndPassword(auth, email, password)
      .then((userFirebase) => {
        return userFirebase
      })

    const newUser = {
      'uid': infoUser.user.uid,
      'name': name,
      'email': email,
      'phone': phone,
      'industry': industry,
      'employee': employee,
    }
    await userService.create(newUser)
    navigate('/login', { replace: true } )
  }

  const industrySelect = [
    'Real Estate', 'Food and Drinks',
    'Consulting and Professional Services',
    'Sports', 'Design and Photography',
    'Education','Events and Entertainment',
    'Finance', 'Home and Decoration',
    'Dress', 'Industrial', 'Engines','NGO',
    'Advertising and Marketing', 'Retail Sale',
    'Health and Aesthetics', 'Security','Insurance',
    'Legal/Accounting', 'TIC','Software',
    'TV, Press and Radio', 'Services',
    'Travels and Tourism', 'Other'
  ]
  const employeeSelect = ['<50','50-99', '100-499', '500-999', '1,000-4,999', '5,000-9,999', '10,000-19,000', '>20,000']
  return (
    <div className=" min-h-screen w-full">
      <div className="flex items-center justify-center w-full">
        <div className="container">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 mt-32">
            <div>
              <h1 className="text-6xl text-gray-800 font-semibold ">
        Stop loosing cusomers and
                <span className=" flex items-center gap-2 flex-wrap">
                  {' '}
                  <span
                    style={{ borderColor: 'rgba(245,202,153,0.8)' }}
                    className="text-pr  border-b-8"
                  >
            increase
                  </span>
          sales
                </span>
              </h1>
              <p className=" text-xl text-gray-500 pt-3">
        Whatever your goal - we will get your there.
              </p>
              <div className=" mt-16 w-full pr-32">
                <img
                  src="https://godigitpage-eyvhte74x-gtavo95.vercel.app/assets/svg/illustrations/oc-growing.svg"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  alt=""
                />
              </div>
            </div>
            <div className=" shadow-md w-full  rounded-md p-4">
              <form onSubmit={submitHandler} className="w-full ">
                <div className="flex flex-col gap-2 pt-6">
                  <label htmlFor='name' className=" text-gray-800 text-sm">Name</label>
                  <input
                    id='name'
                    required
                    type="text"
                    className="py-3 px-2 text-base border rounded-md font-normal outline-none focus:shadow-md text-gray-700"
                    placeholder="Enter your name"
                    value = {name}
                    onChange= { ({ target }) => setName(target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 pt-6">
                  <label htmlFor='email' className="text-gray-800 text-sm">Email address</label>
                  <input
                    id='email'
                    required
                    type="email"
                    className="py-3 px-2 text-base border rounded-md font-normal outline-none focus:shadow-md text-gray-700"
                    placeholder="email@site.com"
                    value = {email}
                    onChange= { ({ target }) => setEmail(target.value)}
                  />
                </div>
                <div className=" flex flex-col gap-2 pt-6">
                  <label htmlFor='phone' className=" text-gray-800 text-sm">Phone Number</label>
                  <PhoneInput
                    country='gt'
                    className=" flex items-center  w-full"
                    placeholder="Enter phone number"
                    value={phone}
                    buttonClass= 'border-t border-l border-b text-gray-800 py-3 px-2'
                    onChange={setPhone}
                    dropdownClass='border-t border-l border-b text-gray-800 py-3 px-2'
                    enableSearch={true}
                    inputProps={{
                      id: 'phone',
                      name: 'phone',
                      required: true,
                      className:'py-3 ml-14 px-2 w-full text-base border rounded-md font-normal outline-none focus:shadow-md text-gray-700'
                    }}
                  />
                </div>
                <div className=" flex flex-col gap-2 pt-6">
                  <label htmlFor='industry' className=" text-gray-800 text-sm">Industry</label>
                  <select id='industry' className="border-t border-l border-b text-gray-500 outline-none focus:shadow-md py-3 px-2"
                    value={industry}
                    onChange= { ({ target }) => setIndustry(target.value)}>
                    <option value='' selected='selected' disabled='disabled' >Select your industry</option>
                    {industrySelect.map((e, i) => (
                      <option key={i} value={e}>{e}</option>
                    ))}

                  </select>
                </div>
                <div className=" flex flex-col gap-2 pt-6">
                  <label htmlFor='employee' className=" text-gray-800 text-sm">Employees</label>
                  <select id='employee' className="border-t border-l border-b text-gray-500 outline-none focus:shadow-md py-3 px-2"
                    onChange= { ({ target }) => setEmployee(target.value)}>
                    <option value='' selected='selected' disabled='disabled' >Select an approximate</option>
                    {
                      employeeSelect.map((e, i) => (
                        <option key={i} value={e}>{e}</option>
                      ))
                    }
                  </select>
                </div>
                <Password setValidPassword={setPassword}/>
                <div className=" flex items-center w-full pt-5 gap-1">
                  <input type="checkbox" name="check" id="check" defaultChecked={checked} onClick={handleChecked} required />{' '}
                  <label htmlFor="check" className=" text-gray-500 text-normal">
                  By signing up, I accept the {' '}
                    <Link to="/privacy-policy" className=" font-medium text-pr">
                    terms &amp; conditionss
                    </Link>
                  </label>
                </div>
                <button type='submit' className=" py-3 flex items-center justify-center text-white bg-pr rounded-md w-full mt-5 hover:bg-green-600">
          Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin