import db from "../database/db.js";

async function read(req, res) {
  try {
    const data = (
      await db.query(
        `SELECT users.id, users.name, COUNT(urls) "linksCount", SUM(COALESCE(urls.count, 0)) "visitCount" FROM users LEFT JOIN urls ON users.id = urls."userId" GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10;`
      )
    ).rows;

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default read;
