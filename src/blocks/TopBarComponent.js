/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from "react";
import { ActionList, TopBar } from "@shopify/polaris";
import { Auth } from "aws-amplify";

import { topBarMarkup } from "./TopMenu";

export const TopBarComponent = ({ toggleMobileNavigationActive }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState({});

  const [userMenuActive, setUserMenuActive] = useState(false);

  const getUserProfile = async () => {
    const currentUser = await Auth.currentUserInfo();
    setUser(currentUser);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  // Handle
  const handleSearchFieldChange = useCallback((value) => {
    setSearchValue(value);
    setSearchActive(value.length > 0);
  }, []);
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );
  const handleSearchResultsDismiss = useCallback(() => {
    setSearchActive(false);
    setSearchValue("");
  }, []);

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  );

  const searchResultsMarkup = (
    <ActionList
      items={[
        { content: "Trending Products help center" },
        { content: "Community forums" },
      ]}
    />
  );

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  const userMenuActions = [
    {
      items: [
        {
          content: (
            <div onClick={signOut} onKeyUp={signOut} role="button" tabIndex="0">
              Sign Out
            </div>
          ),
        },
      ],
    },
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={user?.attributes?.email}
      detail="Trending Products"
      initials="D"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  return topBarMarkup({
    userMenuMarkup,
    searchActive,
    searchFieldMarkup,
    searchResultsMarkup,
    handleSearchResultsDismiss,
    toggleMobileNavigationActive,
  });
};
