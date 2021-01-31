require('dotenv').config();
const cron = require('node-cron')

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneFrom = process.env.TWILIO_PHONE_FROM;
const phoneTo = process.env.PHONE_TO;

const client = require('twilio')(accountSid, authToken)

const messages = require('./messages');
let currentMessage = 0


// Implement randomiser, but has to pick all items

cron.schedule('* * * * * *', () => {
        // RUNS EVERY SECOND
        // FOR SPECIFIC TIMINGS USE
        // https://crontab.guru/
        sendMessage()
        currentMessage ++
    },
    {
        scheduled: true
    }
)

const sendMessage = () => {
    const body = messages[currentMessage % messages.length]

    console.log(body)

    sendMessageClient(body)

}

const sendMessageClient = (body) => {

    client.messages.create({
        to: phoneTo,
        from: phoneFrom,
        body
    })
        .then(message => {
            console.log(message.sid)
            currentMessage ++
        })
        .catch(err => {
            console.log(err)
        })
}

