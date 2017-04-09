var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var moment=require('moment');


var mediaSchema = new Schema({
  _album: {type: Schema.ObjectId, ref: 'Album'},
  created: {type: Date, default: Date.now},
	mediaName: {type: String},
	mediaDate: {type: Date, default: Date.now},
  desc: String,
  Lat: Number,
  Lon: Number
},{collection: 'media'});

mediaSchema.virtual('dateFormatted').get(function(){
	return moment(this.created).format('YYYY/MM/DD');
});

module.exports = mongoose.model('Media', mediaSchema);
