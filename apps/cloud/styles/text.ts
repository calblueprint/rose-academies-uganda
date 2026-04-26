import styled, { css } from "styled-components";

interface TextProps {
  $color?: string;
  $fontWeight?: number | string;
  $align?: "left" | "right" | "center" | "end" | "justify" | "start";
}

const TextStyles = css<TextProps>`
  color: ${({ $color }) => $color || "inherit"};
  text-align: ${({ $align }) => $align};
  margin: 0;
`;

/* Headings */

export const H1 = styled.h1<TextProps>`
  ${TextStyles}
  font-size: var(--font-h1);
  line-height: var(--lh-h1);
  font-weight: ${({ $fontWeight }) => $fontWeight || 400};
`;

export const H2 = styled.h2<TextProps>`
  ${TextStyles}
  font-size: var(--font-h2);
  line-height: var(--lh-h2);
  font-weight: ${({ $fontWeight }) => $fontWeight || 400};
`;

export const H3 = styled.h3<TextProps>`
  ${TextStyles}
  font-size: var(--font-h3);
  line-height: var(--lh-h3);
  font-weight: ${({ $fontWeight }) => $fontWeight || 400};
`;

export const H4 = styled.h4<TextProps>`
  ${TextStyles}
  font-size: var(--font-h4);
  line-height: var(--lh-h4);
  font-weight: ${({ $fontWeight }) => $fontWeight || 400};
`;

export const H5 = styled.h5<TextProps>`
  ${TextStyles}
  font-size: var(--font-h5);
  line-height: var(--lh-h5);
  font-weight: ${({ $fontWeight }) => $fontWeight || 400};
`;

export const H6 = styled.h6<TextProps>`
  ${TextStyles}
  font-size: var(--font-h6);
  line-height: var(--lh-h6);
  font-weight: ${({ $fontWeight }) => $fontWeight || 400};
`;

/* Subtitles */

export const Subtitle1 = styled.p<TextProps>`
  ${TextStyles}
  font-size: var(--font-subtitle-1);
  line-height: var(--lh-subtitle-1);
  font-weight: ${({ $fontWeight }) => $fontWeight || 400};
`;

export const Subtitle2 = styled.p<TextProps>`
  ${TextStyles}
  font-size: var(--font-subtitle-2);
  line-height: var(--lh-subtitle-2);
  font-weight: ${({ $fontWeight }) => $fontWeight || 400};
`;

export const Subtitle3 = styled.p<TextProps>`
  ${TextStyles}
  font-size: var(--font-subtitle-3);
  line-height: var(--lh-subtitle-3);
  font-weight: ${({ $fontWeight }) => $fontWeight || 400};
`;

/* Body */

export const Body = styled.p<TextProps>`
  ${TextStyles}
  font-size: var(--font-body);
  line-height: var(--lh-body);
  font-weight: ${({ $fontWeight }) => $fontWeight || 400};
`;

/* Caption */

export const Caption = styled.p<TextProps>`
  ${TextStyles}
  font-size: var(--font-caption);
  line-height: var(--lh-caption);
  font-weight: ${({ $fontWeight }) => $fontWeight || 400};
`;
