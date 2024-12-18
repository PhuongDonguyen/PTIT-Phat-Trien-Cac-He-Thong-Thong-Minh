import { Link, useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import useFetch from '../hooks/useFetch';
import { useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';

const ProductCategory = () => {
    const { motorcycleTypeId } = useParams();

    const [page, setPage] = useState(1);
    const limit = 5;

    const { data: motorcycleType, loading: typeLoading, error: typeError } = useFetch(
        `${process.env.REACT_APP_SERVER_API_URL}/motorcycleTypes/${motorcycleTypeId}`
    );

    const { data: motorcycles, pagination, loading: motorcyclesLoading, error: motorcyclesError } = useFetch(
        `${process.env.REACT_APP_SERVER_API_URL}/inventoryMotorcycles/${motorcycleTypeId}`,
        { page, limit }
    );

    const handlePageChange = (event, newPage) => {
        console.log("New page: ", newPage);
        setPage(newPage);
    };

    const breadcrumbs = [
        { label: 'Trang chủ', path: '/' },
        { label: 'Sản phẩm', path: '/san-pham' },
        { label: `${motorcycleType?.TenLoai || "Đang tải..."}`, path: `/${motorcycleType?.MaLoai || ""}` }
    ];

    console.log(motorcycles);

    return (
        <div className="container-xl">
            <BreadCrumb breadcrumbs={breadcrumbs} />
            {typeLoading && <p>Loading motorcycle type...</p>}
            {typeError && <p>Error: {typeError}</p>}
            {motorcyclesError && <p>Error: {motorcyclesError}</p>}

            {!typeLoading && motorcycleType && (
                <h4 className='my-4'>{motorcycleType?.TenLoai}</h4>
            )}

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

export default ProductCategory;
