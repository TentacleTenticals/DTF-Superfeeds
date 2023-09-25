function attachment({path, type, i}){
  console.log(i)
  const main=new El().Div({
    path: path,
    cName: `mask ${type}`,
    rtn: true
  });
  if(!i.data) return;
  if(i.type === 'image'){
    if(i.data.type.match(/video|gif/)){
      new El().Video({
        path: main,
        cName: 'attach',
        url: `https://leonardo.osnova.io/${i.data.uuid}`
      })
    }else
    new El().Image({
      path: main,
      cName: 'attach',
      url: `https://leonardo.osnova.io/${i.data.uuid}`
    })
  }
};
