/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import NestedList from "./NestedList";

const sideMenu = css`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0px;
  width: 250px;
  height: 100%;
  background-color: #253053;
  background-color: #ffffff;
`;

const SideMenu = () => {
  return (
    <div css={sideMenu}>
      <NestedList />
    </div>
  );
};

export default SideMenu;
