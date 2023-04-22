import { CART_SUCCES, CART_FAIL, ADD_ITEM_TO_CART_SUCCESS, ADD_ITEM_TO_CART_SUCCESS, RM_ITEM_FROM_CART_SUCCESS, RM_ITEM_FROM_CART_FAIL, DEC_ITEM_FROM_CART_SUCCES, DEC_ITEM_FROM_CART_FAIL } from "./type";
import axios from "axios";
import Cookies from 'js-cookie'
import process from "process";


export const profile = () => async dispatch => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api-profile/`, config)
        if(res.data.error){
            dispatch({
                type: PROFILE_FAIL,
            })
        }
        else {
            dispatch({
                type: PROFILE_SUCCESS,
                payload: res.data
            })
        }
    }
    catch(err){
        dispatch({
            type: PROFILE_FAIL
        })
    }
}