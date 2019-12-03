// Modules.
import { useState, useLayoutEffect } from "react";
import ky from "ky";

// Models.
import WebsiteDataModel from "models/WebsiteDataModel";

export const useWebsiteDetails = (
  url?: string | undefined
): [WebsiteDataModel | null, Function] => {
  const [currentUrl, setCurrentUrl] = useState(url || "");
  const [websiteData, setWebsiteData] = useState(null);

  useLayoutEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (currentUrl) {
      const localData = localStorage.getItem(currentUrl);
      if (localData) {
        setWebsiteData(JSON.parse(localData));
      } else {
        (async () => {
          let response: Response | null = null;
          try {
            response = await ky.get(
              `https://api.linkpreview.net/?key=${process.env.REACT_APP_URL_PREVIEW_API_KEY}&q=${currentUrl}`,
              { signal }
            );
          } catch (e) {
            console.log(e.response);
          }
          if (response) {
            const json = await response.json();
            setWebsiteData(json);
            localStorage.setItem(currentUrl, JSON.stringify(json));
          }
        })();
      }
    } else {
      setWebsiteData(null);
    }

    return () => controller.abort();
  }, [currentUrl]);

  return [websiteData, setCurrentUrl];
};
