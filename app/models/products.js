'use strict';
const {Users, Images, Categories, Products} = require('../models');
const {Op} = require('sequelize');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      // have a relation many to one with users
      Products.belongsTo(models.users, {
        foreignKey: 'user_id',
        as: 'users'
      });
      // have a relation one to many with images
      Products.hasMany(models.images, {
        foreignKey: 'product_id',
        as: 'images'
      });
      // have a relation one to many with orders as buyer
      Products.hasMany(models.orders, {
        foreignKey: 'product_id',
        as: 'orders'
      });
      // have a relation one to many with orders as seller
      Products.hasMany(models.orders, {
        foreignKey: 'seller_id',
        as: 'orders'
      });
      // have a relation many to one with categories
      Products.belongsTo(models.categories, {
        foreignKey: 'categories_id',
        as: 'categories'
      });

    }
  }
  Products.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    base_price: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    published: DataTypes.BOOLEAN,
    categories_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Products',
    timestamps: true,
    paranoid: true
  });
  return Products;
};