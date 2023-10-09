class AddEl{
  modal(c){
    new El().Dialog({
      path: c.path,
      cName: 'modal',
      showM: true,
      onclose: (m) => {
        m.target.remove();
        if(c.err) c.err('Closed!!!');
      },
      func: (m) => {
        new El().Div({
          path: m,
          cName: 'header',
          text: c.title,
          onclick: () => {
            m.close();
          }
        });
        new El().Form({
          path: m,
          cName: 'main',
          func: (fo) => {
            new El().loading({
              path: fo,
              text: 'Loading...'
            });
            c.func(fo);
          }
        });
        new El().Button({
          path: m,
          type: 'submit',
          text: c.tSubmit||'Отправить',
          onclick: () => c.submit(m.children[1])
        });
      }
    });
  }
  user(c){
    this.modal({
      path: document.body,
      title: 'Сохранение/обновление пользователя',
      submit: (p) => {
        const data = {
          flags: {
            topics: {},
            blogs: {},
            comments: {}
          },
          info: {
            comment: p.children[3].value||false
          }
        };
        for(let i = 0, arr = p.children[0].children, len = arr.length; i < len; i++){
          if(arr[i].tagName !== 'LABEL') continue;
          if(arr[i].children[0].value === 'null') continue;
          data.flags.topics[arr[i].children[0].value] = arr[i].children[0].checked;
        }
        for(let i = 0, arr = p.children[1].children, len = arr.length; i < len; i++){
          if(arr[i].tagName !== 'LABEL') continue;
          if(arr[i].children[0].value === 'null') continue;
          data.flags.blogs[arr[i].children[0].value] = arr[i].children[0].checked;
        }
        for(let i = 0, arr = p.children[2].children, len = arr.length; i < len; i++){
          if(arr[i].tagName !== 'LABEL') continue;
          if(arr[i].children[0].value === 'null') continue;
          data.flags.comments[arr[i].children[0].value] = arr[i].children[0].checked;
        }
        setTimeout(() => {
          p.parentNode.remove();
          c.res(data);
        }, 500);
      },
      func: (m) => {
        if(mainCfg.database.data.online && mainCfg.database.data.db !== 'none') new Odb()[mainCfg.database.data.db]({
          run: 'find',
          type: 'users',
          rType: 'object',
          target: c.item.id
        }).then(db => {
          console.log('DBDBDBDSB', db);
          if(m.children[0].className && m.children[0].className === 'loading') m.children[0].remove();
          m.parentNode.children[0].textContent = `${!db ? 'Добавление':'Обновление'} пользователя`;
          new El().Div({
            path: m,
            cName: 'flags',
            func: (i) => {
              new El().Div({
                path: i,
                cName: 'rz',
                text: 'Статьи'
              });
              [
                ['Избранное', 'favorite'],
                ['Игнорируемое', 'ignored'],
                ['Заблокированное', 'blocked'],
                ['Ничего', 'null']
              ].forEach(e => {
                new El().Input({
                  path: i,
                  type: 'radio',
                  name: 'flags topics',
                  label: e[0],
                  value: e[1],
                  checked: db && db.flags && db.flags.topics[e[1]]
                });
              });
            }
          });
  
          new El().Div({
            path: m,
            cName: 'flags',
            func: (i) => {
              new El().Div({
                path: i,
                cName: 'rz',
                text: 'Блоги'
              });
              [
                ['Избранное', 'favorite'],
                ['Игнорируемое', 'ignored'],
                ['Заблокированное', 'blocked'],
                ['Ничего', 'null']
              ].forEach(e => {
                new El().Input({
                  path: i,
                  type: 'radio',
                  name: 'flags blogs',
                  label: e[0],
                  value: e[1],
                  checked: db && db.flags && db.flags.blogs[e[1]]
                });
              });
            }
          });
  
          new El().Div({
            path: m,
            cName: 'flags',
            func: (i) => {
              new El().Div({
                path: i,
                cName: 'rz',
                text: 'Комментарии'
              });
              [
                ['Избранное', 'favorite'],
                ['Игнорируемое', 'ignored'],
                ['Заблокированное', 'blocked'],
                ['Ничего', 'null']
              ].forEach(e => {
                new El().Input({
                  path: i,
                  type: 'radio',
                  name: 'flags comments',
                  label: e[0],
                  value: e[1],
                  checked: db && db.flags && db.flags.comments[e[1]]
                });
              });
            }
          });
      
          new El().Tarea({
            path: m,
            cName: 'zone',
            placeholder: 'Введите комментарий...',
            value: db && db.info && db.info.comment
          });
        }).catch(err => {
          c.err(err);
          m.parentNode.close();
        });
      }
    })    
  }
  subsite(c){
    this.modal({
      path: document.body,
      title: 'Сохранение/обновление подсайта',
      submit: (p) => {
        const data = {
          flags: {
            topics: {},
            blogs: {},
            comments: {}
          },
          info: {
            comment: p.children[3].value||false
          }
        };
        for(let i = 0, arr = p.children[0].children, len = arr.length; i < len; i++){
          if(arr[i].tagName !== 'LABEL') continue;
          if(arr[i].children[0].value === 'null') continue;
          data.flags.topics[arr[i].children[0].value] = arr[i].children[0].checked;
        }
        for(let i = 0, arr = p.children[1].children, len = arr.length; i < len; i++){
          if(arr[i].tagName !== 'LABEL') continue;
          if(arr[i].children[0].value === 'null') continue;
          data.flags.blogs[arr[i].children[0].value] = arr[i].children[0].checked;
        }
        for(let i = 0, arr = p.children[2].children, len = arr.length; i < len; i++){
          if(arr[i].tagName !== 'LABEL') continue;
          if(arr[i].children[0].value === 'null') continue;
          data.flags.comments[arr[i].children[0].value] = arr[i].children[0].checked;
        }
        setTimeout(() => {
          p.parentNode.remove();
          c.res(data);
        }, 500);
      },
      func: (m) => {
        if(mainCfg.database.data.online && mainCfg.database.data.db !== 'none') new Odb()[mainCfg.database.data.db]({
          run: 'find',
          type: 'subsites',
          rType: 'object',
          target: c.item.id
        }).then(db => {
          if(m.children[0].className && m.children[0].className === 'loading') m.children[0].remove();
          m.parentNode.children[0].textContent = `${!db ? 'Добавление':'Обновление'} подсайта`;
          new El().Div({
            path: m,
            cName: 'flags',
            func: (i) => {
              new El().Div({
                path: i,
                cName: 'rz',
                text: 'Статьи'
              });
              [
                ['Избранное', 'favorite'],
                ['Игнорируемое', 'ignored'],
                ['Заблокированное', 'blocked'],
                ['Ничего', 'null']
              ].forEach(e => {
                new El().Input({
                  path: i,
                  type: 'radio',
                  name: 'flags topics',
                  label: e[0],
                  value: e[1],
                  checked: db && db.flags && db.flags.topics[e[1]]
                });
              });
            }
          });
  
          new El().Div({
            path: m,
            cName: 'flags',
            func: (i) => {
              new El().Div({
                path: i,
                cName: 'rz',
                text: 'Блоги'
              });
              [
                ['Избранное', 'favorite'],
                ['Игнорируемое', 'ignored'],
                ['Заблокированное', 'blocked'],
                ['Ничего', 'null']
              ].forEach(e => {
                new El().Input({
                  path: i,
                  type: 'radio',
                  name: 'flags blogs',
                  label: e[0],
                  value: e[1],
                  checked: db && db.flags && db.flags.blogs[e[1]]
                });
              });
            }
          });
  
          new El().Div({
            path: m,
            cName: 'flags',
            func: (i) => {
              new El().Div({
                path: i,
                cName: 'rz',
                text: 'Комментарии'
              });
              [
                ['Избранное', 'favorite'],
                ['Игнорируемое', 'ignored'],
                ['Заблокированное', 'blocked'],
                ['Ничего', 'null']
              ].forEach(e => {
                new El().Input({
                  path: i,
                  type: 'radio',
                  name: 'flags comments',
                  label: e[0],
                  value: e[1],
                  checked: db && db.flags && db.flags.comments[e[1]]
                });
              });
            }
          });
      
          new El().Tarea({
            path: m,
            cName: 'zone',
            placeholder: 'Введите комментарий...',
            value: db && db.info && db.info.comment
          });
        }).catch(err => {
          c.err(err);
          m.parentNode.close();
        });
      }
    })    
  }
  feed(c){
   this.modal({
      path: document.body,
      title: 'Сохранение/обновление фида',
      submit: (p) => {
        const data = {
          flags: {},
          info: {
            comment: p.children[1].value||false
          }
        };
        for(let i = 0, arr = p.children[0].children, len = arr.length; i < len; i++){
          if(arr[i].tagName !== 'LABEL') continue;
          if(arr[i].children[0].value === 'null') continue;
          data.flags[arr[i].children[0].value] = arr[i].children[0].checked;
        }
        setTimeout(() => {
          p.parentNode.remove();
          c.res(data);
        }, 500);
      },
      func: (m) => {
        if(mainCfg.database.data.online && mainCfg.database.data.db !== 'none') new Odb()[mainCfg.database.data.db]({
          run: 'find',
          type: 'feeds',
          rType: 'object',
          target: c.item.id
        }).then(db => {
          if(m.children[0].className && m.children[0].className === 'loading') m.children[0].remove();
          m.parentNode.children[0].textContent = `${!db ? 'Добавление':'Обновление'} фида`;
          new El().Div({
            path: m,
            cName: 'flags',
            func: (i) => {
              new El().Div({
                path: i,
                cName: 'rz',
                text: 'Состояние фида'
              });
              [
                ['Прочтено', 'readed'],
                ['Прочту', 'planToRead'],
                ['Читаю', 'onHold'],
                ['Брошено', 'dropped'],
                ['Ничего', 'null']
              ].forEach(e => {
                new El().Input({
                  path: i,
                  type: 'radio',
                  name: 'flags 1',
                  label: e[0],
                  value: e[1],
                  checked: db && db.flags && db.flags[e[1]]
                });
              });

              new El().Div({
                path: i,
                cName: 'rz',
                text: 'Состояние фида'
              });
              [
                ['Избранное', 'favorite'],
                ['Игнорируемое', 'ignored'],
                ['Заблокированное', 'blocked'],
                ['Ничего', 'null']
              ].forEach(e => {
                new El().Input({
                  path: i,
                  type: 'radio',
                  name: 'flags 2',
                  label: e[0],
                  value: e[1],
                  checked: db && db.flags && db.flags[e[1]]
                });
              });
            }
          });
      
          new El().Tarea({
            path: m,
            cName: 'zone',
            placeholder: 'Введите комментарий...',
            value: db && db.info && db.info.comment
          });
        }).catch(err => {
          c.err(err);
          m.parentNode.close();
        });
      }
    })    
  }
}
