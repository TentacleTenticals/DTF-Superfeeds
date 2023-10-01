let mainCfg;
const sData = {
    subsites: [],
    users: [],
    feeds: []
},
  defaultCfg = {
    'main': {
        'working mode': 'panels'
    },
    'database': {
        'cfg': {
            'settings': {
                'online': true,
                'db': 'mongoDB'
            },
            'data': {
                'online': true,
                'db': 'mongoDB'
            },
        },
        'keepVars': {
            'subsites': false,
            'users': true,
            'feeds': false,
            'comments': false
        },
        'saving': {
            'feeds': {
                'attachments': {
                    'items': {
                        'max sz': 2
                    },
                    'albums': {
                        'max sz': 2
                    }
                }
            }
        },
        feeds: {
            attachments: {
                visual: {
                    size: {
                        image: '50'
                    },
                    color: {
                        tag: '#c9b7eb'
                    }
                }
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
        'where to react': {
            'popular': true,
            'new': true,
            'my new': true,
            'bookmarks': true,
            'topic': true
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
    'bookMenu': {
        'visual': {
            'feeds': {
                'max height': '720'
            }
        },
        'size': {
            'subsite': 5,
            'user': 5,
            'feed': 5
        }
    },
    'scriptInfo': {
        'name': 'DTF SuperFeeds',
        'id': 'dtf-superFeeds'
    }
}
