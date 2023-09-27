import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const AddComment = ({ star, setStar }) => {
    const [comment, setComment] = useState("");
    const [show, setShow] = useState("");
    const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleAddComment = async (id) => {
            console.log(id);
		try {
			const response = await fetch(`/api/stars/${id}/comments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					comment,
				}),
			});

			if (response.ok) {
				console.log("Star created successfully");
				const res = await fetch("/api/stars");
				const stars = await res.json();
				setStar(stars);
			} else {
				console.error("Failed to create star");
			}

			setShow(false);
		} catch (error) {
			console.error("Network error:", error);
		}
	};


	return (
		<div className="floatedButton">
			<div className="addBtn">
				<Button onClick={handleShow} className="btn-add">
					Add Comment
				</Button>
			</div>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Comment</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="name">
							<Form.Label>Comment:</Form.Label>
							<Form.Control
								as="textarea"
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							/>
						</Form.Group>
						<Button variant="danger" onClick={handleClose}>
							Cancel
						</Button>{" "}
						<Button
							variant="success"
							type="submit"
							onClick={() => handleAddComment(star.id)}
						>
							Save
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default AddComment;
