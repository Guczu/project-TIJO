import { AiOutlineClose } from 'react-icons/ai'
import { FcMoneyTransfer } from 'react-icons/fc'
import { TiDeleteOutline } from 'react-icons/ti'

const PaymentRejectedPopup = ({ status, setShowPaymentPopup }) => {
  return (
    <section className="fixed flex justify-center items-center inset-0 z-50 w-full h-full backdrop-blur-[2px]">
        <div className="relative w-[400px] h-[150px] bg-base-softbackground rounded-[10px] flex flex-col justify-center items-center p-6 gap-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <button
              className="absolute right-0 top-0 p-6"
              onClick={() => setShowPaymentPopup(false)}
              type="button"
            >
            <span className='sr-only'>Zamknij okno</span>
              <AiOutlineClose 
                aria-hidden='true' 
                className='w-6 h-6' 
              />
          </button>
            {status === "true" ? (
              <>
                <span>Płatność zaakceptowana</span>
                <FcMoneyTransfer className='w-12 h-12' />
              </>
            ) : (
              <>
                <span>Płatność odrzucona</span>
                <TiDeleteOutline className='w-12 h-12' />
              </>
            )}
        </div>
    </section>
  )
};

export default PaymentRejectedPopup