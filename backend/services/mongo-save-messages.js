var axios = require('axios');
const User = require('../services/user-model');

function mongoSaveMessages(message,username,room)
{
    const dbUrl = `mongodb+srv://ritesh:root@cluster0.tztqqkf.mongodb.net/`;
    var data = JSON.stringify({
        operation: 'insert',
        
    })
}