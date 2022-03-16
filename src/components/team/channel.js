import React, { useState, useEffect } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { ViewWrapper /** ErrorMessageView */ } from "@Components/view";

import { updateTeamById } from "@Libs";
import { useToasts } from "react-toast-notifications";
import { WordpressChannel } from "./channel-wordpress";
import { FacebookChannel } from "./channel-facebook";
import { TwitterChannel } from "./channel-twitter";

function modalTitle(flow) {
  switch (flow) {
    case "wp":
      return "WordPress channel";
    case "fbpage":
      return "Facebook channel";
    case "twitter":
      return "Twitter channel";
    default:
      return "Configure a channel.";
  }
}

const ModalSelector = ({ show, data, onCancel, onUpdate, activeChannels }) => {
  const [flow, setFlow] = useState(data.type || "start");
  const [flowData, setFlowData] = useState(data);

  const cancel = () => {
    setFlow("start");
    onCancel();
  };

  return (
    <Modal
      show={show}
      onHide={cancel}
      backdrop="static"
      keyboard={false}
      size={flow === "start" ? "sm" : "md"}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle(flow)}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {flow === "start" ? (
          <Row>
            <Col className="py-2">
              {activeChannels.includes("wp") ? null : (
                <div className="mb-4">
                  <Button
                    variant="info"
                    block
                    onClick={() => {
                      setFlowData(null);
                      setFlow("wp");
                    }}
                  >
                    Wordpress Website
                  </Button>
                </div>
              )}
              {activeChannels.includes("fbpage") ? null : (
                <div className="mb-4">
                  <Button
                    variant="info"
                    block
                    onClick={() => {
                      setFlowData(null);
                      setFlow("fbpage");
                    }}
                  >
                    {" "}
                    Facebook Page
                  </Button>
                </div>
              )}
              {activeChannels.includes("twitter") ? null : (
                <div className="mb-4">
                  <Button
                    variant="info"
                    block
                    onClick={() => {
                      setFlowData(null);
                      setFlow("twitter");
                    }}
                  >
                    {" "}
                    Twitter
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        ) : null}

        {flow === "wp" ? (
          <WordpressChannel data={flowData} onUpdate={onUpdate} />
        ) : null}
        {flow === "fbpage" ? (
          <FacebookChannel data={flowData} onUpdate={onUpdate} />
        ) : null}
        {flow === "twitter" ? (
          <TwitterChannel data={flowData} onUpdate={onUpdate} />
        ) : null}
      </Modal.Body>

      <Modal.Footer>
        <div>
          <Button variant="secondary" disabled={false} onClick={cancel}>
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export const ChannelSetup = ({ team }) => {
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(null);
  const [localChannels, setLocalChannels] = useState(team.channels || []);
  const { addToast } = useToasts();

  useEffect(() => {
    setLocalChannels(team.channels);
  }, [team.channels]);

  async function update(newValues) {
    let added = false;

    let up = localChannels.map((el) => {
      if (el.type === newValues.type) {
        added = true;
        return newValues;
      }
      return el;
    });

    if (!added) {
      up = [...localChannels, newValues];
    }

    return updateTeamById({
      id: team.id,
      channels: up.map((el) => JSON.stringify(el)),
    })
      .then(() => {
        setLocalChannels(up);
        addToast("Save complete", {
          appearance: "success",
        });
        onCancel();
        return {};
      })
      .catch((error) => {
        addToast("Could not update information", {
          appearance: "error",
        });
        console.error(error);
        return { error: true };
      });
  }

  function onCancel() {
    setCurrent(null);
    setShow(false);
  }

  return (
    <ViewWrapper
      title="Publication channels"
      footerText="Configure the channels where posts will be sent"
      content={
        <>
          <ShowChannels
            channels={localChannels}
            onEdit={(index) => {
              setCurrent(localChannels[index]);
              setShow(true);
            }}
          />
          {localChannels &&
          Array.isArray(localChannels) &&
          localChannels.length < 3 ? (
            <Row className="mt-2">
              <Col>
                <Button
                  variant="link"
                  className="p-0"
                  size="sm"
                  onClick={() => {
                    setCurrent({ isNew: true });
                    setShow(true);
                  }}
                >
                  Add channel
                </Button>
              </Col>
            </Row>
          ) : null}
          {current ? (
            <ModalSelector
              show={show}
              data={current}
              onCancel={onCancel}
              onUpdate={update}
              activeChannels={
                localChannels ? localChannels.map((el) => el.type) : []
              }
            />
          ) : null}
        </>
      }
    />
  );
};

function ShowChannels({ channels, onEdit }) {
  if (!channels || channels.length === 0) return null;

  return channels.map((el, i) => {
    switch (el.type) {
      case "wp":
        return (
          <Row key={`${el.type}/${el.name}`} className="mb-3">
            <Col>
              <h4>
                {el.name} (wordpress site){" "}
                <Button
                  variant="link"
                  onClick={() => {
                    onEdit(i);
                  }}
                >
                  edit
                </Button>
                {/* <Button variant="link">edit</Button> */}
              </h4>
            </Col>
          </Row>
        );
      case "fbpage":
        return el.config.map((page) => (
          <Row key={`page/${page.id}`} className="mb-3">
            <Col>
              <h4>
                {page.name} (fb page){" "}
                <Button
                  variant="link"
                  onClick={() => {
                    onEdit(i);
                  }}
                >
                  edit
                </Button>
              </h4>
            </Col>
          </Row>
        ));
      case "twitter":
        return (
          <Row key={`twitter/@${el.userId}`} className="mb-3">
            <Col>
              <h4>
                {el.userName} (twitter handle){" "}
                <Button
                  variant="link"
                  onClick={() => {
                    onEdit(i);
                  }}
                >
                  edit
                </Button>
              </h4>
            </Col>
          </Row>
        );
      default:
        return null;
    }
  });
}
