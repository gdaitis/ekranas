// This file was automatically generated from test.soy.
// Please don't edit this file by hand.

if (typeof coco == 'undefined') { var coco = {}; }


coco.load = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="load-more">Daugiau naujienų</div>');
  if (!opt_sb) return output.toString();
};


coco.news = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t');
  var itemList6 = opt_data.items;
  var itemListLen6 = itemList6.length;
  for (var itemIndex6 = 0; itemIndex6 < itemListLen6; itemIndex6++) {
    var itemData6 = itemList6[itemIndex6];
    output.append('<div class="news"', (itemData6.type == 'news') ? 'data-type="article" data-id="' + soy.$$escapeHtml(itemData6.id) + '"' : (itemData6.type == 'video') ? 'data-type="video" data-url="' + soy.$$escapeHtml(itemData6.url) + '"' : (itemData6.type == 'gallery') ? 'data-type="gallery" data-id="' + soy.$$escapeHtml(itemData6.id) + '"' : '', '><div class="arrow"><img src="', soy.$$escapeHtml(itemData6['img']), soy.$$escapeHtml(opt_data.dpi), '" onload="$(this).addClass(\'loaded\');" /><div class="info">', (itemData6['type'] == 'news') ? '<span>NAUJIENOS</span>' : (itemData6['type'] == 'video') ? '<span>FKE TV</span>' : (itemData6['type'] == 'gallery') ? '<span>FOTO</span>' : '', '<span class="right">', soy.$$escapeHtml(itemData6['date']), '</span></div><div class="title">', soy.$$escapeHtml(itemData6['title']), '</div></div></div>');
  }
  if (!opt_sb) return output.toString();
};


coco.tv = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class="list">');
  var itemList40 = opt_data.items;
  var itemListLen40 = itemList40.length;
  for (var itemIndex40 = 0; itemIndex40 < itemListLen40; itemIndex40++) {
    var itemData40 = itemList40[itemIndex40];
    output.append('<div class="news" data-url="', soy.$$escapeHtml(itemData40.url), '"><div class="arrow"><img src="', soy.$$escapeHtml(itemData40['img']), '" onload="$(this).addClass(\'loaded\');" /><div class="info"><span>', soy.$$escapeHtml(itemData40['date']), '</span></div><div class="title">', soy.$$escapeHtml(itemData40['title']), '</div></div></div>');
  }
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


coco.galleries = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class="list" id="gal">');
  var itemList54 = opt_data.items;
  var itemListLen54 = itemList54.length;
  for (var itemIndex54 = 0; itemIndex54 < itemListLen54; itemIndex54++) {
    var itemData54 = itemList54[itemIndex54];
    output.append('<div class="news galleries" data-id="', soy.$$escapeHtml(itemData54.id), '"><div class="arrow"><img src="', soy.$$escapeHtml(itemData54['img']), '" onload="$(this).addClass(\'loaded\');" /><div class="info"><span>', soy.$$escapeHtml(itemData54['date']), '</span></div><div class="title">', soy.$$escapeHtml(itemData54['title']), '</div></div></div>');
  }
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


coco.sezonas = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<table style="width: 100%; height: 100%;"><tr><td style="width: 100%; height: 100%;"><div class="mainmenu"><h2>Sezonas</h2><div><div class="item" data-go="team"><div class="menu-img" id="menu-team"></div>Komanda</div><div class="item" data-go="calendar"><div class="menu-img" id="menu-calendar"></div>Kalendorius</div><div class="item" data-go="tables"><div class="menu-img" id="menu-tables"></div>Lentelės</div><div class="item" data-go="tickets"><div class="menu-img" id="menu-tickets"></div>Bilietai</div></div></div></td></tr></table>');
  if (!opt_sb) return output.toString();
};


coco.media = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<table style="width: 100%; height: 100%;"><tr><td style="width: 100%; height: 100%;"><div class="mainmenu"><h2>Media</h2><div><div class="item" data-go="fketv");"><div class="menu-img" id="menu-fketv"></div>FKE TV</div><div class="item" data-go="fkelive"><div class="menu-img" id="menu-fkelive"></div>FKE LIVE</div><div class="item" data-go="galleries");"><div class="menu-img" id="menu-galleries"></div>Foto galerija</div><div class="item" data-go="fkemobile"><div class="menu-img" id="menu-fkemobile"></div>FKE MOBILE</div></div></div></td></tr></table>');
  if (!opt_sb) return output.toString();
};


