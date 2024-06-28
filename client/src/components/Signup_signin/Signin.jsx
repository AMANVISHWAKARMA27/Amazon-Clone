/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import "./signup.css"
import { NavLink } from 'react-router-dom'
import { LoginContext } from '../context/ContextProvider'

function Signin() {

  const [logData, setLogData] = useState({
    email: "",
    password: ""
  })

  const { account, setAccount } = useContext(LoginContext)

  const addData = (e) => {
    const { name, value } = e.target
    setLogData(() => {
      return {
        ...logData,
        [name]: value
      }
    })
  }

  const sendData = async (e) => {
    e.preventDefault()
    const { email, password } = logData

    if (!password || !email) {
      alert("Enter the data completely.")
    }

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })

    const data = await res.json()
    console.log(data)


    if (res.status === 400 || !data) {
      console.log("Invalid details.")
    } else {
      alert("User loggedin successfully.")
      console.log('Data is valid.')
      setAccount(data)
      setLogData({ ...logData, email: "", password: "" })
    }
  }

  return (
    <>
      <section>
        <div className='sign_container'>
          <div className='sign_header'>
            <img src='./blacklogoamazon.png' alt='' />
          </div>
          <div className='sign_form'>
            <form method='POST'>
              <h1>Sign In</h1>
              <div className='form_data'>
                <label htmlFor='email'>Email</label>
                <input
                  onChange={addData}
                  value={logData.email}
                  type='text'
                  name='email'
                  id='email' />
              </div>
              <div className='form_data'>
                <label htmlFor='password'>Password</label>
                <input
                  onChange={addData}
                  value={logData.password}
                  type='password'
                  name="password"
                  id='password'
                  placeholder='Atleast 8 characters' />
                <NavLink
                  to={"/forgotpassword"}>
                  <p className='forgot_password'>Forgot Password?</p>
                </NavLink>
              </div>
              <button className='signin_btn' onClick={sendData}>Continue</button>
            </form>
          </div>

          <div className=''>
            <div className='create_accountinfo'>
              <p>New To Amazon?</p>
              <NavLink
                to={"/register"}>
                <button>Create Your Amazon Account</button>
              </NavLink>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}

export default Signin