import styled from "styled-components";

export const BoxesRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
`;

export const InfoBox = styled.div`
  display: flex;
  padding: 16px 80px 16px 32px;
  justify-content: center;
  align-items: center;
  gap: 28px;

  border-radius: 12px;
  border-right: 1px solid var(--gray, #d9d9d9);
  border-bottom: 1px solid var(--gray, #d9d9d9);
  border-left: 1px solid var(--gray, #d9d9d9);
  background: var(--white, #fff);
`;

export const IconCircle = styled.div<{
  $variant: "available" | "pending" | "synced";
}>`
  display: flex;
  width: 52px;
  height: 52px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 148.571px;

  background: ${({ $variant }) => {
    switch ($variant) {
      case "available":
        return "#E9F4E9"; // green background
      case "pending":
        return "#FFF6EA"; // light orange
      case "synced":
        return "var(--Rose-10, #FCEFEF);"; // neutral gray
      default:
        return "#F6F6F6"; // backup default
    }
  }};
`;

export const InfoLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoLabel = styled.div`
  color: #000;

  /* Subtitle 1 */
  font-family: var(--font-gilroy);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const InfoValue = styled.div`
  color: #000;
  font-family: var(--font-gilroy);
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px; /* 125% */
`;
