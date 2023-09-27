const feedsCss = (c) => `
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu400:wght@400&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Philosopher&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap');

.itemsList.feeds {
  max-height: ${c.bookMenu.visual.feeds['max height']}px;
}

.db-feed {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-shadow: 0 0 2px 1px rgb(0,0,0);
}
.db-feed.picked {
  background-color: rgb(200,100,100);
}

.db-feed .header {
  display: flex;
  gap: 0 10px;
  height: 45px;
  flex-shrink: 0;
  padding: 0 4px 5px 4px;
}
.db-feed .header :is(.subsite, .author) {
  display: flex;
  gap: 0 3px;
  align-items: flex-end;
  white-space: nowrap;
  margin: 11px 0 0 0;
}
.db-feed .header :is(.subsite, .author) .name {
  white-space: nowrap;
}
.db-feed .header .time {
  display: flex;
  gap: 0 3px;
  align-items: flex-end;
  white-space: nowrap;
  margin: 25px 0 0 0;
  opacity: 0.7;
}

.db-feed .header .mask {
  display: flex;
  background-color: rgb(0,0,0);
  width: 20px;
  aspect-ratio: 1/1;
  padding: 2px;
  border-radius: 50%;
  box-shadow: 0 0 3px 0 rgb(0,0,0);
  overflow: hidden;
}
.db-feed .header .mask img {
  aspect-ratio: 1/1;
  border-radius: 50%;
}

.db-feed .title {
  font-size: 20px;
  font-family: 'Philosopher', sans-serif;
  font-family: 'Merriweather', serif;
  font-weight: 700;
  margin: 0 auto 0 auto;
  text-align: center;
}

.db-feed .description {
  font-size: 14px;
  font-weight: 500;
  padding: 5px;
  text-align: center;
}

.db-feed .attachments {
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  margin: 10px auto 10px auto;
}
.db-feed .attachments .text {
  text-align: center;
}

.db-feed .attachments .mask {
  display: flex;
  background-color: rgb(0,0,0);
  width: 95%;
  aspect-ratio: 1/1;
  margin: auto;
  padding: 3px;
  border-radius: 2px;
}

.db-feed .attachments .mask:is(.png, .jpg, .jpeg, .gif) {
  max-width: ${c.database.feeds.attachments.visual.size.image}%;
}

.db-feed .tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0 5px;
  padding: 5px;
}
.db-feed .tags .tag {
  display: flex;
  color: ${c.database.feeds.attachments.visual.color.tag};
  cursor: pointer;
}
.db-feed .tags .tag::before {
  display: block;
  content: '#';
}
`;
