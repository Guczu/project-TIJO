import { useEffect, useState } from "react";
import ProductsFilter from "./ProductsFilter/ProductsFilter";
import ProductsList from "./ProductsList/ProductsList";
import fetchProducts from "../../utils/fetchProducts";
import { useLocation } from "react-router-dom";
import { useError } from "../../utils/ErrorContext/ErrorContext"

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { showError } = useError();
  const location = useLocation();
  const { shopFilter, filter, productName } = location.state || {};
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 20,
  });
  const [filters, setFilters] = useState({
    name: productName,
    category: [filter && filter],
    minPrice: 0,
    maxPrice: 9999,
    shop_name: [shopFilter && shopFilter],
  });

  useEffect(() => {
    async function getProducts() {
      const result = await fetchProducts(filters, pagination);

      if (result.error) {
        showError('Wystąpił błąd!')
      }

      if (result && !result.error) {
        setProducts(result);
        setIsLoading(false);
      }
    }
    getProducts();
  }, [filters, pagination]);

  useEffect(() => {
    const newFilters = {
      ...filters,
      name: productName,
      category: [filter && filter],
      shop_name: [shopFilter && shopFilter],
    };
    setFilters(newFilters);

    async function getProducts() {
      const result = await fetchProducts(newFilters, pagination);

      if (result.error) {
        showError('Wystąpił błąd!')
      }

      if (result && !result.error) {
        setProducts(result);
        setIsLoading(false);
      }
    }
    getProducts();
  }, [location]);

  return (
    <section className="container flex flex-col lg:flex-row mx-auto">
      <ProductsFilter filters={filters} setFilters={setFilters} />
      <ProductsList
        products={products}
        pagination={pagination}
        setPagination={setPagination}
        isLoading={isLoading}
      />
    </section>
  );
};

export default Products;
