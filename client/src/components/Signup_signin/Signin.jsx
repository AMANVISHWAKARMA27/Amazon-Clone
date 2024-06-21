import React, { useState } from 'react'
import "./signup.css"
import { NavLink } from 'react-router-dom'

function Signin() {

  const [logData, setLogData] = useState({
    email: "",
    password: ""
  })

  const addData = (e) => {
    const { name, value } = e.target
    setLogData(() => {
      return {
        ...logData,
        [name]:value
      }
    })
  }

  return (
    <>
      <section>
        <div className='sign_container'>
          <div className='sign_header'>
            <img src='./blacklogoamazon.png' alt='' />
          </div>
          <div className='sign_form'>
            <form>
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
              <button className='signin_btn'>Continue</button>
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