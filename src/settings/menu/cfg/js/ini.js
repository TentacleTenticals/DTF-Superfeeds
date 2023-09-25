const defaultCfg = {
    'main': {
        'working mode': 'panels',
        'database': {
            'settings': {
                'online': false,
                'db': 'mongoDB'
            },
            'data': {
                'online': false,
                'db': 'mongoDB'
            }
        }
    },
    'filters': {
        'feeds': {
            'topics': {
                'title': {
                    'none': 'none',
                    'some': 'none',
                    'active': true,
                    'words active': true,
                    'words': []
                },
                'text': {
                    'none': 'none',
                    'some': 'none',
                    'active': true,
                    'words active': true,
                    'words': []
                }
            },
            'blogs': {
                'title': {
                    'none': 'none',
                    'some': 'none',
                    'active': true,
                    'words active': true,
                    'words': []
                },
                'text': {
                    'none': 'none',
                    'some': 'none',
                    'active': true,
                    'words active': true,
                    'words': []
                }
            }
        },
        'comments': {
            'text': {
                'none': 'none',
                'some': 'none',
                'active': true,
                'words active': true,
                'words': []
            }
        }
    },
    'feeds': {
        'interface': {
        'feedButtons': {
            'readed': true,
            'author actions': true,
            'subsite actions': false
        }
        },
        'what to show': {
        'popular': {
            'topics': true,
            'blogs': true
        },
        'new': {
            'topics': true,
            'blogs': true
        },
        'my new': {
            'topics': true,
            'blogs': true
        },
        'bookmarks': {
            'topics': true,
            'blogs': true
        },
        'topic': {
            'topics': true,
            'blogs': true
        }
        },
        'attachments': {
        'video': {
            'replace': true,
            'autoplay': false,
            'sound': false,
            'volume': 40,
            'size': {
            'width': 300,
            'height': 150
            }
        }
        }
    },
    'database': {
      'adding': {
        'feeds': {
          'attachments': {
            'items': {
              'sz': 2
            },
            'albums': {
              'sz': 2
            }
          }
        }
      }
    },
    'usercard': {
      'avatar': {
        'search': {
          'list': [// Список поисковиков.
            {url:'http://saucenao.com/search.php?db=999&url=', name:'Saucenao', use:true},
            {url:'https://www.bing.com/images/search?view=detailv2&iss=sbi&FORM=SBIHMP&sbisrc=UrlPaste&q=imgurl:', name:'Bing', use:true},
            {url:'https://www.google.com/searchbyimage?sbisrc=4chanx&safe=off&image_url=', name:'Google', use:true},
            {url:'https://lens.google.com/uploadbyurl?url=', name:'Google Lens', use:true},
            {url:'https://yandex.ru/images/search?rdrnd=296405&rpt=imageview&url=', name:'Yandex', use:true},
            {url:'http://tineye.com/search/?url=', name:'TinEye', use:true},
            {url:'http://iqdb.org/?url=', name:'IQDB', use:true}
          ]
        }
      }
    },

  'emoji picker': {
      'close after pick': true
  },
  'menu': {
    'feed': {
      'sz': 5
    },
    'user': {
      'sz': 5
    }
  },
  'scriptInfo': {
      'name': 'DTF SuperFeeds',
      'id': 'test'
  }
}
