(function () {
  angular.module('HouseService', [])
    .factory('houseService', ['$http', function ($http) {

      return {
        // call to get all houses
        get: function (dateFrom = new Date(), dateTo = 0) {
          return $http({
              method: 'GET',
              params: {
                dateFrom,
                dateTo
              },
              url: '/api/houses/'
            })
            .then(response => response.data, error => []);
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