const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('63f2e6c1082e4b7aec62dd39')
    //I can simply store that user in my request and keep in mind
    //this is a full mongoose model so we can call all these mongoose model functions 
    //or methods on that user object and therefore also on the user object which I do store here
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
    .connect('mongodb+srv://kietng:yukino103@cluster0.ycresv7.mongodb.net/shop?retryWrites=true&w=majority')
    .then((result) => {
        User.findOne().then(user => {
            if(!user) {
                const user = new User({
                    name: 'Kiet',
                    email: 'abc@gmail.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
