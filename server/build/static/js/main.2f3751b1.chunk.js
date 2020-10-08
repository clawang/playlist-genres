(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{198:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(67),c=a.n(l),s=(a(74),a(1)),i=(a(75),a(2)),o=a.n(i);function m(e){var t=[];for(var a in e)"pop"!==a&&"edm"!==a&&"rap"!==a&&t.push([a,e[a]]);return t.sort((function(e,t){return t[1]-e[1]})),t}function u(e,t){e.hasOwnProperty(t)?e[t]++:e[t]=1}function f(e,t){for(var a=0,n=0,r=[],l=e.length-1;a<t&&a<l;){if(e[n]){var c=e[n][0];"pop"!==c&&"edm"!==c&&"rap"!==c?(r.push(c),a++):l-=1}n++}return r}function g(e,t){var a="";return e.forEach((function(n,r){a+=n[t],r<e.length-1&&(a+=", ")})),a}var d=function(e){var t=Object(n.useState)({topArtists:[{}]}),a=Object(s.a)(t,2),l=a[0],c=a[1],i=new o.a;i.setAccessToken(e.token),Object(n.useEffect)((function(){!function(){var t={time_range:e.timeframe};i.getMyTopArtists(t).then((function(t){c({topSongs:l.topSongs,topArtists:t.items}),e.updateArtists(t.items)}))}(),m()}),[c]);var m=function(){document.querySelectorAll(".img3, .img2, .img1").forEach((function(e){var t=e.clientWidth;e.style.height=t+"px"}))};return window.addEventListener("load",(function(){m()})),window.addEventListener("resize",(function(){m()})),r.a.createElement("div",{className:"top-artists-wrapper"},l.topArtists[0].name?r.a.createElement("div",{className:"top-artists"},r.a.createElement("h1",null,"Top Artists"),r.a.createElement("div",{className:"artists-wrapper"},l.topArtists.slice(0,3).map((function(e,t){return r.a.createElement("div",{className:"artist-wrapper",key:t},r.a.createElement("div",{className:"artist-images"},r.a.createElement("img",{src:e.images[0].url,className:"img1"}),r.a.createElement("img",{src:e.images[0].url,className:"img2"}),r.a.createElement("img",{src:e.images[0].url,className:"img3"})),r.a.createElement("div",{className:"artist-desc"},r.a.createElement("h3",{className:"black"},"#",t+1),r.a.createElement("h3",{className:"green"},e.name)))})))):r.a.createElement("p",null,"Loading..."))};function p(e){return r.a.createElement("div",{className:"song-cover song-"+e.index,onMouseOver:e.handleHover,onMouseLeave:e.handleMouseLeave},r.a.createElement("img",{src:e.src}))}var v=function(e){var t=Object(n.useState)({topSongs:[{}]}),a=Object(s.a)(t,2),l=a[0],c=a[1],i=Object(n.useState)({name:"",artists:[{}],number:0}),m=Object(s.a)(i,2),u=m[0],f=m[1],d=Object(n.useState)(!1),v=Object(s.a)(d,2),h=v[0],E=v[1],b=new o.a;b.setAccessToken(e.token);var w=function(e,t,a){f({name:e,artists:t,number:a})};return Object(n.useEffect)((function(){!function(){var t={time_range:e.timeframe};b.getMyTopTracks(t).then((function(t){c({topSongs:t.items}),e.updateTracks(t.items)}))}(),window.outerWidth<800&&E(!0)}),[c]),window.addEventListener("resize",(function(){window.outerWidth<800?E(!0):E(!1)})),r.a.createElement("div",{className:"top-songs-wrapper"},l.topSongs[0].name?r.a.createElement("div",{className:"top-songs"},r.a.createElement("div",{className:"songs-header"},r.a.createElement("div",{className:"songs-header-wrapper"},r.a.createElement("h2",null,"You loved these songs the most."))),r.a.createElement("div",{className:"songs-text-wrapper"},h?l.topSongs.slice(0,5).map((function(e,t){return r.a.createElement("div",{className:"song-wrapper",key:t},r.a.createElement("div",{className:"song-number"},r.a.createElement("h3",null,t+1)),r.a.createElement("div",{className:"song-details"},r.a.createElement("h3",null,e.name.length>19?e.name.substring(0,19).concat(".."):e.name),r.a.createElement("p",{className:"pink"},g(e.artists,"name"))))})):r.a.createElement("p",null)),r.a.createElement("div",{className:"songs-wrapper"},r.a.createElement("div",{className:"songs-3d"},l.topSongs.slice(0,h?5:10).map((function(e,t){return r.a.createElement(p,{src:e.album.images[0].url,index:t,key:t,handleHover:function(){return w(e.name,e.artists,t)},handleMouseLeave:function(){return w("",[{}],0)}})})))),r.a.createElement("div",{className:"featured-song-container"},u.name?r.a.createElement("div",{className:"featured-song"},r.a.createElement("h3",{className:"featured-song-number"},u.number+1),r.a.createElement("h3",null,u.name.length>24?u.name.substring(0,24).concat(".."):u.name),r.a.createElement("p",null,g(u.artists,"name"))):r.a.createElement("p",null))):r.a.createElement("p",null,"Loading..."))};var h=function(e){var t=Object(n.useState)({genres:{}}),a=Object(s.a)(t,2),l=a[0],c=a[1],i=[{}],g=new o.a;g.setAccessToken(e.token),Object(n.useEffect)((function(){!function(){var t={time_range:e.timeframe};g.getMyTopArtists(t).then((function(e){i=e.items,c({genres:l.genres}),d()}))}()}),[c]);var d=function(){i.forEach((function(e){e.genres&&e.genres.forEach((function(e){var t=l.genres;u(t,e),c({genres:t})}))})),e.updateGenres(l.genres)};return r.a.createElement("div",{className:"genres-wrapper"},r.a.createElement("div",{className:"genres"},r.a.createElement("h2",null,"Your Top Niche Genres"),r.a.createElement("p",null,"Ever wondered what subgenres of music you listen to most often?"),r.a.createElement("div",{className:"genre-level-wrapper"},function(e){if(Object.keys(e).length>0){var t=[],a=f(m(e),5).map((function(e,t){return r.a.createElement("div",{className:"genre-level",key:t},r.a.createElement("div",{className:"genre-level-front"},r.a.createElement("h3",null,e)),r.a.createElement("div",{className:"genre-level-side"}))}));return t[0]=a[4],t[1]=a[3],t[2]=a[1],t[3]=a[0],t[4]=a[2],t}return r.a.createElement("p",null,"N/A")}(l.genres))))},E=a(68),b=a.n(E);var w=function(e){var t=Object(n.useState)({palette:{}}),a=Object(s.a)(t,2),l=(a[0],a[1]),c=function(t){var a=document.getElementById("downloadable");a.width=2*a.clientWidth,a.height=2*a.clientHeight;var n=a.getContext("2d");if(window.outerWidth<600?n.scale(1.4,1.4):n.scale(2,2),t.DarkMuted){var r=t.DarkMuted.getRgb();n.fillStyle="rgb("+r[0]+","+r[1]+","+r[2]+")"}else n.fillStyle="rgb(0,0,0)";if(n.fillRect(0,0,a.width,a.height),n.fillStyle="rgb(255,255,255)",n.font="16px 'Circular Spotify'",t.Vibrant){var l=t.Vibrant.getRgb();n.fillStyle="rgb("+l[0]+","+l[1]+","+l[2]+")"}else n.fillStyle="rgb(226,28,164)";n.fillText("QUARANTINE WRAPPED",270,50),n.fillRect(30,43,230,3);var c=new Image;if(c.crossOrigin="Anonymous",e.tracks&&(c.src=e.artists[0].images[0].url||""),c.onload=function(){n.drawImage(c,290,90,140,130),n.drawImage(c,280,115,160,145),n.drawImage(c,270,140,180,170),n.drawImage(c,250,170,220,210)},t.LightVibrant){var s=t.LightVibrant.getRgb();n.fillStyle="rgb("+s[0]+","+s[1]+","+s[2]+")"}else n.fillStyle="rgb(209,255,106)";n.font="18px 'Circular Spotify'",n.fillText("TOP ARTISTS",30,106),n.fillStyle="rgb(255,255,255)",n.font="20px 'Circular Spotify'";for(var o=0;o<5;o++)if(e.artists[o]&&0!=Object.keys(e.artists[o]).length){var m=e.artists[o].name;m.length>19&&(m=m.substring(0,19).concat("..")),i(n,m,30,133+28*o)}if(t.LightVibrant){var u=t.LightVibrant.getRgb();n.fillStyle="rgb("+u[0]+","+u[1]+","+u[2]+")"}else n.fillStyle="rgb(209,255,106)";n.font="18px 'Circular Spotify'",i(n,"TOP SONGS",30,320),n.fillStyle="rgb(255,255,255)",n.font="20px 'Circular Spotify'";for(var f=0;f<5;f++)if(e.tracks[f]){var g=e.tracks[f].name;g.length>19&&(g=g.substring(0,19).concat("..")),i(n,g,30,348+28*f)}if(t.LightVibrant){var d=t.LightVibrant.getRgb();n.fillStyle="rgb("+d[0]+","+d[1]+","+d[2]+")"}else n.fillStyle="rgb(209,255,106)";if(n.font="18px 'Circular Spotify'",i(n,"TOP GENRE",250,430),n.fillStyle="rgb(255,255,255)",n.font="24px 'Circular Spotify'",e.genres&&e.genres[0][0]){var p=e.genres[0][0],v=p.charAt(0).toUpperCase()+p.slice(1);i(n,v,250,460)}if(t.DarkVibrant){var h=t.DarkVibrant.getRgb();n.fillStyle="rgba("+h[0]+","+h[1]+","+h[2]+", 50)"}else n.fillStyle="rgb(255,255,255,50)";n.font="12px 'Circular Spotify'",i(n,"bit.ly/quarantine-wrapped",305,66)},i=function(e,t,a,n){e.fillText(t,a,n)};return Object(n.useEffect)((function(){e.finished>=3&&function(){var t="";e.tracks&&(t=e.artists[0].images[0].url||""),b.a.from(t).getPalette((function(e,t){t&&(l({palette:t}),c(t))}))}()}),[e.finished]),r.a.createElement("div",{className:"canvas-graphic-wrapper"},r.a.createElement("div",{className:"canvas-graphic"},r.a.createElement("div",{className:"canvas-title"},r.a.createElement("h1",null,"Share with the world."),r.a.createElement("h3",null,"Or hide it away forever."),r.a.createElement("h3",null,"Your choice, really."),r.a.createElement("button",{onClick:function(){var e=document.getElementById("downloadable").toDataURL("image/png");e=(e=e.replace(/^data:image\/[^;]*/,"data:application/octet-stream")).replace(/^data:application\/octet-stream/,"data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png");var t=document.createElement("a");t.download="quarantine-wrapped.png",t.href=e,t.click()},className:"download-btn"},"Download")),r.a.createElement("canvas",{id:"downloadable",width:"500",height:"500"})))},y=a(23);var k=function(e){var t=Object(n.useState)({timeframe:0,tracks:[{}]}),a=Object(s.a)(t,2),l=a[0],c=a[1],i=Object(n.useState)([{}]),u=Object(s.a)(i,2),f=u[0],g=u[1],p=Object(n.useState)(0),E=Object(s.a)(p,2),b=E[0],k=E[1],S=Object(n.useState)([{}]),N=Object(s.a)(S,2),O=N[0],T=N[1],j=Object(n.useState)(1),A=Object(s.a)(j,2),C=A[0],x=A[1];(new o.a).setAccessToken(e.token);var L={1:"short_term",2:"medium_term",3:"long_term"},R="#d1ff6a",I="#48937e",M="#e21ca4",W="#191414";return Object(n.useEffect)((function(){c({timeframe:2})}),[c]),r.a.createElement("div",null,0===l.timeframe?r.a.createElement("div",{className:"options"},r.a.createElement("div",{onClick:function(){return c({timeframe:1})}},r.a.createElement("h2",null,"4 Weeks")),r.a.createElement("div",{onClick:function(){return c({timeframe:2})}},r.a.createElement("h2",null,"6 months")),r.a.createElement("div",{onClick:function(){return c({timeframe:3})}},r.a.createElement("h2",null,"All Time"))):r.a.createElement("div",{className:"summary"},r.a.createElement("div",{className:"credit"},"Made with \u2665 by ",r.a.createElement("a",{href:"https://clawang.github.io/",id:"credit-link"},"Claire Wang"),"."),r.a.createElement("div",{className:"navigation"},r.a.createElement("p",null,C," / 4")),r.a.createElement("div",{className:"summary-content"},r.a.createElement(y.a,{className:"full-height",onScroll:function(){var e=document.querySelector(".full-height"),t=document.querySelector(".top-songs-wrapper"),a=document.querySelector(".genres-wrapper"),n=document.querySelector(".canvas-graphic-wrapper"),r=document.querySelector(".summary-bg");e.scrollTop<t.offsetTop-500?(r.style.backgroundColor=M,x(1)):e.scrollTop>=t.offsetTop-500&&e.scrollTop<a.offsetTop-500?(r.style.backgroundColor=W,x(2)):e.scrollTop>=a.offsetTop-500&&e.scrollTop<n.offsetTop-500?(r.style.backgroundColor=R,x(3)):e.scrollTop>=n.offsetTop-500&&(r.style.backgroundColor=I,x(4))}},r.a.createElement(d,{token:e.token,timeframe:L[l.timeframe],updateArtists:function(e){g(e),k((function(e){return e+1}))}}),r.a.createElement(v,{token:e.token,timeframe:L[l.timeframe],updateTracks:function(e){c({timeframe:l.timeframe,tracks:e}),k((function(e){return e+1}))}}),r.a.createElement(h,{token:e.token,timeframe:L[l.timeframe],updateGenres:function(e){var t=m(e);T(t),k((function(e){return e+1}))}}),r.a.createElement(w,{artists:f,tracks:l.tracks,genres:O,finished:b}))),r.a.createElement("div",{className:"summary-bg"})))};var S=function(){var e=Object(n.useState)({loggedIn:!1,token:""}),t=Object(s.a)(e,2),a=t[0],l=t[1],c=new o.a;return Object(n.useEffect)((function(){var e=function(){var e,t={},a=/([^&;=]+)=?([^&;]*)/g,n=window.location.hash.substring(1);for(e=a.exec(n);e;)t[e[1]]=decodeURIComponent(e[2]),e=a.exec(n);return t}().access_token;e&&c.setAccessToken(e),l({loggedIn:!!e,token:e})}),[l]),r.a.createElement("div",{className:"App"},a.loggedIn?r.a.createElement("div",null,r.a.createElement(k,{token:a.token})):r.a.createElement(y.a,null,r.a.createElement("div",{className:"start-screen"},r.a.createElement("div",null,r.a.createElement("div",{className:"heading-1"},r.a.createElement("h1",null,"Ready for your")),r.a.createElement("div",{className:"heading-2"},r.a.createElement("h1",null,"Quarantine Wrapped?")),r.a.createElement("div",{className:"start-descrip"},r.a.createElement("h3",{className:"green"},"Relive and discover the artists and music that have gotten you through."),r.a.createElement("button",null,r.a.createElement("a",{href:"/login"}," Login to Spotify "))),r.a.createElement("p",{className:"disclaimer"},"* NOT affiliated with Spotify")))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},69:function(e,t,a){e.exports=a(198)},74:function(e,t,a){},75:function(e,t,a){}},[[69,1,2]]]);
//# sourceMappingURL=main.2f3751b1.chunk.js.map