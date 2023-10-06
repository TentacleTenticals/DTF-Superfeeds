class AddEl{
  user(c){
    new Modal().build({
      path: document.body,
      title: 'Сохранение/обновление пользователя',
      showM: true,
      load: true,
      loadText: 'Loading...',
      onclose: (m) => {
        m.target.remove();
        c.err('Closed!!!');
      },
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
        new Odb().supabase({
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
        }).catch(err => console.log(err));
      }
    })    
  }
  subsite(c){
    new Modal().build({
      path: document.body,
      title: 'Сохранение/обновление подсайта',
      showM: true,
      load: true,
      loadText: 'Loading...',
      onclose: (m) => {
        m.target.remove();
        c.err('Closed!!!');
      },
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
        new Odb().supabase({
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
        }).catch(err => console.log(err));
      }
    })    
  }
  feed(c){
    new Modal().build({
      path: document.body,
      title: 'Сохранение/обновление фида',
      showM: true,
      load: true,
      loadText: 'Loading...',
      onclose: (m) => {
        m.target.remove();
        c.err('Closed!!!');
      },
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
        new Odb().supabase({
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
        }).catch(err => console.log(err));
      }
    })    
  }

  feed1(c){
    new Dialog().build({
      path: document.body,
      coord: c.coord,
      autohide: false,
      title: `${!c.item.info ? 'Сохранение':'Обновление'} фида`,
      func: (m) => {
        new El().Div({
          path: m,
          cName: 'flags',
          func: (i) => {
            new El().Div({
              path: i,
              cName: 'rz',
              text: 'Состояние'
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
                checked: c.item.flags && c.item.flags[e[1]]
              });
            });
    
            new El().Div({
              path: i,
              cName: 'rz',
              text: 'Состояние'
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
                checked: c.item.flags && c.item.flags[e[1]]
              });
            });
          }
        });
    
        new El().Tarea({
          path: m,
          cName: 'zone',
          placeholder: 'Введите комментарий...',
          value: c.item.info && c.item.info.comment
        });
      },
      submitText: 'Save/Update',
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
      }
    })
  }
}
