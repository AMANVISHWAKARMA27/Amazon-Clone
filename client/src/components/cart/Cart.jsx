/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import "./cart.css"
import { CircularProgress, Divider } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { LoginContext } from '../context/ContextProvider'


const Cart = () => {

    const { id } = useParams("")

    const history = useNavigate("")

    const { account, setAccount } = useContext(LoginContext)
    console.log(account)

    const [indData, setIndData] = useState("")
    console.log(indData)

    const getIndividualData = async () => {
        const res = await fetch(`https://amazon-clone-1-rwc2.onrender.com/getproductsone/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials:"include"
        })

        const data = await res.json()
        // console.log(data)

        if (res.status !== 201) {
            console.log("No data available")
        } else {
            console.log('getData')
            setIndData(data)
        }
    }

    useEffect(() => {
        setTimeout(getIndividualData, 1500)

    }, [id])

    // add to cart implementation
    const addToCart = async (id) => {
        const checkResponse = await fetch(`https://amazon-clone-1-rwc2.onrender.com/addCart/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                indData
            }),
            credentials: true
        })

        const data = await checkResponse.json()
        console.log("Frontend Data: " + data)

        if (checkResponse.status === 401 || !data) {
            console.log("Invalid user")
            alert("Invalid User")
        } else {
            alert('Item added to the cart')
            history("/buynow")
            setAccount(data)
        }
    }


    return (

        <div className="cart_section">
            {indData && Object.keys(indData).length && <div className="cart_container">
                <div className="left_cart">
                    <img src={indData.url} alt="cart" />
                    <div className="cart_btn">
                        <button className="cart_btn1" onClick={() => addToCart(indData.id)}>Add to Cart</button>
                        <button className="cart_btn2">Buy Now</button>
                    </div>
                </div>
                <div className="right_cart">
                    {indData.title && <h3>{indData.title.shortTitle}</h3>}
                    {indData.title && <h4>{indData.title.longTitle}</h4>}

                    <Divider />
                    {indData.price && <p className="mrp">M.R.P. : &#8377;{indData.price.mrp}</p>}
                    {indData.price && <p>Deal of the Day : <span style={{ color: "#B12704" }}>&#8377;{indData.price.cost}</span></p>}
                    {indData.price && <p>You save : <span style={{ color: "#B12704" }}>&#8377;{indData.price.mrp - indData.price.cost} ({indData.price.discount})</span></p>}

                    <div className="discount_box">
                        <h5 >Discount : <span style={{ color: "#111" }}>{indData.discount}</span> </h5>
                        <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>Oct 8 - 21</span> Details</h4>
                        <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11AM</span></p>
                    </div>
                    <p className="description">About the Iteam : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}> {indData.description}</span></p>
                </div>
            </div>}

            {!indData ? <div className="circle">
                <CircularProgress />
                <h2> Loading....</h2>
            </div> : ""}
        </div>
    )
}
export default Cart