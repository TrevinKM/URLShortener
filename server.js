const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()



mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.listen(process.env.PORT || 3000);

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls })
  })

  app.post('/shortUrl', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
  
    res.redirect('/')
  })
  app.get('/:shortUrl', async (req, res) => {
      try {
          const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })

          if(shortUrl){
            shortUrl.clicks++
            shortUrl.save()
            res.redirect(shortUrl.full)
          } else {
            return res.sendStatus(404)  
          }
      } catch (error) {
          
      }
    
  })
