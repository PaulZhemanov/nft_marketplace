import styled from "@emotion/styled";
import React from "react";

export const ItemView = styled.img<{ src?: string }>`
  width: 100%;
  border-radius: 8px;
  transition: transform 0.3s;
  ${({src}) => (src == null ? "border: 2px solid #000" : `background: url(${src}) center no-repeat`)};
  background-size: cover;

  &:hover {
    transform: scale(1.01)
  }
`;
