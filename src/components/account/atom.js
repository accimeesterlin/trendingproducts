import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

export function FormView({
  content = null,
  footerText = "",
  onSubmit = () => {},
  isSubmitting = false,
}) {
  return (
    <Row as="section" className="border rounded mb-5">
      <Form onSubmit={onSubmit} className="w-100">
        {content}
        <footer
          className="d-flex px-4 py-3 justify-content-between align-items-center border-top"
          style={{ backgroundColor: "#fafafa" }}
        >
          <p className="my-2 text-muted">{footerText}</p>
          <div className="text-center">
            <Button
              variant="primary"
              type="submit"
              className=""
              // size="md"
              style={{
                padding: "6px 12px",
                minWidth: 80,
              }}
              disabled={isSubmitting}
            >
              Save
            </Button>
          </div>
        </footer>
      </Form>
    </Row>
  );
}

export const ErrorMessageView = ({ message }) => (
  <p className="font-weight-lighter font-italic font-smaller text-danger">
    {message}
  </p>
);
