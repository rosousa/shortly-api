import db from "../database/db.js";

async function deleteUrl(req, res) {
  const { id } = req.params;
  const { userId } = res.locals;

  try {
    const urlExists = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);

    if (urlExists.rowCount === 0) {
      return res.sendStatus(404);
    }

    if (urlExists.rows[0]?.userId !== userId) {
      return res.sendStatus(401);
    }

    await db.query(`DELETE FROM urls WHERE id = $1`, [id]);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default deleteUrl;
