import { useEffect, useState } from "react"
import { getMostPopular } from "../../services/products.service";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Header from "../../components/Header/Header";
import { AiOutlinePlus } from 'react-icons/ai'
import CustomButton from "../../components/CustomButton/CustomButton";
import saveToCart from "../../utils/saveToCart";
import ProductsAddCartPopup from "../Products/ProductsAddCartPopup/ProductsAddCartPopup";
import { useError } from "../../utils/ErrorContext/ErrorContext"

const MostPopularSlider = () => {
    const { showError } = useError();
    const [products, setProducts] = useState([]);
    const [addProductPopup, setAddProductPopup] = useState(false);

    useEffect(() => {
        const fetchPopularProducts = async () => {
            const fetchedProducts = await getMostPopular();

            if(fetchedProducts.error) {
                showError('Wystąpił błąd!');
              }
            
            if (fetchedProducts) {
                setProducts(fetchedProducts);
            }
        }
        fetchPopularProducts();
    },[])

    useEffect(() => {
        const timer = setTimeout(() => {
          setAddProductPopup(false);
        }, 3000);
    
        return () => clearTimeout(timer);
      },[addProductPopup])

  return (
    <>
        {addProductPopup && <ProductsAddCartPopup/>}
        <section className="container mx-auto mt-12">

            <Header title={'Najpopularniejsze produkty'} styles={'text-heading-3 text-typography-text px-[16px]'}/>
            <Header title={'wybierane przez klientów'} styles={'text-body-5 text-typography-subtext px-[16px]'}/>

            <Swiper
                modules={[Pagination, Navigation]}
                spaceBetween={20}
                slidesPerView={5}
                slidesPerGroup={1}
                navigation={true}
                breakpoints={{
                    0: {
                      spaceBetween: 10,
                      slidesPerView: 1,
                    },
                    640: {
                      spaceBetween: 10,
                      slidesPerView: 2,
                    },
                    768: {
                      spaceBetween: 15,
                      slidesPerView: 3,
                    },
                    1024: {
                      spaceBetween: 15,
                      slidesPerView: 4,
                    },
                    1280: {
                      spaceBetween: 30,
                      slidesPerView: 5,
                    },
                  }}
            >
                {products && products.map((product, i) => (
                    <SwiperSlide 
                        key={i}
                        className="relative w-16 h-[300px] bg-white flex flex-col justify-center items-center rounded-[15px] mb-6"
                    >
                        <div className="w-full h-3/5 bg-white p-2">
                            <img 
                                src={product.image_url} 
                                alt={product.product_name} 
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="w-full h-fit flex justify-center items-center">
                            <span className="text-center text-heading-3">{product.product_name}</span>
                        </div>

                        <div className="absolute w-full h-full justify-center items-center">
                            <CustomButton 
                                onClick={() => {
                                    saveToCart(product)
                                    setAddProductPopup(true);
                                }}
                            >
                                <div className='absolute top-0 right-0 m-2 w-[40px] h-[40px] p-2 flex flex-col justify-center items-center border-[2px] bg-main-primary hover:bg-main-third rounded-[10px]'>
                                    <AiOutlinePlus className='absolute w-[25px] h-[25px] text-base-softbackground'/>
                                </div>
                            </CustomButton>
                        </div>
                    </SwiperSlide>
                ))}
        </Swiper>
        </section>
    </>
  )
}

export default MostPopularSlider