var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var AutoIncrement = require('mongoose-sequence');

var albumSchema = new Schema({
  idTrip: Number,
  _user: {type: Schema.ObjectId, ref: 'User'},
  title: {type: String, required: true},
  media: [{type: Schema.ObjectId, ref: 'Media'}]
},{collection: 'album'});

albumSchema.plugin(AutoIncrement, {id: 'idTrip_seq', inc_field: 'idTrip', reference_fields: ['_user'] });
// albumSchema.pre('save', function(next){
//   console.log('pre-save album middleware');
//   console.log(this._user._id);
//   this.model('User').update({_id:this._user}, {$push:{trip:this._id}}).exec();
//   next();
// })
albumSchema.pre('remove',function(next){
  console.log('pre-remove album middleware');
  this.model('Media').remove({_album: this._id}).exec();
  //this.model('User').update({_id:this._user._id}, {$pull:{trip:this._id}}).exec();
  next();
})

module.exports = mongoose.model('Album', albumSchema);
