import FooterList from "./FooterList/FooterList"
import { IoLogoFacebook, IoLogoLinkedin } from 'react-icons/io'
import { AiFillTwitterCircle, AiOutlineArrowUp } from 'react-icons/ai'
import CustomButton from "../../components/CustomButton/CustomButton"

const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
    };

  return (
    <footer className="container flex flex-col mx-auto my-[40px]">
        
        <div className="flex flex-col lg:flex-row">
            <div className="justify-center items-center lg:justify-start lg:items-start lg:w-1/4 flex flex-col lg:p-12 pr-0 mb-12 lg:mb-0">
                <span className="text-main-primary text-heading-3 mb-8">
                    Foodie
                </span>
                <p className="text-typography-text text-body-6">Kraków, PL</p>

                <div className="flex gap-3">
                    <IoLogoFacebook className="w-6 h-6 hover:cursor-pointer"/>
                    <AiFillTwitterCircle className="w-6 h-6 hover:cursor-pointer"/>
                    <IoLogoLinkedin className="w-6 h-6 hover:cursor-pointer"/>
                </div>
            </div>

            <div className="hidden lg:w-3/4 lg:block mx-auto">
                <FooterList/>
            </div>
        </div>

        <div className="w-full flex flex-col gap-3 md:flex-row justify-center md:justify-between items-center">
            <span className="text-typography-text text-body-6">© 2023 Foodie, Inc.</span>

            <div>
                <ul className="flex gap-5">
                    <li className="text-typography-text text-body-6 hover:cursor-pointer">Polityka prywatności</li>
                    <li className="text-main-third text-body-6 hover:cursor-pointer">Regulamin</li>
                    <li className="text-typography-text text-body-6 hover:cursor-pointer">Ciasteczka</li>
                </ul>
            </div>

            <CustomButton 
                className="flex items-center justify-center"
                onClick={scrollToTop}    
            >
                <span className="text-typography-text text-body-1">Przewiń w górę</span>
                <AiOutlineArrowUp className="pl-1 w-4 h-4"/>
            </CustomButton> 

        </div>

    </footer>
  )
}

export default Footer