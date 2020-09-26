const databse = {
    ['index.html']: '<html>Hello World!</html>',
};

module.exports.get = (key, callback) => {
    console.log("Waiting 3s to fulfill request...")
    setTimeout(() => {
        callback(databse[key]);
  }, 3000);
};
