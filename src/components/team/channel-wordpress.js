import React, { useState } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

function TestConfiguration({ control, testSucceed, onTestSucceed }) {
  const watched = useWatch({ control });
  const [isTesting, setIsTesting] = useState(false);
  const { addToast } = useToasts();

  // TODO stricker url validation

  let showTest = false;

  async function testIt() {
    setIsTesting(true);

    const testData = {
      action: "create_post",
      post_content: "If you can see this post. You are good to go",
      post_title: "Trending Products WordPress Channel Test",
      post_category: "country,travel,tourist,haiti",
      tags_input: "travel,startup,health,customer",
      post_author: "Trending Products",
    };

    axios
      .post(watched.publicationUrl, testData)
      .then(() => {
        addToast("Test message was successfully sent", {
          appearance: "success",
          autoDismiss: true,
        });
        onTestSucceed();
      })
      .catch((err) => {
        addToast("Test message could not best sent verify URL and try again", {
          appearance: "error",
          autoDismiss: true,
        });
        console.error(err);
      })
      .finally(() => {
        setIsTesting(false);
      });
  }

  // TODO
  try {
    showTest = watched.name && isValidUrl(watched.publicationUrl);
  } catch (error) {
    console.error("We could not check");
    console.error(error);
  }

  if (testSucceed) {
    return (
      <Button type="submit" variant="success" className="my-3">
        Save configuration
      </Button>
    );
  }

  if (showTest) {
    return (
      <Button
        variant="success"
        disabled={isTesting}
        onClick={testIt}
        className="my-3"
      >
        Send a test post (will be send as draft)
      </Button>
    );
  }

  return null;
}

export function WordpressChannel({ data, onUpdate }) {
  const { register, handleSubmit, control, getValues } = useForm();
  const [testSucceed, setTestSucceed] = useState(false);

  const onSubmit = () =>
    onUpdate({
      ...getValues(),
      type: "wp",
    });

  return (
    <Row>
      <Col>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="wpwebsitename">
            <Form.Label className="h6">Name of the wordpress site</Form.Label>
            <Form.Control
              {...register("name", { required: true })}
              defaultValue={data?.name || ""}
              required
            />
          </Form.Group>
          <Form.Group controlId="wppublicationurl">
            <Form.Label className="h6">Publication url</Form.Label>
            <Form.Control
              defaultValue={data?.publicationUrl || ""}
              {...register("publicationUrl", { required: true })}
              required
            />
          </Form.Group>

          <TestConfiguration
            control={control}
            testSucceed={testSucceed}
            onTestSucceed={() => {
              setTestSucceed(true);
            }}
          />
        </Form>
      </Col>
    </Row>
  );
}

function isValidUrl(url) {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
}
