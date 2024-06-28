import React, { useEffect, useState } from 'react'
import "./buynow.css"
import { Divider } from '@mui/material'
import Option from './Option'
import Subtotaal from './Subtotaal'
import Right from './Right'

export const Buynow = () => {
    const [cartData, setCartData] = useState("")
    // console.log(cartData?.carts)

    const getBuyData = async () => {
        const res = await fetch("/cartdetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "COntent-Type": "application/json"
            },
            credentials: "include"
        })

        const data = await res.json()

        if (res.status !== 201) {
            console.log('Error')
        } else {
            setCartData(data.carts)
        }
    }

    useEffect(() => {
        getBuyData()
    })

    return (
        <>{
            cartData.length ? <div className='buynow_section'>
                <div className='buynow_container'>
                    <div className='left_buy'>
                        <h1>Shopping cart</h1>
                        <p>Select All Items</p>
                        <span className='leftbuyprice'>Price</span>
                        <Divider />
                        {
                            cartData.map((e, k) => {
                                return (
                                    <>
                                        <div className='item_container'>
                                            <img src={e.url} alt='' />
                                            <div className='item_details'>
                                                <h3>{e.title.longTitle}</h3>
                                                <h3>{e.title.shortTitle}</h3>
                                                <h3 className='differentprice'>&#8377;4049.00</h3>
                                                <p className='unusuall'>Usually dispatched in 8 days</p>
                                                <p>Eligible for FREE shippimng</p>
                                                <img src='https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png' alt='' />
                                                <Option />
                                            </div>
                                            <h3 className='item_price'>&#8377;{e.price.cost}</h3>
                                        </div>
                                        <Divider />
                                    </>
                                )
                            })
                        }

                       
                        <Subtotaal item={cartData}/>
                    </div>
                    <Right item={cartData}/>
                </div>
            </div> : ""
        }
        </>
    )
}


export default Buynow