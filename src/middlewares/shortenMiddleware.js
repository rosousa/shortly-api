import db from "../database/db.js";
import uriSchema from "../schemas/uriSchema.js";

async function shortenMiddleware(req, res, next) {
  const { url } = req.body;

  const { token } = res.locals;

  const validBody = uriSchema.validate({ url }, { abortEarly: false });

  if (validBody.error) {
    return res.sendStatus(422);
  }

  try {
    const session = await db.query(`SELECT * FROM sessions WHERE token = $1`, [
      token,
    ]);

    res.locals.url = url;
    res.locals.userId = session.rows[0].userId;

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default shortenMiddleware;
