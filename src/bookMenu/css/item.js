const feedsCss = () => `
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu400:wght@400&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Philosopher&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap');

.savedFeed {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-shadow: 0 0 2px 1px rgb(0,0,0);
}
.savedFeed.picked {
  background-color: rgb(200,100,100);
}

.savedFeed .header {
  display: flex;
  gap: 0 10px;
  height: 45px;
  flex-shrink: 0;
  padding: 0 4px 5px 4px;
}
.savedFeed .header :is(.subsite, .author) {
  display: flex;
  gap: 0 3px;
  align-items: flex-end;
  white-space: nowrap;
  margin: 11px 0 0 0;
}
.savedFeed .header :is(.subsite, .author) .name {
  white-space: nowrap;
}
.savedFeed .header .time {
  display: flex;
  gap: 0 3px;
  align-items: flex-end;
  white-space: nowrap;
  margin: 25px 0 0 0;
  opacity: 0.7;
}

.savedFeed .header .mask {
  display: flex;
  background-color: rgb(0,0,0);
  width: 20px;
  aspect-ratio: 1/1;
  padding: 2px;
  border-radius: 50%;
  box-shadow: 0 0 3px 0 rgb(0,0,0);
  overflow: hidden;
}
.savedFeed .header .mask img {
  width: 100%;
  aspect-ratio: 1/1;
  margin: auto;
  border-radius: 50%;
}

.savedFeed .title {
  font-size: 20px;
  font-family: 'Philosopher', sans-serif;
  font-family: 'Merriweather', serif;
  font-weight: 700;
  margin: 0 auto 0 auto;
  text-align: center;
}

.savedFeed .description {
  font-size: 14px;
  font-weight: 500;
  padding: 5px;
  text-align: center;
}

.savedFeed .attachments {
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  margin: 10px auto 10px auto;
}
.savedFeed .attachments .text {
  text-align: center;
}

.savedFeed .attachments .mask {
  display: flex;
  background-color: rgb(0,0,0);
  width: 95%;
  aspect-ratio: 1/1;
  margin: auto;
  padding: 3px;
  border-radius: 2px;
}
.savedFeed .attachments .mask .attach {
  width: 100%;
  margin: auto;
}

.savedFeed .tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0 5px;
  padding: 5px;
}
.savedFeed .tags .tag {
  display: flex;
  color: rgb(88 41 177);
  cursor: pointer;
}
.savedFeed .tags .tag::before {
  display: block;
  content: '#';
}
`;
