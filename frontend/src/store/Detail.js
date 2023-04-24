import { useFetch } from "../useFetch"
import { useParams } from "react-router-dom"
// import {connect} from 'react-redux'


const Detail = () => {
    const {postId} = useParams()
    const {data:item, isLoading, handleError} = useFetch(`http://localhost:8000/api-item/${postId}/`)
    // const logedin_view = (
    //     <div classNameName="col-md-4">
    //         {/* <Link classNameName="btn btn-primary m-1" to={`/post-update/${postId}`}>Update</Link> */}
    //         {/* <Link classNameName="btn btn-danger m-1" to={`/post-delete/${postId}`}>Delete</Link> */}
    //     </div>
    // )
    return (
        <div>
            {/* {handleError && {handleError}} */}
            {isLoading && <h1>Loading...</h1>}
            {item && 
                <div>
                    <main className="mt-5 pt-4">
                        <div className="container dark-grey-text mt-5">

                        <div className="row wow fadeIn">

                            <div className="col-md-6 mb-4">

                            <img src={ item.image } className="img-fluid" alt=""/>

                            </div>

                            <div className="col-md-6 mb-4">

                            <div className="p-4">

                                <div className="mb-3">
                                    <span className="badge purple mr-1">{ item.category }</span>
                                </div>

                                {item.discount_price ?
                                    <p className="lead">
                                        <span className="mr-1">
                                        <del>${ item.price }</del>
                                        </span>
                                        <span className="mx-2">${ item.discount_price }</span>
                                    </p>
                                :
                                    <p className="lead">
                                        <span>${ item.price }</span>
                                    </p>}

                                <p className="lead font-weight-bold">Description</p>

                                <p className="p-2">{ item.description }</p>

                                {/* <!-- <form className="d-flex justify-content-left">
                                <input type="number" value="1" aria-label="Search" className="form-control" style="width: 100px">
                                <button className="btn btn-primary btn-md my-0 p" type="submit">Add to cart
                                    <i className="fas fa-shopping-cart ml-1"></i>
                                </button>
                                </form> --> */}
                                {/* <a href="{{ item.get_add_to_cart_url }}"> */}
                                <button className="btn btn-primary btn-md my-0 p" >Add to cart
                                    <i className="fas fa-shopping-cart ml-1"></i>
                                </button>
                                {/* </a> */}
                                {/* <a href="{% url 'store:remove_item' item.pk %}"> */}
                                <button className="btn btn-danger btn-md my-0 p mx-1" >Remove from cart
                                    <i className="fas fa-shopping-cart ml-1"></i>
                                </button>
                                {/* </a> */}
                            </div>

                            </div>

                        </div>

                        <hr/>

                        <div className="row d-flex justify-content-center wow fadeIn">

                            <div className="col-md-6 text-center">

                            <h4 className="my-4 h4">Additional information</h4>

                            <p>{ item.info }</p>

                            </div>

                        </div>

                        <div className="row wow fadeIn">

                            <div className="col-lg-4 col-md-12 mb-4">

                            <img src={ item.image_2 } className="img-fluid" alt=""/>

                            </div>

                            <div className="col-lg-4 col-md-6 mb-4">

                            <img src={ item.image_3 } className="img-fluid" alt=""/>

                            </div>

                            <div className="col-lg-4 col-md-6 mb-4">

                            <img src={ item.image_4 } className="img-fluid" alt=""/>

                            </div>

                        </div>

                        </div>
                    </main>
                </div>
            }
        </div>
    )
}


// const mapStateToProps = state => ({
//     username_g : state.profile.username,
// })

// export default connect(mapStateToProps,{})(Detail)

export default Detail
