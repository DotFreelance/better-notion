// Modules.
import React, { useRef } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

// Elements.
import StyledCard from "../StyledCard";

// Models.
import CardTypes from "models/CardTypes";

// Hooks.
import { useCardEditor } from "hooks/useCardEditor";

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
  // State.
  const {
    currentCard,
    setDroppedImage,
    textAreaKeyDownHandler,
    textAreaChangeHandler
  } = useCardEditor(onAdd, null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: files => setDroppedImage(files[0]),
    noClick: true,
    noKeyboard: true
  });

  // Refs.
  const styleRef = useRef(randomStyle());

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
