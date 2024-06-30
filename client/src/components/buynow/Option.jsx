/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import "./buynow.css"
import { LoginContext } from '../context/ContextProvider'

function Option({ deletedata, get }) {

    const { account, setAccount } = useContext(LoginContext)

    const removeData = async (req, res) => {
        try {
            const res = await fetch(`https://amazon-clone-1-rwc2.onrender.com/remove/${deletedata}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json()
            console.log(data)

            if (res.status === 400 || !data) {
                console.log("Error while reovintg data");
            } else {
                console.log("Item deleted successfully.")
                setAccount(data)
                get()
                alert("Item removed successfully.")
            }
        } catch (error) {
            console.log('Error while deleting item: ' + error.message)
        }
    }
    return (
        <div className='add_remove_select'>
            <select>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
            <p style={{ cursor: "pointer" }} onClick={() => removeData(deletedata)}>Delete</p><span>|</span>
            <p className='forremovemedia'>Save for later</p><span>|</span>
            <p className='forremovemedia'>See more like this</p>
        </div>
    )
}

export default Option