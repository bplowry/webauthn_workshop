const express = require('express')
const router = express.Router()

router.get('/health', async (req, res) => {
    res.json({
        status: 'ok'
    })
})

module.exports = router