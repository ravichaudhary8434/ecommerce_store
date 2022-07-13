const Cart = require("./cart");
const db = require("../util/database");

module.exports = class Products {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, price, imageUrl, description, createdAt, updatedAt) VALUES(?, ?, ?, ?, ?, ?)",
      [this.title, this.price, this.imageUrl, this.description, 0, 0]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  static deleteById(id) {}
};
