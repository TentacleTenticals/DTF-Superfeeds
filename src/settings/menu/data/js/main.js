initMenu.setData = (m, cfg) => {

  class Types{
    rewriteText({target, text, mode}){
      target.textContent = text ? text : (mode === '++' ? ++target.textContent : --target.textContent);
    }
    clear(e, full){
      if(e.children[0].children[1].children.length > 0) e.children[0].children[1].replaceChildren();
      if(full){
        this.rewriteText({target:e.children[0].children[0].children[0].children[0].children[0], text:'0'});
        this.rewriteText({target:e.children[0].children[0].children[0].children[0].children[1], text:'0'});
        this.rewriteText({target:e.children[0].children[0].children[0].children[1].children[0], text:'0'});
      }
    };
    sortie(t, i){
      if(t === 'all') return true;
      else return i[t];
    }
    id(filter, type, t){
      return !type ? t['name'].match(filter) : t['id'].toString();
    }
    getDate(d){
      let t = new Date(d * 1000);
      return `${t.getFullYear()}-${t.getMonth()+1 < 10 ? `0${t.getMonth()+1}` : t.getMonth()+1}-${t.getDate() < 10 ? `0${t.getDate()}` : t.getDate()}`;
    };
    getTime(d){
      let t = new Date(d * 1000);
      return [t.getHours() < 10 ? `0${t.getHours()}` : t.getHours(), t.getMinutes() < 10 ? `0${t.getMinutes()}` : t.getMinutes()];
    };
    subsites(path, items){
      new Tabber().tabList({
        path: path,
        title: 'SUBSITES',
        tabs: [
          {text:'Все', name:'all'},
          {text:'💘', name:'favorite'},
          {text: '💢', name: 'ignored'},
          {text:'🈲', name:'blocked'}
        ],
        body: (e, panel) => {
          new El().Button({
            path: panel,
            cName: 'load',
            text: 'Загрузить список',
            onclick: async () => {
              this.clear(e, true);
              if(e.parentNode.getAttribute('reload')){
                if(db.name)
                  try{
                    items = await new Odb()[db.name]({
                      run: 'get all',
                      type: 'subsites',
                      db: db
                    })
                  }catch{
                    console.log('Nooooooooope', items);
                  }
                e.parentNode.removeAttribute('reload');
              }
              const search = {
                sort: e.parentNode.getAttribute('picked'),
                type: panel.children[1].children[0].value
              }
              if(!search.sort) return;
      
              console.log(search);
      
              new BookMenu().itemList({
                path: e.children[0],
                target: (() => {
                  if(search.sort === 'all' && search.type === 'all') return (items||mainData.subsites);
                  else return (items||mainData.subsites).filter(i => {
                    return this.sortie(search.sort, i.flags);
                  })
                })(),
                db: db,
                type: 'subsite'
              });
            }
          });
          new El().Button({
            path: panel,
            cName: 'search full nl',
            text: 'Поиск по списку',
            onclick: () => {
              this.clear(e, true);
      
              const search = {
                sort: e.parentNode.getAttribute('picked'),
                name: panel.children[2].children[0].value && new RegExp(panel.children[2].children[0].value, 'i'),
                uType: panel.children[3].children[0].checked,
                desc: panel.children[4].children[0].value && new RegExp(panel.children[4].children[0].value, 'i'),
                date: panel.children[5].children[0].value,
                time: panel.children[6].children[0].value,
                dateFrom: Date.parse(`${panel.children[7].children[0].value} 00:00`)
              };
      
              console.log(search);
      
              new BookMenu().itemList({
                path: e.children[0],
                target: (() => {
                  if(search.sort === 'all' && !search.name && !search.desc && !search.date && !search.time && !search.dateFrom) return (items||mainData.subsites);
                  else return (items||mainData.subsites).filter(i => {
                    return sortie(search.sort, i.flags) && (search.name ? this.id(search.name, false, i.info.name) : true) && (search.desc ? i.info.description : true) && (search.date ? this.getDate(i.info.date).match(search.date) : true) && (search.time ? this.getTime(i.info.date)[0] >= search.time.split(':')[0] && this.getTime(i.info.date)[1] >= search.time.split(':')[1] : true) && (search.dateFrom ? i.info.date*1000 >= search.dateFrom : true)
                  })
                })(),
                type: 'subsite'
              });
      
            }
          })
          new El().Input({
            path: panel,
            label: 'Имя (Rxp)',
            lName: 'full',
            name: 'userName'
          });
          new El().Input({
            path: panel,
            label: 'ID',
            type: 'checkbox',
            value: 'name',
            name: 'userType'
          });
          new El().Input({
            path: panel,
            label: 'Описание (Rxp)',
            lName: 'full',
            name: 'userDesc'
          });
          new El().Input({
            path: panel,
            lName: 'full nl',
            type: 'date',
            label: 'Дата (точная)',
            onRclick: (e) => {
              e.preventDefault();
              e.target.value = '';
              e.target.blur();
            }
          });
          new El().Input({
            path: panel,
            type: 'time',
            label: [],
            onRclick: (e) => {
              e.preventDefault();
              e.target.value = '';
              e.target.blur();
            }
          });
          new El().Input({
            path: panel,
            lName: 'full',
            type: 'date',
            label: '⌚-📅 (начиная с...)',
            onRclick: (e) => {
              e.preventDefault();
              e.target.value = '';
              e.target.blur();
            }
          });
      
          new BookMenu().build({
            path: e
          });
        }
      })
    }
    users(path, items){
      new Tabber().tabList({
        path: path,
        title: 'USERS',
        tabs: [
          {text:'Все', name:'all'},
          {text:'💘', name:'favorite'},
          {text: '💢', name: 'ignored'},
          {text:'🈲', name:'blocked'}
        ],
        body: (e, panel) => {
          new El().Button({
            path: panel,
            cName: 'load',
            text: 'Загрузить список',
            onclick: async () => {
              this.clear(e, true);
              if(e.parentNode.getAttribute('reload')){
                if(db.name) try{
                  items = await new Odb()[db.name]({
                    run: 'get all',
                    type: 'users',
                    db: db
                  })
                }catch{
                  console.log('Nooooooooope', items);
                }
              }
              const search = {
                sort: e.parentNode.getAttribute('picked'),
                type: panel.children[1].children[0].value
              }
              if(!search.sort) return;
      
              console.log(search);
      
              new BookMenu().itemList({
                path: e.children[0],
                target: (() => {
                  if(e.children[0].children[1].children.length > 0) e.children[0].children[1].replaceChildren();
                  if(search.sort === 'all' && search.type === 'all') return (items||mainData.users);
                  else return (items||mainData.users).filter(i => {
                    return this.sortie(search.sort, i.flags);
                  })
                })(),
                db: db,
                type: 'user'
              });
            }
          });
          new El().Button({
            path: panel,
            cName: 'search full nl',
            text: 'Поиск по списку',
            onclick: () => {
              this.clear(e, true);
              const search = {
                sort: e.parentNode.getAttribute('picked'),
                name: panel.children[2].children[0].value && new RegExp(panel.children[2].children[0].value, 'i'),
                uType: panel.children[3].children[0].checked,
                desc: panel.children[4].children[0].value && new RegExp(panel.children[4].children[0].value, 'i'),
                date: panel.children[5].children[0].value,
                time: panel.children[6].children[0].value,
                dateFrom: Date.parse(`${panel.children[7].children[0].value} 00:00`)
              };
      
              console.log(search);
      
              new BookMenu().itemList({
                path: e.children[0],
                target: (() => {
                  if(search.sort === 'all' && !search.name && !search.desc && !search.date && !search.time && !search.dateFrom) return (items||mainData.users);
                  else return (items||mainData.users).filter(i => {
                    return this.sortie(search.sort, i.flags) && (search.name ? this.id(search.name, false, i.info.name) : true) && (search.desc ? i.info.description : true) && (search.date ? this.getDate(i.info.date).match(search.date) : true) && (search.time ? this.getTime(i.info.date)[0] >= search.time.split(':')[0] && this.getTime(i.info.date)[1] >= search.time.split(':')[1] : true) && (search.dateFrom ? i.info.date*1000 >= search.dateFrom : true)
                  })
                })(),
                type: 'user'
              });
      
            }
          })
          new El().Input({
            path: panel,
            label: 'Имя (Rxp)',
            lName: 'full',
            name: 'userName'
          });
          new El().Input({
            path: panel,
            label: 'ID',
            type: 'checkbox',
            value: 'name',
            name: 'userType'
          });
          new El().Input({
            path: panel,
            label: 'Описание (Rxp)',
            lName: 'full',
            name: 'userDesc'
          });
          new El().Input({
            path: panel,
            lName: 'full nl',
            type: 'date',
            label: 'Дата (точная)',
            onRclick: (e) => {
              e.preventDefault();
              e.target.value = '';
              e.target.blur();
            }
          });
          new El().Input({
            path: panel,
            type: 'time',
            label: [],
            onRclick: (e) => {
              e.preventDefault();
              e.target.value = '';
              e.target.blur();
            }
          });
          new El().Input({
            path: panel,
            lName: 'full',
            type: 'date',
            label: '⌚-📅 (начиная с...)',
            onRclick: (e) => {
              e.preventDefault();
              e.target.value = '';
              e.target.blur();
            }
          });
      
          new BookMenu().build({
            path: e
          });
        }
      })
    }
    feeds(path, items){
      new Tabber().tabList({
        path: path,
        title: 'FEEDS',
        titleBtn: true,
        tabs: [
          {text:'Все', name:'all'},
          {text:'Читаю', name:'onHold'},
          {text:'Запланировано', name:'planToRead'},
          {text:'Брошено', name:'dropped'},
          {text:'💘', name:'favorite'},
          {text: '💢', name: 'ignored'},
          {text:'🈲', name:'blocked'}
        ],
        body: (e, panel) => {
          new El().Button({
            path: panel,
            cName: 'load',
            text: 'Загрузить список',
            onclick: async () => {
              this.clear(e, true);
              if(e.parentNode.getAttribute('reload')){
                if(db.name)
                  try{
                    items = await new Odb()[db.name]({
                      run: 'get all',
                      type: 'feeds',
                      db: db
                    })
                  }catch{
                    console.log('Nooooooooope', items);
                  }
                e.parentNode.removeAttribute('reload');
              }
              const search = {
                sort: e.parentNode.getAttribute('picked'),
                type: panel.children[1].children[0].value
              }
              if(!search.sort) return;
      
              console.log(search);
              // 46807
      
              new BookMenu().itemList({
                path: e.children[0],
                target: (() => {
                  if(search.sort === 'all' && search.type === 'all') return (items||mainData.feeds);
                  else return (items||mainData.feeds).filter(i => {
                    return this.sortie(search.sort, i.flags) && (search.type === 'all' ? true : (search.type === 'topics' ? i.info.subsite.id !== i.info.author.id : i.info.subsite.id === i.info.author.id));
                  })
                })(),
                db: db,
                type: 'feed'
              });
            }
          });
          new El().Select({
            path: panel,
            label: 'Тип фидов',
            body: (e) => {
              new El().Options({
                path: e,
                values: [
                  ['Все', 'all'],
                  ['Статьи', 'topics'],
                  ['Блоги', 'blogs']
                ]
              });
            }
          });
          new El().Button({
            path: panel,
            cName: 'search',
            text: 'Поиск по списку',
            onclick: () => {
              this.clear(e, true);
      
              const search = {
                sort: e.parentNode.getAttribute('picked'),
                type: panel.children[1].children[0].value,
                tags: (() => {
                  const res = [];
                  for(let i = 0, arr = panel.children[11].children[0].children, length = arr.length; i < length; i++){
                    if(arr[i].getAttribute('value')) res.push(arr[i].getAttribute('value'));
                  }
                  return res;
                })(),
                ignoreTags: (() => {
                  const res = [];
                  for(let i = 0, arr = panel.children[12].children[0].children, length = arr.length; i < length; i++){
                    if(arr[i].getAttribute('value')) res.push(arr[i].getAttribute('value'));
                  }
                  return res;
                })(),
                tTitle: panel.children[3].children[0].value && new RegExp(panel.children[2].children[0].value, 'i'),
                subsite: panel.children[4].children[0].value && new RegExp(panel.children[4].children[0].value, 'i'),
                sType: panel.children[5].children[0].checked,
                author: panel.children[6].children[0].value && new RegExp(panel.children[6].children[0].value, 'i'),
                aType: panel.children[7].children[0].checked,
                date: panel.children[8].children[0].value,
                time: panel.children[9].children[0].value,
                dateFrom: Date.parse(`${panel.children[10].children[0].value} 00:00`)
              };
      
              console.log(search);
      
              new BookMenu().itemList({
                path: e.children[0],
                target: (() => {
                  if(search.sort === 'all' && search.type === 'all' && !search.tTitle && !search.subsite && !search.author && !search.date && !search.time && !search.dateFrom && !search.tags.length > 0 && !search.ignoreTags.length > 0) return mainData.feeds;
                  else return mainData.feeds.filter(i => {
                    return this.sortie(search.sort, i.flags) && (search.type === 'all' ? true : (search.type === 'topics' ? i.info.subsite.id !== i.info.author.id : i.info.subsite.id === i.info.author.id)) && (search.tTitle ? i.info.title.match(search.tTitle) : true) && (search.subsite ? this.id(search.subsite, search.sType, i.info.subsite) : true) && (search.author ? this.id(search.author, search.aType, i.info.author) : true) && (search.date ? this.getDate(i.info.date).match(search.date) : true) && (search.time ? this.getTime(i.info.date)[0] >= search.time.split(':')[0] && this.getTime(i.info.date)[1] >= search.time.split(':')[1] : true) && (search.dateFrom ? i.info.date*1000 >= search.dateFrom : true) && (search.tags.length > 0 ? search.tags.every(s => {
                      return i.info.keywords.some(t => t.name === s)
                    }) : true) && (search.ignoreTags.length > 0 ? search.ignoreTags.every(s => {
                      return !i.info.keywords.some(t => t.name === s)
                    }) : true)
                  })
                })(),
                type: 'feed'
              });
      
            }
          })
          new El().Input({
            path: panel,
            label: 'Заголовок (Rxp)',
            lName: 'full'
          });
          new El().Input({
            path: panel,
            label: 'Подсайт (Rxp)',
            lName: 'full'
          });
          new El().Input({
            path: panel,
            label: 'ID',
            type: 'checkbox',
            value: 'name',
            name: 'subsiteType'
          })
          new El().Input({
            path: panel,
            label: 'Автор (Rxp)',
            lName: 'full'
          });
          new El().Input({
            path: panel,
            label: 'ID',
            type: 'checkbox',
            value: 'name',
            name: 'authorType'
          })
          new El().Input({
            path: panel,
            lName: 'full nl',
            type: 'date',
            label: 'Дата (точная)',
            onRclick: (e) => {
              e.preventDefault();
              e.target.value = '';
              e.target.blur();
            }
          });
          new El().Input({
            path: panel,
            type: 'time',
            label: [],
            onRclick: (e) => {
              e.preventDefault();
              e.target.value = '';
              e.target.blur();
            }
          });
          new El().Input({
            path: panel,
            lName: 'full',
            type: 'date',
            label: '⌚-📅 (начиная с...)',
            onRclick: (e) => {
              e.preventDefault();
              e.target.value = '';
              e.target.blur();
            }
          });
          new El().List({
            path: panel,
            mode: 'all',
            lName: 'full nl',
            cName: 'tags flex',
            type: 'string',
            title: 'Нажмите на меня для добавления тега',
            label: 'Искать с тегами:',
            focus: true,
            canDel: true,
            onRclick: (e) => {
              e.preventDefault();
              e.currentTarget.replaceChildren();
            }
          })
          new El().List({
            path: panel,
            mode: 'all',
            lName: 'full nl',
            cName: 'tags flex',
            type: 'string',
            title: 'Нажмите на меня для добавления тега',
            label: 'Игнорировать с тегами:',
            focus: true,
            canDel: true,
            onRclick: (e) => {
              e.preventDefault();
              e.currentTarget.replaceChildren();
            }
          })
      
          new BookMenu().build({
            path: e
          })
        }
      })
    }
  }
  new El().Field({
    path: m,
    groupName: 'data',
    cName: 'grid',
    legend: 'Данные',
    info: 'Список сохранённых данных',
    func: (p) => {
      new Tabber().tabList({
        path: p,
        title: 'SAVED INFO',
        tabs: [
          {text:'Фиды', name:'feeds', onclick:() => {
            if(p.children[0].children[3].children.length > 0) p.children[0].children[3].replaceChildren();
            if(db.name){
              new Odb()[db.name]({
                run: 'get all',
                type: 'feeds',
                db: db
              }).then(res => {
                console.log(res);
                if(res.length === 0){
                  console.log(`There's no saved feeds...`);
                  new Types().feeds(p.children[0].children[3]);
                }else{
                  console.log(`Founded saved feeds, loading...`, res[0]);
                  new Types().feeds(p.children[0].children[3], res, db);
                }
              }).catch(err => console.log(err));
            }else{
              console.log(`Loading local data...`);
              new Types().feeds(p.children[0].children[3]);
            }
            // new Types().feeds(p.children[0].children[3]);
          }},
          {text:'Подсайты', name:'subsites', onclick:() => {
            if(p.children[0].children[3].children.length > 0) p.children[0].children[3].replaceChildren();
            if(db.name){
              new Odb()[db.name]({
                run: 'get all',
                type: 'subsites',
                db: db
              }).then(res => {
                console.log(res);
                if(res.length === 0){
                  console.log(`There's no saved subsites...`);
                  new Types().subsites(p.children[0].children[3]);
                }else{
                  console.log(`Founded saved subsites, loading...`, res[0]);
                  new Types().subsites(p.children[0].children[3], res, db);
                }
              }).catch(err => console.log(err));
            }else{
              console.log(`Loading local data...`);
              new Types().subsites(p.children[0].children[3]);
            }
          }},
          {text:'Пользователи', name:'users', onclick:() => {
            if(p.children[0].children[3].children.length > 0) p.children[0].children[3].replaceChildren();
            if(db.name){
              new Odb()[db.name]({
                run: 'get all',
                type: 'users',
                db: db
              }).then(res => {
                console.log(res);
                if(res.length === 0){
                  console.log(`There's no saved users...`);
                  new Types().users(p.children[0].children[3]);
                }else{
                  console.log(`Founded saved users, loading...`, res[0]);
                  new Types().users(p.children[0].children[3], res, db);
                }
              }).catch(err => console.log(err));
            }else{
              console.log(`Loading local data...`);
              new Types().users(p.children[0].children[3]);
            }
          }}
        ]
      })
    }
  });
}
