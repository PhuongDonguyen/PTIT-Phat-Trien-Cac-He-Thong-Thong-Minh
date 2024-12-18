import React, { useEffect } from "react";
import Slider from "react-slick"; // Import react-slick carousel
import PropTypes from "prop-types"; // For prop validation
import "./ProductCategory.css";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

// Custom Next and Prev Arrows
const NextArrow = ({ onClick }) => (
    <button
        type="button"
        className="slick-arrow slick-next"
        onClick={onClick}
        aria-label="Next"
    >
        <i class="bi bi-chevron-compact-right"></i>
    </button>
);

const PrevArrow = ({ onClick }) => (
    <button
        type="button"
        className="slick-arrow slick-prev"
        onClick={onClick}
        aria-label="Previous"
    >
        <i class="bi bi-chevron-compact-left"></i>
    </button>
);

// ProductCard component to display each product
const ProductCard = ({ product }) => (
    <Link className="text-decoration-none" to={`/${product.MaLoai}/${product.MaXe}-${product.MaPhienBan}`}>
        <div className="card product-card h-100 border-0 px-2">
            <img src={product.image} className="card-img-top" style={{ height: '200px', width: 'auto' }} alt={product.name} />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">Giá niêm yết: <span className="text-danger">{product.price}</span></p>
            </div>
        </div>
    </Link>

);

ProductCard.propTypes = {
    product: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
    }).isRequired,
};

// Main ProductCategory component
const ProductCategory = ({ categoryId, categoryName }) => {
    const { data: products, error, loading } = useFetch(`${process.env.REACT_APP_SERVER_API_URL}/inventoryMotorcycles/${categoryId}`);

    useEffect(() => {   
        console.log(products);
    }, [products]);

    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Show 4 products at a time
        slidesToScroll: 1,
        arrows: true, // Enable arrows
        dots: false, // Disable dots
        nextArrow: <NextArrow />, // Use custom next arrow
        prevArrow: <PrevArrow />, // Use custom prev arrow
        responsive: [
            {
                breakpoint: 1024, // For medium screens
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 600, // For smaller screens
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480, // For very small screens
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="product-category my-4">
            <h3 className="text-uppercase mb-2 fw-semibold">{categoryName}</h3>
            <Slider {...settings}>
                {products && products.map((product) => (
                    <ProductCard
                        key={`${product.MaXe}-${product.MaPhienBan}`}
                        product={{
                            ...product,
                            name: product.TenXe,
                            image: product.Anh,
                            price: product.GiaTieuChuan,
                        }}
                    />
                ))}
            </Slider>
        </div>
    );
};

ProductCategory.propTypes = {
    categoryName: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ProductCategory;
