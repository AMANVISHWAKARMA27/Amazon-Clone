/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import "./navbar.css"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink } from "react-router-dom"
import { LoginContext } from '../context/ContextProvider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import RightHeader from './RightHeader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
    const { account, setAccount } = useContext(LoginContext)
    console.log(account)
    const cartCount = account?.carts?.length ?? 0;

    const [drawerOpen, setDrawerOpen] = useState(false)

    const getValidUserDetail = async () => {
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const data = await res.json()
        console.log(data)
        if (res.status !== 201) {
            console.log('Error')
        } else {
            console.log("Data valid")
            setAccount(data)
        }
    }

    const handleDrawerOpen = () => {
        setDrawerOpen(true)
    }

    const handleDrawerClose = () => {
        setDrawerOpen(false)
    }

    useEffect(() => {
        getValidUserDetail()
    })

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <header>
            <nav>
                <div className='left'>
                    <IconButton className='hamburgur' onClick={handleDrawerOpen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>
                    <Drawer open={drawerOpen} onClose={handleDrawerClose}>
                        <RightHeader LogClose={handleDrawerClose} />
                    </Drawer>
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
                        account ? <Avatar className='avtar2'
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                            {account.name[0].toUpperCase()}
                        </Avatar> : <Avatar className='avtar'
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}></Avatar>
                    }

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        {
                            account ? <MenuItem onClick={handleClose}><LogoutIcon/>&nbsp;Logout</MenuItem> : <NavLink to={"/login"}><MenuItem onClick={handleClose}>SignIn/SignUp</MenuItem></NavLink>
                        }

                    </Menu>

                </div>
            </nav>
        </header>
    )
}

export default Navbar