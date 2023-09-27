import React from "react";
import Button from "react-bootstrap/Button";

const DeleteComment = ({ comment, refreshStar }) => {

	function removeComment() {
		alert("Do you want to delete");

		fetch(`/api/stars/${comment.star_id}/comments/${comment.id}`, {
			method: "DELETE",
		})
			.then((res) => res)
			.then((data) => {
				console.log(data);
			})
			.catch((error) => console.error(error));
		refreshStar(true);
	}

	return (
		<Button
			variant="danger"
			type="submit"
			onClick={removeComment}
		>
			{" "}
			Delete{" "}
		</Button>
	);
};

export default DeleteComment;
