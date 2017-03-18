var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var moment=require('moment');

var tripSchema = new Schema({
	id: Number,
	idTrip:Number, 
	idFB: Number,
	created: {type: Date, default: Date.now},
	mediaName: {type: String},
	mediaDate: {type: Date, default: Date.now},
	title: String,
	desc: String,
	Lat: Number,
	Lon: Number
}, {collection: 'trip'});
tripSchema.virtual('dateFormatted').get(function(){
	return moment.format(this.created, 'YYYY/MM/DD');
});
module.exports = mongoose.model('Trip', tripSchema);
