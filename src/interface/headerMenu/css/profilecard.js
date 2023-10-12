const profilecardCss = () => `
.profileCard {
  display: flex;
  flex-direction: column;
  gap: 7px 0;
  position: absolute;
  padding: 8px;
  min-width: 0;
  background-color: rgb(0,0,0);
  color: rgb(255,255,255);
  z-index: 1000;
}
.profileCard>* {
  z-index: 1;
}
.profileCard>.header {
  text-align: center;
}

.profileCard .mask.avatar {
  width: 150px;
  aspect-ratio: 1/1;
  border-radius: 2px;
  box-shadow: 0 0 3px 0 rgb(255,255,255);
}
.profileCard .mask.avatar.zoom {
  position: absolute;
  width: 100%;
}
.profileCard .mask.cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 8px;
  margin: auto;
  opacity: 0.2;
}

.profileCard .list {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 0 5px;
}
.profileCard .texter {
  word-break: break-all;
  overflow: auto;
  max-height: 50px;
  box-shadow: inset 0 0 3px 0px rgb(0,0,0);
}

.profileCard ul.itemsList {
  gap: 3px 3px;
}

.profileCard .off {
  opacity: 0.5;
}
`;
