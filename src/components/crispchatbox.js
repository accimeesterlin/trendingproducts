import React, { useEffect } from "react";

const CrispChatBoxComponent = () => {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "1b38e124-7b98-4652-9599-b45ff96e5e4c";
    (() => {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("body")[0].appendChild(s);
    })();
  }, []);

  return null;
};

export default CrispChatBoxComponent;
