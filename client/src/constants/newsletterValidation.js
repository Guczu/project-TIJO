import * as Yup from 'yup';

const newsletterValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Niepoprawny format adresu e-mail')
      .required('Pole "E-mail" jest wymagane'),
  });

export { newsletterValidationSchema };