import { useState, useEffect } from "react";
import SingleStar from "./SingleStar";
import AddForm from "./AddForm";
import Search from "./Search";
import "./Component/Dashboard.css";

const StarList = ({ user }) => {
	const [stars, setStars] = useState(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [starSearch, setStarSearch] = useState("");
	const [creatorSearch, setCreatorSearch] = useState("");


	useEffect(() => {
		if (stars === null) {
			console.log("data working");
			fetch("/api/stars")
				.then((res) => {
					if (res.status === 500) {
						throw new Error(res.status);
					} else {
						return res.json();
					}
				})
				.then((data) => {
					console.log(data);
					setStars(data);
					setLoading(false);
				})
				.catch(() => {
					setStars([]);
					setError(true);
				});
		}
	}, [stars]);
	let filteredStars = stars ? stars : [];

	if (starSearch.trim() !== "") {
       const lowerCaseSearch = starSearch.trim().toLowerCase();

		filteredStars = filteredStars.filter(
			(star) =>
				star.name.toLowerCase().includes(lowerCaseSearch) ||
				star.situation.toLowerCase().includes(lowerCaseSearch) ||
				star.task.toLowerCase().includes(lowerCaseSearch) ||
				star.action.toLowerCase().includes(lowerCaseSearch) ||
				star.result.toLowerCase().includes(lowerCaseSearch) ||
				star.description.toLowerCase().includes(lowerCaseSearch)
		);
	}
	if (creatorSearch.trim() !== "") {
		const lowerCaseSearch = creatorSearch.trim().toLowerCase();

		filteredStars = filteredStars.filter((star) =>
			star.creator.toLowerCase().includes(lowerCaseSearch)
		);
	}
	return (
		<div className="starContainer">
			{user.role === "TA" || user.role === "mentor" ? (
				<>
					<div className="search">
						<Search
							updateFilter={setCreatorSearch}
							placeholder="search by creator's name"
						/>
						<Search
							updateFilter={setStarSearch}
							placeholder="search stars..."
						/>
					</div>
					<ul className="listGroup">
						{loading && <span>Loading, please wait until stars loads...</span>}
						{error && <span>{"There is a problem fetching the  data "}</span>}
						{filteredStars.map((star) => (
							<li id="list-item" key={star.id}>
								<SingleStar user={user} star={star} setStars={setStars} />
							</li>
						))}
					</ul>
				</>
			) : (
				<>
					<div className="search-student">
						<Search updateFilter={setStarSearch} placeholder="search stars" />
						<AddForm setStars={setStars} />
					</div>
					<ul className="listGroup">
						{loading && <span>Loading, please wait until stars loads...</span>}
						{error && <span>{"There is a problem fetching the  data "}</span>}
						{filteredStars.map((star) => (
							<li id="list-item" key={star.id}>
								<SingleStar user={user} star={star} setStars={setStars} />
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};
export default StarList;