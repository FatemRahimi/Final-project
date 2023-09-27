import { Router } from "express";
import logger from "./utils/logger";
import db from "./db";
const router = Router();
// Getting all star from the database
router.get("/stars", async (req, res) => {
	const user = req.session.user;
	const sqlA = `
		SELECT s.*, u.name AS creator, count(c.id) AS comment_count FROM stars AS s
		INNER JOIN users AS u ON s.user_id = u.id 
		LEFT JOIN comments AS c ON s.id = c.star_id `;
	const sqlB = "WHERE s.user_id = $1 ";
	const sqlC = "GROUP BY s.id, u.name ORDER BY  s.favourite DESC ,u.name ASC ";



	try {
		let result;
		if (user.role === "student") {
			result = await db.query(sqlA + sqlB + sqlC, [user.id]);
		} else {
			result = await db.query(sqlA + sqlC);
		}
		res.json(result.rows);
	} catch (error) {
		logger.error(error);
		res.status(500).json(error);
	}
});
//  Getting star by id
router.get("/stars/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query(`
            SELECT 
                s.*, u.name AS creator,
                CASE WHEN COUNT(c) = 0 THEN 
                    to_json('{}'::json[]) 
                ELSE 
                    to_json(ARRAY_AGG(c))
                END AS comments
            FROM stars AS s 
			INNER JOIN users AS u ON s.user_id = u.id
            LEFT JOIN (
                SELECT comments.*, users.name AS commenter
                FROM comments 
                INNER JOIN users 
                on comments.user_id = users.id  
            ) AS c
            ON s.id = c.star_id
            WHERE s.id = $1
            GROUP BY s.id, u.name;
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: `Star with id ${id} not found` });
        }

        res.json(result.rows[0]);

    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Failed to retrieve star" });
    }
});
//  getting stars by unique id
router.get("/users/:id/stars", async (req, res) => {
	const userId = req.params.id;
	try {
		const result = await db.query(
			"SELECT  s.name, s.description,s.situation,s.task,s.action,s.result " +
				"FROM stars s " +
				"JOIN users u ON s.user_id = u.id " +
				"WHERE u.id = $1",
			[userId]
		);
		res.json(result.rows);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to get stars for user" });
	}
});
//  Adding star on the database
router.post("/stars", async (req, res) => {
	const { name, description, situation, task, action, result } = req.body;
	// Check if all required fields are provided
	if (!name || !description || !situation || !task || !action || !result) {
		return res.status(400).json({ error: "Missing required fields!" });
	}

	// Check if user is authenticated
	if (!req.session.user || !req.session.user.id) {
		return res.status(401).json({ error: "Not authenticated" });
	}

	try {
		// Use userId from session object
		const user_id = req.session.user.id;

		await db.query(
			"INSERT INTO stars (name, description, user_id, situation, task, action, result) VALUES ($1, $2, $3, $4, $5, $6, $7)",
			[name, description, user_id, situation, task, action, result]
		);
		res.status(201).send();
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to create star" });
	}
});

// Adding comments to the database

router.post("/stars/:id/comments", async (req, res) => {
	const { comment } = req.body;
	const starId = req.params.id;

	// Check if comment is provided
	if (!comment) {
		return res.status(400).json({ error: "Missing comment field!" });
	}

	try {
		// Check if the star exists
		const starResult = await db.query("SELECT * FROM stars WHERE id = $1", [
			starId,
		]);
		const star = starResult.rows[0];
		if (!star) {
			return res.status(404).json({ error: "Star not found" });
		}

		// Check if user is authenticated
		if (!req.session.user || !req.session.user.id) {
			return res.status(401).json({ error: "Not authenticated" });
		}

		// Retrieve the authenticated user ID from the session object
		const user_id = req.session.user.id;

		// Insert the comment into the database
		await db.query(
			"INSERT INTO comments (star_id, user_id, comment) VALUES ($1, $2, $3)",
			[starId, user_id, comment]
		);
		res.status(201).json({ message: "Comment successfully added" });
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to add comment" });
	}
});


//   deleting star from the database by id

router.delete("/stars/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const result = await db.query("DELETE FROM stars WHERE id = $1", [id]);
		if (result.rowCount === 0) {
			return res.status(404).json({ error: `Star with id ${id} not found` });
		}
		res.status(204).json({ message: `Star with id ${id} is deleted` });
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to delete star" });
	}
});

//	 deleting comments from the database by id

router.delete("/stars/:id/comments/:commentId", async (req, res) => {
	const { id, commentId } = req.params;
	try {
		// Check if the comment exists
		const commentResult = await db.query(
			"SELECT * FROM comments WHERE id = $1 AND star_id = $2",
			[commentId, id]
		);
		const comment = commentResult.rows[0];
		if (!comment) {
			return res.status(404).json({ error: "Comment not found" });
		}
		// Delete the comment from the database
		await db.query("DELETE FROM comments WHERE id = $1", [commentId]);
		res.status(200).json({ message: "Comment successfully deleted" });
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to delete comment" });
	}
});

//  modifying stars by id

router.put("/stars/:id", async (req, res) => {
	const id = req.params.id;
	const { name, description, situation, task, action, result } = req.body;
	if (!name || !description || !situation || !task || !action || !result) {
		return res.status(400).json({ error: "Name and description are required" });
	}
	try {
		await db.query(
			"UPDATE stars SET name = $1, description = $2, situation = $3, task = $4, action = $5, result = $6 WHERE id = $7",
			[ name, description, situation, task, action, result, id]
		);
		const queryResult = await db.query("SELECT * FROM stars WHERE id = $1", [id]);
		if (queryResult.rowCount === 0) {
			return res.status(404).json({ error: `Star with id ${id} not found` });
		}
		res.status(200).json(queryResult.rows[0]);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to update star" });
	}
});

// Modify comments by id
router.put("/stars/:starId/comments/:commentId", async (req, res) => {
    const { starId, commentId } = req.params;
    const { comment } = req.body;
    try {
        const starResult = await db.query(`
            SELECT *
            FROM stars
            WHERE id = $1
        `, [starId]);
        if (starResult.rows.length === 0) {
            return res.status(404).json({ error: `Star with id ${starId} not found` });
        }
        const result = await db.query(`
            UPDATE comments
            SET comment = $1
            WHERE id = $2
            RETURNING *
        `, [comment, commentId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: `Comment with id ${commentId} not found` });
        }
        res.json(result.rows[0]);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Failed to update comment" });
    }
});
// patch/stars/:id/favourite
router.patch("/stars/:id/favourite", async (req, res) => {
  const { id } = req.params;
  const { favourite } = req.body;

  try {
    // Check if user is authorized to update favourite status
    const user = req.session.user;
    if (!user || user.role === "TA" || user.role === "mentor") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const star = await db.query(
      "UPDATE stars SET favourite = $1 WHERE id = $2 RETURNING *",
      [favourite, id]
    );
    res
      .status(200)
      .json({ message: "STAR favourite status updated", star: star.rows[0] });
  } catch (err) {
    logger.error(err);
    // switch the favourite status back to false
    const star = { ...req.body, id };
    star.favourite = false;
    res.status(500).json({ error: "Something went wrong", star });
  }
});


export default router;