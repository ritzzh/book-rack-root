const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: { type:String},
    username:{ type:String, required:true, unique:true},
    password:{ type:String, required:true},
    email:{ type:String},
    institute: { type:String}
})

userSchema.pre('save', async function(next){
    if(this.isModified('password') || this.isNew){
        this.password = await bcrypt.hash(this.password,10)
    }
    next();
})

const User = mongoose.model('User',userSchema);

module.exports = User;

