var req;

app = Object();
app.server = 'http://fkekranas.lt/api';
app.hash = '';

app.isTouch = isTouch();
app.highlight = null;
app.touchstart = Object();
app.touchpos = Object();

app.test = 0;

app.home = Object();
app.home.offset = 0;

app.dpi = "";

app.apierror = 0;
app.apiok = 0;

app.onload = function() {
	
	var routes = {
		home: home,
			article: article,
		sezonas: sezonas,
			team: team,
				player: player,
			tables: tables,
			calendar: calendar,
			tickets: tickets,
		media: media,
			fketv: fketv,
			fkelive: fkelive,
			galleries: galleries,
				gallery: gallery,
					photo: photo,
			fkemobile: fkemobile,
		klubas: klubas,
			history: history,
			stadium: stadium,
			administration: administration,
			sponsors: sponsors,
		more: more,
			feedback: feedback,
			geeks: geeks
	}
	
	if(window.devicePixelRatio == 0.75) {
		app.dpi = "_ldpi";
	} else if(window.devicePixelRatio == 1.5) {
		app.dpi = "_hdpi";
	} else if(window.devicePixelRatio == 2) {
		app.dpi = "_xhdpi";
	};
	
	if(window.location.hash) {
		var hash = window.location.hash;
		app.hash = hash;
		hash = hash.substring(1, hash.length);
		var params = new Array();
		params = hash.split('/');
		var view = params[0];
		
		if (typeof routes[view] === 'function') {
			routes[view](params);
		} else {
			routes['home']();
		}
	} else {
		routes['home']();
	}
}

function home() {
	app.apierror = 0;
	app.apiok = 0;
	$('body').append('<div class="list" id="news-list"></div>');
	
	var time = 0;
	
	if(localStorage["ekranas.news."+app.home.offset+".time"] ) {
		time = localStorage["ekranas.news."+app.home.offset+".time"];
	}
	
	if(time && localStorage["ekranas.news."+app.home.offset] && (time/1000/60+24) > (+new Date()/1000/60)) {
		data = eval(localStorage["ekranas.news."+app.home.offset]);
		$('#err').remove();
		homeRender(eval(localStorage["ekranas.news."+app.home.offset]));
		if(data.length > 9) {
			addHomeLoadMore();
		}
		app.delegateClick(function(obj) {
			var type = obj.attr('data-type');
			if(type == "article" || type == "gallery") {
				go("'go':'"+type+"','params':'/id/"+obj.attr('data-id')+"'");
			} else if(type == "video") {
				go("'media':'video','url':'"+obj.attr('data-url')+"'");
			}
		}, '#news-list', '.news');
		
		setTimeout(function() { go("'html':'loaded'"); }, 500);
	} else {
		$.getJSON(app.server+'/gethome?limit=10&offset='+app.home.offset+'&callback=?', function(data) {
			if(!app.apierror) {
				app.apiok = 1;
				data = data.items;
				localStorage["ekranas.news."+app.home.offset] = JSON.stringify(data);
				localStorage["ekranas.news."+app.home.offset+".time"] = +new Date();
				$('#err').remove();
				homeRender(data);
				if(data.length > 9) {
					addHomeLoadMore();
				}
				app.delegateClick(function(obj) {
					var type = obj.attr('data-type');
					if(type == "article" || type == "gallery") {
						go("'go':'"+type+"','params':'/id/"+obj.attr('data-id')+"'");
					} else if(type == "video") {
						go("'media':'video','url':'"+obj.attr('data-url')+"'");
					}
				}, '#news-list', '.news');
				setTimeout(function() { go("'html':'loaded'"); }, 500);
			}
		});
		
		setTimeout(function() {
			if(!app.apiok) {
				app.apierror = 1;
				$('body').css('background-color', '#fff');
				$('body').html(coco.apierror());
				home();
				setTimeout(function() { go("'html':'loaded'"); }, 500);
			}
		}, 5000);
	}
}
function homeAdd(offset) {
	var time = 0;
	if(localStorage["ekranas.news."+app.home.offset+".time"] ) {
		time = localStorage["ekranas.news."+app.home.offset+".time"];
	}
	app.home.offset += 10;
	if(time && localStorage["ekranas.news."+app.home.offset] && time/1000/60+24 > +new Date()/1000/60) {
		homeRender(eval(localStorage["ekranas.news."+app.home.offset]));
	} else {
		$.getJSON(app.server+'/gethome?limit=10&offset='+app.home.offset+'&callback=?', function(data) {
			data = data.items;
			localStorage["ekranas.news."+app.home.offset] = JSON.stringify(data);
			localStorage["ekranas.news."+app.home.offset+".time"] = +new Date();
			homeRender(data);
		});
	}
}

function addHomeLoadMore() {
	$('body').append(coco.load());
	app.click(function(obj) {
		if(!app.test) {
			app.test = 1;
			$('.load-more').text('Kraunama...');
			homeAdd(app.home.offset);
			app.test = 0;
		}
	}, '.load-more');
	window.onscroll = function(e) {
		var test = $('.list').offset();
		var test2 = $('.load-more').offset();
		if(window.innerHeight+window.pageYOffset > test.height+test2.height - 200) {
			if(!app.test) {
				app.test = 1;
				$('.load-more').text('Kraunama...');
				homeAdd(app.home.offset);
			}
		}
	}
}
function removeHomeLoadMore() {
	$('.load-more').remove();
	window.onscroll = function(e) {};
}

