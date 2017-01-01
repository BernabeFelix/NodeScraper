(function () {
  angular.module('HouseCtrl', [])
    .controller('HouseController', HouseController);

  function HouseController(houseService) {
    let vm = this;

    vm.dateFrom = new Date();
    vm.dateTo = 0;
    vm.getHouses = getHouses;
    vm.houses = getHouses();
    vm.next = next;
    vm.back = back;

    function getHouses() {
      console.log('getHouses called');
      houseService.get(vm.dateFrom, vm.dateTo).then(houses => {
        vm.houses = houses.houses;
      });
    }

    function next() {
      vm.dateFrom = vm.houses[vm.houses.length - 1].date;
      getHouses();
    }

    function back() {
      vm.dateTo = vm.houses[0].date;
      getHouses();
    }
  }
})();