import { useState } from "react"
import AccountMenu from "./AccountMenu/AccountMenu"
import AccountPanel from "./AccountPanel/AccountPanel";
import AccountPersonalData from "./AccountPersonalData/AccountPersonalData";
import AccountOrders from "./AccountOrders/AccountOrders";

const Account = () => {
    const [panelIndex, setPanelIndex] = useState(1);
    const [menuOptions, setMenuOptions] = useState([{
      name: "Dane osobowe",
      component: <AccountPersonalData/>,
      panelId: 0
  },
  {
      name: "Zamówienia",
      component: <AccountOrders/>,
      panelId: 1
  }]);

  return (
    <section className="container mx-auto gap-4 flex flex-col items-center xl:items-start xl:flex-row mt-12 min-h-[300px]">
        <AccountMenu menuOptions={menuOptions} setPanelIndex={setPanelIndex}/>
        <AccountPanel menuOptions={menuOptions} panelIndex={panelIndex}/>
    </section>
  )
}

export default Account