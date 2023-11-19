import CustomButton from "../../components/CustomButton/CustomButton"
import { GoPerson } from 'react-icons/go'
import { PiHandbag } from 'react-icons/pi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose  } from 'react-icons/ai'
import React, { useState } from "react"
import { Link } from "react-router-dom"
import Searchbar from "../Searchbar/Searchbar"
import Categories from '../Categories/Categories'

const Navbar = () => {
    const [isDropdown, setIsDropdown] = useState(false);
    
  return (
    <nav className="flex flex-col">
        <div className="h-[90px] gap-4 bg-base-softbackground flex items-center justify-between md:justify-evenly px-10">
            <Link to="/" className="text-main-primary text-heading-4 font-medium">
                Foodie
            </Link>

            <Searchbar/>

            <div className="flex justify-center items-center gap-3">
                <CustomButton styles="text-body-2 bg-main-primary hover:bg-main-third text-white px-6 py-3 hidden md:flex">
                    <span>
                        Pomoc
                    </span>
                </CustomButton>

                <CustomButton styles="text-body-6 gap-2 hidden md:flex">
                    <Link to='/account' className="flex gap-2">
                        <GoPerson className="relative w-6 h-6 hover:cursor-pointer"/>
                        Konto
                    </Link>
                </CustomButton>

                <CustomButton styles="text-body-6 gap-2 hidden md:flex">
                    <Link to='/cart' className="flex gap-2">
                        <PiHandbag className="relative w-6 h-6 hover:cursor-pointer"/>
                        Koszyk
                    </Link>
                </CustomButton>

                <GiHamburgerMenu 
                    className={`${isDropdown ? 'hidden' : 'md:hidden'} w-6 h-6 hover:cursor-pointer`}
                    onClick={() => setIsDropdown(true)}
                />
            </div>
        </div>

        <Categories/>

        <section className={`w-full bg-base-softbackground ${isDropdown ? 'flex' : 'hidden'} md:hidden justify-center items-center p-12`}>

            <button
                className="absolute right-0 top-0 p-8"
                onClick={() => setIsDropdown(false)}
                type="button"
            >
                <span className='sr-only'>Zamknij okno</span>
                <AiOutlineClose 
                    aria-hidden='true' 
                    className='w-6 h-6' 
                />
            </button>

            <div className="flex flex-col justify-center items-center gap-5">
                <Link to='/help' className="flex">
                    Pomoc
                </Link>
                <Link to='/categories' className="flex">
                    Produkty
                </Link>
                <Link to='/account' className="flex">
                    Konto
                </Link>
                <Link to='/cart' className="flex">
                    Koszyk
                </Link>
            </div>

        </section>
    </nav>
  )
}

export default Navbar