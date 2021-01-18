const Sequelize = require('sequelize');
const database = require('../db/postgresql');
const BlogPost = require('./blogModel');
const { DataTypes } = Sequelize

const userSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    token: {
        type: DataTypes.STRING
    }
}

const User = database.define('Users', userSchema)
// User.sync({force: true})
// User.hasMany(BlogPost, {foreignKey: '_user', sourceKey: 'id'})
// console.log(User)
// console.log(BlogPost)
// User.hasMany(BlogPost, {foreignKey: '_user', sourceKey: 'id'})
// BlogPost.belongsTo(User, {foreignKey: '_user', targetKey: 'id'})

User.fetchAll = async (req, res) => {
    try {
      const users = await User.findAll();
      return res.send({ users });
    } catch (error) {
      return res.send(error);
    }
};

User.fetchOne = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });

        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
}

User.fetchUserPosts = async (req, res) => {
    try {
        const userPosts = await User.findOne({ include: [{model:BlogPost}], where: { id: req.params.id } });
        console.log(userPosts)
        return res.send(userPosts);
    } catch (e) {
        return res.send(e);
    }
}

User.post = async (req, res) => {
    const user = User.build({
        ...req.body
    })
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
}

User.patch = async (req, res) => {
    
    try {
        const updatedUser = await User.update({ ...req.body }, {returning: true, where: {id: req.params.id}})
        return res.send(updatedUser)
    } catch (e) {
        res.status(400).send(e)
    }
}

User.delete = async (req, res) => {
    try {
        const userDelete = await User.destroy({ where: { id: req.params.id } })
        console.log(userDelete)
        res.sendStatus(200)
    } catch (e) {
        res.status()
    }
}

//logout
//login



module.exports = User