'use strict';

/**
 * @ngdoc function
 * @name potatoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the potatoApp
 */
angular.module('potatoApp')
  .controller('PhotoDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    var url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK';
		$http.jsonp(url).success(function(data) {
			var photo = {}; 
	    for (var i=0; i<data.items.length;i++) {
	    	var url = data.items[i].title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
	    	if(url === $routeParams.id){
	    		var item = data.items[i];
		        item.publishedString = moment(item.published).format('Do MMM YYYY [at] hh:mm ');
		        var str = item.link;
		        var matched = str.match(/([^/]*\/){5}/);
		        item.linkAuthor = matched ? matched[0] : str;
		        item.url = item.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
		        var tags = item.tags.split(" ");
		        item.tags = [];
		        for (var j=0; j<tags.length;j++) {
		        	item.tags.push(tags[j]);
		        }
		        photo = item; 
	    	} 
	    }
	  
		 	$scope.photo = photo;
	  }).error(function(data) {
        $scope.error = true;
    });
  }]);
