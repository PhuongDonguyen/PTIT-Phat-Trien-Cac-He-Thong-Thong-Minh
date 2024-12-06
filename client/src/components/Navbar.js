import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Navbar = () => {  
    const {data: motorcycleTypes, error, loading} = useFetch(`${process.env.REACT_APP_SERVER_API_URL}/motorcycleTypes`);

    return (
        <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary py-2">
            <div className="container-xl">
                <Link className="navbar-brand" to="/">
                    <img src="/logo-brand.png" alt="" style={{height: '50px', width: 'auto'}} />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Giới thiệu</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/link">Liên hệ</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Danh mục
                            </Link>
                            <ul className="dropdown-menu">
                                {motorcycleTypes && motorcycleTypes.map((type) => (
                                    <li key={type.MaLoai}>
                                        <Link className="dropdown-item" to={`/${type.MaLoai}`}>{type.TenLoai}</Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-secondary" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
