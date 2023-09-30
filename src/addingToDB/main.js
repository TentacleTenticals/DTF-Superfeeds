class Adding{
  feed(c){
    console.log('C', c);
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
              ['Брошено', 'dropped']
            ].forEach(e => {
              new El().Input({
                path: i,
                type: 'radio',
                name: 'flags 1',
                label: e[0],
                value: e[1],
                checked: c.item.info && c.item.flags[e[1]]
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
              ['Заблокированное', 'blocked']
            ].forEach(e => {
              new El().Input({
                path: i,
                type: 'radio',
                name: 'flags 2',
                label: e[0],
                value: e[1],
                checked: c.item.info && c.item.flags[e[1]]
              });
            });
          }
        });
    
        new El().Tarea({
          path: m,
          cName: 'zone',
          placeholder: 'Введите комментарий...'
        });
      },
      submitText: 'Save/Update',
      submit: (p) => {
        const info = {
          flags: {}
        };
        for(let i = 0, arr = p.children[0].children, len = arr.length; i < len; i++){
          if(arr[i].tagName !== 'LABEL') continue;
          info.flags[arr[i].children[0].value] = arr[i].children[0].checked;
          // console.log(arr[i].children[0].value, arr[i].children[0].checked)
        }
        info.comment = p.children[1].value||false;
        console.log('INFO', info);
        setTimeout(() => {
          // this.findOrAdd({id:fID, type:'feeds', info:info}).then(res => {
          //   const page = checkPageType(document.location.href);
          //   if(res && page.type.match(/popular|^new$|^my new$|bookmarks|topic/)){
          //     if(mainCfg.feeds['where to react'][page.type]) checkFeeds({fullCheck:true});
          //   }
          //   console.log('Feeds', sData.feeds);
          // });
          m.remove();
        }, 500);
      }
    })
  }
}
