import styled from "styled-components";

export const DragHandle = styled.button`
  touch-action: none;
  cursor: grab;

  &:disabled {
    cursor: not-allowed;
  }

  &:active {
    cursor: grabbing;
  }
`;
