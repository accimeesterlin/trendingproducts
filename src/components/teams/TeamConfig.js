import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";
import { useToasts } from "react-toast-notifications";

import {
  FormView,
  ViewWrapper /** ErrorMessageView */,
} from "@Components/view";
import { getOwnerLevelTeamInfo } from "@Libs";

const NewsAPIKey = ({ newsapiKey, onUpdate }) => {
  const { register, handleSubmit } = useForm();

  return (
    <Row>
      <Col>
        <FormView
          onSubmit={handleSubmit(onUpdate)}
          content={
            <>
              <Form.Group controlId="newsapiKey" className="p-4">
                <Form.Label className="h4">NewsAPI Key</Form.Label>
                <p id="newsapiKeyDesc" className="mt-2 mb-3  ">
                  The API key for newsapi service that will be used by this team
                </p>
                <Form.Control
                  defaultValue={newsapiKey}
                  {...register("newsapiKey", { required: true })}
                  aria-describedby="newsapiKeyDesc"
                  required
                />
              </Form.Group>
            </>
          }
          footerText="Only the team owner can see it"
        />
      </Col>
    </Row>
  );
};

const PublicationUrl = ({ publicationUrl, onUpdate }) => {
  const { register, handleSubmit } = useForm();

  return (
    <Row>
      <Col>
        <FormView
          onSubmit={handleSubmit(onUpdate)}
          content={
            <>
              <Form.Group controlId="publicationUrl" className="p-4">
                <Form.Label className="h4">Publication URL</Form.Label>
                <p id="publicationUrlDesc" className="mt-2 mb-3  ">
                  The url to which articles will be pushed
                </p>
                <Form.Control
                  defaultValue={publicationUrl}
                  {...register("publicationUrl", { required: true })}
                  aria-describedby="publicationUrlDesc"
                  required
                />
              </Form.Group>
            </>
          }
          footerText="Articles will be sent a HTTP POST request"
        />
      </Col>
    </Row>
  );
};

const FacebookIntegration = () => {
  const [isReady, setReadiness] = useState(null);
  const { addToast } = useToasts();

  useEffect(() => {
    let expiredIn = window.localStorage.getItem("/me/accounts/expiredIn");
    if (expiredIn) {
      expiredIn = new Date(expiredIn);
      if (expiredIn.getTime() > new Date().getTime()) {
        setReadiness(expiredIn);
        return;
      }
    } else {
      // console.log("we are not ready");
    }
    window.localStorage.removeItem("/me/accounts");
    window.localStorage.removeItem("/me/accounts/expiredIn");
  }, []);

  const getAndSavePagesToken = () => {
    const expiredIn = new Date(new Date().getTime() + 60 * 60 * 1000);
    console.log(expiredIn);
    console.log("we will get it");
    FB.api("/me/accounts", function (response) {
      // console.log("/me/accounts", response);

      if (response.data) {
        window.localStorage.setItem(
          "/me/accounts",
          JSON.stringify(response.data)
        );
        window.localStorage.setItem(
          "/me/accounts/expiredIn",
          expiredIn.toString()
        );
        setReadiness(expiredIn);
      }
    });
  };

  const connectPage = () => {
    FB.login(
      (response) => {
        if (response.status === "connected") {
          getAndSavePagesToken();
          console.log("we are good to go");
          addToast("Now we can send a message to the page", {
            appearance: "success",
          });
        } else {
          addToast("We cannot publish without those access", {
            appearance: "error",
          });
        }
      },
      {
        scope: "pages_manage_posts, pages_read_engagement",
        auth_type: "rerequest",
      }
    );
  };

  return (
    <ViewWrapper
      title="Facebook connect"
      footerText="Connect a facebook page"
      subTitle="Choose the page where the article will be published"
      content={
        <>
          <Row>
            <Col>
              {isReady ? (
                <div>
                  Your token will expired at: {new Date(isReady).toString()}
                </div>
              ) : (
                <Button variant="primary" size="sm" onClick={connectPage}>
                  Connect the facebook page
                </Button>
              )}
            </Col>
          </Row>
        </>
      }
    />
  );
};

export const TeamConfig = ({ team, updateTeam, role }) => {
  if (role !== "owner") return null;

  return (
    <>
      <NewsAPIKey newsapiKey={team.newsapiKey} onUpdate={updateTeam} />
      {/* <FacebookIntegration /> */}
      {/* <PublicationUrl
        publicationUrl={team.publicationUrl}
        onUpdate={updateTeam}
      /> */}
    </>
  );
};
