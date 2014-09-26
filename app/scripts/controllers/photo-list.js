'use strict';

/**
 * @ngdoc function
 * @name potatoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the potatoApp
 */
angular.module('potatoApp')
  .controller('PhotoListCtrl',  function ($scope, $http) {
	  var url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK';
		$http.jsonp(url).success(function(data) {
			var photos = []; 

      for (var i=0; i<data.items.length;i++) {
      	var item = {};
        item = data.items[i];
        item.publishedString = moment(item.published).format('Do MMM YYYY [at] hh:mm ');
        var str = item.link;
        var matched = str.match(/([^/]*\/){5}/);
        item.linkAuthor = matched ? matched[0] : str;
        item.url = item.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
        photos.push(item);
    	}	

			$scope.photos = photos;
    }).error(function(data) {
        $scope.error = true;
    });
  });
