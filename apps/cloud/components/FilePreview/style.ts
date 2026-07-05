import styled from "styled-components";

export const PreviewContainer = styled.div<{ $stacked?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${({ $stacked }) => ($stacked ? "column" : "row")};
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  min-width: 0;
  min-height: 0;
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

export const VideoActions = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 0.7rem 1rem;
  border-top: 1px solid #d9ddda;
  background: #ffffff;
  box-sizing: border-box;
  flex-shrink: 0;

  @media (max-width: 640px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const VideoActionLink = styled.a`
  display: inline-flex;
  min-height: 2.25rem;
  align-items: center;
  justify-content: center;
  padding: 0 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(30, 66, 64, 0.16);
  color: #0f766e;
  background: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background: #edf7f3;
  }
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
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  text-align: center;
`;

export const GenericTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  word-break: break-word;
`;

export const GenericMime = styled.p`
  margin: 0 0 16px;
  font-size: 14px;
  color: #666666;
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
  background: #0f766e;
  color: #ffffff;

  &:hover {
    background: #115e57;
  }
`;
