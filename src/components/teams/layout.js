import React from "react";
import { Row, Col } from "react-bootstrap";

import { Layout } from "../layout";
import { MenuLink } from "./menu";

export const TeamLayout = ({ children, team = {}, role }) => {
  const { id } = team;

  return (
    <Layout>
      <Row className="my-5">
        {team.name ? (
          <Col xs="auto" className="d-flex flex-row">
            <h5 className="h5">
              <span className="text-muted">Team name: </span>
              {team.name}
            </h5>
            {role === "owner" ? <span className="ml-3">(Owner)</span> : null}
            {role === "editor" ? <span className="ml-3">(Editor)</span> : null}
          </Col>
        ) : null}
        <Col xs="auto" className="ml-auto">
          <Row>
            <Col>
              <MenuLink href={`/team/${id}`} label="Overview" />
              <MenuLink
                href={`/team/${id}/search`}
                label="Breaking news search"
              />
              <MenuLink
                href={`/team/${id}/search-all`}
                label="Advanced search"
              />
              <MenuLink href={`/team/${id}/queue`} label="Queue" />
            </Col>
          </Row>
        </Col>
      </Row>
      {children}
    </Layout>
  );
};