coco.klubas = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<table style="width: 100%; height: 100%;"><tr><td style="width: 100%; height: 100%;"><div class="mainmenu"><h2>Klubas</h2><div><div class="item" data-go="history"><div class="menu-img" id="menu-history"></div>Istorija</div><div class="item" data-go="stadium"><div class="menu-img" id="menu-stadium"></div>Stadionas</div><div class="item" data-go="administration"><div class="menu-img" id="menu-administration"></div>Administracija</div><div class="item" data-go="sponsors"><div class="menu-img" id="menu-sponsors"></div>Rėmėjai</div></div></div></td></tr></table>');
  if (!opt_sb) return output.toString();
};


coco.more = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class="more"><div class="list more-item" data-go="feedback"><div class="arrow"><div class="more-item-img more-mail"></div>Feedback</div></div><div class="list more-item" data-link="cocotp://facebook.com/fkekranas"><div class="arrow"><div class="more-item-img more-link"></div>Ekranas Facebook\'e</div></div><div class="list more-item" data-link="cocotp://www.fkekranas.lt"><div class="arrow"><div class="more-item-img more-link"></div>www.fkekranas.lt</div></div><div class="list more-item" data-link="cocotp://www.pirmoji-armada.lt"><div class="arrow"><div class="more-item-img more-link"></div>Ekrano fanai "Pirmoji Armada"</div></div><div class="list more-item" data-go="geeks"><div class="arrow"><div class="more-item-img more-tools"></div>Aplikacijos kūrėjai</div></div></div>');
  if (!opt_sb) return output.toString();
};


coco.feedback = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<table style="width: 100%; height: 100%;"><tr><td valign="middle" style="width: 100%; height: 100%;"><div class=\'feedback white\'><div class="feedback-form"><input class="input" type="text" id="name" placeholder="Vardas" /><input class="input" type="email" id="email" placeholder="E-mail" /><textarea class="input" id="text" placeholder="Tekstas"></textarea><input type="button" class="button red" value="Siųsti" onclick="app.sendfeedback();" /><input type="button" class="button grey" value="Išvalyti" onclick="app.clearFeedbackForm();" /></div></div></td></tr></table>');
  if (!opt_sb) return output.toString();
};


coco.geeks = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'geeks white\'><table style="width: 100%; height: 100%; text-align: center;"><tr><td valign="center" style="width: 100%; height: 100%; text-align: center;"><a href="http://www.ito.lt"><img id="geeks" src="i/logo', soy.$$escapeHtml(opt_data.dpi), '.png" /></a></td></tr></table></div>');
  if (!opt_sb) return output.toString();
};


coco.article = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'article white\'><img src="', soy.$$escapeHtml(opt_data.item['img']), soy.$$escapeHtml(opt_data.dpi), '" /><span class="article-date">', soy.$$escapeHtml(opt_data.item['date']), '</span><div class="article-title">', soy.$$escapeHtml(opt_data.item['title']), '</div><div class="article-body">', opt_data.item['body'], '</div></div>');
  if (!opt_sb) return output.toString();
};


coco.gallery = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'gallery white\'><table class="thumbs">');
  var rowList94 = opt_data.pics;
  var rowListLen94 = rowList94.length;
  for (var rowIndex94 = 0; rowIndex94 < rowListLen94; rowIndex94++) {
    var rowData94 = rowList94[rowIndex94];
    output.append('<tr>');
    var picList96 = rowData94;
    var picListLen96 = picList96.length;
    for (var picIndex96 = 0; picIndex96 < picListLen96; picIndex96++) {
      var picData96 = picList96[picIndex96];
      output.append('<td><img class="gimage" data-id="', soy.$$escapeHtml(picIndex96 + rowIndex94 * 3), '" data-url="', soy.$$escapeHtml(picData96.image), '" src="', soy.$$escapeHtml(picData96.thumb), soy.$$escapeHtml(opt_data.dpi), '" /></td>');
    }
    output.append('</tr>');
  }
  output.append('</table></div>');
  if (!opt_sb) return output.toString();
};


