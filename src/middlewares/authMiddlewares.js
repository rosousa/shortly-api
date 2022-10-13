import { signupSchema, signinSchema } from "../schemas/authSchemas.js";

function signupMiddleware(req, res, next) {
  const validBody = signupSchema.validate(req.body, { abortEarly: false });

  if (validBody.error) {
    return res.sendStatus(422);
  }

  res.locals.signupBody = req.body;

  next();
}

function signinMiddleware(req, res, next) {
  const validBody = signinSchema.validate(req.body, { abortEarly: false });

  if (validBody.error) {
    return res.sendStatus(422);
  }

  res.locals.signinBody = req.body;

  next();
}

export { signupMiddleware, signinMiddleware };
