import ProductTile from "../ProductTile/ProductTile";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const ProductsList = ({ products, pagination, setPagination, isLoading }) => {
  return (
    <section className="h-full gap-2 lg:gap-6 lg:p-12 flex justify-center lg:justify-start flex-wrap">
      <div className="w-full flex justify-center lg:justify-start items-center gap-4 p-6">
        <MdKeyboardArrowLeft
          className="w-8 h-8 bg-base-graybackground rounded-full hover:bg-main-primary hover:cursor-pointer"
          onClick={() =>
            pagination.page > 1 &&
            setPagination({ ...pagination, page: pagination.page - 1 })
          }
        />
        <span className="text-heading-5">{pagination.page}</span>
        <MdKeyboardArrowRight
          className="w-8 h-8 bg-base-graybackground rounded-full hover:bg-main-primary hover:cursor-pointer"
          onClick={() =>
            products.length === 20 &&
            setPagination({ ...pagination, page: pagination.page + 1 })
          }
        />
      </div>
      {isLoading ? (
        <span>Ładowanie...</span>
      ) : (
        products &&
        products.map((product, i) => <ProductTile key={i} product={product} />)
      )}
    </section>
  );
};

export default ProductsList;
