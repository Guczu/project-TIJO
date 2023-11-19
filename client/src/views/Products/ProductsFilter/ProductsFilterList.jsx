import ProductsCheckbox from "./ProductsCheckbox";
import { Formik, Form, Field } from "formik";
import fetchFilters from "../../../utils/fetchFilters";
import { useEffect, useState } from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { AiOutlineClose } from "react-icons/ai";
import { useError } from "../../../utils/ErrorContext/ErrorContext"

const ProductsFilterList = ({
  filters,
  setFilters,
  setIsFiltersExpanded,
  isFiltersExpanded,
}) => {
  const { showError } = useError();
  const [isLoading, setIsLoading] = useState(true);
  const [availableFilters, setAvailableFilters] = useState();

  useEffect(() => {
    async function getFilters() {
      const available_filters = await fetchFilters();

      if (available_filters.error) {
        showError('Wystąpił błąd!');
      }

      if (available_filters && !available_filters.error) {
        setAvailableFilters(available_filters);
      }
      setIsLoading(false);
    }
    getFilters();
  }, []);

  return (
    <div className="w-full relative overflow-auto">
      <button
        className="absolute lg:hidden right-0 top-0 p-6"
        onClick={() => setIsFiltersExpanded(false)}
        type="button"
      >
        <span className="sr-only">Zamknij okno</span>
        <AiOutlineClose aria-hidden="true" className="w-6 h-6" />
      </button>
      <Formik
        initialValues={filters}
        onSubmit={(values) => {
          setFilters(values);
          setIsFiltersExpanded(false);
        }}
        enableReinitialize={true}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form className="w-full flex flex-col justify-center items-center">
            <span className="pt-12 lg:pt-0 text-heading-5 lg:text-heading-3">Sklep</span>

            <div className="flex flex-col gap-3 mb-8 lg:mb-12">
              {isLoading ? (
                <span>Ładowanie...</span>
              ) : (
                availableFilters &&
                availableFilters.availableShops.map((name, i) => (
                  <ProductsCheckbox
                    key={i}
                    id={name}
                    name={"shop_name"}
                    value={name}
                  />
                ))
              )}
            </div>

            <span className="text-heading-5 lg:text-heading-3">Kategoria</span>

            <div className="flex flex-col gap-3 mb-8 lg:mb-12">
              {isLoading ? (
                <span>Ładowanie...</span>
              ) : (
                availableFilters &&
                availableFilters.availableCategories.map((name, i) => (
                  <ProductsCheckbox
                    key={i}
                    id={name}
                    name={"category"}
                    value={name}
                  />
                ))
              )}
            </div>

            <span className="text-heading-5 lg:text-heading-3">Cena</span>

            <div className="flex flex-col gap-1 mb-8 lg:mb-12">
              <label htmlFor="min">
                <Field
                  type="text"
                  id="min"
                  name="minPrice"
                  placeholder="Min"
                  onChange={handleChange}
                  value={values.minPrice}
                  className="w-[5rem] m-2 rounded-[15px] px-4 border-[2px] focus:outline-none"
                />
              </label>
              <label htmlFor="max">
                <Field
                  type="text"
                  id="max"
                  name="maxPrice"
                  placeholder="Max"
                  onChange={handleChange}
                  value={values.maxPrice}
                  className="w-[5rem] m-2 rounded-[15px] px-4 border-[2px] focus:outline-none"
                />
              </label>
            </div>

            <CustomButton
              styles="text-heading-5 lg:text-body-2 bg-main-primary hover:bg-main-third text-white px-6 py-2 mb-8"
              type="submit"
            >
              <span>Zastosuj</span>
            </CustomButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductsFilterList;