coco.photo = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'photo\' style="width: 100%; height: 100%; overflow: hidden;"><table id="scroller" style="width: ', soy.$$escapeHtml(opt_data.sw), 'px; height: 100%; margin: 0; padding: 0; border: none; border-collapse: collapse;" cellpadding=0 cellspacing=0><tr>');
  var rowList113 = opt_data.pics;
  var rowListLen113 = rowList113.length;
  for (var rowIndex113 = 0; rowIndex113 < rowListLen113; rowIndex113++) {
    var rowData113 = rowList113[rowIndex113];
    var picList114 = rowData113;
    var picListLen114 = picList114.length;
    for (var picIndex114 = 0; picIndex114 < picListLen114; picIndex114++) {
      var picData114 = picList114[picIndex114];
      output.append('<td style="height: 100%; width: ', soy.$$escapeHtml(opt_data.w), 'px; text-align: center; margin: 0; padding: 0; border: none; border-collapse: collapse;" valign="middle"><span id="loading_', soy.$$escapeHtml(picIndex114 + rowIndex113 * 3), '" style="color: #fff;">Kraunama...</span><img style="display: none;" src="', soy.$$escapeHtml(picData114.image), '_', soy.$$escapeHtml(opt_data.w - 10), '_', soy.$$escapeHtml(opt_data.h), '" onload="$(\'#loading_', soy.$$escapeHtml(picIndex114 + rowIndex113 * 3), '\').remove(); $(this).css(\'display\',\'inline\');" /></td>');
    }
  }
  output.append('</tr></table></div>');
  if (!opt_sb) return output.toString();
};


coco.image = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<table id="imageview" class="image" valign="center" onclick="$(\'#imageview\').remove();"><tr><td valign="center"><span id="imgload">Kraunama...</span><img src="', soy.$$escapeHtml(opt_data.image), '" style="display: none; margin: 0 auto;" onload="$(\'#imgload\').remove(); ;$(this).css(\'display\',\'block\');" /></td></tr></table>');
  if (!opt_sb) return output.toString();
};


coco.team = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'white\'>');
  var roleList137 = opt_data.team;
  var roleListLen137 = roleList137.length;
  for (var roleIndex137 = 0; roleIndex137 < roleListLen137; roleIndex137++) {
    var roleData137 = roleList137[roleIndex137];
    output.append('<div class="team-role">', soy.$$escapeHtml(roleData137.role), '</div>');
    var playerList141 = roleData137.players;
    var playerListLen141 = playerList141.length;
    for (var playerIndex141 = 0; playerIndex141 < playerListLen141; playerIndex141++) {
      var playerData141 = playerList141[playerIndex141];
      output.append('<div class="players-list-item', (playerIndex141 == playerListLen141 - 1) ? ' last' : '', '" data-id="', soy.$$escapeHtml(playerData141.id), '"><div class="arrow"><img src="', soy.$$escapeHtml(playerData141.img), soy.$$escapeHtml(opt_data.dpi), '" />', soy.$$escapeHtml(playerData141.name), '</div></div>');
    }
  }
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


coco.player = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class=\'player white\'><img src="', soy.$$escapeHtml(opt_data.player.img), soy.$$escapeHtml(opt_data.dpi), '" style="float: left; margin-right: 5px;" /><span class="player-name">', soy.$$escapeHtml(opt_data.player.name), '</span><br /><b>Pozicija:</b><br />', soy.$$escapeHtml(opt_data.player.position), '<br /><b>Gimimo data:</b><br />', soy.$$escapeHtml(opt_data.player.born), '<br /><b>Ūgis:</b> ', soy.$$escapeHtml(opt_data.player.height), '<br /><b>Svoris:</b> ', soy.$$escapeHtml(opt_data.player.weight), '<div class="clear"></div><p>', opt_data.player.body, '</p></div>');
  if (!opt_sb) return output.toString();
};


