app.factory('boardService', function(){

    var savedBoard = {};

    function setSavedBoard(board) {
        savedBoard = angular.copy(board);
    }

    function getSavedBoard(){
        return savedBoard;
    }
	
	return {

		getBoards: function() {
            return firebase.database().ref('boards').once('value');
        },

        save: function(board) {
        	
        	var newBoardKey = firebase.database().ref().child('boards').push().key;
        	var updates = {};
  			updates['/boards/' + newBoardKey] = board;
  			return firebase.database().ref().update(updates);
        },

        delete: function(board) {
        	return firebase.database().ref('/boards/' + board.$id).remove();
        },

        setSavedBoard: setSavedBoard,
        getSavedBoard: getSavedBoard,

        update: function(board) {

            firebase.database().ref('/boards/' + board.id).remove();
            var newBoardKey = firebase.database().ref().child('boards').push().key;
            var updates = {};
            updates['/boards/' + newBoardKey] = board;
            
            return firebase.database().ref().update(updates);
        }

	};
});