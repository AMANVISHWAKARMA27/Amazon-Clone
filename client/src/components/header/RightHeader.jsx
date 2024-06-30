/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import "./rightHeader.css"
import Avatar from '@mui/material/Avatar';
import { LoginContext } from '../context/ContextProvider';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';

function RightHeader({LogClose}) {
    const { account, setAccount } = useContext(LoginContext)
    return (
        <>
            <div className='rightheader'>
                <div className='right_nav'>
                    {
                        account ? <Avatar className='avtar2'>
                            {account.name[0].toUpperCase()}
                        </Avatar> : <Avatar className='avtar'></Avatar>
                    }
                    {account? <h3>Hello, {account.name.toUpperCase()}</h3>:""}
                </div>
                <div className='nav_btn' onClick={() => LogClose}>
                    <NavLink to={"https://amazon-clone-1-rwc2.onrender.com/"}>Home </NavLink>
                    <NavLink to={"https://amazon-clone-1-rwc2.onrender.com/"}>Shop By Category </NavLink>
                    <Divider style={{ width: "100%", marginLeft: "-20px" }} />
                    <NavLink to={"https://amazon-clone-1-rwc2.onrender.com/"}>Today's Deal </NavLink>
                    {
                        account ? <NavLink to={"/buynow"}>Your Orders</NavLink> : <NavLink to={"https://amazon-clone-1-rwc2.onrender.com/login"}>Your Orders</NavLink>
                    }
                    <Divider style={{ width: "100%", marginLeft: "-20px" }} />
                    <div className='flag'>
                        <NavLink to={"https://amazon-clone-1-rwc2.onrender.com/"}>Settings</NavLink>
                        <img src='' alt='' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default RightHeader