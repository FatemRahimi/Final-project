import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "./images/cyf_brand.png";

const CustomNavbar = ({ children }) => (
	<Navbar>
		<Container>
			<img src={logo} alt="cyf logo" className="logo" />
			<Nav className="justify-content-end" style={{ width: "100%" }}>
				{children}
			</Nav>
		</Container>
	</Navbar>
);

export default CustomNavbar;
