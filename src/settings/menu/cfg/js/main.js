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
        name: 'max size',
        group: 'saving.feeds.attachments.items'
      },
      {
        t: 'input',
        type: 'number',
        label: 'Максимум вложений в альбомах',
        name: 'max size',
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
    groupName: 'feeds',
    cName: 'grid',
    legend: 'Поиски фидов',
    info: 'Где искать фиды',
    autocfg: [cfg, 'where to react'],
    items: [
      {
        t: 'input',
        type: 'checkbox',
        label: 'Популярное',
        name: 'popular'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Новое',
        name: 'new'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Моя стена',
        name: 'my new'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Закладки',
        name: 'bookmarks'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Страницы подсайтов',
        name: 'subsite'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Страницы фидов',
        name: 'topic'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Страницы авторов',
        name: 'user page'
      }
    ]
  });

  new El().Field({
    path: m,
    groupName: 'feeds',
    cName: 'grid',
    legend: 'Что показывать',
    info: 'Какие именно виды фидов показывать',
    autocfg: [cfg, 'what to show'],
    items: [
      {
        t: 'select',
        label: 'Популярное',
        name: 'popular',
        options: [
          ['Все', 'all'],
          ['Статьи', 'topics'],
          ['Блоги', 'blogs']
        ]
      },
      {
        t: 'select',
        label: 'Новое',
        name: 'new',
        options: [
          ['Все', 'all'],
          ['Статьи', 'topics'],
          ['Блоги', 'blogs']
        ]
      },
      {
        t: 'select',
        label: 'Моя стена',
        name: 'my new',
        options: [
          ['Все', 'all'],
          ['Статьи', 'topics'],
          ['Блоги', 'blogs']
        ]
      },
      {
        t: 'select',
        label: 'Закладки',
        name: 'bookmarks',
        options: [
          ['Все', 'all'],
          ['Статьи', 'topics'],
          ['Блоги', 'blogs']
        ]
      },
      {
        t: 'select',
        label: 'Страницы подсайтов',
        name: 'subsite',
        options: [
          ['Все', 'all'],
          ['Статьи', 'topics'],
          ['Блоги', 'blogs']
        ]
      },
      {
        t: 'select',
        label: 'Страницы фидов',
        name: 'topic',
        options: [
          ['Все', 'all'],
          ['Статьи', 'topics'],
          ['Блоги', 'blogs']
        ]
      },
      {
        t: 'select',
        label: 'Страницы авторов',
        name: 'user page',
        options: [
          ['Все', 'all'],
          ['Статьи', 'topics'],
          ['Блоги', 'blogs']
        ]
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
    legend: 'Просмотр фидов',
    info: 'Вид фидов',
    autocfg: [cfg],
    items: [
      {
        t: 'separator',
        text: 'Разное'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Отключить ссылку-переход при клике на фид',
        name: 'block link',
        group: 'feeds.check.interface.feedButtons',
      },
      {
        t: 'separator',
        text: 'Интерфейс'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Перейти на страницу',
        name: 'goTo',
        group: 'feeds.check.interface.feedButtons',
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Прочтено',
        name: 'readed',
        group: 'feeds.check.interface.feedButtons',
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Действия с подсайтом',
        name: 'subsite actions',
        group: 'feeds.check.interface.feedButtons',
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Действия с автором',
        name: 'author actions',
        group: 'feeds.check.interface.feedButtons',
      },
      {
        t: 'separator',
        text: 'Комментарии'
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
        t: 'separator',
        text: 'Видео'
      },
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
      },

      {
        t: 'separator',
        text: 'Youtube'
      },
      {
        t: 'input',
        type: 'checkbox',
        label: 'Замена youtube',
        name: 'replace',
        group: 'feeds.check.attachments.embeds.youtube'
      },
      {
        t: 'input',
        type: 'number',
        label: 'Длина',
        name: 'width',
        group: 'feeds.check.attachments.embeds.youtube.size'
      },
      {
        t: 'input',
        type: 'number',
        label: 'Ширина',
        name: 'height',
        group: 'feeds.check.attachments.embeds.youtube.size'
      },
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
    groupName: 'database',
    cName: 'grid',
    legend: 'bookMenu',
    info: 'Кол-во итемов на одной странице',
    autocfg: [cfg, 'bookMenu.size'],
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
        label: 'Высота книги фидов',
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
        type: 'number',
        label: 'Размер видео',
        name: 'max width',
        group: 'bookMenu.feeds.attachments.visual.size.video'
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
    groupName: 'main',
    cName: 'grid',
    legend: 'Статус фидов',
    info: 'Что делать с фидами, если...',
    autocfg: [cfg, 'feeds.check.status'],
    items: [
      {
        t: 'select',
        label: 'Прочитано',
        lName: 'full nl',
        name: 'readed',
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide']
            ]
          }
        ]
      },
      {
        t: 'select',
        label: 'Игнорировано',
        lName: 'full nl',
        name: 'ignored',
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide']
            ]
          }
        ]
      },
      {
        t: 'select',
        label: 'Блокировано',
        lName: 'full nl',
        name: 'blocked',
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide']
            ]
          }
        ]
      }
    ]
  });

  new El().Field({
    path: m,
    groupName: 'filters',
    cName: 'grid',
    legend: 'Фильтры фидов (статьи)',
    info: 'Фильтрация',
    autocfg: [cfg, 'feeds.topics.title'],
    items: [
      {
        t: 'separator',
        text: 'Автор'
      },
      {
        t: 'select',
        label: 'Игнорируется',
        lName: 'full nl',
        name: 'ignored',
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide'],
              ['Удалить', 'delete']
            ]
          },
          {
            label: 'Размытие',
            items: [
              ['Всё', 'blur'],
              ['Текст', 'blurText'],
              ['Вложения', 'blurAtt']
            ]
          },
          {
            label: 'Перекрыть плашкой',
            items: [
              ['Всё', 'sp'],
              ['Текст', 'spText'],
              ['Вложения', 'spAtt']
            ]
          }
        ],
        group: 'feeds.topics.author'
      },
      {
        t: 'select',
        label: 'Блокируется',
        lName: 'full nl',
        name: 'blocked',
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide'],
              ['Удалить', 'delete']
            ]
          },
          {
            label: 'Размытие',
            items: [
              ['Всё', 'blur'],
              ['Текст', 'blurText'],
              ['Вложения', 'blurAtt']
            ]
          },
          {
            label: 'Перекрыть плашкой',
            items: [
              ['Всё', 'sp'],
              ['Текст', 'spText'],
              ['Вложения', 'spAtt']
            ]
          }
        ],
        group: 'feeds.topics.author'
      },

      {
        t: 'separator',
        text: 'Заголовок'
      },
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
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide'],
              ['Удалить', 'delete']
            ]
          },
          {
            label: 'Размытие',
            items: [
              ['Всё', 'blur'],
              ['Текст', 'blurText'],
              ['Вложения', 'blurAtt']
            ]
          },
          {
            label: 'Перекрыть плашкой',
            items: [
              ['Всё', 'sp'],
              ['Текст', 'spText'],
              ['Вложения', 'spAtt']
            ]
          }
        ]
      },
      {
        t: 'select',
        label: 'Есть заголовок с...',
        lName: 'full nl',
        name: 'some',
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide'],
              ['Удалить', 'delete']
            ]
          },
          {
            label: 'Размытие',
            items: [
              ['Всё', 'blur'],
              ['Текст', 'blurText'],
              ['Вложения', 'blurAtt']
            ]
          },
          {
            label: 'Перекрыть плашкой',
            items: [
              ['Всё', 'sp'],
              ['Текст', 'spText'],
              ['Вложения', 'spAtt']
            ]
          }
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
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide'],
              ['Удалить', 'delete']
            ]
          },
          {
            label: 'Размытие',
            items: [
              ['Всё', 'blur'],
              ['Текст', 'blurText'],
              ['Вложения', 'blurAtt']
            ]
          },
          {
            label: 'Перекрыть плашкой',
            items: [
              ['Всё', 'sp'],
              ['Текст', 'spText'],
              ['Вложения', 'spAtt']
            ]
          }
        ]
      },
      {
        t: 'select',
        label: 'Есть текст с...',
        lName: 'full nl',
        name: 'some',
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide'],
              ['Удалить', 'delete']
            ]
          },
          {
            label: 'Размытие',
            items: [
              ['Всё', 'blur'],
              ['Текст', 'blurText'],
              ['Вложения', 'blurAtt']
            ]
          },
          {
            label: 'Перекрыть плашкой',
            items: [
              ['Всё', 'sp'],
              ['Текст', 'spText'],
              ['Вложения', 'spAtt']
            ]
          }
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
    info: 'Фильтрация',
    autocfg: [cfg, 'feeds.blogs.title'],
    items: [
      {
        t: 'separator',
        text: 'Автор'
      },
      {
        t: 'select',
        label: 'Игнорируется',
        lName: 'full nl',
        name: 'ignored',
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide'],
              ['Удалить', 'delete']
            ]
          },
          {
            label: 'Размытие',
            items: [
              ['Всё', 'blur'],
              ['Текст', 'blurText'],
              ['Вложения', 'blurAtt']
            ]
          },
          {
            label: 'Перекрыть плашкой',
            items: [
              ['Всё', 'sp'],
              ['Текст', 'spText'],
              ['Вложения', 'spAtt']
            ]
          }
        ],
        group: 'feeds.blogs.author'
      },
      {
        t: 'select',
        label: 'Блокируется',
        lName: 'full nl',
        name: 'blocked',
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide'],
              ['Удалить', 'delete']
            ]
          },
          {
            label: 'Размытие',
            items: [
              ['Всё', 'blur'],
              ['Текст', 'blurText'],
              ['Вложения', 'blurAtt']
            ]
          },
          {
            label: 'Перекрыть плашкой',
            items: [
              ['Всё', 'sp'],
              ['Текст', 'spText'],
              ['Вложения', 'spAtt']
            ]
          }
        ],
        group: 'feeds.blogs.author'
      },

      {
        t: 'separator',
        text: 'Заголовок'
      },
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
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide'],
              ['Удалить', 'delete']
            ]
          },
          {
            label: 'Размытие',
            items: [
              ['Всё', 'blur'],
              ['Текст', 'blurText'],
              ['Вложения', 'blurAtt']
            ]
          },
          {
            label: 'Перекрыть плашкой',
            items: [
              ['Всё', 'sp'],
              ['Текст', 'spText'],
              ['Вложения', 'spAtt']
            ]
          }
        ]
      },
      {
        t: 'select',
        label: 'Есть заголовок с...',
        lName: 'full nl',
        name: 'some',
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide'],
              ['Удалить', 'delete']
            ]
          },
          {
            label: 'Размытие',
            items: [
              ['Всё', 'blur'],
              ['Текст', 'blurText'],
              ['Вложения', 'blurAtt']
            ]
          },
          {
            label: 'Перекрыть плашкой',
            items: [
              ['Всё', 'sp'],
              ['Текст', 'spText'],
              ['Вложения', 'spAtt']
            ]
          }
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
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide'],
              ['Удалить', 'delete']
            ]
          },
          {
            label: 'Размытие',
            items: [
              ['Всё', 'blur'],
              ['Текст', 'blurText'],
              ['Вложения', 'blurAtt']
            ]
          },
          {
            label: 'Перекрыть плашкой',
            items: [
              ['Всё', 'sp'],
              ['Текст', 'spText'],
              ['Вложения', 'spAtt']
            ]
          }
        ]
      },
      {
        t: 'select',
        label: 'Есть текст с...',
        lName: 'full nl',
        name: 'none',
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide'],
              ['Удалить', 'delete']
            ]
          },
          {
            label: 'Размытие',
            items: [
              ['Всё', 'blur'],
              ['Текст', 'blurText'],
              ['Вложения', 'blurAtt']
            ]
          },
          {
            label: 'Перекрыть плашкой',
            items: [
              ['Всё', 'sp'],
              ['Текст', 'spText'],
              ['Вложения', 'spAtt']
            ]
          }
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
    info: 'Фильтрация',
    autocfg: [cfg, 'comments.text'],
    items: [
      {
        t: 'separator',
        text: 'Автор'
      },
      {
        t: 'select',
        label: 'Игнорируется',
        lName: 'full nl',
        name: 'ignored',
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide'],
              ['Удалить', 'delete']
            ]
          },
          {
            label: 'Размытие',
            items: [
              ['Всё', 'blur'],
              ['Текст', 'blurText'],
              ['Вложения', 'blurAtt']
            ]
          },
          {
            label: 'Перекрыть плашкой',
            items: [
              ['Всё', 'sp'],
              ['Текст', 'spText'],
              ['Вложения', 'spAtt']
            ]
          }
        ],
        group: 'comments.author'
      },
      {
        t: 'select',
        label: 'Блокируется',
        lName: 'full nl',
        name: 'blocked',
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide'],
              ['Удалить', 'delete']
            ]
          },
          {
            label: 'Размытие',
            items: [
              ['Всё', 'blur'],
              ['Текст', 'blurText'],
              ['Вложения', 'blurAtt']
            ]
          },
          {
            label: 'Перекрыть плашкой',
            items: [
              ['Всё', 'sp'],
              ['Текст', 'spText'],
              ['Вложения', 'spAtt']
            ]
          }
        ],
        group: 'comments.author'
      },

      {
        t: 'separator',
        text: 'Текст'
      },
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
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide'],
              ['Удалить', 'delete']
            ]
          },
          {
            label: 'Размытие',
            items: [
              ['Всё', 'blur'],
              ['Текст', 'blurText'],
              ['Вложения', 'blurAtt']
            ]
          },
          {
            label: 'Перекрыть плашкой',
            items: [
              ['Всё', 'sp'],
              ['Текст', 'spText'],
              ['Вложения', 'spAtt']
            ]
          }
        ]
      },
      {
        t: 'select',
        label: 'Есть текст с...',
        lName: 'full nl',
        name: 'some',
        sub: [
          {
            label: 'Стандарт',
            items: [
              ['Ничего', 'none'],
              ['Свернуть', 'collapse'],
              ['Скрыть', 'hide'],
              ['Удалить', 'delete']
            ]
          },
          {
            label: 'Размытие',
            items: [
              ['Всё', 'blur'],
              ['Текст', 'blurText'],
              ['Вложения', 'blurAtt']
            ]
          },
          {
            label: 'Перекрыть плашкой',
            items: [
              ['Всё', 'sp'],
              ['Текст', 'spText'],
              ['Вложения', 'spAtt']
            ]
          }
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
