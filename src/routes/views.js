// dependencies
const express = require('express');
const router = express.Router();

//local dependencies
const users = require('../models/user');

const jobs = require('../models/jobs');

// public endpoints
router.get('/', function(req, res, next) {
  res.render("../src/views/home.ejs", {user: req.session.user});
});


router.get('/studentreg', function(req, res) {
  res.sendFile('../src/views/studentreg.ejs', {user: req.session.user});
});

router.get('/studentlogin', function(req, res) {
  res.render('../src/views/login.ejs', {user: req.session.user});
});

router.post('/studLog', function(req, res){
	if (req.body.username &&
		req.body.password){
		users.authenticate(req.body.username, req.body.password, function(error, user){
			if (error){
				let err = new Error('Wrong username or password');
				err.status = 401;
				console.log('error');

				// return next(err);
			}
			else if (!user){
				console.log('not user error');
			}
			else {
				req.session.userId = user._id;
				req.session.user = user.username;
				console.log('so happy!')
				return res.redirect('/profile');
			}
		})
	}
	else {
		let err = new Error('Username and password are required');

		err.status = 401;

		let err2 = new Error('All fields are required');

		err.status = 400;

		return next(err)


	}
})




router.post('/studReg', function(req, res){
	if (req.body.email &&
  		req.body.username &&
  		req.body.password &&
  		req.body.repeatPassword) {

		let userData = {
		    email: req.body.email,
		    username: req.body.username,
		    password: req.body.password,
		    passwordConf: req.body.repeatPassword,
		}

  //use schema.create to insert data into the db
  users.create(userData, function (err, user) {
    if (err) {
      return next(err)
    } else {
      req.session.userId = user._id; 
      req.session.user = user.username;
      return res.redirect('/profile');
    }
  });
}
  else {
  	console.log("I don't know");
  }
});

router.post('/jobPost', function(req, res){
	if (req.body.firstName &&
  		req.body.lastName &&
  		req.body.contact &&
  		req.body.jobTitle &&
  		req.body.jobDescr){

		console.log('wao');

		let jobData = {
			firstName: req.body.firstName,
		    lastName: req.body.lastName,
		    contact: req.body.contact,
		    jobTitle: req.body.jobTitle,
		    jobDescr: req.body.jobDescr
		}

		jobs.create(jobData, function(err, user){
			if (err){
				return next(err);
			}
			else {
				//still don't know what to do
				console.log('success');
				res.render('../src/views/jobs.ejs', {user: req.session.user});
			}
		})


	}
	else {
		console.log("missing");
	}

})

router.get('/getjobs', function(req, res){
	jobs.find({}).sort('-createdAt').exec(function(err, jobs){
		console.log('here');
		res.send(jobs);
		console.log(jobs)
		// res.render('../src/views/jobs.ejs');
	});
});


router.get('/profile', function(req, res, next){
	users.findById(req.session.userId).exec(function(error, user){
		if (error){
			return next(error);
		}

		else {
			console.log(user.username);
			res.render('../src/views/profile.ejs', {user:user.username});
		}
	})
});

router.get('/logout', function(req, res, next){
	if (req.session){
		req.session.destroy(function(err){
			if (err){
				return next(err);
			}
			else {
				return res.redirect('/');
			}
		});
	}
});

router.get('/jobs', function(req, res, next){
	res.render('../src/views/jobs.ejs', {user:req.session.user});
})









module.exports = router;
