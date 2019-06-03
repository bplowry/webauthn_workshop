const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const enforce = require('express-sslify')
const app = express()

const apiRouter = require('./routes/api')

if (process.env.ENFORCE_SSL_HEROKU === 'true') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }))
} else if (process.env.ENFORCE_SSL_AZURE === 'true') {
    app.use(enforce.HTTPS({ trustAzureHeader: true }))
}

app.use(express.static(path.join(__dirname, '..', 'client', 'build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', apiRouter)

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});


app.listen(process.env.PORT || 3001, () => console.log('App launched.'))
