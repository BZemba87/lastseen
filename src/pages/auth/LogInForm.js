import React from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { Link } from "react-router-dom";

import styles from "../../styles/SignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

function LogInForm() {
//   Add your component logic here

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>log in</h1>
          <Form>
                <Form.Group controlId="username">
                    <Form.Label className="d-none">Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Username"
                        name="username" 
                        className={styles.Input}
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label className="d-none">Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        className={styles.Input}
                    />
                </Form.Group>
                <Button 
                    className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                    type="submit"
                >
                    Log In
                </Button>
            </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.LogInCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "/welcomeback.jpg"
          }
        />
      </Col>
    </Row>
  );
}

export default LogInForm;