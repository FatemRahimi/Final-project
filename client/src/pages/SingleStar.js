import React, { useState } from "react";
import EditForm from "./EditForm";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import FavouriteIcon from "./FavouriteIcon";
import "./Component/Dashboard.css";

const SingleStar = ({ user, star, setStars }) => {
	const [editing, setEditing] = useState(false);
	const refreshStars = (refresh) => {
		if (refresh) {
			setStars(null);
		}
		setEditing(null);
	};

	return (
		<Card key={star.id} className="my-3 shadow">
			<Card.Body>
				<Row>
					{/* <Col sm={12} md={6}> */}
					<div className="div-name-icon">
						<Link to={`/star/${star.id}`}>
							<Card.Title
								className="link"
								style={{
									fontSize: "1.4rem",
									fontWeight: "bold",
									marginRight: "4px",
								}}
							>
								{star.name}
							</Card.Title>
						</Link>
						<FavouriteIcon
							className="icon"
							style={{ marginTop: "-10px", marginLeft: "20px" }}
							star={star}
						/>
					</div>
					<Card.Text className="creator">
						<b>Created by </b>
						{star.creator}
					</Card.Text>
					<Card.Text>
						<span style={{ fontSize: "1rem", fontWeight: "bold" }}>
							Situation:
						</span>{" "}
						{star.situation}
					</Card.Text>
					<Card.Text>
						<span style={{ fontSize: "1rem", fontWeight: "bold" }}>Task:</span>{" "}
						{star.task}
					</Card.Text>
					<Card.Text>
						<span style={{ fontSize: "1rem", fontWeight: "bold" }}>
							Action:
						</span>{" "}
						{star.action}
					</Card.Text>
					<Card.Text>
						<span style={{ fontSize: "1rem", fontWeight: "bold" }}>
							Result:
						</span>{" "}
						{star.result}
					</Card.Text>
					<Card.Text>
						<span style={{ fontSize: "1rem", fontWeight: "bold" }}>
							Description:
						</span>{" "}
						{star.description}
					</Card.Text>
					<div className="div-comment-editBtn">
						<div className="comment">
							<span
								style={{
									fontSize: "1.2rem",
									textAlign: "center",
								}}
							>
								Comment:
							</span>
							<Badge
								pill
								bg="neutral"
								style={{
									backgroundColor: "white",
									color: "black",
									fontSize: "1.3rem",
								}}
								className="badge"
							>
								{star.comment_count}
							</Badge>{" "}
						</div>
						<div className="d-flex">
							{user.role === "TA" || user.role === "mentor" ? null : (
								<>
									<button onClick={() => setEditing(true)} className="editBtn">
										Edit
									</button>
									<EditForm
										active={editing}
										star={star}
										refreshStars={refreshStars}
									/>
								</>
							)}
						</div>
					</div>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default SingleStar;
