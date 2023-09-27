import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";

const FavouriteIcon = ({ star, size = "2x" }) => {
	const [favourite, setFavourite] = useState(star.favourite);

	const handleFavouriteClick = async () => {
		try {
			const response = await fetch(`/api/stars/${star.id}/favourite`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ favourite: !favourite }),
			});

			const data = await response.json();
			if (data && data.star && data.star.favourite !== undefined) {
				setFavourite(data.star.favourite);
			} else {
				throw new Error("Invalid JSON data");
			}
		} catch (error) {
			console.log(error);
			if (error.response && error.response.status === 401) {
				alert("You don't have authorization to change favorites!");
			} else {
				alert("You don't have authorization to change favorites!");
			}
		}
	};

	return (
		<FontAwesomeIcon
			icon={favourite ? filledStar : emptyStar}
			onClick={handleFavouriteClick}
			style={{ cursor: "pointer", color: "gold" }}
			size={size}
		/>
	);
};

export default FavouriteIcon;
