import { useState } from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";
import ProductsFilterList from "./ProductsFilterList";

const ProductsFilter = ({ filters, setFilters }) => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  return (
    <div className="w-fill h-fill lg:p-12">
      <span className="text-heading-5 p-6 hidden lg:flex lg:justify-center">
        Dostosuj
      </span>

      <div className="container mx-auto flex justify-center items-center">
        <CustomButton
          styles="flex lg:hidden items-center justify-center text-body-2 mt-4 bg-main-primary hover:bg-main-third text-white px-6 py-2"
          onClick={() => setIsFiltersExpanded(true)}
        >
          <span>Filtry</span>
        </CustomButton>
      </div>

      {isFiltersExpanded && (
        <div className="w-[300px] h-screen fixed lg:hidden left-0 top-0 flex flex-col justify-center items-center rounded-r-[10px] bg-base-softbackground z-50 backdrop-blur-[2px] shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
          <ProductsFilterList
            filters={filters}
            setFilters={setFilters}
            setIsFiltersExpanded={setIsFiltersExpanded}
            isFiltersExpanded={isFiltersExpanded}
          />
        </div>
      )}

      <div className="items-center gap-2 hidden lg:flex lg:flex-col">
        <ProductsFilterList
          filters={filters}
          setFilters={setFilters}
          setIsFiltersExpanded={setIsFiltersExpanded}
          isFiltersExpanded={isFiltersExpanded}
        />
      </div>
    </div>
  );
};

export default ProductsFilter;
