import React from "react";
import Button from "react-bootstrap/Button";


const DeleteBtn = ({ star , refreshStars }) => {


	function removeStar(index) {
		alert("Do you want to delete : " + star.name);

		fetch(`/api/stars/${index}`, {
			method: "DELETE",
		})
			.then((res) => res)
			.then((data) => {
				console.log(data);
			})
			.catch((error) => console.error(error));
			refreshStars(true);
	}

	return (
		<Button variant="danger" type="submit" onClick={() => removeStar(star.id)}> Delete </Button>
	);
};

export default DeleteBtn;
