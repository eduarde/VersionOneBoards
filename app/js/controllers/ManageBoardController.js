'use strict'

app.controller('ManageBoardController',
	function ManageBoardController($scope, boardService, $location, $firebaseArray){

		$scope.board = {};
		$scope.boardSaved = boardService.getSavedBoard();
		$scope.boards = [];

		boardService.getBoards()
            .then( function(data) {
				
				$scope.boards = $firebaseArray(data.ref);
				
            })
            .catch( function(response) { 
                console.log(response); 
			});


		$scope.saveBoard = function(board, boardForm) {

			if(boardForm.$valid) {

				boardService.save(board)
					.then(function (response) { 
							
						alert('Board added succesfully!'); 
						$location.path('/manage');
						$scope.$apply();
					})
					.catch(function (response) { console.log('failure', response )})
			}

		};

		$scope.deleteBoard = function(board) {
		
			boardService.delete(board)
					.then(function (response) { 
						
						alert('Board deleted succesfully!'); 
						
					})
					.catch(function (response) { console.log('failure', response )})
		};

		$scope.doUpdate = function(board) {
			var board_temp = {
					id: board.key,
					label: board.label,
					link: board.link
				}

			boardService.setSavedBoard(board_temp);
			$location.path('/doUpdate');
			$scope.$apply();

		};

		$scope.updateBoard = function(board, updateForm) {

			if(updateForm.$valid) {

				boardService.update(board)
					.then(function (response) { 
							
						alert('Board updated succesfully!'); 
						$location.path('/manage');
						$scope.$apply();
					})
					.catch(function (response) { console.log('failure', response )})
			}

		};

		

		$scope.back = function() {
			 $location.path('/manage');
			 $scope.$apply();
		};

	});