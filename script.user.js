// ==UserScript==
// @name        DTF-User Block
// @namespace   https://github.com/TentacleTenticals/
// @match       https://dtf.ru/*
// @grant       none
// @version     1.0
// @author      Tentacle Tenticals
// @description Скрипт для показа и получения аватарок и фонов пользователей
// @homepage    https://github.com/TentacleTenticals/DTF-Get-your-avatar1
// @updateURL   https://github.com/TentacleTenticals/DTF-Get-your-avatar1/raw/master/main.user.js
// @downloadURL https://github.com/TentacleTenticals/DTF-Get-your-avatar1/raw/master/main.user.js
//
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/splitCls/classes.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/settings/css/dtfCore.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/widget/panel.js
//
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/widget/css/panel.js
//
// @require     https://github.com/TentacleTenticals/DTF-Libs1/raw/main/classes/ctxMenu/js/main.js
// @require     https://github.com/TentacleTenticals/DTF-Libs1/raw/main/classes/ctxMenu/css/main.js
//
// @require     https://github.com/TentacleTenticals/DTF-Libs1/raw/main/classes/profilecard/css/main.js?
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

(() => {
  let css = (cfg) => {
    return `
  .scrollLite::-webkit-scrollbar-thumb {
    background-color: rgb(189 164 164);
  }
  .scrollLite::-webkit-scrollbar {
    width: 2px;
  }

  .content-header__item--controls {
    display: flex;
    gap: 0 5px;
  }
  .content-header__item--controls .feedButtons {
    order: 0;
  }
  .content-header__item--controls .etc_control {
    height: unset;
    order: 1;
  }

  .feedButtons {
    display: flex;
    gap: 0 5px;
  }
  .feedButtons .subBtn {
    position: relative;
    display: flex;
    justify-content: center;
    aspect-ratio: 1/1;
  }

  .feedButtons .subBtn:hover>.list {
    position: relative;
    display: flex;
    right: 100%;
    padding: 0 0 0 5px;
    margin: 0 0 0 -5px;
  }
  .feedButtons .subBtn>.list {
    display: none;
  }

  .feedButtons .subBtn>.list .subList {
    display: flex;
    gap: 0 3px;
    padding: 2px;
    position: absolute;
    right: 100%;
    background-color: rgb(255,255,255);
    border-radius: 2px;
    box-shadow: 0 0 2px 1px rgb(0,0,0);
  }

  .feedButtons .btn {
    aspect-ratio: 1/1;
    border-radius: 2px;
    background-image: linear-gradient(315deg, rgb(187 187 187), transparent);
    box-shadow: 0 0 3px 0px rgb(0,0,0);
    cursor: pointer;
  }
  .feedButtons .btn:hover {
    background-image: linear-gradient(135deg, rgb(187 187 187), transparent);
  }

  .feed__item.l-island-round.topic.readed .feedButtons .readed {
    opacity: 0.5;
  }

  ul.itemsList {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 3px 0;
    padding: 0;
    margin: 0;
  }
  ul.itemsList li {
    display: flex;
    gap: 0 5px;
  }
  ul.itemsList li .buttons {
    display: flex;
    gap: 0 5px;
  }
  ul.itemsList li .buttons button {
    padding: 0 2px 0 2px;
    background-color: rgb(255,255,255);
    color: rgb(0,0,0);
    border: unset;
    border-radius: 2px;
  }
  ul.itemsList li::marker {
    font-size: 0;
  }

  label {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    gap: 0 5px;
    width: max-content;
    font-size: 15px;
    font-family: 'Sofia Sans Semi Condensed', sans-serif;
    font-family: 'Roboto Condensed', sans-serif;
    font-family: 'Raleway', sans-serif;
    font-family: 'Kurale', serif;
    font-weight: 500;
  }
  label.cont {
    gap: 5px 0;
    width: unset;
  }
  label.list {
    flex-direction: column;
  }

  .mask {
    display: flex;
    padding: 3px;
    background-color: rgb(0,0,0);
  }
  .mask .attach {
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  .dtf-feedsContainer .feed__item.l-island-round .content-header {
    position: relative;
    background-image: repeating-linear-gradient(135deg, transparent 40%, rgb(255 255 255 / 60%));
    padding: 20px 4px 0 4px;
    margin: unset !important;
    height: 50px;
    box-shadow: 0px 3px 4px 0px rgb(173 173 173);
  }

  .cont {
    display: flex;
  }
  .video-cont {
    display: inline-flex;
    position: relative;
    margin: auto;
    max-width: ${cfg.feeds.attachments.video.size.width}px;
    max-height: ${cfg.feeds.attachments.video.size.height}px;
    box-shadow: 0px 0px 3px 1px rgb(0 0 0);
    z-index: 10;
    cursor: pointer;
  }
  .video-cont video {
    max-width: inherit;
    max-height: inherit;
    margin: auto;
  }

  .video-cont.playing .mediaStarter {
    display: none;
  }

  .mediaStarter {
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
  .mediaStarter .btn {
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
    /* top: calc(50% - 50% / 2); */
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 4px 0px rgb(0 0 0);
    z-index: 1;
    /* cursor: pointer; */
  }
  .mediaStarter .btn img {
    width: 35%;
    margin: 0px 0px 0px 10%;
  }
  .video-cont:hover .mediaStarter .btn {
    background-color: rgb(255 0 0);
  }

  .updown {
    display: none;
  }
  .dtf-feedsContainer .feed__item {
    position: relative;
    border-radius: unset;
    order: 1;
    box-shadow: 0 0 3px 0px rgb(0,0,0);
  }
  .feed__item.l-island-round .content-header-author__avatar {
    border-radius: 50%;
  }
  .dtf-feedsContainer {
    display: flex;
    flex-direction: column;
    gap: 20px 0;
    margin: 1px 0 0 0;
  }
  .dtf-feedsContainer .feed__chunk {
    display: flex;
    flex-direction: column;
    gap: 20px 0;
  }
  .feedsList {
    display: flex;
    gap: 20px 0;
    flex-direction: column;
  }

  .wl-item.tagList>.list>.header {
    background-color: rgb(0,0,0);
    color: rgb(255 255 255);
    padding: 3px 2px 3px 2px;
    font-size: 12px;
    text-align: center;
  }

  .wl-item.tagList>.list {
    gap: 10px 0;
  }

  .wl-item.tagList>.list>.types .header {
    font-size: 11px;
    color: rgb(204 255 251);
  }
  .wl-item.tagList>.list>.subsites .header {
    font-size: 11px;
    color: rgb(204 255 251);
  }
  .wl-item.tagList>.list>.authors .header {
    font-size: 11px;
    color: rgb(204 255 251);
  }
  .wl-item.tagList>.list>.topics .header {
    font-size: 11px;
    color: rgb(204 255 251);
  }
  .wl-item.tagList>.list>.blogs .header {
    font-size: 11px;
    color: rgb(204 255 251);
  }

  .wl-item.tagList>.list .list {
    display: flex;
    flex-wrap: wrap;
    gap: 5px 7px;
    padding: 3px 2px 0 2px;
    max-height: 100px;
    overflow: auto;
  }

  .wl-item.tagList>.list .authors {
    display: flex;
    flex-direction: column;
    gap: 5px 0;
  }
  .wl-item.tagList>.list .authorTypes {
    color: rgb(165 165 165);
    font-size: 11px;
  }

  .dtf-menu {
    display: flex;
    flex-direction: column;
    background-color: rgb(0 0 0);
    position: absolute;
    top: 40px;
    margin: 10px 0 0 0;
    padding: 5px;
    border-radius: 2px;
    outline: none;
    z-index: 100;
    box-shadow: 0 0 4px 0px rgb(0 0 0);
  }
  .dtf-menu .header {
    background-color: rgb(88 44 78);
    color: rgb(255 255 255);
  }

  .dtf-menu .list {
    display: flex;
    flex-direction: column;
    margin: 6px 0 0 0;
    gap: 5px 0;
  }

  .dtf-menu .list .button {
    background-color: rgb(44 44 44);
    color: rgb(255 255 255);
    font-size: 14px;
    outline: none;
    cursor: pointer;
  }
  .dtf-menu .list button:hover {
    filter: brightness(1.3);
  }

  .dtf-menuButton {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .dtf-menuButton .menuList {
    display: none;
    position: absolute;
    margin: 0px 0px 0px -5px;
  }
  .dtf-menuButton:hover .menuList,
  .dtf-menuButton .menuList:hover {
    background: rgb(208 165 233);
    width: max-content;
    height: max-content;
    padding: 3px;
    display: flex;
    flex-direction: row;
    gap: 5px 5px;
    box-shadow: 0px 0px 2px 1px rgb(0 0 0);
    z-index: 10;
  }

  .feed__item.l-island-round:is(.favoriteTopicsSubsite, .favoriteTopicsAuthor, .favoriteBlogsAuthor,
  .ignoredTopicsSubsite, .ignoredTopicsAuthor, .ignoredBlogsAuthor,
  .blockedSubsite, .blockedTopicsAuthor, .blockedBlogsAuthor) .content-header::after {
    display: flex;
    position: absolute;
    top: 2px;
    left: 2px;
    font-size: 11px;
    font-weight: 600;
    line-height: 11px;
    padding: 2px;
    color: rgb(0 0 0);
    align-items: center;
    background-color: rgb(255 255 255 / 40%);
    border-radius: 2px;
    box-shadow: inset 0 0 2px 0px rgb(0,0,0);
  }

  .feed__item.l-island-round:is(.readed, .ignored, .planToRead, .onHold)::before {
    display: flex;
    position: absolute;
    width: 100%;
    margin-top: 4px;
    font-size: 11px;
    font-weight: 600;
    color: rgb(0 0 0);
    justify-content: center;
  }
  .feed__item.l-island-round:is(.noTitle, .noText)::after {
    display: flex;
    position: absolute;
    width: 100%;
    top: 11px;
    margin-top: 4px;
    font-size: 11px;
    font-weight: 600;
    color: rgb(0 0 0);
    justify-content: center;
  }

  .feed__item.l-island-round:is(.favoriteTopicsAuthor, .favoriteBlogsAuthor, .favoriteTopicsSubsite) .content-header {
    background-color: rgb(98 247 177);
  }
  .feed__item.l-island-round:is(.ignoredTopicsAuthor, .ignoredBlogsAuthor, .ignoredTopicsSubsite) .content-header {
    background-color: rgb(247 98 168);
  }
  .feed__item.l-island-round:is(.blockedTopicsAuthor, .blockedBlogsAuthor, .blockedSubsite) .content-header {
    background-color: rgb(201 123 31);
  }
  .feed__item.l-island-round:is(.blocked) .content-header {
    background-color: rgb(166 171 170);
  }

  .feed__item.l-island-round.favoriteTopicsAuthor .content-header::after {
    content: '💘 Автор статей';
  }
  .feed__item.l-island-round.favoriteBlogsAuthor .content-header::after {
    content: '💘 Автор блогов';
  }
  .feed__item.l-island-round.favoriteTopicsSubsite .content-header::after {
    content: '💘 Подсайт';
  }
  .feed__item.l-island-round.favoriteTopicsSubsite.favoriteTopicsAuthor .content-header::after {
    content: '💘 Подсайт и автор статей';
  }
  .feed__item.l-island-round.favoriteTopicsSubsite.favoriteBlogsAuthor .content-header::after {
    content: '💘 Подсайт и автор блогов';
  }

  .feed__item.l-island-round.ignoredTopicsAuthor .content-header::after {
    content: '💢 Автор статей';
  }
  .feed__item.l-island-round.ignoredBlogsAuthor .content-header::after {
    content: '💢 Автор блогов';
  }
  .feed__item.l-island-round.ignoredTopicsSubsite .content-header::after {
    content: '💢 Подсайт';
  }
  .feed__item.l-island-round.ignoredTopicsSubsite.ignoredTopicsAuthor .content-header::after {
    content: '💢 Подсайт и автор статей';
  }
  .feed__item.l-island-round.ignoredTopicsSubsite.ignoredBlogsAuthor .content-header::after {
    content: '💢 Подсайт и автор блогов';
  }

  .feed__item.l-island-round.blockedTopicsAuthor .content-header::after {
    content: '🈲 Автор статей';
  }
  .feed__item.l-island-round.blockedBlogsAuthor .content-header::after {
    content: '🈲 Автор блогов';
  }
  .feed__item.l-island-round.blockedSubsite .content-header::after {
    content: '🈲 Подсайт';
  }
  .feed__item.l-island-round.blockedSubsite.blockedTopicsAuthor .content-header::after {
    content: '🈲 Подсайт и автор статей';
  }
  .feed__item.l-island-round.blockedSubsite.blockedBlogsAuthor .content-header::after {
    content: '🈲 Подсайт и автор блогов';
  }

  .feed__item.l-island-round.ignoredTopicsSubsite.favoriteTopicsAuthor .content-header::after {
    content: '💢 Подсайт, 💘 автор статей';
  }
  .feed__item.l-island-round.ignoredTopicsSubsite.favoriteBlogsAuthor .content-header::after {
    content: '💢 Подсайт, 💘 автор блогов';
  }
  .feed__item.l-island-round.blockedSubsite.favoriteTopicsAuthor .content-header::after {
    content: '🈲 Подсайт, 💘 автор статей';
  }
  .feed__item.l-island-round.blockedSubsite.favoriteBlogsAuthor .content-header::after {
    content: '🈲 Подсайт, 💘 автор блогов';
  }

  .feed__item.l-island-round.favoriteTopicsSubsite.ignoredTopicsAuthor .content-header::after {
    content: '💘 Подсайт, 💢 автор статей';
  }
  .feed__item.l-island-round.favoriteTopicsSubsite.ignoredBlogsAuthor .content-header::after {
    content: '💘 Подсайт, 💢 автор блогов';
  }
  .feed__item.l-island-round.blockedSubsite.ignoredTopicsAuthor .content-header::after {
    content: '🈲 Подсайт, 💢 автор статей';
  }
  .feed__item.l-island-round.blockedSubsite.ignoredBlogsAuthor .content-header::after {
    content: '🈲 Подсайт, 💢 автор блогов';
  }

  .feed__item.l-island-round.favoriteTopicsSubsite.blockedTopicsAuthor .content-header::after {
    content: '💘 Подсайт, 🈲 автор статей';
  }
  .feed__item.l-island-round.favoriteTopicsSubsite.blockedBlogsAuthor .content-header::after {
    content: '💘 Подсайт, 🈲 автор блогов';
  }
  .feed__item.l-island-round.blockedSubsite.blockedTopicsAuthor .content-header::after {
    content: '🈲 Подсайт, 🈲 автор статей';
  }
  .feed__item.l-island-round.blockedSubsite.blockedBlogsAuthor .content-header::after {
    content: '🈲 Подсайт, 🈲 автор блогов';
  }

  .feed__item.l-island-round.readed::before {
    content: '✔️ ПРОСМОТРЕНО';
  }
  .feed__item.l-island-round.planToRead::before {
    content: '📚 ПРОЧТУ ПОЗЖЕ';
  }
  .feed__item.l-island-round.onHold::before {
    content: '📖 ЧИТАЮ';
  }

  .feed__item.l-island-round.blocked.noTitle.noText::after {
    content: 'БЛОКИРОВАНО, нет заголовка и текста';
  }
  .feed__item.l-island-round.blocked.noTitle::after {
    content: 'БЛОКИРОВАНО, нет заголовка';
  }
  .feed__item.l-island-round.blocked.noText::after {
    content: 'БЛОКИРОВАНО, нет текста';
  }

  .feed__item.l-island-round.noTitle.noText::after {
    content: 'Нет заголовка и текста';
  }
  .feed__item.l-island-round.noTitle::after {
    content: 'Нет заголовка';
  }
  .feed__item.l-island-round.noText::after {
    content: 'Нет текста';
  }

  .comment:is(.favorite, .ignored, .blocked) .comment__avatar {
    position: relative;
    border-radius: 50%;
  }
  .comment:is(.favorite, .ignored, .blocked) .comment__avatar::after {
    display: flex;
    position: absolute;
    top: -20%;
    left: -20%;
    font-size: 12px;
    min-width: 0;
    min-height: 0;
    aspect-ratio: 1/1;
    background-color: rgb(255 255 255 / 0.7);
    color: rgb(255,255,255);
    border-radius: 50%;
    box-shadow: 0 0 3px 0px rgb(0,0,0);
    align-items: center;
  }

  .comment.ignored .comment__avatar {
    box-shadow: 0 0 0px 3px rgb(177 69 25), 0 0 4px 2px rgb(0,0,0);
  }
  .comment.ignored .comment__avatar::after {
    content: '💢';
  }
  .comment.favorite .comment__avatar {
    box-shadow: 0 0 0px 3px rgb(213 132 183), 0 0 4px 2px rgb(0,0,0);
  }
  .comment.favorite .comment__avatar::after {
    content: '💘';
  }

  .comment.ignored .comment__text {
    filter: blur(9px);
  }
  .comment.ignored .comment__attaches {
    filter: blur(9px);
    opacity: 0.2;
  }
  .comment.ignored :is(.comment__text, .comment__attaches):hover {
    filter: none;
    opacity: 1;
  }

  .comment.blocked {
    position: relative;
    backdrop-filter: brightness(0.1);
    filter: brightness(0.1);
  }
  .comment.blocked::after {
    display: block;
    position: absolute;
    content: 'Blocked';
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0);
    color: rgb(255,255,255);
    text-align: center;
    z-index: 1;
  }
  .comment.blocked:hover::after {
    backdrop-filter: none;
    filter: none;
  }

  .usercard {
    display: flex;
    flex-direction: column;
    background-color: rgb(0,0,0);
    color: rgb(255,255,255);
    position: fixed;
    width: 500px;
    aspect-ratio: 1/0.5;
    box-shadow: 0 0 1px 1px rgb(0,0,0);
    z-index: 20;
  }

  .dtf-fyiWindow .header {
    display: flex;
    flex-direction: column;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(54 43 43);
    border-radius: 2px;
    padding: 2px;
    margin: 1px 1px 5px 1px;
    box-shadow: inset 0px 0px 2px 0px rgb(173 171 171);
    cursor: pointer;
  }
  .dtf-fyiWindow .header .label {
    font-size: 13px;
    font-family: 'Chakra Petch', sans-serif;
    letter-spacing: 0.5px;
    text-align: center;
  }
  .dtf-fyiWindow .header .label::before {
    display: inline-block;
    content: '';
    color: black;
    top: -4px;
    left: -10px;
    width: 20%;
    height: 1px;
    position: relative;
    box-shadow: 0px 0px 1px 1px rgb(185 0 87);
  }
  .dtf-fyiWindow .header .label::after {
    display: inline-block;
    content: '';
    color: black;
    top: -4px;
    right: -10px;
    width: 20%;
    height: 1px;
    position: relative;
    box-shadow: 0px 0px 1px 1px rgb(185 0 87);
  }

  .usercard .list {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: rgb(0,0,0, 0.8);
    padding: 5px;
  }
  .usercard .list .subList {
    display: flex;
  }

  .usercard .list .colList {
    display: flex;
    flex-direction: row;
  }
  .usercard .list .colList.space {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .usercard .list .subList.hor {
    flex-direction: row;
  }
  .usercard .list .subList.ver {
    flex-direction: column;
  }

  .usercard .list .off {
    opacity: 0.3;
  }

  .usercard .mask {
    display: flex;
    background-color: rgb(0,0,0);
    width: 140px;
    aspect-ratio: 1/1;
    overflow: hidden;
  }
  .usercard .mask .img {
    width: inherit;
    margin: auto;
  }
  .usercard .mask.avatar {
    flex-shrink: 0;
    box-shadow: 0 0 2px 1px rgb(131 131 131);
  }
  .mask.avatar:focus {
    position: absolute;
    width: unset;
    max-width: 100%;
    z-index: 20;
  }

  .usercard .mask.cover {
    position: absolute;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    top: 0;
    left: 0;
  }

  .hor {
    flex-direction: row !important;
  }

  .tGap-5 {
    row-gap: 5px;
  }
  .tGap-10 {
    row-gap: 10px;
  }
  .tGap-15 {
    row-gap: 15px;
  }
  .tGap-20 {
    row-gap: 20px;
  }

  .lGap-5 {
    column-gap: 5px;
  }
  .lGap-10 {
    column-gap: 10px;
  }
  .lGap-15 {
    column-gap: 15px;
  }
  .lGap-20 {
    column-gap: 20px;
  }

  .tMar-5 {
    margin-top: 5px;
  }
  .tMar-10 {
    margin-top: 10px;
  }
  .tMar-15 {
    margin-top: 15px;
  }
  .tMar-20 {
    margin-top: 20px;
  }

  .fullWidth {
    width: 100%;
  }

  .positive {
    color: rgb(68 211 146);
    font-weight: 600;
  }
  .negative {
    color: rgb(217 81 123);
    font-weight: 600;
  }

  .dark {
    background-color: rgb(0,0,0);
    color: rgb(255,255,255);
  }
  .light {
    background-color: rgb(255,255,255);
    color: rgb(0,0,0);
  }

  .usercard .list .btn {
    width: max-content;
    color: rgb(255,255,255);
    padding: 3px;
    cursor: pointer;
  }
  .usercard .list .btn:hover {
    filter: sepia(0.5);
  }

  .manyText {
    min-width: 0;
    font-size: 13px;
    word-break: break-word;
    overflow: auto;
  }

  .ras {
    display: block;
    width: 100%;
    background-color: rgb(121,76,95);
    color: rgb(255,255,255);
    margin: 6px 0 0 0;
    text-align: center;
    font-size: 11px;
  }

  .contextMenu .list .button:is(.readed, .planToRead, .onHold, .favorite, .ignored, .blocked) {
    filter: brightness(3.0);
  }

  .dtf-feedsContainer .feed__item {
    box-shadow: 0 0 1px 1px rgb(0,0,0);
  }

  .tagBtn {
    display: flex;
    background-color: rgb(0 0 0);
    color: rgb(255,255,255);
    width: max-content;
    padding: 1px 2px 1px 0;
    border-radius: 2px;
    box-shadow: inset 0 0 5px 0px rgb(255 255 255);
    cursor: pointer;
  }
  .tagBtn:hover {
    filter: brightness(1.1);
  }

  .tagBtn:is(.active-m1, .active-m2)::before {
    display: flex;
    color: rgb(0,0,0);
    font-size: 12px;
    line-height: 12px;
    align-items: center;
  }
  .tagBtn.active-m1::before {
    content: '⛔';
  }
  .tagBtn.active-m2::before {
    content: '⤴️';
  }
  .tagBtn.active-m1.active-m2::before {
    content: '⛔⤴️';
  }

  .tagBtn:is(.favorite, .ignored, .blocked) .num::before {
    display: flex;
    color: rgb(0,0,0);
    font-size: 12px;
    align-items: center;
  }
  .tagBtn.favorite .num::before {
    content: '💘';
  }

  .dtf-feedsContainer .feed__item.l-island-round.tagHide {
    display: none;
  }
  .dtf-feedsContainer .feed__item.l-island-round.tagSort {
    order: 0;
  }

  .tagBtn {
    display: flex;
    gap: 0 3px;
    align-items: center;
    padding: 3px;
  }
  .tagBtn .num {
    display: flex;
    background-color: rgb(255 255 255);
    color: rgb(0 0 0);
    padding: 0 2px 0 2px;
    font-size: 13px;
    font-weight: 600;
    align-items: center;
    border-radius: 2px;
  }
  .tagBtn .name {
    font-size: 13px;
  }

  .tagBtn.topic {
    order: 1;
  }
  .tagBtn.blog {
    order: 2;
  }
  .tagBtn.topic-edt {
    order: 3;
  }`;
  };

  const db = {}

  class Odb{
    typeOf(t){
      return Object.prototype.toString.call(t).slice(8, -1).toLowerCase();
    }
    fetch(cmd){
      return fetch(`${db.supabase.url}${cmd.path}`, {
        method: cmd.method,
        headers: {
          'Content-Type': 'application/json',
          'apiKey': db.supabase.apiKey,
          'Authorization': `Bearer ${db.supabase.token}`,
          'Content-Type': 'application/json',
          ...cmd.method !== 'GET' ? {'Prefer': 'return=minimal'} : {}
        },
        ...cmd.data && cmd.method !== 'GET' ? {body: JSON.stringify(cmd.data)} : {}
      }).then(r => {
        // console.log(r);
        return r.json().then(res => {
          // console.log('Odb', res);
          return res;
        }).catch(err => {
          if(err.message === 'Unexpected end of JSON input') return r;
          else
          return err;
        });
      });
    }
    supabase(cmd){
      console.log('SUP', cmd);

      function findOrUpdate(cmd){
        return this.supabase({
          run: 'find',
          type: i.type,
          target: i.id
        }).then(db => {
          if(!db){
            console.log('No item, adding...');
            this.supabase({
              run: 'add',
              type: i.type,
              target: i.id,
              data: i.obj
            }).then(ia => {
              // console.log(db);
              console.log('Item added!', ia);
            }).catch(er => {
              console.log('Err on adding');
              // console.log(er.code);
              console.log(er);
            });
          }else
          if(db){
            console.log('Item founded, updating...');
            this.supabase({
              run: 'update',
              type: i.type,
              target: i.id,
              data: i.obj
            }).then(iu => {
              console.log('Item updated!', iu);
            }).catch(er => {
              console.log('Error on updating');
              // console.log(er.code);
              console.log(er);
            });
          }
        }).catch(er => {
          console.log('Error at...');
          console.log(er.code);
          console.log(er);
        });
      }
      // this.fetch({run:'find', method:'GET', path:`${cmd.type}?id=eq.${cmd.target}`});

      switch(true){
        case cmd.run === 'find':{
          cmd.method = 'GET';
          cmd.path = `${cmd.type}?id=eq.${cmd.target}`;

          return this.fetch(cmd);
        }
        break;
        case cmd.run === 'get all':{
          cmd.method = 'GET';
          cmd.path = `${cmd.type}?select=*`;

          return this.fetch(cmd);
        }
        break;
        case cmd.run === 'findOrAdd':{
          console.log('FindOrAdd');
          cmd.method = 'GET';
          cmd.run = 'find';
          cmd.path = `${cmd.type}?id=eq.${cmd.target}`;

          return this.fetch(cmd).then(db => {
            console.log('DB', db);
            if(!db||this.typeOf(db) === 'array' && db.length === 0){
              console.log('Item not founded, adding...');
              cmd.method = 'POST';
              cmd.path = cmd.type;

              return this.fetch(cmd);

              // return this.fetch(cmd).then(db => {
              //   if(!db){
              //     console.log('Item not updated!');
              //     return db;
              //   }else
              //   if(db){
              //     console.log('Item updated!');
              //     return db;
              //   }
              // }).catch(err => {
              //   console.log(err);
              //   return err;
              // });
            }else
            if(db){
              console.log('Item founded, updating...');
              cmd.method = 'PATCH';
              cmd.path = `${cmd.type}?id=eq.${cmd.target}`;

              return this.fetch(cmd);
            }
          }).catch(err => {
            console.log('Error inside findOrAdd', err);
            return err;
          });
        }
        break;
        case cmd.run === 'add':{
          cmd.method = 'POST';
          cmd.path = `${cmd.type}`;

          return this.fetch(cmd);
        }
        break;
        case cmd.run === 'update':{
          cmd.method = 'PATCH';
          cmd.path = `${cmd.type}?id=eq.${cmd.target}`;

          return this.fetch(cmd);
        }
        break;
        case cmd.run === 'delete':{
          cmd.method = 'DELETE';
          cmd.path = `${cmd.type}?id=eq.${cmd.target}`;

          return this.fetch(cmd);
        }
        break;
      }

      // if(!cmd.dontCheck) return this.fetch(cmd);

      // return fetch(`${db.supabase.url}${cmd.path}`, {
      //   method: cmd.method,
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'apiKey': db.supabase.apiKey,
      //     'Authorization': `Bearer ${db.supabase.token}`,
      //     'Content-Type': 'application/json',
      //     ...cmd.method !== 'GET' ? {'Prefer': 'return=minimal'} : {}
      //   },
      //   ...cmd.data && cmd.method !== 'GET' ? {body: JSON.stringify(cmd.data)} : {}
      // }).then(r => {
      //   console.log(r);
      //   console.log(cmd);
      //   if(r.status === 201) return `В ${cmd.type} успешно добавлен новый элемент!`;
      //   else
      //   if(r.status === 200 && cmd.method === 'GET') return r.json().then(res => res).catch(err => {
      //     console.log(err);
      //   });
      // });

      // if(cmd.dontCheck) this.fetch(cmd).then(db => {
      //   console.log('CHECK...', cmd);
      //   if(!db){
      //     console.log('Not founded, adding...');
      //     cmd.method = 'POST';
      //     cmd.run = 'add';
      //     cmd.path = `${cmd.type}`;
      //     this.fetch(cmd).then(db => console.log(db)).catch(er => {
      //       console.log(er.code);
      //       console.log(er);
      //     });
      //   }else{
      //     console.log('Founded, updating...');
      //     cmd.method = 'PATCH';
      //     cmd.run = 'update';
      //     this.fetch(cmd).then(db => console.log(db)).catch(er => {
      //       console.log(er.code);
      //       console.log(er);
      //     });
      //   }
      // }).catch(er => {
      //   console.log(er.code);
      //   console.log(er);
      // });
      // console.log('URL', `https://${dbID}.supabase.co/rest/v1/${cmd.path}`);
    }
  }

  // new Odb().supabase({
  //   dbID: db.supabase.dbID,
  //   apiKey: db.supabase.apiKey,
  //   token: db.supabase.token,
  //   cmd: {
  //     run: 'add',
  //     type: 'feeds',
  //     target: '10005',
  //     data: {
  //       id: 10005,
  //       rules: {
  //         favorite: false,
  //         ignored: true
  //       },
  //       info: {
  //         id: 1000
  //       }
  //     }
  //   }
  // }).then(res => console.log(res)).catch(err => {
  //   console.log(err.code);
  //   console.log(err)
  // });

  let mainCfg = {
    'working mode': 'tags',
    'filters': {
      'comments': {
        'text': {
          'none': 'collapse',
          'some': 'collapse',
          'active': true,
          'words active': true,
          'words': []
        }
      },
      'feeds': {
        'blogs': {
          'title': {
            'none': 'collapse',
            'some': 'collapse',
            'active': true,
            'words active': true,
            'words': []
          },
          'text': {
            'none': 'collapse',
            'some': 'collapse',
            'active': true,
            'words active': true,
            'words': []
          }
        },
        'topics': {
          'title': {
            'none': 'collapse',
            'some': 'collapse',
            'active': true,
            'words active': true,
            'words': []
          },
          'text': {
            'none': 'collapse',
            'some': 'collapse',
            'active': true,
            'words active': true,
            'words': []
          }
        }
      }
    },
    'feeds': {
      'interface': {
        'feedButtons': {
          'readed': true,
          'author actions': true,
          'subsite actions': false
        }
      },
      'what to show': {
        'popular': {
          'topics': true,
          'blogs': true
        },
        'new': {
          'topics': true,
          'blogs': true
        },
        'my new': {
          'topics': true,
          'blogs': true
        },
        'bookmarks': {
          'topics': true,
          'blogs': true
        },
        'topic': {
          'topics': true,
          'blogs': true
        }
      },
      'attachments': {
        'video': {
          'replace': true,
          'autoplay': false,
          'sound': false,
          'volume': 40,
          'size': {
            'width': 300,
            'height': 150
          }
        }
      }
    },
    'database': {
      'adding': {
        'feeds': {
          'attachments': {
            'items': {
              'sz': 2
            },
            'albums': {
              'sz': 2
            }
          }
        }
      }
    },
    'usercard': {
      'avatar': {
        'search': {
          'list': [// Список поисковиков.
            {url:'http://saucenao.com/search.php?db=999&url=', name:'Saucenao', use:true},
            {url:'https://www.bing.com/images/search?view=detailv2&iss=sbi&FORM=SBIHMP&sbisrc=UrlPaste&q=imgurl:', name:'Bing', use:true},
            {url:'https://www.google.com/searchbyimage?sbisrc=4chanx&safe=off&image_url=', name:'Google', use:true},
            {url:'https://lens.google.com/uploadbyurl?url=', name:'Google Lens', use:true},
            {url:'https://yandex.ru/images/search?rdrnd=296405&rpt=imageview&url=', name:'Yandex', use:true},
            {url:'http://tineye.com/search/?url=', name:'TinEye', use:true},
            {url:'http://iqdb.org/?url=', name:'IQDB', use:true}
          ]
        }
      }
    },
    'script data': {
      'users': [],
      'subsites': [],
      'feeds': []
    }
  };

  let obs = {},
    widget;
  // window.addEventListener('load', run);
  // let data = {
  //   'users': [],
  //   'subsites': []
  // };

  function getPageType(url){
    if(!url){
      console.log('[GetPageType] error - no url');
      return;
    }
    url.replace(/https:\/\/dtf\.ru\/([^]+)/, (d, text) => {
      let arr = text.split('/');

      if(arr[0] && arr[0].match(/^popular$/)){
        if(!arr[1]) {
          // console.log('Popular');
          url = {type: 'popular'};
        }
      }

      if(arr[0] && arr[0].match(/^new$/)){
        if(!arr[1]) {
          // console.log('Popular');
          url = {type: 'new'};
        }
      }

      if(arr[0] && arr[0].match(/^my$/)){
        if(arr[1] && arr[1].match(/^new$/)) {
          // console.log('Popular');
          url = {type: 'my new'};
        }
      }

      if(arr[0] && arr[0].match(/^bookmarks$/)){
        if(!arr[1]) {
          // console.log('Bookmarks');
          url = {type: 'bookmarks'};
        }
      }

      if(arr[0] && arr[0].match(/^u$/)){
        if(arr[1] && !arr[2]) {
          // console.log('User');
          url = {type: 'user page', name: arr[1]};
        }else
        if(arr[1] && arr[2]) {
          // console.log('User blog');
          url = {type: 'topic'};
        }
      }
      if(arr[0] && arr[0].match(/^s$/)){
        if(arr[1] && !arr[2]) {
          // console.log('Subsite');
          url = {type: 'subsite', name: arr[1]};
        }else
        if(arr[1] && arr[2]) {
          // console.log('Subsite topic');
          url = {type: 'topic'};
        }
      }
      if(arr[0] && !arr[0].match(/^(u|s)$/)){
        if(arr[0] && !arr[1]) {
          // console.log('DTF subsite');
          url = {type: 'subsite', name: arr[0]};
        }else
        if(arr[0] && arr[1]) {
          // console.log('DTF subsite Topic');
          url = {type: 'topic'};
        }
      }
    })
    return url;
  }

  function attachment({path, type, i}){
    // console.log(i)
    const main=new El().Div({
      path: path,
      cName: `mask ${type}`,
      rtn: true
    });
    if(!i.data) return;
    if(i.type === 'image'){
      if(i.data.type.match(/video|gif/)){
        new El().Video({
          path: main,
          cName: 'attach',
          prelaod: 'metadata',
          autoplay: true,
          url: `https://leonardo.osnova.io/${i.data.uuid}`
        })
      }else
      new El().Image({
        path: main,
        cName: 'attach',
        url: `https://leonardo.osnova.io/${i.data.uuid}`
      })
    }
  };

  function videoReplace(path, video){
    if(video.getAttribute('data-andropov-type') === 'video' && video.getAttribute('data-video-service') === 'default'){
      // console.log('VIDEO', path.parentNode);
      // if(!path.parentNode || path.parentNode === 'null') return;
      let pp;
      path.parentNode ? pp = path.parentNode : pp = path;
      console.log('VIDEO', pp);
      let main=new El().Div({
        path: pp,
        cName: 'cont',
        rtn: []
      });
      let c=new El().Div({
        path: main,
        cName: 'video-cont',
        rtn: [],
        onclick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          if(c.lastChild.paused) c.lastChild.play();
          else c.lastChild.pause();
        }
      });
      let starter=new El().Div({
        path: c,
        cName: 'mediaStarter',
        rtn: []
      });
      let prev=new El().Div({
        path: starter,
        cName: 'btn',
        rtn: []
      });
      new El().Image({
        path: prev,
        url: 'https://github.com/TentacleTenticals/dtf-markdown/raw/main/libs/Play.svg'
      });
      new El().Video({
        path: c,
        url: video.getAttribute('data-video-mp4'),
        poster: video.getAttribute('data-video-thumbnail'),
        loop: true,
        muted: true,
        onplay: (e) => {
          e.target.parentNode.classList.toggle('playing');
        },
        onpause: (e) => {
          e.target.parentNode.classList.toggle('playing');
        },
        onended: (e) => {
          e.target.parentNode.classList.toggle('playing');
        }
      });
      // path.replaceChildren(main);
      path.remove();
    }
  }

  class Feeds{
    build(){
      if(!document.querySelector(`div[id=page_wrapper] .feed div[id='dtf-feedsContainer']`)){
        return new El().Div({
          path: document.querySelector(`div[id=page_wrapper] .feed .feed__container`),
          addBefore: document.querySelector(`div[id=page_wrapper] .feed .feed__container`).children[0],
          cName: 'dtf-feedsContainer',
          id: 'dtf-feedsContainer',
          rtn: true
        });
      }else
      return document.querySelector(`div[id=page_wrapper] .feed div[id='dtf-feedsContainer']`);
    }
    button({path, cName, title, text, onclick}){
      new El().Button({
        path: path,
        cName: `btn${cName ? ' '+cName : ''}`,
        title: title,
        text: text,
        onclick: onclick
      });
    }
    subBtn({path, cName, title, text, items}){
      new El().Div({
        path: path,
        cName: 'subBtn',
        title: title,
        text: text,
        func: (m) => {
          new El().Div({
            path: m,
            cName: 'list',
            func: (l) => {
              new El().Div({
                path: l,
                cName: 'subList',
                func: (s) => {
                  items.forEach(e => {
                    new El().Button({
                      path: s,
                      cName: `btn${e.cName ? ' '+e.cName : ''}`,
                      title: e.title,
                      text: e.text,
                      onclick: e.onclick
                    });
                  })
                }
              })
            }
          })
        }
      });
    }
    feedButtons({path, text, title, items}){
      const main=new El().Div({
        path: path,
        // addBefore: path.children[0],
        cName: 'feedButtons',
        func: (m) => {
          items.forEach(e => {
            this[e.type]({
              path: m,
              cName: e.cName,
              title: e.title,
              text: e.text,
              onclick: e.onclick,
              items: e.items
            });
          });
        }
      });
    }
    tagButton({path, id, name, attr, target, check}){
      // console.log('Target', target);
      const tag = path.querySelector(`div[tag-id='${id}']`);
      if(tag) return tag;
      else{
        const main=new El().Div({
          path: path,
          cName: `tagBtn${isNaN(attr) && ` ${id}`}${(() => {
            if(target && target[0] === 'subsite'){
              if(target[1].favorite) return ' favorite';
            }else
            if(target && target[0] === 'author'){
              if(target[1].favorite) return ' favorite';
            }else
            return '';
          })()}`,
          attr: ['tag-id', id],
          rtn: true,
          onclick: (e) => {
            if(e.button !== 0) return;
            // if(check, getPageType(document.location.href).type.match(/subsite|user page/)) return console.log(`You cannot hide ${type} feeds on ${type} page!`);
            for(let i = 0, arr = document.querySelectorAll(`div[id=page_wrapper] .feed .feed__container .feed__item`), length = arr.length; i < length; i++){
              if(arr[i].getAttribute(attr) === id) arr[i].classList.toggle('tagHide');
            }
            if(target && target[0] === 'subsite'){
              target[1].favorite ? main.classList.add('favorite') : main.classList.remove('favorite');
            }
            main.classList.toggle('active-m1');
          },
          onRclick: (e) => {
            e.preventDefault();
            if(e.button !== 2) return;
            // if(check, getPageType(document.location.href).type.match(/subsite|user page/)) return console.log(`You cannot hide ${type} feeds on ${type} page!`);
            for(let i = 0, arr = document.querySelectorAll(`div[id=page_wrapper] .feed .feed__container .feed__item`), length = arr.length; i < length; i++){
              if(arr[i].getAttribute(attr) === id) arr[i].classList.toggle('tagSort');
            }
            main.classList.toggle('active-m2');
          }
        });
        new El().Div({
          path: main,
          cName: 'num',
          text: '0'
        });
        new El().Div({
          path: main,
          cName: 'name',
          text: (() => {
            if(!name.match(/topic|blog/)) return name;
            else
            if(name === 'topic') return 'Статьи';
            else
            if(name === 'topic-edt') return 'Статьи от редакции';
            else
            if(name === 'blog') return 'Блоги';
          })()
        });

        return main;
      }
    }
  }

  function checkComments(){
    for(let i = 0, arr = document.querySelectorAll('.comment'), length = arr.length; i < length; i++){
      const t = mainCfg['script data'].users.find(el => el.id === arr[i].getAttribute('data-user_id'));
      if(!t) continue;
      t.rules.comments.favorite ? arr[i].classList.add('favorite') : arr[i].classList.remove('favorite');
      t.rules.comments.ignored ? arr[i].classList.add('ignored') : arr[i].classList.remove('ignored');
    }
  }
  async function checkFeeds(target, fullCheck){
    function getInfo(target){
      let filter = /https:\/\/dtf\.ru\/(u\/|s\/|[^/]{2,})(\d*)-{0,1}([^]*)/gm;
      let o;
      target.replace(filter, (d, type, id, username) => {
        if(type.match(/u\//) && id && username){
          console.log('User');
          o = {author:username, authorType:'User', authorID:id};
        }else
        if(type.match(/s\//) && !id && username){
          console.log('Official subsite');
          o = {author:username, authorType:'Official subsite', authorID:username};
        }
        if(type.match(/s\//) && id && username){
          console.log('User subsite');
          o = {author:username, authorType:'User subsite', authorID:id};
        }else
        if(!type.match(/u\/|s\//) && !id && !username){
          console.log('DTF subsite');
          o = {author:type, authorType:'DTF subsite', authorID:type};
        }
      })
      return o;
    }
    let num = 0,
      filter = {},
      location = getPageType(document.location.href),
      mainFeed;

    console.log('Checking feeds...');
    mainFeed = new Feeds().build();

    mainCfg['script data'].feeds = await new Odb().supabase({
      run: 'get all',
      type: 'feeds'
    });
    mainCfg['script data'].users = await new Odb().supabase({
      run: 'get all',
      type: 'users'
    });
    mainCfg['script data'].subsites = await new Odb().supabase({
      run: 'get all',
      type: 'subsites'
    });

    console.log('FeedsBase', mainCfg['script data'].feeds);
    console.log('UserBase', mainCfg['script data'].users);
    console.log('Subsites', mainCfg['script data'].subsites);

    if(!target){
      target = !fullCheck ? document.querySelector(`div[id=page_wrapper] .feed .feed__container .feed__chunk:not(.checked)`) : document.querySelectorAll(`div[id=page_wrapper] .feed .feed__container .feed__item`);
    }

    function checkAS(u, type, item, who, action){
      const teq = type.charAt(0).toUpperCase() + type.slice(1);
      // console.log('AU', u.rules[type].favorite);
      u.rules[type].favorite ? item.classList.add(`favorite${teq + who}`) : item.classList.remove(`favorite${teq + who}`);
      u.rules[type].ignored ? item.classList.add(`ignored${teq + who}`) : item.classList.remove(`ignored${teq + who}`);
      u.rules[type].blocked ? item.classList.add(`blocked${teq + who}`) + action.remove : item.classList.remove(`blocked${teq + who}`);
    }
    function checkFeedStatus(s, t, action){
      s.rules.readed ? t.classList.add('readed') : t.classList.remove('readed');
      s.rules.planToRead ? t.classList.add('planToRead') : t.classList.remove('planToRead');
      s.rules.onHold ? t.classList.add('onHold') : t.classList.remove('onHold');
      s.rules.favorite ? t.classList.add('favorite') : t.classList.remove('favorite');
      s.rules.ignored ? t.classList.add('ignored') : t.classList.remove('ignored');
      if(s.rules.blocked) action.remove;
    }
    function checkTitleText(t, type, att, action){
      // if(att.video && mainCfg.attachments.video.replace) videoReplace(att.video.path, att.video.video);
      if(mainCfg.filters.feeds[type].title.active){
        if(att.title){
          if(filter.title && mainCfg.filters.feeds[type].title['words active'] && att.title.match(filter.title)) action.collapse + t.classList.add('disabled', 'title');
        }else
          mainCfg.filters.feeds[type].title.none === 'collapse' ? action.collapse + t.classList.add('disabled', 'noTitle') : action.delete;
      }
      if(mainCfg.filters.feeds[type].text.active){
        if(att.text){
          if(filter.text && mainCfg.filters.feeds[type].text['words active'] && att.text.match(filter.text)) action.collapse + t.classList.add('disabled', 'text');
        }else
          mainCfg.filters.feeds[type].text.none === 'collapse' ? action.collapse + t.classList.add('disabled', 'noText') : action.delete;
      }
    }
    // if(!target && !target.children.length > 0) return;
    // console.log('Target', target);
    if(target){
      for(let i = 0, arr = !fullCheck ? target.children : target, length = arr.length; i < length; i++){
        const control = arr[i].querySelector(`.content-header__item--controls`).children[0],
          type = control.getAttribute('data-subsite-id') !== control.getAttribute('data-user-id') ? 'topic' : 'blog',
          att = {},
          action = {},
          tag = {},
          header = arr[i].querySelector(`.content-header__info`),
          container = arr[i].querySelector(`.content-container`),
          user = {
            id: control.getAttribute('data-user-id'),
            name: control.getAttribute('data-author-name'),
            get inBase(){
              return mainCfg['script data'].users.find(el => el.id.toString() === this.id);
            }
          },
          sub = {
            id: control.getAttribute('data-subsite-id'),
            name: control.getAttribute('data-subsite-name'),
            get inBase(){
              return mainCfg['script data'].subsites.find(el => el.id.toString() === this.id);
            }
          },
          feed = {
            id: control.getAttribute('data-content-id'),
            get inBase(){
              return mainCfg['script data'].feeds.find(el => el.id.toString() === this.id);
            }
          };
        let widget,
            tabs;
        // console.log('u', u);
        // console.log('s', s);
        if(user.inBase) console.log('User in base', user.inBase);
        if(feed.inBase) console.log('Feed in base', feed.inBase);

        if(container) for(let c = 0, cn = container.children, len = cn.length; c < len; c++){
          // console.log(arr[i])
          if(!cn[c].className) continue;
          if(cn[c].className.match('content-title')) att.title = cn[c].textContent.trim();
          if(cn[c].className.match('content-title') && cn[c].children[0]) att.editorial = true;
          if(cn[c].className.match('l-island-a') && cn[c].children[0] && cn[c].children[0].tagName === 'P') att.text = cn[c].children[0].textContent.trim();
          if(cn[c].className.match('figure-image') && cn[c].querySelector(`.andropov_video`)) att.video = {path:cn[c], video:cn[c].querySelector(`.andropov_video`)};
        }

        arr[i].setAttribute('sID', sub.id);
        arr[i].setAttribute('uID', user.id);

        if(mainCfg['working mode'] === 'tags'){
          widget = document.getElementById('widgetPanel').children[1].querySelector(`.wl-item.tagList`);
          tabs = {
            types: widget.children[1].children[0].children[1],
            subsites: widget.children[1].children[1].children[1],
            topics: widget.children[1].children[2].children[1].children[0],
            blogs: widget.children[1].children[2].children[2].children[0]
          }
        };
        // if(att.editorial) arr[i].setAttribute('author', 'editorial');

        // sub.id === user.id ? arr[i].setAttribute('type', 'blog') : (!att.editorial ? arr[i].setAttribute('type', 'topic') : arr[i].setAttribute('type', 'topic ✔️'));

        if(type === 'topic'){
          // TOPIC
          arr[i].classList.add('topic');
          !att.editorial ? arr[i].setAttribute('type', 'topic') : arr[i].setAttribute('type', 'topic-edt');

          if(mainCfg['working mode'] === 'tags'){
            tag.typelist = new Feeds().tagButton({
              path:tabs.types,
              id:arr[i].getAttribute('type'),
              name:arr[i].getAttribute('type'),
              attr:'type',
              check:true
            });
            tag.typelist.children[0].textContent = ++tag.typelist.children[0].textContent;
            if(tag.typelist.className.match('active')) arr[i].classList.add('tagHide');
            tag.sublist = new Feeds().tagButton({
              path:tabs.subsites,
              id:sub.id,
              name:sub.name,
              attr:'sID',
              target: sub.inBase && ['subsite', sub.inBase.rules.topics],
              check:true
            });
            tag.sublist.children[0].textContent = ++tag.sublist.children[0].textContent;
            if(tag.sublist.className.match('active-m1')) arr[i].classList.add('tagHide');
            if(tag.sublist.className.match('active-m2')) arr[i].classList.add('tagSort');
            tag.author = new Feeds().tagButton({
              path:tabs.topics,
              id:user.id,
              name:user.name,
              attr:'uID',
              target: user.inBase && ['author', user.inBase.rules.topics]
            });
            tag.author.children[0].textContent = ++tag.author.children[0].textContent;
            if(tag.author.className.match('active-m1')) arr[i].classList.add('tagHide');
            if(tag.author.className.match('active-m2')) arr[i].classList.add('tagSort');
          }
          if(user.inBase) checkAS(user.inBase, 'topics', arr[i], 'Author', action);
          if(sub.inBase) checkAS(sub.inBase, 'topics', arr[i], 'Subsite', action);
          if(feed.inBase) checkFeedStatus(feed.inBase, arr[i], action);

          // console.log('Container', container);

          if(container) checkTitleText(arr[i], 'topics', att, action);

          if(action.collapse) arr[i].classList.add('collapsed');
        }else{
          // BLOG
          arr[i].setAttribute('type', 'blog');

          if(mainCfg['working mode'] === 'tags'){
            tag.typelist = new Feeds().tagButton({
              path:tabs.types,
              id:arr[i].getAttribute('type'),
              name:arr[i].getAttribute('type'),
              attr:'type',
              check:true
            });
            tag.typelist.children[0].textContent = ++tag.typelist.children[0].textContent;
            if(tag.typelist.className.match('active')) arr[i].classList.add('tagHide');
            tag.author = new Feeds().tagButton({
              path:tabs.blogs,
              id:user.id,
              name:user.name,
              attr:'uID',
              target: user.inBase && ['author', user.inBase.rules.topics]
            });
            tag.author.children[0].textContent = ++tag.author.children[0].textContent;
            if(tag.author.className.match('active')) arr[i].classList.add('tagHide');
          }

          if(user.inBase) checkAS(user.inBase, 'blogs', arr[i], 'Author', action);
          if(sub.inBase) checkAS(sub.inBase, 'blogs', arr[i], 'Subsite', action);
          if(feed.inBase) checkFeedStatus(feed.inBase, arr[i], action);

          if(container) checkTitleText(arr[i], 'blogs', att, action);

          if(action.collapse) arr[i].classList.add('collapsed');
        }

        // mainFeed.appendChild(arr[i]);
        if(!arr[i].className.match('btns')){
          new Feeds().feedButtons({
            path: control.parentNode,
            items: [
              ...mainCfg['feeds']['interface']['feedButtons']['readed'] ? [{
                type: 'button',
                cName: 'readed',
                text: '✔️',
                title: 'Пометить как "прочитано"',
                onclick: () => {
                  new UserMenu().findOrAdd({id:feed.id, type:'feeds', key:'readed'}).then(res => {
                    if(res){
                      console.log('RES', res);
                      checkFeeds(false, true);
                    }
                    console.log('Feeds', mainCfg['script data'].feeds);
                  });
                }
              }] : [],
              {
                type: 'button',
                text: '↭\uFE0E',
                title: 'Свернуть/развернуть фид',
                onclick: () => {
                  arr[i].classList.toggle('collapsed');
                }
              },
              ...mainCfg['feeds']['interface']['feedButtons']['author actions'] ? [{
                type: 'subBtn',
                text: '📓',
                title: 'Действия с автором',
                items: [
                  {
                    text: '💘',
                    cName: 'favorite',
                    title: 'Избранный',
                    onclick: () => {
                      new UserMenu().findOrAdd({id:user.id, name:sub.id, type:'users', r:type === 'topic' ? 'topics' : 'blogs', key:'favorite'}).then(res => {
                        if(res) checkFeeds(false, true);
                        console.log('Subsite', mainCfg['script data'].subsites);
                      });
                    }
                  },
                  {
                    text: '💢',
                    cName: 'ignored',
                    title: 'Игнорировать',
                  },
                  {
                    text: '🈲',
                    cName: 'blocked',
                    title: 'Блокировать'
                  }
                ]
              }] : [],
              ...mainCfg['feeds']['interface']['feedButtons']['subsite actions'] ? [{
                type: 'subBtn',
                text: '📚',
                title: 'Действия с подсайтом',
                items: [
                  {
                    text: '💘',
                    cName: 'favorite',
                    title: 'Избранный'
                  },
                  {
                    text: '💢',
                    cName: 'ignored',
                    title: 'Игнорировать',
                  },
                  {
                    text: '🈲',
                    cName: 'blocked',
                    title: 'Блокировать'
                  }
                ]
              }] : []
            ]
          });
          arr[i].classList.add('btns');
        }
      }
      if(!fullCheck){
        target.classList.add('checked');
        mainFeed.appendChild(target);
      }
    }
    // mainFeed.appendChild(target);
  }
  function obsFeeds(mode){
    new El().Obs({
      obs: obs,
      target: document.querySelector(`.feed .feed__container`),
      check: true,
      search: /feed__container/,
      name: 'feeds',
      mode: mode,
      cfg: {attributes: false, childList: true, subtree: false, characterData: false},
      func: (item) => {
        // console.log('OBS ', item);
        if(!item.className) return;
        if(item.className.match(/feed__chunk(?! checked)/)){
          checkFeeds(item);
        }
      }
    });
  }
  class UserMenu{
    getUser(id){
      return fetch(`https://api.dtf.ru/v2.31/subsite?id=${id}`, {
      headers: {
        'accept': 'application/json'
      }
      }).then(r => r.json().then(res => res.result));
    }
    getTime(d){
      const t = new Date(d);
      return `${t.getFullYear()}/${t.getMonth()+1 < 10 ? `0${t.getMonth()+1}` : t.getMonth()+1}/${t.getDate() < 10 ? `0${t.getDate()}` : t.getDate()} ${t.getHours() < 10 ? `0${t.getHours()}` : t.getHours()}:${t.getMinutes() < 10 ? `0${t.getMinutes()}` : t.getMinutes()}:${t.getSeconds() < 10 ? `0${t.getSeconds()}` : t.getSeconds()}`
    }
    add({id, type, r, key}){
      return new Promise((result, error) => {
        if(type.match(/users|subsites/)){
          let obj;
          this.getUser(id).then(res => {
            if(type === 'users') obj = {
              id: id,
              info: {
                name: res.subsite.name,
                avatar: res.subsite.avatar && {
                  type: res.subsite.avatar.type,
                  data: {
                    type: res.subsite.avatar.data.type,
                    uuid: res.subsite.avatar.data.uuid
                  }
                }||''
              },
              rules:{
                topics:{
                  favorite: false,
                  ignored: false,
                  blocked: false
                },
                blogs:{
                  favorite: false,
                  ignored: false,
                  blocked: false
                },
                comments:{
                  favorite: false,
                  ignored: false,
                  blocked: false
                }
              }
            };
            else
            if(type === 'subsites') obj = {
              id: id,
              info: {
                name: res.subsite.name,
                avatar: res.subsite.avatar && {
                  type: res.subsite.avatar.type,
                  data: {
                    type: res.subsite.avatar.data.type,
                    uuid: res.subsite.avatar.data.uuid
                  }
                }||''
              },
              rules:{
                topics:{
                  favorite: false,
                  ignored: false,
                  blocked: false
                },
                comments:{
                  favorite: false,
                  ignored: false,
                  blocked: false
                }
              }
            };
            obj.rules[r][key] ? obj.rules[r][key] = false : obj.rules[r][key] = true;
            mainCfg['script data'][type].push(obj);
            result({status:'success', type:'subsites', run:'add', id:id, data:obj});
          });
        }else{
          this.getFeed(id).then(res => {
            const obj = {
              id: id,
              rules: {
                readed: false,
                planToRead: false,
                onHold: false,
                favorite: false,
                ignored: false,
                blocked: false
              },
              info: {
                author: {
                  id: res.author.id,
                  name: res.author.name,
                  avatar: res.author.avatar && {
                    type: res.author.avatar.type,
                    data: {
                      type: res.author.avatar.data.type,
                      uuid: res.author.avatar.data.uuid
                    }
                  }||''
                },
                subsite: {
                  id: res.subsite.id,
                  name: res.subsite.name,
                  avatar: res.subsite.avatar && {
                    type: res.subsite.avatar.type,
                    data: {
                      type: res.subsite.avatar.data.type,
                      uuid: res.subsite.avatar.data.uuid
                    }
                  }||''
                },
                title: res.title,
                text: undefined,
                date: res.date,
                isBlur: res.isBlur,
                keywords: res.keywords,
                attachments: (() => {
                  if(res.blocks.length > 0){
                    // console.log('BLOCKS', res.blocks);
                    const list = [];
                    for(let i = 0, arr = res.blocks, arrLen = arr.length - (res.keywords.length > 0 ? 1 : 0), len = (mainCfg.database.adding.feeds.attachments.items.sz >= arrLen ? arrLen : mainCfg.database.adding.feeds.attachments.items.sz); i < len; i++){
                      if(arr[i].type.match(/media|text/)){
                        list.push(this.getAttach(arr[i]));
                      }else continue;
                    }
                    return list;
                  }
                })()
              }
            }
            obj.rules[key] ? obj.rules[key] = false : obj.rules[key] = true;
            mainCfg['script data'].feeds.push(obj);
            result({status:'success', type:'feeds', run:'add', id:id, data:obj});
            // checkFeeds(false, true);
          });
        }
      });
    }
    update1(item, r, key){
      return new Promise((result, error) => {
        if(type.match(/users|subsites/)){
          let obj;
          this.getUser(id).then(res => {
            if(type === 'users') obj = {}
          })
        }
      })
      console.log(`UPDATE ${item}, ${r}, ${key}`);
      if(r) item.rules[r][key] ? item.rules[r][key] = false : item.rules[r][key] = true;
      else{
        item.rules[key] ? item.rules[key] = false : item.rules[key] = true;
      }
      return item;
    }
    update({id, item, type, r, key}){
      return new Promise((result, error) => {
        if(type.match(/users|subsites/)){
          let obj;
          this.getUser(id).then(res => {
            if(type === 'users'){
              obj = structuredClone(item);
              obj.info.name = res.subsite.name;
              obj.info.avatar = res.subsite.avatar ? {
                type: res.subsite.avatar.type,
                data: {
                  type: res.subsite.avatar.data.type,
                  uuid: res.subsite.avatar.data.uuid
                }
              }: '';
            }else{
              obj = structuredClone(item);
              obj.info.name = res.subsite.name;
              obj.info.avatar = res.subsite.avatar ? {
                type: res.subsite.avatar.type,
                data: {
                  type: res.subsite.avatar.data.type,
                  uuid: res.subsite.avatar.data.uuid
                }
              }: '';
            }

            item.rules[r][key] ? item.rules[r][key] = false : item.rules[r][key] = true;
            result({status:'success', type:'users', run:'update', id:id, data:obj});
          });
        }else{
          this.getFeed(id).then(res => {
            const obj = {
              id: id,
              rules: structuredClone(item.rules),
              info: {
                author: {
                  id: res.author.id,
                  name: res.author.name,
                  avatar: res.author.avatar ? {
                    type: res.author.avatar.type,
                    data: {
                      type: res.author.avatar.data.type,
                      uuid: res.author.avatar.data.uuid
                    }
                  }: ''
                },
                subsite: {
                  id: res.subsite.id,
                  name: res.subsite.name,
                  avatar: res.subsite.avatar ? {
                    type: res.subsite.avatar.type,
                    data: {
                      type: res.subsite.avatar.data.type,
                      uuid: res.subsite.avatar.data.uuid
                    }
                  }: ''
                },
                title: res.title,
                text: undefined,
                date: res.date,
                isBlur: res.isBlur,
                keywords: res.keywords,
                attachments: (() => {
                  if(res.blocks.length > 0){
                    const list = [];
                    for(let i = 0, arr = res.blocks, arrLen = arr.length - (res.keywords.length > 0 ? 1 : 0), len = (mainCfg.database.adding.feeds.attachments.items.sz >= arrLen ? arrLen : mainCfg.database.adding.feeds.attachments.items.sz); i < len; i++){
                      if(arr[i].type.match(/media|text/)){
                        list.push(this.getAttach(arr[i]));
                      }else continue;
                    }
                    return list;
                  }
                })()
              }
            }

            item.rules[key] ? item.rules[key] = false : item.rules[key] = true;
            result({status:'success', type:'feeds', run:'update', id:id, data:obj});
          });
        }
      });
    }
    getValue(item, type, r, key){
      return [type][item].rules[r][key];
    }
    findOrAdd({id, type, r, key}){
      return new Promise((result, error) => {
        const user = mainCfg['script data'][type].findIndex(e => e.id === id);
        if(user !== -1){
          this.update({item:mainCfg['script data'][type][user], id:id, type:type, r:r, key:key}).then(i => {
            new Odb().supabase({
              run: 'findOrAdd',
              type: i.type,
              target: i.id,
              data: i.data
            }).then(db => {
              console.log('Yo', db);
              if(db.status === 204) console.log(`Success, ${i.type} is added/updated!!!`);
            }).catch(er => {
              console.log('Error at findOrAdd...');
              console.log(er.code, er);
            });
            result('ok');
          });
        }else
          this.add({id:id, type:type, r:r, key:key}).then(i => {
            new Odb().supabase({
              run: 'findOrAdd',
              type: i.type,
              target: i.id,
              data: i.data
            }).then(db => {
              console.log('Yo', db);
              if(db.status === 204) console.log(`Success, ${i.type} is added/updated!!!`);
            }).catch(er => {
              console.log('Error at findOrAdd...');
              console.log(er.code, er);
            });
            result('ok');
          });
      })
    }
    getFeed(id){
      return fetch(`https://api.dtf.ru/v2.31/content?id=${id}`, {
        headers: {
          'accept': 'application/json'
        }
      }).then(r => r.json().then(rr => rr.result));
    }
    getAttach(i){
      // console.log('ATTACHMENT', i);
      const attachment = {
        type: i.type,
        hidden: i.hidden,
        text: i.data.text,
        items: []
      };
      if(i.data.items && i.data.items.length > 0){
        // attachment.data.items = [];
        for(let e = 0, arr = i.data.items, len = (mainCfg.database.adding.feeds.attachments.albums.sz >= arr.length ? arr.length : mainCfg.database.adding.feeds.attachments.albums.sz); e < len; e++){
          if(this.attachItem(arr[e])) attachment.items.push(this.attachItem(arr[e]));
        }
        // i.data.items.forEach((e, i) => {
        //   if(this.attachItem(e)) attachment.items.push(this.attachItem(e));
        // });
      }
      return attachment;
    }
    attachItem(i){
      if(i.image||i.video) return {
        title: i.title,
        type: i.image.type,
        data: {
          'type': i.image.data['type'],
          'uuid': i.image.data['uuid'],
          'external_service': i.image.data['external_service']
        }
      };
    }
    rs(path, text){
      new El().Div({
        path: path,
        cName: 'ras',
        text: text
      });
    }
    build({t, uID, sID, fID, uName, sName, type}){
      if(document.getElementById('dtf-userMenu')) return;
      this.user=mainCfg['script data'].users.find(el => el.id === uID);
      this.subsite=mainCfg['script data'].subsites.find(el => el.id === sID);
      this.feeds=mainCfg['script data'].feeds.find(el => el.id === fID);
      this.main=new El().Div({
        path: document.body,
        cName: `dtf-menu`,
        id: 'dtf-userMenu',
        tab: -1,
        style: `
        top: ${t.getBoundingClientRect().top + (window.scrollY||window.scrollHeight||0) + t.getBoundingClientRect().height}px;
        left: ${t.getBoundingClientRect().left}px`,
        rtn: [],
        onblur: () => {
          setTimeout(() => {
            this.main.remove();
          }, 100);
        }
      });

      this.header=new El().Div({
        path: this.main,
        cName: 'header',
        text: 'Меню управления',
        onclick: () => {
          this.main.remove();
        }
      });

      this.list=new El().Div({
        path: this.main,
        cName: 'list',
        rtn: []
      });

      new El().Button({
        path: this.list,
        cName: 'button',
        text: 'О пользователе',
        onclick: () => {
          this.getUser(uID).then(res => {
            this.main.blur();
            this.userCard(t, res);
            console.log('User profile', res);
          });
        }
      });
      if(type === 'topic') new El().Button({
        path: this.list,
        cName: 'button',
        text: 'О подсайте',
        onclick: () => {
          this.getUser(sID).then(res => {
            this.main.blur();
            this.userCard(t, res);
            console.log('Subsite profile', res);
          });
        }
      });

      this.rs(this.list, 'Пользователь');
      new El().Div({
        path: this.list,
        cName: 'dark',
        text: 'Статьи',
        title: 'Управление статьями',
        func: (path) => {
          new El().Button({
            path: path,
            cName: (this.author && this.author.rules.topics.favorite) ? 'button favorite' : 'button',
            text: '💘',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'favorite'}).then(res => {
                if(res) checkFeeds(false, true);
                console.log('User', mainCfg['script data']);
              });
            }
          });
          new El().Button({
            path: path,
            cName: (this.author && this.author.rules.topics.ignored) ? 'button ignored' : 'button',
            text: '💢',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'ignored'}).then(res => {
                if(res) checkFeeds(false, true);
                console.log('User', mainCfg['script data']);
              });
            }
          });
          new El().Button({
            path: path,
            cName: (this.author && this.author.rules.topics.blocked) ? 'button blocked' : 'button',
            text: '🚫',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'blocked'}).then(res => {
                if(res) checkFeeds(false, true);
                console.log('User', mainCfg['script data']);
              });
            }
          });
        }
      });
      new El().Div({
        path: this.list,
        cName: 'dark',
        text: 'Блоги',
        title: 'Управление блогами',
        func: (path) => {
          new El().Button({
            path: path,
            cName: (this.author && this.author.rules.blogs.favorite) ? 'button favorite' : 'button',
            text: '💘',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'favorite'}).then(res => {
                if(res) checkFeeds(false, true);
                console.log('User', mainCfg['script data']);
              });
            }
          });
          new El().Button({
            path: path,
            cName: (this.author && this.author.rules.blogs.ignored) ? 'button ignored' : 'button',
            text: '💢',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'ignored'}).then(res => {
                if(res) checkFeeds(false, true);
                console.log('User', mainCfg['script data']);
              });
            }
          });
          new El().Button({
            path: path,
            cName: (this.author && this.author.rules.blogs.blocked) ? 'button blocked' : 'button',
            text: '🚫',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'blocked'}).then(res => {
                if(res) checkFeeds(false, true);
                console.log('User', mainCfg['script data']);
              });
            }
          });
        }
      });
      new El().Div({
        path: this.list,
        cName: 'dark',
        text: 'Комментарии',
        title: 'Управление комментариями',
        func: (path) => {
          new El().Button({
            path: path,
            cName: this.user && this.user.rules.comments.favorite ? 'button favorite' : 'button',
            text: '💘',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'comments', key:'favorite'}).then(res => {
                if(res) checkComments();
                console.log('User', mainCfg['script data']);
              });
            }
          });
          new El().Button({
            path: path,
            cName: this.user && this.user.rules.comments.ignored ? 'button ignored' : 'button',
            text: '💢',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'comments', key:'ignored'}).then(res => {
                if(res) checkComments();
                console.log('User', mainCfg['script data']);
              });
            }
          });
          new El().Button({
            path: path,
            cName: this.user && this.user.rules.comments.blocked ? 'button blocked' : 'button',
            text: '🚫',
            onclick: () => {
              this.findOrAdd({id:uID, name:uName, type:'users', r:'comments', key:'blocked'}).then(res => {
                if(res) checkComments();
                console.log('User', mainCfg['script data']);
              });
            }
          });
        }
      });

      if(type === 'topic'){
        this.rs(this.list, 'Подсайт');
        new El().Div({
          path: this.list,
          cName: 'dark',
          text: 'Статьи',
          title: 'Управление статьями',
          func: (path) => {
            new El().Button({
              path: path,
              cName: (this.subsite && this.subsite.rules.topics.favorite) ? 'button favorite' : 'button',
              text: '💘',
              onclick: () => {
                this.findOrAdd({id:sID, name:sName, type:'subsites', r:'topics', key:'favorite'}).then(res => {
                  if(res) checkFeeds(false, true);
                  console.log('Subsite', mainCfg['script data']);
                });
              }
            });
            new El().Button({
              path: path,
              cName: 'button',
              text: '💢',
              onclick: () => {
                this.findOrAdd({id:sID, name:sName, type:'subsites', r:'topics', key:'ignored'}).then(res => {
                  if(res) checkFeeds(false, true);
                  console.log('Subsite', mainCfg['script data']);
                });
              }
            });
            new El().Button({
              path: path,
              cName: 'button',
              text: '🚫',
              onclick: () => {
                this.findOrAdd({id:sID, name:sName, type:'subsites', r:'topics', key:'blocked'}).then(res => {
                  if(res) checkFeeds(false, true);
                  console.log('Subsite', mainCfg['script data']);
                });
              }
            });
          }
        });
        new El().Div({
          path: this.list,
          cName: 'dark',
          text: 'Блоги',
          title: 'Управление блогами',
          func: (path) => {
            new El().Button({
              path: path,
              cName: 'button',
              text: '💘',
              onclick: () => {
                this.findOrAdd({id:uID, name:sName, type:'subsites', r:'topics', key:'favorite'}).then(res => {
                  if(res) checkFeeds(false, true);
                  console.log('Subsite', mainCfg['script data']);
                });
              }
            });
            new El().Button({
              path: path,
              cName: 'button',
              text: '💢',
              onclick: () => {
                this.findOrAdd({id:uID, name:sName, type:'subsites', r:'topics', key:'ignored'}).then(res => {
                  if(res) checkFeeds(false, true);
                  console.log('Subsite', mainCfg['script data']);
                });
              }
            });
            new El().Button({
              path: path,
              cName: 'button',
              text: '🚫',
              onclick: () => {
                this.findOrAdd({id:uID, name:sName, type:'subsites', r:'topics', key:'blocked'}).then(res => {
                  if(res) checkFeeds(false, true);
                  console.log('Subsite', mainCfg['script data']);
                });
              }
            });
          }
        });
        new El().Div({
          path: this.list,
          cName: 'dark',
          text: 'Комментарии',
          title: 'Управление комментариями',
          func: (path) => {
            new El().Button({
              path: path,
              cName: this.subsite && this.subsite.rules.comments.favorite ? 'button favorite' : 'button',
              text: '💘',
              onclick: () => {
                this.findOrAdd({id:uID, name:sName, type:'subsites', r:'comments', key:'favorite'}).then(res => {
                  if(res) checkComments();
                  console.log('Comments', mainCfg['script data']);
                });
              }
            });
            new El().Button({
              path: path,
              cName: 'button',
              text: '💢',
              onclick: () => {
                this.findOrAdd({id:uID, name:sName, type:'subsites', r:'comments', key:'ignored'}).then(res => {
                  if(res) checkComments();
                  console.log('Comments', mainCfg['script data']);
                });
              }
            });
            new El().Button({
              path: path,
              cName: 'button',
              text: '🚫',
              onclick: () => {
                this.findOrAdd({id:uID, name:sName, type:'subsites', r:'comments', key:'blocked'}).then(res => {
                  if(res) checkComments();
                  console.log('Comments', mainCfg['script data']);
                });
              }
            });
          }
        });
        this.rs(this.list, 'Фид');
        new El().Div({
          path: this.list,
          cName: 'dark',
          text: 'Фид',
          title: 'Управление фидом',
          func: (path) => {
            new El().Button({
              path: path,
              cName: (this.author && this.author.rules.watched) ? 'button readed' : 'button',
              text: '✔️',
              onclick: () => {
                this.findOrAdd({id:fID, type:'feeds', key:'readed'}).then(res => {
                  if(res) checkFeeds(false, true);
                  console.log('Feeds', mainCfg['script data'].feeds);
                });
              }
            });
            new El().Button({
              path: path,
              cName: (this.feeds && this.feeds.rules.planToRead) ? 'button planToRead' : 'button',
              text: '📚',
              onclick: () => {
                this.findOrAdd({id:fID, type:'feeds', key:'planToRead'}).then(res => {
                  if(res) checkFeeds(false, true);
                  console.log('Feeds', mainCfg['script data'].feeds);
                });
              }
            });
            new El().Button({
              path: path,
              cName: (this.author && this.author.rules.onHold) ? 'button onHold' : 'button',
              text: '📖',
              onclick: () => {
                this.findOrAdd(fID, false, 'feeds', false, 'onHold').then(res => {
                  if(res) checkFeeds(false, true);
                  console.log('Feeds', mainCfg['script data'].feeds);
                });
              }
            });
            new El().Button({
              path: path,
              cName: (this.author && this.author.rules.watched) ? 'button favorite' : 'button',
              text: '💘',
              onclick: () => {
                this.findOrAdd({id:fID, type:'feeds', key:'favorite'}).then(res => {
                  if(res) checkFeeds(false, true);
                  console.log('Feeds', mainCfg['script data'].feeds);
                });
              }
            });
            new El().Button({
              path: path,
              cName: 'button',
              text: '💢',
              onclick: () => {
                this.findOrAdd(fID, false, 'feeds', 'topics', 'ignored').then(res => {
                  if(res) checkFeeds(false, true);
                  console.log('Feeds', mainCfg['script data'].feeds);
                });
              }
            });
            new El().Button({
              path: path,
              cName: 'button',
              text: '🚫',
              onclick: () => {
                this.findOrAdd(fID, false, 'feeds', 'topics', 'blocked').then(res => {
                  if(res) checkFeeds(false, true);
                  console.log('Feeds', mainCfg['script data'].feeds);
                });
              }
            });
          }
        });
      }
      document.activeElement.blur();
      this.main.focus();
    }
    userMenu({t, offset, uID, sID, fID, uName, sName, type}){
      this.user=mainCfg['script data'].users.find(el => el.id === uID);
      this.subsite=mainCfg['script data'].subsites.find(el => el.id === sID);
      this.feeds=mainCfg['script data'].feeds.find(el => el.id === fID);
      new Menu().build({
        path: document.body,
        title: 'МЕНЮ УПРАВЛЕНИЯ',
        e: t,
        offset: offset,
        focus: true,
        autohide: true,
        items: [
          {
            type: 'separator',
            text: 'Инфо'
          },
          ...type === 'topic' ? [
            {
              type: 'button',
              text: 'О подсайте',
              onclick: () => {
                this.getUser(sID).then(res => this.profileCard({path: document.body, e:t, offset:offset, item:res}));
                // this.avatar({t:t, offset:offset, user:''})
              }
            }
          ] : [],
          {
            type: 'button',
            text: 'О пользователе',
            onclick: () => {
              this.getUser(uID).then(res => this.profileCard({path: document.body, e:t, offset:offset, item:res}));
              // this.avatar({t:t, offset:offset, user:''})
            }
          },
          ...type === 'topic' ? [
            {
              type: 'separator',
              text: 'Фид'
            },
            {
              type: 'sub',
              cName: 'hor',
              text: 'Фиды',
              title: 'Управление фидами',
              items: [
                {
                  type: 'button',
                  title: 'Прочтено',
                  cName: (this.feeds && this.feeds.rules.readed) ? 'button readed' : 'button',
                  text: '✔️',
                  onclick: () => {
                    this.findOrAdd({id:fID, type:'feeds', key:'readed'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('Feeds', mainCfg['script data'].feeds);
                    });
                  }
                },
                {
                  type: 'button',
                  title: 'Прочту',
                  cName: (this.feeds && this.feeds.rules.planToRead) ? 'button planToRead' : 'button',
                  text: '📚',
                  onclick: () => {
                    this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'favorite'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('User', mainCfg['script data']);
                    });
                  }
                },
                {
                  type: 'button',
                  title: 'Читаю',
                  cName: (this.feeds && this.feeds.rules.onHold) ? 'button onHold' : 'button',
                  text: '📖',
                  onclick: () => {
                    this.findOrAdd({id:fID, type:'feeds', key:'onHold'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('Feeds', mainCfg['script data'].feeds);
                    });
                  }
                },
                {
                  type: 'button',
                  title: 'Избранное',
                  cName: (this.feeds && this.feeds.rules.favorite) ? 'button favorite' : 'button',
                  text: '💘',
                  onclick: () => {
                    this.findOrAdd({id:fID, type:'feeds', key:'favorite'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('Feeds', mainCfg['script data'].feeds);
                    });
                  }
                },
                {
                  type: 'button',
                  title: 'Игноровано',
                  cName: (this.feeds && this.feeds.rules.ignored) ? 'button ignored' : 'button',
                  text: '💢',
                  onclick: () => {
                    this.findOrAdd({id:fID, type:'feeds', key:'ignored'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('Feeds', mainCfg['script data'].feeds);
                    });
                  }
                },
                {
                  type: 'button',
                  title: 'Блокировано',
                  cName: (this.feeds && this.feeds.rules.blocked) ? 'button blocked' : 'button',
                  text: '🈲',
                  onclick: () => {
                    this.findOrAdd({id:fID, type:'feeds', key:'blocked'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('Feeds', mainCfg['script data'].feeds);
                    });
                  }
                }
              ],
            }
          ] : [],
          ...type === 'topic' ? [
            {
              type: 'separator',
              text: 'Фиды подсайта'
            },
            {
              type: 'sub',
              cName: 'hor',
              text: 'Статьи',
              title: 'Управление статьями',
              items: [
                {
                  type: 'button',
                  title: 'Избранное',
                  cName: (this.subsite && this.subsite.rules.topics.favorite) ? 'button favorite' : 'button',
                  text: '💘',
                  onclick: () => {
                    this.findOrAdd({id:sID, name:sName, type:'subsites', r:'topics', key:'favorite'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('Subsite', mainCfg['script data'].subsites);
                    });
                  }
                },
                {
                  type: 'button',
                  title: 'Игноровано',
                  cName: (this.subsite && this.subsite.rules.topics.ignored) ? 'button ignored' : 'button',
                  text: '💢',
                  onclick: () => {
                    this.findOrAdd({id:sID, name:sName, type:'subsites', r:'topics', key:'ignored'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('Subsite', mainCfg['script data'].subsites);
                    });
                  }
                },
                {
                  type: 'button',
                  title: 'Блокировано',
                  cName: (this.subsite && this.subsite.rules.topics.blocked) ? 'button blocked' : 'button',
                  text: '🈲',
                  onclick: () => {
                    this.findOrAdd({id:sID, name:sName, type:'subsites', r:'topics', key:'blocked'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('Subsite', mainCfg['script data'].subsites);
                    });
                  }
                }
              ],
            }
          ] : [],
          ...type.match(/topic|comment/) ? [
            {
              type: 'separator',
              text: 'Контент автора'
            },
            {
              type: 'sub',
              cName: 'hor',
              text: 'Статьи',
              title: 'Управление статьями',
              items: [
                {
                  type: 'button',
                  title: 'Избранное',
                  cName: (this.user && this.user.rules.topics.favorite) ? 'button favorite' : 'button',
                  text: '💘',
                  onclick: () => {
                    this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'favorite'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('User', mainCfg['script data'].users);
                    });
                  }
                },
                {
                  type: 'button',
                  title: 'Игноровано',
                  cName: (this.user && this.user.rules.topics.ignored) ? 'button ignored' : 'button',
                  text: '💢',
                  onclick: () => {
                    this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'ignored'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('User', mainCfg['script data'].users);
                    });
                  }
                },
                {
                  type: 'button',
                  title: 'Блокировано',
                  cName: (this.user && this.user.rules.topics.blocked) ? 'button blocked' : 'button',
                  text: '🈲',
                  onclick: () => {
                    this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'blocked'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('User', mainCfg['script data'].users);
                    });
                  }
                }
              ],
            },
            {
              type: 'sub',
              cName: 'hor',
              text: 'Блог',
              title: 'Управление блогом',
              items: [
                {
                  type: 'button',
                  title: 'Избранное',
                  cName: (this.user && this.user.rules.blogs.favorite) ? 'button favorite' : 'button',
                  text: '💘',
                  onclick: () => {
                    this.findOrAdd({id:uID, name:uName, type:'users', r:'blogs', key:'favorite'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('User', mainCfg['script data'].users);
                    });
                  }
                },
                {
                  type: 'button',
                  title: 'Игноровано',
                  cName: (this.user && this.user.rules.blogs.ignored) ? 'button ignored' : 'button',
                  text: '💢',
                  onclick: () => {
                    this.findOrAdd({id:uID, name:uName, type:'users', r:'blogs', key:'ignored'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('User', mainCfg['script data'].users);
                    });
                  }
                },
                {
                  type: 'button',
                  title: 'Блокировано',
                  cName: (this.user && this.user.rules.blogs.blocked) ? 'button blocked' : 'button',
                  text: '🈲',
                  onclick: () => {
                    this.findOrAdd({id:uID, name:uName, type:'users', r:'blogs', key:'blocked'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('User', mainCfg['script data'].users);
                    });
                  }
                }
              ],
            },
            {
              type: 'sub',
              cName: 'hor',
              text: 'Комментарии',
              title: 'Управление комментариями',
              items: [
                {
                  type: 'button',
                  title: 'Избранное',
                  cName: (this.user && this.user.rules.comments.favorite) ? 'button favorite' : 'button',
                  text: '💘',
                  onclick: () => {
                    this.findOrAdd({id:uID, name:uName, type:'users', r:'comments', key:'favorite'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('User', mainCfg['script data'].users);
                    });
                  }
                },
                {
                  type: 'button',
                  title: 'Игноровано',
                  cName: (this.user && this.user.rules.comments.ignored) ? 'button ignored' : 'button',
                  text: '💢',
                  onclick: () => {
                    this.findOrAdd({id:uID, name:uName, type:'users', r:'comments', key:'ignored'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('User', mainCfg['script data'].users);
                    });
                  }
                },
                {
                  type: 'button',
                  title: 'Блокировано',
                  cName: (this.user && this.user.rules.comments.blocked) ? 'button blocked' : 'button',
                  text: '🈲',
                  onclick: () => {
                    this.findOrAdd({id:uID, name:uName, type:'users', r:'comments', key:'blocked'}).then(res => {
                      if(res) checkFeeds(false, true);
                      console.log('User', mainCfg['script data'].users);
                    });
                  }
                }
              ],
            },
          ] : [],
        ]
      })
    }
    profileCard({e, offset, path, item}){
      new El().Div({
        path: path,
        cName: 'profileCard',
        tab: -1,
        focus: true,
        style: `
          top: ${(offset||0 + 10) + e.top + (window.scrollY||window.scrollHeight||0)}px;
          left: ${e.left}px;`
        ,
        onblur: (e) => {
          setTimeout(() => {
            e.target.remove();
          }, 1000);
        },
        func: (m) => {
          attachment({
            path: m,
            type: 'cover',
            i: item.subsite.cover
          });
          new El().Div({
            path: m,
            cName: 'header'
          });
          new El().Div({
            path: m,
            cName: 'list',
            func: (l) => {
              attachment({
                path: l,
                type: 'avatar',
                i: item.subsite.avatar
              });

              new El().List({
                path: l,
                cName: 'itemsList',
                items: [
                  {
                    text: `🏷️ ${item.subsite.name}`,
                    title: 'Имя'
                  },
                  {
                    text: `📅 ${this.getTime(item.subsite.created * 1000)}`,
                    title: 'Создан'
                  },
                  {
                    text: `📊 ${item.subsite.rating}`,
                    title: 'Рейтинг',
                    cName: item.subsite.rating > 0 ? 'positive' : 'negative'
                  },
                  {
                    text: `📔 ${item.subsite.description}`,
                    title: 'Описание',
                    cName: 'texter scrollLite'
                  },
                  {
                    text: '🔗\uFE0E',
                    btn: [
                      {
                        text: 'Профиль',
                        onclick: () => {
                          window.open(item.subsite.url, '_blank');
                        }
                      },
                      ...item.subsite.avatar ? [{
                        text: 'Аватар',
                        onclick: () => {
                          window.open(`https://leonardo.osnova.io/${item.subsite.avatar.data.uuid}`, '_blank');
                        }
                      }] : [],
                      ...item.subsite.cover ? [{
                        text: 'Cover',
                        onclick: () => {
                          window.open(`https://leonardo.osnova.io/${item.subsite.cover.data.uuid}`, '_blank');
                        }
                      }] : []
                    ]
                  }
                ]
              });

              new El().List({
                path: m,
                cName: 'itemsList hor',
                items: [
                  {
                    title: item.subsite.isOnline ? 'Онлайн' : 'Оффлайн',
                    cName: !item.subsite.isOnline && 'off',
                    text: '📶\uFE0E'
                  },
                  {
                    title: item.subsite.isPlus && 'Плюс',
                    cName: !item.subsite.isPlus && 'off',
                    text: '➕\uFE0E'
                  },
                  {
                    title: item.subsite.isPro && 'Про',
                    cName: !item.subsite.isPro && 'off',
                    text: '💼\uFE0E'
                  },
                  {
                    title: item.subsite.isVerified && 'Подтверждён',
                    cName: !item.subsite.isVerified && 'off',
                    text: '✔️\uFE0E'
                  }
                ]
              });

              new El().List({
                path: m,
                cName: 'itemsList',
                items: [
                  {
                    title: 'Комментариев',
                    text: `📜\uFE0E ${item.subsite.counters.comments}`
                  },
                  {
                    title: 'Статей',
                    text: `📰\uFE0E ${item.subsite.counters.entries}`
                  },
                  {
                    title: 'Подписчиков',
                    text: `🔭\uFE0E ${item.subsite.counters.subscribers}`
                  },
                  {
                    title: 'Подписок',
                    text: `📬\uFE0E ${item.subsite.counters.subscriptions}`
                  }
                ]
              })
            }
          });
        }
      });
    }
    avatar({t, offset, user}){
      new Menu().build({
        path: document.body,
        title: 'МЕНЮ АВАТАРА',
        e: t,
        offset: offset,
        focus: true,
        autohide: true,
        items: [
          {
            type: 'separator',
            text: 'Ссылки'
          },
          ...user.subsite.avatar ? [
            {
              type: 'button',
              text: 'Аватарка',
              onclick: () => {
                window.open(`https://leonardo.osnova.io/${user.subsite.avatar.data.uuid}`, '_blank');
              }
            }
          ] : [],
          ...user.subsite.cover ? [
            {
              type: 'button',
              text: 'Обложка',
              onclick: () => {
                window.open(`https://leonardo.osnova.io/${user.subsite.cover.data.uuid}`, '_blank');
              }
            }
          ] : [],
          ...user.subsite.avatar||user.subsite.cover ? [
            {
              type: 'separator',
              text: 'Поиск сурсов'
            },
            ...user.subsite.avatar ? [{
              type: 'sub',
              text: 'Аватарка',
              title: 'Поиски аватарки',
              items: (() => {
                const arr = [];
                mainCfg.usercard.avatar.search.list.forEach(e => {
                  arr.push({
                    type: 'button',
                    text: e.name,
                    onclick: () => {
                      window.open(`${e.url}https://leonardo.osnova.io/${user.subsite.avatar.data.uuid}`, '_blank');
                      // document.activeElement.blur();
                    }
                  })
                })
                return arr;
              })()
            }] : [],
            ...user.subsite.cover ? [{
              type: 'sub',
              text: 'Обложка',
              title: 'Поиски обложки',
              items: (() => {
                const arr = [];
                mainCfg.usercard.avatar.search.list.forEach(e => {
                  arr.push({
                    type: 'button',
                    text: e.name,
                    onclick: () => {
                      window.open(`${e.url}https://leonardo.osnova.io/${user.subsite.cover.data.uuid}`, '_blank');
                      // document.activeElement.blur();
                    }
                  })
                })
                return arr;
              })()
            }] : [],
          ] : [],
          {
            type: 'separator',
            text: 'Автор'
          }
        ]
      })
    }
  }

  new El().Css('DTF-User Block', css(mainCfg));
  new El().Css('DTF-core', dtfCoreCSS, true);
  new El().Css('DTF-widgets', widgetCss(), true);
  new El().Css('DTF-ctxMenu', ctxMenuCss());
  new El().Css('DTF-profileCard', profilecardCss());

  document.body.oncontextmenu = (e) => {
    if(!e.target.className) return;
    if(!e.button === 2) return;
    if(e.target.className === 'comment__author'){
      e.preventDefault();
      e.stopImmediatePropagation();
      new UserMenu().userMenu({
        t: e.target.getBoundingClientRect(),
        offset: e.target.offsetHeight,
        uID: e.target.closest('.comment').getAttribute('data-user_id'),
        uName: e.target.textContent.trim(),
        type: 'comment'});
    }else
    if(e.target.className === 'content-header-author__name'){
      e.preventDefault();
      e.stopImmediatePropagation();
      const control = e.target.closest('.content-header').querySelector(`.content-header__item--controls`).children[0];
      new UserMenu().userMenu({
        t: e.target.getBoundingClientRect(),
        offset: e.target.offsetHeight,
        uID: control.getAttribute('data-user-id'),
        sID: control.getAttribute('data-subsite-id'),
        fID: control.getAttribute('data-content-id'),
        uName: e.target.textContent.trim(),
        sName: control.getAttribute('data-subsite-name'),
        type: 'topic'
      });
    }
  }

  new WidgetPanel({
      bText: '🏷️',
      hText: 'Лист тегов',
      cName: 'tagList',
      id: 'tagList',
      items: (w) => {
        new El().Div({
          path: w,
          cName: 'types',
          func: (t) => {
            new El().Div({
              path: t,
              cName: 'header',
              text: 'Типы'
            });
            new El().Div({
              path: t,
              cName: 'list scrollLite'
            });
          }
        });

        new El().Div({
          path: w,
          cName: 'subsites',
          func: (s) => {
            new El().Div({
              path: s,
              cName: 'header',
              text: 'Подсайты'
            });
            new El().Div({
              path: s,
              cName: 'list scrollLite'
            });
          }
        });

        new El().Div({
          path: w,
          cName: 'authors',
          func: (a) => {
            new El().Div({
              path: a,
              cName: 'header',
              text: 'Авторы'
            });
            new El().Div({
              path: a,
              cName: 'authorTypes',
              text: 'Статьи',
              func: (at) => {
                new El().Div({
                  path: at,
                  cName: 'list scrollLite'
                });
              }
            });
            new El().Div({
              path: a,
              cName: 'authorTypes',
              text: 'Блоги',
              func: (at) => {
                new El().Div({
                  path: at,
                  cName: 'list scrollLite'
                });
              }
            });
          }
        });
      }
    });

  function run(){
    const widget = document.getElementById('widgetPanel').children[1].querySelector(`.wl-item.tagList`);
    const tabs = {
      types: widget.children[1].children[0].children[1],
      subsites: widget.children[1].children[1].children[1],
      topics: widget.children[1].children[2].children[1].children[0],
      blogs: widget.children[1].children[2].children[2].children[0]
    }
    tabs.types.replaceChildren();
    tabs.subsites.replaceChildren();
    tabs.topics.replaceChildren();
    tabs.blogs.replaceChildren();
    // new Feeds().widgetItem(widget);
    if(getPageType(document.location.href).type && getPageType(document.location.href).type.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
      checkFeeds();
      !obs.feeds ? obsFeeds('start') : obsFeeds('restart');
    }
  }

  new El().onPageLoad(() => {
    run();
  });


})();
