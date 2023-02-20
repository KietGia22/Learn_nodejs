const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    cart: {
        items: [{productId: {type: Schema.Types.ObjectId, required: true}, quantity: {type: Number, required: true}}]
    }
});

module.exports = mongoose.model('User', userSchema);

// const mongodb = require('mongodb');
// const { get } = require('../routes/admin');
// const getDb = require('../util/database').getDb;

// //storing the reference to the objectid class in my objectid constant
// const ObjectId = mongodb.ObjectId;

// class User {
//     constructor(username, email, cart, id) {
//         this.name = username;
//         this.email = email;
//         this.cart = cart; // {items: []}
//         this._id = id;
//     }

//     save() {
//         const db = getDb();
//         return db
//             .collection('users')
//             .insertOne(this)
//             .then()
//             .catch((err) => {
//                 console.log(err);
//             });
//     }

//     getPrice(prodId) {
//         const db = getDb();
//         return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).then(product => {
//             console.log(product);
//             return product.price;
//         });
//     }

//     //add to cart will be called on a user object
//     //we'll create that object with data we fetch from the database with help of find by ID
//     addToCart(product) {
//         const db = getDb();
//         //the index of a product in that cart with the same ID as the product we're trying to add
//         const cartProductIndex = this.cart.items.findIndex(cp => {
//             return cp.productId.toString() === product._id.toString();
//           });
//         let newQuantity = 1;
//         const updatedCartItems = [...this.cart.items];
//         let total = product.price;
//         let sum = 0;
//         sum += total;

//         if (cartProductIndex >= 0) {
//             parseFloat(total);
//             parseFloat(this.cart.items[cartProductIndex].price);
//             newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//             total = this.cart.items[cartProductIndex].price + +total;
//             //update the quantity of an existing cart item
//             updatedCartItems[cartProductIndex].quantity = newQuantity;
//             updatedCartItems[cartProductIndex].price = total;
//         } else {
//             //add a new one
//             updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity, price: parseInt(total)});
//         }

//         const updatedCart = { items: updatedCartItems };
//         return db.collection('users').updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: updatedCart } });
//     }

//     getCart() {
//         const db = getDb();
//         const productIds = this.cart.items.map((i) => {
//             return i.productId;
//         });
//         //I have all the user data, all the cart data
//         //now I need to fill it with some live from the products database
//         return db
//             .collection('products')
//             .find({ _id: { $in: productIds } })
//             .toArray()
//             //I have an array of products here fresh from the database
//             // then I want to transform this which I', doing with map
//             //map takes a function that executes on every element
//             //and products which describes how to transform this element
//             .then(products => {
//                 //here I'm basically returning the new value which is an object where I still have all the old product properties
//                 return products.map(p => {
//                     return {...p, 
//                         //but I add a new quantity property and to get the right quantity for that given product
//                         //I reach out my cart items which exist on that user
//                         quantity: this.cart.items.find(i => {
//                         return i.productId.toString() === p._id.toString();
//                     }).quantity
//                   }; 
//                });
//             });
//     }

//     deleteItemFromCart(productId) {
//         const updatedCartItems = this.cart.items.filter(item => {
//             return item.productId.toString() !== productId.toString();
//         });
//         const db = getDb();
//         return db.collection('users').updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: {items: updatedCartItems} } });
//     }

//     addOrder() {
//         const db = getDb();
//         //we get the cart which is essentially an array of products
//         //we create an order with  that data
//         return this.getCart().then(products => {
//             const order = {
//                 items: products,
//                 user: {
//                     _id: new ObjectId(this._id),
//                     name: this.name
//                 }
//             };
//             //then we insert this order into our order collection
//             //we return the result of that
//             return db.collection('orders').insertOne(order)
//         })
//         //then here we know that we were successful with inserting this
//         //and we clean up our existing cart
//         .then(result => {
//             this.cart = {items: []};
//             return db.collection('users').updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: {items: []} } });
//         });
//     }

//     getOrder() {
//         const db = getDb();
//         return db.collection('orders').find({'user._id': new ObjectId(this._id)}).toArray();
//     }

//     static findById(userId) {
//         const db = getDb();
//         // return db.collection('users').find({_id: new ObjectId(userId)}).next();
//         return db
//             .collection('users')
//             .findOne({ _id: new ObjectId(userId) })
//             .then((user) => {
//                 console.log(user);
//                 return user;
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }
// }

// module.exports = User;
