import db from "../database/db.js";

async function read(req, res) {
  const urlId = req.params.id;

  try {
    const result = await db.query(`SELECT * FROM urls WHERE id = $1`, [urlId]);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    const { id, shortUrl, url } = result.rows[0];

    res.status(200).json({ id, shortUrl, url });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default read;
