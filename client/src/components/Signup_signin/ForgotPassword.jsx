import React from 'react'

function ForgotPassword() {
    return (
        <>
            <section>
                <div className='sign_container'>
                    <div className='sign_header'>
                        <img src='./blacklogoamazon.png' alt='' />
                    </div>
                    <div className='sign_form'>
                        <form>
                            <h1>Forgot Password</h1>
                            <div className='form_data'>
                                <label htmlFor='email'>Email</label>
                                <input type='text' name='email' id='email' />
                            </div>
                            <div className='form_data'>
                                <label htmlFor='mobile'>Mobile Number</label>
                                <input type='text' name='mobile' id='mobile' />
                            </div>
                            <button className='signin_btn'>Change Password</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ForgotPassword