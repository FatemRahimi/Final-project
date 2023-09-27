import React from "react";
// import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import SingleComment from "./SingleComment";
function CommentList({ comments, refreshStar, user }) {
	return (
		<>
			{Array.isArray(comments) && comments.length > 0 && (
				<ListGroup className="mt-3">
					{comments.map((comment) => (
							<SingleComment
								key={comment.id}
								comment={comment}
								refreshStar={refreshStar}
								user={user}
							/>
					))}
				</ListGroup>
			)}
		</>
	);
}
export default CommentList;
