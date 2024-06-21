import React from 'react'

function Right() {
    return (
        <div className='right_buy'>
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightimg" />
            <div className='cost_right'>
                <p>Your order is eligible for FREE Delivery. <br />
                    <span style={{ color: "#565959" }}> Select this option at checkout. Details</span></p>
                    <h3>Subtotal (1 item(s)): <span style={{fontWeight:700, color:"#111"}}>&#8377;4049.00</span></h3>
                    <button className='rightbuy_btn'>Proceed To Buy</button>
                    <div className='emi'>
                        EMI available
                    </div>
            </div>

        </div>
    )
}

export default Right