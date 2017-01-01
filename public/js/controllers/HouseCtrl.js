(function () {
  angular.module('HouseCtrl', [])
    .controller('HouseController', HouseController);

  function HouseController(houseService) {
    let vm = this;

    // data
    vm.houses = getHouses();
    vm.currentPage = 1;
    // functions
    vm.back = back;
    vm.getHouses = getHouses;
    vm.next = next;
    // utils

    function getHouses(dateFrom, dateTo, sort, reverse) {
      houseService.get(dateFrom, dateTo, sort).then(houses => {
        if (reverse) {
          houses.houses = houses.houses.reverse();
        }
        vm.houses = houses.houses;
        console.log(`Page ${vm.currentPage}: ` + vm.houses[0].name);
        console.log(`Page ${vm.currentPage}: ` + vm.houses[vm.houses.length - 1].name);
      });
    }

    function next() {
      vm.currentPage++;
      getHouses(vm.houses[vm.houses.length - 1].date);

    }

    function back() {
      vm.currentPage--;
      getHouses(undefined, vm.houses[0].date, 'date', true);
    }
  }
})();