const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
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

const userOptions = {
    hooks: {
        beforeCreate: (user) => {
            // console.log("this is the new user", user)
            user.password = bcrypt.hashSync(user.password, 8);
        }
    },
    // instanceMethods: {
    //     validPassword: function(password) {
    //         return bcrypt.compareSync(password, this.password)
    //     }
    // }
}

const User = database.define('Users', userSchema, userOptions)
// User.sync({force: true})
// User.hasMany(BlogPost, {foreignKey: '_user', sourceKey: 'id'})
// console.log(User)
// console.log(BlogPost)
// User.hasMany(BlogPost, {foreignKey: '_user', sourceKey: 'id'})
// BlogPost.belongsTo(User, {foreignKey: '_user', targetKey: 'id'})

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

User.prototype.toJSON = function() {
    const user = this.dataValues
    delete user.password
    delete user.token
    return user
}

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

User.login = async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({ where: { name }})
    if(!user) {
        return res.status(404).send()
    }
    else if(!user.validPassword(password)) {
        return res.status(404).send()
    }
    else {
        req.session.user = user.dataValues
        return res.status(200).send(user.toJSON())
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
        console.log(user.dataValues)
        req.session.user = user.dataValues.name
        console.log('session', req.session)
        // console.log('session', req.session)
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





module.exports = User