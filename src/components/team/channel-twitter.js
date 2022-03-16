import React from "react";
import { useRouter } from "next/router";
import { Row, Col, Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";

export function TwitterChannel() {
  const { addToast } = useToasts();
  const router = useRouter();
  const { id: teamId } = router.query;

  const startTwitterConnection = () => {
    fetch("/api/auth/twitter?step=1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        team: teamId,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.error) {
          addToast("Something went wrong. Try again", {
            appearance: "error",
            autoDismiss: true,
          });
          console.error("Internal server error ");

          setTimeout(() => {
            window.location.reload();
          }, 1500);
          return;
        }

        const { url, tokenSecret } = r;

        window.localStorage.setItem("@twTokenSecret", tokenSecret);

        window.location.assign(url);
      });
  };

  return (
    <Row>
      <Col>
        <div className="mb-3">
          <p className="text-muted mb-2">
            Use the button below to authorize the application to your Twitter
          </p>

          <Button variant="link" onClick={startTwitterConnection}>
            <img
              alt="Twitter logo"
              src="/assets/twitter-gray.png"
              width="auto"
              height="auto"
            />
          </Button>
        </div>
      </Col>
    </Row>
  );
}
