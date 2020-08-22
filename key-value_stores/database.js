const databse = {
    ['index.html']: '<html>Hello World!</html>',
};

module.exports.get = (key, callback) => {
    setTimeout(() => {
        callback(databse[key]);
  },3000);
};