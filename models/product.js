const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    //we can pass an object instead of just the type here as a value and then set a type property 
    title: {
        //here we could say well the type of this is a string as before but it's also required 
        type: String,
        //we force all objects to have a title but in the end in our application, every product needs to have a title
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});  

module.exports = mongoose.model('Product', productSchema);

// //allowing us  to get access to the database connection
// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// //create the class because i will create my own models
// class Product {
//     constructor(title, price, description, imageUrl, id, userId) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         //we can check if Id exists basically
//         //so if this return true in an if statement and if it's the case, then i want to create my object id object
//         //otherwise I'll store null and null will be treated as false down there
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userId = userId;
//     }

//     //save it to database
//     save() {
//         //database connection
//         const db = getDb();
//         let dbOp;
//         if (this._id) {
//             //Update the product
//             dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this });
//         } else {
//             dbOp = db.collection('products').insertOne(this);
//         }
//         //telling mongodb which collection i want to work
//         return dbOp
//             .then((result) => {
//                 console.log(result);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }

//     //get my products
//     //I want to interact with my mongodb database to fetch all products
//     static fetchAll() {
//         const db = getDb();
//         return db
//             .collection('products')
//             .find()
//             .toArray()
//             .then((products) => {
//                 console.log(products);
//                 return products;
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }

//     static findById(prodId) {
//         const db = getDb();
//         return db
//             .collection('products')
//             .find({ _id: new mongodb.ObjectId(prodId) })
//             .next()
//             .then((product) => {
//                 console.log(product);
//                 return product;
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }

//     static deleteById(prodId) {
//         const db = getDb();
//         return db
//             .collection('products')
//             .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//             .then(result => {
//                 console.log(`Deleted`);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }
// }

// module.exports = Product;
