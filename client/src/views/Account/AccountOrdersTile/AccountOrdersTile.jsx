import { useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md"
import formatDate from "../../../utils/formatDate";

const AccountOrdersTile = ({ item }) => {
    const [isListExpanded, setIsListExpanded] = useState(false);
    const { orderDate, orderItems } = item;
    const formattedDate = formatDate(orderDate);
  
    return (
    <div className="w-full pl-12 pr-12 pb-2 flex flex-col items-center justify-center md:justify-around h-max rounded-[15px] relative bg-base-softbackground">
        
        <div className="w-full p-2 flex flex-col justify-center gap-2">
            {orderItems.slice(0, isListExpanded ? orderItems.length : 1).map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center gap-2">
                    <img src={item.image_url} alt={item.product_name} className="w-32 h-32 object-contain bg-white border-2 rounded"/>

                    <span className="w-6 flex justify-center items-center">
                        {item.quantity}x
                    </span>

                    <span>
                        {item.product_name}
                    </span>

                    <span>
                        {(item.price * item.quantity).toFixed(2)}zł
                    </span>
                </div>
            ))}
        </div>

        <div className="w-full flex justify-center md:justify-between">
            <div>
                {orderItems.length > 1 && (
                    isListExpanded ? (
                        <MdKeyboardArrowUp 
                            className="w-6 h-6 rounded-full hover:cursor-pointer"
                            onClick={() => setIsListExpanded(false)}
                        />
                    ) : (
                        <MdKeyboardArrowDown 
                            className="w-6 h-6 rounded-full hover:cursor-pointer"
                            onClick={() => setIsListExpanded(true)}
                        />
                    )
                )}
            </div>
            <span>
                {formattedDate}
            </span>
        </div>
    </div>
  )
}

export default AccountOrdersTile