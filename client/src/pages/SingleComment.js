import { Card } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import EditComment from "./Component/EditComment";
import moment from "moment";
import "./SingleStarView.css";

function SingleComment({ comment, refreshStar, user }) {
	const [editing, setEditing] = useState(false);

	const refreshComment = (refresh) => {
		if (refresh) {
			refreshStar(true);
		}
		setEditing(false);
	};

	return (
		<div className="my-3">
			<Card body className="comment-body">
				<Card.Subtitle className="mb-2 text-muted">
					{comment.commenter} on {moment(comment.created_at).format("Do MMMM h:mm a")}
				</Card.Subtitle>
				<Card.Text>{comment.comment}</Card.Text>
				{user.id === comment.user_id ? (
					<>
						<div className="mb-3 Edit">
							<Button onClick={() => setEditing(true)}>Edit</Button>
						</div>
						<EditComment
							comment={comment}
							active={editing}
							refreshComment={refreshComment}
						/>
					</>
				) : null}
			</Card>
		</div>
	);
}

export default SingleComment;
