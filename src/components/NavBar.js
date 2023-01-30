import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const NavBar = () => {
  return(
    <Navbar expand="md" fixed="top">
      <Container>
        <Navbar.Brand>LastSeen</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <i className="fas fa-home"></i> Home
            </Nav.Link>
            <Nav.Link>Login</Nav.Link>
            <Nav.Link>Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