function homeRender(data) {
	$('#news-list').append(coco.news({items: data, dpi: app.dpi}));
	if(data.length < 10) {
		removeHomeLoadMore();
	} else {
		$('.load-more').text('Daugiau naujienų');
	}
	app.test = 0;
}

function article(params) {
	app.apierror = 0;
	app.apiok = 0;
	var time = 0;
	if(localStorage["ekranas.article."+params[2]+".time"]) {
		time = localStorage["ekranas.article."+params[2]+".time"];
	}
	$('body').css('background-color', '#fff');
	if(time && localStorage["ekranas.article."+params[2]] && time/1000/60+24 > +new Date()/1000/60) {
		$('body').html(coco.article({dpi: app.dpi,item: eval('d='+localStorage["ekranas.article."+params[2]])}));
		setTimeout(function() { go("'html':'loaded'"); }, 500);
	} else {
		$.getJSON(app.server+'/getarticle?id='+params[2]+'&callback=?', function(data) {
			if(!app.apierror) {
				app.apiok = 1;
				localStorage["ekranas.article."+params[2]] = JSON.stringify(data);
				localStorage["ekranas.article."+params[2]+".time"] = +new Date();
				$('body').html(coco.article({dpi: app.dpi,item: data}));
				setTimeout(function() { go("'html':'loaded'"); }, 500);
			}
		});
		
		setTimeout(function() {
			if(!app.apiok) {
				app.apierror = 1;
				$('body').css('background-color', '#fff');
				$('body').html(coco.apierror());
				article(params);
				setTimeout(function() { go("'html':'loaded'"); }, 500);
			}
		}, 5000);
	}
}

