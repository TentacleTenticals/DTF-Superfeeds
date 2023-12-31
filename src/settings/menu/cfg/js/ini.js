let mainCfg;
const sData = {
    subsites: [],
    users: [],
    feeds: []
},
  defaultCfg = {
    'main': {
        feeds: {
            'working mode': 'obs',
            check: {
                active: true,
                onPageLoad: true,
                attachments: {
                    embeds: {
                        youtube: {
                            replace: true,
                            autoplay: false,
                            sound: false,
                            volume: 40,
                            size: {
                                width: 500,
                                height: 300
                            }
                        }
                    },
                    video: {
                        replace: true,
                        autoplay: false,
                        sound: false,
                        volume: 40,
                        size: {
                            width: 500,
                            height: 300
                        }
                    }
                },
                interface: {
                    feedButtons: {
                        'block link': false,
                        goTo: false,
                        readed: true,
                        'author actions': false,
                        'subsite actions': false
                    }
                },
                status: {
                    readed: 'none',
                    ignored: 'none',
                    blocked: 'none'
                }
            }
        },
        comments: {
            'working mode': 'obs',
            check: {
                active: true,
                onPageLoad: true,
                attachments: {
                    video: {
                            replace: true,
                            autoplay: false,
                            sound: false,
                            volume: 40,
                            size: {
                            width: 300,
                            height: 150
                        }
                    }
                }
            }
        }
    },
    'database': {
        'data': {
            'online': false,
            'db': 'none'
        },
        'keepVars': {
            'subsites': true,
            'users': true,
            'feeds': true,
            'comments': false
        },
        'saving': {
            'feeds': {
                'attachments': {
                    'items': {
                        'max size': 2
                    },
                    'albums': {
                        'max size': 2
                    }
                }
            }
        },
        bookMenu: {
            size: {
                'subsite': 5,
                'user': 5,
                'feed': 5
            },
            feeds: {
                book: {
                    size: {
                        'max height': '720'
                    }
                },
                attachments: {
                    visual: {
                        size: {
                            image: {
                                'max width': '50'
                            },
                            audio: {
                                'max width': '50',
                                'max height': '50'
                            },
                            video: {
                                'max width': '80',
                                'max height': '50'
                            }
                        },
                        color: {
                            tag: '#c9b7eb'
                        }
                    }
                }
            }
        }
    },
    'filters': {
        'feeds': {
            'topics': {
                author: {
                    ignored: 'blur',
                    blocked: 'blur'
                },
                'title': {
                    'none': 'none',
                    'some': 'none',
                    'active': true,
                    'words active': false,
                    'words': []
                },
                'text': {
                    'none': 'none',
                    'some': 'none',
                    'active': true,
                    'words active': false,
                    'words': []
                }
            },
            'blogs': {
                author: {
                    ignored: 'blur',
                    blocked: 'blur'
                },
                'title': {
                    'none': 'none',
                    'some': 'none',
                    'active': true,
                    'words active': false,
                    'words': []
                },
                'text': {
                    'none': 'none',
                    'some': 'none',
                    'active': true,
                    'words active': false,
                    'words': []
                }
            }
        },
        'comments': {
            author: {
                ignored: 'blur',
                blocked: 'sp'
            },
            'text': {
                'none': 'none',
                'some': 'none',
                'active': true,
                'words active': false,
                'words': []
            }
        }
    },
    'feeds': {
        'what to show': {
            'popular': 'all',
            'new': 'all',
            'my new': 'all',
            'bookmarks': 'all',
            'subsite': 'all',
            'topic': 'all',
            'user page': 'all'
        },
        'where to react': {
            'popular': true,
            'new': true,
            'my new': true,
            'bookmarks': true,
            'subsite': true,
            'topic': true,
            'user page': true
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
    'scriptInfo': {
        'name': 'DTF SuperFeeds',
        'id': 'dtf-superFeeds'
    }
};
