const database = {
    ['index.html']: '<html>Hello Worls</html>',
};

module.exports.get = (key, callback) => {
    setTimeout(() =>{
        callback(database[key]);
    },1000);
};