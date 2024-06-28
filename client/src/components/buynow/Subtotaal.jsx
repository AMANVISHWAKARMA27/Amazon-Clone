/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

function Subtotaal({item}) {

  const [price , setPrice] = useState(0)

  useEffect(() => {
    totalAmount()
  },[item])

  const totalAmount = () => {
    let price = 0
    item.map((item) => {
      price += item.price.cost
    })

    setPrice(price)
  }

  return (
    <div className='sub_item'>
        <h3>Subtotal ({item?.length} item(s)): <strong style={{fontWeight:700, color:"#111"}}>&#8377;{price}</strong></h3>
    </div>
  )
}

export default Subtotaal