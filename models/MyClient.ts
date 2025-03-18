import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class MyClient extends Model {}

MyClient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.CHAR(250), allowNull: false },
    slug: { type: DataTypes.CHAR(100), allowNull: false },
    is_project: { type: DataTypes.STRING, defaultValue: "0" },
    self_capture: { type: DataTypes.CHAR(1), defaultValue: "1" },
    client_prefix: { type: DataTypes.CHAR(4), allowNull: false },
    client_logo: { type: DataTypes.CHAR(255), allowNull: false, defaultValue: "no-image.jpg" },
    address: { type: DataTypes.TEXT, allowNull: true },
    phone_number: { type: DataTypes.CHAR(50), allowNull: true },
    city: { type: DataTypes.CHAR(50), allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: new Date() },
    updated_at: { type: DataTypes.DATE, allowNull: true },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    modelName: "MyClient",
    tableName: "my_client",
    timestamps: false,
  }
);

export default MyClient;
