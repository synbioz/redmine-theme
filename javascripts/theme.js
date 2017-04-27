"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};!function(t){"use strict";function e(){console.log.apply(console,arguments)}function s(t,e){var s;this.list=t,this.options=e=e||{};for(s in r){r.hasOwnProperty(s)&&("boolean"==typeof r[s]?this.options[s]=s in e?e[s]:r[s]:this.options[s]=e[s]||r[s])}}function n(t,e,s){var o,r,h,a,c,p;if(e){if(h=e.indexOf("."),-1!==h?(o=e.slice(0,h),r=e.slice(h+1)):o=e,a=t[o],null!==a&&void 0!==a)if(r||"string"!=typeof a&&"number"!=typeof a){if(i(a))for(c=0,p=a.length;p>c;c++){n(a[c],r,s)}else r&&n(a,r,s);}else s.push(a)}else s.push(t);return s}function i(t){return"[object Array]"===Object.prototype.toString.call(t)}function o(t,e){e=e||{},this.options=e,this.options.location=e.location||o.defaultOptions.location,this.options.distance="distance"in e?e.distance:o.defaultOptions.distance,this.options.threshold="threshold"in e?e.threshold:o.defaultOptions.threshold,this.options.maxPatternLength=e.maxPatternLength||o.defaultOptions.maxPatternLength,this.pattern=e.caseSensitive?t:t.toLowerCase(),this.patternLen=t.length,this.patternLen<=this.options.maxPatternLength&&(this.matchmask=1<<this.patternLen-1,this.patternAlphabet=this._calculatePatternAlphabet())}var r={id:null,caseSensitive:!1,include:[],shouldSort:!0,searchFn:o,sortFn:function sortFn(t,e){return t.score-e.score},getFn:n,keys:[],verbose:!1,tokenize:!1,matchAllTokens:!1,tokenSeparator:/ +/g,minMatchCharLength:1,findAllMatches:!1};s.VERSION="2.6.0",s.prototype.set=function(t){return this.list=t,t},s.prototype.search=function(t){this.options.verbose&&e("\nSearch term:",t,"\n"),this.pattern=t,this.results=[],this.resultMap={},this._keyMap=null,this._prepareSearchers(),this._startSearch(),this._computeScore(),this._sort();var s=this._format();return s},s.prototype._prepareSearchers=function(){var t=this.options,e=this.pattern,s=t.searchFn,n=e.split(t.tokenSeparator),i=0,o=n.length;if(this.options.tokenize)for(this.tokenSearchers=[];o>i;i++){this.tokenSearchers.push(new s(n[i],t))}this.fullSeacher=new s(e,t)},s.prototype._startSearch=function(){var t,e,s,n,i=this.options,o=i.getFn,r=this.list,h=r.length,a=this.options.keys,c=a.length,p=null;if("string"==typeof r[0])for(s=0;h>s;s++){this._analyze("",r[s],s,s)}else for(this._keyMap={},s=0;h>s;s++){for(p=r[s],n=0;c>n;n++){if(t=a[n],"string"!=typeof t){if(e=1-t.weight||1,this._keyMap[t.name]={weight:e},t.weight<=0||t.weight>1)throw new Error("Key weight has to be > 0 and <= 1");t=t.name}else this._keyMap[t]={weight:1};this._analyze(t,o(p,t,[]),p,s)}}},s.prototype._analyze=function(t,s,n,o){var r,h,a,c,p,l,u,f,d,g,m,y,v,k,S,b=this.options,M=!1;if(void 0!==s&&null!==s){h=[];var _=0;if("string"==typeof s){if(r=s.split(b.tokenSeparator),b.verbose&&e("---------\nKey:",t),this.options.tokenize){for(k=0;k<this.tokenSearchers.length;k++){for(f=this.tokenSearchers[k],b.verbose&&e("Pattern:",f.pattern),d=[],y=!1,S=0;S<r.length;S++){g=r[S],m=f.search(g);var L={};m.isMatch?(L[g]=m.score,M=!0,y=!0,h.push(m.score)):(L[g]=1,this.options.matchAllTokens||h.push(1)),d.push(L)}y&&_++,b.verbose&&e("Token scores:",d)}for(c=h[0],l=h.length,k=1;l>k;k++){c+=h[k]}c/=l,b.verbose&&e("Token score average:",c)}u=this.fullSeacher.search(s),b.verbose&&e("Full text score:",u.score),p=u.score,void 0!==c&&(p=(p+c)/2),b.verbose&&e("Score average:",p),v=this.options.tokenize&&this.options.matchAllTokens?_>=this.tokenSearchers.length:!0,b.verbose&&e("Check Matches",v),(M||u.isMatch)&&v&&(a=this.resultMap[o],a?a.output.push({key:t,score:p,matchedIndices:u.matchedIndices}):(this.resultMap[o]={item:n,output:[{key:t,score:p,matchedIndices:u.matchedIndices}]},this.results.push(this.resultMap[o])))}else if(i(s))for(k=0;k<s.length;k++){this._analyze(t,s[k],n,o)}}},s.prototype._computeScore=function(){var t,s,n,i,o,r,h,a,c,p=this._keyMap,l=this.results;for(this.options.verbose&&e("\n\nComputing score:\n"),t=0;t<l.length;t++){for(n=0,i=l[t].output,o=i.length,a=1,s=0;o>s;s++){r=i[s].score,h=p?p[i[s].key].weight:1,c=r*h,1!==h?a=Math.min(a,c):(n+=c,i[s].nScore=c)}1===a?l[t].score=n/o:l[t].score=a,this.options.verbose&&e(l[t])}},s.prototype._sort=function(){var t=this.options;t.shouldSort&&(t.verbose&&e("\n\nSorting...."),this.results.sort(t.sortFn))},s.prototype._format=function(){var t,s,n,i,o,r=this.options,h=r.getFn,a=[],c=this.results,p=r.include;for(r.verbose&&e("\n\nOutput:\n\n",c),i=r.id?function(t){c[t].item=h(c[t].item,r.id,[])[0]}:function(){},o=function o(t){var e,s,n,i,o,r=c[t];if(p.length>0){if(e={item:r.item},-1!==p.indexOf("matches"))for(n=r.output,e.matches=[],s=0;s<n.length;s++){i=n[s],o={indices:i.matchedIndices},i.key&&(o.key=i.key),e.matches.push(o)}-1!==p.indexOf("score")&&(e.score=c[t].score)}else e=r.item;return e},s=0,n=c.length;n>s;s++){i(s),t=o(s),a.push(t)}return a},o.defaultOptions={location:0,distance:100,threshold:.6,maxPatternLength:32},o.prototype._calculatePatternAlphabet=function(){var t={},e=0;for(e=0;e<this.patternLen;e++){t[this.pattern.charAt(e)]=0}for(e=0;e<this.patternLen;e++){t[this.pattern.charAt(e)]|=1<<this.pattern.length-e-1}return t},o.prototype._bitapScore=function(t,e){var s=t/this.patternLen,n=Math.abs(this.options.location-e);return this.options.distance?s+n/this.options.distance:n?1:s},o.prototype.search=function(t){var e,s,n,i,o,r,h,a,c,p,l,u,f,d,g,m,y,v,k,S,b,M,_,L=this.options;if(t=L.caseSensitive?t:t.toLowerCase(),this.pattern===t)return{isMatch:!0,score:0,matchedIndices:[[0,t.length-1]]};if(this.patternLen>L.maxPatternLength){if(v=t.match(new RegExp(this.pattern.replace(L.tokenSeparator,"|"))),k=!!v)for(b=[],e=0,M=v.length;M>e;e++){_=v[e],b.push([t.indexOf(_),_.length-1])}return{isMatch:k,score:k?.5:1,matchedIndices:b}}for(i=L.findAllMatches,o=L.location,n=t.length,r=L.threshold,h=t.indexOf(this.pattern,o),S=[],e=0;n>e;e++){S[e]=0}for(-1!=h&&(r=Math.min(this._bitapScore(0,h),r),h=t.lastIndexOf(this.pattern,o+this.patternLen),-1!=h&&(r=Math.min(this._bitapScore(0,h),r))),h=-1,m=1,y=[],p=this.patternLen+n,e=0;e<this.patternLen;e++){for(a=0,c=p;c>a;){this._bitapScore(e,o+c)<=r?a=c:p=c,c=Math.floor((p-a)/2+a)}for(p=c,l=Math.max(1,o-c+1),u=i?n:Math.min(o+c,n)+this.patternLen,f=Array(u+2),f[u+1]=(1<<e)-1,s=u;s>=l;s--){if(g=this.patternAlphabet[t.charAt(s-1)],g&&(S[s-1]=1),0===e?f[s]=(f[s+1]<<1|1)&g:f[s]=(f[s+1]<<1|1)&g|((d[s+1]|d[s])<<1|1)|d[s+1],f[s]&this.matchmask&&(m=this._bitapScore(e,s-1),r>=m)){if(r=m,h=s-1,y.push(h),!(h>o))break;l=Math.max(1,2*o-h)}}if(this._bitapScore(e+1,o)>r)break;d=f}return b=this._getMatchedIndices(S),{isMatch:h>=0,score:0===m?.001:m,matchedIndices:b}},o.prototype._getMatchedIndices=function(t){for(var e,s=[],n=-1,i=-1,o=0,r=t.length;r>o;o++){e=t[o],e&&-1===n?n=o:e||-1===n||(i=o-1,i-n+1>=this.options.minMatchCharLength&&s.push([n,i]),n=-1)}return t[o-1]&&o-1-n+1>=this.options.minMatchCharLength&&s.push([n,o-1]),s},"object"==(typeof exports==="undefined"?"undefined":_typeof(exports))?module.exports=s:"function"==typeof define&&define.amd?define(function(){return s}):t.Fuse=s}(window);
"use strict";(function(){var projectList=[],filter,filtered=[],resultList,resultLinks,redspotInput,redspotLabel,redspot,currentFocusIndex=0,lastSearchLength=0,fuse,fuse_options={include:["score"],shouldSort:true,tokenize:true,matchAllTokens:true,threshold:0.1,location:0,distance:1000,maxPatternLength:32,minMatchCharLength:2,keys:["name"]},commands=[{title:"Activit\xE9",alias:["/a","/activity"],url:"/activity"},{title:"Roadmap",alias:["/r","/roadmap"],url:"/roadmap"},{title:"Demandes",alias:["/#","/i","/issues"],url:"/issues"},{title:"Nouvelle demande",alias:["/+","/n","/new"],url:"/issues/new"},{title:"Gantt",alias:["/g","/gantt"],url:"/issues/gantt"},{title:"Calendar",alias:["/c","/calendar"],url:"/issues/calendar"},{title:"Annonces",alias:["/n","/news"],url:"/news"},{title:"Documents",alias:["/d","/documents"],url:"/documents"},{title:"Wiki",alias:["/w","/wiki"],url:"/wiki"},{title:"Wiki by date",alias:["/wd"],url:"/wiki/date_index"},,{title:"Wiki by title",alias:["/wt"],url:"/wiki/index"},{title:"Files",alias:["/f","/files"],url:"/files"},{title:"Configuration",alias:["/s","/settings"],url:"/settings"}],aliases=[],template="\n      <div class=\"Redspot\">\n        <i class=\"Redspot__icon\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"25\" height=\"25\" viewBox=\"0 0 25 25\"><g fill=\"none\" fill-rule=\"evenodd\"><path d=\"M-4-4h34v34H-4z\"/><path fill=\"#FFF\" fill-rule=\"nonzero\" d=\"M17.958 15.833H16.84l-.396-.382a9.168 9.168 0 0 0 2.224-5.993A9.208 9.208 0 0 0 9.458.25 9.208 9.208 0 0 0 .25 9.458a9.208 9.208 0 0 0 9.208 9.209c2.281 0 4.378-.836 5.993-2.225l.382.397v1.12l7.084 7.069 2.11-2.111-7.069-7.084zm-8.5 0a6.366 6.366 0 0 1-6.375-6.375 6.366 6.366 0 0 1 6.375-6.375 6.366 6.366 0 0 1 6.375 6.375 6.366 6.366 0 0 1-6.375 6.375z\"/></g></svg></i>\n        <div class=\"Redspot__actionLabel\"></div>\n        <input type=\"text\" placeholder=\"Recherche Redspot\" class=\"Redspot__input\">\n        <div class=\"Redspot__results\">\n          <ul class=\"Redspot__resultList\">\n          </ul>\n          <ul class=\"Redspot__help\">\n            <li>Pour chaque projets\xA0:</li>\n            <li>/# Liste des demandes</li>\n            <li>/+ Nouvelle demande</li>\n            <li>/w Wiki</li>\n            <li>/s Configuration</li>\n            <li><a href=\"https://support.synbioz.com/projects/redmine-synbioz/wiki/Redspot\" target=\"_blank\">Et plus encore</a></li>\n          </ul>\n        </div>\n      </div>";function createAliases(commands){aliases=commands.reduce(function(curAliases,command){command.alias.forEach(function(alias){curAliases[alias]=command});return curAliases},{})}function interpreter(value){return{bang:value.split(" ").filter(function(word){return word[0]==="/"}).pop(),search:value.split(" ").filter(function(word){return word[0]!=="/"}).join(" ")}}function projectLink(project){var link=$("<a/>");link.text(project.name);link.attr("href",project.url);link.attr("data-project",project.name);link.attr("class","Redspot__project");link.attr("tabindex","-1");return link[0]}function createProjectList(){if($("#project_quick_jump_box").length!==0){$("#project_quick_jump_box option").each(function(){var str=this.value.match(/\/projects\/(.*)\?.*/);if(str!==null)projectList.push({name:this.innerText.split("\xBB").pop().trim(),url:this.value})})}else{console.error("Can't create the project list")}filter=new Fuse(projectList,fuse_options)}function render(filtered){var list=[];filtered.forEach(function(i){var project=i.item;list.push(projectLink(project))});$(resultList).html(list);updateCurrentLabel();updateFocusedLink(currentFocusIndex)}function updateCurrentLabel(){var currentBang=interpreter(redspotInput.val()).bang;var currentProject=filtered[currentFocusIndex];if(currentBang!==undefined&&currentProject!==undefined){var page=aliases[currentBang].title;redspotLabel.html(page+" - "+currentProject.item.name)}else if(currentProject!==undefined){redspotLabel.html("Go to "+currentProject.item.name)}else{redspotLabel.html("")}}function showRedspot(){if(projectList.length===0){createProjectList()}initControl();redspot.addClass("display");redspotInput.focus()}function hideRedspot(){redspot.removeClass("display");redspotInput.val("");$(resultList).empty();redspotInput.unbind("keyup")}function toggleRedspot(){if(redspot.hasClass("display")){hideRedspot()}else{showRedspot()}}function updateFocusedLink(index){$(".Redspot__project--focused").removeClass("Redspot__project--focused");$(".Redspot__project").eq(index).addClass("Redspot__project--focused");updateCurrentLabel()}function redirecter(filtered,focusIndex,interpreted){var url=filtered[focusIndex].item.url;if(interpreted.bang!==undefined){window.location="https://support.synbioz.com/"+url.split("?").shift()+aliases[interpreted.bang].url}else{window.location="https://support.synbioz.com/"+url}}function initControl(){redspot.on("click",function(e){e.preventDefault();e.stopPropagation();if($(e.target).hasClass("Redspot__project")){redirecter(filtered,$(e.target).index(),interpreter(redspotInput.val()))};});redspotInput.on("keyup",function(e){switch(e.keyCode){case 27:e.stopPropagation();toggleRedspot();break;case 13:redirecter(filtered,currentFocusIndex,interpreter($(this).val()));break;default:if($(this).val().length!==lastSearchLength){currentFocusIndex=0;lastSearchLength=$(this).val().length;var projectName=interpreter($(this).val()).search;filtered=filter.search(projectName);render(filtered)}break;}});redspotInput.on("keydown",function(e){switch(e.keyCode){case 38:e.preventDefault();e.stopPropagation();currentFocusIndex=Math.max(0,currentFocusIndex-1);updateFocusedLink(currentFocusIndex);break;case 40:e.preventDefault();e.stopPropagation();currentFocusIndex=Math.min(filtered.length-1,currentFocusIndex+1);updateFocusedLink(currentFocusIndex);break;}})}$(document).ready(function(){$("body").append(template);resultList=$(".Redspot__resultList");resultLinks=$(".Redspot__resultLinks");redspotInput=$(".Redspot__input");redspotLabel=$(".Redspot__actionLabel");redspot=$(".Redspot");createAliases(commands);$(this).on("keyup",function(e){if(e.keyCode===27){toggleRedspot()}})})})();
'use strict';$(document).on('ready page:load',function(){(function(){$('#context-menu').on('mouseenter','.folder',function(){var $submenu=$(this).find('ul'),overflow=window.innerHeight-$submenu.innerHeight()-$submenu.offset().top;if(overflow<0){$submenu.css('margin-top',overflow)}});$('#q').focus(function(){$('body').addClass('showMenu')});$('#q').blur(function(){$('body').removeClass('showMenu')})})()});

//# sourceMappingURL=theme.js.map