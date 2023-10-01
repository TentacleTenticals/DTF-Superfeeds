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
// Ini
// @require     https://github.com/TentacleTenticals/DTF-Feeds-4.0/raw/main/src/settings/menu/cfg/js/ini.js
//
// Base
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/classes/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/func/checkPageType.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/css/main.js
//
// Widget
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/widget/panel.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/libs/widget/css/panel.js
//
// Tabber
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/tabber/js/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/tabber/css/main.js
//
// BookMenu
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/bookMenu/js/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/bookMenu/css/main.js
// @require     https://github.com/TentacleTenticals/DTF-Feeds-4.0/raw/main/src/bookMenu/js/item.js
// @require     https://github.com/TentacleTenticals/DTF-Feeds-4.0/raw/main/src/bookMenu/css/feeds.js
// Attachments
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/func/dtfAttachments.js
//
// @require     https://github.com/TentacleTenticals/DTF-Libs1/raw/main/classes/profilecard/css/main.js
//
// DB
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/db/online/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/db/func/main.js
//
// Settings
// Main
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/settings/opener/js/item.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/settings/opener/menu/data/css/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/settings/opener/menu/data/js/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/settings/opener/menu/cfg/js/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/settings/opener/menu/cfg/css/main.js
//
// Init
// @require     https://github.com/TentacleTenticals/DTF-Feeds-4.0/raw/main/src/settings/menu/cfg/js/main.js
// @require     https://github.com/TentacleTenticals/DTF-Feeds-4.0/raw/main/src/settings/menu/data/js/main.js
//
// CtxMenu
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/interface/ctxMenu/js/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/interface/ctxMenu/css/main.js
//
// Dialog
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/interface/dialog/js/main.js
// @require     https://github.com/TentacleTenticals/dtf-libs-2.0/raw/main/interface/dialog/css/main.js
//
// UserMenu
// require     https://github.com/TentacleTenticals/DTF-Feeds-4.0/raw/main/src/userMenu/js/main.js
//
// AddingToDB
// @require     https://github.com/TentacleTenticals/DTF-Feeds-4.0/raw/main/src/addingToDB/main.js
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

  .feed__item.l-island-round.collapsed {
    max-height: 50px;
    overflow: hidden;
  }
  .feed__item.l-island-round.collapsed .feedButtons .btn.collapsed {
    filter: sepia(1);
  }

  .dtf-feedsContainer .feed__item.l-island-round.inBase .content-header {
    background-image: repeating-linear-gradient(135deg, transparent 40%, rgb(255 255 255 / 60%));
  }
  .feed__item.l-island-round.inBase .content-header {
    background-color: rgb(200 213 207);
  }

  .feed__item.l-island-round.inBase>:nth-child(1)::after {
    display: flex;
    position: absolute;
    top: 4px;
    right: 0px;
    font-size: 15px;
    z-index: 10;
  }
  .feed__item.l-island-round.inBase>:nth-child(1)::after {
    content: '🔖';
  }

  .feed__item.l-island-round:is(.favoriteTopicsAuthor, .favoriteBlogsAuthor) .content-header-author__avatar::after {
    display: none;
    top: -10%;
    left: 55%;
    width: unset;
    height: unset;
    font-size: 11px;
    line-height: 11px;
    z-index: 10;
  }
  .feed__item.l-island-round.favoriteTopicsAuthor .content-header-author__avatar::after {
    content: '💘';
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
    margin: 20px 0 0 0;
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
    overflow: visible;
    box-shadow: 0 0 2px 0px rgb(0,0,0);
  }
  .feed__item.l-island-round .content-header-author__avatar img {
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
    z-index: 10;
  }

  .feed__item.l-island-round:is(.readed, .planToRead, .onHold, .dropped, .favorite, .ignored)::before {
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
    z-index: 10;
  }

  .feed__item.l-island-round.readed .content-header {
    background-color: rgb(98 247 177);
  }
  .feed__item.l-island-round.planToRead .content-header {
    background-color: rgb(247 98 168);
  }
  .feed__item.l-island-round.onHold .content-header {
    background-color: rgb(138 217 245);
  }
  .feed__item.l-island-round.dropped .content-header {
    background-color: rgb(98 247 177);
  }
  .feed__item.l-island-round.favorite .content-header {
    background-color: rgb(229 189 142);
  }
  .feed__item.l-island-round.ignored .content-header {
    background-color: rgb(149 147 148);
  }
  .feed__item.l-island-round.blocked .content-header {
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

  .feed__item.l-island-round.readed:not(.favorite, .ignored)::before {
    content: '✔️ ПРОСМОТРЕНО';
  }
  .feed__item.l-island-round.planToRead:not(.favorite, .ignored)::before {
    content: '📚 ПРОЧТУ ПОЗЖЕ';
  }
  .feed__item.l-island-round.onHold:not(.favorite, .ignored)::before {
    content: '📖 ЧИТАЮ';
  }
  .feed__item.l-island-round.dropped::before {
    content: '❌ БРОШЕНО';
  }
  .feed__item.l-island-round.favorite::before {
    content: '💘 ИЗБРАННОЕ';
  }
  .feed__item.l-island-round.ignored::before {
    content: '💢 ИГНОРИРОВАНО';
  }

  .feed__item.l-island-round.readed.favorite::before {
    content: '✔️ ПРОСМОТРЕНО, 💘 ИЗБРАННОЕ';
  }
  .feed__item.l-island-round.readed.ignored::before {
    content: '✔️ ПРОСМОТРЕНО, 💢 ИГНОРИРОВАНО';
  }

  .feed__item.l-island-round.planToRead.favorite::before {
    content: '📚 ПРОЧТУ ПОЗЖЕ, 💘 ИЗБРАННОЕ';
  }
  .feed__item.l-island-round.planToRead.ignored::before {
    content: '📚 ПРОЧТУ ПОЗЖЕ, 💢 ИГНОРИРОВАНО';
  }

  .feed__item.l-island-round.readed.onHold::before {
    content: '📖 ЧИТАЮ, 💘 ИЗБРАННОЕ';
  }
  .feed__item.l-island-round.readed.onHold::before {
    content: '📖 ЧИТАЮ, 💢 ИГНОРИРОВАНО';
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
  const mainData = {};

  // mainCfg = {
  //   'main': {
  //     'databases': {
  //       'online': {
  //         'settings': false,
  //         'data': true
  //       },
  //       'keepVars': {
  //         'feeds': false,
  //         'comments': false,
  //         'subsites': true,
  //         'users': true
  //       }
  //     }
  //   },
  //   'working mode': 'tags',
  //   'filters': {
  //     'comments': {
  //       'text': {
  //         'none': 'collapse',
  //         'some': 'collapse',
  //         'active': true,
  //         'words active': true,
  //         'words': []
  //       }
  //     },
  //     'feeds': {
  //       'blogs': {
  //         'title': {
  //           'none': 'collapse',
  //           'some': 'collapse',
  //           'active': true,
  //           'words active': true,
  //           'words': []
  //         },
  //         'text': {
  //           'none': 'collapse',
  //           'some': 'collapse',
  //           'active': true,
  //           'words active': true,
  //           'words': []
  //         }
  //       },
  //       'topics': {
  //         'title': {
  //           'none': 'collapse',
  //           'some': 'collapse',
  //           'active': true,
  //           'words active': true,
  //           'words': []
  //         },
  //         'text': {
  //           'none': 'collapse',
  //           'some': 'collapse',
  //           'active': true,
  //           'words active': true,
  //           'words': []
  //         }
  //       }
  //     }
  //   },
  //   'feeds': {
  //     'interface': {
  //       'feedButtons': {
  //         'readed': true,
  //         'author actions': true,
  //         'subsite actions': false
  //       }
  //     },
  //     'what to show': {
  //       'popular': {
  //         'topics': true,
  //         'blogs': true
  //       },
  //       'new': {
  //         'topics': true,
  //         'blogs': true
  //       },
  //       'my new': {
  //         'topics': true,
  //         'blogs': true
  //       },
  //       'bookmarks': {
  //         'topics': true,
  //         'blogs': true
  //       },
  //       'topic': {
  //         'topics': true,
  //         'blogs': true
  //       }
  //     },
  //     'attachments': {
  //       'video': {
  //         'replace': true,
  //         'autoplay': false,
  //         'sound': false,
  //         'volume': 40,
  //         'size': {
  //           'width': 300,
  //           'height': 150
  //         }
  //       }
  //     }
  //   },
  //   'database': {
  //     'adding': {
  //       'feeds': {
  //         'attachments': {
  //           'items': {
  //             'sz': 2
  //           },
  //           'albums': {
  //             'sz': 2
  //           }
  //         }
  //       },
  //       'comments': {
  //         'attachments': {
  //           'items': {
  //             'sz': 2
  //           },
  //           'albums': {
  //             'sz': 2
  //           }
  //         }
  //       }
  //     }
  //   },
  //   'usercard': {
  //     'avatar': {
  //       'search': {
  //         'list': [// Список поисковиков.
  //           {url:'http://saucenao.com/search.php?db=999&url=', name:'Saucenao', use:true},
  //           {url:'https://www.bing.com/images/search?view=detailv2&iss=sbi&FORM=SBIHMP&sbisrc=UrlPaste&q=imgurl:', name:'Bing', use:true},
  //           {url:'https://www.google.com/searchbyimage?sbisrc=4chanx&safe=off&image_url=', name:'Google', use:true},
  //           {url:'https://lens.google.com/uploadbyurl?url=', name:'Google Lens', use:true},
  //           {url:'https://yandex.ru/images/search?rdrnd=296405&rpt=imageview&url=', name:'Yandex', use:true},
  //           {url:'http://tineye.com/search/?url=', name:'TinEye', use:true},
  //           {url:'http://iqdb.org/?url=', name:'IQDB', use:true}
  //         ]
  //       }
  //     }
  //   },
  //   'menu': {
  //     'feed': {
  //       'sz': 5
  //     },
  //     'user': {
  //       'sz': 5
  //     }
  //   },
  // };

  // const sData = {
  //   users: [],
  //   subsites: [],
  //   feeds: [],
  //   comments: []
  // };

  let obs = {},
    widget;
  // window.addEventListener('load', run);
  // let data = {
  //   'users': [],
  //   'subsites': []
  // };

  function attachment1({path, type, i}){
    console.log(i)
    const main=new El().Div({
      path: path,
      cName: `mask ${type} ${i.data && i.data.type||''}`,
      rtn: true
    });
    if(!i.data) return;
    if(i.type === 'image'){
      if(i.data.type.match(/video|gif/)){
        new El().Video({
          path: main,
          cName: 'attach',
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

  function checkComments(target){
    function check(target, item){
      function checkStatus(s, t, action){
        s.favorite ? t.classList.add('favorite') : t.classList.remove('favorite');
        s.ignored ? t.classList.add('ignored') : t.classList.remove('ignored');
        s.blocked ? t.classList.add('blocked') : t.classList.remove('blocked');
      }
      if(!target) for(let i = 0, arr = document.querySelectorAll('.comment'), length = arr.length; i < length; i++){
        const t = item.find(el => +el.id === +arr[i].getAttribute('data-user_id'));
        if(!t) continue;
        console.log('FOUNDED!!!!', t);
        checkStatus(t.flags.comments, arr[i]);
      }else{
        const t = item.find(el => +el.id === +target.getAttribute('data-user_id'));
        console.log('FOUNDED!!!!', t);
        checkStatus(t.flags.comments, target);
      }
    }
    console.log('Comments check...');
    if(mainCfg['database']['cfg']['data']['online']){
      if(!mainCfg['database']['keepVars']['users']) new Odb().supabase({
        run: 'get all',
        type: 'users'
      }).then(res => {
        check(target, res);
      }).catch(err => console.log(err));
      else{
        check(target, sData.users);
      }
    }else{
      check(target, sData.users);
    }
  }
  async function checkFeeds({target, fullCheck, data}){
    function typeOf(t){
      return Object.prototype.toString.call(t).slice(8, -1).toLowerCase();
    }
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

    try{
      if(!data) data = {};
      if(!mainCfg['database']['keepVars']['feeds'] && !data.feeds) data.feeds = await new Odb().supabase({
        run: 'get all',
        type: 'feeds'
      });
      if(!mainCfg['database']['keepVars']['users'] && !data.users) data.users = await new Odb().supabase({
        run: 'get all',
        type: 'users'
      });
      if(!mainCfg['database']['keepVars']['subsites'] && !data.subsites) data.subsites = await new Odb().supabase({
        run: 'get all',
        type: 'subsites'
      });
    }catch(err){
      console.log('ERR', err);
    }


    // console.log('FeedsBase', feeds);
    // console.log('UserBase', sData.users);
    // console.log('Subsites', sData.subsites);

    if(!target){
      target = !fullCheck ? document.querySelectorAll(`div[id=page_wrapper] .feed .feed__container .feed__chunk:not(.checked)`) : document.querySelectorAll(`div[id=page_wrapper] .feed .feed__container .feed__item`);
    }

    if(!fullCheck) console.log('FEEDS CHECK', target);

    function checkAS(u, type, item, who, action){
      const teq = type.charAt(0).toUpperCase() + type.slice(1);
      // console.log('AU', u.flags[type].favorite);
      u.flags[type].favorite ? item.classList.add(`favorite${teq + who}`) : item.classList.remove(`favorite${teq + who}`);
      u.flags[type].ignored ? item.classList.add(`ignored${teq + who}`) : item.classList.remove(`ignored${teq + who}`);
      u.flags[type].blocked ? item.classList.add(`blocked${teq + who}`) + action.remove : item.classList.remove(`blocked${teq + who}`);
    }
    function checkFeedStatus(s, t, action){
      t.classList.add('inBase');
      s.flags.readed ? t.classList.add('readed') : t.classList.remove('readed');
      s.flags.planToRead ? t.classList.add('planToRead') : t.classList.remove('planToRead');
      s.flags.onHold ? t.classList.add('onHold') : t.classList.remove('onHold');
      s.flags.favorite ? t.classList.add('favorite') : t.classList.remove('favorite');
      s.flags.ignored ? t.classList.add('ignored') : t.classList.remove('ignored');
      if(s.flags.blocked) action.remove;
    }
    function checkTitleText(t, type, att, action){
      if(att.video && mainCfg.feeds.attachments.video.replace) videoReplace(att.video.path, att.video.video);
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

    function chunkReader(chunk){
      for(let i = 0, arr = !fullCheck ? chunk.children : chunk, length = arr.length; i < length; i++){
        // console.log('FEED', arr[i]);
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
              return (data.users||sData.users).find(el => el.id === this.id);
            }
          },
          sub = {
            id: control.getAttribute('data-subsite-id'),
            name: control.getAttribute('data-subsite-name'),
            get inBase(){
              return (data.subsites||sData.subsites).find(el => el.id === this.id);
            }
          },
          feed = {
            id: control.getAttribute('data-content-id'),
            get inBase(){
              return (data.feeds||sData.feeds).find(el => el.id === this.id);
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
              target: sub.inBase && ['subsite', sub.inBase.flags.topics],
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
              target: user.inBase && ['author', user.inBase.flags.topics]
            });
            tag.author.children[0].textContent = ++tag.author.children[0].textContent;
            if(tag.author.className.match('active-m1')) arr[i].classList.add('tagHide');
            if(tag.author.className.match('active-m2')) arr[i].classList.add('tagSort');
          }
          if(user.inBase) checkAS(user.inBase, 'topics', arr[i], 'Author', action);
          if(sub.inBase) checkAS(sub.inBase, 'topics', arr[i], 'Subsite', action);
          feed.inBase ? checkFeedStatus(feed.inBase, arr[i], action) : arr[i].classList.remove('inBase');

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
              target: user.inBase && ['author', user.inBase.flags.topics]
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
              {
                type: 'button',
                cName: 'save',
                text: '💾',
                title: 'Сохранить/обновить фид',
                onclick: (e) => {
                  if(!feed.inBase){
                    console.log('No feed');
                    new Promise((res, err) => {
                      new Adding()['feed']({coord:e.target.getBoundingClientRect(), item:{id:feed.id}, res:res, err:err});
                    }).then(data => {
                      console.log(data);
                      new UserMenu().findOrAdd({id:feed.id, type:'feeds', card:data}).then(res => {
                        if(res){
                          checkFeeds({fullCheck:true, feeds:res.type});
                        }
                      });
                    });
                  }else
                    console.log('Feed in base');
                  new Promise((res, err) => {
                    new Adding()['feed']({coord:e.target.getBoundingClientRect(), item:{id:feed.id, flags:feed.inBase.flags, info:feed.inBase.info}, res:res, err:err});
                  }).then(data => {
                    console.log(data);
                    new UserMenu().findOrAdd({id:feed.id, type:'feeds', card:data}).then(res => {
                      if(res){
                        checkFeeds({fullCheck:true, feeds:res.type});
                      }
                    });
                  });
                }
              },
              ...mainCfg['feeds']['interface']['feedButtons']['readed'] ? [{
                type: 'button',
                cName: 'readed',
                text: '✔️',
                title: 'Пометить как "прочитано"',
                onclick: () => {
                  new UserMenu().findOrAdd({id:feed.id, type:'feeds', key:'readed'}).then(res => {
                    if(res){
                      console.log('RES IS YO!!!', res);
                      checkFeeds({fullCheck:true, feeds:res.type});
                    }
                    // console.log('Feeds', sData.feeds);
                  });
                }
              }] : [],
              {
                type: 'button',
                cName: 'collapsed',
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
                        if(res) checkFeeds({fullCheck:true});
                        console.log('Subsite', sData.subsites);
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
        chunk.classList.add('checked');
        mainFeed.appendChild(chunk);
      }
    }
    // if(!target && !target.children.length > 0) return;
    // console.log('Target', target);
    // console.log('TYYYYYYYYYYPE', Object.prototype.toString.call(target).slice(8, -1).toLowerCase());
    if(!fullCheck) for(let ci = 0, chunk = typeOf(target) === 'nodelist' ? target : [target], len = chunk.length; ci < len; ci++){
      console.log('CHUNK', chunk[ci]);
      chunkReader(chunk[ci]);
    }else
    chunkReader(target);
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
          console.log('OBS', item.className);
          checkFeeds({target:item});
        }
      }
    });
  }
  class UserMenu{
  dtfApi({type, value, v, token}){
    let s;
    switch(type){
      case 'news':{
        s = 'news';
      }
      break;
      case 'subsite':{
        s = 'subsite';
        v = 'id';
      }
      break;
      case 'subscribers':{
        s = 'subsite/subscribers';
        v = 'subsiteId';
      }
      break;
      case 'subscriptions':{
        s = 'subsite/subscriptions';
        v = 'subsiteId';
      }
      break;
      case 'comments':{
        s = 'comments';
        v = 'contentId';
      }
      break;
      case 'bookmarks':{
        s = 'bookmarks';
      }
    }
    return fetch(`https://api.dtf.ru/v2.31/${s && s+'?'||''}${v||''}${value && '='+value||''}`, {
      headers: {
        'accept': 'application/json',
        ...(token ? {'X-Device-Token':`'${token}'`} : {})
      }
    }).then(r => r.json().then(rr => rr.result)).catch(err => err);
  }
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
  add({id, tId, data, type, r, key, card}){
    return new Promise((result, error) => {
      if(type.match(/users|subsites/)){
        let obj;
        this.getUser(id).then(res => {
          if(type === 'users') obj = {
            id: id,
            info: {
              name: res.subsite.name,
              created: res.subsite.created,
              description: res.subsite.description,
              avatar: res.subsite.avatar && {
                type: res.subsite.avatar.type,
                data: {
                  type: res.subsite.avatar.data.type,
                  uuid: res.subsite.avatar.data.uuid
                }
              }||''
            },
            flags:{
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
            },
            ...card ? card : {}
          };
          else
          if(type === 'subsites') obj = {
            id: id,
            info: {
              name: res.subsite.name,
              created: res.subsite.created,
              description: res.subsite.description,
              avatar: res.subsite.avatar && {
                type: res.subsite.avatar.type,
                data: {
                  type: res.subsite.avatar.data.type,
                  uuid: res.subsite.avatar.data.uuid
                }
              }||''
            },
            flags:{
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
            },
            ...card ? card : {}
          };
          if(!card) obj.flags[r][key] ? obj.flags[r][key] = false : obj.flags[r][key] = true;
          if(mainCfg['database']['keepVars'][type]) data[type].push(obj);
          result({status:'success', type:type, run:'add', data:!mainCfg['database']['keepVars'][type] ? '' : data, id:id, item:obj});
        });
      }else
      if(type.match(/feeds/)){
        this.getFeed(id).then(res => {
          const obj = {
            id: id,
            flags: {
              readed: false,
              planToRead: false,
              onHold: false,
              dropped: false,
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
                  for(let i = 0, arr = res.blocks, arrLen = arr.length - (res.keywords.length > 0 ? 1 : 0), len = (mainCfg.database.saving.feeds.attachments.items['max sz'] >= arrLen ? arrLen : mainCfg.database.saving.feeds.attachments.items['max sz']); i < len; i++){
                    if(arr[i].type.match(/media|text/)){
                      list.push(this.getAttach(arr[i]));
                    }else continue;
                  }
                  return list;
                }
              })(),
              ...card ? card.info : {}
            },
            ...card ? {flags:card.flags} : {}
          }
          if(!card) obj.flags[key] ? obj.flags[key] = false : obj.flags[key] = true;
          console.log('DATA', data);
          console.log('DATA TYPE', data[type]);
          if(mainCfg['database']['keepVars'][type]) data[type].push(obj);
          result({status:'success', type:type, run:'add', id:id, data:!mainCfg['database']['keepVars'][type] && data, item:obj});
          // checkFeeds({fullCheck:true});
        });
      }else
      if(type.match(/comments/)){
        console.log('IDs', id);
        this.dtfApi({type:type, value:id}).then(res => {
          console.log('RES', res);
          const cmt = res.items.find(e => e.id === tId);
          console.log('COMMENT', cmt);
          const obj = {
            id: cmt.id,
            flags: {
              readed: false,
              planToRead: false,
              onHold: false,
              dropped: false,
              favorite: false,
              ignored: false,
              blocked: false
            },
            info: {
              author: {
                id: cmt.author.id,
                name: cmt.author.name,
                avatar: cmt.author.avatar && {
                  type: cmt.author.avatar.type,
                  data: {
                    type: cmt.author.avatar.data.type,
                    uuid: cmt.author.avatar.data.uuid
                  }
                }||''
              },
              text: cmt.text,
              date: cmt.date,
              attachments: (() => {
                if(cmt.media.length > 0){
                  // console.log('BLOCKS', cmt.blocks);
                  const list = [];
                  for(let i = 0, arr = cmt.media, arrLen = arr.length, len = (mainCfg.database.adding.comments.attachments.items.sz >= arrLen ? arrLen : mainCfg.database.adding.comments.attachments.items.sz); i < len; i++){
                    if(arr[i].type.match(/media|text/)){
                      list.push(this.getAttach(arr[i]));
                    }else continue;
                  }
                  return list;
                }
              })()
            }
          }
          obj.flags[key] ? obj.flags[key] = false : obj.flags[key] = true;
          console.log('DATA', data);
          console.log('DATA TYPE', data[type]);
          if(mainCfg['database']['keepVars'][type]) data[type].push(obj);
          result({status:'success', type:type, run:'add', id:tId, data:!mainCfg['database']['keepVars'][type] && data, item:obj});
          // checkFeeds({fullCheck:true});
        });
      }
    });
  }
  update({id, item, type, r, key, card}){
    function flagsCheck(){
      if(type.match(/users|subsites/)){
        if(!item.flags[r][key]) return;
        // console.log('ITEM RULES', item.flags[r]);
        switch(key){
          case 'favorite':{
            item.flags[r].ignored = false;
            item.flags[r].blocked = false;
          }
          break;
          case 'ignored':{
            item.flags[r].favorite = false;
            item.flags[r].blocked = false;
          }
          break;
          case 'blocked':{
            item.flags[r].favorite = false;
            item.flags[r].ignored = false;
          }
          break;
        }
      }else
      if(type.match(/feeds/)){
        // console.log('ITEM RULES', item.flags);
        if(!item.flags[key]) return;
        switch(key){
          case 'favorite':{
            item.flags.ignored = false;
            item.flags.blocked = false;
          }
          break;
          case 'ignored':{
            item.flags.favorite = false;
            item.flags.blocked = false;
          }
          break;
          case 'blocked':{
            item.flags.favorite = false;
            item.flags.ignored = false;
          }
          break;
          case 'readed':{
            item.flags.planToRead = false;
            item.flags.onHold = false;
            item.flags.dropped = false;
          }
          break;
          case 'planToRead':{
            item.flags.readed = false;
            item.flags.onHold = false;
            item.flags.dropped = false;
          }
          break;
          case 'onHold':{
            item.flags.readed = false;
            item.flags.planToRead = false;
            item.flags.dropped = false;
          }
          break;
          case 'dropped':{
            item.flags.readed = false;
            item.flags.planToRead = false;
            item.flags.onHold = false;
          }
          break;
        }
      }
    }
    return new Promise((result, error) => {
      if(type.match(/users|subsites/)){
        let obj;
        this.getUser(id).then(res => {
          if(type === 'users'){
            obj = structuredClone(item);
            obj.info.name = res.subsite.name;
            obj.info.created = res.subsite.created;
            obj.info.description = res.subsite.description;
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
            obj.info.created = res.subsite.created;
            obj.info.description = res.subsite.description;
            obj.info.avatar = res.subsite.avatar ? {
              type: res.subsite.avatar.type,
              data: {
                type: res.subsite.avatar.data.type,
                uuid: res.subsite.avatar.data.uuid
              }
            }: '';
          }

          item.flags[r][key] ? item.flags[r][key] = false : item.flags[r][key] = true;
          flagsCheck();
          result({status:'success', type:type, run:'update', id:id, item:item});
        });
      }else{
        this.getFeed(id).then(res => {
          const obj = {
            id: id,
            flags: card ? card.flags : structuredClone(item.flags),
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
                  for(let i = 0, arr = res.blocks, arrLen = arr.length - (res.keywords.length > 0 ? 1 : 0), len = (mainCfg.database.saving.feeds.attachments.items['max sz'] >= arrLen ? arrLen : mainCfg.database.saving.feeds.attachments.items['max sz']); i < len; i++){
                    if(arr[i].type.match(/media|text/)){
                      list.push(this.getAttach(arr[i]));
                    }else continue;
                  }
                  return list;
                }
              })(),
              ...card ? card.info : {}
            }
          }

          if(!card){
            item.flags[key] ? item.flags[key] = false : item.flags[key] = true;
            flagsCheck();
          }
          result({status:'success', type:type, run:'update', id:id, item:obj});
        });
      }
    });
  }
  getValue(item, type, r, key){
    return [type][item].flags[r][key];
  }
  findOrAdd({id, type, r, key, card}){
    const check = (data) => {
      console.log('dt', data);
      return new Promise((result, error) => {
        // console.log('findOrAdd DATA', data);
        const user = (data||sData)[type].findIndex(e => e.id === id);
        // const user = (data||sData[type]).findIndex(e => e.id === id);
        // console.log('USER', user);
        if(user !== -1){
          this.update({data:(data||sData), item:(data||sData)[type][user], id:id, type:type, r:r, key:key, card:card}).then(i => {
            if(mainCfg['database']['cfg']['data']['online']) new Odb().supabase({
              run: 'findOrAdd',
              type: i.type,
              target: i.id,
              data: i.item
            }).then(db => {
              console.log('Yo', db);
              if(db.status === 201){
                console.log(`Success, ${i.type} is added!!!`);
              }else
              if(db.status === 204){
                console.log(`Success, ${i.type} is updated!!!`);
              }
              // if(!mainCfg['database']['keepVars'][i.type]) new Odb().supabase({
              //   run: 'get all',
              //   type: i.type
              // }).then(db => {
              //   if(db){
              //     result({status:'success', [i.type]:db});
              //   }
              // }).catch(er => {
              //   console.log(er.code, er);
              //   result({status:'success'});
              // })
              // else
              result({status:'success', data:i.data});
            }).catch(er => {
              console.log('Error at findOrAdd...');
              console.log(er.code, er);
            });
            else
            result({status:'success'});
          });
        }else
          this.add({data:(data||sData), item:(data||sData)[type][user], id:id, type:type, r:r, key:key, card:card}).then(i => {
            if(mainCfg['database']['cfg']['data']['online']) new Odb().supabase({
              run: 'findOrAdd',
              type: i.type,
              target: i.id,
              data: i.item
            }).then(db => {
              console.log('Yo', db);
              if(db.status === 201){
                console.log(`Success, ${i.type} is added!!!`);
              }else
              if(db.status === 204){
                console.log(`Success, ${i.type} is updated!!!`);
              }
              // if(!mainCfg['database']['keepVars'][i.type]) new Odb().supabase({
              //   run: 'get all',
              //   type: i.type
              // }).then(db => {
              //   if(db){
              //     result({status:'success', [i.type]:db});
              //   }
              // }).catch(er => {
              //   console.log(er.code, er);
              //   result({status:'success'});
              // })
              // else
              result({status:'success', data:i.data});
            }).catch(er => {
              console.log('Error at findOrAdd...');
              console.log(er.code, er);
            });
            else
            result({status:'success'});
          });
      })
    }
    if(mainCfg['database']['cfg']['data']['online']){
      if(!mainCfg['database']['keepVars'][type]){
        return new Odb().supabase({
          run: 'get all',
          type: type
        }).then(data => {
          if(data) return check({[type]:data});
          else
          check({[type]:[]});
        }).catch(err => console.log('getAll error!!!', err));
        // user = await new Odb().supabase({
        //   run: 'find',
        //   type: type,
        //   target: id
        // });
        // if(user && !user.length > 0) user = -1;
      }else{
        return check();
      }
    }else
    return check();
    // console.log('DATA', data);
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
      for(let e = 0, arr = i.data.items, len = (mainCfg.database.saving.feeds.attachments.albums['max sz'] >= arr.length ? arr.length : mainCfg.database.saving.feeds.attachments.albums['max sz']); e < len; e++){
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
  async build({t, data, offset, uID, cID, sID, fID, uName, sName, type}){
    // console.log('sData', sData)
    if(!data) data = {};
    if(mainCfg.database.cfg.data.online){
      try{
        // if(!mainCfg.database.cfg.data.online) return;
        if(!db.name) return;
        if(!mainCfg['database']['keepVars']['users'] && !data.users) data.user = await new Odb().supabase({
          run: 'find',
          type: 'users',
          target: uID,
          db: db
        });
        // console.log('USERS', (data.user||sData.users));
      }catch(err){
        console.log('ERR', err);
      }
    }
    // console.log('Menu', data.user||(data.users||sData.users))
    console.log('uID', uID)
    this.user=data.user||(data.users||sData.users).find(el => el.id === uID.toString());
    console.log('USER', this.user);
    console.log('Flags', (this.user && this.user.flags.topics.favorite) ? 'button favorite' : 'button')
    // this.subsite=(data||sData).subsites.find(el => el.id === sID);
    // this.feeds=(data||sData).feeds.find(el => el.id === fID);
    // this.comments=sData.comments.find(el => el.id === fID);
    new CtxMenu().build({
      path: document.body,
      title: 'МЕНЮ УПРАВЛЕНИЯ',
      e: t,
      offset: offset,
      focus: true,
      // autohide: true,
      items: [
        {
          type: 'separator',
          text: 'Инфо'
        },
        ...type.match(/topic|db-feed/) ? [
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
        ...type.match(/topic|db-feed/) ? [
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
                cName: this.feeds && this.feeds.flags.readed ? 'btn readed':'btn',
                text: '✔️',
                onclick: () => {
                  this.findOrAdd({id:fID, type:'feeds', key:'readed'}).then(res => {
                    checkFeeds({fullCheck:true});
                    console.log('Feeds', sData.feeds);
                  });
                }
              },
              {
                type: 'button',
                title: 'Прочту',
                cName: this.feeds && this.feeds.flags.planToRead ? 'btn planToRead':'btn',
                text: '📚',
                onclick: () => {
                  this.findOrAdd({id:fID, type:'feeds', key:'planToRead'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('User', sData);
                  });
                }
              },
              {
                type: 'button',
                title: 'Читаю',
                cName: this.feeds && this.feeds.flags.onHold ? 'btn onHold':'btn',
                text: '📖',
                onclick: () => {
                  this.findOrAdd({id:fID, type:'feeds', key:'onHold'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('Feeds', sData.feeds);
                  });
                }
              },
              {
                type: 'button',
                title: 'Брошено',
                cName: this.feeds && this.feeds.flags.dropped ? 'btn dropped':'btn',
                text: '❌',
                onclick: () => {
                  this.findOrAdd({id:fID, type:'feeds', key:'dropped'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('Feeds', sData.feeds);
                  });
                }
              },
              {
                type: 'button',
                title: 'Избранное',
                cName: this.feeds && this.feeds.flags.favorite ? 'btn favorite':'btn',
                text: '💘',
                onclick: () => {
                  this.findOrAdd({id:fID, type:'feeds', key:'favorite'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('Feeds', sData.feeds);
                  });
                }
              },
              {
                type: 'button',
                title: 'Игноровано',
                cName: this.feeds && this.feeds.flags.ignored ? 'btn ignored':'btn',
                text: '💢',
                onclick: () => {
                  this.findOrAdd({id:fID, type:'feeds', key:'ignored'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('Feeds', sData.feeds);
                  });
                }
              },
              {
                type: 'button',
                title: 'Блокировано',
                cName: this.feeds && this.feeds.flags.blocked ? 'btn blocked':'btn',
                text: '🈲',
                onclick: () => {
                  this.findOrAdd({id:fID, type:'feeds', key:'blocked'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('Feeds', sData.feeds);
                  });
                }
              }
            ],
          }
        ] : [],
        ...type.match(/topic|db-feed/) ? [
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
                cName: this.subsite && this.subsite.flags.topics.favorite ? 'btn favorite':'btn',
                text: '💘',
                onclick: () => {
                  this.findOrAdd({id:sID, name:sName, type:'subsites', r:'topics', key:'favorite'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('Subsite', sData.subsites);
                  });
                }
              },
              {
                type: 'button',
                title: 'Игноровано',
                cName: (this.subsite && this.subsite.flags.topics.ignored) ? 'button ignored' : 'button',
                text: '💢',
                onclick: () => {
                  this.findOrAdd({id:sID, name:sName, type:'subsites', r:'topics', key:'ignored'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('Subsite', sData.subsites);
                  });
                }
              },
              {
                type: 'button',
                title: 'Блокировано',
                cName: (this.subsite && this.subsite.flags.topics.blocked) ? 'button blocked' : 'button',
                text: '🈲',
                onclick: () => {
                  this.findOrAdd({id:sID, name:sName, type:'subsites', r:'topics', key:'blocked'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('Subsite', sData.subsites);
                  });
                }
              }
            ],
          }
        ] : [],
        ...type.match(/topic|db-feed|comment/) ? [
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
                cName: this.user && this.user.flags.topics.favorite ? 'btn favorite':'btn',
                text: '💘',
                onclick: () => {
                  this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'favorite'}).then(res => {
                    checkFeeds({fullCheck:true});
                    console.log('User', sData.users);
                  });
                }
              },
              {
                type: 'button',
                title: 'Игноровано',
                cName: (this.user && this.user.flags.topics.ignored) ? 'button ignored' : 'button',
                text: '💢',
                onclick: () => {
                  this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'ignored'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('User', sData.users);
                  });
                }
              },
              {
                type: 'button',
                title: 'Блокировано',
                cName: (this.user && this.user.flags.topics.blocked) ? 'button blocked' : 'button',
                text: '🈲',
                onclick: () => {
                  this.findOrAdd({id:uID, name:uName, type:'users', r:'topics', key:'blocked'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('User', sData.users);
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
                cName: (this.user && this.user.flags.blogs.favorite) ? 'button favorite' : 'button',
                text: '💘',
                onclick: () => {
                  this.findOrAdd({id:uID, name:uName, type:'users', r:'blogs', key:'favorite'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('User', sData.users);
                  });
                }
              },
              {
                type: 'button',
                title: 'Игноровано',
                cName: (this.user && this.user.flags.blogs.ignored) ? 'button ignored' : 'button',
                text: '💢',
                onclick: () => {
                  this.findOrAdd({id:uID, name:uName, type:'users', r:'blogs', key:'ignored'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('User', sData.users);
                  });
                }
              },
              {
                type: 'button',
                title: 'Блокировано',
                cName: (this.user && this.user.flags.blogs.blocked) ? 'button blocked' : 'button',
                text: '🈲',
                onclick: () => {
                  this.findOrAdd({id:uID, name:uName, type:'users', r:'blogs', key:'blocked'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('User', sData.users);
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
                cName: (this.user && this.user.flags.comments.favorite) ? 'button favorite' : 'button',
                text: '💘',
                onclick: () => {
                  this.findOrAdd({id:uID, name:uName, type:'users', r:'comments', key:'favorite'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('User', sData.users);
                  });
                }
              },
              {
                type: 'button',
                title: 'Игноровано',
                cName: (this.user && this.user.flags.comments.ignored) ? 'button ignored' : 'button',
                text: '💢',
                onclick: () => {
                  this.findOrAdd({id:uID, name:uName, type:'users', r:'comments', key:'ignored'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('User', sData.users);
                  });
                }
              },
              {
                type: 'button',
                title: 'Блокировано',
                cName: (this.user && this.user.flags.comments.blocked) ? 'button blocked' : 'button',
                text: '🈲',
                onclick: () => {
                  this.findOrAdd({id:uID, name:uName, type:'users', r:'comments', key:'blocked'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('User', sData.users);
                  });
                }
              }
            ],
          },
        ] : [],
      ]
    })
  }
  profileCard({e, offset, path, item, autohide}){
    console.log('USER', this.user);
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
        if(!autohide) return;
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
    new CtxMenu().build({
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


  // new El().Css('DTF-User Block', css(mainCfg));
  new El().Css('DTF-core', mainCSS(), true);
  new El().Css('DTF-widgets', widgetCss(), true);
  new El().Css('DTF-ctxMenu', ctxMenuCss());
  new El().Css('DTF-profileCard', profilecardCss());

  new El().Css('tabber', tabberCss());
  new El().Css('bookMenu', bookMenuCss());
  // new El().Css('bookMenu', feedsCss());

  document.body.oncontextmenu = (e) => {
    if(!e.target.className) return;
    if(!e.button === 2) return;
    if(e.target.className === 'comment__author'){
      e.preventDefault();
      e.stopImmediatePropagation();
      const control = e.target.closest('.comment').querySelector(`.comment__action[air-module='module.etc_controls']`);
      new UserMenu().userMenu({
        t: e.target.getBoundingClientRect(),
        offset: e.target.offsetHeight,
        fID: control.getAttribute('data-content-id'),
        cID: control.getAttribute('data-comment-id'),
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
    const pageType = getPageType(document.location.href);
    if(pageType.type && pageType.type.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
          checkFeeds({});
          !obs.feeds ? obsFeeds('start') : obsFeeds('restart');
    }
    if(pageType.type && pageType.type.match(/topic/)){
      checkComments();
      // !obs.feeds ? obsFeeds('start') : obsFeeds('restart');
    }

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

  function runner(s){
    if(s.page !== 'def' && s.status !== 'ready') return;

    const config = {
      // settings: defaultCfg,
      start: async (c) => {
        console.log('Staaaaaaaaaaaaart', mainCfg);
        // new El().Css('DTF-cfg', cfgMenuCss());
        new El().Css('DTF-User Block', css(mainCfg));
        new El().Css('feeds', feedsCss(mainCfg));

        // console.log('Updated CFG', mainCfg);

        try{
          if(mainCfg['database']['keepVars']['feeds']) sData.feeds = await new Odb().supabase({
            run: 'get all',
            type: 'feeds'
          });
          if(mainCfg['database']['keepVars']['users']) sData.users = await new Odb().supabase({
            run: 'get all',
            type: 'users'
          });
          if(mainCfg['database']['keepVars']['subsites']) sData.subsites = await new Odb().supabase({
            run: 'get all',
            type: 'subsites'
          });
          // if(mainCfg['database']['keepVars']['comments']) sData.comments = await new Odb().supabase({
          //   run: 'get all',
          //   type: 'comments'
          // });
        }catch(err){
          console.log('ERR', err);
        }

        if(getPageType(document.location.href).type && getPageType(document.location.href).type.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
          checkFeeds({});
          !obs.feeds ? obsFeeds('start') : obsFeeds('restart');
        }
        if(getPageType(document.location.href).type && getPageType(document.location.href).type.match(/topic/)){
          checkComments();
          // !obs.feeds ? obsFeeds('start') : obsFeeds('restart');
        }
      }
    };

    if(!mainCfg){
      console.log(`[Run] Starting...`);
      new Db().run({mode:'start', cfg:config, settings:{}}).then(async res => {
        if(res.result !== 'success') return;
        if(res.process === 'init'){
          console.log(`[Run] Скрипт успешно запущен!`);
          console.log('RRR', getPageType(document.location.href))

          new El().Css('DTF-User Block', css(mainCfg));
          new El().Css('feeds', feedsCss(mainCfg));
          new El().Css('dialog', dialogCss());

          // console.log('Updated CFG', mainCfg);

          try{
            if(mainCfg['database']['keepVars']['feeds']) sData.feeds = await new Odb().supabase({
              run: 'get all',
              type: 'feeds'
            });
            if(mainCfg['database']['keepVars']['users']) sData.users = await new Odb().supabase({
              run: 'get all',
              type: 'users'
            });
            if(mainCfg['database']['keepVars']['subsites']) sData.subsites = await new Odb().supabase({
              run: 'get all',
              type: 'subsites'
            });
            // if(mainCfg['database']['keepVars']['comments']) sData.comments = await new Odb().supabase({
            //   run: 'get all',
            //   type: 'comments'
            // });
          }catch(err){
            console.log('ERR', err);
          }

          run();
        }
      })
    }
    else{
      console.log(`[Run] Restarting...`);
      run();
    }


//     if(!mainCfg.init){
//       SettingsOpenerItem('Book Worm', 'book-worm', initMenu, mainCfg, sData);
//       console.log('INIT', initMenu);
//       try{
//         if(mainCfg['database']['keepVars']['feeds']) sData.feeds = await new Odb().supabase({
//           run: 'get all',
//           type: 'feeds'
//         });
//         if(mainCfg['database']['keepVars']['users']) sData.users = await new Odb().supabase({
//           run: 'get all',
//           type: 'users'
//         });
//         if(mainCfg['database']['keepVars']['subsites']) sData.subsites = await new Odb().supabase({
//           run: 'get all',
//           type: 'subsites'
//         });
//         // if(mainCfg['database']['keepVars']['comments']) sData.comments = await new Odb().supabase({
//         //   run: 'get all',
//         //   type: 'comments'
//         // });
//       }catch(err){
//         console.log('ERR', err);
//       }

//       mainCfg.init = true;
//     }
    // new Feeds().widgetItem(widget);
    // if(getPageType(document.location.href).type && getPageType(document.location.href).type.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
    //   checkFeeds({});
    //   !obs.feeds ? obsFeeds('start') : obsFeeds('restart');
    // }
    // if(getPageType(document.location.href).type && getPageType(document.location.href).type.match(/topic/)){
    //   checkComments();
    //   // !obs.feeds ? obsFeeds('start') : obsFeeds('restart');
    // }
  }

  new El().onPageLoad(runner);


})();
