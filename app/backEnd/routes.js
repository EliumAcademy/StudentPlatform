module.exports = function (app, passport) {


	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/',
		function (req, res) {
			res.render('index.ejs');
		}
	);


	// serve main entry with react
	app.get('/app', isLoggedIn, function (req, res) {
		res.send(
			`
        <body>
            <div id="reactApp">Init</div>
            <script type="text/javascript" src="/public/bundle.js"></script>
        </body>
            `
		)
	})

	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn,
		function (req, res) {
			res.render('profile.ejs', {
				user: req.user // get the user out of session and pass to template
			});
		}
	);



	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout',
		function (req, res) {
			req.logout();
			res.redirect('/');
		}
	);


	// =====================================
	// GOOGLE ROUTES =======================
	// =====================================
	// send to google to do the authentication
	// profile gets us their basic information including their name
	// email gets their emails
	app.get('/auth/google',
		passport.authenticate('google', { scope: ['profile', 'email'] })
	);

	// the callback after google has authenticated the user
	app.get('/auth/google/callback',
		passport.authenticate('google', {
			successRedirect: '/app',
			failureRedirect: '/'
		})
	);







	// route middleware to make sure a user is logged in
	function isLoggedIn(req, res, next) {

		// if user is authenticated in the session, carry on
		if (req.isAuthenticated()) {
			return next();
		}

		// if they aren't redirect them to the home page
		res.redirect('/');

	}

};







