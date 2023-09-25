class MenuItem{
  getTime(d){
    let t = new Date(d * 1000);
    return `${t.getFullYear()}/${t.getMonth()+1 < 10 ? `0${t.getMonth()+1}` : t.getMonth()+1}/${t.getDate() < 10 ? `0${t.getDate()}` : t.getDate()} ${t.getHours() < 10 ? `0${t.getHours()}` : t.getHours()}:${t.getMinutes() < 10 ? `0${t.getMinutes()}` : t.getMinutes()}:${t.getSeconds() < 10 ? `0${t.getSeconds()}` : t.getSeconds()}`
  };
  rewriteText({target, text, mode}){
    target.textContent = text ? text : (mode === '++' ? ++target.textContent : --target.textContent);
  }
  picked(path, main, item, num){
    const picked = JSON.parse(path.getAttribute('picked'));

    if(!picked.some(i => i.num === num)){
      picked.push({num:num, id:item.id});
    }else{
      picked.splice(picked.findIndex(i => i.num === num), 1);
    }
    this.rewriteText({target:path.parentNode.children[0].children[0].children[2].children[0], text:picked.length});
    path.setAttribute('picked', JSON.stringify(picked));
    main.classList.toggle('picked');
  }
  user({path, item, onclick, num}){
    // console.log(`${item}, ${num}`);
    if(!item) return;

    new El().Div({
      path: path,
      cName: `savedFeed${JSON.parse(path.getAttribute('picked'))?.some(i => i.num === num) && ' picked'||''} scrollMid`,
      attr: ['item-id', num],
      func: (m) => {
        new El().Div({
          path: m,
          cName: 'header',
          rtn: true,
          onclick: () => this.picked(path, main, item, num),
          func: (h) => {
            new El().Div({
              path: h,
              cName: 'subsite',
              func: (s) => {
                if(item.info.avatar) attachment({path:s, type:'subsite', i:item.info.avatar});
                new El().Div({
                  path: s,
                  cName: 'name',
                  text: `${item.info.name.slice(0, 20)}`
                });
              }
            });
    
            new El().Div({
              path: h,
              cName: 'time',
              text: this.getTime(item.info.created)
            });
          }
        });

        new El().Div({
          path: m,
          cName: 'description',
          text: item.info.description.slice(0, 40)
        });
      }
    });
  }
  subsite({path, item, onclick, num}){
    if(!item) return;

    new El().Div({
      path: path,
      cName: `savedFeed${JSON.parse(path.getAttribute('picked'))?.some(i => i.num === num) && ' picked'||''} scrollMid`,
      attr: ['item-id', num],
      func: (m) => {
        new El().Div({
          path: m,
          cName: 'header',
          rtn: true,
          onclick: () => this.picked(path, main, item, num),
          func: (h) => {
            new El().Div({
              path: h,
              cName: 'subsite',
              func: (s) => {
                if(item.info.avatar) attachment({path:s, type:'subsite', i:item.info.avatar});
                new El().Div({
                  path: s,
                  cName: 'name',
                  text: `${item.info.name.slice(0, 20)}`
                });
              }
            });
    
            new El().Div({
              path: h,
              cName: 'time',
              text: this.getTime(item.info.created)
            });
          }
        });

        new El().Div({
          path: m,
          cName: 'description',
          text: item.info.description.slice(0, 40)
        });
      }
    });
  }
  feed({path, item, onclick, num}){
    // console.log(`${item}, ${num}`);
    if(!item) return;

    const main=new El().Div({
      path: path,
      cName: `savedFeed${JSON.parse(path.getAttribute('picked'))?.some(i => i.num === num) && ' picked'||''} scrollMid`,
      attr: ['item-id', num],
      rtn: true
    });

    new El().Div({
      path: main,
      cName: 'header',
      rtn: true,
      onclick: () => this.picked(path, main, item, num),
      func: (h) => {
        if(item.info.author.id !== item.info.subsite.id){
          new El().Div({
            path: h,
            cName: 'subsite',
            func: (s) => {
              if(item.info.subsite.avatar) attachment({path:s, type:'subsite', i:item.info.subsite.avatar});
              new El().Div({
                path: s,
                cName: 'name',
                text: `${item.info.subsite.name.slice(0, 20)}`
              });
            }
          });
        }
        new El().Div({
          path: h,
          cName: 'author',
          func: (a) => {
            if(item.info.author.avatar) attachment({path:a, type:'subsite', i:item.info.author.avatar});
            new El().Div({
              path: a,
              cName: 'name',
              text: `${item.info.author.name.slice(0, 20)}`
            });
          }
        });

        new El().Div({
          path: h,
          cName: 'time',
          text: this.getTime(item.info.date)
        });
      }
    });

    new El().Div({
      path: main,
      cName: 'title',
      text: item.info.title
    });

    new El().Div({
      path: main,
      cName: 'attachments',
      func: (a) => item.info.attachments.forEach(e => {
        if(e.type === 'media'){
          e.items.forEach(i => {
            if(i.type === 'image'){
              const mask=new El().Div({
                path: a,
                cName: `mask${e.hidden ? ' spoiler' : ''}`,
                rtn: true
              });
              if(i.type === 'image' && i.data.type.match(/png|jpg/)) new El().Image({
                path: mask,
                cName: 'attach',
                url: `https://leonardo.osnova.io/${i.data.uuid}`
              });
            }
          })
        }else
        if(e.type === 'text'){
          new El().Div({
            path: a,
            cName: 'text',
            text: e.text
          });
        }
      })
    });

    if(item.info.keywords){
      const tags=new El().Div({
        path: main,
        cName: 'tags',
        rtn: true
      });
      item.info.keywords.forEach(e => {
        new El().Div({
          path: tags,
          cName: 'tag',
          text: e.name,
          onclick: (e) => {
            if(e.button !== 0) return;
            let check;
            for(let i = 0, arr = path.parentNode.parentNode.previousElementSibling.children[11].children[0].children, len = arr.length; i < len; i++){
              if(arr[i].getAttribute('value') === e.target.textContent) check = true;
            };
            if(!check) new El().iList({
              path: path.parentNode.parentNode.previousElementSibling.children[11].children[0],
              mode: 'all',
              focus: true,
              canDel: true,
              value: e.target.textContent
            });
          },
          onRclick: (e) => {
            if(e.button !== 2) return;
            e.preventDefault();
            let check;
            for(let i = 0, arr = path.parentNode.parentNode.previousElementSibling.children[12].children[0].children, len = arr.length; i < len; i++){
              if(arr[i].getAttribute('value') === e.target.textContent) check = true;
            };
            if(!check) new El().iList({
              path: path.parentNode.parentNode.previousElementSibling.children[12].children[0],
              mode: 'all',
              focus: true,
              canDel: true,
              value: e.target.textContent
            });
          }
        });
      })
    }
  }
}
