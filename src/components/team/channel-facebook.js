import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";

export function FacebookChannel({ onUpdate }) {
  const { addToast } = useToasts();
  const [working, setWorking] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [pages, setPages] = useState([]);
  const [long, setLong] = useState(null);

  function getLongLiveUserAccessToken(previous) {
    const { user: userInfo } = previous;
    console.log(userInfo);
    setWorking(true);
    const appId = 428428908184653;
    const appSecret = "4d6ea0f7d289b6f193227eb3296ee207";

    FB.api(
      "/oauth/access_token",
      "GET",
      {
        grant_type: "fb_exchange_token",
        client_id: appId,
        client_secret: appSecret,
        fb_exchange_token: userInfo.accessToken,
      },
      function (response) {
        // Insert your code here
        console.log("the long live");
        console.log(response);
        if (response.access_token) {
          const _data = {
            ...response,
            userID: userInfo.userID,
            type: "longLive",
          };
          setUserToken(_data);
          // setLongUser(response);
          getLongLivePageAccessToken({
            ...previous,
            user: _data,
          });
        } else {
          setWorking(false);
          addToast("We cannot locate the page access. Try again", {
            appearance: "error",
          });
        }
      }
    );

    // get long live page access token
  }

  function getLongLivePageAccessToken(previous) {
    const { pages: _pages, user } = previous;

    setWorking(true);

    Promise.all(
      _pages.map(
        (el) =>
          new Promise((resolve, reject) => {
            // get long live user token
            FB.api(
              `/${el.id}`,
              "GET",
              {
                fields: "access_token",
                access_token: user.accessToken,
              },
              function (response) {
                if (response.error) {
                  reject(new Error("Something went wrong"));
                } else {
                  resolve(response);
                }
              }
            );
          })
      )
    )
      .then((longLiveTokens) => {
        setLong(longLiveTokens);
        setWorking(false);
        saveInformation({
          ...previous,
          pages: _pages.map((el, i) => ({
            ...el,
            access_token: longLiveTokens[i].access_token,
          })),
          longLiveTokens,
        });
      })
      .catch((error) => {
        console.error(error);
        addToast("Something went wrong try again", {
          appearance: "error",
        });
        setWorking(false);
      });

    // get long live page access token
  }

  async function saveInformation(info) {
    console.log(info);
    const channel = {
      type: "fbpage",
      config: info.pages,
    };
    setWorking(true);

    const r = await onUpdate(channel);

    if (r.error) {
      addToast("Something went wrong try again", {
        appearance: "error",
      });
    }

    setWorking(false);
  }

  function loadPermissions(previous) {
    setWorking(true);
    FB.api("/me/accounts", (response) => {
      if (response?.data && response.data.length > 0) {
        setPages(response.data); // NOTE Array
        // GET A long live token from the user
        getLongLiveUserAccessToken({ ...previous, pages: response.data });
      } else {
        setWorking(false);
        addToast("We cannot locate the page access. Try again", {
          appearance: "error",
        });
      }
    });
  }

  function connectPage() {
    FB.login(
      (response) => {
        if (response.status === "connected") {
          const _data = {
            ...response.authResponse,
            type: "shortLive",
          };
          setUserToken(_data);
          loadPermissions({ user: _data });
        } else {
          addToast("Something wrong happened try again", {
            appearance: "error",
          });
        }
      },
      {
        scope: "pages_manage_posts, pages_read_engagement",
        auth_type: "rerequest",
      }
    );
  }

  return (
    <Row>
      <Col>
        {pages.length === 0 ? (
          <div className="mb-3">
            <p className="text-muted mb-2">
              Use the button below to select the page where you want to post the
              articles
            </p>
            <Button variant="primary" size="sm" onClick={connectPage}>
              Connect the Facebook Page
            </Button>
          </div>
        ) : null}

        {!working && pages.length > 0 ? (
          <>
            <h2 className="h3">Pages selected</h2>
            {pages.map((el) => (
              <div key={el.id}>
                <h3 className="h5">{el.name}</h3>
              </div>
            ))}
          </>
        ) : null}

        {working ? <p className="my-4 text-center">Please wait...</p> : null}
      </Col>
    </Row>
  );
}
