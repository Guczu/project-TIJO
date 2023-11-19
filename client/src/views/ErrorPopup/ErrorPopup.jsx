const ErrorPopup = ({ errorMessage }) => {
  return (
    <div className='fixed z-50 top-0 left-1/2 transform -translate-x-1/2 mt-8 rounded-[15px] w-[200px] h-[70px] flex justify-center items-center bg-red-600 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
        <span className='text-white'>
          {errorMessage}
        </span>
    </div>
  )
}

export default ErrorPopup