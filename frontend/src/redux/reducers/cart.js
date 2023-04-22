import { ADD_ITEM_TO_CART_FAIL } from "../action/type";
import { CART_SUCCES, CART_FAIL, ADD_ITEM_TO_CART_SUCCESS, ADD_ITEM_TO_CART_SUCCESS, RM_ITEM_FROM_CART_SUCCESS, RM_ITEM_FROM_CART_FAIL, DEC_ITEM_FROM_CART_SUCCES, DEC_ITEM_FROM_CART_FAIL } from "./type";



const initialState = {
    username: '',
    image: '',
    user: ''
}


export default function(state=initialState,action){
    const { type, payload } = action
    switch(type){
        case ADD_ITEM_TO_CART_SUCCESS:
        case RM_ITEM_FROM_CART_SUCCESS:
        case DEC_ITEM_FROM_CART_SUCCES:
        case CART_SUCCES:
            return {
                ...state,
                image: payload.profile.image,
                username: payload.username,
                user: payload.profile.user,
            }
        case CART_FAIL:
            return {
                ...state,
                image: '',
                username: '',
            }
        case ADD_ITEM_TO_CART_FAIL:
        case RM_ITEM_FROM_CART_FAIL:
        case DEC_ITEM_FROM_CART_FAIL:
            return { ...state}
        default:
            return state
    }
}