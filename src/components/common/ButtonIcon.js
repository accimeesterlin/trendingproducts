import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  justify-content: space-around;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: #ffffff;
  box-shadow: ${(props) => props.boxShadow};
  border: 1.5px solid #16d898;
  box-sizing: border-box;
  border-radius: 24px;
  color: ${(props) => props.color};
`;

const ButtonComponent = (props) => {
  return (
    <Button {...props}>
      <img src={props.icon} alt="" />
      <p>{props.children}</p>
    </Button>
  );
};

ButtonComponent.defaultProps = {
  height: "48px",
  color: "#00a26d",
};

export default ButtonComponent;
