import joi from "joi";

const pattern =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const uriSchema = joi.object({
  url: joi.string().regex(pattern).required(),
});

export default uriSchema;
