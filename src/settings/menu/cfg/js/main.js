initMenu.setSettings = (m, cfg) => {
  new El().Field({
    path: m,
    groupName: 'main',
    cName: 'grid',
    legend: 'Главные настройки',
    info: 'Список самых главных настроек',
    select: {a:cfg,
      list:[
        {
          label: 'Режим действия скрипта',
          name: 'working mode',
          options: [
            ['Тэги', 'tags'],
            ['Панели', 'panels'],
            ['Обсервер', 'obs']
          ]
        }
      ]
    }
  });

  new El().Field({
    path: m,
    groupName: 'main',
    cName: 'grid',
    legend: 'База данных',
    info: 'Настройки',
    select: {a:cfg, c:'database.settings',
      list:[
        {
          label: 'Удалённая база данных',
          name: 'db',
          options: [
            ['Firebase', 'firebase'],
            ['Supabase', 'supabase'],
            ['MongoDB', 'mongoDB']
          ]
        }
      ]
    },
    inputs: {a:cfg, c:'database.settings',
      list:[
        {
          type: 'checkbox',
          lName: 'full nl',
          label: 'Онлайн?',
          name: 'online'
        }
      ]
    }
  });

  new El().Field({
    path: m,
    groupName: 'main',
    cName: 'grid',
    legend: '',
    info: 'Данные',
    select: {a:cfg, c:'database.data',
      list:[
        {
          label: 'Удалённая база данных',
          name: 'db',
          options: [
            ['Firebase', 'firebase'],
            ['Supabase', 'supabase'],
            ['MongoDB', 'mongoDB']
          ]
        }
      ]
    },
    inputs: {a:cfg, c:'database.data',
      list:[
        {
          type: 'checkbox',
          lName: 'full nl',
          label: 'Онлайн?',
          name: 'online'
        }
      ]
    }
  });

  new El().Field({
    path: m,
    groupName: 'filters',
    cName: 'flex ver',
    legend: 'Фильтры фидов (статьи)',
    info: 'Заголовки',
    inputs: {a:cfg, c:'feeds.topics.title',
      list:[
        {
          type: 'checkbox',
          lName: 'items2',
          label: 'Активен',
          name: 'active'
        },
        {
          type: 'checkbox',
          lName: 'items2',
          label: 'Фильтр по словам',
          name: 'words active'
        }
      ]
    },
    select: {a:cfg,
      list:[
        {
          label: 'Нет заголовка',
          lName: 'full nl',
          name: 'none',
          options: [
            ['Ничего', 'none'],
            ['Свернуть', 'collapse'],
            ['Удалить', 'delete']
          ],
          group:'feeds.topics.title'
        },
        {
          label: 'Есть заголовок с...',
          lName: 'full nl',
          name: 'none',
          options: [
            ['Ничего', 'none'],
            ['Свернуть', 'collapse'],
            ['Удалить', 'delete']
          ],
          group:'feeds.topics.title'
        }
      ]
    },
    list: {a:cfg,
      list: [
        {
          mode: 'all',
          name: 'words',
          lName: 'full nl',
          cName: 'tags flex',
          type: 'string',
          title: 'Нажмите на меня для добавления слова',
          label: 'Слова:',
          focus: true,
          canDel: true,
          onRclick: (e) => {
            e.preventDefault();
            if(e.target.nodeName !== 'UL') return;
            e.currentTarget.replaceChildren();
          },
          group:'feeds.topics.title'
        }
      ]
    }
  });

  new El().Field({
    path: m,
    groupName: 'filters',
    cName: 'flex ver',
    legend: '',
    info: 'Текст',
    inputs: {a:cfg, c:'feeds.topics.text',
      list:[
        {
          type: 'checkbox',
          lName: 'items2',
          label: 'Активен',
          name: 'active'
        },
        {
          type: 'checkbox',
          lName: 'items2',
          label: 'Фильтр по словам',
          name: 'words active'
        }
      ]
    },
    select: {a:cfg,
      list:[
        {
          label: 'Нет текста',
          lName: 'full nl',
          name: 'none',
          options: [
            ['Ничего', 'none'],
            ['Свернуть', 'collapse'],
            ['Удалить', 'delete']
          ],
          group:'feeds.topics.text'
        },
        {
          label: 'Есть текст с...',
          lName: 'full nl',
          name: 'none',
          options: [
            ['Ничего', 'none'],
            ['Свернуть', 'collapse'],
            ['Удалить', 'delete']
          ],
          group:'feeds.topics.text'
        }
      ]
    },
    list: {a:cfg,
      list: [
        {
          mode: 'all',
          name: 'words',
          lName: 'full nl',
          cName: 'tags flex',
          type: 'string',
          title: 'Нажмите на меня для добавления слова',
          label: 'Слова:',
          focus: true,
          canDel: true,
          onRclick: (e) => {
            e.preventDefault();
            if(e.target.nodeName !== 'UL') return;
            e.currentTarget.replaceChildren();
          },
          group:'feeds.topics.text'
        }
      ]
    }
  });


  new El().Field({
    path: m,
    groupName: 'filters',
    cName: 'flex ver',
    legend: 'Фильтры фидов (блоги)',
    info: 'Заголовки',
    inputs: {a:cfg, c:'feeds.blogs.title',
      list:[
        {
          type: 'checkbox',
          lName: 'items2',
          label: 'Активен',
          name: 'active'
        },
        {
          type: 'checkbox',
          lName: 'items2',
          label: 'Фильтр по словам',
          name: 'words active'
        }
      ]
    },
    select: {a:cfg,
      list:[
        {
          label: 'Нет заголовка',
          lName: 'full nl',
          name: 'none',
          options: [
            ['Ничего', 'none'],
            ['Свернуть', 'collapse'],
            ['Удалить', 'delete']
          ],
          group:'feeds.blogs.title'
        },
        {
          label: 'Есть заголовок с...',
          lName: 'full nl',
          name: 'none',
          options: [
            ['Ничего', 'none'],
            ['Свернуть', 'collapse'],
            ['Удалить', 'delete']
          ],
          group:'feeds.blogs.title'
        }
      ]
    },
    list: {a:cfg,
      list: [
        {
          mode: 'all',
          name: 'words',
          lName: 'full nl',
          cName: 'tags flex',
          type: 'string',
          title: 'Нажмите на меня для добавления слова',
          label: 'Слова:',
          focus: true,
          canDel: true,
          onRclick: (e) => {
            e.preventDefault();
            if(e.target.nodeName !== 'UL') return;
            e.currentTarget.replaceChildren();
          },
          group:'feeds.blogs.title'
        }
      ]
    }
  });

  new El().Field({
    path: m,
    groupName: 'filters',
    cName: 'flex ver',
    legend: '',
    info: 'Текст',
    inputs: {a:cfg, c:'feeds.blogs.text',
      list:[
        {
          type: 'checkbox',
          lName: 'items2',
          label: 'Активен',
          name: 'active'
        },
        {
          type: 'checkbox',
          lName: 'items2',
          label: 'Фильтр по словам',
          name: 'words active'
        }
      ]
    },
    select: {a:cfg,
      list:[
        {
          label: 'Нет заголовка',
          lName: 'full nl',
          name: 'none',
          options: [
            ['Ничего', 'none'],
            ['Свернуть', 'collapse'],
            ['Удалить', 'delete']
          ],
          group:'feeds.blogs.text'
        },
        {
          label: 'Есть заголовок с...',
          lName: 'full nl',
          name: 'none',
          options: [
            ['Ничего', 'none'],
            ['Свернуть', 'collapse'],
            ['Удалить', 'delete']
          ],
          group:'feeds.blogs.text'
        }
      ]
    },
    list: {a:cfg,
      list: [
        {
          mode: 'all',
          name: 'words',
          lName: 'full nl',
          cName: 'tags flex',
          type: 'string',
          title: 'Нажмите на меня для добавления слова',
          label: 'Слова:',
          focus: true,
          canDel: true,
          onRclick: (e) => {
            e.preventDefault();
            if(e.target.nodeName !== 'UL') return;
            e.currentTarget.replaceChildren();
          },
          group:'feeds.blogs.text'
        }
      ]
    }
  });


  new El().Field({
    path: m,
    groupName: 'filters',
    cName: 'flex ver',
    legend: 'Фильтры комментариев',
    info: 'Текст',
    inputs: {a:cfg, c:'comments.text',
      list:[
        {
          type: 'checkbox',
          lName: 'items2',
          label: 'Активен',
          name: 'active'
        },
        {
          type: 'checkbox',
          lName: 'items2',
          label: 'Фильтр по словам',
          name: 'words active'
        }
      ]
    },
    select: {a:cfg,
      list:[
        {
          label: 'Нет текста',
          lName: 'full nl',
          name: 'none',
          options: [
            ['Ничего', 'none'],
            ['Свернуть', 'collapse'],
            ['Удалить', 'delete']
          ],
          group:'comments.text'
        },
        {
          label: 'Есть текст с...',
          lName: 'full nl',
          name: 'none',
          options: [
            ['Ничего', 'none'],
            ['Свернуть', 'collapse'],
            ['Удалить', 'delete']
          ],
          group:'comments.text'
        }
      ]
    },
    list: {a:cfg,
      list: [
        {
          mode: 'all',
          name: 'words',
          lName: 'full nl',
          cName: 'tags flex',
          type: 'string',
          title: 'Нажмите на меня для добавления слова',
          label: 'Слова:',
          focus: true,
          canDel: true,
          onRclick: (e) => {
            e.preventDefault();
            if(e.target.nodeName !== 'UL') return;
            e.currentTarget.replaceChildren();
          },
          group:'comments.text'
        }
      ]
    }
  });
}
