import { AiOutlineClose } from 'react-icons/ai'
import { Formik, Form } from 'formik';
import CustomInput from '../../../components/CustomInput/CustomInput'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { editAddress } from '../../../services/address.service';
import { addressValidationSchema } from '../../../constants/addressValidation'
import { useError } from '../../../utils/ErrorContext/ErrorContext';

const AccountEditPopup = ({ data, setIsEditPopup }) => {
    const { showError } = useError();

    const initialValues = {
        firstName: data.firstName === ' ' ? '' : data.firstName, 
        lastName: data.lastName === ' ' ? '' : data.lastName,
        locality: data.locality === ' ' ? '' : data.locality,
        postalCode: data.postalCode === ' ' ? '' : data.postalCode,
        city: data.city === ' ' ? '' : data.city,
        phoneNumber: data.phoneNumber === ' ' ? '' : data.phoneNumber,
        email: data.email === ' ' ? '' : data.email
      };
    
      const handleSubmit = async(values) => {
        const newData = await editAddress(values);

        if(newData.error) {
            showError('Wystąpił błąd!');
        }

        if (newData && !newData.error) {
            setIsEditPopup(false);
        }
      };

  return (
    <Formik 
        initialValues={initialValues} 
        onSubmit={handleSubmit}
        validationSchema={addressValidationSchema}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form>
            <section className="fixed flex justify-center items-center inset-0 z-50 w-full h-full backdrop-blur-[2px]">
                    <div className="relative w-max h-max bg-base-softbackground rounded-[10px] flex flex-col p-6 gap-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                        <button
                            className="absolute right-0 top-0 p-6"
                            onClick={() => setIsEditPopup(false)}
                            type="button"
                        >
                            <span className='sr-only'>Zamknij okno</span>
                            <AiOutlineClose 
                                aria-hidden='true' 
                                className='w-6 h-6' 
                            />
                        </button>

                        <span className='text-heading-4'>
                            Edytuj dane
                        </span>

                        <span>Imię</span>
                        <CustomInput
                            className={"text-body-1 text-typography-text md:w-[30rem] h-[30px] md:pl-[20px] border-2 rounded focus:outline-none"}
                            disabled={false}
                            name={'firstName'}
                            onChange={handleChange}
                            value={values.firstName}
                            placeholder={'Imię'}
                            type={'text'}
                        >
                        </CustomInput>

                        <span>Nazwisko</span>
                        <CustomInput
                            className={"text-body-1 text-typography-text md:w-[30rem] h-[30px] md:pl-[20px] border-2 rounded focus:outline-none"}
                            disabled={false}
                            name={'lastName'}
                            onChange={handleChange}
                            value={values.lastName}
                            placeholder={'Nazwisko'}
                            type={'text'}
                        >
                        </CustomInput>

                        <span>Email</span>
                        <CustomInput
                            className={"text-body-1 text-typography-text bg-base-disabled md:w-[30rem] h-[30px] md:pl-[20px] border-2 rounded focus:outline-none"}
                            disabled={true}
                            name={'email'}
                            onChange={handleChange}
                            value={values.email}
                            placeholder={'Email'}
                            type={'text'}
                        >
                        </CustomInput>

                        <span>Miejscowość</span>
                        <CustomInput
                            className={"text-body-1 text-typography-text md:w-[30rem] h-[30px] md:pl-[20px] border-2 rounded focus:outline-none"}
                            disabled={false}
                            name={'locality'}
                            onChange={handleChange}
                            value={values.locality}
                            placeholder={'Miejscowość'}
                            type={'text'}
                        >
                        </CustomInput>

                        <span>Kod pocztowy</span>
                        <CustomInput
                            className={"text-body-1 text-typography-text md:w-[30rem] h-[30px] md:pl-[20px] border-2 rounded focus:outline-none"}
                            disabled={false}
                            name={'postalCode'}
                            onChange={handleChange}
                            value={values.postalCode}
                            placeholder={'Kod pocztowy'}
                            type={'text'}
                        >
                        </CustomInput>

                        <span>Miasto</span>
                        <CustomInput
                            className={"text-body-1 text-typography-text md:w-[30rem] h-[30px] md:pl-[20px] border-2 rounded focus:outline-none"}
                            disabled={false}
                            name={'city'}
                            onChange={handleChange}
                            value={values.city}
                            placeholder={'Miasto'}
                            type={'text'}
                        >
                        </CustomInput>

                        <span>Numer telefonu</span>
                        <CustomInput
                            className={"text-body-1 text-typography-text md:w-[30rem] h-[30px] md:pl-[20px] border-2 rounded focus:outline-none"}
                            disabled={false}
                            name={'phoneNumber'}
                            onChange={handleChange}
                            value={values.phoneNumber}
                            placeholder={'Numer telefonu'}
                            type={'text'}
                        >
                        </CustomInput>

                        <CustomButton 
                            styles="text-body-4 bg-main-primary hover:bg-main-third text-white px-6 py-2"
                            type="submit"
                        >
                            <span>
                                Zapisz
                            </span>
                        </CustomButton>

                        <div className='flex flex-col justify-center items-center'>
                            {errors.firstName && touched.firstName && (
                                <div className="text-red-500">{errors.firstName}</div>
                            )}
                            {errors.lastName && touched.lastName && (
                                <div className="text-red-500">{errors.lastName}</div>
                            )}
                            {errors.locality && touched.locality && (
                                <div className="text-red-500">{errors.locality}</div>
                            )}
                            {errors.postalCode && touched.postalCode && (
                                <div className="text-red-500">{errors.postalCode}</div>
                            )}
                            {errors.city && touched.city && (
                                <div className="text-red-500">{errors.city}</div>
                            )}
                            {errors.phoneNumber && touched.phoneNumber && (
                                <div className="text-red-500">{errors.phoneNumber}</div>
                            )}
                        </div>

                    </div>
                </section>
        </Form>
    )}
    </Formik>
  )
}

export default AccountEditPopup