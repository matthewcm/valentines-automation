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
// So if a few messages look a bit too similar (shakes things up a bit to not arouse suspicion)


let randomMessages = []

const getRandomMessage = () => {
    if (randomMessages.length === 0){
        randomMessages = [...messages]
    }

    console.log('Messages left: ', randomMessages.length)
    const randomIndex = Math.floor(Math.random() * randomMessages.length)

    return randomMessages.splice(randomIndex, 1)[0]
}

cron.schedule('*/5 * * * * *', () => {
        // RUNS EVERY 5 SECONDS

        // Adjust accordingly to annoy your loved one with love.

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
    const body = getRandomMessage()

    console.log(body)

    // sendMessageClient(body)

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

