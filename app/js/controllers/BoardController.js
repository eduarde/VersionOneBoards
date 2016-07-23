'use strict'

app.controller('BoardController',
	function BoardController($scope, $timeout, boardService, $firebaseAuth, $firebaseArray, $location) {

        /* Initialization */
		$scope.current = 0;
        $scope.boards = [];
        $scope.shuffling = false;

        var timer;

        boardService.getBoards()
            .then( function(data) {
				
				$scope.boards = $firebaseArray(data.ref);
				
				$scope.boards.$loaded().then(function () {
                    $scope.detailFrame = $scope.boards[0].link;
                    $scope.detailLabel = $scope.boards[0].label;
                         
                });  
            })
            .catch( function(response) { 
                console.log(response); 
			});

     
	    $scope.itemDetail = function(label,link){
            $scope.shuffling = false;
            $timeout.cancel( timer );
	    	$scope.detailLabel = label
	        $scope.detailFrame = link;
	    };

    	$scope.isActiveTab = function(tabLabel) {
        	return tabLabel === $scope.detailLabel;
    	}

        $scope.isShuffling = function() {
            if($scope.shuffling)
                return 'btn btn-danger';

            return 'btn btn-success';
        }

    	$scope.shuffle = function() {

            $scope.shuffling = true;
            $scope.current = ( $scope.current % $scope.boards.length);
          
    		$scope.detailLabel = $scope.boards[$scope.current].label;
        	$scope.detailFrame = $scope.boards[$scope.current].link;
        	$scope.current = $scope.current + 1;

    		timer = $timeout($scope.shuffle, 10000);
    	};

});