import { Row, Col } from "react-bootstrap";

export const ConfigWrapper = ({ children, title, footer }) => (
  <Row as="section" className="border rounded mb-5">
    <Col className="p-0">
      <main className="p-4">
        <h4 className="h4 mb-2">{title}</h4>
        {children}
      </main>

      <footer
        className="d-flex px-4 py-3 justify-content-between align-items-center border-top"
        style={{ backgroundColor: "#fafafa" }}
      >
        {footer}
      </footer>
    </Col>
  </Row>
);

export const ConfigFooter = ({ children }) => (
  <footer
    className="d-flex px-4 py-3 justify-content-between align-items-center border-top"
    style={{ backgroundColor: "#fafafa" }}
  >
    {children}
  </footer>
);
