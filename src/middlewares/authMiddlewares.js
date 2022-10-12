import { signupSchema } from "../schemas/authSchemas.js";

function signupMiddleware(req, res, next) {
  const validBody = signupSchema.validate(req.body, { abortEarly: false });

  if (validBody.error) {
    return res.sendStatus(422);
  }

  res.locals.signupBody = req.body;

  next();
}

export { signupMiddleware };
