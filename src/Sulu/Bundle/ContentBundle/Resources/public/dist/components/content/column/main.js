define(function(){"use strict";var a="column-navigation-show-ghost-pages",b={toggler:['<div id="show-ghost-pages"></div>','<label class="inline spacing-left" for="show-ghost-pages"><%= label %></label>'].join("")};return{view:!0,initialize:function(){this.render(),this.sandbox.sulu.triggerDeleteSuccessLabel(),this.showGhostPages=!0,this.setShowGhostPages()},setShowGhostPages:function(){var b=this.sandbox.sulu.getUserSetting(a);null!==b&&(this.showGhostPages=JSON.parse(b))},bindCustomEvents:function(){this.sandbox.on("husky.column-navigation.add",function(a){this.sandbox.emit("sulu.content.contents.new",a)},this),this.sandbox.on("husky.column-navigation.edit",function(a){this.sandbox.emit("sulu.content.contents.load",a.id)},this),this.sandbox.on("husky.column-navigation.selected",function(a){this.sandbox.sulu.saveUserSetting(this.options.webspace+"ColumnNavigationSelected",a.id)},this),this.sandbox.on("sulu.content.localizations",function(a){this.localizations=a},this),this.sandbox.on("husky.toggler.show-ghost-pages.changed",function(b){this.showGhostPages=b,this.sandbox.sulu.saveUserSetting(a,this.showGhostPages),this.startColumnNavigation()},this),this.sandbox.on("husky.select.language.selected.item",function(a){this.changeLanguage(this.getLocalizationForId(a))},this)},startColumnNavigation:function(){this.sandbox.stop(this.$find("#content-column")),this.sandbox.dom.append(this.$el,'<div id="content-column"></div>'),this.sandbox.start([{name:"column-navigation@husky",options:{el:this.$find("#content-column"),selected:this.getLastSelected(),url:this.getUrl()}}])},getLocalizationForId:function(a){a=parseInt(a,10);for(var b=-1,c=this.localizations.length;++b<c;)if(this.localizations[b].id===a)return this.localizations[b].localization;return null},getLastSelected:function(){return this.sandbox.sulu.getUserSetting(this.options.webspace+"ColumnNavigationSelected")},getUrl:function(){return null!==this.getLastSelected()?"/admin/api/nodes/"+this.getLastSelected()+"?tree=true&webspace="+this.options.webspace+"&language="+this.options.language+"&exclude-ghosts="+(this.showGhostPages?"false":"true"):"/admin/api/nodes?depth=1&webspace="+this.options.webspace+"&language="+this.options.language+"&exclude-ghosts="+(this.showGhostPages?"false":"true")},render:function(){this.bindCustomEvents(),require(["text!/admin/content/template/content/column/"+this.options.webspace+"/"+this.options.language+".html"],function(a){var b={translate:this.sandbox.translate},c=this.sandbox.util.extend({},b),d=this.sandbox.util.template(a,c);this.sandbox.dom.html(this.$el,d),this.addToggler(),this.startColumnNavigation()}.bind(this))},addToggler:function(){this.sandbox.emit("sulu.header.set-bottom-content",this.sandbox.util.template(b.toggler)({label:this.sandbox.translate("content.contents.show-ghost-pages")})),this.sandbox.start([{name:"toggler@husky",options:{el:"#show-ghost-pages",checked:this.showGhostPages,outline:!0}}])}}});