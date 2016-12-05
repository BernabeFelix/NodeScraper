module.exports = {
  uri: 'mongodb://localuser:mongo78@ds111748.mlab.com:11748/heroku_86560d43',
  options: {
    server: {
      socketOptions: {
        keepAlive: 300000,
        connectTimeoutMS: 30000
      }
    },
    replset: {
      socketOptions: {
        keepAlive: 300000,
        connectTimeoutMS: 30000
      }
    }
  }
}