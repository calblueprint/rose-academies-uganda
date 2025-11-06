"use client";

import styled from "styled-components";

export const HeaderBar = styled.header`
  display: flex;
  width: 90rem;
  height: 5.25rem;
  padding: 0.8125rem 7.25rem;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  background: var(--Surface-Light, #fff);
  box-shadow: 0 0.125rem 0.5rem 0 rgba(0, 0, 0, 0.06);
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4375rem;
`;

export const Logo = styled.img`
  width: 2.8125rem;
  height: 2.8125rem;
  aspect-ratio: 1/1;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`;

export const TeamName = styled.h1`
  color: #000;
  font-family: Gilroy-Medium;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.459rem;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
