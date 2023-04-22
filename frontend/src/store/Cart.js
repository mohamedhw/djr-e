import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'
import axios from "axios"
import Cookies from 'js-cookie'

const Cart = () => {

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [handleErr, setErr] = useState(null)
    const url = 'http://localhost:8000/api-cart/'
    console.log(data)
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
            {data.map((post) => (
                                            <main className="mt-5 pt-5" style="margin-bottom:135px">
                                                <div className="container">
                                                <h2 className="mb-3 pb-2 mt-3">Your Cart</h2>
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <tbody>
                                                            <thead>
                                                                <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">quantity</th>
                                                                <th scope="col">price</th>
                                                                <th scope="col">total</th>
                                                                </tr>
                                                            </thead>
                                                                {/* {% for data in object.items.all %} */}
                                                                    <tr>
                                                                        {/* <th scope="row">{ forloop.counter }</th> */}
                                                                        <td>{ post.item.title }</td>
                                                                        <td>
                                                                        <a href="{% url 'store:remove_one_item' data.item.pk %}"><i className="fas fa-minus-circle"></i></a>
                                                                        { post.quantity }
                                                                        <a href="{% url 'store:add_to_cart' data.item.pk %}"><i className="fas fa-plus-circle"></i></a>
                                                                        </td>
                                                                        {/* {% if data.item.discount_price %} */}
                                                                            <td>${ post.item.discount_price }</td>
                                                                            <td>${ post.get_total_discount_price }
                                                                            <a style="color:#2196f3" href="{% url 'store:remove_item' data.item.pk %}">
                                                                                <i className="fas fa-trash float-right"></i>
                                                                            </a>
                                                                            </td>
                                                                        {/* {% else %} */}
                                                                            <td>${ post.item.price }</td>
                                                                            <td>${ post.get_total_price }
                                                                            <a style="color:#2196f3" href="{% url 'store:remove_item' data.item.pk %}">
                                                                                <i className="fas fa-trash float-right"></i>
                                                                            </a>
                                                                            </td>
                                                                        {/* {% endif %} */}
                                                                    </tr>
                                                                    {/* {% empty %} */}
                                                                    <tr>
                                                                    <td colspan="5"><b>Your cart is empty</b></td>
                                                                    <a classNameName="btn btn-primary float-right" href="{% url 'store:home' %}">Continue shopping</a>
                                                                    </tr>
                                                                {/* {% endfor %} */}
                                                                {/* {% if object.get_total %} */}
                                                                    <tr> 
                                                                    <td colspan="4"><b>Total price</b></td>
                                                                    <td>
                                                                        {/* <b>${ object.get_total }</b> */}
                                                                    </td>

                                                                    </tr>
                                                                    <tr>
                                                                    <td colspan="5">
                                                                        <a className="btn btn-warning float-right ml-3" href="{% url 'store:checkout' %}">Checkout</a>
                                                                        <a className="btn btn-primary float-right" href="{% url 'store:home' %}">Continue shopping</a>
                                                                    </td>
                                                                    </tr>
                                                                {/* {% endif %} */}
                                                            </tbody>
                                                        </table>
                                                
                                                    </div>

                                                </div>
                                            </main>
                                        
                                    )
                            )}
            </div>
            }
        </div>
    )
}

export default Cart;