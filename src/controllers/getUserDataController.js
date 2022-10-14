import db from "../database/db.js";

async function read(req, res) {
  const { userId } = res.locals;

  try {
    const data = (
      await db.query(
        `SELECT users.id, users.name, SUM(urls.visits) "visitCount" FROM users JOIN urls ON users.id = urls."userId" WHERE users.id = $1 GROUP BY users.id;`,
        [userId]
      )
    ).rows[0];
    const urls = (
      await db.query(
        `SELECT id, "shortUrl", url, visits "visitCount" FROM urls WHERE "userId" = $1 ORDER BY id`,
        [userId]
      )
    ).rows;

    data.shortenedUrls = urls;

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default read;
