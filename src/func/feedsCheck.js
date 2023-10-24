async function checkFeeds({target, isFeed, fullCheck, data}){
    const filter = {
      topics: {},
      blogs: {}
    };
    let widget,
        tabs,
        location = getPageType(document.location.href),
        mainFeed;

    console.log('Checking feeds...');
    mainFeed = new Feeds().build();
    if(mainCfg.main.feeds['working mode'] === 'tags'){
      widget = document.getElementById('widgetPanel').children[1].querySelector(`.wl-item.tagList`);
      tabs = {
        types: widget.children[1].children[0].children[1],
        subsites: widget.children[1].children[1].children[1],
        topics: widget.children[1].children[2].children[1].children[0],
        blogs: widget.children[1].children[2].children[2].children[0]
      }
    };
    if(mainCfg.filters.feeds.topics.title['words active'] && mainCfg.filters.feeds.topics.title.words.length > 0){
      try{
        const arr = mainCfg.filters.feeds.topics.title.words.filter(e => e).join('|');
        if(arr) filter.topics.title = new RegExp(arr, 'mi');
      }catch (err){
        new Alerter({
          alert: true,
          title: 'RegExp',
          text: 'Ошибка создания topics title RegExp фильтра. Вы выбрали неверные слова/фразы.',
          timer: 10000
        })
      }
    }
    if(mainCfg.filters.feeds.topics.text['words active'] && mainCfg.filters.feeds.topics.text.words.length > 0){
      try{
        const arr = mainCfg.filters.feeds.topics.text.words.filter(e => e).join('|');
        if(arr) filter.topics.text = new RegExp(arr, 'mi');
      }catch (err){
        new Alerter({
          alert: true,
          title: 'RegExp',
          text: 'Ошибка создания topics title RegExp фильтра. Вы выбрали неверные слова/фразы.',
          timer: 10000
        })
      }
    }
    if(mainCfg.filters.feeds.blogs.title['words active'] && mainCfg.filters.feeds.blogs.title.words.length > 0){
      try{
        const arr = mainCfg.filters.feeds.blogs.title.words.filter(e => e).join('|');
        if(arr) filter.blogs.title = new RegExp(arr, 'mi');
      }catch (err){
        new Alerter({
          alert: true,
          title: 'RegExp',
          text: 'Ошибка создания blogs title RegExp фильтра. Вы выбрали неверные слова/фразы.',
          timer: 10000
        })
      }
    }
    if(mainCfg.filters.feeds.blogs.text['words active'] && mainCfg.filters.feeds.blogs.text.words.length > 0){
      try{
        const arr = mainCfg.filters.feeds.blogs.text.words.filter(e => e).join('|');
        if(arr) filter.blogs.text = new RegExp(arr, 'mi');
      }catch (err){
        new Alerter({
          alert: true,
          title: 'RegExp',
          text: 'Ошибка создания blogs text RegExp фильтра. Вы выбрали неверные слова/фразы.',
          timer: 10000
        })
      }
    }

    function typeOf(t){
      return Object.prototype.toString.call(t).slice(8, -1).toLowerCase();
    }
    function checkAS(u, type, item, who, action){
      const teq = type.charAt(0).toUpperCase() + type.slice(1);
      if(!u.flags[type]) return;
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
      if(s.flags.readed && mainCfg.main.feeds.check.status.readed !== 'none') t.classList.add(mainCfg.main.feeds.check.status.readed);
      if(s.flags.ignored && mainCfg.main.feeds.check.status.ignored !== 'none') t.classList.add(mainCfg.main.feeds.check.status.ignored);
      if(s.flags.blocked && mainCfg.main.feeds.check.status.blocked !== 'none') t.classList.add(mainCfg.main.feeds.check.status.blocked);
      // if(s.flags.blocked) action.remove;
    }
    function checkTitleText(t, type, att, action){
      if(att.video.length > 0 && mainCfg.main.feeds.check.attachments.video.replace) att.video.forEach(e => videoReplace(e.path, e.video));
      if(att.title){
        if(mainCfg.filters.feeds[type].title.active && filter.title && mainCfg.filters.feeds[type].title['words active'] && att.title.match(filter.title)) action.collapse + t.classList.add('disabled', 'title');
      }else{
        t.classList.add('disabled', 'notitle');
        if(mainCfg.filters.feeds[type].title.none !== 'none') action[mainCfg.filters.feeds[type].title.none] = true;
      }

      if(att.text){
        if(mainCfg.filters.feeds[type].text.active && filter.text && mainCfg.filters.feeds[type].text['words active'] && att.text.match(filter.text)) action.collapse + t.classList.add('disabled', 'text');
      }else{
        t.classList.add('disabled', 'noText');
        if(mainCfg.filters.feeds[type].text.none !== 'none') action[mainCfg.filters.feeds[type].text.none] = true;
      }
    }
    function checkAction(o){
      if(o.action[mainCfg.filters.feeds[o.type].title.none]) o.t.classList.add(mainCfg.filters.feeds[o.type].title.none);
      if(o.action[mainCfg.filters.feeds[o.type].title.some]) o.t.classList.add(mainCfg.filters.feeds[o.type].title.some);
      if(o.action[mainCfg.filters.feeds[o.type].text.none]) o.t.classList.add(mainCfg.filters.feeds[o.type].text.none);
      if(o.action[mainCfg.filters.feeds[o.type].text.some]) o.t.classList.add(mainCfg.filters.feeds[o.type].text.some);
    }
    function chk(o){
      if(!o.tg) return;
      const control = o.tg.querySelector(`.content-header__item--controls`).children[0],
        type = control.getAttribute('data-subsite-id') !== control.getAttribute('data-user-id') ? 'topic' : 'blog',
        att = {
          video: []
        },
        action = {},
        tag = {},
        header = o.tg.querySelector(`.content-header__info`),
        headerLink = o.tg.querySelector(`.content>.content-link`),
        container = isFeed ? o.tg.querySelector(`.content.content--full`) : o.tg.querySelector(`.content-container`),
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
      // console.log('u', u);
      // console.log('s', s);
      // if(user.inBase) console.log('User in base', user.inBase);
      // if(feed.inBase) console.log('Feed in base', feed.inBase);

      if(container) for(let c = 0, cn = container.children, len = cn.length; c < len; c++){
        // console.log('Container', cn[c]);
        if(!cn[c].className) continue;
        if(cn[c].className.match('content-title')){
          att.title = cn[c].textContent.trim();
          if(cn[c].children[0]) att.editorial = true;
        }
        if(cn[c].className.match('l-island-a') && cn[c].children[0] && cn[c].children[0].tagName === 'P') att.text = cn[c].children[0].textContent.trim();
        if(cn[c].className.match(/figure-image|figure-video/) && cn[c].querySelector(`.andropov_video`)) att.video.push({path:cn[c], video:cn[c].querySelector(`.andropov_video`)});
      }

      // header.onmousedown = (e) => {
      //   if(e.button !== 0) return;
      //   if(e.target.className.match(/content-header/)){
      //     alert('Yo');
      //     e.preventDefault();
      //     headerLink.click();
      //   }
      // }

      o.tg.setAttribute('sID', sub.id);
      o.tg.setAttribute('uID', user.id);
      // if(att.editorial) o.tg.setAttribute('author', 'editorial');

      // sub.id === user.id ? o.tg.setAttribute('type', 'blog') : (!att.editorial ? o.tg.setAttribute('type', 'topic') : o.tg.setAttribute('type', 'topic ✔️'));

      if(type === 'topic'){
        // TOPIC
        o.tg.classList.add('topic');
        !att.editorial ? o.tg.setAttribute('type', 'topic') : o.tg.setAttribute('type', 'topic-edt');

        if(mainCfg.main.feeds['working mode'] === 'tags'){
          tag.typelist = new Feeds().tagButton({
            path:tabs.types,
            id:o.tg.getAttribute('type'),
            name:o.tg.getAttribute('type'),
            attr:'type',
            check:true
          });
          tag.typelist.children[0].textContent = ++tag.typelist.children[0].textContent;
          if(tag.typelist.className.match('active')) o.tg.classList.add('tagHide');
          tag.sublist = new Feeds().tagButton({
            path:tabs.subsites,
            id:sub.id,
            name:sub.name,
            attr:'sID',
            target: sub.inBase && ['subsite', sub.inBase.flags.topics],
            check:true
          });
          tag.sublist.children[0].textContent = ++tag.sublist.children[0].textContent;
          if(tag.sublist.className.match('active-m1')) o.tg.classList.add('tagHide');
          if(tag.sublist.className.match('active-m2')) o.tg.classList.add('tagSort');
          tag.author = new Feeds().tagButton({
            path:tabs.topics,
            id:user.id,
            name:user.name,
            attr:'uID',
            target: user.inBase && ['author', user.inBase.flags.topics]
          });
          tag.author.children[0].textContent = ++tag.author.children[0].textContent;
          if(tag.author.className.match('active-m1')) o.tg.classList.add('tagHide');
          if(tag.author.className.match('active-m2')) o.tg.classList.add('tagSort');
        }
        if(user.inBase) checkAS(user.inBase, 'topics', o.tg, 'Author', action);
        if(sub.inBase) checkAS(sub.inBase, 'topics', o.tg, 'Subsite', action);
        feed.inBase ? checkFeedStatus(feed.inBase, o.tg, action) : o.tg.classList.remove('inBase');

        // console.log('Container', container);

        if(container) checkTitleText(o.tg, 'topics', att, action);

        if(user.inBase){
          if(!user.inBase.flags.topics.favorite){
            checkAction({t:o.tg, action:action, type:'topics'});
          }
        }else{
          checkAction({t:o.tg, action:action, type:'topics'});
        }

      }else{
        // BLOG
        o.tg.setAttribute('type', 'blog');

        if(mainCfg['working mode'] === 'tags'){
          tag.typelist = new Feeds().tagButton({
            path:tabs.types,
            id:o.tg.getAttribute('type'),
            name:o.tg.getAttribute('type'),
            attr:'type',
            check:true
          });
          tag.typelist.children[0].textContent = ++tag.typelist.children[0].textContent;
          if(tag.typelist.className.match('active')) o.tg.classList.add('tagHide');
          tag.author = new Feeds().tagButton({
            path:tabs.blogs,
            id:user.id,
            name:user.name,
            attr:'uID',
            target: user.inBase && ['author', user.inBase.flags.topics]
          });
          tag.author.children[0].textContent = ++tag.author.children[0].textContent;
          if(tag.author.className.match('active')) o.tg.classList.add('tagHide');
        }

        if(user.inBase) checkAS(user.inBase, 'blogs', o.tg, 'Author', action);
        if(sub.inBase) checkAS(sub.inBase, 'blogs', o.tg, 'Subsite', action);
        if(feed.inBase) checkFeedStatus(feed.inBase, o.tg, action);

        if(container) checkTitleText(o.tg, 'blogs', att, action);

        if(user.inBase){
          if(!user.inBase.flags.topics.favorite){
            checkAction({t:o.tg, action:action, type:'blogs'});
          }
        }else{
          checkAction({t:o.tg, action:action, type:'blogs'});
        }
      }

      // mainFeed.appendChild(o.tg);
      if(!o.tg.className.match('btns')){
        // if(mainCfg.main.feeds.check.interface.feedButtons.goTo) new El().Button({
        //   path: control.parentNode,
        //   cName: 'goTo',
        //   text: '🔗\uFE0E',
        //   title: 'Открыть фид',
        //   onclick: () => {
        //     headerLink.click();
        //   }
        // });
        new Feeds().feedButtons({
          path: control.parentNode,
          items: [
            ...mainCfg.main.feeds.check.interface.feedButtons.goTo && !o.isFeed ? [{
              type: 'button',
              cName: 'goTo',
              text: '🔗\uFE0E',
              title: 'Открыть фид',
              onclick: () => {
                headerLink.click();
                // window.location.href = `${document.location.href}/${feed.id}`;
                // window.open(`https://dtf.ru/${feed.id}`, '_blank');
              }
            }]:[],
            {
              type: 'button',
              cName: 'collapse',
              text: '↭\uFE0E',
              title: 'Свернуть/развернуть фид',
              onclick: () => {
                o.tg.classList.toggle('collapse');
              }
            },
            {
              type: 'button',
              cName: 'save',
              text: '💾',
              title: 'Сохранить/обновить фид',
              onclick: (e) => {
                if(mainCfg.database.data.online && mainCfg.database.data.db !== 'none'){
                  e.target.disabled = true;
                  new Odb()[mainCfg.database.data.db]({
                    run: 'find',
                    type: 'feeds',
                    rType: 'object',
                    target: feed.id
                  }).then(db => {
                    new Promise((res, err) => {
                      e.target.disabled = false;
                      if(!db){
                        console.log('FeedNOTInBase');
                        new AddEl()['feed']({item:{id:feed.id}, res:res, err:err});
                      }else{
                        console.log('FeedInBase');
                        new AddEl()['feed']({item:db, res:res, err:err});
                      }
                    }).then(data => {
                      const page = getPageType(document.location.href);
                      console.log(data);
                      if(mainCfg.database.data.online) new HeaderMenu()[data.process]({id:feed.id, target:feed.id, type:'feeds', card:data}).then(res => {
                        if(res){
                          console.log('FEED R', res);
                          if(!page.type) return;
                          if(!mainCfg.feeds['where to react'][page.type]) return;
                          if(!page.type.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)) return;
                          page.type.match(/topic/) ? checkFeeds({fullCheck:true, isFeed:true}) : checkFeeds({fullCheck:true});
                        }
                      });
                    });
                  }).catch(er => {
                    console.log('Error at search...');
                    console.log(er.code, er);
                  });
                };
              }
            },
            ...mainCfg.main.feeds.check.interface.feedButtons.readed ? [{
              type: 'button',
              cName: 'readed',
              text: '✔️',
              title: 'Пометить как "прочитано"',
              onclick: () => {
                new HeaderMenu().addOrUpdate({id:feed.id, type:'feeds', key:'readed'}).then(res => {
                  if(res){
                    console.log('RES IS YO!!!', res);
                    checkFeeds({fullCheck:true, feeds:res.type});
                  }
                  // console.log('Feeds', sData.feeds);
                });
              }
            }] : [],
            ...mainCfg.main.feeds.check.interface.feedButtons['author actions'] ? [{
              type: 'subBtn',
              text: '📓',
              title: 'Действия с автором',
              items: [
                {
                  text: '💘',
                  cName: 'favorite',
                  title: 'Избранный',
                  onclick: () => {
                    new HeaderMenu().addOrUpdate({id:user.id, name:sub.id, type:'users', r:type === 'topic' ? 'topics' : 'blogs', key:'favorite'}).then(res => {
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
            ...mainCfg.main.feeds.check.interface.feedButtons['subsite actions'] ? [{
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
        o.tg.classList.add('btns');
      }
    }

    if(!data) data = {};
    if(mainCfg.database.data.online && mainCfg.database.data.db !== 'none') try{
      if(!mainCfg['database']['keepVars']['feeds'] && !data.feeds) data.feeds = await new Odb()[mainCfg.database.data.db]({
        run: 'get all',
        type: 'feeds'
      });
      if(!mainCfg['database']['keepVars']['users'] && !data.users) data.users = await new Odb()[mainCfg.database.data.db]({
        run: 'get all',
        type: 'users'
      });
      if(!mainCfg['database']['keepVars']['subsites'] && !data.subsites) data.subsites = await new Odb()[mainCfg.database.data.db]({
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

    function chunkReader(chunk){
      for(let i = 0, arr = !fullCheck ? chunk.children : chunk, length = arr.length; i < length; i++){
        // console.log('FEED', arr[i]);
        chk({tg:arr[i]});
      }
      if(!fullCheck){
        const frag = new DocumentFragment();
        // Array.from(chunk.children, (e) => {
        //   console.log('FEED', e);
        //   // frag.appendChild(e);
        // })
        for(let i = 0, arr = chunk.children, len = arr.length; i < len; i++){
          // console.log('FEED', i);
          if(i === len - 1){
            // const ar = Array.from(arr);
            // console.log('AR', ar);
            frag.append(...arr);
          }
          // frag.appendChild(arr[i]);
        }
        console.log('FRAG', frag.children.length);
        chunk.classList.add('checked');
        mainFeed.appendChild(frag);
      }
    }
    // if(!target && !target.children.length > 0) return;
    // console.log('Target', target);
    // console.log('TYYYYYYYYYYPE', Object.prototype.toString.call(target).slice(8, -1).toLowerCase());
    if(isFeed) chk({tg:document.querySelector(`.l-entry.l-island-bg`), isFeed: true});
    if(!fullCheck) for(let ci = 0, chunk = typeOf(target) === 'nodelist' ? target : [target], len = chunk.length; ci < len; ci++){
      console.log('CHUNK', chunk[ci]);
      chunkReader(chunk[ci]);
    }else
    chunkReader(target);
  }
