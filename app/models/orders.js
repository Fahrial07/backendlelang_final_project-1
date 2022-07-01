'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // have a relation many to one with users as buyer

      Orders.belongsTo(models.Users, {
        foreignKey: 'buyer_id',
        as: 'users_buyer'
      });
      // have a relation many to one with users as seller

      Orders.belongsTo(models.Users, {
        foreignKey: 'seller_id',
        as: 'users_seller'
      });
      // have a relation many to one with products

      Orders.belongsTo(models.Products, {
        foreignKey: 'product_id',
        as: 'products'
      });
      // have a relation one to many with notifications

      Orders.hasMany(models.Notifications, {
        foreignKey: 'order_id',
        as: 'notifications_order'
      });
    }
  }
  Orders.init({
    product_id: DataTypes.INTEGER,
    buyer_id: DataTypes.INTEGER,
    bid_price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    seller_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Orders',
    timestamps: true,
    paranoid: true
  });
  return Orders;
};