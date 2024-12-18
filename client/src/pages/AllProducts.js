import { Link, useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import useFetch from '../hooks/useFetch';
import { useState } from 'react';

const AllProducts = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: motorcycles, pagination, loading: motorcyclesLoading, error: motorcyclesError } = useFetch(
        `${process.env.REACT_APP_SERVER_API_URL}/inventoryMotorcycles`,
        { page, limit }
    );

    const handlePageChange = (event, newPage) => {
        console.log("New page: ", newPage);
        setPage(newPage);
    };

    console.log(motorcycles);

    return (
        <div className="container-xl">
            <h4 className='my-4'>Tất cả xe</h4>
            {motorcyclesLoading && <p>Loading motorcycles...</p>}

            {motorcycles && motorcycles.length > 0 && (
                <div className="row">
                    {motorcycles.map((motorcycle) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={motorcycle.MaXe}>
                            <Link className="text-decoration-none" to={`/${motorcycle.MaLoai}/${motorcycle.MaXe}-${motorcycle.MaPhienBan}`}>
                                <div className="card h-100 border-0">
                                    <img
                                        src={motorcycle.Anh}
                                        className="card-img-top"
                                        alt={motorcycle.TenXe}
                                        style={{ height: '230px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{motorcycle.TenXe}</h5>
                                        <p className="card-text">
                                            <strong>Giá từ:</strong> {motorcycle.GiaTieuChuan}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            {pagination && (
                <div className="d-flex justify-content-center my-4">
                    <Pagination
                        count={pagination.totalPages}
                        page={page}
                        onChange={handlePageChange}
                        shape="rounded"
                        color="primary"
                    />
                </div>
            )}
        </div>
    );
};

export default AllProducts;
