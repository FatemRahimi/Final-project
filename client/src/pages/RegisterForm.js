import fetch from "node-fetch";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { BsChevronDown } from "react-icons/bs";
import image from "./Component/star.jpeg";
import "./Registration.css";

function RegisterForm() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [role, setRole] = useState("");
	const [section, setSection] = useState("");
	const [area, setArea] = useState("");
	useEffect(() => {
		fetch("/api/users")
			.then((res) => res.json())
			.then((data) => {
				setUsername(data.username);
				setName(data.name);
				setRole(data.role);
				setSection(data.class);
				setArea(data.area);
			});
	}, []);
	function register() {
		fetch("/api/register", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: `{
        "username": "${username}",
        "name": "${name}",
        "role": "${role}",
        "section": "${section}",
        "area": "${area}"
      }`,
		})
			.then((response) => response.json())
			.then(() => {
				return navigate("/dashboard");
			})
			.catch((error) => {
				console.warn(error);
			});
	}
	return (
		<div className="wrapper">
			<div className="image px-4 mx-4 pt-4 mt-4">
				<img src={image} alt="STAR" className="cyf-img" />
			</div>
			<div
				className="p-4 m-4"
				style={{
					width: "500px",
					height: "85vh",
				}}
			>
				<Form className="register">
					<h1 className="register-h1">Register Here</h1>
					<Form.Group>
						<Form.Label className="form_label">Username </Form.Label>
						<Form.Control
							type="text"
							className="form_input"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Type your name"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label className="form_label">Name</Form.Label>
						<Form.Control
							type="text"
							className="form_input"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Display Name"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label className="form_label">Role</Form.Label>
						<div className="position-relative">
							<Form.Control
								as="select"
								className="form_input"
								value={role}
								onChange={(e) => {
									setRole(e.target.value);
								}}
							>
								<option value="TA">TA</option>
								<option value="student">Student</option>
								<option value="mentor">Mentor</option>
							</Form.Control>
							<BsChevronDown
								className="position-absolute top-50 end-0 translate-middle-y"
								size={24}
								color="#6C757D"
							/>
						</div>
					</Form.Group>
					<Form.Group>
						<Form.Label className="form_label">Class</Form.Label>
						<Form.Control
							className="form_input"
							type="text"
							value={section}
							onChange={(e) => setSection(e.target.value)}
							placeholder="Class"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label className="form_label">Area</Form.Label>
						<Form.Control
							className="form_input"
							type="text"
							value={area}
							onChange={(e) => setArea(e.target.value)}
							placeholder="Area"
						/>
					</Form.Group>
					<div>
						<Button className="btn" variant="primary" onClick={register}>
							Register
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}
export default RegisterForm;
