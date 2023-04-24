import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'
import axios from "axios"
import Cookies from 'js-cookie'

const Cart = () => {

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [handleErr, setErr] = useState(null)
    const url = 'http://localhost:8000/api-cart/'

    const [total, setTotal] = useState(0)

    
    useEffect(() => {
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken')
            }
        }
        axios.get(url, config)
        .then((res) => {
            setData(res.data)

            const totalPrice = res.data.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0)
            setTotal(totalPrice)

            setLoading(false);
            setErr(null);
        })
        .catch(err =>{
            setLoading(false);
            setErr(err.message);
        })
    }, []);

    return(
        <div>
            {isLoading && <h1>Loading...</h1>}
            { data &&  <div  classNameName="row">
                        <main className="mt-5 pt-5" style={{"margin-bottom":"135px"}}>
                            <div className="container">
                            <h2 className="mb-3 pb-2 mt-3">Your Cart</h2>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">quantity</th>
                                                <th scope="col">price</th>
                                                <th scope="col">total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {data.map((post) => (
                                                    <tr>
                                                        <td>{ post.name }</td>
                                                        <td>
                                                            <Link to="#"><i className="fas fa-minus-circle"></i></Link>
                                                            <p>{ post.quantity }</p>
                                                            <Link to="#"><i className="fas fa-plus-circle"></i></Link>
                                                        </td>
                                                        <td>${ post.price }</td>
                                                        <td>${ post.price * post.quantity }
                                                            <Link style={{"color":"#2196f3"}} to="#">
                                                                <i className="fas fa-trash float-right"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    )
                                                )}                                                
                                                <tr> 
                                                    <td colspan="3"><b>Total price</b></td>
                                                    <td>
                                                        <b>${total}</b>
                                                    </td>

                                                </tr>
                                        </tbody>
                                    </table>
                            
                                </div>

                                <div className="col-md-12 col-sm-12 d-flex justify-content-end p-4" style={{'width': '100%'}}>
                                    <Link className="btn btn-warning ml-auto mr-auto p-2 mx-2" to="#">Checkout</Link>
                                    <Link className="btn btn-primary ml-auto mr-auto p-2 mx-2" to="#">Continue shopping</Link>
                                </div>
                            </div>
                        </main>                                
                    </div>
            }
        </div>
    )
}

export default Cart;