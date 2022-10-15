import db from "../database/db.js";
import bcrypt from "bcrypt";

async function signup(req, res) {
  let body = res.locals.signupBody;

  try {
    body.password = bcrypt.hashSync(body.password, 10);

    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [body.name, body.email, body.password]
    );

    res.sendStatus(201);
  } catch (error) {
    if (error.message.includes("unique constraint")) {
      return res.sendStatus(409);
    }
    res.sendStatus(500);
  }
}

export default signup;
