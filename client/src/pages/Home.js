import { useEffect } from "react";
import Banner from "../components/Banner";
import ProductCategory from "../components/ProductCategory";
import useFetch from "../hooks/useFetch";

const Home = () => {
    const { data: motorcycleTypes, error, loading } = useFetch(`${process.env.REACT_APP_SERVER_API_URL}/motorcycleTypes`);

    return (
        <div className="container-xl">
            <Banner />
            {motorcycleTypes && motorcycleTypes.map((type) => (
                <ProductCategory categoryId={type?.MaLoai} categoryName={type?.TenLoai} />
            ))}
        </div>
    )
}

export default Home;