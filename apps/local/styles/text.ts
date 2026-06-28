import styled, { css } from "styled-components";
import COLORS from "@/styles/colors";

interface TextProps {
  $color?: string;
  $fontWeight?: number | string;
  $align?: "left" | "right" | "center" | "end" | "justify" | "start";
}

const TextStyles = css<TextProps>`
  color: ${({ $color }) => $color || COLORS.gray100};
  text-align: ${({ $align }) => $align};
  margin: 0;
`;

// Add more styled components for different text elements if needed,
// or edit current component props according to the project design system
export const H1 = styled.h1<TextProps>`
  ${TextStyles}
  font-weight: ${({ $fontWeight }) =>
    $fontWeight || "var(--font-weight-page-title)"};
  font-size: 2rem;
  line-height: var(--lh-h3);
`;

export const H2 = styled.h2<TextProps>`
  ${TextStyles}
  font-weight: ${({ $fontWeight }) =>
    $fontWeight || "var(--font-weight-page-title)"};
  font-size: 1.75rem;
  line-height: var(--lh-h4);
`;

export const H3 = styled.h3<TextProps>`
  ${TextStyles}
  font-weight: ${({ $fontWeight }) =>
    $fontWeight || "var(--font-weight-section-title)"};
  font-size: 1.5rem;
  line-height: var(--lh-h4);
`;

export const H4 = styled.h4<TextProps>`
  ${TextStyles}
  font-weight: ${({ $fontWeight }) =>
    $fontWeight || "var(--font-weight-section-title)"};
  font-size: 1.25rem;
  line-height: var(--lh-h5);
`;

export const P1 = styled.p<TextProps>`
  ${TextStyles}
  font-weight: ${({ $fontWeight }) => $fontWeight || "400"};
  font-size: 1rem;
  line-height: var(--lh-body);
`;

export const P2 = styled.p<TextProps>`
  ${TextStyles}
  font-weight: ${({ $fontWeight }) => $fontWeight || "500"};
  font-size: 0.875rem;
  line-height: var(--lh-subtitle-2);
`;

export const P3 = styled.p<TextProps>`
  ${TextStyles}
  font-weight: ${({ $fontWeight }) => $fontWeight || "500"};
  font-size: 0.75rem;
  line-height: var(--lh-caption);
`;
