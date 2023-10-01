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
              ['Брошено', 'dropped'],
              ['Ничего', 'null']
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
              ['Заблокированное', 'blocked'],
              ['Ничего', 'null']
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
          c.res(info);
        }, 500);
      }
    })
  }
}
