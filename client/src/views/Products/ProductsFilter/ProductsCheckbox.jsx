import { Field } from "formik";

const ProductsCheckbox = ({ id, name, value }) => {
  return (
    <label htmlFor={id} className="w-max">
      <Field
        type="checkbox"
        id={id}
        name={name}
        value={value}
        className="w-7 h-7 lg:w-4 lg:h-4 rounded accent-main-primary"
      />
      <span className="px-2 text-heading-4">{value}</span>
    </label>
  );
};

export default ProductsCheckbox;
