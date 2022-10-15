import db from "../database/db.js";

async function read(req, res) {
  const { userId } = res.locals;

  try {
    const data = await db.query(
      `SELECT users.id, users.name, SUM(COALESCE(urls.count, 0)) AS "visitCount" FROM users LEFT JOIN urls ON users.id = urls."userId" WHERE users.id = $1 GROUP BY users.id;`,
      [userId]
    );

    if (data.rowCount === 0) {
      return res.sendStatus(404);
    }

    const urls = (
      await db.query(
        `select id, "shortUrl", url, count "visitCount" from urls where "userId" = $1;`,
        [userId]
      )
    ).rows;

    data.rows[0].shortenedUrls = urls;

    res.status(200).json(data.rows[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default read;
