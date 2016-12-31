// const firstTenThousandHouses = require('./firstTenThousandHouses.json')
const House = require('./house_model');
const rp = require("request-promise");
const apiUrl = 'https://webapi.segundamano.mx/nga/api/v1/public/klfst';
const categories = {
  forSale: 1020
};
const regions = {
  jalisco: 16
};

// functions
module.exports = {

  createHouse: function (req, res) {
    let house = new House();
    house.name = req.body.name;

    house.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.json({
        message: 'houseCreated',
        status: 'success'
      });
    });
  },

  getHouses: function (req, res) {
    countHousesByDay(res)
      .then(function (jsonToReturn) {
        res.json(jsonToReturn);
        res.end();
      })


  },

  updateHouses: updateHouses

};

function updateHouses(req, res) {
  function addHouses(houses) {
    houses.forEach(house => {
      console.log(house.ad.ad_id);
      new House({
        _id: house.ad.ad_id,
        name: house.ad.subject,
        date: new Date(house.ad.list_time.value),
        price: house.ad.list_price.prince_value,
        currency: house.ad.list_price.currency
      }).save((error, data) => {
        if (error) {
          console.log('an error hapened creating a house: ', JSON.stringify(error));
        }
      })
    });
  }

  function filterHouses(houses) {
    let housesFilteredByCompany = houses.list_ads.filter(house => !house.ad.company_ad);

    addHouses(housesFilteredByCompany);

    return {
      status: 'success'
    };
  }

  return rp({
      json: true,
      method: 'GET',
      url: apiUrl,
      qs: {
        lang: 'es',
        category: categories.forSale,
        region: regions.jalisco,
        lim: 10
      }
    })
    .then(filterHouses, handleError)
    .then(houses => {
      res.json(houses);
      res.end();
    })
}


function countHousesByDay(res) {
  return rp({
    json: true,
    method: 'GET',
    url: 'https://gist.githubusercontent.com/BernabeFelix/f0ef9c5246a8f1e048eaac5625331537/raw/d1b2f2170bb37f084714eefef6c345f2bba33e8b/firstTenThousandHouses.json',
    qs: {
      lang: 'es',
      category: categories.forSale,
      region: regions.guadalajara,
      lim: 10000
    }
  }).then(function (firstTenThousandHouses) {
    // console.log(response);
    let dates = [],
      datesWithCounter = [];
    let totalCounter = 0;
    let adIds = [],
      listIds = [];

    // firstTenThousandHouses = JSON.parse(firstTenThousandHouses);

    firstTenThousandHouses.list_ads.forEach(function (house) {
      const ad = house.ad;
      let indexOfDate = 0;
      let date = '';

      if (!ad.company_ad) {
        totalCounter++;

        date = new Date(ad.list_time.value * 1000).toDateString();
        indexOfDate = dates.indexOf(date);


        if (indexOfDate === -1) {
          dates.push(date);
          datesWithCounter.push({
            'date': date,
            'counter': 1
          });
        } else {
          datesWithCounter[indexOfDate].counter++;
        }

      }
    });

    return {
      'dates': datesWithCounter,
      'totalDates': totalCounter
    }

  }, handleError);
}

function handleError(error) {
  console.log('there was an error: ' + JSON.stringify(error));
}