coco.tables = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<table class="table" cellpadding="0" cellspacing="0"><tbody><tr style="color: #999;"><td></td><td></td><td></td><td>Pts</td><td>J</td><td>G</td><td>N</td><td>P</td><td>Diff</td></tr>');
  var statList177 = opt_data.table;
  var statListLen177 = statList177.length;
  for (var statIndex177 = 0; statIndex177 < statListLen177; statIndex177++) {
    var statData177 = statList177[statIndex177];
    output.append('<tr class="', (statData177.highlight) ? 'high' : '', '"><td style="font-weight: bold;">1.</td><td class="tableimg" valign="middle"><img src="', soy.$$escapeHtml(statData177.img), soy.$$escapeHtml(opt_data.dpi), '" /></td><td style="text-align: left; padding-left: 5px;">', soy.$$escapeHtml(statData177.name), '</td><td style="font-weight: bold;">', soy.$$escapeHtml(statData177.pts), '</td><td>', soy.$$escapeHtml(statData177.j), '</td><td>', soy.$$escapeHtml(statData177.g), '</td><td>', soy.$$escapeHtml(statData177.n), '</td><td>', soy.$$escapeHtml(statData177.p), '</td><td>', soy.$$escapeHtml(statData177.diff), '</td></tr>');
  }
  output.append('</tbody></talbe>');
  if (!opt_sb) return output.toString();
};


coco.calendar = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="calendar">');
  var monthList204 = opt_data.calendar;
  var monthListLen204 = monthList204.length;
  for (var monthIndex204 = 0; monthIndex204 < monthListLen204; monthIndex204++) {
    var monthData204 = monthList204[monthIndex204];
    if (monthData204.maches) {
      output.append('<div class="month">', soy.$$escapeHtml(monthData204.month), '</div>');
      var matchList210 = monthData204.maches;
      var matchListLen210 = matchList210.length;
      for (var matchIndex210 = 0; matchIndex210 < matchListLen210; matchIndex210++) {
        var matchData210 = matchList210[matchIndex210];
        output.append('<table class="match"><tr><td class="match-team"><img src="', soy.$$escapeHtml(matchData210.leftimg), soy.$$escapeHtml(opt_data.dpi), '"><br />', soy.$$escapeHtml(matchData210.left), '</td><td><span class="match-type">', soy.$$escapeHtml(matchData210.type), '</span><br /><span class="match-date">', soy.$$escapeHtml(matchData210.date), '</span><br /><span class="match-numbers">', soy.$$escapeHtml(matchData210.numbers), '</span></td><td class="match-team"><img src="', soy.$$escapeHtml(matchData210.rightimg), soy.$$escapeHtml(opt_data.dpi), '"><br />', soy.$$escapeHtml(matchData210.right), '</td></tr></table>');
      }
    }
  }
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


coco.tickets = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="tickets white"><p>', opt_data.info.text, '</p><img src="', soy.$$escapeHtml(opt_data.info.img), soy.$$escapeHtml(opt_data.dpi), '" />');
  var ticketList239 = opt_data.info.tickets;
  var ticketListLen239 = ticketList239.length;
  for (var ticketIndex239 = 0; ticketIndex239 < ticketListLen239; ticketIndex239++) {
    var ticketData239 = ticketList239[ticketIndex239];
    output.append('<div class="button buy" onclick="go(\'\\\'media\\\':\\\'sms\\\',\\\'number\\\':\\\'1567\\\',\\\'text\\\':\\\'FKEBILIETAS ', soy.$$escapeHtml(opt_data.info.id), ' ', soy.$$escapeHtml(ticketData239.id), '\\\'\');">Pirkti bilietą - ', soy.$$escapeHtml(ticketData239.name), ' - ', soy.$$escapeHtml(ticketData239.price), ' Lt.<br /><span class="aboutsms">SMS numeriu 1567 su tekstu "FKEBILIETAS ', soy.$$escapeHtml(opt_data.info.id), ' ', soy.$$escapeHtml(ticketData239.id), '"</span></div>');
  }
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


