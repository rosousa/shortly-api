import db from "../database/db.js";

async function read(req, res) {
  const { shortUrl } = req.params;

  try {
    const shortUrlExists = await db.query(
      `SELECT * FROM urls WHERE "shortUrl" = $1`,
      [shortUrl]
    );

    if (shortUrlExists.rowCount === 0) {
      return res.sendStatus(404);
    }

    db.query(`UPDATE urls SET count = count + 1 WHERE "shortUrl" = $1`, [
      shortUrl,
    ]);

    res.redirect(shortUrlExists.rows[0].url);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default read;
