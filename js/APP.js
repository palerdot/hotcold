!function e(t,n,a){function s(c,o){if(!n[c]){if(!t[c]){var i="function"==typeof require&&require;if(!o&&i)return i(c,!0);if(r)return r(c,!0);var _=new Error("Cannot find module '"+c+"'");throw _.code="MODULE_NOT_FOUND",_}var l=n[c]={exports:{}};t[c][0].call(l.exports,function(e){var n=t[c][1][e];return s(n?n:e)},l,l.exports,e,t,n,a)}return n[c].exports}for(var r="function"==typeof require&&require,c=0;c<a.length;c++)s(a[c]);return s}({1:[function(e,t,n){t.exports={VERSION:"2.0.0",APPMODE:"FREE",PRO_CRX_URL:"https://google.co.in",type:"web",links:{linux_32:"https://www.google.co.in/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#newwindow=1&q=linux+32+bit",linux_64:"https://www.dropbox.com/s/fy9wxqsn50i65bq/Hotcold-2.0.0-linux-x64.tar.gz?dl=1",windows_32:"https://www.dropbox.com/s/fy9wxqsn50i65bq/Hotcold-2.0.0-linux-x64.tar.gz?dl=1",windows_64:"https://www.dropbox.com/s/fy9wxqsn50i65bq/Hotcold-2.0.0-linux-x64.tar.gz?dl=1",mac_64:"https://www.google.co.in/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#newwindow=1&q=mac+64+bit",dev_derby_blog_url:"https://hacks.mozilla.org/2013/06/announcing-the-winners-of-the-april-2013-dev-derby/",dev_derby_hc_cached:"http://web.archive.org/web/20131107013950/https://developer.mozilla.org/en-US/demos/detail/hot-cold-typing",dev_derby_down_link:"https://blog.mozilla.org/community/2015/12/18/saying-goodbye-to-demo-studio/",github_link:"https://github.com/palerdot/hotcold"},messages:{crx:"You can specify a custom time for your own course in PRO version. Get the Chrome App for the Pro Version!",desktop:"You can specify a custom time for your own course in PRO version. PRO Desktop version coming soon! Please try the Chrome App for the Pro Version.",web:"You can specify a custom time for your own course in PRO version. PRO Web version coming soon! Please try the Chrome App for the Pro Version."},ORIGINAL_DEV_DERBY_URL:"https://developer.mozilla.org/en-US/demos/detail/hot-cold-typing"}},{}],2:[function(e,t,n){var a=function(e,t,n){var a=e,t=t,n=n,s={init_canvas:function(){var e,t,s=.32,r=document.getElementById("a"),c=window.innerWidth,o=window.innerHeight,i=c*s,_=.175*o;r.setAttribute("width",i),r.setAttribute("height",_),a.canvas_a.width=i,a.canvas_a.height=_,e=document.getElementById("a").getContext("2d"),e.beginPath();for(var l=1;l<=10;l++)e.moveTo(0,l*a.canvas_a.height/10),e.lineTo(a.canvas_a.width,l*a.canvas_a.height/10);e.strokeStyle=a.canvas_normal_line,e.stroke(),e.closePath(),e.save(),e.beginPath(),e.moveTo(0,.1*a.canvas_a.height),e.lineTo(a.canvas_a.width,.1*a.canvas_a.height),e.lineWidth=2,e.strokeStyle=a.canvas_ref_line,e.stroke(),e.closePath(),e.restore(),a.course_completed&&(e.save(),e.globalAlpha=.6,e.beginPath(),e.fillStyle=n[n.current].saved_block,e.fill(),e.fillRect(a.canvas_a.old_x,0,a.canvas_a.width-a.canvas_a.old_x,a.canvas_a.height),e.closePath(),e.restore());var h=document.getElementById("b");_=.15*o,h.setAttribute("width",i),h.setAttribute("height",_),a.canvas_b.width=i,a.canvas_b.height=_,a.canvas_b.old_gross_y=a.canvas_b.height,a.canvas_b.old_net_y=a.canvas_b.height,t=document.getElementById("b").getContext("2d"),t.save(),t.beginPath(),t.moveTo(0,.6*a.canvas_b.height),t.lineTo(a.canvas_b.width,.6*a.canvas_b.height),t.lineWidth=2,t.strokeStyle=a.canvas_ref_line,t.stroke(),t.closePath(),t.restore();var u=a.canvas_b.arr_gross_y.length;a.canvas_b.old_gross_y=a.canvas_b.arr_gross_y[u-1],u=a.canvas_b.arr_net_y.length,a.canvas_b.old_net_y=a.canvas_b.arr_net_y[u-1],a.course_completed&&(t.save(),t.globalAlpha=.6,t.beginPath(),t.fillStyle=n[n.current].saved_block,t.fill(),t.fillRect(a.canvas_b.old_x,0,a.canvas_b.width-a.canvas_b.old_x,a.canvas_b.height),t.closePath(),t.restore())},Update:function(){var e,t,s,r,c,o=a.canvas_a.height,i=parseInt(a.accuracy,10);e=document.getElementById("a").getContext("2d"),a.canvas_a.y=parseInt(o-o*(i/100),10),a.canvas_a.arr_x.push(a.canvas_a.x),a.canvas_a.arr_y.push(a.canvas_a.y),e.save(),e.beginPath(),e.lineWidth=3,r=a.canvas_a.old_x*(a.canvas_a.width/a.canvas_a.ref_width[a.canvas_a.ref_width.length-1]),c=a.canvas_a.old_y*(a.canvas_a.height/a.canvas_a.ref_height[a.canvas_a.ref_height.length-1]),e.moveTo(r,c),e.lineTo(a.canvas_a.x,a.canvas_a.y),e.strokeStyle=n.accuracy_color,e.stroke(),e.closePath(),e.restore(),a.canvas_a.old_x=a.canvas_a.x,a.canvas_a.old_y=a.canvas_a.y,a.canvas_a.ref_width.push(a.canvas_a.width),a.canvas_a.ref_height.push(a.canvas_a.height),t=document.getElementById("b").getContext("2d");var _=parseInt(a.gross_speed,10);a.canvas_b.y=parseInt(a.canvas_b.height-a.canvas_b.height*(_/100),10),a.canvas_b.arr_gross_x.push(a.canvas_b.x),a.canvas_b.arr_gross_y.push(a.canvas_b.y),t.beginPath(),t.lineWidth=3,r=a.canvas_b.old_x*(a.canvas_b.width/a.canvas_b.ref_width[a.canvas_b.ref_width.length-1]),c=a.canvas_b.old_gross_y*(a.canvas_b.height/a.canvas_b.ref_height[a.canvas_b.ref_height.length-1]),t.moveTo(r,c),t.lineTo(a.canvas_b.x,a.canvas_b.y),t.strokeStyle=n.gross_speed_color,t.closePath(),t.stroke(),a.canvas_b.old_gross_y=a.canvas_b.y,s=document.getElementById("b").getContext("2d");var l=parseInt(a.net_speed,10);a.canvas_b.y=parseInt(a.canvas_b.height-a.canvas_b.height*(l/100),10),a.canvas_b.arr_net_x.push(a.canvas_b.x),a.canvas_b.arr_net_y.push(a.canvas_b.y),s.beginPath(),s.lineWidth=3,r=a.canvas_b.old_x*(a.canvas_b.width/a.canvas_b.ref_width[a.canvas_b.ref_width.length-1]),c=a.canvas_b.old_net_y*(a.canvas_b.height/a.canvas_b.ref_height[a.canvas_b.ref_height.length-1]),s.moveTo(r,c),s.lineTo(a.canvas_b.x,a.canvas_b.y),s.strokeStyle=n.net_speed_color,s.stroke(),s.closePath(),a.canvas_b.old_x=a.canvas_b.x,a.canvas_b.old_net_y=a.canvas_b.y,a.canvas_a.x+=a.timer_speed_step,a.canvas_b.x+=a.timer_speed_step,a.canvas_b.ref_width.push(a.canvas_b.width),a.canvas_b.ref_height.push(a.canvas_b.height)},redraw_canvas:function(){var e,t,s,r,c,o,i;e=document.getElementById("a").getContext("2d"),e.save(),e.beginPath(),e.lineWidth=3;for(var _=0;_<a.canvas_a.arr_x.length;_++)r=a.canvas_a.arr_x[_]*(a.canvas_a.width/a.canvas_a.ref_width[_]),c=a.canvas_a.arr_y[_]*(a.canvas_a.height/a.canvas_a.ref_height[_]),o=a.canvas_a.arr_x[_+1]*(a.canvas_a.width/a.canvas_a.ref_width[_+1]),i=a.canvas_a.arr_y[_+1]*(a.canvas_a.height/a.canvas_a.ref_height[_+1]),e.moveTo(r,c),e.lineTo(o,i);e.strokeStyle=n.accuracy_color,e.stroke(),e.closePath(),e.restore(),t=document.getElementById("b").getContext("2d"),t.save(),t.beginPath(),t.lineWidth=3;for(var _=0;_<a.canvas_b.arr_gross_x.length;_++)r=a.canvas_b.arr_gross_x[_]*(a.canvas_b.width/a.canvas_b.ref_width[_]),c=a.canvas_b.arr_gross_y[_]*(a.canvas_b.height/a.canvas_b.ref_height[_]),o=a.canvas_b.arr_gross_x[_+1]*(a.canvas_b.width/a.canvas_b.ref_width[_+1]),i=a.canvas_b.arr_gross_y[_+1]*(a.canvas_b.height/a.canvas_b.ref_height[_+1]),t.moveTo(r,c),t.lineTo(o,i);t.strokeStyle=n.gross_speed_color,t.stroke(),t.closePath(),t.restore(),s=document.getElementById("b").getContext("2d"),s.save(),s.beginPath(),s.lineWidth=3;for(var _=0;_<a.canvas_b.arr_net_x.length;_++)r=a.canvas_b.arr_net_x[_]*(a.canvas_b.width/a.canvas_b.ref_width[_]),c=a.canvas_b.arr_net_y[_]*(a.canvas_b.height/a.canvas_b.ref_height[_]),o=a.canvas_b.arr_net_x[_+1]*(a.canvas_b.width/a.canvas_b.ref_width[_+1]),i=a.canvas_b.arr_net_y[_+1]*(a.canvas_b.height/a.canvas_b.ref_height[_+1]),s.moveTo(r,c),s.lineTo(o,i);s.strokeStyle=n.net_speed_color,s.stroke(),s.closePath(),s.restore()},redraw_fingers:function(){var e,n;e=document.getElementById("f"),n=e.getContext("2d"),viewportWidth=window.innerWidth,viewportHeight=window.innerHeight,canvasWidth=.18*viewportWidth,canvasHeight=.11*viewportHeight,t.f_canvas_holder.width(canvasWidth),t.f_canvas_holder.height(canvasHeight),t.f_span_holder.width(canvasWidth),t.f_span_holder.height(canvasHeight),e.setAttribute("width",canvasWidth),e.setAttribute("height",canvasHeight);var a=new Image;a.src="images/viralgal.png",a.onload=function(){n.drawImage(a,0,0,canvasWidth,canvasHeight)}},clean_canvas:function(){var e=document.getElementById("a").getContext("2d");e.clearRect(0,0,a.canvas_a.width,a.canvas_a.height),e.beginPath(),e.lineWidth=1;for(var t=1;t<=10;t++)e.moveTo(0,t*a.canvas_a.height/10),e.lineTo(a.canvas_a.width,t*a.canvas_a.height/10);e.strokeStyle=a.canvas_normal_line,e.stroke(),e.closePath(),e.beginPath(),e.moveTo(0,.1*a.canvas_a.height),e.lineTo(a.canvas_a.width,.1*a.canvas_a.height),e.save(),e.lineWidth=2,e.strokeStyle=a.canvas_normal_line,e.stroke(),e.restore(),e.closePath();var n=document.getElementById("b").getContext("2d");n.clearRect(0,0,a.canvas_b.width,a.canvas_b.height),n.beginPath(),n.moveTo(0,.6*a.canvas_b.height),n.lineTo(a.canvas_b.width,.6*a.canvas_b.height),n.strokeStyle=a.canvas_normal_line,n.stroke(),n.closePath()},clear_canvas_a:function(){var e=document.getElementById("a").getContext("2d");e.clearRect(0,0,a.canvas_a.width,a.canvas_a.height),e.beginPath(),e.lineWidth=1;for(var t=1;t<=10;t++)e.moveTo(0,t*a.canvas_a.height/10),e.lineTo(a.canvas_a.width,t*a.canvas_a.height/10);e.save(),e.strokeStyle=a.canvas_normal_line,e.stroke(),e.restore(),e.closePath(),e.beginPath(),e.moveTo(0,.1*a.canvas_a.height),e.lineTo(a.canvas_a.width,.1*a.canvas_a.height),e.save(),e.lineWidth=2,e.strokeStyle=a.canvas_normal_line,e.stroke(),e.restore(),e.closePath()},reset:function(){var e=document.getElementById("a").getContext("2d");e.clearRect(0,0,a.canvas_a.width,a.canvas_a.height),e.beginPath(),e.lineWidth=1;for(var t=1;t<=10;t++)e.moveTo(0,t*a.canvas_a.height/10),e.lineTo(a.canvas_a.width,t*a.canvas_a.height/10);e.strokeStyle=a.canvas_normal_line,e.stroke(),e.closePath(),e.beginPath(),e.moveTo(0,.1*a.canvas_a.height),e.lineTo(a.canvas_a.width,.1*a.canvas_a.height),e.save(),e.strokeStyle=a.canvas_ref_line,e.stroke(),e.restore(),e.closePath();var n=document.getElementById("b").getContext("2d");n.clearRect(0,0,a.canvas_b.width,a.canvas_b.height),n.beginPath(),n.moveTo(0,.6*a.canvas_b.height),n.lineTo(a.canvas_b.width,.6*a.canvas_b.height),n.strokeStyle=a.canvas_ref_line,n.stroke(),n.closePath()},complete:function(){var e,t;e=document.getElementById("a").getContext("2d"),t=document.getElementById("b").getContext("2d"),e.save(),e.globalAlpha=.6,e.beginPath(),e.fillStyle=n[n.current].saved_block,e.fill(),e.fillRect(a.canvas_a.old_x,0,a.canvas_a.width-a.canvas_a.old_x,a.canvas_a.height),e.closePath(),e.restore(),t.save(),t.globalAlpha=.6,t.beginPath(),t.fillStyle=n[n.current].saved_block,t.fill(),t.fillRect(a.canvas_b.old_x,0,a.canvas_b.width-a.canvas_b.old_x,a.canvas_b.height),t.closePath(),t.restore()}};return s};t.exports=a},{}],3:[function(e,t,n){var a=function(e,t,n,a){function s(){function e(e){switch(e){case 1:n.finger.hide(),n.finger_1.show();break;case 2:n.finger.hide(),n.finger_2.show();break;case 3:n.finger.hide(),n.finger_3.show();break;case 4:n.finger.hide(),n.finger_4.show();break;case 5:n.finger.hide(),n.finger_5.show();break;case 6:n.finger.hide(),n.finger_6.show();break;case 7:n.finger.hide(),n.finger_7.show();break;case 8:n.finger.hide(),n.finger_8.show();break;case 9:n.finger.hide(),n.finger_9.show();break;case 10:n.finger.hide(),n.finger_10.show();break;case 11:n.finger.hide(),n.finger_1.show(),n.finger_10.show();break;case 12:n.finger.hide(),n.finger_2.show(),n.finger_10.show();break;case 13:n.finger.hide(),n.finger_3.show(),n.finger_10.show();break;case 14:n.finger.hide(),n.finger_4.show(),n.finger_10.show();break;case 15:n.finger.hide(),n.finger_7.show(),n.finger_1.show();break;case 16:n.finger.hide(),n.finger_1.show(),n.finger_8.show();break;case 17:n.finger.hide(),n.finger_1.show(),n.finger_9.show();break;case 18:n.finger.hide(),n.finger_1.show(),n.finger_10.show()}}function s(e){var t=$("#shift_right"),n=$("#shift_left");r.right_shift&&(t.removeClass("backlit"),r.right_shift=!1),r.left_shift&&(n.removeClass("backlit"),r.left_shift=!1),0!=r.prev_key&&p[r.prev_key].removeClass("backlit"),(e>=65&&e<=71||e>=81&&e<=84||e>=86&&e<=88||90==e)&&(r.right_shift=!0,t.addClass("backlit")),(e>=72&&e<=80||85==e||89==e)&&(r.left_shift=!0,n.addClass("backlit"));var a=[33,64,35,36,37];$.inArray(e,a)>-1&&(r.right_shift=!0,t.addClass("backlit"));var s=[94,38,42,40,41,95,43,123,124,125,58,34,60,62,63];$.inArray(e,s)>-1&&(r.left_shift=!0,n.addClass("backlit")),p[e].addClass("backlit"),r.prev_key=e}function c(e){switch(e){case 49:return 33;case 50:return 64;case 51:return 35;case 52:return 36;case 53:return 37;case 54:return 94;case 55:return 38;case 56:return 42;case 57:return 40;case 48:return 41;case 91:return 123;case 93:return 125;case 59:return 58;case 39:return 34;case 92:return 124;case 44:return 60;case 46:return 62;case 47:return 63;case 95:return 45;case 43:return 61}}function o(){function e(e){switch(e){case 32:return 5;case 33:return 11;case 34:return 18;case 35:return 13;case 36:return 14;case 37:return 14;case 38:return 15;case 39:return 10;case 40:return 17;case 41:return 18;case 42:return 16;case"+":return 18;case 43:return 8;case 45:return 18;case 46:return 9;case 47:return 10;case 48:return 10;case 49:return 1;case 50:return 2;case 51:return 3;case 52:return 4;case 53:return 4;case 54:return 7;case 55:return 7;case 56:return 8;case 57:return 9;case 58:return 18;case 59:return 10;case 60:return 16;case 61:return 10;case 62:return 17;case 63:return 18;case 64:return 12;case 65:return 11;case 66:return 14;case 67:return 13;case 68:return 13;case 69:return 13;case 70:return 14;case 71:return 14;case 72:return 15;case 73:return 16;case 74:return 15;case 75:return 16;case 76:return 17;case 77:return 15;case 78:return 15;case 79:return 17;case 80:return 18;case 81:return 11;case 82:return 14;case 83:return 12;case 84:return 14;case 85:return 15;case 86:return 14;case 87:return 12;case 88:return 12;case 89:return 15;case 90:return 11;case 91:return 10;case 92:return 10;case 93:return 10;case 94:return 15;case 95:return 18;case 96:return 1;case 97:return 1;case 98:return 4;case 99:return 3;case 100:return 3;case 101:return 3;case 102:return 4;case 103:return 4;case 104:return 7;case 105:return 8;case 106:return 7;case 107:return 8;case 108:return 9;case 109:return 7;case 110:return 7;case 111:return 9;case 112:return 10;case 113:return 1;case 114:return 4;case 115:return 2;case 116:return 4;case 117:return 7;case 118:return 4;case 119:return 2;case 120:return 2;case 121:return 7;case 122:return 1;case 123:return 18;case 124:return 18;case 125:return 18;case 126:return 11;default:return 0}}var t=n.cli.val().trim(),a=t.replace(/\r?\n|\r/g," "),s=new String(a),r=30,c=0,o=[];if(s.length>r)for(;s.length>r;){var i=-1;if(s=$.trim(s),s[r]&&32!=s.charCodeAt(r))var i=s.lastIndexOf(" ",r);if(i!=-1){o[c]={text:[],code:[],pattern:[]};for(var _=0;_<i;_++){o[c].text.push(s[_]);var l=s[_].charCodeAt(0),h=e(l);o[c].pattern.push(h),o[c].code.push(l)}c++,s=s.slice(i+1),s=$.trim(s)}else{o[c]={text:[],code:[],pattern:[]};for(var _=0;_<r;_++){o[c].text.push(s[_]);var l=s[_].charCodeAt(0),h=e(l);o[c].pattern.push(h),o[c].code.push(l)}c++,s=s.slice(r),s=$.trim(s)}if(s.length<r){o[c]={text:[],code:[],pattern:[]};for(var _=0;_<s.length;_++){o[c].text.push(s[_]);var l=s[_].charCodeAt(0),h=e(l);o[c].pattern.push(h),o[c].code.push(l)}}}else{s=$.trim(s),o[c]={text:[],code:[],pattern:[]};for(var _=0;_<s.length;_++){o[c].text.push(s[_]);var l=s[_].charCodeAt(0),h=e(l);o[c].pattern.push(h),o[c].code.push(l)}}return o}var i,_=[],l=0,h=0,u=0,d=0,v="",f=0,p=[];this.get_time=function(){return f};for(var g=32;g<127;g++){var b="#key_"+g;if(p[g]=$(b),g>=65&&g<=90){var m=String.fromCharCode(g).toLowerCase().charCodeAt(0);b="#key_"+m,p[g]=$(b)}if(g>=48&&g<=57){var m=c(g);b="#key_"+m,p[g]=$(b)}if(91==g||93==g||59==g||39==g||92==g||44==g||46==g||47==g||95==g||43==g){var m=c(g);b="#key_"+m,p[g]=$(b)}}this.init=function(e){var t=this;switch(e){case 0:_=o(),f=n.free_time.is(":checked")?1:n.custom_duration.val(),t.prepare();break;case 1:$.getJSON("lessons/lesson1.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=1;break;case 2:$.getJSON("lessons/lesson2.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=3;break;case 3:$.getJSON("lessons/lesson3.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=3;break;case 4:$.getJSON("lessons/lesson4.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=3;break;case 5:$.getJSON("lessons/lesson5.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=3;break;case 6:$.getJSON("lessons/lesson6.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=3;break;case 7:$.getJSON("lessons/lesson7.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=3;break;case 8:$.getJSON("lessons/lesson8.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=3;break;case 9:$.getJSON("lessons/lesson9.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=3;break;case 10:$.getJSON("lessons/lesson10.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=3;break;case 11:$.getJSON("lessons/lesson11.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=3;break;case 12:$.getJSON("lessons/lesson12.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=3;break;case 13:$.getJSON("lessons/lesson13.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=3;break;case 14:$.getJSON("lessons/lesson14.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=3;break;case 15:$.getJSON("lessons/lesson15.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=3;break;case 16:$.getJSON("lessons/lesson16.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=3;break;case 17:$.getJSON("lessons/lesson17.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=3;break;case 18:$.getJSON("lessons/lesson18.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=3;break;case 19:$.getJSON("lessons/poem.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=5;break;case 20:$.getJSON("lessons/quotes1.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=5;break;case 21:$.getJSON("lessons/quotes2.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=5;break;case 22:$.getJSON("lessons/quotes3.json",function(e){$.each(e,function(e,t){_[e]={},_[e].code=t.code,_[e].text=t.text,_[e].pattern=t.pattern})}).done(function(){t.prepare()}).fail(function(e){}),f=5}},this.prepare=function(){t.clean_canvas(),i=new Worker("js/hotcold_stat_helper.js"),i.addEventListener("message",function(e){var t=JSON.parse(e.data);$(t.highlight.div_id).removeClass(),$(t.highlight.div_id).addClass("keys"),$(t.highlight.div_id).addClass(t.highlight.div_class),p[t.highlight.code].removeClass(),p[t.highlight.code].addClass("keys"),p[t.highlight.code].addClass(t.highlight.div_class),2==t.highlight.format?p[t.highlight.code].children(".bottom-k").addClass("u_line"):p[t.highlight.code].children(".bottom-k").removeClass("u_line"),n.c_div.html(t.update)},!1),i.addEventListener("error",function(e){},!1),d=_.length,u=_[h].code.length;for(var a=32;a<127;a++)p[a].removeClass().addClass("keys");n.lv.html(""),n.c_div.html(""),n.c_label.hide(),n.$min_div.html(f),n.$sec_div.html("00"),n.ci.hide(),n.completed_div.html(""),n.type_speed.html(""),n.net_type_speed.html(""),n.accuracy.html(""),$.each(_[h].text,function(e,t){var n="<span>"+t+"</span>";v+=n}),e(_[h].pattern[l]),s(_[h].code[l]),n.lv.html(v);var c=l+1;n.lv.find("span:nth-child("+c+")").addClass("key_before"),r.course_init=!0,p[32].addClass("space_start"),n.abort.show(),n.space_to_resume.hide()},this.redo=function(){r.reset(),l=0,h=0,u=0,d=0,v="",n.completed_button.hide(),n.redo_course.hide(),n.space_to_start.show(),n.c_home.hide(),this.prepare()},this.clean_window=function(){n.lv.html(""),r.reset(),l=0,h=0,u=0,d=0,v="",t.reset(),n.completed_button.hide(),n.redo_course.hide(),n.space_to_start.show(),n.c_home.hide()},this.manage_screen=function(t){if(t==_[h].code[l]){i.postMessage({status:"right",code:_[h].code[l],close:!1}),n.lv.find("span:nth-child("+l+")").removeClass("key_before");var a=l+1;n.lv.find("span:nth-child("+a+")").addClass("key_ok"),r.correct++}else{i.postMessage({status:"wrong",code:_[h].code[l],close:!1}),n.lv.find("span:nth-child("+l+")").removeClass("key_before");var a=l+1;n.lv.find("span:nth-child("+a+")").addClass("key_not_ok")}l+=1,l==u&&(h++,h==d?this.end_course():(l=0,u=_[h].code.length,v="",$.each(_[h].text,function(e,t){var n="<span>"+t+"</span>";v+=n}),n.lv.html(v)));var a=l+1;n.lv.find("span:nth-child("+a+")").addClass("key_before"),r.course_init&&(e(_[h].pattern[l]),s(_[h].code[l]));var c=parseInt(h/d*100,10),o=c+"%";n.completed_div.html(o)},this.end_course=function(){a.endTimer(),r.course_init=!1,r.course_started=!1,r.course_completed=!0;var e=$(".finger");e.hide();var n=$("#shift_right"),s=$("#shift_left");r.right_shift&&(n.removeClass("backlit"),r.right_shift=!1),r.left_shift&&(s.removeClass("backlit"),r.left_shift=!1),0!=r.prev_key&&p[r.prev_key].removeClass("backlit"),r.prev_key=0,i.postMessage({close:!0}),t.complete()}}var r=e,t=t,n=n,a=a;return s};t.exports=a},{}],4:[function(e,t,n){var a={key_interval:0,hits:0,correct:0,seconds_elapsed:0,course_started:!1,course_init:!1,course_first_time:!0,course_completed:!1,timer_id:0,key_gap_timer_id:0,word_speed:0,gross_speed:0,net_speed:0,accuracy:100,timer_speed_step:3,prev_pattern:0,prev_key:0,right_shift:!1,left_shift:!1,curr_course:0,canvas_normal_line:"#f2f2f2",canvas_ref_line:"#bfbfbf",canvas_a:{x:0,y:0,old_x:0,old_y:0,timer:0,arr_x:[],arr_y:[],ref_width:[],ref_height:[],last_ref_width:0,last_ref_height:0,width:0,height:0},canvas_b:{x:0,y:0,old_x:0,old_gross_y:0,old_net_y:0,timer:0,width:0,height:0,arr_gross_x:[],arr_gross_y:[],arr_net_x:[],arr_net_y:[],ref_width:[],ref_height:[]},canvas_c:{width:0,height:0},reset:function(){this.key_interval=0,this.hits=0,this.correct=0,this.seconds_elapsed=0,this.course_started=!1,this.course_init=!1,this.course_first_time=!0,this.course_completed=!1,this.timer_id=0,this.key_gap_timer_id=0,this.word_speed=0,this.gross_speed=0,this.net_speed=0,this.accuracy=100,this.prev_pattern=0,this.prev_key=0,this.right_shift=!1,this.left_shift=!1,this.canvas_a.x=0,this.canvas_a.y=0,this.canvas_a.old_x=0,this.canvas_a.old_y=0,this.canvas_a.timer=0,this.canvas_a.arr_x=[],this.canvas_a.arr_y=[],this.canvas_b.x=0,this.canvas_b.y=this.canvas_b.height,this.canvas_b.old_x=0,this.canvas_b.old_gross_y=this.canvas_b.height,this.canvas_b.old_net_y=this.canvas_b.height,this.canvas_b.timer=0,this.canvas_b.arr_gross_x=[],this.canvas_b.arr_gross_y=[],this.canvas_b.arr_net_x=[],this.canvas_b.arr_net_y=[]}};t.exports=a},{}],5:[function(e,t,n){var a={current:"night",gross_speed_color:"#FF9900",net_speed_color:"#00CC00",timer_color:"#BD9C59",accuracy_color:"#0066FF",completed_color:"#CC3300",day:{body_bg:"#F7F7F7",body_text_color:"#777777",canvas_border:"#C2C2C2",canvas_normal_line:"#DEDEDE",canvas_ref_line:"#ACACAC",saved_block:"#BDBDBD",text_color:"#777777",scroll_thumb_color:"#000000",scroll_bg_color:"#EDEDED"},night:{body_bg:"#282828",body_text_color:"#999999",canvas_border:"#555555",canvas_normal_line:"#555555",canvas_ref_line:"#BFBFBF",saved_block:"#454545",text_color:"#999999",scroll_thumb_color:"#555555",scroll_bg_color:"#222222"}};t.exports=a},{}],6:[function(e,t,n){var a=function(e,t,n,a){var s=e,t=t,a=a,r={startTimer:function(){t.canvas_a.width();s.timer_id=setInterval(r.updateTimer,1e3),s.key_gap_timer_id=setInterval(r.monitor_key_gap,500),s.word_speed=setInterval(r.updateSpeed,1e3),s.canvas_a.timer=setInterval(a.Update,60*s.curr_course.get_time()*1e3/(s.canvas_a.width/s.timer_speed_step)),t.space.removeClass("space_resume"),t.space_to_resume.hide(),t.resume_button.hide(),t.pause_button.show(),t.c_home.hide()},updateSpeed:function(){var e,n,a,r,c;if(e=s.hits/5,n=e/s.seconds_elapsed,a=60*n,s.gross_speed=parseInt(a,10),r=s.correct/5,c=r/s.seconds_elapsed,net_speed=60*c,s.net_speed=parseInt(net_speed,10),t.type_speed.html(s.gross_speed),t.net_type_speed.html(s.net_speed),0!==s.hits&&(s.accuracy=parseInt(s.correct/s.hits*100,10)),0==s.hits){var o="100 %";t.accuracy.html(o)}else{var o=s.accuracy+" %";t.accuracy.html(o)}},updateTimer:function(){s.seconds_elapsed++;var e=t.$min_div.html(),n=t.$sec_div.html(),a=parseInt(e,10),c=parseInt(n,10);return 0===a&&0===c?(r.endTimer(),void s.curr_course.end_course()):void(0==c?(c=59,a-=1,t.$min_div.html(a),t.$sec_div.html(c)):(c-=1,c<10&&(c="0"+c),t.$sec_div.html(c)))},monitor_key_gap:function(){s.key_interval<16?s.key_interval++:r.pauseTimer()},pauseTimer:function(){t.space_to_resume.show(),t.pause_button.hide(),t.resume_button.show(),t.c_home.hide(),t.space.addClass("space_resume"),clearInterval(s.timer_id),clearInterval(s.key_gap_timer_id),clearInterval(s.word_speed),clearInterval(s.canvas_a.timer),s.course_started=!1},endTimer:function(){var e=t.$min_div.html(),n=t.$sec_div.html(),a=parseInt(e,10),r=parseInt(n,10),c="( "+a+" min "+r+" sec )";t.ts.html(c),t.abort.hide(),t.pause_button.hide(),t.completed_button.show(),t.resume_button.hide(),t.redo_course.show(),t.ci.show(),t.c_home.show(),clearInterval(s.timer_id),clearInterval(s.key_gap_timer_id),clearInterval(s.word_speed),clearInterval(s.canvas_a.timer),s.course_init=!1,s.course_started=!1}};return r};t.exports=a},{}],7:[function(e,t,n){var a=e("./Hotcold.js"),s=e("./jquery_el.js"),r=e("./Theme.js"),c=e("./Canvas.js")(a,s,r),o=e("./Timer.js")(a,s,r,c),c=e("./Canvas.js")(a,s,r),i=e("./Course.js")(a,c,s,o),_=e("../../config.json"),l={$el:s,start:function(){this.initializeEvents(),this.initAppMode()},isFullScreen:function(){return!window.screenTop&&!window.screenY},requestFullScreen:function(){var e=document.getElementById("course_window"),t=e.requestFullScreen||e.webkitRequestFullScreen||e.mozRequestFullScreen;t.call(e)},cancelFullScreen:function(){document.cancelFullScreen=document.webkitExitFullscreen||document.mozCancelFullScreen||document.exitFullscreen,document.cancelFullScreen()},isProModeAllowed:function(){return"PRO"==_.APPMODE||this.$el.free_time.is(":checked")},getProModeInfo:function(){var e="You can specify a custom time for your own course in PRO version. Get the Chrome App for the Pro Version!",t=$("<div>").html(_.messages[_.type]||e),n=$("<div>").addClass("text-center");$("<a>").attr("href",_.PRO_CRX_URL).attr("target","_blank").addClass("btn btn-primary").html("Download").appendTo(n);return t.append(n),t.get(0)},initAppMode:function(){"FREE"==_.APPMODE?this.initFreeMode():this.initProMode()},initFreeMode:function(){var e=this;this.$el.pro_label.text("PRO").addClass("label label-primary"),this.$el.pro_label.popover({container:"body",title:"Get PRO App",content:"You can specify a custom time for your own course in PRO App",html:!0,trigger:"manual",placement:"auto"}),this.$el.pro_label.hover(function(){$(this).popover("show")},function(){$(this).popover("hide")}),this.$el.prepare_lesson.popover({container:"body",title:"Get PRO Version",content:e.getProModeInfo(),html:!0,trigger:"manual",placement:"auto"}),this.$el.body.click(function(t){return"custom_lesson_launch"==t.target.id?void t.preventDefault():void e.$el.prepare_lesson.popover("hide")})},initProMode:function(){},initHelpGuide:function(){var e=this;this.$el.guide_modal.modal({show:!1}),this.$el.guide.click(function(){$.get("help.html",function(t){e.$el.guide_content.html(t),e.$el.guide_modal.modal("show")})})},initializeEvents:function(){var e=this;this.initHelpGuide(),this.$el.d_theme.click(function(){e.set_day_theme()}),this.$el.n_theme.click(function(){e.set_night_theme()}),this.$el.n_theme.click(),this.$el.c_home.click(function(){a.reset(),a.curr_course.clean_window(),e.$el.c_win.hide(),e.$el.c_tab.show()}),this.initLessons(),this.$el.pause_button.click(function(){o.pauseTimer()}),this.$el.redo_course.click(function(){a.curr_course.redo()}),this.$el.abort.click(function(){a.curr_course.end_course(),a.curr_course.clean_window(),e.$el.c_win.hide(),e.$el.c_tab.show()}),this.$el.sp1.click(function(t){t.preventDefault(),e.$el.akp2.fadeOut("fast"),e.$el.akp1.delay(250).fadeIn()}),this.$el.sp2.click(function(t){t.preventDefault(),e.$el.akp1.fadeOut("fast"),e.$el.akp2.delay(250).fadeIn()}),this.$el.fs_toggle.click(function(){e.isFullScreen()?e.cancelFullScreen():e.requestFullScreen()}),this.initCustomLesson(),this.initKeyPressEvents(),this.initKeyDownEvents(),window.onload=window.onresize=function(){c.init_canvas(),c.redraw_canvas(),c.redraw_fingers();var t=e.$el.fs_toggle.children("i");e.isFullScreen()?t.removeClass("glyphicon-resize-full").addClass("glyphicon-resize-small"):t.removeClass("glyphicon-resize-small").addClass("glyphicon-resize-full")}},initLessons:function(){var e=this;this.$el.lc1.click(function(){a.curr_course=new i,a.curr_course.init(1),e.$el.c_tab.hide(),e.$el.c_win.fadeIn(),e.requestFullScreen()}),this.$el.lc2.click(function(){a.curr_course=new i,a.curr_course.init(2),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lc3.click(function(){a.curr_course=new i,a.curr_course.init(3),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lc4.click(function(){a.curr_course=new i,a.curr_course.init(4),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lc5.click(function(){a.curr_course=new i,a.curr_course.init(5),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lc6.click(function(){a.curr_course=new i,a.curr_course.init(6),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lc7.click(function(){a.curr_course=new i,a.curr_course.init(7),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lc8.click(function(){a.curr_course=new i,a.curr_course.init(8),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lc9.click(function(){a.curr_course=new i,a.curr_course.init(9),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lc10.click(function(){a.curr_course=new i,a.curr_course.init(10),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lc11.click(function(){a.curr_course=new i,a.curr_course.init(11),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lc12.click(function(){a.curr_course=new i,a.curr_course.init(12),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lc13.click(function(){
a.curr_course=new i,a.curr_course.init(13),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lc14.click(function(){a.curr_course=new i,a.curr_course.init(14),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lc15.click(function(){a.curr_course=new i,a.curr_course.init(15),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lc16.click(function(){a.curr_course=new i,a.curr_course.init(16),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lc17.click(function(){a.curr_course=new i,a.curr_course.init(17),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lc18.click(function(){a.curr_course=new i,a.curr_course.init(18),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lp.click(function(){a.curr_course=new i,a.curr_course.init(19),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lq1.click(function(){a.curr_course=new i,a.curr_course.init(20),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lq2.click(function(){a.curr_course=new i,a.curr_course.init(21),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}),this.$el.lq3.click(function(){a.curr_course=new i,a.curr_course.init(22),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()})},initCustomLesson:function(){var e=this;this.$el.custom_lesson.keyup(function(){var t=$(this).val().trim().length;t>0?(e.$el.no_input.hide(),e.$el.clear_cli_input.show(),e.$el.cli.removeClass("no-input")):(e.$el.no_input.show(),e.$el.clear_cli_input.hide()),e.$el.char_length.html(t)}),this.$el.prepare_lesson.click(function(){if(0==e.$el.custom_lesson.val().trim().length)e.$el.no_input.show(),e.$el.clear_cli_input.hide(),e.$el.cli.addClass("no-input");else{if(e.$el.cli.removeClass("no-input"),!e.isProModeAllowed())return void $(this).popover("show");a.curr_course=new i,a.curr_course.init(0),e.$el.c_tab.hide(),e.$el.c_win.fadeIn()}}),this.$el.custom_duration.on("change",function(){var t=parseInt($(this).val(),10);e.$el.cd_ph.text(t);var n=125,a=t*n,s=2*t*n;e.$el.cd_easy_ph.text(a),e.$el.cd_medium_ph.text(a+" - "+s),e.$el.cd_hard_ph.text(s)}),this.$el.clear_cli_input.on("click",function(){e.$el.cli.val(""),e.$el.cli.trigger("keyup")})},initKeyPressEvents:function(){var e=this;$(document).keypress(function(t){a.course_init&&(a.course_started?(a.key_interval=0,a.curr_course.manage_screen(t.which),a.hits++):32==t.which&&(a.key_interval=0,a.course_started=!0,o.startTimer(),a.course_first_time&&(e.$el.abort.show(),e.$el.pause_button.show(),e.$el.space_to_start.hide(),e.$el.resume_button.hide(),e.$el.c_label.show(),a.course_first_time=!1,e.$el.space.removeClass("space_start"))))})},initKeyDownEvents:function(){$(document).keydown(function(e){var t=navigator.userAgent.toLowerCase().indexOf("firefox")>-1;if(t&&a.course_started)switch(e.which){case 222:case 191:e.preventDefault()}if(e.ctrlKey)switch(e.which){case 13:case 79:case 84:case 85:case 83:case 87:case 80:case 78:case 68:case 116:case 70:case 71:case 104:case 72:case 106:case 74:case 69:case 75:case 76:e.preventDefault()}})},set_day_theme:function(){r.current="day",$("body").css({"background-color":r.day.body_bg,color:r[r.current].body_text_color}).removeClass("night-theme").addClass("day-theme"),this.$el.themes.removeClass("current-theme"),this.$el.d_theme.addClass("current-theme"),this.$el.c_win.css({"background-color":r.day.body_bg}),this.$el.s_block.css({"background-color":r.day.saved_block}),this.$el.cli.css({"background-color":r.day.body_bg,color:r.day.text_color}),this.$el.course_time.css("color",r.day.text_color),this.$el.lv.css("color",r.day.text_color),a.canvas_normal_line=r.day.canvas_normal_line,a.canvas_ref_line=r[r.current].canvas_ref_line,this.$el.canvas_a.css("border-color",r.day.canvas_border),this.$el.canvas_b.css("border-color",r.day.canvas_border),this.$el.c_section.css("border-color",r.day.canvas_border),this.$el.nav_bar.removeClass("navbar-inverse"),c.clear_canvas_a()},set_night_theme:function(){r.current="night",$("body").css({"background-color":r.night.body_bg,color:r[r.current].body_text_color}).removeClass("day-theme").addClass("night-theme"),this.$el.themes.removeClass("current-theme"),this.$el.n_theme.addClass("current-theme"),this.$el.c_win.css({"background-color":r.night.body_bg}),this.$el.s_block.css({"background-color":r.night.saved_block}),this.$el.cli.css({"background-color":r.night.body_bg,color:r.night.text_color}),this.$el.course_time.css("color",r.night.text_color),this.$el.lv.css("color",r.night.text_color),a.canvas_normal_line=r.night.canvas_normal_line,a.canvas_ref_line=r[r.current].canvas_ref_line,this.$el.canvas_a.css("border-color",r.night.canvas_border),this.$el.canvas_b.css("border-color",r.night.canvas_border),this.$el.c_section.css("border-color",r.night.canvas_border),this.$el.nav_bar.addClass("navbar-inverse"),c.clear_canvas_a()}};l.start()},{"../../config.json":1,"./Canvas.js":2,"./Course.js":3,"./Hotcold.js":4,"./Theme.js":5,"./Timer.js":6,"./jquery_el.js":8}],8:[function(e,t,n){var a={body:$("body"),guide:$("#help-guide"),guide_modal:$("#help-guide-modal"),guide_content:$("#help-guide-content"),c_home:$("#back_to_course_button"),lv:$("#lesson_view"),c_win:$("#course_window"),c_tab:$("#course_tab"),c_course:$("#create_course_tab"),d_theme:$("#day_theme"),n_theme:$("#night_theme"),themes:$(".theme"),keys:$(".keys"),f_canvas_holder:$("#finger_canvas_holder"),f_span_holder:$("#fin_spans"),backlit:$(".backlit"),s_block:$("#saved_block"),right_shift:$("#shift_right"),left_shift:$("shift_left"),course_time:$("#course_time"),free_time:$("#free_course_time"),custom_time:$("#custom_course_time"),custom_duration:$("#custom_course_duration"),cd_ph:$(".custom_duration_placeholder"),cd_easy_ph:$(".custom_duration_easy_placeholder"),cd_medium_ph:$(".custom_duration_medium_placeholder"),cd_hard_ph:$(".custom_duration_hard_placeholder"),pro_label:$(".pro-label"),nav_bar:$("#hotcold-navigation-bar"),fs_toggle:$("#fullscreen-toggle"),canvas_a:$("#a"),canvas_b:$("#b"),c_div:$("#c"),c_section:$(".c_section"),scroll_thumb:$("::-webkit-scrollbar-thumb"),scroll_bar:$("::-webkit-scrollbar"),dtp:$("#day_theme_preview"),ntp:$("#night_theme_preview"),lc_temp:$("#launch_course_temp"),lc1:$("#launch_course_1"),lc2:$("#launch_course_2"),lc3:$("#launch_course_3"),lc4:$("#launch_course_4"),lc5:$("#launch_course_5"),lc6:$("#launch_course_6"),lc7:$("#launch_course_7"),lc8:$("#launch_course_8"),lc9:$("#launch_course_9"),lc10:$("#launch_course_10"),lc11:$("#launch_course_11"),lc12:$("#launch_course_12"),lc13:$("#launch_course_13"),lc14:$("#launch_course_14"),lc15:$("#launch_course_15"),lc16:$("#launch_course_16"),lc17:$("#launch_course_17"),lc18:$("#launch_course_18"),lp:$("#launch_poem"),lq1:$("#launch_quote_1"),lq2:$("#launch_quote_2"),lq3:$("#launch_quote_3"),pause_button:$("#pause_button"),resume_button:$("#resume_button"),completed_button:$("#completed_button"),completed_div:$("#completed"),redo_course:$("#redo_button"),abort:$("#abort_button"),custom_lesson:$("#custom_lesson_input"),char_length:$("#total_characters"),no_input:$("#no_input_error"),cli:$("#custom_lesson_input"),clear_cli_input:$("#clear_custom_lesson_input"),prepare_lesson:$("#custom_lesson_launch"),sp1:$("#show_all_key_page_1"),sp2:$("#show_all_key_page_2"),akp1:$("#all_key_page_1"),akp2:$("#all_key_page_2"),space:$("#key_32"),space_to_start:$("#space_to_start"),space_to_resume:$("#space_to_resume"),$min_div:$("#min"),$sec_div:$("#sec"),type_speed:$("#type_speed"),net_type_speed:$("#net_type_speed"),accuracy:$("#accuracy"),ci:$("#completion_indicator"),ts:$("#time_saved"),c_label:$("#c_label"),finger_1:$("#fin_1"),finger_2:$("#fin_2"),finger_3:$("#fin_3"),finger_4:$("#fin_4"),finger_5:$("#fin_5"),finger_6:$("#fin_6"),finger_7:$("#fin_7"),finger_8:$("#fin_8"),finger_9:$("#fin_9"),finger_10:$("#fin_10"),finger:$(".finger")};t.exports=a},{}]},{},[7]);