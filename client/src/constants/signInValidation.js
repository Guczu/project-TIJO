import * as Yup from 'yup';

const SigninSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, 'Hasło jest za krótkie!')
        .max(15, 'Hasło jest za długie!')
        .required('Uzupełnij hasło'),
    email: Yup.string()
        .email('Podany email jest błędny!')
        .required('Required')
  });

export { SigninSchema };