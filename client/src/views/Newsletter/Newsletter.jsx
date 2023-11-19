import { Link } from "react-router-dom"
import CustomButton from "../../components/CustomButton/CustomButton"
import CustomInput from "../../components/CustomInput/CustomInput"
import { AiOutlineArrowRight } from 'react-icons/ai'
import { Formik, Form } from 'formik'
import { newsletterValidationSchema } from "../../constants/newsletterValidation"
import { addEmailToNewsletter } from "../../services/newsletter.service"

const Newsletter = () => {
  return (
    <section className="container h-[300px] flex justify-center align-center flex-col mx-auto rounded-[5px] bg-base-bluebackground">
        <div className="w-full md:w-[48rem] pt-[5px] pb-[15px] px-[30px] md:pt-[30px] md:pb-[30px] md:px-[120px]">
            <p className="text-main-white text-heading-2 md:text-heading-3">
                Tak!
            </p>
            
            <p className="text-main-white text-heading-2 md:text-heading-3">
                Otrzymuj ekskluzywne promocje, smakowite propozycje produktów spożywczych, subskrybując nasz newsletter!"
            </p>
        </div>
            <Formik
            initialValues={{
                email: ''
            }}
            validationSchema={newsletterValidationSchema}
            onSubmit={async (values) => {
                await addEmailToNewsletter(values.email);
                values.email = ''
            }}
            >
            {({ handleSubmit, values, handleChange, errors, touched }) => (
                <>
                <Form className="container w-max p-[9px] mx-auto flex justify-center items-center bg-main-white rounded-full">
                    <CustomInput
                        className={"text-body-1 text-typography-subtext md:w-[30rem] h-[30px] md:pl-[20px] focus:outline-none"}
                        disabled={false}
                        name={'email'}
                        onChange={handleChange}
                        value={values.email}
                        placeholder={'Wprowadź email'}
                        type={'text'}
                    >
                        <CustomButton 
                            styles="text-body-2 bg-main-primary hover:bg-main-third text-white px-6 py-2"
                            onClick={handleSubmit}
                        >
                            <span>
                                Subskrybuj
                            </span>
                            <AiOutlineArrowRight className="ml-[6px] w-4 h-4"/>
                        </CustomButton>
                    </CustomInput>
                </Form>
                {errors.email && touched.email ? (
                    <span className="container flex justify-center text-red-500 text-body-5 pt-2">{errors.email}</span>
                  ) : null}
                </>
            )}
            </Formik>

        <div className="flex items-center justify-center pt-[10px]">
            <Link to="/" className="text-main-light underline text-[14px]">
                Tylko dla pierwszego zamówienia. Jesteś gotów?
            </Link>
        </div>

    </section>
  )
}

export default Newsletter