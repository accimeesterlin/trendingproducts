import React from "react";
import { Row, Col } from "react-bootstrap";

export const TeamMembership = ({ role }) => (
  <Row>
    <Col className="pl-0 mb-2 font-weight-bold">
      {role === "owner" ? <p>You are the owner</p> : null}
      {role === "editor" ? <p>You are an Editor</p> : null}
    </Col>
  </Row>
);
