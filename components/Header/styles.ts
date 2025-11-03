"use client";

import styled from "styled-components";

export const HeaderBar = styled.header`
  display: flex;
  width: 1440px;
  height: 84px;
  padding: 13px 116px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  background: var(--Surface-Light, #fff);

  /* 4DP Elevation */
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.06);
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const Logo = styled.img`
  width: 45px;
  height: 45px;
  aspect-ratio: 1/1;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`;

export const TeamName = styled.h1`
  color: #000;
  font-family: Gilroy-Medium;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 23.343px; /* 116.716% */
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
