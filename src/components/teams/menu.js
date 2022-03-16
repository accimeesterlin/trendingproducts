import React from "react";
import NextLink from "next/link";
import { Row, Col } from "react-bootstrap";

export const MenuLink = ({ href, label }) => (
  <NextLink href={href}>
    <a className="ml-3">{label}</a>
  </NextLink>
);

const TeamHomePageMenuButton = ({ children, active, ...rest }) => (
  <a
    className={active ? "d-block mb-3 font-weight-bold" : "d-block mb-3"}
    style={{ cursor: "pointer" }}
    {...rest}
  >
    {children}
  </a>
);

export const TeamHomePageMenu = ({ current, onChange }) => {
  const onClick = (e) => {
    e.preventDefault();
    if (e.target.getAttribute("data-menu")) {
      onChange(e.target.getAttribute("data-menu"));
    }
  };

  return (
    <Row>
      <Col>
        <TeamHomePageMenuButton
          active={current === "settings"}
          onClick={onClick}
          data-menu="settings"
        >
          Settings
        </TeamHomePageMenuButton>
        <TeamHomePageMenuButton
          active={current === "reports"}
          onClick={onClick}
          data-menu="reports"
        >
          Reports
        </TeamHomePageMenuButton>
      </Col>
    </Row>
  );
};
