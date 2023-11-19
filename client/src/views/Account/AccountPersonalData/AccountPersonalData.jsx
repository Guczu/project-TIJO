import { useEffect, useState } from "react"
import CustomButton from "../../../components/CustomButton/CustomButton"
import { FiEdit } from 'react-icons/fi'
import { getAddress } from "../../../services/address.service"
import { getEmail } from "../../../services/user.service"
import LoadingPage from '../../LoadingPage/LoadingPage'
import AccountEditPopup from "../AccountEditPopup/AccountEditPopup"

const AccountPersonalData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [address, setAddress] = useState({});

  useEffect(() => {
    const fetchAddress = async () => {
      const addressData = await getAddress();
      const email = await getEmail();
      
      if (addressData && email) {
        setAddress({ ...addressData, email: email });
      } else {
        setAddress({
          firstName: '', 
          lastName: '',
          locality: '',
          postalCode: '',
          city: '',
          phoneNumber: '',
          email: ''
        });
      }

    }

    fetchAddress();
    setIsLoading(false);
  }, [isEditPopup])

  return (
    <div className="w-full flex flex-col items-center md:items-start gap-4">
        {isEditPopup && address && <AccountEditPopup data={address} setIsEditPopup={setIsEditPopup} />}

        <div className="w-max h-max flex justify-center items-center mb-6 gap-4">
          <span className="text-heading-4">
              Dane osobowe
          </span>

          <CustomButton 
            styles="w-12 h-12 rounded bg-main-primary hover:bg-main-third text-white"
            onClick={() => setIsEditPopup(true)}
          >
              <FiEdit className="w-4 h-4"/>
          </CustomButton>
        </div>

        {
          isLoading ? (
            <>
              <LoadingPage />
            </>
          ) : (
            <div className="flex flex-col gap-2 text-heading-2">
                <p>Imię: 
                  <span className="text-typography-subtext ml-4">
                    {address.firstName ? address.firstName : ""}
                  </span>
                </p>

                <p>Nazwisko: 
                  <span className="text-typography-subtext ml-4">
                    {address.lastName ? address.lastName : ""}
                  </span>
                </p>

                <p>E-mail: 
                  <span className="text-typography-subtext ml-4">
                    {address.email ? address.email : ""}
                  </span>
                </p>

                <p>Miejscowość: 
                  <span className="text-typography-subtext ml-4">
                    {address.locality ? address.locality : ""}
                  </span>
                </p>

                <p>Kod pocztowy: 
                  <span className="text-typography-subtext ml-4">
                    {address.postalCode ? address.postalCode : ""}
                  </span>
                </p>

                <p>Miasto: 
                  <span className="text-typography-subtext ml-4">
                    {address.city ? address.city : ""}
                  </span>
                </p>

                <p>Numer telefonu: 
                  <span className="text-typography-subtext ml-4">
                    {address.phoneNumber ? address.phoneNumber : ""}
                  </span>
                </p>
            </div>
          )
        }

    </div>
  )
}

export default AccountPersonalData