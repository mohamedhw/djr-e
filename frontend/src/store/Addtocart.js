import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import process from "process";
import axios from "axios"




const AddToCart = ({pk}) => {

    const HandelSubmit = () => {
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken')
            }
        };
        const data = {}
        axios.post(`${process.env.REACT_APP_API_URL}/${pk}/add_to_cart/`, data, config)
        .then(response => {
            console.log(response)
        })
        .catch(err =>{
            console.log(err) 
        })
    }

    


    return (
        <button className="btn btn-primary btn-md my-0 p" onClick={HandelSubmit} action={HandelSubmit}>Add to cart
            {/* <i className="fas fa-shopping-cart ml-1"></i> */}
        </button>
    )
}

export default AddToCart;