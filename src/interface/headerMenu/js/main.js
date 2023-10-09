class HeaderMenu{
  dtfApi(o){
    switch(o.type){
      case 'news':{
        o.s = 'news';
      }
      break;
      case ('subsites'||'users'):{
        o.s = 'subsite';
        o.v = 'id';
      }
      break;
      case 'feeds':{
        o.s = 'content';
        o.v = 'id';
      }
      break;
      case 'subscribers':{
        o.s = 'subsite/subscribers';
        o.v = 'subsiteId';
      }
      break;
      case 'subscriptions':{
        o.s = 'subsite/subscriptions';
        o.v = 'subsiteId';
      }
      break;
      case 'comments':{
        o.s = 'comments';
        o.v = 'contentId';
      }
      break;
      case 'bookmarks':{
        o.s = 'bookmarks';
      }
    }
    return fetch(`https://api.dtf.ru/v2.31/${o.s && o.s+'?'||''}${o.v||''}${o.value && '='+o.value||''}`, {
      headers: {
        'accept': 'application/json',
        ...(o.token ? {'X-Device-Token':`'${o.token}'`} : {})
      }
    }).then(r => r.json().then(rr => rr.result)).catch(err => err);
  }
  getTime(d){
    const t = new Date(d);
    return `${t.getFullYear()}/${t.getMonth()+1 < 10 ? `0${t.getMonth()+1}` : t.getMonth()+1}/${t.getDate() < 10 ? `0${t.getDate()}` : t.getDate()} ${t.getHours() < 10 ? `0${t.getHours()}` : t.getHours()}:${t.getMinutes() < 10 ? `0${t.getMinutes()}` : t.getMinutes()}:${t.getSeconds() < 10 ? `0${t.getSeconds()}` : t.getSeconds()}`
  }
  add(o){
    return new Promise((result, error) => {
      if(o.type.match(/users|subsites/)){
        let obj;
        this.dtfApi({type:o.type, value:o.id}).then(res => {
          if(o.type === 'users') obj = {
            id: o.id,
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
              ,
              ...o.card ? o.card.info : {}
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
            ...o.card ? o.card.flags : {}
          };
          else
          if(o.type === 'subsites') obj = {
            id: o.id,
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
              }||'',
              ...o.card ? o.card.info : {}
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
            ...o.card ? o.card.flags : {}
          };
          if(!o.card) obj.flags[o.r][o.key] ? obj.flags[o.r][o.key] = false : obj.flags[o.r][o.key] = true;
          if(mainCfg['database']['keepVars'][o.type]) o.data[o.type].push(obj);
          result({status:'success', process:'adding item', type:o.type, id:o.id, item:obj});
        });
      }else
      if(o.type.match(/feeds/)){
        this.dtfApi({type:o.type, value:o.id}).then(res => {
          const obj = {
            id: o.id,
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
                id: res.author.o.id,
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
              ...o.card ? o.card.info : {}
            },
            ...o.card ? {flags:o.card.flags} : {}
          }
          if(!o.card) obj.flags[o.key] ? obj.flags[o.key] = false : obj.flags[o.key] = true;
          if(mainCfg['database']['keepVars'][o.type]) o.data[o.type].push(obj);
          result({status:'success', process:'adding item', type:o.type, id:o.id, item:obj});
          // checkFeeds({fullCheck:true});
        });
      }else
      if(o.type.match(/comments/)){
        console.log('IDs', o.id);
        this.dtfApi({type:o.type, value:o.id}).then(res => {
          console.log('RES', res);
          const cmt = res.items.find(e => e.id === o.tId);
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
          obj.flags[o.key] ? obj.flags[o.key] = false : obj.flags[o.key] = true;
          console.log('DATA', o.data);
          console.log('DATA TYPE', o.data[o.type]);
          if(mainCfg['database']['keepVars'][o.type]) o.data[o.type].push(obj);
          result({status:'success', type:o.type, run:'add', id:o.tId, item:obj});
          // checkFeeds({fullCheck:true});
        });
      }
    });
  }
  update(o){
    function flagsCheck(){
      if(o.type.match(/users|subsites/)){
        if(!o.item.flags[o.r][o.key]) return;
        // console.log('ITEM RULES', o.item.flags[o.r]);
        switch(o.key){
          case 'favorite':{
            o.item.flags[o.r].ignored = false;
            o.item.flags[o.r].blocked = false;
          }
          break;
          case 'ignored':{
            o.item.flags[o.r].favorite = false;
            o.item.flags[o.r].blocked = false;
          }
          break;
          case 'blocked':{
            o.item.flags[o.r].favorite = false;
            o.item.flags[o.r].ignored = false;
          }
          break;
        }
      }else
      if(o.type.match(/feeds/)){
        // console.log('ITEM RULES', o.item.flags);
        if(!o.item.flags[o.key]) return;
        switch(o.key){
          case 'favorite':{
            o.item.flags.ignored = false;
            o.item.flags.blocked = false;
          }
          break;
          case 'ignored':{
            o.item.flags.favorite = false;
            o.item.flags.blocked = false;
          }
          break;
          case 'blocked':{
            o.item.flags.favorite = false;
            o.item.flags.ignored = false;
          }
          break;
          case 'readed':{
            o.item.flags.planToRead = false;
            o.item.flags.onHold = false;
            o.item.flags.dropped = false;
          }
          break;
          case 'planToRead':{
            o.item.flags.readed = false;
            o.item.flags.onHold = false;
            o.item.flags.dropped = false;
          }
          break;
          case 'onHold':{
            o.item.flags.readed = false;
            o.item.flags.planToRead = false;
            o.item.flags.dropped = false;
          }
          break;
          case 'dropped':{
            o.item.flags.readed = false;
            o.item.flags.planToRead = false;
            o.item.flags.onHold = false;
          }
          break;
        }
      }
    }
    return new Promise((result, error) => {
      if(o.type.match(/users|subsites/)){
        let obj;
        this.getUser(o.id).then(res => {
          if(o.type === 'users'){
            obj = {
              id: o.id,
              flags: o.card ? o.card.flags : structuredClone(o.item.flags),
              info: {
                name: res.subsite.name,
                created: res.subsite.created,
                description: res.subsite.description,
                avatar: res.subsite.avatar ? {
                  type: res.subsite.avatar.type,
                  data: {
                    type: res.subsite.avatar.data.type,
                    uuid: res.subsite.avatar.data.uuid
                  }
                } : '',
                ...o.card ? o.card.info : {}
              }
            };
          }else{
            obj = {
              id: o.id,
              flags: o.card ? o.card.flags : structuredClone(o.item.flags),
              info: {
                name: res.subsite.name,
                created: res.subsite.created,
                description: res.subsite.description,
                avatar: res.subsite.avatar ? {
                  type: res.subsite.avatar.type,
                  data: {
                    type: res.subsite.avatar.data.type,
                    uuid: res.subsite.avatar.data.uuid
                  }
                } : '',
                ...o.card ? o.card.info : {}
              }
            };
          }

          if(!o.card){
            o.item.flags[o.r][o.key] ? o.item.flags[o.r][o.key] = false : o.item.flags[o.r][o.key] = true;
            flagsCheck();
          }
          result({status:'success', process:'item update', type:o.type, id:o.id, item:obj});
        });
      }else{
        this.getFeed(o.id).then(res => {
          const obj = {
            id: o.id,
            flags: o.card ? o.card.flags : structuredClone(o.item.flags),
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
              ...o.card ? o.card.info : {}
            }
          }

          if(!o.card){
            o.item.flags[o.key] ? o.item.flags[o.key] = false : o.item.flags[o.key] = true;
            flagsCheck();
          }
          result({status:'success', process:'item update', type:o.type, id:o.id, item:obj});
        });
      }
    });
  }
  addOrUpdate(o){
    const check = (item) => {
      console.log('dt', item);
      return new Promise((result, error) => {
        let user;
        // console.log('addOrUpdate DATA', data);
        if(!item) user = sData[o.type].findIndex(e => e.id === o.id);
        // const user = (data||sData[o.type]).findIndex(e => e.id === o.id);
        // console.log('USER', user);
        if(item||user !== -1){
          this.update({item:item||sData[o.type][user], id:o.id, type:o.type, r:o.r, key:o.key, card:o.card}).then(i => {
            if(mainCfg.database.data.online && mainCfg.database.data.db !== 'none') new Odb()[mainCfg.database.data.db]({
              run: 'addOrUpdate',
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
              result({status:'success', process:'update db'});
            }).catch(er => {
              console.log('Error at addOrUpdate...');
              console.log(er.code, er);
            });
            else
            result({status:'success', process:'update'});
          });
        }else
          this.add({data:sData, item:item||sData[o.type][user], id:o.id, type:o.type, r:o.r, key:o.key, card:o.card}).then(i => {
            if(mainCfg.database.data.online && mainCfg.database.data.db !== 'none') new Odb()[mainCfg.database.data.db]({
              run: 'addOrUpdate',
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
              result({status:'success', process:'add db'});
            }).catch(er => {
              console.log('Error at addOrUpdate...');
              console.log(er.code, er);
            });
            else
            result({status:'success', process:'add'});
          });
      })
    }
    if(mainCfg.database.data.online && mainCfg.database.data.db !== 'none'){
      if(!mainCfg['database']['keepVars'][o.type]){
        return new Odb()[mainCfg.database.data.db]({
          run: 'find',
          type: o.type,
          rType: 'object',
          item: o.id
        }).then(item => {
          if(item) return check(o.type);
          else
          return check();
        }).catch(err => console.log('Find error!!!', err));
        // user = await new Odb().supabase({
        //   run: 'find',
        //   type: o.type,
        //   target: o.id
        // });
        // if(user && !user.length > 0) user = -1;
      }else{
        return check();
      }
    }else
    return check();
    // console.log('DATA', data);
  }
  build(o){
    function upd(type, run){
      if(!mainCfg.database.data.online && !mainCfg.database.keepVars[type]) return run();
      else
      new Odb()[mainCfg.database.data.db]({
        run: 'get all',
        type: type
      }).then(db => {
        if(!db){
          run();
        }else{
          sData[type] = db;
          run();
        }
      });
    }
    new CtxMenu().build({
      path: document.body,
      header: 'МЕНЮ УПРАВЛЕНИЯ',
      focus: true,
      rect: o.rect,
      offset: o.offset,
      // load: true,
      // autohide: true,
      onblur: (m) => {
        setTimeout(() => {
          m.remove();
          if(o.res) o.err('Menu closed!');
        }, 500);
      },
      loadText: 'Load...',
      func: async (m) => {
        console.log('CC', o);
        // o.res('ok');
        if(!o.data) o.data = {};
        if(mainCfg.database.data.online && mainCfg.database.data.db !== 'none'){
          if(mainCfg.database.keepVars['subsites'||'users'||'feeds']) try {
            if(!db.name) return;
            if(!o.data.subsites) o.data.subsite = await new Odb()[mainCfg.database.data.db]({
              run: 'find',
              type: 'subsites',
              rType: 'object',
              target: o.sID,
              db: db
            });
            if(!o.data.users) o.data.user = await new Odb()[mainCfg.database.data.db]({
              run: 'find',
              type: 'users',
              rType: 'object',
              target: o.uID,
              db: db
            });
            if(!o.data.feeds) o.data.feed = await new Odb()[mainCfg.database.data.db]({
              run: 'find',
              type: 'feeds',
              rType: 'object',
              target: o.fID,
              db: db
            });
            m.res('ok');
          }catch(err){
            console.log('ERR', err);
          }
        }

        this.subsite=o.data.subsite||(o.data.subsites||sData.subsites).find(el => el.id === o.sID.toString());
        this.user=o.data.user||(o.data.users||sData.users).find(el => el.id === o.uID.toString());
        this.feed=o.data.feed||(o.data.feeds||sData.feeds).find(el => el.id === o.fID.toString());
        console.log('USER', this.user);
      },
      items: [
        {
          type: 'separator',
          text: 'Инфо ❓'
        },
        ...o.type.match(/^(feed|db-feed)$/) ? [{
          type: 'button',
          text: 'О подсайте',
          onclick: () => {
            this.dtfApi({type:'subsite', value:o.sID}).then(res => this.profileCard({path: document.body, e:o.t, autohide:true, offset:o.offset, item:res}));
          }
        }]:[],
        {
          type: 'button',
          text: 'О пользователе',
          onclick: () => {
            this.dtfApi({type:'subsite', value:o.uID}).then(res => this.profileCard({path: document.body, e:o.t, autohide:true, offset:o.offset, item:res}));
          }
        },

        // ПОДСАЙТ
        ...o.type.match(/^(feed|db-feed)$/) ? [{
          type: 'separator',
          text: 'ПОДСАЙТЫ 📚'
        },
        {
          type: 'button',
          title: 'Сохранить/Обновить',
          text: '💾',
          onclick: () => {
            new Promise((res, err) => {
              new AddEl()['subsite']({item:{id:o.sID}, res:res, err:err});
            }).then(data => {
              console.log(data);
              if(data){
                this.addOrUpdate({id:o.sID, name:o.sName, type:'subsites', card:data}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('subsites', checkFeeds({fullCheck:true}));
                      console.log('Subsite', sData.subsites);
                    }
                  }
                });
              }
            });
          }
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
                this.addOrUpdate({id:o.sID, name:o.sName, type:'subsites', r:'topics', key:'favorite'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('subsites', checkFeeds({fullCheck:true}));
                      console.log('Subsite', sData.subsites);
                    }
                  }
                });
              }
            },
            {
              type: 'button',
              title: 'Игноровано',
              cName: (this.subsite && this.subsite.flags.topics.ignored) ? 'button ignored' : 'button',
              text: '💢',
              onclick: () => {
                this.addOrUpdate({id:o.sID, name:o.sName, type:'subsites', r:'topics', key:'ignored'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('subsites', checkFeeds({fullCheck:true}));
                      console.log('Subsite', sData.subsites);
                    }
                  }
                });
              }
            },
            {
              type: 'button',
              title: 'Блокировано',
              cName: (this.subsite && this.subsite.flags.topics.blocked) ? 'button blocked' : 'button',
              text: '🈲',
              onclick: () => {
                this.addOrUpdate({id:o.sID, name:o.sName, type:'subsites', r:'topics', key:'blocked'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('subsites', checkFeeds({fullCheck:true}));
                      console.log('Subsite', sData.subsites);
                    }
                  }
                });
              }
            }
          ],
        }]:[],
        // ПОЛЬЗОВАТЕЛЬ
        ...o.type.match(/^(feed|db-feed|db-user)$/) ? [{
          type: 'separator',
          text: 'ПОЛЬЗОВАТЕЛИ 📚'
        },
        {
          type: 'button',
          title: 'Сохранить/Обновить',
          text: '💾',
          onclick: () => {
            new Promise((res, err) => {
              new AddEl()['user']({item:{id:o.uID}, res:res, err:err});
            }).then(data => {
              console.log(data);
              if(data){
                this.addOrUpdate({id:o.sID, name:o.sName, type:'users', card:data}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('users', checkFeeds({fullCheck:true}));
                      console.log('user', sData.users);
                    }
                  }
                });
              }
            });
          }
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
                this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'topics', key:'favorite'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('users', checkFeeds({fullCheck:true}));
                      console.log('User', sData.users);
                    }
                  }
                });
              }
            },
            {
              type: 'button',
              title: 'Игноровано',
              cName: (this.user && this.user.flags.topics.ignored) ? 'button ignored' : 'button',
              text: '💢',
              onclick: () => {
                this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'topics', key:'ignored'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('users', checkFeeds({fullCheck:true}));
                      console.log('User', sData.users);
                    }
                  }
                });
              }
            },
            {
              type: 'button',
              title: 'Блокировано',
              cName: (this.user && this.user.flags.topics.blocked) ? 'button blocked' : 'button',
              text: '🈲',
              onclick: () => {
                this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'topics', key:'blocked'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('users', checkFeeds({fullCheck:true}));
                      console.log('User', sData.users);
                    }
                  }
                });
              }
            }
          ]
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
                this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'blogs', key:'favorite'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('users', checkFeeds({fullCheck:true}));
                      console.log('User', sData.users);
                    }
                  }
                });
              }
            },
            {
              type: 'button',
              title: 'Игноровано',
              cName: (this.user && this.user.flags.blogs.ignored) ? 'button ignored' : 'button',
              text: '💢',
              onclick: () => {
                this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'blogs', key:'ignored'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('users', checkFeeds({fullCheck:true}));
                      console.log('User', sData.users);
                    }
                  }
                });
              }
            },
            {
              type: 'button',
              title: 'Блокировано',
              cName: (this.user && this.user.flags.blogs.blocked) ? 'button blocked' : 'button',
              text: '🈲',
              onclick: () => {
                this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'blogs', key:'blocked'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('users', checkFeeds({fullCheck:true}));
                      console.log('User', sData.users);
                    }
                  }
                });
              }
            }
          ]
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
                this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'blogs', key:'favorite'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('users', checkFeeds({fullCheck:true}));
                      console.log('User', sData.users);
                    }
                  }
                });
              }
            },
            {
              type: 'button',
              title: 'Игноровано',
              cName: (this.user && this.user.flags.blogs.ignored) ? 'button ignored' : 'button',
              text: '💢',
              onclick: () => {
                this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'blogs', key:'ignored'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('users', checkFeeds({fullCheck:true}));
                      console.log('User', sData.users);
                    }
                  }
                });
              }
            },
            {
              type: 'button',
              title: 'Блокировано',
              cName: (this.user && this.user.flags.blogs.blocked) ? 'button blocked' : 'button',
              text: '🈲',
              onclick: () => {
                this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'blogs', key:'blocked'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('users', checkFeeds({fullCheck:true}));
                      console.log('User', sData.users);
                    }
                  }
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
                this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'comments', key:'favorite'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('users', checkFeeds({fullCheck:true}));
                      console.log('User', sData.users);
                    }
                  }
                });
              }
            },
            {
              type: 'button',
              title: 'Игноровано',
              cName: (this.user && this.user.flags.comments.ignored) ? 'button ignored' : 'button',
              text: '💢',
              onclick: () => {
                this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'comments', key:'ignored'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('users', checkFeeds({fullCheck:true}));
                      console.log('User', sData.users);
                    }
                  }
                });
              }
            },
            {
              type: 'button',
              title: 'Блокировано',
              cName: (this.user && this.user.flags.comments.blocked) ? 'button blocked' : 'button',
              text: '🈲',
              onclick: () => {
                this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'comments', key:'blocked'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('users', checkFeeds({fullCheck:true}));
                      console.log('User', sData.users);
                    }
                  }
                });
              }
            }
          ],
        }]:[],
        // ФИДЫ
        ...o.type.match(/^(feed|db-feed)$/) ? [{
          type: 'separator',
          text: 'ФИДЫ 📚'
        },
        {
          type: 'button',
          title: 'Сохранить/Обновить',
          text: '💾',
          onclick: () => {
            new Promise((res, err) => {
              new AddEl()['feed']({item:{id:o.fID}, res:res, err:err});
            }).then(data => {
              console.log(data);
              if(data){
                this.addOrUpdate({id:o.sID, name:o.sName, type:'feeds', card:data}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('feeds', checkFeeds({fullCheck:true}));
                      console.log('feed', sData.feeds);
                    }
                  }
                });
              }
            });
          }
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
                this.addOrUpdate({id:o.fID, type:'feeds', key:'readed'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('feeds', checkFeeds({fullCheck:true}));
                      console.log('Feed', sData.feeds);
                    }
                  }
                });
              }
            },
            {
              type: 'button',
              title: 'Прочту',
              cName: this.feeds && this.feeds.flags.planToRead ? 'btn planToRead':'btn',
              text: '📚',
              onclick: () => {
                this.addOrUpdate({id:o.fID, type:'feeds', key:'planToRead'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('feeds', checkFeeds({fullCheck:true}));
                      console.log('Feed', sData.feeds);
                    }
                  }
                });
              }
            },
            {
              type: 'button',
              title: 'Читаю',
              cName: this.feeds && this.feeds.flags.onHold ? 'btn onHold':'btn',
              text: '📖',
              onclick: () => {
                this.addOrUpdate({id:o.fID, type:'feeds', key:'onHold'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('feeds', checkFeeds({fullCheck:true}));
                      console.log('Feed', sData.feeds);
                    }
                  }
                });
              }
            },
            {
              type: 'button',
              title: 'Брошено',
              cName: this.feeds && this.feeds.flags.dropped ? 'btn dropped':'btn',
              text: '❌',
              onclick: () => {
                this.addOrUpdate({id:o.fID, type:'feeds', key:'dropped'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('feeds', checkFeeds({fullCheck:true}));
                      console.log('Feed', sData.feeds);
                    }
                  }
                });
              }
            },
            {
              type: 'button',
              title: 'Избранное',
              cName: this.feeds && this.feeds.flags.favorite ? 'btn favorite':'btn',
              text: '💘',
              onclick: () => {
                this.addOrUpdate({id:o.fID, type:'feeds', key:'favorite'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('feeds', checkFeeds({fullCheck:true}));
                      console.log('Feed', sData.feeds);
                    }
                  }
                });
              }
            },
            {
              type: 'button',
              title: 'Игноровано',
              cName: this.feeds && this.feeds.flags.ignored ? 'btn ignored':'btn',
              text: '💢',
              onclick: () => {
                this.addOrUpdate({id:o.fID, type:'feeds', key:'ignored'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('feeds', checkFeeds({fullCheck:true}));
                      console.log('Feed', sData.feeds);
                    }
                  }
                });
              }
            },
            {
              type: 'button',
              title: 'Блокировано',
              cName: this.feeds && this.feeds.flags.blocked ? 'btn blocked':'btn',
              text: '🈲',
              onclick: () => {
                this.addOrUpdate({id:o.fID, type:'feeds', key:'blocked'}).then(res => {
                  if(!res){
                    return;
                  }else{
                    const page = getPageType(document.location.href).type;
                    if(page && page.match(/popular|^new$|^my new$|bookmarks|subsite|userpage|topic/)){
                      upd('feeds', checkFeeds({fullCheck:true}));
                      console.log('Feed', sData.feeds);
                    }
                  }
                });
              }
            }
          ],
        }]:[]
      ]
    })
  }
  profileCard(o){
    console.log('USER', this.user);
    new El().Div({
      path: o.path,
      cName: 'profileCard',
      tab: -1,
      focus: true,
      style: `
        top: ${(o.offset||0 + 10) + o.e.top + (window.scrollY||window.scrollHeight||0)}px;
        left: ${o.e.left}px;`
      ,
      onblur: (e) => {
        if(!o.autohide) return;
        setTimeout(() => {
          e.target.remove();
        }, 1000);
      },
      func: (m) => {
        attachment({
          path: m,
          type: 'cover',
          i: o.item.subsite.cover
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
              i: o.item.subsite.avatar
            });

            new El().List({
              path: l,
              cName: 'itemsList',
              items: [
                {
                  text: `🏷️ ${o.item.subsite.name}`,
                  title: 'Имя'
                },
                {
                  text: `📅 ${this.getTime(o.item.subsite.created * 1000)}`,
                  title: 'Создан'
                },
                {
                  text: `📊 ${o.item.subsite.rating}`,
                  title: 'Рейтинг',
                  cName: o.item.subsite.rating > 0 ? 'positive' : 'negative'
                },
                {
                  text: `📔 ${o.item.subsite.description}`,
                  title: 'Описание',
                  cName: 'texter scrollLite'
                },
                {
                  text: '🔗\uFE0E',
                  btn: [
                    {
                      text: 'Профиль',
                      onclick: () => {
                        window.open(o.item.subsite.url, '_blank');
                      }
                    },
                    ...o.item.subsite.avatar ? [{
                      text: 'Аватар',
                      onclick: () => {
                        window.open(`https://leonardo.osnova.io/${o.item.subsite.avatar.data.uuid}`, '_blank');
                      }
                    }] : [],
                    ...o.item.subsite.cover ? [{
                      text: 'Cover',
                      onclick: () => {
                        window.open(`https://leonardo.osnova.io/${o.item.subsite.cover.data.uuid}`, '_blank');
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
                  title: o.item.subsite.isOnline ? 'Онлайн' : 'Оффлайн',
                  cName: !o.item.subsite.isOnline && 'off',
                  text: '📶\uFE0E'
                },
                {
                  title: o.item.subsite.isPlus && 'Плюс',
                  cName: !o.item.subsite.isPlus && 'off',
                  text: '➕\uFE0E'
                },
                {
                  title: o.item.subsite.isPro && 'Про',
                  cName: !o.item.subsite.isPro && 'off',
                  text: '💼\uFE0E'
                },
                {
                  title: o.item.subsite.isVerified && 'Подтверждён',
                  cName: !o.item.subsite.isVerified && 'off',
                  text: '✔️\uFE0E'
                }
              ]
            });

            if(this.user){
              new El().List({
                path: m,
                label: 'Статьи',
                lName: 'hor',
                cName: 'itemsList hor fs10px',
                items: [
                  {
                    title: this.user.flags.topics.favorite && 'Избранный',
                    cName: !this.user.flags.topics.favorite && 'off',
                    text: '💘'
                  },
                  {
                    title: this.user.flags.topics.ignored && 'Игнорируется',
                    cName: !this.user.flags.topics.ignored && 'off',
                    text: '💢'
                  },
                  {
                    title: this.user.flags.topics.blocked && 'Блокируется',
                    cName: !this.user.flags.topics.blocked && 'off',
                    text: '🈲'
                  }
                ]
              });

              new El().List({
                path: m,
                label: 'Блоги',
                lName: 'hor',
                cName: 'itemsList hor fs10px',
                items: [
                  {
                    title: this.user.flags.blogs.favorite && 'Избранный',
                    cName: !this.user.flags.blogs.favorite && 'off',
                    text: '💘'
                  },
                  {
                    title: this.user.flags.blogs.ignored && 'Игнорируется',
                    cName: !this.user.flags.blogs.ignored && 'off',
                    text: '💢'
                  },
                  {
                    title: this.user.flags.blogs.blocked && 'Блокируется',
                    cName: !this.user.flags.blogs.blocked && 'off',
                    text: '🈲'
                  }
                ]
              });

              new El().List({
                path: m,
                label: 'Комментарии',
                lName: 'hor',
                cName: 'itemsList hor fs10px',
                items: [
                  {
                    title: this.user.flags.comments.favorite && 'Избранный',
                    cName: !this.user.flags.comments.favorite && 'off',
                    text: '💘'
                  },
                  {
                    title: this.user.flags.comments.ignored && 'Игнорируется',
                    cName: !this.user.flags.comments.ignored && 'off',
                    text: '💢'
                  },
                  {
                    title: this.user.flags.comments.blocked && 'Блокируется',
                    cName: !this.user.flags.comments.blocked && 'off',
                    text: '🈲'
                  }
                ]
              });
            }

            new El().List({
              path: m,
              cName: 'itemsList',
              items: [
                {
                  title: 'Комментариев',
                  text: `📜\uFE0E ${o.item.subsite.counters.comments}`
                },
                {
                  title: 'Статей',
                  text: `📰\uFE0E ${o.item.subsite.counters.entries}`
                },
                {
                  title: 'Подписчиков',
                  text: `🔭\uFE0E ${o.item.subsite.counters.subscribers}`
                },
                {
                  title: 'Подписок',
                  text: `📬\uFE0E ${o.item.subsite.counters.subscriptions}`
                }
              ]
            })
          }
        });
      }
    });
  }
}
