const validator = require("validator");

async function preCheckService(req, res, next){
    const {url} = req.body;

    if(!url) {
        return res.status(400).json({error: "url parameter is required."});
    }
    if(!validator.isURL(url)){
        return res.status(400).json({error: 'You must provide a url.'});
    }

    next();
}

module.exports = {
    preCheckService
}