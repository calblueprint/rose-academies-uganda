import styled from "styled-components";

export const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
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
