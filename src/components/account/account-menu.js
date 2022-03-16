import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";

export const AccountMenu = () => {
  const { pathname } = useRouter();

  return (
    <Row>
      <Col>
        <MenuItem to="/account" path={pathname} text="General" />
        <MenuItem to="/account/teams" path={pathname} text="Teams" />
        {/* <MenuItem
          to="/account/integrations"
          path={pathname}
          text="Integrations"
        /> */}
      </Col>
    </Row>
  );
};

function MenuItem({ to, path, text }) {
  return (
    <NextLink href={to}>
      <a
        className={
          path === to
            ? " d-block py-2 text-decoration-none font-weight-bold"
            : " d-block py-2 text-decoration-none "
        }
      >
        {text}
      </a>
    </NextLink>
  );
}
