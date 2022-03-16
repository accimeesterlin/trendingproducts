import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Router from "next/router";

const MenuButton = ({ href, label }) => (
  <Button
    variant="link"
    onClick={() => {
      Router.push(href);
    }}
  >
    {label}
  </Button>
);

export const Menu = () => (
  <Row>
    <Col>
      <MenuButton href="/" label="Home page" />
      <MenuButton href="/search" label="Breaking news search" />
      <MenuButton href="/search-all" label="Advanced search" />
      <MenuButton href="/queue" label="Queue" />
    </Col>
  </Row>
);
