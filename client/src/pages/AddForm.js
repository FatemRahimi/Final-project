import { useState } from "react";
// import axios from "axios";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const AddForm = ({ setStars }) => {
	const [showForm, setShowForm] = useState(false);
	const [name, setName] = useState("");
	const [situation, setSituation] = useState("");
	const [task, setTask] = useState("");
	const [action, setAction] = useState("");
	const [result, setResult] = useState("");
	const [description, setDescription] = useState("");

	const handleClose = () => setShowForm(false);
	const handleShow = () => setShowForm(true);

	const handleAdd = async () => {
		// event.preventDefault();
		try {
			const response = await fetch("/api/stars", {
				method: "POST",
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
				console.log("Star created successfully");
				const res = await fetch("/api/stars");
				const stars = await res.json();
				setStars(stars);
			} else {
				console.error("Failed to create star");
			}

			// clear form inputs
			setName("");
			setSituation("");
			setTask("");
			setAction("");
			setResult("");
			setDescription("");

			// hide the form
			setShowForm(false);
		} catch (error) {
			console.error("Network error:", error);
		}
	};

	return (
		<div>
			<button onClick={handleShow} className="add-btn">
				Add STAR
			</button>
			<Modal show={showForm} onHide={handleClose} centered>
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
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default AddForm;
