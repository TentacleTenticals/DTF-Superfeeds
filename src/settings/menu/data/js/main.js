initMenu.setData = (m, cfg) => {

  class Types{
    rewriteText({target, text, mode}){
      target.textContent = text ? text : (mode === '++' ? ++target.textContent : --target.textContent);
    }
    sortByValue(a, b, value, search){
      if(!search) return a.info[value] < b.info[value] ? 1 : -1;
      else
      if(search) return a.info[value] > b.info[value] ? 1 : -1;
    }
    clear(e, full){
      if(e.children[0].children[1].children.length > 0) e.children[0].children[1].replaceChildren();
      if(full){
        this.rewriteText({target:e.children[0].children[0].children[0].children[0].children[0], text:'0'});
        this.rewriteText({target:e.children[0].children[0].children[0].children[0].children[1], text:'0'});
        this.rewriteText({target:e.children[0].children[0].children[0].children[1].children[0], text:'0'});
      }
    };
    sortie(t, flag, type){
      if(flag === 'all' && (!type||type === 'all')) return true;
      else
      if(flag !== 'all' && type && type !== 'all'){
        return t[type][flag];
      }else
      if(flag === 'all' && type && type !== 'all'){
        // console.log('T', t[type])
        for(let i in t[type]){
          if(t[type][i]) return true;
        }
      }else
      if(flag !== 'all' && type && type === 'all'){
        for(let i in t){
          // console.log('I', i)
          // console.log('T', t[i][flag])
          if(t[i][flag]) return true;
        }
      }else
      return t[flag];
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
        cName: 'hor',
        title: 'SUBSITES',
        titleBtn: true,
        tabs: [
          {text:'Все', name:'all'},
          {text:'💘', name:'favorite'},
          {text: '💢', name: 'ignored'},
          {text:'🈲', name:'blocked'},
        ],
        body: (e, panel) => {
          new El().Button({
            path: panel,
            cName: 'load',
            text: 'Загрузить список',
            onclick: async () => {
              this.clear(e, true);
              if(e.previousElementSibling.getAttribute('reload')){
                if(mainCfg.database.data.online && mainCfg.database.data.db !== 'none')
                  try{
                    items = await new Odb()[mainCfg.database.data.db]({
                      run: 'get all',
                      type: 'subsites',
                      db: db
                    })
                  }catch{
                    console.log('Nooooooooope', items);
                  }
                e.previousElementSibling.removeAttribute('reload');
              }
              const search = {
                sort: e.previousElementSibling.getAttribute('picked'),
                type: panel.children[1].children[0].value,
                sortByDate: panel.children[2].children[0].checked
              }
              if(!search.sort) return;
      
              console.log(search);;
              // 46807
      
              new BookMenu().itemList({
                path: e.children[0],
                target: (() => {
                  if(search.sort === 'all' && search.type === 'all') return (items||sData.subsites).sort((a, b) => this.sortByValue(a, b, 'created', search.sortByDate))
                  else return (items||sData.subsites).filter(i => this.sortie(i.flags, search.sort, search.type)).sort((a, b) => this.sortByValue(a, b, 'created', search.sortByDate));
                })(),
                db: db,
                type: 'subsite'
              });
            }
          });

          new El().Select({
            path: panel,
            label: 'Тип',
            body: (e) => {
              new El().Options({
                path: e,
                values: [
                  ['Все', 'all'],
                  ['Статьи', 'topics'],
                  ['Блоги', 'blogs'],
                  ['Комментарии', 'comments']
                ]
              });
            }
          });
          new El().Input({
            path: panel,
            type: 'checkbox',
            label: '🔃',
            name: 'sort',
            lName: 'full',
            onchange: (e) => {
              e.target.parentNode.classList.toggle('active');
            }
          });
          new El().Button({
            path: panel,
            cName: 'srch',
            text: 'Поиск по списку',
            onclick: () => {
              this.clear(e, true);
      
              const search = {
                sort: e.previousElementSibling.getAttribute('picked'),
                type: panel.children[1].children[0].value,
                sortByDate: panel.children[2].children[0].checked,
                name: panel.children[4].children[0].value && new RegExp(panel.children[4].children[0].value, 'i'),
                nType: panel.children[5].children[0].checked,
                description: panel.children[6].children[0].value && new RegExp(panel.children[6].children[0].value, 'i'),
                comment: panel.children[7].children[0].value && new RegExp(panel.children[7].children[0].value, 'i'),
                date: panel.children[8].children[0].value,
                time: panel.children[9].children[0].value,
                dateFrom: Date.parse(`${panel.children[10].children[0].value} 00:00`)
              };
      
              console.log(search);
      
              new BookMenu().itemList({
                path: e.children[0],
                target: (() => {
                  if(search.sort === 'all' && search.type === 'all' && !search.name && !search.description && !search.comment && !search.date && !search.time && !search.dateFrom) return (items||sData.subsites).sort((a, b) => this.sortByValue(a, b, 'created', search.sortByDate));
                  else return (items||sData.subsites).filter(i => {
                    return this.sortie(i.flags, search.sort, search.type) && (search.name ? i.info.name.match(search.name) : true) && (search.name ? this.id(search.name, search.nType, i.info) : true) && (search.description ? i.info.description.match(search.description) : true) && (search.comment ? i.info.comment.match(search.comment) : true) && (search.date ? this.getDate(i.info.date).match(search.date) : true) && (search.time ? this.getTime(i.info.date)[0] >= search.time.split(':')[0] && this.getTime(i.info.date)[1] >= search.time.split(':')[1] : true) && (search.dateFrom ? i.info.date*1000 >= search.dateFrom : true)
                  }).sort((a, b) => this.sortByValue(a, b, 'created', search.sortByDate));
                })(),
                type: 'subsite'
              });
      
            }
          })
          new El().Input({
            path: panel,
            label: 'Имя (Rxp)',
            lName: 'full halfL'
          });
          new El().Input({
            path: panel,
            label: 'ID',
            type: 'checkbox',
            value: 'name',
            name: 'nameType'
          })
          new El().Input({
            path: panel,
            label: 'Описание (Rxp)',
            lName: 'full nl'
          });
          new El().Input({
            path: panel,
            label: 'Комментарий (Rxp)',
            lName: 'full nl'
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
            path: e,
            iName: 'subsites'
          })
        }
      })
    }
    users(path, items){
      new Tabber().tabList({
        path: path,
        cName: 'hor',
        title: 'USERS',
        titleBtn: true,
        tabs: [
          {text:'Все', name:'all'},
          {text:'💘', name:'favorite'},
          {text: '💢', name: 'ignored'},
          {text:'🈲', name:'blocked'},
        ],
        body: (e, panel) => {
          console.log('PANEL', panel);
          new El().Button({
            path: panel,
            cName: 'load',
            text: 'Загрузить список',
            onclick: async () => {
              this.clear(e, true);
              if(e.previousElementSibling.getAttribute('reload')){
                if(mainCfg.database.data.online && mainCfg.database.data.db !== 'none')
                  try{
                    items = await new Odb()[mainCfg.database.data.db]({
                      run: 'get all',
                      type: 'users',
                      db: db
                    })
                  }catch{
                    console.log('Nooooooooope', items);
                  }
                e.previousElementSibling.removeAttribute('reload');
              }
              const search = {
                sort: e.previousElementSibling.getAttribute('picked'),
                type: panel.children[1].children[0].value,
                sortByDate: panel.children[2].children[0].checked
              }
              if(!search.sort) return;
      
              console.log(search);;
              // 46807
      
              new BookMenu().itemList({
                path: e.children[0],
                target: (() => {
                  if(search.sort === 'all' && search.type === 'all') return (items||sData.users).sort((a, b) => this.sortByValue(a, b, 'created', search.sortByDate))
                  else return (items||sData.users).filter(i => this.sortie(i.flags, search.sort, search.type)).sort((a, b) => this.sortByValue(a, b, 'created', search.sortByDate));
                })(),
                db: db,
                type: 'user'
              });
            }
          });

          new El().Select({
            path: panel,
            label: 'Тип',
            body: (e) => {
              new El().Options({
                path: e,
                values: [
                  ['Все', 'all'],
                  ['Статьи', 'topics'],
                  ['Блоги', 'blogs'],
                  ['Комментарии', 'comments']
                ]
              });
            }
          });
          new El().Input({
            path: panel,
            type: 'checkbox',
            label: '🔃',
            name: 'sort',
            lName: 'full',
            onchange: (e) => {
              e.target.parentNode.classList.toggle('active');
            }
          });
          new El().Button({
            path: panel,
            cName: 'srch',
            text: 'Поиск по списку',
            onclick: () => {
              this.clear(e, true);
      
              const search = {
                sort: e.previousElementSibling.getAttribute('picked'),
                type: panel.children[1].children[0].value,
                sortByDate: panel.children[2].children[0].checked,
                name: panel.children[4].children[0].value && new RegExp(panel.children[4].children[0].value, 'i'),
                nType: panel.children[5].children[0].checked,
                description: panel.children[6].children[0].value && new RegExp(panel.children[6].children[0].value, 'i'),
                comment: panel.children[7].children[0].value && new RegExp(panel.children[7].children[0].value, 'i'),
                date: panel.children[8].children[0].value,
                time: panel.children[9].children[0].value,
                dateFrom: Date.parse(`${panel.children[10].children[0].value} 00:00`)
              };
      
              console.log(search);
      
              new BookMenu().itemList({
                path: e.children[0],
                target: (() => {
                  if(search.sort === 'all' && search.type === 'all' && !search.name && !search.description && !search.comment && !search.date && !search.time && !search.dateFrom) return (items||sData.users).sort((a, b) => this.sortByValue(a, b, 'created', search.sortByDate));
                  else return (items||sData.users).filter(i => {
                    return this.sortie(i.flags, search.sort, search.type) && (search.name ? i.info.name.match(search.name) : true) && (search.name ? this.id(search.name, search.nType, i.info) : true) && (search.description ? i.info.description.match(search.description) : true) && (search.comment ? i.info.comment.match(search.comment) : true) && (search.date ? this.getDate(i.info.date).match(search.date) : true) && (search.time ? this.getTime(i.info.date)[0] >= search.time.split(':')[0] && this.getTime(i.info.date)[1] >= search.time.split(':')[1] : true) && (search.dateFrom ? i.info.date*1000 >= search.dateFrom : true)
                  }).sort((a, b) => this.sortByValue(a, b, 'created', search.sortByDate));
                })(),
                type: 'user'
              });
      
            }
          })
          new El().Input({
            path: panel,
            label: 'Имя (Rxp)',
            lName: 'full halfL'
          });
          new El().Input({
            path: panel,
            label: 'ID',
            type: 'checkbox',
            value: 'name',
            name: 'nameType'
          })
          new El().Input({
            path: panel,
            label: 'Описание (Rxp)',
            lName: 'full nl'
          });
          new El().Input({
            path: panel,
            label: 'Комментарий (Rxp)',
            lName: 'full nl'
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
            path: e,
            iName: 'users'
          })
        }
      })
    }
    feeds(path, items){
      new Tabber().tabList({
        path: path,
        cName: 'hor',
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
              if(e.previousElementSibling.getAttribute('reload')){
                if(mainCfg.database.data.online && mainCfg.database.data.db !== 'none')
                  try{
                    items = await new Odb()[mainCfg.database.data.db]({
                      run: 'get all',
                      type: 'feeds',
                      db: db
                    })
                  }catch{
                    console.log('Nooooooooope', items);
                  }
                e.previousElementSibling.removeAttribute('reload');
              }
              const search = {
                sort: e.previousElementSibling.getAttribute('picked'),
                type: panel.children[1].children[0].value,
                sortByDate: panel.children[2].children[0].checked
              }
              if(!search.sort) return;
      
              console.log(search);;
              // 46807
      
              new BookMenu().itemList({
                path: e.children[0],
                target: (() => {
                  if(search.sort === 'all' && search.type === 'all') return (items||sData.feeds).sort((a, b) => this.sortByValue(a, b, 'date', search.sortByDate));
                  else return (items||sData.feeds).filter(i => {
                    return this.sortie(i.flags, search.sort) && (search.type === 'all' ? true : (search.type === 'topics' ? i.info.subsite.id !== i.info.author.id : i.info.subsite.id === i.info.author.id)).sort((a, b) => this.sortByValue(a, b, 'date', search.sortByDate));
                  })
                })(),
                db: db,
                type: 'feed'
              });
            }
          });
          new El().Select({
            path: panel,
            label: 'Тип',
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
          new El().Input({
            path: panel,
            type: 'checkbox',
            label: '🔃',
            name: 'sort',
            lName: 'full',
            onchange: (e) => {
              e.target.parentNode.classList.toggle('active');
            }
          });
          new El().Button({
            path: panel,
            cName: 'srch',
            text: 'Поиск по списку',
            onclick: () => {
              this.clear(e, true);
      
              const search = {
                sort: e.previousElementSibling.getAttribute('picked'),
                type: panel.children[1].children[0].value,
                sortByDate: panel.children[2].children[0].value,
                tTitle: panel.children[4].children[0].value && new RegExp(panel.children[4].children[0].value, 'i'),
                subsite: panel.children[5].children[0].value && new RegExp(panel.children[5].children[0].value, 'i'),
                sType: panel.children[6].children[0].checked,
                author: panel.children[7].children[0].value && new RegExp(panel.children[7].children[0].value, 'i'),
                aType: panel.children[8].children[0].checked,
                comment: panel.children[9].children[0].value && new RegExp(panel.children[9].children[0].value, 'i'),
                date: panel.children[10].children[0].value,
                time: panel.children[11].children[0].value,
                dateFrom: Date.parse(`${panel.children[12].children[0].value} 00:00`),
                tags: (() => {
                  const res = [];
                  for(let i = 0, arr = panel.children[13].children[0].children, length = arr.length; i < length; i++){
                    if(arr[i].getAttribute('value')) res.push(arr[i].getAttribute('value'));
                  }
                  return res;
                })(),
                ignoreTags: (() => {
                  const res = [];
                  for(let i = 0, arr = panel.children[14].children[0].children, length = arr.length; i < length; i++){
                    if(arr[i].getAttribute('value')) res.push(arr[i].getAttribute('value'));
                  }
                  return res;
                })()
              };
      
              console.log(search);
      
              new BookMenu().itemList({
                path: e.children[0],
                target: (() => {
                  if(search.sort === 'all' && search.type === 'all' && !search.tTitle && !search.subsite && !search.author && !search.comment && !search.date && !search.time && !search.dateFrom && !search.tags.length > 0 && !search.ignoreTags.length > 0) return (items||sData.feeds).sort((a, b) => this.sortByValue(a, b, 'date', search.sortByDate));
                  else return (items||sData.feeds).filter(i => {
                    return this.sortie(i.flags, search.sort) && (search.type === 'all' ? true : (search.type === 'topics' ? i.info.subsite.id !== i.info.author.id : i.info.subsite.id === i.info.author.id)) && (search.tTitle ? i.info.title.match(search.tTitle) : true) && (search.subsite ? this.id(search.subsite, search.sType, i.info.subsite) : true) && (search.author ? this.id(search.author, search.aType, i.info.author) : true) && (search.comment ? i.info.comment.match(search.comment) : true) && (search.date ? this.getDate(i.info.date).match(search.date) : true) && (search.time ? this.getTime(i.info.date)[0] >= search.time.split(':')[0] && this.getTime(i.info.date)[1] >= search.time.split(':')[1] : true) && (search.dateFrom ? i.info.date*1000 >= search.dateFrom : true) && (search.tags.length > 0 ? search.tags.every(s => {
                      return i.info.keywords.some(t => t.name === s)
                    }) : true) && (search.ignoreTags.length > 0 ? search.ignoreTags.every(s => {
                      return !i.info.keywords.some(t => t.name === s)
                    }) : true)
                  }).sort((a, b) => this.sortByValue(a, b, 'date', search.sortByDate));
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
            lName: 'full halfL'
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
            lName: 'full halfL'
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
            label: 'Комментарий (Rxp)',
            lName: 'full nl'
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
            lName: 'full',
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
            lName: 'iList full nl',
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
            lName: 'iList full nl',
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
            path: e,
            iName: 'feeds'
          })
        }
      })
    }
  }
  new Tabber().tabList({
    path: m,
    title: 'SAVED INFO',
    tabs: [
      {text:'Фиды', name:'feeds', onclick:() => {
        if(m.children[0].children[1].children.length > 0) m.children[0].children[1].replaceChildren();
        if(mainCfg.database.data.online && mainCfg.database.data.db !== 'none'){
          const loading = new El().loading({
            path: m.children[0].children[1],
            text: 'Loading...',
            rtn: true
          });
          new Odb()[mainCfg.database.data.db]({
            run: 'get all',
            type: 'feeds',
            db: db
          }).then(res => {
            // console.log(res);
            if(!res){
              loading.remove();
              console.log(`There's no saved feeds...`);
              new Types().feeds(m.children[0].children[1]);
            }else{
              loading.remove();
              console.log(`Founded saved feeds, loading...`, res[0]);
              new Types().feeds(m.children[0].children[1], res, db);
            }
          }).catch(err => console.log(err));
        }else{
          console.log(`Loading local data...`);
          new Types().feeds(m.children[0].children[1]);
        }
        // new Types().feeds(m.children[0].children[3]);
      }},
      {text:'Подсайты', name:'subsites', onclick:() => {
        if(m.children[0].children[1].children.length > 0) m.children[0].children[1].replaceChildren();
        if(mainCfg.database.data.online && mainCfg.database.data.db !== 'none'){
          const loading = new El().loading({
            path: m.children[0].children[1],
            text: 'Loading...',
            rtn: true
          });
          new Odb()[mainCfg.database.data.db]({
            run: 'get all',
            type: 'subsites',
            db: db
          }).then(res => {
            // console.log(res);
            if(!res){
              loading.remove();
              console.log(`There's no saved subsites...`);
              new Types().subsites(m.children[0].children[1]);
            }else{
              loading.remove();
              console.log(`Founded saved subsites, loading...`, res[0]);
              new Types().subsites(m.children[0].children[1], res, db);
            }
          }).catch(err => console.log(err));
        }else{
          console.log(`Loading local data...`);
          new Types().subsites(m.children[0].children[1]);
        }
      }},
      {text:'Пользователи', name:'users', onclick:() => {
        if(m.children[0].children[1].children.length > 0) m.children[0].children[1].replaceChildren();
        if(mainCfg.database.data.online && mainCfg.database.data.db !== 'none'){
          const loading = new El().loading({
            path: m.children[0].children[1],
            text: 'Loading...',
            rtn: true
          });
          new Odb()[mainCfg.database.data.db]({
            run: 'get all',
            type: 'users',
            db: db
          }).then(res => {
            // console.log(res);
            if(!res){
              loading.remove();
              console.log(`There's no saved users...`);
              new Types().users(m.children[0].children[1]);
            }else{
              loading.remove();
              console.log(`Founded saved users, loading...`, res[0]);
              new Types().users(m.children[0].children[1], res, db);
            }
          }).catch(err => console.log(err));
        }else{
          console.log(`Loading local data...`);
          new Types().users(m.children[0].children[1]);
        }
        // new Types().feeds(m.children[0].children[3]);
      }}
    ]
  })
}
