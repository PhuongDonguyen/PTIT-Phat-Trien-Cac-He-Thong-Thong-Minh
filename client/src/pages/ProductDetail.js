import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip from Material-UI
import { Box } from "@mui/material"; // For layout and styling

const ProductDetail = () => {
    const { motocycleTypeId, productCode } = useParams();
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [searchParams] = useSearchParams();
    const color = searchParams.get("color");
    const navigate = useNavigate();

    // Fetch motorcycle type and product details
    const { data: motorcycleType } = useFetch(`${process.env.REACT_APP_SERVER_API_URL}/motorcycleTypes/${motocycleTypeId}`);
    const { data: productDetails, error, loading } = useFetch(
        `${process.env.REACT_APP_SERVER_API_URL}/detailInventoryMotorcycles?motorcycleId=${productCode.split('-')[0]}&versionId=${productCode.split('-')[1]}${color ? `&color=${color}` : ""}`
    );
    const {data: productDetailColors} = useFetch(`${process.env.REACT_APP_SERVER_API_URL}/color?motorcycleId=${productCode.split('-')[0]}&versionId=${productCode.split('-')[1]}`);


    // Example recently viewed products
    useEffect(() => {
        setRecentlyViewed([
            { id: 1, name: "Honda Wave 2023", image: "https://via.placeholder.com/150" },
            { id: 2, name: "Yamaha FZ", image: "https://via.placeholder.com/150" },
            { id: 3, name: "Suzuki GSX", image: "https://via.placeholder.com/150" },
        ]);
    }, []);

    const breadcrumbs = [
        { label: 'Trang chủ', path: '/' },
        { label: 'Sản phẩm', path: '/san-pham' },
        { label: `${motorcycleType?.TenLoai || "Đang tải..."}`, path: `/${motorcycleType?.MaLoai || ""}` },
        { label: `${productDetails?.[0]?.TenXe || ""} ${productDetails?.[0]?.TenPhienBan || ""}`, path: '/' },
    ];

    const colors = (productDetailColors || []).map(color => ({
        name: color.TenMau,
        hex: color.CodeMau,
        code: color.MaMau
    }));

    const handleColorClick = (color) => {
        navigate(`/${motocycleTypeId}/${productCode}?color=${encodeURIComponent(color.code)}`);
    };

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
                {/* Product Image */}
                <div className="col-md-6 col-lg-4">
                    {productDetails && productDetails[0].Image ? (
                        <img
                            src={productDetails[0].Image}
                            alt={`${productDetails[0].TenXe} ${productDetails[0].TenPhienBan}`}
                            className="img-fluid rounded"
                        />
                    ) : (
                        <p>Không có hình ảnh sản phẩm.</p>
                    )}
                </div>
                {/* Product Details */}
                <div className="col-md-6 col-lg-5 mb-4">
                    <h2 className="fw-semibold">{`${productDetails?.[0]?.TenXe || "Tên xe"} ${productDetails?.[0]?.TenPhienBan || ""}`}</h2>
                    <h4 className="text-danger fw-semibold">{`Giá tham khảo: ${productDetails?.[0]?.GiaXe?.toLocaleString() || "Liên hệ"}`}</h4>
                    <p>
                        <strong>Loại xe:</strong> {motorcycleType?.TenLoai || "Đang tải..."}
                    </p>
                    <p className="p-3 bg-light rounded">
                        {productDetails?.[0]?.MoTa || "Mô tả không có sẵn."}
                    </p>

                    {/* Color Picker */}
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
                    <div className="my-4 fw-semibold">Số lượng tồn kho: { productDetails?.[0]?.SoLuong}</div>
                </div>

                {/* Recently Viewed Products */}
                <div className="col-lg-3 rounded">
                    <h5 className="m-0 px-3 py-2 text-light bg-secondary">Sản phẩm vừa xem</h5>
                    <div className="list-group">
                        {recentlyViewed.map((product) => (
                            <Link
                                key={product.id}
                                to={`/san-pham/${product.id}`}
                                className="list-group-item list-group-item-action border border-bottom-0 border-top-0"
                            >
                                <div className="d-flex align-items-center">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="rounded me-3"
                                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                    />
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1">{product.name}</h5>
                                        <p className="mb-1 text-danger">{product.price ? `${product.price.toLocaleString()}₫` : "Liên hệ"}</p>
                                        <small className="text-muted">Click để xem chi tiết</small>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
