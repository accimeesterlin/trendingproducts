import React from "react";
import { Row, Col, Form, Image, Button } from "react-bootstrap";
import styled from "styled-components";
const SocialInput = styled(Form.Control)`
  width: 100%;
  height: 3em;
  background-color: #86869f;
  border-radius: 8px;
  margin-top: 25px;
  border: 0px;
  font-family: IBMPlexSans_Regular;
  letter-spacing: 0.680419px;
  color: #414155;
`;
const CheckIcon = styled(Image)`
  align-self: center;
  margin-left: 2em;
  margin-top: 2.5em;
  width: 2em;
`;
const ConnectButton = styled(Button)`
  border-radius: 24px;
  color: #16d898;
  border-color: #16d898;
  margin-top: 40px;
  &:hover {
    background-color: #16d898;
    border-color: #16d898;
  }
`;
export const Social = () => (
  <Row style={{ padding: "0 2em 2em 2em" }}>
    <Col xs={9} md={10}>
      <SocialInput
        type="text"
        placeholder="boldtv.com/dp/ref=sr_1_95?crid=2QVK"
        readOnly
      />
      <SocialInput type="text" placeholder="facebook.com/BoldTV" readOnly />
      <SocialInput type="text" placeholder="Twitter" readOnly />
    </Col>
    <Col xs={3} md={2}>
      <CheckIcon src="/assets/check-circle.png" roundedCircle />
      <CheckIcon src="/assets/check-circle.png" roundedCircle />
      <ConnectButton size="sm" variant="outline-success">
        Connect
      </ConnectButton>
    </Col>
  </Row>
);
