const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const enforce = require('express-sslify')
const app = express()

if (process.env.ENFORCE_SSL_HEROKU === 'true') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }))
} else if (process.env.ENFORCE_SSL_AZURE === 'true') {
    app.use(enforce.HTTPS({ trustAzureHeader: true }))
}

app.use(express.static(path.join(__dirname, '..' , 'client', 'build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/health', async (_req, res) => {
    res.json({
        status: 'ok'
    })
})

app.get('/*', function (req, res) {
    const pn = path.join(__dirname, '..' , 'client', 'build', 'index.html')
    console.log({pn})
    res.sendFile(path.join(__dirname, '..' , 'client', 'build', 'index.html'));
});

app.listen(process.env.PORT || 3001, () => console.log('App launched.'))
