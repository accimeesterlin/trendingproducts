import React, { useState } from "react";
import { Row, Col, Button, Image, Dropdown, Form } from "react-bootstrap";
import styled from "styled-components";
import { ArticleDrawerButton } from "@Blocks/ArticleDrawerButton";

const Label = styled.h1`
  font-family: IBMPlexSans_Medium;
  font-size: 16px;
  color: #414155;
  height: 24px;
  width: 50px;
  left: 760px;
  top: 128px;
  margin-top: 50px;
`;
const Thumbnail = styled(Image)`
  margin-top: 25px;
`;
const StyledButton = styled(Button)`
  border-radius: 24px;
  color: #16d898;
  border-color: #16d898;
  margin-top: 30px;
  &:hover {
    background-color: #16d898;
    border-color: #16d898;
  }
`;
const StyledDropdown = styled(Dropdown)`
  font-family: IBMPlexSans_Regular;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0.680419px;
  color: #414155;
  margin-top: 100px;
`;
const StyledToggle = styled(Dropdown.Toggle)`
  width: 100%;
  height: 3em;
  background: #ffffff;
  border: 1px solid #d6d6d6;
  box-sizing: border-box;
  border-radius: 5px;
  color: #414155;
  text-align: left;
  &:hover {
    background: #ffffff;
    border: 1px solid #d6d6d6;
    color: #414155;
  }
  &:focus {
    background: #ffffff;
    border: 1px solid #d6d6d6;
    color: #414155;
  }
`;
const StyledInput = styled(Form.Control)`
  width: 100%;
  height: 3em;
  background-color: #86869f;
  border-radius: 8px;
  margin-top: 10px;
  border: 0px;
  font-family: IBMPlexSans_Regular;
  letter-spacing: 0.680419px;
  color: #414155;
`;
export const Profile = ({ email, phone, teams }) => (
  // const [selectedTeam, setSelectedTeam] = useState("");
  <Row style={{ padding: "0 2em 2em 2em" }}>
    <Col xs={4} md={4}>
      <Label>Avatar</Label>
      <Thumbnail fluid src="/assets/thumbnail.png" />
      <StyledButton size="sm" variant="outline-success">
        Upload New Photo
      </StyledButton>
    </Col>
    <Col xs={8} md={8}>
      <StyledDropdown>
        <StyledToggle size="md">BoldTV!</StyledToggle>
        <Dropdown.Menu>
          {/* {teams.map((team) => (
              <Dropdown.Item key={team.id}>{team.name}</Dropdown.Item>
            ))} */}
          <Dropdown.Item>BoldTV!</Dropdown.Item>
          <Dropdown.Item>BoldTV!</Dropdown.Item>
        </Dropdown.Menu>
      </StyledDropdown>
      <Form.Group>
        <StyledInput
          size="md"
          type="text"
          placeholder="rmorris@boldtv.com"
          readOnly
        />
        <StyledInput
          size="md"
          type="text"
          placeholder="(941) 685 - 2834"
          readOnly
        />
        <StyledInput
          size="md"
          type="text"
          placeholder="https://www.boldtv.com"
          readOnly
        />
      </Form.Group>

      <ArticleDrawerButton />
    </Col>
  </Row>
);
