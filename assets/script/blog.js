var Koishumi;Koishumi=function(t,e){var n,o,i,r,a,s,u,c,m;return a="",o=new showdown.Converter({omitExtraWLInCodeBlocks:!0,parseImgDimensions:!0,simplifiedAutoLink:!0,literalMidWordUnderscores:!0,tables:!0,tasklists:!0}),u=function(t,n){var o;return o=e.createElement("script"),o.src=t,o.async=!0,o.onload=function(){return this.remove(),null!=n?n():void 0},(e.getElementsByTagName("head")[0]||e.getElementsByTagName("body")[0]).appendChild(o)},r=function(t,e,n,o){var i;return e&&!config[e]?"":(i=(config[e]||config)[t],i?(o?o:"")+i+(n?n:""):"")},c={month:["January","February","March","April","May","June","July","August","September","October","November","December"],time:function(t){var e;return e=t.shift(),t[0]=this.month[t[0]-1],t[1]=+t[1],t.join(" ")+", "+e},decode:function(t){var e;return t=t.split("-",4),e=t.pop(),{url:"#!/"+t.join("-")+"-"+encodeURIComponent(e),title:e,date:this.time(t)}}},n={home:function(){return u("https://api.github.com/repos/"+r("repo","github")+r("path","github")+"/contents/?"+r("branch","github","&","ref=")+"callback=Koishumi.updateList",function(){return e.title="Home"})},article:function(t){var i,a;return i=c.decode(t),a=new XMLHttpRequest,a.open("GET","https://raw.githubusercontent.com/"+r("repo","github")+"/"+r("branch","github","/")+r("path","github")+t+".md"),a.onload=function(){var t;return a.status>=200&&a.status<400?(t=a.responseText,e.title=i.title,e.getElementById("main").innerHTML=template("article",{url:location.href,title:i.title,date:i.date,content:o.makeHtml(t),comment:{type:r("type","comment")}}),n.comment()):void 0},a.send()},comment:function(){switch(r("type","comment")){case"disqus":return setTimeout(function(){return t.disqus_identifier=e.title,t.disqus_url=location.href,t.DISQUS?DISQUS.reset({reload:!0}):u("//"+r("shortname","comment")+".disqus.com/embed.js")},1e3);case"duoshuo":return setTimeout(function(){return t.DUOSHUO?DUOSHUO.EmbedThread(".ds-thread"):(t.duoshuoQuery={short_name:r("shortname","comment")},u("//static.duoshuo.com/embed.js"))},1e3)}}},s={data:(i=JSON.parse(localStorage.getItem("koishumi")))?i:localStorage.setItem("koishumi","[]")||[],cache:function(){return localStorage.setItem("koishumi",JSON.stringify(this.data))},update:function(t){var e,n,o,i;return 0===t.meta["X-RateLimit-Limit"]&&s.show(),i=n=t.data.length,s.data=function(){var r;for(r=[];e=t.data[--n];)".md"===e.name.substr(-3)&&(o=c.decode(e.name.replace(/\.md$/,"")),r.push({id:i-n,url:o.url,title:o.title,date:o.date}));return r}(),s.cache(),s.show()},show:function(){return e.getElementById("main").innerHTML=template("article-list",{posts:this.data})}},m=function(){return a=decodeURIComponent(location.hash),"#!/"===a.substr(0,3)&&a.substr(3)?"home"===a.substr(3)?n.home():n.article(a.substr(3)):location.hash="#!/home"},r("repo","github")?(t.onhashchange=m,m(),{updateList:s.update}):console.log("Cannot find any available repo. Complete config please.")}(this,document);