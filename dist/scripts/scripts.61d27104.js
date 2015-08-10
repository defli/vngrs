"use strict";angular.module("bookaApp",["restangular","ui.bootstrap","ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).constant("BASE_URL","http://vngrs-challenge.herokuapp.com/api/").config(["$routeProvider","RestangularProvider","BASE_URL",function(a,b,c){b.setBaseUrl(c),b.setDefaultHeaders({"X-client_id":"bd0d2debe4b53b9575d86ae782d54d02a0e2996de1eac4806e829dda4bf4ef53"}),b.setResponseInterceptor(function(a,b){return"getList"===b?a.data:a}),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"_review",resolve:{reviews:["$q","ReviewModel",function(a,b){var c=a.defer();return b.all().then(function(a){c.resolve(a)}),c.promise}]}}).otherwise({redirectTo:"/"})}]),angular.module("bookaApp").controller("MainCtrl",["ReviewModel","reviews","$scope","$rootScope",function(a,b,c,d){var e=this;e.init=function(){e.limitTo=10,e.stars=[],e.reviews=b,e.total=b.length,e.setRibbonCounts(),e.setStarCounts(),e.setOrder(),e.setSelectedRibbon(),d.loaded=!0},e.vote=function(b,c){var d=b.id;a.vote(d,c).then(function(){"helpful"===c?b.helpful_count+=1:b.not_helpful_count+=1,b.voted=!0})},e.setRibbonCounts=function(){var a=_.countBy(e.reviews,"user.type");a.everyone=e.reviews.length,_.forEach(a,function(a,b){var c=_.find(e.ribbons,{slug:b},this);c.len=a})},e.setStarCounts=function(){var a=_.countBy(e.reviews,"rating"),b=0,c=0;_.forEach(a,function(a,d){e.stars.push({name:parseInt(d),count:a,percentage:parseInt(a/e.total*100)}),c+=a,b+=d*a}),e.average=Math.round(b/c)},e.setSelectedRibbon=function(a){"undefined"==typeof a?e.selectedRibbon=e.ribbons[0]:e.selectedRibbon=a},e.setFilter=function(a){e.setSelectedRibbon(a),e.setLimit(10);var b=a.slug;return"everyone"===b?(e.filterBy={},!0):(e.filterBy={user:{type:b}},!0)},e.setLimit=function(a,b){b===!0?c.$apply(function(){e.limitTo=a}):e.limitTo=a},e.setOrder=function(a){return"undefined"==typeof a&&(a=e.orders[0]),e.orderBy=a,!0},e.getColor=function(a){var b=_.result(_.findWhere(e.ribbons,{slug:a}),"color");return b},e.orders=[{slug:"-helpful_count",name:"Most Helpful"},{slug:"-not_helpful_count",name:"Most Not Helpful"},{slug:"-rating",name:"Highest Rating"},{slug:"-id",name:"Newest First"}],e.ribbons=[{title:"Everyone",slug:"everyone",len:0,color:"dark-green"},{title:"Readers",slug:"reader",len:0,color:"light-blue"},{title:"Critics",len:0,slug:"critic",color:"light-yellow"},{title:"Editors",slug:"editor",len:0,color:"light-red"},{title:"Librarians",slug:"librarian",len:0,color:"light-green"},{title:"Bloggers",slug:"blogger",len:0,color:"light-purple"}],e.init()}]),angular.module("bookaApp").factory("ReviewModel",["Restangular",function(a){return{all:function(){return a.all("reviews").getList()},vote:function(b,c){return a.one("reviews",b).all("vote").post({type:c})}}}]),angular.module("bookaApp").directive("readMore",function(){return{templateUrl:"views/directives/read-more.html",scope:{content:"=",limit:"@"},restrict:"EA",link:function(a){var b="";a.content.length>a.limit&&(b=a.content.substring(0,a.limit),a.shortContent=b+"..."),a.readMore=function(){a.shortContent=!1}}}}),angular.module("bookaApp").directive("infinite",function(){return{scope:{change:"&",limitTo:"="},template:"",restrict:"E",controller:["$scope","$element","$window",function(a,b,c){var d=a.limitTo;angular.element(c).bind("scroll",function(){var b=document.body.scrollTop,e=document.body.scrollHeight-c.innerHeight,f=a.limitTo;b>=e&&a.change({limit:d+f,apply:!0})})}]}});