function sezonas() {
	document.ontouchstart = function(e) {
		e.preventDefault();
	}
	$('body').append(coco.sezonas());
			
	$('.mainmenu .item').each(function() {
		app.click(function(obj) {
			go("'go':'"+obj.attr('data-go')+"'");
		}, this);
	});
	setTimeout(function() { go("'html':'loaded'"); }, 500);
}
	function team() {
		app.apierror = 0;
		app.apiok = 0;
		$('body').css('background-color', '#fff');
		
		var time = 0;
		if(localStorage["ekranas.team.time"]) {
			time = localStorage["ekranas.team.time"];
		}
		
		if(time && localStorage["ekranas.team"] && time/1000/60+120 > +new Date()/1000/60) {
			$('body').html(coco.team({dpi: app.dpi,'team': eval(localStorage["ekranas.team"])}));
			app.delegateClick(function(obj) {
				go("'go':'player','params':'/id/"+obj.attr('data-id')+"'");
			}, '.white', '.players-list-item');
			setTimeout(function() { go("'html':'loaded'"); }, 500);
		} else {
			$.getJSON(app.server+'/getteam?callback=?', function(data) {
				if(!app.apierror) {
					app.apiok = 1;
					localStorage["ekranas.team"] = JSON.stringify(data);
					localStorage["ekranas.team.time"] = +new Date();
					$('body').html(coco.team({dpi: app.dpi,'team': data}));
					app.delegateClick(function(obj) {
						go("'go':'player','params':'/id/"+obj.attr('data-id')+"'");
					}, '.white', '.players-list-item');
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			});
			
			setTimeout(function() {
				if(!app.apiok) {
					app.apierror = 1;
					$('body').css('background-color', '#fff');
					$('body').html(coco.apierror());
					team();
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			}, 5000);
		}
	}
		function player(params) {
			app.apierror = 0;
			app.apiok = 0;
			var id = params[2];
			if(app.dpi == "_xhdpi") {
				app.dpi = "";
			}
			$('body').css('background-color', '#fff');
			
			var time = 0;
			if(localStorage["ekranas.player."+id+".time"]) {
				time = localStorage["ekranas.player."+id+".time"];
			}
			
			if(time && localStorage["ekranas.player."+id] && time/1000/60+120 > +new Date()/1000/60) {
				$('body').html(coco.player({dpi: app.dpi, 'player': eval('d='+localStorage["ekranas.player."+id])}));
				setTimeout(function() { go("'html':'loaded'"); }, 500);;
			} else {
				$.getJSON(app.server+'/getplayer?id='+id+'&callback=?', function(data) {
					if(!app.apierror) {
						app.apiok = 1;
						localStorage["ekranas.player."+id] = JSON.stringify(data);
						localStorage["ekranas.player."+id+".time"] = +new Date();
						$('body').html(coco.player({dpi: app.dpi, 'player': data}));
						setTimeout(function() { go("'html':'loaded'"); }, 500);
					}
				});
				
				setTimeout(function() {
					if(!app.apiok) {
						app.apierror = 1;
						$('body').css('background-color', '#fff');
						$('body').html(coco.apierror());
						player(params);
						setTimeout(function() { go("'html':'loaded'"); }, 500);
					}
				}, 5000);
			}
			
			$('body').append(coco.player());
			setTimeout(function() { go("'html':'loaded'"); }, 500);
		}
	function tables(params) {
		app.apierror = 0;
		app.apiok = 0;
		$('body').css('background-color', '#fff');
		
		var time = 0;
		if(localStorage["ekranas.tables."+params[1]+".time"]) {
			time = localStorage["ekranas.tables."+params[1]+".time"];
		}
		
		if(time && localStorage["ekranas.tables."+params[1]] && time/1000/60+24 > +new Date()/1000/60) {
			$('body').html(coco.tables({dpi: app.dpi, 'table': eval(localStorage["ekranas.tables."+params[1]])}));
			setTimeout(function() { go("'html':'loaded'"); }, 500);;
		} else {
			$.getJSON(app.server+'/gettables?cat='+params[1]+'&callback=?', function(data) {
				if(!app.apierror) {
					app.apiok = 1;
					localStorage["ekranas.tables."+params[1]] = JSON.stringify(data);
					localStorage["ekranas.tables."+params[1]+".time"] = +new Date();
					$('body').html(coco.tables({dpi: app.dpi, 'table': data}));
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			});
			
			setTimeout(function() {
				if(!app.apiok) {
					app.apierror = 1;
					$('body').css('background-color', '#fff');
					$('body').html(coco.apierror());
					tables(params);
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			}, 5000);
		}
	}
	function calendar() {
		app.apierror = 0;
		app.apiok = 0;
		$('body').css('background-color', '#fff');
		
		var time = 0;
		if(localStorage["ekranas.calendar.time"]) {
			time = localStorage["ekranas.calendar.time"];
		}
		
		if(time && localStorage["ekranas.calendar"] && time/1000/60+24 > +new Date()/1000/60) {
			$('body').html(coco.calendar({dpi: app.dpi, 'calendar': eval(localStorage["ekranas.calendar"])}));
			setTimeout(function() { go("'html':'loaded'"); }, 500);;
		} else {
			$.getJSON(app.server+'/getcalendar?callback=?', function(data) {
				if(!app.apierror) {
					app.apiok = 1;
					localStorage["ekranas.calendar"] = JSON.stringify(data);
					localStorage["ekranas.calendar.time"] = +new Date();
					$('body').html(coco.calendar({dpi: app.dpi, 'calendar': data}));
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			});
			
			setTimeout(function() {
			if(!app.apiok) {
					app.apierror = 1;
					$('body').css('background-color', '#fff');
					$('body').html(coco.apierror());
					calendar();
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			}, 5000);
		}
	}
	function tickets() {
		app.apierror = 0;
		app.apiok = 0;
		if(app.dpi == "_xhdpi") {
			app.dpi = "";
		}
		$('body').css('background-color', '#fff');
		
		//$('body').html('Duomenys nepateikti');
		//setTimeout(function() { go("'html':'loaded'"); }, 500);
		//return;
		
		$.getJSON(app.server+'/gettickets?callback=?', function(data) {
			if(!app.apierror) {
				app.apiok = 1;
				$('body').html(coco.tickets({dpi: app.dpi, 'info':data}));
				setTimeout(function() { go("'html':'loaded'"); }, 500);
			}
		});
		
		setTimeout(function() {
			if(!app.apiok) {
				app.apierror = 1;
				$('body').css('background-color', '#fff');
				$('body').html(coco.apierror());
				tickets();
				setTimeout(function() { go("'html':'loaded'"); }, 500);
			}
		}, 5000);
	}

function media() {
	document.ontouchstart = function(e) {
		e.preventDefault();
	}
	$('body').append(coco.media());
	
	$('.mainmenu .item').each(function() {
		app.click(function(obj) {
			go("'go':'"+obj.attr('data-go')+"'");
		}, this);
	});
	setTimeout(function() { go("'html':'loaded'"); }, 500);
}
	function fketv() {
		$('body').css('background-color', '#fff');
		
		app.apierror = 0;
		app.apiok = 0;
		
		//$('body').html('Duomenys nepateikti');
		//setTimeout(function() { go("'html':'loaded'"); }, 500);
		//return;
		
		$('body').append('<div class="list" id="tv-list"></div>');
		
		var time = 0;
		if(localStorage["ekranas.tv."+app.home.offset+".time"]) {
			time = localStorage["ekranas.tv."+app.home.offset+".time"];
		}
		
		if(time && localStorage["ekranas.tv."+app.home.offset] && time/1000/60+24 > +new Date()/1000/60) {
			var data = eval(localStorage["ekranas.tv."+app.home.offset]);
			$('#err').remove();
			fketvRender(data);
			app.delegateClick(function(obj) {
				go("'media':'video','url':'"+obj.attr('data-url')+"'");
			}, '#tv-list', '.news');
			if(data.length > 9) {
				fketvAddLoadMore();
			}
			setTimeout(function() { go("'html':'loaded'"); }, 500);;
		} else {
			$.getJSON(app.server+'/gettv?limit=10&offset='+app.home.offset+'&callback=?', function(data) {
				if(!app.apierror) {
					app.apiok = 1;
					data = data.items;
					localStorage["ekranas.tv."+app.home.offset] = JSON.stringify(data);
					localStorage["ekranas.tv."+app.home.offset+".time"] = +new Date();
					$('#err').remove();
					fketvRender(data);
					app.delegateClick(function(obj) {
						go("'media':'video','url':'"+obj.attr('data-url')+"'");
					}, '#tv-list', '.news');
					if(data.length > 9) {
						fketvAddLoadMore();
					}
					setTimeout(function() { go("'html':'loaded'"); }, 500);;
				};
				setTimeout(function() {
				if(!app.apiok) {
					app.apierror = 1;
					$('body').css('background-color', '#fff');
					$('body').html(coco.apierror());
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			}, 5000);
			});
			
			setTimeout(function() {
				if(!app.apiok) {
					app.apierror = 1;
					$('body').css('background-color', '#fff');
					$('body').html(coco.apierror());
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			}, 5000);
		}
	}
	function fketvAddLoadMore() {
		$('body').append(coco.load());
		$('.load-more').text('Daugiau video');
		app.click(function(obj) {
			if(!app.test) {
				app.test = 1;
				$('.load-more').text('Kraunama...');
				fketvAdd(app.home.offset);
				app.test = 0;
			}
		}, '.load-more');
		window.onscroll = function(e) {
			var test = $('.list').offset();
			var test2 = $('.load-more').offset();
			if(window.innerHeight+window.pageYOffset > test.height+test2.height - 200) {
				if(!app.test) {
					app.test = 1;
					$('.load-more').text('Kraunama...');
					fketvAdd(app.home.offset);
				}
			}
		}
	}
	function fketvAdd(offset) {
		app.home.offset += 10;
		var time = 0;
		if(localStorage["ekranas.tv."+app.home.offset+".time"]) {
			time = localStorage["ekranas.tv."+app.home.offset+".time"];
		}
		if(time && localStorage["ekranas.tv."+app.home.offset] && time/1000/60+24 > +new Date()/1000/60) {
			fketvRender(eval(localStorage["ekranas.tv."+app.home.offset]));
		} else {
			$.getJSON(app.server+'/gettv?limit=10&offset='+app.home.offset+'&callback=?', function(data) {
				if(!app.apierror) {
					app.apiok = 1;
					data = data.items;
					localStorage["ekranas.tv."+app.home.offset] = JSON.stringify(data);
					localStorage["ekranas.tv."+app.home.offset+".time"] = +new Date();
					fketvRender(data);
				}
				
				setTimeout(function() {
					if(!app.apiok) {
						app.apierror = 1;
						$('body').css('background-color', '#fff');
						$('body').html(coco.apierror());
						setTimeout(function() { go("'html':'loaded'"); }, 500);
					}
				}, 5000);
			});
		}
	}
	function fketvRender(data) {
		$('#tv-list').append(coco.tv({items: data}));
		if(data.length < 10) {
			$('.load-more').remove();
			window.onscroll = function(e) {
				
			}
		} else {
			$('.load-more').text('Daugiau video');
		}
		app.test = 0;
	}
	function fkelive(view, reload) {
		app.apierror = 0;
		app.apiok = 0;
		$('body').css('background-color', '#fff');
		$('html').css('background-color', '#fff');
		
		$.getJSON(app.server+'/getfkelive?callback=?', function(data) {
			if(!app.apierror) {
				app.apiok = 1;
				$('body').html(coco.fkelive({data:data}));
				setTimeout(function() {
					$('#live-loader').html("<p style='text-align: center;'>Atnaujinami duomenys</p>");
					setTimeout(function() {
						fkelive("fkelive", 1);
					}, 1000);
				}, 15000);
				if(!reload) {
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			}
		});
		
		setTimeout(function() {
			if(!app.apiok) {
				app.apierror = 1;
				$('body').css('background-color', '#fff');
				$('body').html(coco.apierror());
				fkelive();
				setTimeout(function() { go("'html':'loaded'"); }, 500);
			}
		}, 5000);
	}
	function galleries() {
		$('body').css('background-color', '#fff');
		$('body').append('<div class="list" id="g-list"></div>');
		
		var time = 0;
		if(localStorage["ekranas.g."+app.home.offset+".time"]) {
			time = localStorage["ekranas.g."+app.home.offset+".time"];
		}
		
		if(time && localStorage["ekranas.g."+app.home.offset] && time/1000/60+24 > +new Date()/1000/60) {
			var data = eval("d="+localStorage["ekranas.g."+app.home.offset]);
			galleriesRender(data);
			app.delegateClick(function(obj) {
				go("'go':'gallery','params':'/id/"+obj.attr('data-id')+"'");
			}, '#g-list', '.news');
			if(data.length > 9) {
				galleriesAddLoadMore();
			}
			setTimeout(function() { go("'html':'loaded'"); }, 500);;
		} else {
			$.getJSON(app.server+'/getgalleries?limit=10&offset='+app.home.offset+'&callback=?', function(data) {
				if(!app.apierror) {
					app.apiok = 1;
					data = data.items;
					localStorage["ekranas.g."+app.home.offset] = JSON.stringify(data);
					localStorage["ekranas.g."+app.home.offset+".time"] = +new Date();
					galleriesRender(data);
					app.delegateClick(function(obj) {
						go("'go':'gallery','params':'/id/"+obj.attr('data-id')+"'");
					}, '#g-list', '.news');
					if(data.length > 9) {
						galleriesAddLoadMore();
					}
					setTimeout(function() { go("'html':'loaded'"); }, 500);;
				}
			});
			
			setTimeout(function() {
				if(!app.apiok) {
					app.apierror = 1;
					$('body').css('background-color', '#fff');
					$('body').html(coco.apierror());
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			}, 5000);
		}
	}
	function galleriesAddLoadMore() {
		$('body').append(coco.load());
		$('.load-more').text('Daugiau nuotraukų');
		app.click(function(obj) {
			if(!app.test) {
				app.test = 1;
				$('.load-more').text('Kraunama...');
				galleriesAdd(app.home.offset);
				app.test = 0;
			}
		}, '.load-more');
		window.onscroll = function(e) {
			var test = $('.list').offset();
			var test2 = $('.load-more').offset();
			if(window.innerHeight+window.pageYOffset > test.height+test2.height - 200) {
				if(!app.test) {
					app.test = 1;
					$('.load-more').text('Kraunama...');
					galleriesAdd(app.home.offset);
				}
			}
		}
	}
	function galleriesAdd(offset) {
		app.home.offset += 10;
		var time = 0;
		if(localStorage["ekranas.g."+app.home.offset+".time"]) {
			time = localStorage["ekranas.g."+app.home.offset+".time"];
		}
		if(time && localStorage["ekranas.g."+app.home.offset] && time/1000/60+24 > +new Date()/1000/60) {
			galleriesRender(eval("d="+localStorage["ekranas.g."+app.home.offset]));
		} else {
			$.getJSON(app.server+'/getgalleries?limit=10&offset='+app.home.offset+'&callback=?', function(data) {
				if(!app.apierror) {
					app.apiok = 1;
					data = data.items;
					localStorage["ekranas.g."+app.home.offset] = JSON.stringify(data);
					localStorage["ekranas.g."+app.home.offset+".time"] = +new Date();
					galleriesRender(data);
				}
			});
			setTimeout(function() {
				if(!app.apiok) {
					app.apierror = 1;
					$('body').css('background-color', '#fff');
					$('body').html(coco.apierror());
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			}, 5000);
		}
	}
	function galleriesRender(data) {
		$('#g-list').append(coco.galleries({items: data}));
		if(data.length < 10) {
			$('.load-more').remove();
			window.onscroll = function(e) {};
		} else {
			$('.load-more').text('Daugiau Nuotraukų');
		}
		app.test = 0;
	}
		function gallery(params) {
			
			var time = 0;
			if(localStorage["ekranas.gallery."+params[2]+".time"]) {
				time = localStorage["ekranas.gallery."+params[2]+".time"];
			}
			$('body').css('background-color', '#fff');
			if(time && localStorage["ekranas.gallery."+params[2]] && time/1000/60+24 > +new Date()/1000/60) {
				$('body').append(coco.gallery({dpi: app.dpi,pics: eval(localStorage["ekranas.gallery."+params[2]])}));
				$('.gimage').bind('click', function(e) {
					// $('body').prepend(coco.image({image: $(this).data('url')}));
					// $('#imageview').css('top',document.body.scrollTop+'px');
					// //$('body').css('overflow','hidden');
					// $('body').bind('touchmove', function() {
						// $('#imageview').remove();
					// })
					go("'go':'photo','params':'/id/"+$(this).data('id')+"/galleryid/"+params[2]+"'");
					// window.location.hash = "photo/id/1/galleryid/"+params[2];
					// window.location.reload();
					// window.location.reload();
				});
				setTimeout(function() { go("'html':'loaded'"); }, 500);;
			} else {
				$.getJSON(app.server+'/getgallery?id='+params[2]+'&callback=?', function(data) {
					if(!app.apierror) {
						app.apiok = 1;
						var i = 0;
						var count = 0;
						var d = Array();
						//d.rows = new Array();
						var temp = new Array();
						for(var pic in data.images) {
							if(i == 3) {
								d.push(temp);
								i = 0;
								temp = new Array();
							}
							temp.push(data.images[pic]);
							i++;
							count++;
						}
						d.push(temp);
						//d.title = data.title;
						localStorage["ekranas.gallery."+params[2]] = JSON.stringify(d);
						localStorage["ekranas.gallery."+params[2]+".count"] = count;
						localStorage["ekranas.gallery."+params[2]+".time"] = +new Date();
						$('body').append(coco.gallery({dpi: app.dpi,pics: d}));
						$('.gimage').bind('click', function(e) {
							// $('body').prepend(coco.image({image: $(this).data('url')}));
							// $('#imageview').css('top',document.body.scrollTop+'px');
							// //$('body').css('overflow','hidden');
							// $('body').bind('touchmove', function() {
								// $('#imageview').remove();
							// })
							go("'go':'photo','params':'/id/"+$(this).data('id')+"/galleryid/"+params[2]+"'");
						});
						setTimeout(function() { go("'html':'loaded'"); }, 500);;
					}
				});
				
				setTimeout(function() {
					if(!app.apiok) {
						app.apierror = 1;
						$('body').css('background-color', '#fff');
						$('body').html(coco.apierror());
						setTimeout(function() { go("'html':'loaded'"); }, 500);
					}
				}, 5000);
			}
		}
		
function photo(params) {
	var time = 0;
	if(localStorage["ekranas.gallery."+params[4]+".time"]) {
		time = localStorage["ekranas.gallery."+params[4]+".time"];
	}
	//$('body').css('background-color', '#fff');
	if(time && localStorage["ekranas.gallery."+params[4]] && time/1000/60+24 > +new Date()/1000/60) {
		setTimeout(function() {
			var pics = eval(localStorage["ekranas.gallery."+params[4]]);
			var count = localStorage["ekranas.gallery."+params[4]+".count"];
			$('body').append(coco.photo({w: $('body').width(),h:$('body').height(),sw: $('body').width()*count,pics: pics}));
			myScroll = new iScroll('scroller', {
				snap:true,
				momentum:false,
				hScrollbar:false,
				vScrollbar:false,
				vScroll:false,
				onScrollEnd: function () {
					window.location.hash = "photo/id/"+this.currPageX+"/galleryid/"+params[4];
					var k = this.currPageX;
					$('.galimage').each(function(i) {
						if(i == k || i == k-1 || i == k+1) {
							var o = $(this);
							if(o.data('src') !== "") {
								o.attr('src', o.data('src'));
								o.data('src', '');
							}
						}
					});
				}
			});
			myScroll.scrollToPage(params[2], 0, 0);
			setTimeout(function() { go("'html':'loaded'"); }, 500);
			
			var k = +params[2];
			$('.galimage').each(function(i) {
				if(i == k || i == k-1 || i == k+1) {
					var o = $(this);
					if(o.data('src') !== "") {
						o.attr('src', o.data('src'));
						o.data('src', '');
					}
				}
			});
		}, 200);
	} else {
		$.getJSON(app.server+'/getgallery?id='+params[4]+'&callback=?', function(data) {
			if(!app.apierror) {
				app.apiok = 1;
				var i = 0;
				var count = 0;
				var d = Array();
				//d.rows = new Array();
				var temp = new Array();
				for(var pic in data.images) {
					if(i == 3) {
						d.push(temp);
						i = 0;
						temp = new Array();
					}
					temp.push(data.images[pic]);
					count++;
					i++;
				}
				d.push(temp);
				//d.title = data.title;
				localStorage["ekranas.gallery."+params[4]] = JSON.stringify(d);
				localStorage["ekranas.gallery."+params[4]+".count"] = count;
				localStorage["ekranas.gallery."+params[4]+".time"] = +new Date();
				setTimeout(function() {
					$('body').append(coco.photo({w: $('body').width(),h:$('body').height(),sw: $('body').width()*count,pics: d}));
					myScroll = new iScroll('scroller', {
						snap:true,
						momentum:false,
						hScrollbar:false,
						vScrollbar:false,
						vScroll:false,
						onScrollEnd: function () {
							window.location.hash = "photo/id/"+this.currPageX+"/galleryid/"+params[4];
						}
					});
					myScroll.scrollToPage(params[2], 0, 0);
					setTimeout(function() { go("'html':'loaded'"); }, 500);;
				}, 200);
			}
		});
		
		setTimeout(function() {
			if(!app.apiok) {
				app.apierror = 1;
				$('body').css('background-color', '#fff');
				$('body').html(coco.apierror());
				setTimeout(function() { go("'html':'loaded'"); }, 500);
			}
		}, 5000);
	}
}

	function fkemobile() {
		app.apierror = 0;
		app.apiok = 0;
		$('body').css('background-color', '#fff');
		
		//$('body').html('Duomenys nepateikti');
		//setTimeout(function() { go("'html':'loaded'"); }, 500);
		//return;
		
		$('#meta-dpi').attr('content', 'target-densitydpi=medium-dpi');
		$('.css-dpi').remove();
		$('body').css('background-color', '#fff');

		$.getJSON(app.server+'/gettotalizer?callback=?', function(data) {
			if(!app.apierror) {
				app.apiok = 1;
				$('body').html(coco.fkemobile({data: data}));
				$('#totalize').bind('click', function(e){
					if($('#left').val() != "" && $('#right').val() != "") {
						go("'media':'sms','number':'1567','text':'FKE "+$('#left').val()+":"+$('#right').val()+"'");
					}
				});
				$('#cleartotalize').bind('click', function(e){
					$('#left').val('');
					$('#right').val('')
				});
				setTimeout(function() { go("'html':'loaded'"); }, 500);;
			}
		});
		
		setTimeout(function() {
			if(!app.apiok) {
				app.apierror = 1;
				$('body').css('background-color', '#fff');
				$('body').html(coco.apierror());
				fkemobile();
				setTimeout(function() { go("'html':'loaded'"); }, 500);
			}
		}, 5000);
	}

function klubas() {
	document.ontouchstart = function(e) {
		e.preventDefault();
	}
	$('body').append(coco.klubas());
	
	$('.mainmenu .item').each(function() {
		app.click(function(obj) {
			go("'go':'"+obj.attr('data-go')+"'");
		}, this);
	});
	setTimeout(function() { go("'html':'loaded'"); }, 500);
}
	function history() {
		$('body').css('background-color', '#fff');
		$('html').css('background-color', '#fff');
		$('body').html('<div id="body" style="background: #fff;"></div>');
		
		var time = 0;
		if(localStorage["ekranas.history.time"]) {
			time = localStorage["ekranas.history.time"];
		}
		if(time && localStorage["ekranas.history"] && time/1000/60+1000 > +new Date()/1000/60) {
			$('#body').html(localStorage["ekranas.history"]);
			setTimeout(function() { go("'html':'loaded'"); }, 500);
		} else {
			$.getJSON(app.server+'/gethistory?dpi='+app.dpi+'&callback=?', function(data) {
				if(!app.apierror) {
					app.apiok = 1;
					$('#body').html(data.text);
					localStorage["ekranas.history"] = data.text;
					localStorage["ekranas.history.time"] = +new Date();
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			});
			setTimeout(function() {
				if(!app.apiok) {
					app.apierror = 1;
					$('body').css('background-color', '#fff');
					$('body').html(coco.apierror());
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			}, 6000);
		}
	}
	function stadium() {
		$('body').css('background-color', '#fff');
		$('html').css('background-color', '#fff');
		$('body').html('<div id="body" style="background: #fff;"></div>');
		
		var time = 0;
		if(localStorage["ekranas.stadium.time"]) {
			time = localStorage["ekranas.stadium.time"];
		}
		if(time && localStorage["ekranas.stadium"] && time/1000/60+1000 > +new Date()/1000/60) {
			$('#body').html(localStorage["ekranas.stadium"]);
			setTimeout(function() { go("'html':'loaded'"); }, 500);
		} else {
			$.getJSON(app.server+'/getstadium?dpi='+app.dpi+'&callback=?', function(data) {
				if(!app.apierror) {
					app.apiok = 1;
					$('#body').html(data.text);
					localStorage["ekranas.stadium"] = data.text;
					localStorage["ekranas.stadium.time"] = +new Date();
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			});
			setTimeout(function() {
				if(!app.apiok) {
					app.apierror = 1;
					$('body').css('background-color', '#fff');
					$('body').html(coco.apierror());
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			}, 6000);
		}
	}
	function administration() {
		$('body').css('background-color', '#fff');
		$('html').css('background-color', '#fff');
		$('body').html('<div id="body" style="background: #fff;"></div>');
		
		var time = 0;
		if(localStorage["ekranas.administration.time"]) {
			time = localStorage["ekranas.administration.time"];
		}
		if(time && localStorage["ekranas.administration"] && time/1000/60+1000 > +new Date()/1000/60) {
			$('#body').html(localStorage["ekranas.administration"]);
			setTimeout(function() { go("'html':'loaded'"); }, 500);
		} else {
			$.getJSON(app.server+'/getadministration?dpi='+app.dpi+'&callback=?', function(data) {
				if(!app.apierror) {
					app.apiok = 1;
					$('#body').html(data.text);
					localStorage["ekranas.administration"] = data.text;
					localStorage["ekranas.administration.time"] = +new Date();
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			});
			setTimeout(function() {
				if(!app.apiok) {
					app.apierror = 1;
					$('body').css('background-color', '#fff');
					$('body').html(coco.apierror());
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			}, 6000);
		}
	}
	function sponsors() {
		$('body').css('background-color', '#fff');
		$('html').css('background-color', '#fff');
		$('body').html('<div id="body" style="background: #fff;"></div>');
		
		var time = 0;
		if(localStorage["ekranas.sponsors.time"]) {
			time = localStorage["ekranas.sponsors.time"];
			setTimeout(function() { go("'html':'loaded'"); }, 500);
		}
		if(time && localStorage["ekranas.sponsors"] && time/1000/60+1000 > +new Date()/1000/60) {
			$('#body').html(localStorage["ekranas.sponsors"]);
		} else {
			$.getJSON(app.server+'/getsponsors?dpi='+app.dpi+'&callback=?', function(data) {
				if(!app.apierror) {
					app.apiok = 1;
					$('#body').html(data.text);
					localStorage["ekranas.sponsors"] = data.text;
					localStorage["ekranas.sponsors.time"] = +new Date();
					setTimeout(function() { go("'html':'loaded'"); }, 500);;
				}
			});
			setTimeout(function() {
				if(!app.apiok) {
					app.apierror = 1;
					$('body').css('background-color', '#fff');
					$('body').html(coco.apierror());
					setTimeout(function() { go("'html':'loaded'"); }, 500);
				}
			}, 6000);
		}
	}

function more() {
	$('body').css('background-color', '#fff');
	$('body').append(coco.more());
	
	app.delegateClick(function(obj) {
		if(obj.attr('data-go')) {
			go("'go':'"+obj.attr('data-go')+"'");
		} else if(obj.attr('data-link')) {
			window.location.href = obj.attr('data-link');
		}
	}, '.more', '.more-item');
	setTimeout(function() { go("'html':'loaded'"); }, 500);;
}
	function feedback() {
		$('#meta-dpi').attr('content', 'target-densitydpi=medium-dpi');
		$('.css-dpi').remove();
		$('body').css('background-color', '#fff');
		$('body').append(coco.feedback());
		setTimeout(function() { go("'html':'loaded'"); }, 500);
	}
	app.clearFeedbackForm = function() {
		$('#name').val('');
		$('#email').val('');
		$('#text').val('');
		$('#name').css('border','none');
		$('#email').css('border','none');
		$('#text').css('border','none');
	}
	app.sendfeedback = function() {
		
		$('#msg').remove();
		
		$('#name').css('border','none');
		$('#email').css('border','none');
		$('#text').css('border','none');
		
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		
		if($('#name').val() == "") {
			$('#name').css('border','1px solid red');
		}
		if($('#email').val() == "") {
			$('#email').css('border','1px solid red');
		}
		if($('#text').val() == "") {
			$('#text').css('border','1px solid red');
		}
		
		if($('#name').val() != "" && $('#email').val() != "" && $('#text').val() != "") {
			
			if(reg.test($('#email').val()) == false) {
				$('#email').css('border','1px solid red');
				return false;
			}
			
			$('#name').disabled = true;
			$('#email').disabled = true;
			$('#text').disabled = true;
			$('.red').disabled = true;
			$('.red').val("Siunčia..");
			
			$.getJSON(app.server+'/feedback?name='+$('#name').val()+'&email='+$('#email').val()+'&text='+$('#text').val()+'&callback=?', function(data) {
				if(!app.apierror) {
					app.apiok = 1;
					if(data.ok) {
						$('.feedback').prepend('<span id="msg">Jūsų žinutė išsiųsta!</span>');
						app.clearFeedbackForm();
					} else {
						$('.feedback').prepend('<span id="msg">'+data.error+'<span>');
					}
					$('#name').disabled = false;
					$('#email').disabled = false;
					$('#text').disabled = false;
					$('.red').disabled = false;
					$('.red').val("Siųsti");
				}
			});
			
			setTimeout(function() {
				if(!app.apiok) {
					app.apierror = 1;
					$('.feedback').prepend('<span id="msg">Jūsų žinutė neišsiųsta. Patikrinkite interneto ryšį.<span>');
					$('#name').disabled = false;
					$('#email').disabled = false;
					$('#text').disabled = false;
					$('.red').disabled = false;
					$('.red').val("Siųsti");
				}
			}, 5000);
		}
	}
	function geeks() {
		$('body').css('background-color', '#fff');
		document.ontouchstart = function(e) {
			e.preventDefault();
		}
		$('body').append(coco.geeks({dpi: app.dpi}));
		$('#geeks').parent('a').bind('click', function(e) {
			e.preventDefault();
			//alert('cocotp');
			//window.location.href = "cocotp://www.ito.lt";
			return false;
		});
		app.click(function() {
			window.location.href = "cocotp://www.ito.lt";
		}, $('#geeks'));
		setTimeout(function() { go("'html':'loaded'"); }, 500);
	}

app.hashcheck = function() {
	var hash = window.location.hash;
	if(hash != app.hash) {
		app.hash = hash;
		$('body').html('');
		app.onload();
	}
}

app.delegateClick = function(f, a, b) {
	var onstart = "touchstart";
	var onend = "touchend";
	var onmove = "touchmove";
	
	// if(!app.isTouch) {
		// onstart = "mousedown";
		// onend = "mouseup";
		// onmove = "mousemove";
	// }
	$(a).delegate(b, onstart, function(e) {
		//var cursor = getCursor(e);
		app.touchstart.x = e.touches[0].pageX;
		app.touchstart.y = e.touches[0].pageY;
		app.touchpos.x = e.touches[0].pageX;
		app.touchpos.y = e.touches[0].pageY;
		var obj = $(this);
		$(a).removeClass('active');
		app.highlight = setTimeout(function() {
			obj.addClass('active');
		}, 100);
		$(a).delegate(b, onmove, function(e) {
			var obj = $(this);
			//var cursor = getCursor(e);
			app.touchpos.x = e.targetTouches[0].pageX;
			app.touchpos.y = e.targetTouches[0].pageY;
			if(app.touchpos.y < app.touchstart.y-10 || app.touchpos.y > app.touchstart.y+10) {
				$(a).unbind(onmove+' '+onend);
				if(app.highlight) {
					clearTimeout(app.highlight);
				}
				obj.removeClass('active');
				//obj.html(obj.html());
			}
		});
		$(a).delegate(b, onend, function(e) {
			var obj = $(this);
			if(app.highlight) {
				clearTimeout(app.highlight);
			}
			if(app.touchpos.y > app.touchstart.y-10 && app.touchpos.y < app.touchstart.y+10) {
				obj.addClass('active');
				//obj.html(obj.html());
				setTimeout(function() {
					obj.removeClass('active');
				}, 500);
				f(obj);
			} else {
				$(a).unbind(onmove+' '+onend);
				obj.removeClass('active');
				//obj.html(obj.html());
			}
		});
	});
}

app.click = function(f, a) {
	var onstart = "touchstart";
	var onend = "touchend";
	var onmove = "touchmove";
	
	if(!app.isTouch) {
		onstart = "mousedown";
		onend = "mouseup";
		onmove = "mousemove";
	}
	$(a).bind(onstart, function(e) {
		var cursor = getCursor(e);
		app.touchstart.x = cursor.x;//e.touches[0].pageX;
		app.touchstart.y = cursor.y;//e.touches[0].pageY;
		app.touchpos.x = cursor.x;//e.touches[0].pageX;
		app.touchpos.y = cursor.y;//e.touches[0].pageY;
		var obj = $(this);
		//$(a).removeClass('active');
		app.highlight = setTimeout(function() {
			obj.addClass('active');
		}, 100);
		$(a).bind(onmove, function(e) {
			var obj = $(this);
			var cursor = getCursor(e);
			app.touchpos.x = cursor.x;//e.targetTouches[0].pageX;
			app.touchpos.y = cursor.y;//e.targetTouches[0].pageY;
			if(app.touchpos.y < app.touchstart.y-10 || app.touchpos.y > app.touchstart.y+10) {
				$(a).unbind(onmove+' '+onend);
				if(app.highlight) {
					clearTimeout(app.highlight);
				}
				obj.removeClass('active');
				//obj.html(obj.html());
			}
		});
		$(a).bind(onend, function(e) {
			var obj = $(this);
			if(app.highlight) {
				clearTimeout(app.highlight);
			}
			if(app.touchpos.y > app.touchstart.y-10 && app.touchpos.y < app.touchstart.y+10) {
				obj.addClass('active');
				//obj.html(obj.html());
				setTimeout(function() {
					obj.removeClass('active');
				}, 500);
				f(obj);
			} else {
				$(a).unbind(onmove+' '+onend);
				obj.removeClass('active');
				//obj.html(obj.html());
			}
		});
	});
}

function getCursor(e) {
	var cursor = Object();
	cursor.x = 0;
	cursor.y = 0;
	if(app.isTouch) {
		cursor.x = e.touches[0].pageX;
		cursor.y = e.touches[0].pageY;
	} else {
		cursor.x = e.pageX;
		cursor.y = e.pageY;
	}
	return cursor;
}
function isTouch() {
   var el = document.createElement('div');
   el.setAttribute('ongesturestart', 'return;');
   if(typeof el.ongesturestart == "function"){
      return true;
   }else {
      return false
   }
}
function go(params) {
	// console.log(params);
	// if($.os.ios || $.os.android) {
		window.location.href='coco://params={'+params+'}';
	// } else {
		// temp = 'req = {'+params+'}';
		// eval(temp);
		// if(req.go) {
			// if(req.params) {
				// window.location.hash = req.go+req.params;
			// } else {
				// window.location.hash = req.go;
			// }
		// }
	// }
}