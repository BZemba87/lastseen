import React from "react";
import { Navbar, Container, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { 
  useCurrentUser, 
  useSetCurrentUser} 
  from "../contexts/CurrentUserContexts";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const {expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addCaptionIcon = (
    <NavLink
    className={styles.NavLink}
    activeClassName={styles.Active}
    to="/captions/create"
  >
    <i className="far fa-plus-square"></i>Add Caption
    </NavLink>

  );
  const loggedInIcons = (
  <>
    <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
    <i className="fas fa-sign-out-alt"></i>Log Out
  </NavLink>
  <NavLink
    className={styles.NavLink}
    to={`/profiles/${currentUser?.profile_id}`}
  >
    <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
  </NavLink>
  <NavLink
        to="/fave"
        className={`${styles.NavLink} d-none d-lg-block`}
        activeClassName={styles.Active}
      >
          <span>
            <i className="fa-solid fa-bookmark"></i> Fave Captions
          </span>
      </NavLink>
  </>
  );
  const loggedOutIcons = (
  <>
  <NavLink
    className={styles.NavLink}
    activeClassName={styles.Active}
    to="/login"
  >
    <i className="fas fa-sign-in-alt"></i>Login
  </NavLink>
  <NavLink
    to="/signup"
    className={styles.NavLink}
    activeClassName={styles.Active}
  >
    <i className="fas fa-user-plus"></i>Sign up
  </NavLink>
  </>
  );

  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            LastSeen
          </Navbar.Brand>
        </NavLink>
        {currentUser && addCaptionIcon}
        <Navbar.Toggle 
           ref={ref}
           onClick={() => setExpanded(!expanded)}
           aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;