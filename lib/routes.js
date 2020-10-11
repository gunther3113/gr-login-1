const {Client} = require('pg');
const {v4} = require('uuid');
const util = require('util');
const express = require('express');
const app = express();
const passport = require("passport");

const fs = require('fs');
const bcrypt = require('bcrypt')

//TODO
//Add forgot password functionality
//Add email confirmation functionality
//Add edit account page


app.use(express.static('public'));

const LocalStrategy = require('passport-local').Strategy;

async function query(q, params) {

    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    await client.connect()
    let res
    try {
        await client.query('BEGIN')
        try {
            res = await client.query(q, params)
            await client.query('COMMIT')
        } catch (err) {
            await client.query('ROLLBACK')
            throw err
        }
    } finally {
        client.end()
    }
    return res
}

module.exports = function (app) {

    app.get('/user', function (req, res) {
        res.render('index', {
            userData: req.user
        });

        console.log(req.user); // TODO -- not safe for production
    });

    app.post('/api/signup', async function (req, res) {

        // TODO validated and sanitize inputs
        console.log(req.body); // TODO -- not safe for production

        try {

            const pwd = await bcrypt.hash(req.body.password, 5);

            // TODO verify that user hasn't already registered

            await query('INSERT INTO public.users (id, firstName, lastName, email, password) VALUES ($1, $2, $3, $4, $5)',
                [v4(), req.body.firstName, req.body.lastName, req.body.email, pwd]);
            res.end();

        } catch (e) {

            throw(e); // TODO handle errors consistently
        }
    });

    app.post('/api/logout', function (req, res) {

        console.log(req.isAuthenticated());
        req.logout();
        console.log(req.isAuthenticated());
        res.redirect('/');
    });

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/list',
        failureRedirect: '/login'
    }), function (req, res) {
        if (req.body.remember) {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
        } else {
            req.session.cookie.expires = false; // Cookie expires at end of session
        }
        res.redirect('/');
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}

passport.use('local', new LocalStrategy({passReqToCallback: true}, (req, username, password, done) => {

        // TODO validated and sanitize inputs
        async function loginAttempt() {

            try {
                const result =
                    await query('SELECT id, firstName, lastName, email, password FROM public.users WHERE email=$1',
                        req.body.email);

                if (result.rows[0] == null) {
                    return done(null, false);
                } else {
                    bcrypt.compare(password, result.rows[0].password, function (err, check) {
                        if (err) {
                            console.log('Error while checking password');
                            return done();
                        } else if (check) {
                            return done(null, [{
                                email: result.rows[0].email,
                                firstName: result.rows[0].firstName,
                                lastName: result.rows[0].lastName
                            }]);
                        } else {

                            return done(null, false);
                        }
                    });
                }
            } catch
                (e) {
                throw (e);
            }
        }

        loginAttempt();
    }
));


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

