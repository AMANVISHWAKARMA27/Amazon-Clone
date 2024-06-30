/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import "./navbar.css"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from "react-router-dom"
import { LoginContext } from '../context/ContextProvider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import RightHeader from './RightHeader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function Navbar() {
    const { account, setAccount } = useContext(LoginContext)
    console.log(account)
    const cartCount = account?.carts?.length ?? 0;

    const history = useNavigate()

    const [text, setText] = useState("")
    console.log(text)
    const [listOpen, setListOpen] = useState("")

    const { products } = useSelector(state => state.getProductsData)

    const [drawerOpen, setDrawerOpen] = useState(false)

    const getValidUserDetail = async () => {
        const res = await fetch("https://amazon-clone-1-rwc2.onrender.com/validuser", {
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

    const logoutUser = async () => {
        const res2 = await fetch("https://amazon-clone-1-rwc2.onrender.com/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const data2 = await res2.json()
        console.log(data2)
        if (res2.status !== 201) {
            console.log("User couldn't be logged out")
        } else {
            console.log("User data is valid")
            alert("User logged out successfully.")
            setAccount(false)
            history("https://amazon-clone-1-rwc2.onrender.com/")
        }
    }

    const getText = (item) => {
        setText(item)
        setListOpen(false)
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
                            to={"https://amazon-clone-1-rwc2.onrender.com/"}>
                            <img src="./amazon_PNG25.png" alt='' />
                        </NavLink>
                    </div>
                    <div className='nav_searchbar'>
                        <input
                            type='text'
                            onChange={(e) => getText(e.target.value)}
                            placeholder='Search your products' />
                        <div className='search_icon'>
                            <SearchOutlinedIcon id="search" />
                        </div>
                        {
                            text &&
                            <List className='extrasearch' hidden={listOpen}>
                                {
                                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                        <ListItem>
                                            <NavLink to={`https://amazon-clone-1-rwc2.onrender.com/getproductsone/${product.id}`} onClick={() => setListOpen(true)}>
                                                {product.title.longTitle}
                                            </NavLink>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        }
                    </div>
                </div>
                <div className='right'>
                    <div className='nav_btn'>
                        <NavLink
                            to={"https://amazon-clone-1-rwc2.onrender.com/login"}
                        >Sign In
                        </NavLink>
                    </div>
                    <div className='cart_btn'>
                        {
                            account ? <NavLink
                                to={"https://amazon-clone-1-rwc2.onrender.com/buynow"}>
                                <Badge badgeContent={cartCount} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </NavLink> : <NavLink
                                to={"https://amazon-clone-1-rwc2.onrender.com/login"}>
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
                            account ? <MenuItem onClick={logoutUser}><LogoutIcon />&nbsp;Logout</MenuItem> : <NavLink to={"https://amazon-clone-1-rwc2.onrender.com/login"}><MenuItem onClick={handleClose}>SignIn/SignUp</MenuItem></NavLink>
                        }

                    </Menu>

                </div>
            </nav>
        </header>
    )
}

export default Navbar