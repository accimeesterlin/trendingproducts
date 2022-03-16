import React, { useRef } from "react";
import styled from "styled-components";
import { Form, OverlayTrigger, Popover } from "react-bootstrap";

// Match design can be better
const Container = styled.div`
  background-color: #414155;

  form {
    display: flex;
    align-items: center;
    padding: 20px;
  }
`;

const SearchInput = styled.input`
  font-size: 28px;
  color: #fff;
  background-color: #414155;
  border: none;
  margin-left: 20px;
  outline: none;

  &::placeholder {
    color: #16d898;
  }

  &::focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  button {
    margin-left: 20px;
  }
`;

const Button = styled.button`
  display: flex;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.1);
  padding: 10px;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 27px;
  align-items: center;
  letter-spacing: 0.4px;

  color: #00a26d;

  span {
    margin-left: 5px;
  }

  .remove {
    border-radius: 50%;
    width: 25px;
    color: #86869f;
    border: 1px solid #86869f;
  }
`;

const ToolTipContent = styled.div`
  width: 180px;
  padding: 10px;

  background: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.15);
  border-radius: 8px;

  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;

  letter-spacing: 0.437412px;

  color: #414155;

  p {
    margin: 10px;
  }
`;

export const SearchTerms = ({
  value,
  onSubmit,
  register,
  searchTerms: searchTermsValue,
  removeSearchTerms,
  updateSearchTerms,
  handleChange,
}) => {
  // Hide the ToolTip, and update the searchTerms with OR, AND, ALSO
  const hidePopover = (logic, name) => {
    updateSearchTerms(name, logic);
    document.body.click();
  };

  const renderToolTip = (name) => {
    return (
      <Popover id={`popover-positioned-bottom`}>
        <ToolTipContent>
          <p onClick={() => hidePopover("&&", name)}>Must Included</p>
          <hr />
          <p onClick={() => hidePopover("NOT", name)}>Not Mentioned</p>
          <hr />
          <p onClick={() => hidePopover("OR", name)}>Also Included</p>
        </ToolTipContent>
      </Popover>
    );
  };

  return (
    <Container>
      <div className="rectangle">
        <Form onSubmit={onSubmit}>
          <img src="/iris-scan-search.svg" alt="" />
          <ButtonContainer>
            {searchTermsValue && searchTermsValue.length > 0
              ? searchTermsValue.map((item, key) => (
                  <Button key={key}>
                    <span>{item.name}</span>

                    <OverlayTrigger
                      trigger="click"
                      key={"bottom"}
                      placement={"bottom"}
                      rootClose
                      overlay={renderToolTip(item.name)}
                    >
                      <span>&#x25BC;</span>
                    </OverlayTrigger>
                    <span
                      className="remove"
                      onClick={() => removeSearchTerms(item.name)}
                    >
                      x
                    </span>
                  </Button>
                ))
              : null}
          </ButtonContainer>
          <SearchInput
            value={value}
            type="text"
            onChange={(data) => handleChange(data)}
            {...register("q")}
            placeholder="Enter Search Terms"
          />
        </Form>
      </div>
    </Container>
  );
};

export default SearchTerms;
