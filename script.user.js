// ==UserScript==
// @name        DTF-Superfeeds
// @namespace   https://github.com/TentacleTenticals/
// @match       https://*dtf.ru/*
// @grant       none
// @version     1.0.7
// @author      Tentacle Tenticals
// @description Скрипт для изменения системы фидов
// @homepage    https://github.com/TentacleTenticals/DTF-Superfeeds
// @updateURL   https://github.com/TentacleTenticals/DTF-Superfeeds/raw/master/main.user.js
// @downloadURL https://github.com/TentacleTenticals/DTF-Superfeeds/raw/master/main.user.js
//
// Ini
// @require     https://github.com/TentacleTenticals/DTF-Superfeeds/raw/main/src/settings/menu/cfg/js/ini.js
//
// Base
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/classes/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/func/checkPageType.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/css/main.js
//
// Widget
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/interface/widget/js/wItem.js
//
// Tabber
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/tabber/js/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/tabber/css/main.js
//
// BookMenu
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/bookMenu/js/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/bookMenu/css/main.js
// @require     https://github.com/TentacleTenticals/DTF-Superfeeds/raw/main/src/bookMenu/js/item.js
// @require     https://github.com/TentacleTenticals/DTF-Superfeeds/raw/main/src/bookMenu/css/feeds.js
// @require     https://github.com/TentacleTenticals/DTF-Superfeeds/raw/main/src/bookMenu/css/users.js
// Attachments
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/func/dtfAttachments.js
//
// @require     https://github.com/TentacleTenticals/DTF-Superfeeds/raw/main/src/interface/headerMenu/css/profilecard.js
//
// DB
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/db/online/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/db/func/main.js
//
// Settings
// Main
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/settings/opener/js/item.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/settings/opener/menu/data/js/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/settings/opener/menu/cfg/js/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/settings/opener/menu/info/js/main.js
//
// Init
// @require     https://github.com/TentacleTenticals/DTF-Superfeeds/raw/main/src/settings/menu/cfg/js/main.js
// @require     https://github.com/TentacleTenticals/DTF-Superfeeds/raw/main/src/settings/menu/data/js/main.js
// @require     https://github.com/TentacleTenticals/DTF-Superfeeds/raw/main/src/settings/menu/info/js/main.js
//
// CtxMenu
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/interface/ctxMenu/js/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/interface/ctxMenu/css/main.js
//
// Modal
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/interface/modal/js/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/interface/modal/css/main.js
// Dialog
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/interface/dialog/css/main.js
//
//
// Func
// @require     https://github.com/TentacleTenticals/DTF-Superfeeds/raw/main/src/func/videoReplace.js
//
// Classes
// @require     https://github.com/TentacleTenticals/DTF-Superfeeds/raw/main/src/classes/feeds.js
//
// Feeds check
// @require     https://github.com/TentacleTenticals/DTF-Superfeeds/raw/main/src/func/feedsCheck.js
//
// HeaderMenu
// @require     https://github.com/TentacleTenticals/DTF-Superfeeds/raw/main/src/interface/headerMenu/js/main.js
//
// AddingToDB
// @require     https://github.com/TentacleTenticals/DTF-Superfeeds/raw/main/src/addingToDB/main.js
//
// Alerter
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/interface/alerter/js/main.js?
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/interface/alerter/css/main.js?
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

  .dtf-attach.iframe.yt.video {
    display: flex;
    position: relative;
    width: ${cfg.main.feeds.check.attachments.embeds.youtube.size.width}px;
    height: max-content;
    max-height: 300px;
    aspect-ratio: 1/0.5;
    margin: auto;
    background-color: rgb(0,0,0);
    background-size: auto;
    background-repeat: no-repeat;
    background-position: center;
  }

  .dtf-attach.embed {
    display: inline-flex;
    position: relative;
    background-position: center !important;
    background-size: cover;
    background-repeat: no-repeat !important;
    aspect-ratio: 1/0.5;
    overflow: hidden;
    box-shadow: 0 0 3px 1px rgb(0 0 0);
    z-index: 0;
  }
  .dtf-attach.embed.yt {
    background-color: rgb(0 0 0);
    background-image: url(https://i.imgur.com/m8F3Dgo.png);
    background-size: 97%;
    width: 400px;
  }
  .dtf-attach.embed iframe {
    max-width: inherit;
    max-height: inherit;
    margin: auto;
    border: unset;
    border-radius: 1px;
    box-shadow: 0 0 3px 1px rgb(255 255 255);
  }

  .comment .comment__detail {
    display: flex;
    gap: 0 5px;
  }
  .comment .mySubName {
    padding: 0 4px 0 4px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.2px;
    color: #ffffff;
    background-color: black;
    border-radius: 8px;
  }

  .feed__item.l-island-round .content-link {
    ${mainCfg.main.feeds.check.interface.feedButtons['block link'] ?
      `width: 0;
      height: 0;`:''}
  }
  .feed__item.l-island-round .content-header {
  }

  .feed__item.l-island-round.collapse {
    max-height: 50px;
    overflow: hidden;
  }
  .feed__item.l-island-round.hide {
    display: none;
  }
  .feed__item.l-island-round.collapse .feedButtons .btn.collapse {
    filter: sepia(1);
  }

  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).inBase .content-feed>.content-header {
    background-image: repeating-linear-gradient(135deg, transparent 40%, rgb(255 255 255 / 60%));
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).inBase .content-feed>.content-header {
    background-color: rgb(200 213 207);
  }

  .l-entry__header.l-island-a {
    position: relative;
  }

  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).inBase>:nth-child(1)::after {
    display: flex;
    position: absolute;
    top: 4px;
    right: 0px;
    font-size: 15px;
    z-index: 10;
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).inBase>:nth-child(1)::after {
    content: '🔖';
  }

  .feed__item.l-island-round:is(.favoriteTopicsAuthor, .favoriteBlogsAuthor) .content-feed .content-header-author__avatar::after {
    display: none;
    top: -10%;
    left: 55%;
    width: unset;
    height: unset;
    font-size: 11px;
    line-height: 11px;
    z-index: 10;
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).favoriteTopicsAuthor .content-feed .content-header-author__avatar::after {
    content: '💘';
  }

  .content-header__item--controls {
    display: flex;
    align-items: center;
    gap: 0 5px;
    z-index: 11;
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
    align-items: center;
    gap: 0 5px;
    margin: 0 6px 0 0;
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

  .feedButtons .goTo {
    width: 40px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: rgb(182 239 215);
    box-shadow: 0 0 3px 0px rgb(0,0,0);
    cursor: pointer;
  }

  .feedButtons .btn:not(.goTo) {
    aspect-ratio: 1/1;
    border-radius: 2px;
    font-size: 14px;
    line-height: 0;
    padding: 1px;
    text-align: center;
    margin: auto;
    background-image: linear-gradient(315deg, rgb(187 187 187), transparent);
    box-shadow: 0 0 3px 0px rgb(0,0,0);
    cursor: pointer;
  }
  .feedButtons .btn:hover {
    background-image: linear-gradient(135deg, rgb(187 187 187), transparent);
  }

  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).topic.readed .feedButtons .readed {
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

  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg) .content-header {
    position: relative;
    background-image: repeating-linear-gradient(135deg, transparent 40%, rgb(255 255 255 / 60%));
    padding: 20px 4px 0 4px;
    margin: unset !important;
    height: 50px;
  }

  .cont {
    display: flex;
    margin: 20px 0 0 0;
  }
  .video-cont {
    display: inline-flex;
    position: relative;
    margin: auto;
    max-width: ${cfg.main.feeds.check.attachments.video.size.width}px;
    max-height: ${cfg.main.feeds.check.attachments.video.size.height}px;
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
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 4px 0px rgb(0 0 0);
    z-index: 1;
    background-image: url(https://github.com/TentacleTenticals/dtf-markdown/raw/main/libs/Play.svg);
    background-size: 35%;
    background-repeat: no-repeat;
    background-position: 60% 50%;
  }
  .mediaStarter .btn img {
    width: 35%;
    margin: 0px 0px 0px 10%;
  }
  :is(.dtf-attach, .video-cont):hover .mediaStarter .btn {
    opacity: 0.6;
  }

  .dtf-attach.iframe.yt.video .mediaStarter .btn {
    background-color: rgb(255, 0, 0);
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
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg) .content-feed .content-header-author__avatar {
    border-radius: 50%;
    overflow: visible;
    box-shadow: 0 0 2px 0px rgb(0,0,0);
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg) .content-feed .content-header-author__avatar img {
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

  .feed__item.l-island-round.collapse .content-container {
    height: 50px;
    overflow: hidden;
    box-shadow: inset 0 -10px 8px 0px rgb(195 191 191);
  }

  .feed__item.l-island-round.topic.disabled.noTitle.blur .content {
    filter: blur(8px);
  }
  .feed__item.l-island-round.topic.disabled.noTitle.blur .content:hover {
    filter: none;
  }

  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg):is(.favoriteTopicsSubsite, .favoriteTopicsAuthor, .favoriteBlogsAuthor,
  .ignoredTopicsSubsite, .ignoredTopicsAuthor, .ignoredBlogsAuthor,
  .blockedSubsite, .blockedTopicsAuthor, .blockedBlogsAuthor) .content-feed>.content-header::after {
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
    z-index: 10;
  }

  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg):is(.readed, .planToRead, .onHold, .dropped, .favorite, .ignored)::before {
    display: flex;
    position: absolute;
    width: 100%;
    margin-top: 4px;
    font-size: 11px;
    font-weight: 600;
    color: rgb(0 0 0);
    justify-content: center;
    z-index: 10;
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg):is(.noTitle, .noText)::after {
    display: flex;
    position: absolute;
    width: 100%;
    top: 11px;
    margin-top: 4px;
    font-size: 11px;
    font-weight: 600;
    color: rgb(0 0 0);
    justify-content: center;
    z-index: 10;
  }

  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).readed .content-feed>.content-header {
    background-color: rgb(98 247 177);
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).planToRead .content-feed>.content-header {
    background-color: rgb(247 98 168);
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).onHold .content-feed>.content-header {
    background-color: rgb(138 217 245);
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).dropped .content-feed>.content-header {
    background-color: rgb(98 247 177);
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).favorite .content-feed>.content-header {
    background-color: rgb(229 189 142);
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).ignored .content-feed>.content-header {
    background-color: rgb(149 147 148);
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).blocked .content-feed>.content-header {
    background-color: rgb(166 171 170);
  }

  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).favoriteTopicsAuthor .content-feed>.content-header::after {
    content: '💘 Автор статей';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).favoriteBlogsAuthor .content-feed>.content-header::after {
    content: '💘 Автор блогов';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).favoriteTopicsSubsite .content-feed>.content-header::after {
    content: '💘 Подсайт';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).favoriteTopicsSubsite.favoriteTopicsAuthor .content-feed>.content-header::after {
    content: '💘 Подсайт и автор статей';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).favoriteTopicsSubsite.favoriteBlogsAuthor .content-feed>.content-header::after {
    content: '💘 Подсайт и автор блогов';
  }

  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).ignoredTopicsAuthor .content-feed>.content-header::after {
    content: '💢 Автор статей';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).ignoredBlogsAuthor .content-feed>.content-header::after {
    content: '💢 Автор блогов';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).ignoredTopicsSubsite .content-feed>.content-header::after {
    content: '💢 Подсайт';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).ignoredTopicsSubsite.ignoredTopicsAuthor .content-feed>.content-header::after {
    content: '💢 Подсайт и автор статей';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).ignoredTopicsSubsite.ignoredBlogsAuthor .content-feed>.content-header::after {
    content: '💢 Подсайт и автор блогов';
  }

  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).blockedTopicsAuthor .content-feed>.content-header::after {
    content: '🈲 Автор статей';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).blockedBlogsAuthor .content-feed>.content-header::after {
    content: '🈲 Автор блогов';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).blockedSubsite .content-feed>.content-header::after {
    content: '🈲 Подсайт';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).blockedSubsite.blockedTopicsAuthor .content-feed>.content-header::after {
    content: '🈲 Подсайт и автор статей';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).blockedSubsite.blockedBlogsAuthor .content-feed>.content-header::after {
    content: '🈲 Подсайт и автор блогов';
  }

  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).ignoredTopicsSubsite.favoriteTopicsAuthor .content-feed>.content-header::after {
    content: '💢 Подсайт, 💘 автор статей';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).ignoredTopicsSubsite.favoriteBlogsAuthor .content-feed>.content-header::after {
    content: '💢 Подсайт, 💘 автор блогов';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).blockedSubsite.favoriteTopicsAuthor .content-feed>.content-header::after {
    content: '🈲 Подсайт, 💘 автор статей';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).blockedSubsite.favoriteBlogsAuthor .content-feed>.content-header::after {
    content: '🈲 Подсайт, 💘 автор блогов';
  }

  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).favoriteTopicsSubsite.ignoredTopicsAuthor .content-feed>.content-header::after {
    content: '💘 Подсайт, 💢 автор статей';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).favoriteTopicsSubsite.ignoredBlogsAuthor .content-feed>.content-header::after {
    content: '💘 Подсайт, 💢 автор блогов';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).blockedSubsite.ignoredTopicsAuthor .content-feed>.content-header::after {
    content: '🈲 Подсайт, 💢 автор статей';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).blockedSubsite.ignoredBlogsAuthor .content-feed>.content-header::after {
    content: '🈲 Подсайт, 💢 автор блогов';
  }

  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).favoriteTopicsSubsite.blockedTopicsAuthor .content-feed>.content-header::after {
    content: '💘 Подсайт, 🈲 автор статей';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).favoriteTopicsSubsite.blockedBlogsAuthor .content-feed>.content-header::after {
    content: '💘 Подсайт, 🈲 автор блогов';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).blockedSubsite.blockedTopicsAuthor .content-feed>.content-header::after {
    content: '🈲 Подсайт, 🈲 автор статей';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).blockedSubsite.blockedBlogsAuthor .content-feed>.content-header::after {
    content: '🈲 Подсайт, 🈲 автор блогов';
  }

  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).readed:not(.favorite, .ignored)::before {
    content: '✔️ ПРОСМОТРЕНО';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).planToRead:not(.favorite, .ignored)::before {
    content: '📚 ПРОЧТУ ПОЗЖЕ';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).onHold:not(.favorite, .ignored)::before {
    content: '📖 ЧИТАЮ';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).dropped::before {
    content: '❌ БРОШЕНО';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).favorite::before {
    content: '💘 ИЗБРАННОЕ';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).ignored::before {
    content: '💢 ИГНОРИРОВАНО';
  }

  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).readed.favorite::before {
    content: '✔️ ПРОСМОТРЕНО, 💘 ИЗБРАННОЕ';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).readed.ignored::before {
    content: '✔️ ПРОСМОТРЕНО, 💢 ИГНОРИРОВАНО';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).readed.blocked::before {
    content: '✔️ ПРОСМОТРЕНО, 🈲 БЛОКИРОВАНО';
  }

  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).planToRead.favorite::before {
    content: '📚 ПРОЧТУ ПОЗЖЕ, 💘 ИЗБРАННОЕ';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).planToRead.ignored::before {
    content: '📚 ПРОЧТУ ПОЗЖЕ, 💢 ИГНОРИРОВАНО';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).planToRead.blocked::before {
    content: '📚 ПРОЧТУ ПОЗЖЕ, 🈲 БЛОКИРОВАНО';
  }

  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).onHold.favorite::before {
    content: '📖 ЧИТАЮ, 💘 ИЗБРАННОЕ';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).onHold.ignored::before {
    content: '📖 ЧИТАЮ, 💢 ИГНОРИРОВАНО';
  }
  :is(.dtf-feedsContainer .feed__item.l-island-round, .l-entry.l-island-bg).onHold.blocked::before {
    content: '📖 ЧИТАЮ, 🈲 БЛОКИРОВАНО';
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
  .comment:is(.favorite, .ignored, .blocked) .comment__avatar::before {
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
  .comment.ignored .comment__avatar::before {
    content: '💢';
  }
  .comment.blocked .comment__avatar {
    box-shadow: 0 0 0px 3px rgb(99 78 15), 0 0 4px 2px rgb(0,0,0);
  }
  .comment.blocked .comment__avatar::before {
    content: '🈲';
  }
  .comment.favorite .comment__avatar {
    box-shadow: 0 0 0px 3px rgb(213 132 183), 0 0 4px 2px rgb(0,0,0);
  }
  .comment.favorite .comment__avatar::before {
    content: '💘';
  }

  .comment.ignored:is(.blur, .blurText) .comment__text {
    filter: blur(8px);
  }
  .comment.ignored:is(.blur, .blurAtt) .comment__attaches {
    filter: blur(8px);
  }
  .comment.ignored :is(.comment__text, .comment__attaches):hover {
    filter: none;
    opacity: 1;
  }

  .comment:is(.blocked, .blockedText):is(.sp, .spText) .comment__text {
    position: relative;
    border-radius: 2px;
    font-size: 0;
    background-color: rgb(217 217 217);
    color: transparent;
    box-shadow: 0 0 2px 1px rgb(117 117 117);
  }
  .comment.blocked:is(.sp, .spText) .comment__text::before {
    display: block;
    position: absolute;
    content: 'Автор игнорируется';
    width: 100%;
    color: rgb(0 0 0);
    font-size: 12px;
    text-align: center;
    z-index: 1;
  }
  .comment:is(.blocked, .blockedText):is(.sp, .spText):hover .comment__text::before {
    display: none;
  }

  .comment:is(.blocked, .blockedText):is(.sp, .spText):hover :is(.comment__text, .comment__attaches) {
    background-color: unset;
    color: unset;
    font-size: unset;
    box-shadow: unset;
  }

  .comment.blockedText:is(.sp, .spText) .comment__text::before {
    display: block;
    position: absolute;
    content: 'Текст заблокирован';
    width: 100%;
    color: rgb(0 0 0);
    font-size: 12px;
    text-align: center;
    z-index: 1;
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

  db = {
  online: '', /* Напишите имя базы данных для использования */
    supabase: { /* Данные базы данных для логина */
      name: 'supabase',
      dbID: '',
      get url(){
        return new Odb().getUrl(this.name, this.dbID);
      },
      apiKey: '',
      token: ''
    }
  };

  let obs = {},
    widget;

  function checkComments(target){
    const filter = {
    };
    if(mainCfg.filters.comments.text['words active']){
      if(mainCfg.filters.comments.text.words.length > 0){
        try{
          const arr = mainCfg.filters.comments.text.words.filter(e => e).join('|');
          if(arr) filter.text = new RegExp(arr, 'mi');
        }catch (err){
          new Alerter({
            alert: true,
            title: 'RegExp',
            text: 'Ошибка создания comments text RegExp фильтра. Вы выбрали неверные слова/фразы.',
            timer: 10000
          })
        }
      }
    }
    function checkStatus(u, t, action){
      function chk(mode, flag){
        mainCfg.filters.comments.author[flag] !== 'none' ? t.classList[mode](flag, mainCfg.filters.comments.author[flag]) : t.classList[mode](flag);
      }
      u.favorite ? t.classList.add('favorite') : t.classList.remove('favorite');
      u.ignored ? chk('add', 'ignored') : chk('remove', 'ignored');
      u.blocked ? chk('add', 'blocked') : chk('remove', 'blocked');
    }
    function checkText(u, t, action){
      function chk(mode, flag){
        mainCfg.filters.comments.text.some !== 'none' && t.classList[mode]('blockedText', mainCfg.filters.comments.text.some);
      }
      if(u){
        !u.favorite && chk('add');
      }else
      chk('add');
    }
    function check(target, item){
      if(!target) for(let i = 0, arr = document.querySelectorAll('.comment'), length = arr.length; i < length; i++){
        const media = arr[i].children[1].querySelector(`.comment__attaches`);
        const text = arr[i].children[1].querySelector(`.comment__text`);
        if(media && media.children[0] && media.children[0].className && media.children[0].className.match(/andropov_video/)) videoReplace(media, media.children[0], true);
        const t = item.find(el => +el.id === +arr[i].getAttribute('data-user_id'));
        if(filter.text){
          if(text && text.textContent.match(filter.text)) checkText(t?.flags?.comments, arr[i]);
        }
        if(!t) continue;
        // console.log('FOUNDED!!!!', t);
        checkStatus(t.flags.comments, arr[i]);
        if(t.info.mySubName) new El().Div({
          path: arr[i].querySelector('.comment__detail'),
          cName: 'mySubName',
          text: t.info.mySubName
        });
      }else{
        const media = target.children[1].querySelector(`.comment__attaches`);
        const text = target.children[1].querySelector(`.comment__text`);
        if(media && media.children[0] && media.children[0].className && media.children[0].className.match(/andropov_video/)) videoReplace(media, media.children[0], true);
        const t = item.find(el => +el.id === +target.getAttribute('data-user_id'));
        if(filter.text){
          if(mainCfg.filters.comments.text['words active'] && text && text.textContent.match(filter.text)) target.classList.add('blockedText');
        }
        if(!t) return;
        // console.log('FOUNDED!!!!', t);
        checkStatus(t.flags.comments, target);
        if(t.info.mySubName) new El().Div({
          path: target.querySelector('.comment__detail'),
          cName: 'mySubName',
          text: t.info.mySubName
        });
      }
    }

    console.log('Comments check...', filter);
    if(mainCfg.database.data.online && mainCfg.database.data.db !== 'none'){
      if(!mainCfg['database']['keepVars']['users']){
        new Odb()[mainCfg.database.data.db]({
          run: target ? 'get all':'find',
          type: 'users',
          target: target && target.getAttribute('data-user_id')
        }).then(res => {
          check(target, res);
        }).catch(err => console.log(err));
      }else{
        check(target, sData.users);
      }
    };
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
          // console.log('OBS', item.className);
          checkFeeds({target:item});
        }
      }
    });
  }
  function obsComments(mode){
    new El().Obs({
      obs: obs,
      target: document.querySelector(`.comments__content`),
      check: true,
      search: /comments__content/,
      name: 'comments',
      mode: mode,
      cfg: {attributes: false, childList: true, subtree: false, characterData: false},
      func: (item) => {
        // console.log('OBS ', item);
        if(!item.className) return;
        if(item.className.match(/comment/)){
          // console.log('COMMENT', item.className);
          checkComments(item);
        }
      }
    });
  }


  // new El().Css('DTF-User Block', css(mainCfg));
  new El().Css('DTF-alerter', alerterCss(), true);
  new El().Css('DTF-core', mainCSS(), true);
  // new El().Css('DTF-widgets', widgetCss(), true);
  new El().Css('DTF-ctxMenu', ctxMenuCss());
  new El().Css('DTF-profileCard', profilecardCss());

  new El().Css('tabber', tabberCss());
  new El().Css('bookMenu', bookMenuCss());
  // new El().Css('bookMenu', feedsCss());

  new El().Div({
    path: document.body,
    cName: 'dtf-alerterField',
    id: 'dtf-alerterField'
  });

  document.body.oncontextmenu = (e) => {
    if(!e.target.className) return;
    if(e.button !== 2) return;
    if(e.target.className === 'comment__author'){
      e.preventDefault();
      e.stopImmediatePropagation();
      const control = e.target.closest('.comment').querySelector(`.comment__action[air-module='module.etc_controls']`);
      new HeaderMenu().build({
        rect: e.target.getBoundingClientRect(),
        offset: e.target.offsetHeight,
        uID: control.getAttribute('data-user_id')||control.getAttribute('data-user-id'),
        cID: control.getAttribute('data-comment-id'),
        uName: e.target.textContent.trim(),
        type: 'user'});
    }else
    if(e.target.className === 'content-header-author__name'){
      e.preventDefault();
      e.stopImmediatePropagation();
      const control = e.target.closest('.content-header').querySelector(`.content-header__item--controls`).children[0];
      new HeaderMenu().build({
        rect: e.target.getBoundingClientRect(),
        offset: e.target.offsetHeight,
        uID: control.getAttribute('data-user-id'),
        sID: control.getAttribute('data-subsite-id'),
        fID: control.getAttribute('data-content-id'),
        uName: e.target.textContent.trim(),
        sName: control.getAttribute('data-subsite-name'),
        type: 'feed'
      });
    }
  }

  function run(){
    const pageType = getPageType(document.location.href);
    if(!pageType.type) return;

    if(mainCfg.main.feeds['working mode'] === 'tags'){
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
    }

    if(mainCfg.feeds['where to react'][pageType.type]){
      pageType.type.match(/topic/) ? checkFeeds({isFeed:true}) : checkFeeds({});
      if(mainCfg.main.feeds['working mode'].match(/obs|tags/)) !obs.feeds ? obsFeeds('start') : obsFeeds('restart');
      if(mainCfg.main.comments['working mode'].match(/obs/)) !obs.comments ? obsComments('start') : obsComments('restart');
      // if(mainCfg.main.comments['working mode'].match(/obs|tags/)) !obs.feeds ? obsFeeds('start') : obsFeeds('restart');
    }
    if(pageType.type.match(/topic/)){
      checkComments();
      // !obs.feeds ? obsFeeds('start') : obsFeeds('restart');
    }
  }

  function runner(s){
    if(s.page !== 'def' && s.status !== 'ready') return;
    // if(s.page !== 'def' && s.status !== 'ready') return;
    if(!db.init){
      console.log(`[Runner] Запуск...`);
      new Promise((res, err) => {
        new Db().run({mode:'start', res:res, err:err});
      }).then(async res => {
        console.log(res);
        if(!res){
          console.log('Err');
        }else{
          db.init = true;
          // mainCfg = structuredClone(res.data);

          console.log(`[Runner] Скрипт успешно запущен!`, res);
          // console.log('MAIN', mainCfg);

          new Alerter({
            title: '[Runner]',
            text: `Скрипт успешно запущен!`,
            timer: 5000
          });

          new El().Css('DTF-User Block', css(mainCfg));
          new El().Css('feeds', feedsCss(mainCfg));
          new El().Css('users', usersCss(mainCfg));
          new El().Css('dialog', dialogCss());
          new El().Css('modal', modalCss());

          if(mainCfg.main.feeds['working mode'] === 'tags') new wItem({
              bText: '🏷️',
              hText: 'Лист тегов',
              cName: 'tagList',
              id: 'tagList',
              items: (i) => {
                new El().Div({
                  path: i,
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
                  path: i,
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
                  path: i,
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


          if(mainCfg.database.data.online && mainCfg.database.data.db !== 'none') try{
            if(mainCfg['database']['keepVars']['feeds']) sData.feeds = await new Odb()[mainCfg.database.data.db]({
              run: 'get all',
              type: 'feeds'
            })||[];
            if(mainCfg['database']['keepVars']['users']) sData.users = await new Odb()[mainCfg.database.data.db]({
              run: 'get all',
              type: 'users'
            })||[];
            // console.log('USERS', sData.users)
            if(mainCfg['database']['keepVars']['subsites']) sData.subsites = await new Odb()[mainCfg.database.data.db]({
              run: 'get all',
              type: 'subsites'
            })||[];
          }catch(err){
            console.log('ERR', err);
          }

          run();
        }
      });
    }
    else{
      console.log(`[Run] Restarting...`);
      run();
    }
}

  new El().onPageLoad(runner);


})();
