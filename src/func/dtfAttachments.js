function attachment(o){
  // console.log(i)
  function player(o){
    new El().Div({
      path: o.path,
      cName: 'cont',
      func: (m) => {
        new El().Div({
          path: m,
          cName: 'video-cont',
          onclick: (e) => {
            if(e.button !== 0) return;
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            if(c.lastChild.paused) c.lastChild.play();
            else c.lastChild.pause();
          },
          func: (p) => {
            new El().Div({
              path: p,
              cName: 'mediaStarter',
              func: (s) => {
                new El().Div({
                  path: s,
                  cName: 'btn'
                });
              }
            });

            new El().Video({
              path: p,
              url: o.url,
              poster: o.poster,
              loop: true,
              muted: true,
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
  const main=new El().Div({
    path: o.path,
    cName: `mask ${o.type} ${o.i.data && o.i.data.type||''}`,
    onclick: o.onclick,
    onRclick: o.onRclick,
    tab: o.tab,
    rtn: true
  });
  if(!o.i||!o.i.data) return;
  if(o.i.type === 'image'){
    if(o.i.data.type.match(/video|gif/)){
      new El().Video({
        path: main,
        cName: 'attach',
        url: `https://leonardo.osnova.io/${o.i.data.uuid}`
      })
    }else
    new El().Image({
      path: main,
      cName: 'attach',
      url: `https://leonardo.osnova.io/${o.i.data.uuid}`
    })
  }
};
