const express = require('express');
const session = require('express-session');
const cors = require('cors');
const fileupload = require('express-fileupload');
const roomRouter = require('./serverRouters/roomRouter');
const adminRouter = require('./serverRouters/adminRouter');


const port = process.env.PORT || 8000
const app = express()


app.use(express.static(__dirname + '/client'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(session({
    name:"sid",
    resave: false,
    saveUninitialized: false,
    secret: "hmca/sd",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "lax"
    }
}))

app.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 }
}))


app.use(adminRouter);
app.use(roomRouter);


app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});