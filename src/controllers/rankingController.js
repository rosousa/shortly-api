import db from "../database/db.js";

async function read(req, res) {
  try {
    const data = (
      await db.query(
        `SELECT users.id, users.name, count."linksCount", count."visitCount" FROM users JOIN count ON users.id = count."userId";`
      )
    ).rows;

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default read;
