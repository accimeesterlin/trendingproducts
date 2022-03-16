import React from "react";
import { Row, Col } from "react-bootstrap";

import { AccountMenu } from "./account-menu";

export function AccountLayout({ children }) {
  return (
    <div className="main-content">
      <span className="spacer42" aria-hidden="true" />
      <Row>
        <Col xs="12" md="3">
          <AccountMenu />
        </Col>
        <Col xs="12" md="9" as="main">
          {children}
        </Col>
      </Row>
    </div>
  );
}
