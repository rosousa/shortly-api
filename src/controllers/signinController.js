import db from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function signin(req, res) {
  let body = res.locals.signinBody;

  try {
    const userExists = await db.query("SELECT * FROM users WHERE email = $1", [
      body.email,
    ]);

    if (userExists.rowCount === 0) {
      return res.sendStatus(401);
    }

    const hashValidation = bcrypt.compareSync(
      body.password,
      userExists.rows[0].password
    );

    if (!hashValidation) {
      return res.sendStatus(401);
    }

    const token = jwt.sign(
      { id: userExists.rows[0].id },
      process.env.TOKEN_SECRET
    );

    db.query(`DELETE FROM sessions WHERE "userId" = $1`, [
      userExists.rows[0].id,
    ]);

    await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [
      userExists.rows[0].id,
      token,
    ]);

    res
      .cookie("access_token", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      })
      .status(201)
      .json({ token });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default signin;
