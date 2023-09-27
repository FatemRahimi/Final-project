import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DeleteBtn from "./Component/DeleteBtn";

const EditForm = ({ active, star, setStars, refreshStars }) => {
	const [name, setName] = useState(star.name);
	const [situation, setSituation] = useState(star.situation);
	const [task, setTask] = useState(star.task);
	const [action, setAction] = useState(star.action);
	const [result, setResult] = useState(star.result);
	const [description, setDescription] = useState(star.description);

	const handleClose = () => {
		refreshStars(false);
	};

	const handleAdd = async () => {
		try {
			const response = await fetch(`/api/stars/${star.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					description,
					situation,
					task,
					action,
					result,
				}),
			});
			if (response.ok) {
				console.log("Star updated successfully");
				refreshStars(true);
			} else {
				console.error("Failed to update star");
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

	return (
		<div>
			<Modal show={active} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Your Star </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="name">
							<Form.Label>Name:</Form.Label>
							<Form.Control
								as="textarea"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="situation">
							<Form.Label>Situation:</Form.Label>
							<Form.Control
								as="textarea"
								value={situation}
								onChange={(e) => setSituation(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="task">
							<Form.Label>Task:</Form.Label>
							<Form.Control
								as="textarea"
								value={task}
								onChange={(e) => setTask(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="action">
							<Form.Label>Action:</Form.Label>
							<Form.Control
								as="textarea"
								value={action}
								onChange={(e) => setAction(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="result">
							<Form.Label>Result:</Form.Label>
							<Form.Control
								as="textarea"
								value={result}
								onChange={(e) => setResult(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="content">
							<Form.Label>Description :</Form.Label>
							<Form.Control
								as="textarea"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="success" type="submit" onClick={handleAdd}>
						Save
					</Button>
					<DeleteBtn refreshStars={refreshStars} star={star} setStars={setStars} />
				</Modal.Footer>
			</Modal>
		</div>
	);
};
export default EditForm;
