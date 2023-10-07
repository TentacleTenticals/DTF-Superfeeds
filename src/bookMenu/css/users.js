const usersCss = (c) => `

.db-user {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-shadow: 0 0 2px 1px rgb(0,0,0);
}
.db-user.picked {
  background-color: rgb(200,100,100);
}

.db-user .header {
  display: flex;
  justify-content: space-between;
  gap: 0 10px;
  height: 45px;
  flex-shrink: 0;
  padding: 0 4px 5px 4px;
}
.db-user .header :is(.subsite, .author) {
  display: flex;
  gap: 0 3px;
  align-items: flex-end;
  white-space: nowrap;
  margin: 11px 0 0 0;
}
.db-user .header :is(.subsite, .author) .name {
  white-space: nowrap;
}
.db-user .header .time {
  display: flex;
  gap: 0 3px;
  align-items: flex-end;
  white-space: nowrap;
  margin: 25px 0 0 0;
  opacity: 0.7;
}

.db-user .header .mask {
  display: flex;
  background-color: rgb(0,0,0);
  width: 20px;
  aspect-ratio: 1/1;
  padding: 2px;
  border-radius: 50%;
  box-shadow: 0 0 3px 0 rgb(0,0,0);
  overflow: hidden;
}
.db-user .header .mask img {
  aspect-ratio: 1/1;
  border-radius: 50%;
}

.db-user .title {
  font-size: 20px;
  font-family: 'Philosopher', sans-serif;
  font-family: 'Merriweather', serif;
  font-weight: 700;
  margin: 0 auto 0 auto;
  text-align: center;
}

.db-user .comment {
  font-size: 12px;
  opacity: 0.7;
  padding: 5px;
  text-align: center;
}

.db-user .description {
  font-size: 14px;
  font-weight: 500;
  padding: 5px;
  text-align: center;
}

.db-user .tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0 5px;
  padding: 5px;
}
.db-user .tags .tag {
  display: flex;
  color: ${c.database.bookMenu.feeds.attachments.visual.color.tag};
  cursor: pointer;
}
.db-user .tags .tag::before {
  display: block;
  content: '#';
}
`;
