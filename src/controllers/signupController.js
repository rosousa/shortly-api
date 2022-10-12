import db from "../database/db.js";
import bcrypt from "bcrypt";

async function signup(req, res) {
  let body = res.locals.signupBody;

  try {
    const userExists = await db.query("SELECT * FROM users WHERE email = $1", [
      body.email,
    ]);

    if (userExists.rowCount !== 0) {
      return res.sendStatus(409);
    }

    body.password = bcrypt.hashSync(body.password, 10);

    await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [body.name, body.email, body.password]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default signup;
