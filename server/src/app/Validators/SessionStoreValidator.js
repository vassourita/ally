import * as Yup from 'yup';

export default class UserStoreValidator {
  static async validate(req, res, next) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (err) {
      return res.status(400).json({ error: 'Validation fails', message: err.inner });
    }
  }
}
