import db from "../database/db.js";

async function checkToken(req, res, next) {
  let token = req.headers.authorization;
  token = token?.slice(7, token.length);

  try {
    const tokenExists = await db.query(
      `SELECT * FROM sessions WHERE token = $1`,
      [token]
    );

    if (tokenExists.rowCount === 0) {
      return res.sendStatus(401);
    }

    res.locals.token = token;
    res.locals.userId = tokenExists.rows[0].userId;

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default checkToken;
