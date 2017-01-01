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
    House.find(evaluateRequest(req.query))
      .limit(52)
      .sort(req.query.sort || '-date')
      .exec()
      .then(houses => {
        let jsonToReturn = {};
        jsonToReturn.houses = houses;
        // jsonToReturn.housesByDay = getHousesByDay(req.body, houses);
        res.json(jsonToReturn);
        res.end();
      })
  },

  updateHouses: updateHouses,
  deleteHouses: function (req, res) {
    House.remove({}, function (err) {
      if (err) {
        console.log('an error hapened deleting houses: ', JSON.stringify(err));
        res.json({
          status: 'error'
        });
        res.end();
        return;
      }

      res.json({
        status: 'success'
      });
      res.end();
    });
  }

};

function evaluateRequest(query) {
  let options = {},
    date = {};
  // Optional
  if (query.hasOwnProperty('fromCompany')) {
    options.isFromCompany = query.fromCompany;
  }

  /**
   * the request should have either dateFrom or dateTo
   * if none, default is added
   */
  if (query.dateFrom) {
    date.$lte = query.dateFrom;
  } else if (query.dateTo) {
    date.$gte = query.dateTo;
  }
  if (Object.keys(date).length === 0) {
    date = {
      $lte: new Date()
    }
  }

  options.date = date;

  return options;
}

function updateHouses(req, res) {
  function addHouses(houses) {
    let nHouses = houses.list_ads.reduce((counter, house) => {
      // console.log(house.ad);
      new House({
        _id: house.ad.ad_id,
        date: new Date(house.ad.list_time.value * 1000),
        currency: house.ad.list_price ? house.ad.list_price.currency : 'MXN',
        isFromCompany: house.ad.company_ad,
        name: house.ad.subject,
        price: house.ad.list_price ? house.ad.list_price.price_value : 0
      }).save((error) => {
        // duplicate id
        if (error && error.code !== 11000) {
          console.log('an error hapened creating a house: ', JSON.stringify(error));
        }
      })

      return ++counter;
    }, 0);

    return {
      status: 'success',
      houses: nHouses
    };
  }

  if (!req.body.limit || req.body.limit < 1) {
    res.json({
      status: 'error',
      devMsg: 'limit parameter is missing in body'
    });
    res.end();
  }

  return rp({
      json: true,
      method: 'GET',
      url: apiUrl,
      qs: {
        lang: 'es',
        category: categories.forSale,
        region: regions.jalisco,
        lim: req.body.limit,
        sort: 'date'
      }
    })
    .then(addHouses, handleError)
    .then(houses => {
      res.json(houses);
      res.end();
    })
}

function getHousesByDay(reqBody, houses) {
  let dates = [],
    datesWithCounter = [];

  houses.forEach(function (house) {
    let indexOfDate = 0;

    indexOfDate = dates.indexOf(house.date.toDateString());

    if (indexOfDate === -1) {
      dates.push(house.date.toDateString());
      datesWithCounter.push({
        'date': house.date.toDateString(),
        'counter': 1
      });
    } else {
      datesWithCounter[indexOfDate].counter++;
    }

  });

  return {
    'dates': datesWithCounter,
    'totalHouses': houses.length
  }
}

function handleError(error) {
  console.log('there was an error: ' + JSON.stringify(error));
}