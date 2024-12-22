import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Footer() {
    return (
        <footer className="bg-light text-center text-lg-start text-muted">
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <div className="me-5 d-none d-lg-block">
                    <span>Hãy kết nối với chúng tôi qua:</span>
                </div>

                <div>
                    <a href="#" className="me-4 text-reset">
                        <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="me-4 text-reset">
                        <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="me-4 text-reset">
                        <i className="bi bi-google"></i>
                    </a>
                    <a href="#" className="me-4 text-reset">
                        <i className="bi bi-instagram"></i>
                    </a>
                    <a href="#" className="me-4 text-reset">
                        <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="#" className="me-4 text-reset">
                        <i className="bi bi-github"></i>
                    </a>
                </div>
            </section>

            <section>
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <i className="bi bi-gem me-3"></i> Phương Phú Phi Store
                            </h6>
                            <p>
                                Chúng tôi cung cấp những mẫu xe mới, chất lượng và giá cả phải chăng nhất trên thị trường.
                            </p>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Sản phẩm</h6>
                            <p>
                                <Link to="#" className="text-reset">
                                    Xe Côn Tay
                                </Link>
                            </p>
                            <p>
                                <Link to="#" className="text-reset">
                                    Xe Tay Ga
                                </Link>
                            </p>
                            <p>
                                <Link to="#" className="text-reset">
                                    Xe Số
                                </Link>
                            </p>
                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Liên kết nhanh</h6>
                            <p>
                                <Link to="#" className="text-reset">
                                    Giới thiệu
                                </Link>
                            </p>
                            <p>
                                <Link to="#" className="text-reset">
                                    Liên hệ
                                </Link>
                            </p>
                            <p>
                                <Link to="#" className="text-reset">
                                    Danh mục
                                </Link>
                            </p>
                            <p>
                                <Link to="#" className="text-reset">
                                    Trợ giúp
                                </Link>
                            </p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
                            <p>
                                <i className="bi bi-house-door me-2"></i> 52 Man Thiện. Phường Tăng Nhơn Phú A. Quận 9. TP.HCM
                            </p>
                            <p>
                                <i className="bi bi-envelope me-3"></i> info@example.com
                            </p>
                            <p>
                                <i className="bi bi-phone me-3"></i> + 01 234 567 88
                            </p>
                            <p>
                                <i className="bi bi-printer me-3"></i> + 01 234 567 89
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
}
