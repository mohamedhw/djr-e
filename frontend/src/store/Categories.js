import {Link} from 'react-router-dom'


const Categories = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark mdb-color lighten-3 mt-3 mb-5">
            <div class="container">
                <div className='navbar-header'>
                    <span className="navbar-brand mx-4">Categories:</span>
                    <button class="navbar-toggler" aria-expanded="false" aria-controls="navbar" type="button" data-toggle="collapse" data-target="#navbar"
                    aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item">
                            <Link className="nav-link" to="#">All</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#}">Shirts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#}">Sport wears</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="# %}">Outwears</Link>
                        </li>

                    </ul>
                </div>
            </div>


        </nav>
    )
}

export default Categories;