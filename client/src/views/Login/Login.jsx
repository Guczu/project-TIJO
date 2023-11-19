import { Link, useNavigate } from "react-router-dom"
import CustomButton from "../../components/CustomButton/CustomButton"
import CustomInput from "../../components/CustomInput/CustomInput"
import { BiLogInCircle } from 'react-icons/bi'
import { Formik } from 'formik'
import { SigninSchema } from '../../constants/signInValidation'
import { loginUser } from "../../services/user.service"
import { useError } from "../../utils/ErrorContext/ErrorContext"
import { useState } from "react"

const Login = () => {
  const { showError } = useError();
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  return (
    <section className="container mx-auto flex justify-center p-12">
        <div className="w-[36rem] bg-base-softbackground rounded-[15px] p-12 flex flex-col items-center gap-6">

          <span className="text-heading-6 mb-6">
            Zaloguj się
          </span>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={SigninSchema}
            onSubmit={async (values) => {
              const login = await loginUser(values.email, values.password);

              if(login.error) {
                showError('Wystąpił błąd!');
              }

              login.status === 200 ? navigate('/') : setLoginError('Podano błędne dane logowania!');
            }}
          >
             {
              ({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched
              }) => (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <CustomInput
                      className={"text-body-1 text-typography-subtext md:w-[30rem] h-[30px] md:pl-[20px] border-2 rounded focus:outline-none"}
                      disabled={false}
                      name={'email'}
                      onChange={handleChange}
                      value={values.email}
                      placeholder={'E-mail'}
                      type={'text'}
                  >
                  </CustomInput>

                  <CustomInput
                      className={"text-body-1 text-typography-subtext md:w-[30rem] h-[30px] md:pl-[20px] border-2 rounded focus:outline-none"}
                      disabled={false}
                      name={'password'}
                      onChange={handleChange}
                      value={values.password}
                      placeholder={'Hasło'}
                      type={'password'}
                  >
                  </CustomInput>

                  {errors.password && touched.password ? (
                    <div className="container flex justify-center text-red-600 text-body-5">{errors.password}</div>
                  ) : null}
                  {errors.email && touched.email ? (
                    <div className="container flex justify-center text-red-600 text-body-5">{errors.email}</div>
                  ) : null}
                  {loginError ? (
                    <div className="container flex justify-center text-red-600 text-body-5">{loginError}</div>
                  ) : null}

                  <CustomButton 
                    styles="text-body-4 bg-main-primary hover:bg-main-third text-white px-6 py-2"
                    type="submit"
                  >
                      <span>
                          Zaloguj
                      </span>
                      <BiLogInCircle className="ml-[6px] w-4 h-4"/>
                  </CustomButton>
                </form>
              )
            }
          </Formik>

          <Link to='/forgot-password' className="underline text-main-primary">Zapomniałem hasła</Link>
          <span>
            Nie masz konta? <Link to='/register' className="underline text-main-primary">Zarejestruj się</Link>
          </span>

        </div>
    </section>
  )
}

export default Login