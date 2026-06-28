import styled from "styled-components";
import COLORS from "@/styles/colors";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  min-height: 15.625rem;
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 8px;
  box-shadow: ${COLORS.surfaceShadowSoft};
  overflow: hidden;
  cursor: pointer;
  min-width: 0;
  background: ${COLORS.white};
  box-sizing: border-box;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.15s ease;

  &:hover {
    border-color: ${COLORS.green20};
    box-shadow: ${COLORS.surfaceShadow};
    transform: translateY(-1px);
  }
`;

export const ImagePlaceholder = styled.div`
  position: relative;
  width: 100%;
  height: calc(15.625rem - 5.5rem);
  margin: -1px -1px 0;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 8px 8px 4px 4px;
  background: ${COLORS.pageWash};

  img {
    border-radius: 8px 8px 4px 4px;
  }
`;

export const Titleholder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 5.5rem;
  flex: 1 0 auto;
  padding: 0.75rem 1.25rem;
  align-items: flex-start;
  gap: 0.5rem;
  background: ${COLORS.white};
  box-sizing: border-box;
`;

export const Title = styled.h3`
  margin: 0;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: ${COLORS.gray100};
  font-family: var(--font-primary);
  font-size: 1.14356rem;
  font-style: normal;
  font-weight: var(--font-weight-section-title);
  line-height: normal;
`;

export const DescriptionText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.gray60};
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`;
