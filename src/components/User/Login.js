import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import api from '../Hooks/instance'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pError, setPError] = useState(false)
  const [eError, seteError] = useState(false)
  const d = new Date()
  const year = d.getFullYear()
  const navigate = useNavigate()
  const login = (e) => {
    e.preventDefault()
    if (!email) {
      seteError(true)
    }
    else if (!password) {
      setPError(true)
    }
    else {
      setLoading(true)
      setPError(false)
      seteError(false)
      const data = { email: email.toLocaleLowerCase(), password }
      api.post('/user/login', data)
        .then(res => {
          setLoading(false)
          if (res.data.message === "wellcome Back") {
            localStorage.setItem('accessToken', res.data.token)
            navigate('/')
            toast.success("Wellcome back")
          }
          else if (res.data.message === "Incorrect Password") {
            toast.error("Incorrent Password Please Insert Correct PassWord")
          }
          else {
            console.log(res);
          }
        })
    }
  }
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="lg:w-96 w-[95%] md:w-96 max-w-96 ">
        <div className='shadow-lg p-4 rounded-md'>
          <form className="bg-white  rounded  pt-6 pb-3 mb-2" onSubmit={login}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Email Adress
              </label>
              <input
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className={`shadow appearance-none border ${eError ? 'border-red-500' : ''} rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-500 focus:shadow-outline`}
                type="text" placeholder="Email Adress" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
                className={`shadow appearance-none border ${pError ? 'border-red-500' : ''} rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-blue-500 focus:shadow-outline`} type="password" placeholder="**************" />
              {
                pError
                &&
                <p className="text-red-500 text-xs italic">
                  Please choose a password.
                </p>
              }
            </div>
            <div className="flex items-center justify-between">
              <button type="submit" className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading && "loading"}`} >
                Sign In
              </button>
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#!">
                Forgot Password?
              </a>
            </div>
          </form>
          <div>
            <hr className="my-8" />
            <div className="flex items-center justify-center gap-4">
              <button className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:border-gray-500 focus:border-gray-500">
                <svg className="w-4 h-4 mr-2" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                Github
              </button>
              <button className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:border-gray-500 focus:border-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-4 h-4 mr-2" viewBox="0 0 48 48">
                  <defs>
                    <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                  </defs>
                  <clipPath id="b">
                    <use xlinkHref="#a" overflow="visible" />
                  </clipPath>
                  <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                  <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                  <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                  <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                </svg>Google
              </button>
            </div>
          </div>
          <p className='text-center mt-3'>
            New On Here
            <Link className='btn btn-link' to={'/signup'}>Register</Link>
          </p>

        </div>
        <p className="text-center mt-10 text-gray-500 text-xs">
          ©{year} Md Tamiz Uddin. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login