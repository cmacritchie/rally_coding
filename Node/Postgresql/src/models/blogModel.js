const Sequelize = require('sequelize');
const database = require('../db/postgresql');
const User = require('./userModel')
const { DataTypes } = Sequelize

const blogSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.STRING
    },
    imageUrl: {
        type: DataTypes.STRING
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: User,
            key: 'id'
        }
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}

const BlogPost = database.define('BlogPost', blogSchema)
// User.hasMany(BlogPost)
// BlogPost.associations
// User.hasMany(BlogPost, {foreignKey: '_user', sourceKey: 'id'})
// BlogPost.belongsTo(User, {foreignKey: '_user', targetKey: 'id'})
// BlogPost.sync({force: true})


// BlogPost.fetchAll = async (req, res) => {
//     try {
//         console.log("fetch all", User)
//     //   const blogposts = await BlogPost.findAll({ include:  [{all: true}] });
//       const blogposts = await BlogPost.findAll({ include:  [{ model: User }] });
//       console.log('blog posts', blogposts)
//       return res.send(blogposts);
//     } catch (e) {
//         console.log("error", e)
//       return res.status(404).send()
//     }
// };

// BlogPost.fetchOne = async (req, res) => {
//     try {
//         const blogpost = await BlogPost.findOne({ where: { id: req.params.id } });
//         if(!blogpost) {
//             return res.status(404).send()
//         }
//         return res.send(blogpost);
//     } catch (error) {
//       return res.send(error);
//     }
// };

// BlogPost.fetchUserPosts = async (req, res) => {
//     try {
//         const userPosts = await User.findOne({ include: [{model:BlogPost}],  where: { id: req.params.id } });
//         console.log(userPosts)
//         return res.send(userPosts);
//     } catch (e) {
//         return res.send(e);
//     }
// }

// BlogPost.post = async (req, res) => {
//     console.log("in blogpost", req.body)
//     try {
//         const blogpost = BlogPost.build({
//             ...req.body
//         })
//         await blogpost.save()
//         console.log("saved", blogpost)
//         res.status(201).send(blogpost)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// }


// BlogPost.patch = async (req, res) => {
//     try {
//         const updatedbp = await BlogPost.update({ ...req.body }, {returning: true, where: {id: req.params.id}})
//         return res.send(updatedbp)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// }

// BlogPost.delete = async (req, res) => {
//     try {
//         await BlogPost.destroy({ where: { id: req.params.id } })
//         res.sendStatus(200)
//     } catch (e) {
//         res.status()
//     }
// }

//logout
//login 



module.exports = BlogPost