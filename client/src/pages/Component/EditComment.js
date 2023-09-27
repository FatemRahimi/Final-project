import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DeleteComment from "./DeleteComment";



const EditComment = ({
	comment,
	active,
	refreshComment,
}) => {
	const [commentText, setCommentText] = useState(comment.comment);

	const handleClose = () => {
		refreshComment(false);
	};

	const handleSave = async () => {

		try {
			const response = await fetch(
				`/api/stars/${comment.star_id}/comments/${comment.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						comment : commentText,
					}),
				}
			);
			if (response.ok) {
				console.log("Comment updated successfully");
				refreshComment(true);
			} else {
				console.error("Failed to edit comment");
			}
		} catch (error) {
			console.error("Network error:", error);
		}

	};

	return (
		<div>
			<Modal show={active} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>{comment.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group >
							<Form.Label>Comment:</Form.Label>
							<Form.Control
								as="textarea"
								value={commentText}
								onChange={(e) => setCommentText(e.target.value)}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						Cancel
					</Button>
					{" "}
					<Button variant="success" type="submit" onClick={handleSave}>
						Save
					</Button>
					<DeleteComment refreshStar={refreshComment} comment={comment} />
				</Modal.Footer>
			</Modal>
		</div>
	);
};
export default EditComment;
