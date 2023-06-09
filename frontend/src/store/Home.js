import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'
import axios from "axios"
import Cookies from 'js-cookie'
import Categories from './Categories.js'

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
            <Categories/>
            {/* {handleErr && {handleErr}} */}
            {isLoading && <h1>Loading...</h1>}
            { data &&  <div  className="row" style={{ 'width': '100%', 'height': '100%' }}>
                            {data.map((item) => (
                                <div className="col-md-3" key={item.id}>
                                    <Link to={`/${item.id}`}>
                                        <div className="card">
                                            <img src={item.image} className="card-img-top" alt="..."/>
                                            <div className="card-body">
                                                <h5 className="card-title text-center">{item.title}</h5>
                                                <p className="card-text"></p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                )
                )}
                </div>
            }
        </div>
    )
}

export default Home