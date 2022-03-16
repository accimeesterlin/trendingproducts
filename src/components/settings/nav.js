import React from "react";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";
const StyledNav = styled(Navbar)`
  background-color: #414155;
  font-family: IBMPlexSans_Medium;
  padding: 0px;
  height: 10vh;
`;
const Brand = styled(Navbar.Brand)`
  margin-left: 40px;
`;
const Text = styled(Navbar.Text)`
  margin-right: 40px;
`;
export const Nav = ({ profile, loading }) => (
  <StyledNav bg="dark" variant="dark">
    {loading ? (
      <Brand>Settings </Brand>
    ) : (
      <Brand>Settings – {profile.fullName} </Brand>
    )}
    <Navbar.Collapse className="justify-content-end">
      <Text>Admin</Text>
    </Navbar.Collapse>
  </StyledNav>
);
