import styled from "styled-components";
import COLORS from "@/styles/colors";

export const PreviewContainer = styled.div<{ $scrollable?: boolean }>`
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${COLORS.pageWash};
  overflow: ${({ $scrollable }) => ($scrollable ? "auto" : "hidden")};
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
`;

export const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
`;

export const PreviewVideo = styled.video`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  background: #000000;
`;

export const VideoStage = styled.div`
  width: 100%;
  min-width: 0;
  min-height: 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
`;

export const PdfFrame = styled.iframe`
  width: 100%;
  height: 100%;
  min-height: 100%;
  border: none;
  display: block;
  flex: 1;
  overflow: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
`;

export const PdfCanvasStack = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  overflow: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
`;

export const PdfCanvasPage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
`;

export const PdfCanvas = styled.canvas`
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  background: ${COLORS.white};
  box-shadow: 0 8px 24px rgba(30, 66, 64, 0.12);
`;

export const PdfStatus = styled.p`
  margin: 0;
  padding: 0.75rem 1rem;
  color: ${COLORS.gray60};
  font-size: 0.95rem;
`;

export const PdfActions = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 0.7rem 1rem;
  border-top: 1px solid ${COLORS.surfaceBorder};
  background: ${COLORS.white};
  box-sizing: border-box;
  flex-shrink: 0;

  @media (max-width: 640px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const PdfHint = styled.p`
  margin: 0 auto 0 0;
  color: ${COLORS.gray60};
  font-size: 0.88rem;
  line-height: 1.35;

  @media (max-width: 640px) {
    margin: 0;
  }
`;

export const PdfActionLink = styled.a`
  display: inline-flex;
  min-height: 2.25rem;
  align-items: center;
  justify-content: center;
  padding: 0 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(30, 66, 64, 0.16);
  color: ${COLORS.evergreen};
  background: ${COLORS.white};
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background: ${COLORS.green20};
  }
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
