import React from "react";
import Nav from "react-bootstrap/Nav";


const NavbarButton = ({ name, link, clicked }) =>
	clicked ? (
		<button onClick={clicked} className="logout">
			{name}
		</button>
	) : (
		<Nav.Link href={link} className="logout">
			{name}
		</Nav.Link>
	);

export default NavbarButton;