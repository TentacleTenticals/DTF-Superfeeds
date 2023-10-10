initMenu.setSettings = (m, cfg) => {
  new El().Field({
    path: m,
    groupName: 'main',
    cName: 'grid',
    legend: 'Главные настройки',
    info: 'Список самых главных настроек',
    autocfg: [cfg],
    items: [
      {
        t: 'select',
        label: 'Режим действия фидов',
        name: 'working mode',
        options: [
          ['Тэги', 'tags'],
          ['Панели', 'panels'],
          ['Обсервер', 'obs']
        ],
        group: 'feeds',
      },
      {
        t: 'select',
        label: 'Режим действия комментариев',
        name: 'working mode',
        options: [
          ['Обсервер', 'obs']
        ],
        group: 'comments',
      }
    ]
  });

  new El().Field({
    path: m,
    groupName: 'database',
    cName: 'grid',
    legend: 'База данных',
    info: 'Настройки/данные',
    autocfg: [cfg],
    items: [
      {
        t: 'separator',
        text: 'Настройки'
      },
      {
        t: 'input',
        type: 'checkbox',
        lName: 'full nl',
        label: 'Онлайн',
        name: 'online',
        group: 'settings'
      },
      {
        t: 'select',
        label: 'Удалённая база данных',
        name: 'db',
        options: [
          ['Нет', 'none'],
          ['Firebase', 'firebase'],
          ['Supabase', 'supabase'],
          ['MongoDB', 'mongoDB']
        ],
        group: 'settings'
      },
      {
        t: 'separator',
        text: 'Данные'
      },
      {
        t: 'select',
        label: 'Удалённая база данных',
        name: 'db',
        options: [
          ['Нет', 'none'],
          ['Firebase', 'firebase'],
          ['Supabase', 'supabase'],
          ['MongoDB', 'mongoDB']
        ],
        group: 'data'
      },
      {
        t: 'input',
        type: 'checkbox',
        lName: 'full nl',
        label: 'Онлайн',
        name: 'online',
        group: 'data'
      }
    ]
  });
  new El().Field({
    path: m,
    groupName: 'database',
    cName: 'grid',
    legend: 'Сохранение фидов',
    info: 'Настройки сохранения в базу данных',
    autocfg: [cfg],
    items: [
      {
        t: 'input',
        type: 'number',
        label: 'Максимум вложений',
        name: 'max sz',
        group: 'saving.feeds.attachments.items'
      },
      {
        t: 'input',
        type: 'number',
        label: 'Максимум вложений в альбомах',
        name: 'max sz',
        group: 'saving.feeds.attachments.albums'
      }
    ]
  });
  new El().Field({
    path: m,
    groupName: 'database',
    cName: 'grid',
    legend: 'Хранение варок',
    info: 'Хранимые варки не требуют постоянного получения данных из датабазы',
    autocfg: [cfg, 'keepVars'],
    items: [
      {
        t: 'input',
        type: 'checkbox',
        label: 'Подсайтов',
        name: 'subsites'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Авторов',
        name: 'users'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Фидов',
        name: 'feeds'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Комментариев',
        name: 'comments'
      }
    ]
  });

  new El().Field({
    path: m,
    groupName: 'main',
    cName: 'grid',
    legend: 'Проверка фидов/комментариев',
    info: 'Искать ли скрипту фиды или комментарии',
    autocfg: [cfg],
    items: [
      {
        t: 'separator',
        text: 'Фиды'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Искать',
        name: 'active',
        group: 'feeds.check',
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Проверять при загрузке страницы',
        name: 'onPageLoad',
        group: 'feeds.check',
      },
      {
        t: 'separator',
        text: 'Комментарии'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Искать',
        name: 'active',
        group: 'comments.check',
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Проверять при загрузке страницы',
        name: 'onPageLoad',
        group: 'comments.check',
      }
    ]
  });

  new El().Field({
    path: m,
    groupName: 'main',
    cName: 'grid',
    legend: 'Вложения фидов',
    info: 'Видео',
    autocfg: [cfg, 'feeds.check.attachments.video'],
    items: [
      {
        t: 'input',
        type: 'checkbox',
        label: 'Замена видео',
        name: 'replace'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Автозапуск',
        name: 'autoplay'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Звук вкл',
        name: 'sound'
      },
      {
        t: 'input',
        type: 'number',
        label: 'Громкость',
        name: 'volume',
      },
      {
        t: 'input',
        type: 'number',
        label: 'Размер - длина',
        name: 'width',
        group: 'feeds.check.attachments.video.size'
      },
      {
        t: 'input',
        type: 'number',
        label: 'Размер - ширина',
        name: 'height',
        group: 'feeds.check.attachments.video.size'
      }
    ]
  });

  new El().Field({
    path: m,
    groupName: 'main',
    cName: 'grid',
    legend: 'Вложения комментариев',
    info: 'Видео',
    autocfg: [cfg, 'comments.check.attachments.video'],
    items: [
      {
        t: 'input',
        type: 'checkbox',
        label: 'Замена видео',
        name: 'replace'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Автозапуск',
        name: 'autoplay'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Звук вкл',
        name: 'sound'
      },
      {
        t: 'input',
        type: 'number',
        label: 'Громкость',
        name: 'volume',
      },
      {
        t: 'input',
        type: 'number',
        label: 'Размер - длина',
        name: 'width',
        group: 'comments.check.attachments.video.size'
      },
      {
        t: 'input',
        type: 'number',
        label: 'Размер - ширина',
        name: 'height',
        group: 'comments.check.attachments.video.size'
      }
    ]
  });

  new El().Field({
    path: m,
    groupName: 'bookMenu',
    cName: 'grid',
    legend: 'BookMenu',
    info: 'Кол-во итемов на одной странице',
    autocfg: [cfg, 'size'],
    items: [
      {
        t: 'input',
        type: 'number',
        label: 'Подсайты',
        name: 'subsite'
      },
      {
        t: 'input',
        type: 'number',
        label: 'Авторы',
        name: 'user'
      },
      {
        t: 'input',
        type: 'number',
        label: 'Фиды',
        name: 'feed'
      }
    ]
  });

  new El().Field({
    path: m,
    groupName: 'database',
    cName: 'grid',
    legend: '',
    info: 'Настройки итемов',
    autocfg: [cfg],
    items: [
      {
        t: 'separator',
        text: 'Фиды'
      },
      {
        t: 'input',
        type: 'number',
        label: 'Максимальная высота книги фидов',
        name: 'max height',
        group: 'bookMenu.feeds.book.size'
      },
      {
        t: 'input',
        type: 'number',
        label: 'Размер изображений',
        name: 'max width',
        group: 'bookMenu.feeds.attachments.visual.size.image'
      },
      {
        t: 'input',
        type: 'color',
        label: 'Цвет тегов',
        name: 'tag',
        group: 'bookMenu.feeds.attachments.visual.color'
      }
    ]
  });

  new El().Field({
    path: m,
    groupName: 'filters',
    cName: 'grid',
    legend: 'Фильтры фидов',
    info: 'Фильтрация фидов по тексту, или же его отсутствию',
    autocfg: [cfg, 'feeds.topics.title'],
    items: [
      {
        t: 'input',
        type: 'checkbox',
        label: 'Активен',
        name: 'active'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Фильтр по словам',
        name: 'words active'
      },
      {
        t: 'select',
        label: 'Нет заголовка',
        lName: 'full nl',
        name: 'none',
        options: [
          ['Ничего', 'none'],
          ['Свернуть', 'collapse'],
          ['Удалить', 'delete']
        ]
      },
      {
        t: 'select',
        label: 'Есть заголовок с...',
        lName: 'full nl',
        name: 'none',
        options: [
          ['Ничего', 'none'],
          ['Свернуть', 'collapse'],
          ['Удалить', 'delete']
        ]
      },
      {
        t: 'list',
        mode: 'all',
        name: 'words',
        lName: 'iList full nl',
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
        }
      }
    ]
  });

  new El().Field({
    path: m,
    groupName: 'filters',
    cName: 'grid',
    legend: '',
    info: 'Текст',
    autocfg: [cfg, 'feeds.topics.text'],
    items: [
      {
        t: 'input',
        type: 'checkbox',
        label: 'Активен',
        name: 'active'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Фильтр по словам',
        name: 'words active'
      },
      {
        t: 'select',
        label: 'Нет текста',
        lName: 'full nl',
        name: 'none',
        options: [
          ['Ничего', 'none'],
          ['Свернуть', 'collapse'],
          ['Удалить', 'delete']
        ]
      },
      {
        t: 'select',
        label: 'Есть текст с...',
        lName: 'full nl',
        name: 'none',
        options: [
          ['Ничего', 'none'],
          ['Свернуть', 'collapse'],
          ['Удалить', 'delete']
        ]
      },
      {
        t: 'list',
        mode: 'all',
        name: 'words',
        lName: 'iList full nl',
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
        }
      }
    ]
  });

  new El().Field({
    path: m,
    groupName: 'filters',
    cName: 'grid',
    legend: 'Фильтры фидов (блоги)',
    info: 'Заголовок',
    autocfg: [cfg, 'feeds.blogs.title'],
    items: [
      {
        t: 'input',
        type: 'checkbox',
        label: 'Активен',
        name: 'active'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Фильтр по словам',
        name: 'words active'
      },
      {
        t: 'select',
        label: 'Нет заголовка',
        lName: 'full nl',
        name: 'none',
        options: [
          ['Ничего', 'none'],
          ['Свернуть', 'collapse'],
          ['Удалить', 'delete']
        ]
      },
      {
        t: 'select',
        label: 'Есть заголовок с...',
        lName: 'full nl',
        name: 'none',
        options: [
          ['Ничего', 'none'],
          ['Свернуть', 'collapse'],
          ['Удалить', 'delete']
        ]
      },
      {
        t: 'list',
        mode: 'all',
        name: 'words',
        lName: 'iList full nl',
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
        }
      }
    ]
  });

  new El().Field({
    path: m,
    groupName: 'filters',
    cName: 'grid',
    legend: '',
    info: 'Текст',
    autocfg: [cfg, 'feeds.blogs.text'],
    items: [
      {
        t: 'input',
        type: 'checkbox',
        label: 'Активен',
        name: 'active'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Фильтр по словам',
        name: 'words active'
      },
      {
        t: 'select',
        label: 'Нет текста',
        lName: 'full nl',
        name: 'none',
        options: [
          ['Ничего', 'none'],
          ['Свернуть', 'collapse'],
          ['Удалить', 'delete']
        ]
      },
      {
        t: 'select',
        label: 'Есть текст с...',
        lName: 'full nl',
        name: 'none',
        options: [
          ['Ничего', 'none'],
          ['Свернуть', 'collapse'],
          ['Удалить', 'delete']
        ]
      },
      {
        t: 'list',
        mode: 'all',
        name: 'words',
        lName: 'iList full nl',
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
        }
      }
    ]
  });

  new El().Field({
    path: m,
    groupName: 'filters',
    cName: 'grid',
    legend: 'Фильтры комментариев',
    info: 'Текст',
    autocfg: [cfg, 'comments'],
    items: [
      {
        t: 'input',
        type: 'checkbox',
        label: 'Активен',
        name: 'active'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Фильтр по словам',
        name: 'words active'
      },
      {
        t: 'select',
        label: 'Нет текста',
        lName: 'full nl',
        name: 'none',
        options: [
          ['Ничего', 'none'],
          ['Свернуть', 'collapse'],
          ['Удалить', 'delete']
        ]
      },
      {
        t: 'select',
        label: 'Есть текст с...',
        lName: 'full nl',
        name: 'none',
        options: [
          ['Ничего', 'none'],
          ['Свернуть', 'collapse'],
          ['Удалить', 'delete']
        ]
      },
      {
        t: 'list',
        mode: 'all',
        name: 'words',
        lName: 'iList full nl',
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
        }
      }
    ]
  });
}
