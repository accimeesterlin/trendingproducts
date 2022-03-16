import { useState, useEffect } from "react";

export const ClientOnlyPage = ({ children }) => {
  const [browser, setBrowser] = useState(false);

  useEffect(() => {
    setBrowser(true);
  }, []);

  if (browser) {
    return children;
  }

  return null;
};
