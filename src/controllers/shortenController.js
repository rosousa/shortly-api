import db from "../database/db.js";
import { nanoid } from "nanoid";

async function shortenController(req, res) {
  const url = res.locals.url;
  const userId = res.locals.userId;

  const shortUrl = nanoid(8);

  try {
    await db.query(
      `INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)`,
      [url, shortUrl, userId]
    );

    res.status(201).json({ shortUrl });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default shortenController;
