import React, { useState } from 'react'
import "./signup.css"
import { NavLink } from 'react-router-dom'

function Signup() {

  const [logData, setLogData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  })

  const addData = (e) => {
    const { name, value } = e.target
    setLogData(() => {
      return {
        ...logData,
        [name]: value
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
              <h1>Sign Up</h1>
              <div className='form_data'>
                <label htmlFor='yourname'>Your Name</label>
                <input
                  onChange={addData}
                  value={logData.name}
                  type='text'
                  name='name'
                  id='email' />
              </div>
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
                <label htmlFor='phone'>Mobile Number</label>
                <input
                  onChange={addData}
                  value={logData.mobile}
                  type='text'
                  name='mobile'
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
              </div>
              <div className='form_data'>
                <label htmlFor='confirmpassword'>Confirm Password</label>
                <input
                  onChange={addData}
                  value={logData.confirmPassword}
                  type='password'
                  name="confirmPassword"
                  id='password' />
              </div>
              <button className='signin_btn'>Continue</button>
            </form>
          </div>

          <div className=''>
            <div className='create_accountinfo'>
              <p>Already Have An Account?</p>
              <NavLink
                to={"/login"}>
                <button>Go To Sign In</button>
              </NavLink>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default Signup