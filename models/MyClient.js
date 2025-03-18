"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class MyClient extends sequelize_1.Model {
}
MyClient.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: sequelize_1.DataTypes.CHAR(250), allowNull: false },
    slug: { type: sequelize_1.DataTypes.CHAR(100), allowNull: false },
    is_project: { type: sequelize_1.DataTypes.STRING, defaultValue: "0" },
    self_capture: { type: sequelize_1.DataTypes.CHAR(1), defaultValue: "1" },
    client_prefix: { type: sequelize_1.DataTypes.CHAR(4), allowNull: false },
    client_logo: { type: sequelize_1.DataTypes.CHAR(255), allowNull: false, defaultValue: "no-image.jpg" },
    address: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    phone_number: { type: sequelize_1.DataTypes.CHAR(50), allowNull: true },
    city: { type: sequelize_1.DataTypes.CHAR(50), allowNull: true },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: new Date() },
    updated_at: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    deleted_at: { type: sequelize_1.DataTypes.DATE, allowNull: true },
}, {
    sequelize: database_1.default,
    modelName: "MyClient",
    tableName: "my_client",
    timestamps: false,
});
exports.default = MyClient;