coco.fkelive = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="fkelive white" style="height: 100%;">');
  if (opt_data.data.event) {
    output.append('<table style="width: 100%; height: 100%;"><tr><td style="width: 100%; height: 100%;"><div style="text-align: center;"><p style="paddign: 10px; margin: 0;">Artimiausios rungtynės:</p><h1>', soy.$$escapeHtml(opt_data.data.event), '</h1><p>', soy.$$escapeHtml(opt_data.data.time), '</p><p>', soy.$$escapeHtml(opt_data.data.date), '</p><p>', soy.$$escapeHtml(opt_data.data.place), '</p></div></td></tr></table>');
  } else {
    output.append('<div class="live-score"><span>', soy.$$escapeHtml(opt_data.data.score), '</span></div><div class="live-head"><div class="teams"><span style="float: left;">"', soy.$$escapeHtml(opt_data.data.left), '"</span><span style="float: right;">"', soy.$$escapeHtml(opt_data.data.right), '"</span><div class="clear"></div></div></div><div class="clear"></div>');
    var commentList276 = opt_data.data.comments;
    var commentListLen276 = commentList276.length;
    for (var commentIndex276 = 0; commentIndex276 < commentListLen276; commentIndex276++) {
      var commentData276 = commentList276[commentIndex276];
      output.append('<div class="live-item"', (commentData276.highlight) ? ' style="font-weight: bold;"' : '', '>', soy.$$escapeHtml(commentData276.text), '</div>');
    }
  }
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


coco.fkemobile = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<table style="width: 100%; height: 100%;"><tr><td valign="middle" style="width: 100%; height: 100%;"><div class="fkemobile white"><div class=\'fkemobile white\'><div class="feedback-form"><p>', soy.$$escapeHtml(opt_data.data.text), '</p><table style="margin: 0 auto;"><tr><td><div class="mobile-team">"', soy.$$escapeHtml(opt_data.data.left), '"<input type="number" id="left" /></div></td><td><div class="mobile-team">"', soy.$$escapeHtml(opt_data.data.right), '"<input type="number" id="right" /></div></td></tr></table><div class="clear"></div><input type="button" class="button red" id="totalize" value="Siųsti" /><input type="button" class="button grey" id="cleartotalize" value="Išvalyti" /></div></div></div></td></tr></table>');
  if (!opt_sb) return output.toString();
};


coco.history = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="history white"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.</p><p>Erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.</p><p>Ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl.</p><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.</p><p>Erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.</p></div>');
  if (!opt_sb) return output.toString();
};


coco.stadium = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="stadium white"><div style="text-align: center;"><img id="stadiumas" src="i/stadium.jpg" /></div><div style="padding: 10px;"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.</p><p>Erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.</p><p>Erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.</p></div></div>');
  if (!opt_sb) return output.toString();
};


coco.administration = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="administration white"><div class="aheader">Futbolo klubas "Ekranas"</div><div class="aodd"><b>Adresas</b> Adreso g. 5</div><div class="aeven"><b>El. paštas:</b> info@fkekranas.lt</div><div class="aodd"><b>Tel.:</b> 868523269</div><div class="aeven"><b>Faksas:</b> 868523269</div><div class="aodd"><b>"Aukštaitijos" stadiono adresas</b> Adreso g. 5</div><div class="aeven last"><b>Oficialus klubo tinklapis</b> www.fkekranas.lt</div><div class="aheader">Sporto departamentas</div><div class="aodd"><b>Tel.:</b> 868523269</div><div class="aeven"><b>Faksas:</b> 868523269</div></div>');
  if (!opt_sb) return output.toString();
};


coco.sponsors = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="sponsors white" style="text-align: center; background-color: #eaece9; height: 100%;"><img id="sponsors" src="i/remejai.jpg" style="margin-top: 30px;" /></div>');
  if (!opt_sb) return output.toString();
};


coco.form = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div><input type="text" /><input type="email" /><input type="telephone" /><input type="search" /><input type="number" /><textarea>Textarea</textarea><select><option value="1">1</option><option value="2">2</option><option value="3">3</option></select><input type="range" min="0" max="10" step="2" value="6"></div>');
  if (!opt_sb) return output.toString();
};


coco.apierror = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<table style="width: 100%; height: 100%;"><tr><td valign="middle" style="width: 100%; height: 100%; text-align: center;">Duomenys šiuo metu neprieinami, pabandykite vėliau.</td></tr></table>');
  if (!opt_sb) return output.toString();
};
