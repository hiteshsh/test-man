/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

const sideMenu = css`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0px;
  width: 320px;
  height: 100%;
  background-color: #253053;
`;

const SideMenu = () => {
  return <div css={sideMenu}></div>;
};

export default SideMenu;
