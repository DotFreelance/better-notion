// Modules.
import { useLayoutEffect, useCallback, useReducer } from "react";

// Reducers.
import { addCardReducer, initialCardState } from "reducers/addCardReducer";

// Models.
import CardTypes from "models/CardTypes";

// Hooks.
import { useWebsiteDetails } from "hooks/useWebsiteDetails";
import { useStoredImage } from "hooks/useStoredImage";

// Utilities.
import debounce from "utils/debounce";

export const useCardEditor = (onAdd: Function, initialValues: any): any => {
  // State.
  const [website, setWebsiteUrl] = useWebsiteDetails();
  const [droppedImage, setDroppedImage] = useStoredImage();
  const [currentCard, setCurrentCard] = useReducer(
    addCardReducer,
    initialCardState
  );

  // Handlers.
  const checkForUrl = useCallback(
    debounce((text: string) => {
      if (
        text.match(
          //eslint-disable-next-line
          /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gi
        )
      ) {
        setWebsiteUrl(text);
      } else {
        setCurrentCard({ type: CardTypes.Text });
      }
    }, 100),
    []
  );

  const textAreaChangeHandler = (e): void => {
    const value = e.target.value.trim();
    setCurrentCard({ body: e.target.value });
    if (value) {
      checkForUrl(value);
    } else {
      checkForUrl.cancel();
      setCurrentCard({ type: CardTypes.NewCard });
    }
  };

  const addCardHandler = (): void => {
    onAdd({
      title:
        currentCard.title ||
        currentCard.body
          .split(/\s/g)
          .slice(0, 5)
          .join(" "),
      url: website ? website.url : "",
      type: currentCard.type,
      image: currentCard.image,
      content: currentCard.body
    });
    setCurrentCard({ type: CardTypes.NewCard });
  };

  // Effects.
  useLayoutEffect(() => {
    switch (currentCard.type) {
      case CardTypes.NewCard:
        setWebsiteUrl("");
        break;
      case CardTypes.Website:
        addCardHandler();
        break;
      case CardTypes.Image:
        addCardHandler();
        break;
      case CardTypes.Text:
        setWebsiteUrl("");
        break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, [currentCard.type]);

  useLayoutEffect(() => {
    if (website) {
      setCurrentCard({
        type: CardTypes.Website,
        image: website.image,
        title: website.title
      });
    } else {
      setCurrentCard(initialCardState);
    }
  }, [website]);

  useLayoutEffect(() => {
    if (droppedImage) {
      setCurrentCard({
        type: CardTypes.Image,
        image: droppedImage.base64,
        title: droppedImage.name
      });
    } else {
      setCurrentCard(initialCardState);
    }
  }, [droppedImage]);

  const textAreaKeyDownHandler = (e): void => {
    switch (e.key) {
      case "Enter":
        if (!e.getModifierState("Shift") && !e.getModifierState("Control")) {
          e.preventDefault();
          checkForUrl.cancel();
          if (e.target.value.trim().length) {
            addCardHandler();
          }
        }
        break;
      case "Escape":
        if (!e.getModifierState("Shift") && !e.getModifierState("Control")) {
          e.preventDefault();
          setCurrentCard({ type: CardTypes.NewCard });
        }
        break;
    }
  };

  return {
    currentCard,
    setDroppedImage,
    textAreaKeyDownHandler,
    textAreaChangeHandler
  };
};
