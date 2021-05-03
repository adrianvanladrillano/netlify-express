const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http').createServer();
// const uuid = require('uuid').v4;

const multer = require('multer');
const app = express();
app.use(bodyParser.json({
    extended: true,
    limit: '50mb'
}));
app.use(cors())

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.





const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, `${uuid()}-${originalname}`);
    },
});

const upload = multer({ storage });

// NOTEZ
// Add promise on users

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
const asc = ""
app.get('/', (req, res) => {
    res.json({ greetings_from_ivan: 'henlo werld :)' });
});

// simple route
app.post('/upload', upload.single('something'), (req, res) => {
    res.json({ status: asc });
});

require('./routes/user.route.js')(app);
require('./routes/customer.route.js')(app);
require('./routes/schedule.route.js')(app);
// // require('./routes/developer.route.js')(app);
// require('./routes/project.route.js')(app);
// require('./routes/inquiry.route.js')(app);


app.use(express.static('uploads'));


// set port, listen for requests

app.listen(3001, () => {
    console.log('Server is running on port 3001.');
});
