var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var moment=require('moment');

var userSchema = new Schema({
  idFB: {type: Number, unique: true},
  dataFB: String,
  //trips: [{type: Schema.ObjectId, ref: 'Album'}]
}, {collection: 'user'});


userSchema.pre('remove',function(next){
  console.log('pre-remove user middleware');
  this.model('Album').remove({_user: this._id}).exec();
  next();
})
module.exports = mongoose.model('User', userSchema);
