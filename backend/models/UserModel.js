import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const User = db.define('users',{
    Nama: DataTypes.STRING,
    Kelas: DataTypes.STRING,
    Kapasitas: DataTypes.STRING,
    Alamat: DataTypes.STRING,
    Telepon: DataTypes.STRING  
},{
  freezeTableName:true 
});

export default User;

(async()=>{
    await db.sync();
})();