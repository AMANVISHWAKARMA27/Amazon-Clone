/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import "./navbar.css"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink } from "react-router-dom"
import { LoginContext } from '../context/ContextProvider';

function Navbar() {
    const { account, setAccount } = useContext(LoginContext)
    console.log(account)
    const cartCount = account?.carts?.length ?? 0;

    return (
        <header>
            <nav>
                <div className='left'>
                    <div className='navlogo'>
                        <NavLink
                            to={"/"}>
                            <img src="./amazon_PNG25.png" alt='' />
                        </NavLink>
                    </div>
                    <div className='nav_searchbaar'>
                        <input type='text' name='' id='' />
                        <div className='search_icon'>
                            <SearchOutlinedIcon id="search" />
                        </div>
                    </div>
                </div>
                <div className='right'>
                    <div className='nav_btn'>
                        <NavLink
                            to={"/login"}
                        >Sign In
                        </NavLink>
                    </div>
                    <div className='cart_btn'>
                        {
                            account ? <NavLink
                                to={"/buynow"}>
                                <Badge badgeContent={cartCount} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </NavLink> : <NavLink
                                to={"/login"}>
                                <Badge badgeContent={0} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </NavLink>
                        }
                        <p>Cart</p>

                    </div>
                    {
                        account ? <Avatar className='avtar2'>
                            {account.name[0].toUpperCase()}
                        </Avatar> : <Avatar className='avtar'></Avatar>
                    }

                </div>
            </nav>
        </header>
    )
}

export default Navbar