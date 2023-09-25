const bookMenuCss = () => `
.bookMenu {
  display: flex;
  flex-direction: column;
}
.bookMenu .panelBar {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 5px 0;
  padding: 5px;
  background-color: rgb(0,0,0);
  color: rgb(255,255,255);
  box-shadow: inset 0 0 2px 0px rgb(0,0,0);
}

.bookMenu .panelBar .howMany {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.bookMenu .panelBar .nums {
  display: flex;
  align-items: center;
  gap: 0 4px;
}

.bookMenu .panelBar .nums>div {
  display: flex;
  gap: 0 4px;
}
.bookMenu .panelBar .nums>:nth-child(2)::before {
  display: flex;
  content: '/';
}

.bookMenu .panelBar .btns {
  display: flex;
  gap: 0 10px;
  flex-grow: 1;
  width: 100%;
}
.bookMenu .panelBar .btns button {
  flex-grow: 1;
}

.bookMenu .itemsList {
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  padding: 10px 8px 10px 10px;
  max-height: 300px;
  overflow: auto;
  box-shadow: inset 0 0 1px 1px rgb(0,0,0);
}
`;
