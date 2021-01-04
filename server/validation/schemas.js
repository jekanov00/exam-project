const yup = require('yup');
const {
  permissions: { roles },
} = require('../configs/config');

const passwordRule = [
  /(?=.*?\d)(?=.*?[A-Z])(?=.*?[a-z])^.{8,255}$/,
  'Your password must be at least 8 characters, and include at least one lowercase letter, one uppercase letter, and a number. ',
];

exports.loginSchema = yup.object().shape({
  email: yup.string().trim().email().required(),
  password: yup.string().required(),
});

exports.signUpSchema = yup.object().shape({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  displayName: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  password: yup
    .string()
    .matches(...passwordRule)
    .required(),
  role: yup.string().oneOf(roles).required(),
});

exports.contestSchema = yup.object().shape({
  contests: yup.array().of(
    yup.object().shape({
      contestType: yup
        .string()
        .matches(/(name|logo|tagline)/)
        .required(),
      fileName: yup.string().min(1),
      originalFileName: yup.string().min(1),
      title: yup.string().required().min(1),
      typeOfName: yup.string().min(1),
      industry: yup.string().required().min(1),
      focusOfWork: yup.string().required().min(1),
      targetCustomer: yup.string().required().min(1),
      styleName: yup.string().min(1),
      nameVenture: yup.string().min(1),
      typeOfTagline: yup.string().min(1),
      brandStyle: yup.string().min(1),
    }),
  ),
});
