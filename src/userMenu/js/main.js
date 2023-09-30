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
  add({id, tId, data, type, r, key, info}){
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
            }
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
            }
          };
          if(info) obj.flags[r] = info.flags;
          else
          obj.flags[r][key] ? obj.flags[r][key] = false : obj.flags[r][key] = true;
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
              })()
            }
          }
          if(info) obj.flags = info.flags;
          else
          obj.flags[key] ? obj.flags[key] = false : obj.flags[key] = true;
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
  update({id, item, type, r, key}){
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
            flags: structuredClone(item.flags),
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
              })()
            }
          }

          item.flags[key] ? item.flags[key] = false : item.flags[key] = true;
          flagsCheck();
          result({status:'success', type:type, run:'update', id:id, item:item});
        });
      }
    });
  }
  getValue(item, type, r, key){
    return [type][item].flags[r][key];
  }
  findOrAdd({id, type, r, key}){
    const check = (data) => {
      console.log('dt', data);
      return new Promise((result, error) => {
        // console.log('findOrAdd DATA', data);
        const user = (data||sData)[type].findIndex(e => e.id === id);
        // const user = (data||sData[type]).findIndex(e => e.id === id);
        // console.log('USER', user);
        if(user !== -1){
          this.update({data:(data||sData), item:(data||sData)[type][user], id:id, type:type, r:r, key:key}).then(i => {
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
          this.add({data:(data||sData), item:(data||sData)[type][user], id:id, type:type, r:r, key:key}).then(i => {
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
          if(data.length > 0) return check({[type]:data});
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
                    const page = getPageType(document.location.href);
                    if(res && page.type.match(/popular|^new$|^my new$|bookmarks|topic/)){
                      if(mainCfg.feeds['where to react'][page.type]) checkFeeds({fullCheck:true});
                    }
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
                    const page = getPageType(document.location.href);
                    if(res && page && mainCfg.feeds['where to react'][page.type]) checkFeeds({fullCheck:true});
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
