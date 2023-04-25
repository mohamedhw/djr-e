import Cookies from 'js-cookie'
import process from "process";
import axios from "axios"
import { useEffect, useState } from "react"

const AddToWish = ({pk, wish_x}) => {
    
    const [isWished, setIsWished] = useState(wish_x);


    const HandelSubmit = () => {
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken')
            }
        };
        const data = {}
        axios.post(`${process.env.REACT_APP_API_URL}/${pk}/wish/`, data, config)
        .then(response => {
            setIsWished(response.data.wished)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    return (
        <button className="m-1 card-link btn btn-warning col-sm-6" style={{ 'width':'auto' }} onClick={HandelSubmit} action={HandelSubmit}>{isWished ? "Wish" : "Wished" }</button>
    )

}

export default AddToWish;