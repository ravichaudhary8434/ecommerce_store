const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    if (id) {
      this._id = new mongodb.ObjectId(id);
    }
    this.userId = userId;
  }

  save() {
    const db = getDb();
    if (this._id) {
      return db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      return db.collection("products").insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("products").find().toArray();
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(id) })
      .next();
  }

  static deleteById(id) {
    const db = getDb();

    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(id) });
  }
}

module.exports = Product;
