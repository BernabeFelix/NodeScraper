(function () {
  angular.module('HouseService', [])
    .factory('House', ['$http', function ($http) {

      return {
        // call to get all houses
        get: function () {
          return $http.get('/api/houses/');
        },


        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new house
        create: function (houseData) {
          return $http.post('/api/houses/', houseData);
        },

        // call to DELETE a house
        delete: function (id) {
          return $http.delete('/api/houses/' + id);
        }
      }

    }]);
})();