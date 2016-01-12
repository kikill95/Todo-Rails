angular.module('todoApp', ['dnd'])
    .controller('TodoCtrl', ['$scope', '$http', function($scope, $http) {
        var host = 'http://localhost:3000/';
        //initialization
        $scope.todos = [];
        $http.get('/todoshka')
            .then(function(response) {
                $scope.todos = response.data.todoshkas || [];
            });

        $scope.selectAll = function() {
            [].forEach.call($scope.todos, function(todo) {
                todo.done = true;
                $scope.editTodo(todo, false);
            });
        };

        $scope.alertInfo = function() {
            var done = (function() {
                var count = 0;
                angular.forEach($scope.todos, function(todo) {
                    count += todo.done ? 1 : 0;
                });
                return count;
            })();
            alert('Done ' + done + ' from ' + $scope.todos.length);
        };

        $scope.editTodo = function(item, isPrompt) {
            var index = $scope.todos.indexOf(item),
                newText = isPrompt ? prompt('Write new text:', item.text) : item.text;
            item.text = newText.length > 0 ? newText : item.text;
            $http.patch(host + 'todoshka', {data: item}).then(function() {
                $scope.todos[index].text = newText.length > 0 ? newText : item.text;
            });
        };

        $scope.deleteTodo = function(item) {
            var index = $scope.todos.indexOf(item);
            $http.delete(host + 'todoshka?id=' + item.id).then(function() {
                $scope.todos.splice(index, 1);
            });
        };

        $scope.addTodo = function() {
            if ($scope.todoText !== '') {
                var todo = {
                    text: $scope.todoText,
                    done: false,
                    hide: false
                };
                $http.post(host + 'todoshka', {text: todo.text}).then(function(resolve) {
                    todo.id = resolve.data.todoshka.id;
                    $scope.todos.push(todo);
                    $scope.todoText = '';
                });
            }
        };

        //filters
        $scope.showAll = function() {
            [].forEach.call($scope.todos, function(todo) {
                todo.hide = false;
            });
        };

        $scope.showDone = function() {
            [].forEach.call($scope.todos, function(todo) {
                todo.hide = !(todo.done === true);
            });
        };

        $scope.showNotDone = function() {
            [].forEach.call($scope.todos, function(todo) {
                todo.hide = todo.done === true;
            });
        };

    }])
    .directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind('keydown keypress', function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });
