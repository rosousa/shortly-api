import joi from "joi";

const signupSchema = joi.object({
  name: joi.string().min(2).max(40).required(),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: joi.string().min(4).max(50).required(),
  confirmPassword: joi.ref("password"),
});

export { signupSchema };
