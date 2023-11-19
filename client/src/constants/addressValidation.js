import * as Yup from 'yup';

const addressValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('Pole "Imię" jest wymagane'),
    lastName: Yup.string().required('Pole "Nazwisko" jest wymagane'),
    locality: Yup.string().required('Pole "Miejscowość" jest wymagane'),
    postalCode: Yup.string()
      .required('Pole "Kod pocztowy" jest wymagane')
      .matches(/^\d{2}-\d{3}$/, 'Kod pocztowy musi być w formacie "xx-xxx"'),
    city: Yup.string().required('Pole "Miasto" jest wymagane'),
    phoneNumber: Yup.string()
    .required('Pole "Numer telefonu" jest wymagane')
    .matches(/^\d{9}$/, 'Numer telefonu musi mieć dokładnie 9 cyfr'),
    email: Yup.string()
      .email('Niepoprawny format adresu e-mail')
      .required('Pole "E-mail" jest wymagane'),
  });

export { addressValidationSchema };