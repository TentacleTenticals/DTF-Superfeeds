function videoReplace(path, video, comment){
    function player(o){
      new El().Div({
        path: o.path,
        ...o.addBefore ? {addBefore: o.addBefore} : {},
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
              if(m.children[0].lastChild.paused) m.children[0].lastChild.play();
              else m.children[0].lastChild.pause();
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
    // console.log('VIDEO', video);
    // console.log('PATH', path);
    if(video.getAttribute('data-andropov-type') === 'video' && video.getAttribute('data-video-service') === 'default'){

      player({
        path: !comment ? path.parentNode : path,
        ...!comment ? {addBefore: path} : {},
        url:video.getAttribute('data-video-mp4'),
        poster:video.getAttribute('data-video-thumbnail')
      });
      !comment ? path.remove() : video.remove();
    }else
    if(video.getAttribute('data-andropov-type') === 'video' && video.getAttribute('data-video-service') === 'youtube'){
      if(!mainCfg.main.feeds.check.attachments.embeds.youtube.replace) return;
      function iframe(o){
        // console.log(o.embed)
        const main=new El().Div({
          path: o.path,
          addBefore: o.addBefore,
          cName: `dtf-attach ${o.type} ${o.embed.site} ${o.embed.type}`,
          rtn: [],
          style: `background-image:url(https://i.ytimg.com/vi/${o.embed.id}/hqdefault.jpg)`
        });
        const starter=new El().Div({
          path: main,
          cName: 'mediaStarter',
          rtn: [],
          onclick: (e) => {
            if(e.button !== 0) return;
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            starter.remove();
            main.style = '';
            const embed=document.createElement('iframe');
            embed.src=`https://www.youtube.com/embed/${o.embed.id}`;
            embed.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
            embed.width='100%';
            embed.height='100%';
            main.appendChild(embed);
          }
        });
        new El().Div({
          path: starter,
          cName: 'btn'
        });
      }

      iframe({
        path: !comment ? path.parentNode : path,
        ...!comment ? {addBefore: path} : {},
        type: 'iframe',
        embed:{
          site: 'yt',
          type: 'video',
          id: video.getAttribute('data-video-service-id'),
          thumbnail: video.getAttribute('data-video-thumbnail')
        }
      });
      !comment ? path.remove() : video.remove();
    }
  }
