const feedsCss = (c) => `
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu400:wght@400&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Philosopher&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap');

.itemsList.feeds {
  max-height: ${c.database.bookMenu.feeds.book.size['max height']}px;
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
  justify-content: space-between;
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
.db-feed .header .actions {
  display: flex;
  gap: 0 5px;
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

.db-feed .comment {
  font-size: 12px;
  opacity: 0.7;
  padding: 5px;
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
  max-width: ${c.database.bookMenu.feeds.attachments.visual.size.image['max width']}%;
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
  color: ${c.database.bookMenu.feeds.attachments.visual.color.tag};
  cursor: pointer;
}
.db-feed .tags .tag::before {
  display: block;
  content: '#';
}

.contextMenu .list .btn:is(.readed, .planToRead, .onHold, .favorite, .ignored, .blocked) {
  background-image: linear-gradient(45deg, rgb(83 148 161), transparent);
}

.db-feed audio.attach {
  margin: auto;
}


.db-feed .cont {
  display: flex;
  margin: 20px 0 0 0;
}
.db-feed .video-cont {
  display: inline-flex;
  position: relative;
  margin: auto;
  max-width: ${c.database.bookMenu.feeds.attachments.visual.size.video['max width']}%;
  box-shadow: 0px 0px 3px 1px rgb(0 0 0), 0px 0px 3px 1px rgb(255 255 255);
  z-index: 10;
  cursor: pointer;
}
.db-feed .audio-cont {
  display: inline-flex;
  position: relative;
  margin: auto;
  min-width: ${c.database.bookMenu.feeds.attachments.visual.size.audio['max width']}%;
  min-height: ${c.database.bookMenu.feeds.attachments.visual.size.audio['max height']}%;
  box-shadow: 0px 0px 3px 1px rgb(0 0 0), 0px 0px 3px 1px rgb(255 255 255);
  z-index: 10;
  cursor: pointer;
}
.db-feed :is(.video-cont, .audio-cont) :is(video, audio) {
  max-width: inherit;
  max-height: inherit;
  margin: auto;
}

.db-feed .video-cont.playing .mediaStarter {
  display: none;
}

.db-feed .mediaStarter {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 40%);
  position: absolute;
  /* justify-content: center; */
  align-items: center;
  z-index: 10;
  cursor: pointer;
}
.db-feed .mediaStarter .btn {
  display: flex;
  background-color: rgb(255 255 255);
  margin: 0 auto;
  height: 50%;
  max-height: 50px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  position: absolute;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 4px 0px rgb(0 0 0);
  z-index: 1;
  background-image: url(https://github.com/TentacleTenticals/dtf-markdown/raw/main/libs/Play.svg);
  background-size: 35%;
  background-repeat: no-repeat;
  background-position: 60% 50%;
}
.db-feed .mediaStarter .btn img {
  width: 35%;
  margin: 0px 0px 0px 10%;
}
.db-feed :is(.dtf-attach, .video-cont, .audio-cont):hover .mediaStarter .btn {
  opacity: 0.6;
}

.db-feed .dtf-attach.iframe.yt.video .mediaStarter .btn {
  background-color: rgb(255, 0, 0);
}
`;
