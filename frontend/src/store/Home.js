import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'
import axios from "axios"
import Cookies from 'js-cookie'

const Home = ({q}) => {

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [handleErr, setErr] = useState(null)
    const url = q? `http://localhost:8000/api-item/?q=${q}` : `http://localhost:8000/api-item/`

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
    }, [q]);

    return (
        <div className="container">
            {/* {handleErr && {handleErr}} */}
            {isLoading && <h1>Loading...</h1>}
            { data &&  <div  className="row">
                            {data.map((item) => (
                                <div key={item.id} className="col-md-3">
                                    <div className="card">
                                        <img src={item.image} className="card-img-top" alt="..."/>
                                        <div className="card-body">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text"></p>
                                        </div>
                                        <div className="card-body b-0">
                                            <Link to={`/${item.id}`} className="card-link btn btn-primary">Bay</Link>
                                            <Link to='#' className="card-link btn btn-primary">add to Wish list</Link>
                                        </div>
                                    </div>
                                </div>
                )
                )}
                </div>
            }
        </div>
    )
}

export default Home