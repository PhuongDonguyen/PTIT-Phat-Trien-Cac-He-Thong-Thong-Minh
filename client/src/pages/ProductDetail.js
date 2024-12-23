import React from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";

const saveToRecentlyViewed = (product) => {
    const storedProducts = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    const updatedProducts = [
        product,
        ...storedProducts.filter((item) => item.id !== product.id),
    ].slice(0, 4); // Limit to 3 products
    localStorage.setItem("recentlyViewed", JSON.stringify(updatedProducts));
};

const getRecentlyViewed = () => JSON.parse(localStorage.getItem("recentlyViewed")) || [];

const ProductDetail = () => {
    const { motorcycleTypeId, productCode } = useParams();
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [searchParams] = useSearchParams();
    const color = searchParams.get("color");
    const navigate = useNavigate();

    // Fetch motorcycle type and product details
    const { data: motorcycleType } = useFetch(`${process.env.REACT_APP_SERVER_API_URL}/motorcycleTypes/${motorcycleTypeId}`);
    const { data: productDetails, error, loading } = useFetch(
        `${process.env.REACT_APP_SERVER_API_URL}/detailInventoryMotorcycles?motorcycleId=${productCode.split('-')[0]}&versionId=${productCode.split('-')[1]}${color ? `&color=${color}` : ""}`
    );
    const { data: productDetailColors } = useFetch(
        `${process.env.REACT_APP_SERVER_API_URL}/color?motorcycleId=${productCode.split('-')[0]}&versionId=${productCode.split('-')[1]}`
    );

    const colors = (productDetailColors || []).map((color) => ({
        name: color.TenMau,
        hex: color.CodeMau,
        code: color.MaMau,
    }));

    useEffect(() => {
        if (productDetails && productDetails[0]) {
            const product = {
                id: productDetails[0].MaXeTonKho,
                name: `${productDetails[0].TenXe} ${productDetails[0].TenPhienBan}`,
                image: productDetails[0].Image,
                price: productDetails[0].GiaXe,
                typeId: productDetails[0].MaLoai,
                productId: productDetails[0].MaXe,
                versionId: productDetails[0].MaPhienBan,
                colorId: productDetails[0].MaMau,
            };
            saveToRecentlyViewed(product);
        }
    }, [productDetails]);

    useEffect(() => {
        setRecentlyViewed(getRecentlyViewed());
    }, []);

    const handleColorClick = (color) => {
        navigate(`/${motorcycleTypeId}/${productCode}?color=${encodeURIComponent(color.code)}`);
    };

    const breadcrumbs = [
        { label: "Trang chủ", path: "/" },
        { label: "Sản phẩm", path: "/san-pham" },
        { label: `${motorcycleType?.TenLoai || "Đang tải..."}`, path: `/${motorcycleType?.MaLoai || ""}` },
        { label: `${productDetails?.[0]?.TenXe || ""} ${productDetails?.[0]?.TenPhienBan || ""}`, path: "/" },
    ];

    return (
        <div className="container-xl">
            <BreadCrumb breadcrumbs={breadcrumbs} />

            {loading && (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </div>
            )}

            {error && (
                <div className="alert alert-danger" role="alert">
                    Lỗi khi lấy thông tin sản phẩm: {error}
                </div>
            )}

            <div className="row mt-4">
                <div className="col-md-6 col-lg-4">
                    {productDetails && productDetails[0]?.Image ? (
                        <img
                            src={productDetails[0].Image}
                            alt={`${productDetails[0]?.TenXe} ${productDetails[0]?.TenPhienBan}`}
                            className="img-fluid rounded"
                        />
                    ) : (
                        <p>Không có hình ảnh sản phẩm.</p>
                    )}
                </div>

                <div className="col-md-6 col-lg-5 mb-4">
                    <h2 className="fw-semibold">{`${productDetails?.[0]?.TenXe || "Tên xe"} ${productDetails?.[0]?.TenPhienBan || ""}`}</h2>
                    <h4 className="text-danger fw-semibold">{`Giá tham khảo: ${productDetails?.[0]?.GiaXe?.toLocaleString() || "Liên hệ"}`}</h4>
                    <p>
                        <strong>Loại xe:</strong> {motorcycleType?.TenLoai || "Đang tải..."}
                    </p>
                    <p>
                        <strong>Phiên bản màu: </strong> {productDetails?.[0]?.TenMau || "Không có thông tin"}
                    </p>
                    <p className="p-3 bg-light rounded">{productDetails?.[0]?.MoTa || "Mô tả không có sẵn."}</p>

                    <div className="mt-4">
                        <h4>Chọn màu sắc</h4>
                        <Box display="flex" gap={2}>
                            {colors.map((color, index) => (
                                <Tooltip key={index} title={color.name}>
                                    <Box
                                        sx={{
                                            width: "30px",
                                            height: "30px",
                                            backgroundColor: color.hex,
                                            borderRadius: "50%",
                                            border: "0.5px solid #ddd",
                                            cursor: "pointer",
                                            "&:hover": { borderColor: "#eee" },
                                        }}
                                        onClick={() => handleColorClick(color)}
                                    ></Box>
                                </Tooltip>
                            ))}
                        </Box>
                    </div>
                    <div className="my-4 fw-semibold">Số lượng tồn kho: {productDetails?.[0]?.SoLuong}</div>
                </div>

                <div className="col-lg-3 rounded">
                    <h5 className="m-0 px-3 py-2 text-light bg-secondary">Sản phẩm vừa xem</h5>
                    <div className="list-group">
                        {recentlyViewed.map((product) => (
                            <Link
                                key={product.id}
                                to={`/${product.typeId}/${product.productId}-${product.versionId}${product.colorId ? `?color=${product.colorId}` : ""}`}
                                className="list-group-item list-group-item-action border border-bottom-0 border-top-0"
                            >
                                <div className="d-flex align-items-center">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="rounded me-3"
                                        style={{ width: "80px", height: "80px", objectFit: "contain" }}
                                    />
                                    <div className="flex-grow-1">
                                        <h6 className="mb-1">{product.name}</h6>
                                        <p className="mb-1 text-danger">
                                            {product.price ? `${product.price.toLocaleString()}` : "Liên hệ"}
                                        </p>
                                        <small className="text-muted">Click để xem chi tiết</small>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                {/* Accordion */}
                <div className="row">
                    <div className="col-9">
                        <div className="accordion mb-4" id="productDetailsAccordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                    >
                                        Thông tin chi tiết
                                    </button>
                                </h2>
                                <div
                                    id="collapseOne"
                                    className="accordion-collapse collapse show"
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#productDetailsAccordion"
                                >
                                    <div className="accordion-body">
                                        <p>
                                            <strong>Phân khối:</strong> {productDetails?.[0]?.PhanKhoi + ' cc' || "Không có thông tin"}
                                        </p>
                                        <p>
                                            <strong>Bảo hành:</strong> {productDetails?.[0]?.BaoHanh || "Không có thông tin"}
                                        </p>
                                        <p>
                                            <strong>Phanh ABS:</strong> {productDetails?.[0]?.PhanhABS ? "Có" : "Không"}
                                        </p>
                                        <p>
                                            <strong>Tiêu thụ:</strong> {productDetails?.[0]?.TieuThu + ' L/km' || "Không có thông tin"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="collapseTwo"
                                    >
                                        Chi Tiết
                                    </button>
                                </h2>
                                <div
                                    id="collapseTwo"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingTwo"
                                    data-bs-parent="#productDetailsAccordion"
                                >
                                    <div className="accordion-body">
                                        {productDetails?.[0]?.ChiTiet || "Không có thông tin chi tiết"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
