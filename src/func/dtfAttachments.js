function attachment(o){
  console.log('Att', o)
  function player(o){
    new El().Div({
      path: o.path,
      ...o.addBefore ? {addBefore: o.addBefore} : {},
      cName: 'cont',
      func: (m) => {
        new El().Div({
          path: m,
          cName: `${o.type}-cont`,
          // onclick: (e) => {
          //   if(e.button !== 0) return;
          //   e.preventDefault();
          //   e.stopPropagation();
          //   e.stopImmediatePropagation();
          //   if(o.remove) e.target.remove();
          //   if(m.children[0].lastChild.paused) m.children[0].lastChild.play();
          //   else m.children[0].lastChild.pause();
          // },
          func: (p) => {
            new El().Div({
              path: p,
              cName: 'mediaStarter',
              onclick: (e) => {
                if(e.button !== 0) return;
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                if(o.remove) e.currentTarget.remove();
                if(p.lastChild.paused) p.lastChild.play();
                else p.lastChild.pause();
              },
              func: (s) => {
                new El().Div({
                  path: s,
                  cName: 'btn'
                });
              }
            });

            new El()[o.type === 'video' ? 'Video':'Audio']({
              path: p,
              url: o.url,
              poster: o.poster,
              loop: o.type === 'video' ? true:false,
              muted: o.type === 'video' ? true:false,
              controls: o.type === 'video' ? false:true,
              onplay: (e) => {
                e.target.parentNode.classList.toggle('playing');
              },
              onpause: (e) => {
                e.target.parentNode.classList.toggle('playing');
              },
              onended: (e) => {
                e.target.parentNode.classList.toggle('playing');
              }
            });
          }
        });
      }
    });

  // new El().Image({
  //   path: prev,
  //   url: 'https://github.com/TentacleTenticals/dtf-markdown/raw/main/libs/Play.svg'
  // });
  }
  // function test(){
  //   if(o.i.type === 'image'){}
  // }
  if(!o.i||!o.i.data) return;
  if(o.i.type === 'image'){
    if(o.i.data.type.match(/video|gif/)){
      if(o.type.match(/media/)){
        player({
          path: o.path,
          url: `https://leonardo.osnova.io/${o.i.data.uuid}`,
          poster: o.poster
        })
      }else{
        const main=new El().Div({
          path: o.path,
          cName: `mask ${o.type} ${o.i.data && o.i.data.type||''}`,
          autoplay: true,
          rtn: true
        });
        new El().Video({
          path: main,
          type: o.i.type,
          cName: 'attach',
          url: `https://leonardo.osnova.io/${o.i.data.uuid}`
        })
      }
    }else{
      const main=new El().Div({
        path: o.path,
        cName: `mask ${o.type} ${o.i.data && o.i.data.type||''}`,
        onclick: o.onclick,
        onRclick: o.onRclick,
        tab: o.tab,
        rtn: true
      });
      new El().Image({
        path: main,
        cName: 'attach',
        url: `https://leonardo.osnova.io/${o.i.data.uuid}`
      })
    }
  }else
  if(o.i.type === 'audio'){
    player({
      path: o.path,
      type: o.i.type,
      remove: true,
      url: `https://leonardo.osnova.io/${o.i.data.uuid}`,
      controls: true
    });
    // new El().Audio({
    //   path: o.path,
    //   cName: 'attach',
    //   controls: true,
    //   url: `https://leonardo.osnova.io/${o.i.data.uuid}`
    // })
  }
};
