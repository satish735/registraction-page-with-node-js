const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/daxfoxregistration', {
}).then(() => {
    console.log('connection successful');
}).catch((e) => {
    console.error(e)
})
