import db from "../database/db.js";

async function read(req, res) {
  const { userId } = res.locals;

  try {
    const data = await db.query(
      `select users.id, users.name, SUM(urls.count) "visitCount" from users JOIN urls ON users.id = urls."userId" where users.id = $1 GROUP BY users.id;`,
      [userId]
    );

    if (data.rowCount === 0) {
      const userData = (
        await db.query(`SELECT id, name FROM users WHERE id = $1`, [userId])
      ).rows[0];

      userData.visitCount = 0;
      userData.shortenedUrls = [];

      return res.status(200).json(userData);
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
