import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Nazwa jest za krótka!')
        .max(15, 'Nazwa jest za długa!')
        .required('Uzupełnij nazwę'),
    password: Yup.string()
        .min(2, 'Hasło jest za krótkie!')
        .max(50, 'Hasło jest za długie!')
        .required('Uzupełnij hasło'),
    confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Hasła nie są identyczne!'),
    email: Yup.string()
        .email('Podany email jest błędny!')
        .required('Uzupełnij email')
  });

export { SignupSchema };