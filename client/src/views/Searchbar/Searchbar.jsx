import { RxMagnifyingGlass } from "react-icons/rx"
import CustomInput from "../../components/CustomInput/CustomInput"
import SearchbarCategories from "./SearchbarCategories/SearchbarCategories"
import { useState } from "react"
import { Link } from "react-router-dom"

const Searchbar = () => {
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('Wszystkie kategorie');

  return (
    <div className="hidden xl:flex items-center justify-between w-[48rem] h-[50px] rounded-full p-3 gap-4 bg-main-white focus:outline-none">
        <SearchbarCategories category={category} setCategory={setCategory} />

        <CustomInput
            className={"text-body-1 text-typography-subtext w-[30rem] h-[30px] focus:outline-none"}
            disabled={false}
            name={'search'}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={'Wyszukaj produkt'}
            type={'text'}
        >
            <Link
                to='/categories'
                state={{ productName: searchText, filter: category === 'Wszystkie kategorie' ? null : category, shopFilter: null}}
            >
                <RxMagnifyingGlass 
                    className="w-6 h-6 hover:cursor-pointer"
                />
            </Link>
        </CustomInput>
    </div>
  )
}

export default Searchbar