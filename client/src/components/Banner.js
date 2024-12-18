import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Banner = () => {
    const { data: motorcycleTypes, error, loading } = useFetch(`${process.env.REACT_APP_SERVER_API_URL}/motorcycleTypes`);

    // Fake posts for the "Tin tức xe" section
    const fakePosts = [
        { id: 1, title: "Tìm mua xe máy Honda SH Mode chính hãng giá tốt", date: "15/12/2024" },
        { id: 2, title: "Cập nhật giá xe mới nhất hôm nay", date: "1/12/2024" },
        { id: 3, title: "Vì sao nên mua SH 160 ABS – Lợi ích, giá thành, ưu đãi khi mua SH 160 ABS", date: "25/11/2024" },
        { id: 4, title: "Top 4 dòng xe Yamaha bán chạy nhất tại xe máy Phương Phú Phi", date: "15/10/2024" },
    ];

    return (
        <div className="container mt-4">
            <div className="row">
                {/* List Group */}
                <div className="col-md-4 p-0">
                    <div className="list-group">
                        {motorcycleTypes &&
                            motorcycleTypes.map((type, index) => (
                                <Link
                                    key={index}
                                    to={`/${type.MaLoai}`}
                                    className="list-group-item list-group-item-action"
                                >
                                    {type.TenLoai}
                                </Link>
                            ))}
                    </div>
                </div>

                {/* Bootstrap Carousel */}
                <div className="col-md-4">
                    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="6000">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <Link to="/slide-1">
                                    <img
                                        src="https://xemaynamtien.com/uploads/source/banner/4.png"
                                        className="d-block w-100"
                                        alt="Slide 1"
                                    />
                                </Link>
                            </div>
                            <div className="carousel-item">
                                <Link to="/slide-2">
                                    <img
                                        src="https://xemaynamtien.com/uploads/source/banner/2.png"
                                        className="d-block w-100"
                                        alt="Slide 2"
                                    />
                                </Link>
                            </div>
                            <div className="carousel-item">
                                <Link to="/slide-3">
                                    <img
                                        src="https://xemaynamtien.com/uploads/source/banner/1.png"
                                        className="d-block w-100"
                                        alt="Slide 3"
                                    />
                                </Link>
                            </div>
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExample"
                            data-bs-slide="prev"
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExample"
                            data-bs-slide="next"
                        >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                {/* "Tin tức xe" Section */}
                <div className="col-md-4 p-0 ps-3">
                    <h2 className="text-start mb-3">Tin tức xe</h2>
                    <Link to={'#'} className="d-flex flex-column gap-3 text-decoration-none" style={{}}>
                        {fakePosts.map((post) => (
                            <div
                                key={post.id}
                                className="border-0 hover-effect"
                                style={{ cursor: 'pointer' }}
                            >
                                <h6 className="title mb-1 text-dark fw-semibold text-truncate">
                                    {post.title}
                                </h6>
                                <small className="text-muted small">Ngày đăng: {post.date}</small>
                            </div>
                        ))}
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Banner;
