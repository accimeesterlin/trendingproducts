import React from "react";
import styled from "styled-components";
import Profile from "./Profile";
import Button from "./Button";

// Match design can be better
const Container = styled.div``;

const MainContent = styled.div`
  margin-bottom: 30px;

  p {
    color: #ff40ec;
  }

  .num {
    font-size: 56px;
  }

  button {
    margin-top: 10px;
  }
`;

export const Sidebar = ({
  isSearchViewEnabled,
  setIsSearchViewEnabled,
  teamId,
  agnesSearchResultCount,
  newsAPICount,
}) => (
  <Container>
    {isSearchViewEnabled ? null : (
      <Content
        quantity={agnesSearchResultCount}
        news="News: Current"
        isSearchViewEnabled={isSearchViewEnabled}
        setIsSearchViewEnabled={setIsSearchViewEnabled}
        setIsSearchViewEnabled={setIsSearchViewEnabled}
      />
    )}
    <Content
      quantity={newsAPICount}
      setIsSearchViewEnabled={setIsSearchViewEnabled}
      news="News: Archives"
      isSearchViewEnabled={isSearchViewEnabled}
      setIsSearchViewEnabled={setIsSearchViewEnabled}
    />
  </Container>
);

const Content = ({
  quantity,
  news,
  isSearchViewEnabled,
  setIsSearchViewEnabled,
}) =>
  isSearchViewEnabled ? (
    <Button onClick={() => setIsSearchViewEnabled(false)}>
      Back To Search
    </Button>
  ) : (
    <MainContent>
      <p className="num">{quantity}</p>
      <p>{news}</p>
      <Button onClick={() => setIsSearchViewEnabled(true)}>
        View Articles
      </Button>
    </MainContent>
  );

export default Sidebar;
