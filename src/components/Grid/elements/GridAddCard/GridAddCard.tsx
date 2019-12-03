// Modules.
import React, { useRef, useLayoutEffect, useCallback, useReducer } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

// Elements.
import StyledCard from "../StyledCard";

// Models.
import CardTypes from "models/CardTypes";

// Hooks.
import { useWebsiteDetails } from "hooks/useWebsiteDetails";
import { useStoredImage } from "hooks/useStoredImage";

// Reducers.
import { addCardReducer, initialCardState } from "reducers/addCardReducer";

// Utilities.
import debounce from "utils/debounce";

// Styles.
import { StyledCardType, StyledCardTitle, randomStyle } from "../cardStyles";

// Props.
interface IProps {
  onAdd: Function;
}

const StyledAddCard = styled(StyledCard)`
  padding: 1em;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  flex-grow: 1;
  margin-top: 0.25em;
  padding: 0;
  vertical-align: top;
  font-size: 0.85rem;
  resize: none;
  background-color: transparent;
  border: none;
  color: ${props =>
    props.cardType === CardTypes.Image || props.cardType === CardTypes.Website
      ? "#ffffff"
      : "inherit"};
  ::placeholder {
    color: inherit;
    opacity: 0.6;
  }
  :focus {
    outline: none;
  }
`;

const StyledIcon = styled.i`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  font-size: 5em;
  opacity: 0.2;
  z-index: 0;
  pointer-events: none;
`;

export const GridAddCard: React.FC<IProps> = ({ onAdd }) => {
  // Handlers.
  const onDrop = files => setDroppedImage(files[0]);

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

  // Refs.
  const styleRef = useRef(randomStyle());

  // State.
  const [currentCard, setCurrentCard] = useReducer(
    addCardReducer,
    initialCardState
  );
  const [website, setWebsiteUrl] = useWebsiteDetails();
  const [droppedImage, setDroppedImage] = useStoredImage();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true
  });

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

  return (
    <StyledAddCard
      randomStyle={styleRef.current}
      style={{
        backgroundImage: currentCard.image
          ? `linear-gradient(0deg, transparent, black), url('${currentCard.image}')`
          : ""
      }}
      {...getRootProps()}
      onKeyDown={textAreaKeyDownHandler}
    >
      <input {...getInputProps()} />
      <StyledCardType>{currentCard.type}</StyledCardType>
      {currentCard.title && (
        <StyledCardTitle>{currentCard.title}</StyledCardTitle>
      )}
      {currentCard.type !== CardTypes.Image && (
        <StyledTextArea
          cardType={currentCard.type}
          placeholder="Type your idea, website address or drop an image here..."
          onChange={textAreaChangeHandler}
          value={currentCard.body}
        />
      )}
      {currentCard.type === CardTypes.NewCard && (
        <StyledIcon className="material-icons">
          {isDragActive ? "add_photo_alternate" : "add"}
        </StyledIcon>
      )}
    </StyledAddCard>
  );
};
