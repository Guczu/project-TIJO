import CustomButton from '../../../components/CustomButton/CustomButton'
import { LiaCartPlusSolid } from 'react-icons/lia'
import saveToCart from '../../../utils/saveToCart';
import { useEffect, useState } from 'react';
import ProductsAddCartPopup from '../ProductsAddCartPopup/ProductsAddCartPopup';

const ProductTile = ({ product }) => {
  const { product_name, price, image_url } = product;
  const [addProductPopup, setAddProductPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAddProductPopup(false);
    }, 3000);

    return () => clearTimeout(timer);
  },[addProductPopup])

  return (
    <>
      {addProductPopup && <ProductsAddCartPopup/>}
      <div 
        className="group relative w-[200px] h-[200px] border-[3px] rounded-[15px] flex flex-col justify-center items-center hover:cursor-pointer"
        onClick={() => {
          saveToCart(product)
          setAddProductPopup(true);
        }}
      >
        <img 
          src={image_url} 
          alt={product_name} 
          className="w-3/4 h-3/4 rounded-[15px] object-contain"
        />

        <span className="text-heading-2 text-center">
          {product_name}
        </span>

        <span className="text-heading-2">
          {price}zł
        </span>

        <div className="absolute w-full h-full hidden group-hover:flex justify-center items-center">
          <CustomButton 
            styles="w-full h-full flex flex-col border-0 text-heading-4 border-main-primary text-black text-bold"
          >
            <div className='absolute top-0 right-0 m-2 w-[40px] h-[40px] p-2 flex flex-col justify-center items-center bg-main-primary rounded-[10px]'>
              <LiaCartPlusSolid className='absolute w-[25px] h-[25px]'/>
            </div>
          </CustomButton>
        </div>
      </div>
    </>
  )
}

export default ProductTile