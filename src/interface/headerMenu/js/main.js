class HeaderMenu{
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
  getTime(d){
    const t = new Date(d);
    return `${t.getFullYear()}/${t.getMonth()+1 < 10 ? `0${t.getMonth()+1}` : t.getMonth()+1}/${t.getDate() < 10 ? `0${t.getDate()}` : t.getDate()} ${t.getHours() < 10 ? `0${t.getHours()}` : t.getHours()}:${t.getMinutes() < 10 ? `0${t.getMinutes()}` : t.getMinutes()}:${t.getSeconds() < 10 ? `0${t.getSeconds()}` : t.getSeconds()}`
  }
  build(o){
    new CtxMenu().build({
      path: document.body,
      header: 'МЕНЮ УПРАВЛЕНИЯ',
      focus: true,
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
        if(mainCfg.database.cfg.data.online){
          if(mainCfg.database.keepVars['subsites'||'users'||'feeds']) try {
            if(!db.name) return;
            if(!o.data.subsites) o.data.subsite = await new Odb().supabase({
              run: 'find',
              type: 'subsites',
              rType: 'object',
              target: o.sID,
              db: db
            });
            if(!o.data.users) o.data.user = await new Odb().supabase({
              run: 'find',
              type: 'users',
              rType: 'object',
              target: o.uID,
              db: db
            });
            if(!o.data.feeds) o.data.feed = await new Odb().supabase({
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
            this.dtfApi({type:'subsite', value:o.sID}).then(res => this.profileCard({path: document.body, e:o.t, offset:o.offset, item:res}));
          }
        }]:[],
        {
          type: 'button',
          text: 'О пользователе',
          onclick: () => {
            this.dtfApi({type:'subsite', value:o.uID}).then(res => this.profileCard({path: document.body, e:o.t, offset:o.offset, item:res}));
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
                this.addOrUpdate({id:o.sID, name:o.sName, type:'subsites', r:'topics', key:'ignored'}).then(res => {
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
                this.addOrUpdate({id:o.sID, name:o.sName, type:'subsites', r:'topics', key:'blocked'}).then(res => {
                  if(res) checkFeeds({fullCheck:true});
                  console.log('Subsite', sData.subsites);
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
                this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'topics', key:'ignored'}).then(res => {
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
                this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'topics', key:'blocked'}).then(res => {
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
                  this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'blogs', key:'favorite'}).then(res => {
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
                  this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'blogs', key:'ignored'}).then(res => {
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
                  this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'blogs', key:'blocked'}).then(res => {
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
                  this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'blogs', key:'favorite'}).then(res => {
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
                  this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'blogs', key:'ignored'}).then(res => {
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
                  this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'blogs', key:'blocked'}).then(res => {
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
                  this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'comments', key:'favorite'}).then(res => {
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
                  this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'comments', key:'ignored'}).then(res => {
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
                  this.addOrUpdate({id:o.uID, name:o.uName, type:'users', r:'comments', key:'blocked'}).then(res => {
                    if(res) checkFeeds({fullCheck:true});
                    console.log('User', sData.users);
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
                this.addOrUpdate({id:o.fID, type:'feeds', key:'planToRead'}).then(res => {
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
                this.addOrUpdate({id:o.fID, type:'feeds', key:'onHold'}).then(res => {
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
                this.addOrUpdate({id:o.fID, type:'feeds', key:'dropped'}).then(res => {
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
                this.addOrUpdate({id:o.fID, type:'feeds', key:'favorite'}).then(res => {
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
                this.addOrUpdate({id:o.fID, type:'feeds', key:'ignored'}).then(res => {
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
                this.addOrUpdate({id:o.fID, type:'feeds', key:'blocked'}).then(res => {
                  if(res) checkFeeds({fullCheck:true});
                  console.log('Feeds', sData.feeds);
                });
              }
            }
          ],
        }]:[]
      ]
    })
  }
  profileCard(c){
    console.log('USER', this.user);
    new El().Div({
      path: o.path,
      cName: 'profileCard',
      tab: -1,
      focus: true,
      // style: `
      //   top: ${(o.offset||0 + 10) + o.e.top + (window.scrollY||window.scrollHeight||0)}px;
      //   left: ${o.e.left}px;`
      // ,
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
