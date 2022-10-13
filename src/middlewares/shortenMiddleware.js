import db from "../database/db.js";
import uriSchema from "../schemas/uriSchema.js";

async function shortenMiddleware(req, res, next) {
  const { url } = req.body;

  let token = req.headers.authorization;
  token = token?.slice(7, token.length);

  const validBody = uriSchema.validate({ url }, { abortEarly: false });

  if (validBody.error) {
    return res.sendStatus(422);
  }

  try {
    const sessionExists = await db.query(
      `SELECT * FROM sessions WHERE token = $1`,
      [token]
    );

    if (sessionExists.rowCount === 0) {
      return res.sendStatus(401);
    }

    res.locals.url = url;
    res.locals.userId = sessionExists.rows[0].userId;

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default shortenMiddleware;
