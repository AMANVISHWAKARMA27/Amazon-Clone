export const getProducts = () => async (dispatch) => {
    try {
        const data = await fetch("https://amazon-clone-1-rwc2.onrender.com/getproducts", {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        })

        const res = await data.json()
        console.log(res)
        dispatch({type:"SUCCESS_GET_PRODUCTS", payload:res})
    } catch (error) {
        dispatch({type:"FAIL_GET_PRODUCTS", payload:error.response})
    }
}