require("dotenv").config();


let getHomePage = (req, res) =>{
    return res.send("Hello Word")
};

let getWebhook = (req , res) =>{
    //Parse the query parmas
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
    console.log(VERIFY_TOKEN);
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    //checks the mode and token sent is corrcet
    if(mode && token){
        
        if (mode === 'subscribe' && token === VERIFY_TOKEN){
            //Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        }
        else{
        //Responds with the challenge token from the request
        res.sendStatus(403);
        }

    }
};

let postWebhook = (req , res) =>{
    let body = req.body;

    //checks this is an event form a page subcription
    if (body.object == ' page'){
        //Iterates over each entry - there may be mulptiole if bached
        body.entry.forEach(function (entry){

        //Gets the message. entry .messaging is an array, but
        //will only ever contain one message, so we get index 0
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
        });

        //Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
        
    }
    else{
        //Retunrs a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
};

module.exports = {
    getHomePage: getHomePage,
    getWebhook: getWebhook,
    postWebhook: postWebhook // key: value
};