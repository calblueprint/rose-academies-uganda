import styled from "styled-components";
import COLORS from "@/styles/colors";

export const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.pageWash};
`;

export const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
`;

export const PdfFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  display: block;
`;

export const GenericBox = styled.div`
  max-width: 480px;
  width: 100%;
  padding: 24px;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.surfaceBorder};
  border-radius: 12px;
  box-shadow: ${COLORS.surfaceShadow};
  text-align: center;
`;

export const GenericTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: var(--font-weight-section-title);
  color: ${COLORS.gray100};
  word-break: break-word;
`;

export const GenericMime = styled.p`
  margin: 0 0 16px;
  font-size: 14px;
  color: ${COLORS.gray60};
`;

export const GenericActions = styled.div`
  display: flex;
  justify-content: center;
`;

export const GenericLink = styled.a`
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  background: ${COLORS.evergreen};
  color: ${COLORS.white};

  &:hover {
    opacity: 0.9;
  }
`;
