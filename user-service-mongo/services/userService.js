const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'
const dbName = 'sample_users'
// find All Users
const fetchAll = (callback)=>{
    MongoClient.connect(url, (err, client) => {
        client.db(dbName).collection('users').find({}).toArray((err,data)=>{
                callback(data)
            })
        client.close()
    })
}
// find Users by Name
const fetchByName = (uname,callback)=>{
    MongoClient.connect(url, (err, client) => {
        client.db(dbName).collection('users').find({ name: uname}).toArray((err,results)=>{
            callback(results)
        })
        client.close()
    })
}
const addUser = (user,callback)=>{
    MongoClient.connect(url,(err,client)=>{
        const collection = client.db(dbName).collection('users')
        collection.insert(user)
        callback(err)
        client.close()
    })
}
const editUser = (user,callback)=>{
    MongoClient.connect(url,(err,client)=>{
        const collection = client.db(dbName).collection('users')
        collection.updateOne({ _id : user._id }
            , { $set: user  },(err,response)=>{
                callback(err,response)
            })
            client.close()
    })
}
const getLastId = (callback)=>{
    MongoClient.connect(url,(err,client)=>{
        client.db(dbName).collection('users').find({}).sort({_id:-1}).limit(1).toArray((err,data)=>{
            if(data.length>0){
                callback(data[0]._id,err)
            }else{
                callback(0,err)
            }
        })
    })
}
const deleteUser=(user,callback)=>{
    MongoClient.connect(url,(err,client)=>{
        const collection = client.db(dbName).collection('users')
        collection.deleteOne({ _id : user },(err,data)=>{
            callback(err,{message:"employee deleted"})
        })
    })
            

}
module.exports = {
    fetchAll : fetchAll,
    fetchByName : fetchByName,
    addUser : addUser,
    editUser :editUser,
    getLastId,
    deleteUser
}