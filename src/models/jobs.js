let mongoose = require('mongoose');

let timeStamps = require('mongoose-timestamp');

let jobSchema = new mongoose.Schema({
	firstName: {
		type: String,
		unique: false,
		required: true,
		trim: true
	},

	lastName: {
		type: String,
		unique: false,
		required: true,
		trim: true
	},

  contact:{
    type:String,
    required:true
  },

	jobTitle: {
		type: String,
		required: true
	},

	jobDescr: {
		type: String,
		required: true,
	}
});

jobSchema.plugin(timeStamps);


let job = mongoose.model('job', jobSchema);

module.exports = job;