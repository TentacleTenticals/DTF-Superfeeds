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
