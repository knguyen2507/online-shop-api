import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
// DB
import dbUser from './db/user.db.json' assert { type: "json" };
import dbRole from './db/role.db.json' assert { type: "json" };
import dbBrand from './db/brand.db.json' assert { type: "json" };
import dbCategory from './db/category.db.json' assert { type: "json" };
import dbProduct from './db/product.db.json' assert { type: "json" };
// Model 
import _User from '../api/v1/models/user.model.js';
import _Role from '../api/v1/models/role.model.js';
import _Brand from '../api/v1/models/brand.model.js';
import _Category from '../api/v1/models/category.model.js';
import _Product from '../api/v1/models/product.model.js';

dotenv.config()

// connect mongose
mongoose
.connect(process.env.MONGO_URI)
.then( _ => console.log('Connected mongoose success!...'))
.catch(err => console.error(`Error: connect:::`, err))

// all executed methods log output to console
mongoose.set('debug', true)

// disable colors in debug mode
mongoose.set('debug', { color: false })

// get mongodb-shell friendly output (ISODate)
mongoose.set('debug', { shell: true })

const db = mongoose.connection;

// insert database User
const [err1, count1] = await _User.estimatedDocumentCount().then(
    count1 => ([null, count1]),
    err1 => ([err1, null])
);
if (!err1 && count1 === 0) {
    const salt = await bcrypt.genSalt(10);
    for (let i of dbUser) {
        const hashpw = await bcrypt.hash(i.password, salt);
        i.password = hashpw;
    }

    await db.collection('Users').insertMany(dbUser, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("add Users database to collection");
        }
    });
};


// insert database Role
const [err2, count2] = await _Role.estimatedDocumentCount().then(
    count2 => ([null, count2]),
    err2 => ([err2, null])
);
if (!err2 && count2 === 0) {
    db.collection('Roles').insertMany(dbRole, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("add Roles database to collection");
        }
    });
};

// insert database Brand
const [err3, count3] = await _Brand.estimatedDocumentCount().then(
    count3 => ([null, count3]),
    err3 => ([err3, null])
);
if (!err3 && count3 === 0) {
    db.collection('Brands').insertMany(dbBrand, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("add Brands database to collection");
        }
    });
};

// insert database Category
const [err4, count4] = await _Category.estimatedDocumentCount().then(
    count4 => ([null, count4]),
    err4 => ([err4, null])
);
if (!err4 && count4 === 0) {
    db.collection('Categories').insertMany(dbCategory, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("add Categories database to collection");
        }
    });
}

// insert database Product
const [err5, count5] = await _Product.estimatedDocumentCount().then(
    count5 => ([null, count5]),
    err5 => ([err5, null])
);
if (!err5 && count5 === 0) {
    db.collection('Products').insertMany(dbProduct, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("add Products database to collection");
        }
    });
}

export { db };