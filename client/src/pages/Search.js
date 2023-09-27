import React, { useState } from "react";
import "./Component/Dashboard.css";

const Search = ({ updateFilter ,placeholder }) => {
    const [input, setInput] = useState("");

	const handleSearch = (e) => {
		setInput(e.target.value);
		updateFilter(e.target.value);
	};
	return (
		<div className="input-gp">
			<input
				type="search"
				className="searchBar"
				placeholder={placeholder}
				aria-label={placeholder}
				aria-describedby="search-addon"
				onChange={handleSearch}
				value={input}
			/>
		</div>
	);
};

export default Search;