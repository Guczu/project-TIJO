import Header from "../../components/Header/Header"
import ShopListTile from "./ShopListTile/ShopListTile"
import { shops } from '../../constants/index'

const ShopList = () => {
  return (
    <div className="container mx-auto my-24">
        <Header title={'Dostępne sklepy'} styles={'text-heading-3 text-typography-text px-[16px]'}/>
        <Header title={'w mieście Kraków'} styles={'text-body-5 text-typography-subtext px-[16px]'}/>
        <div className="container grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-8 my-6">
            {shops.map((shop, index) => (
                <ShopListTile key={index} name={shop.name} image={shop.image_url}>
                    {shop.name}
                </ShopListTile>
            ))}
        </div>
    </div>
  )
}

export default ShopList