/*const express = require('express');
const router = express.Router();*/
const userService = require('./user.service');
const authorize = require('../_helpers/authorize');
const Role = require('../_helpers/role');


module.exports = {
    authenticate: (req, res, next) => {
        console.log(req.body);
        userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect'}))
        .catch(err => next(err));
    },

    getAll: (req, res, next) => {
        userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
    },

    getById: (req, res, next) => {
        const currentUser = req.auth;
        const id = parseInt(req.params.id);

        if(id !== currentUser.sub && currentUser.role !== Role.Admin){
            if(currentUser.sub)
                return res.redirect(`/users/${currentUser.sub}`);
            return res.status(401).json({ message: 'Unauthorized' });
        }

        userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
    }
}
/*let authenticate = (req, res, next) => {
    console.log(req.body);
    userService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect'}))
    .catch(err => next(err));
};

let getAll = (req, res, next) => {
    userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

let getById = (req, res, next) => {
    const currentUser = req.auth;
    //console.log(currentUser);
    const id = parseInt(req.params.id);

    if(id !== currentUser.sub && currentUser.role !== Role.Admin){
        if(currentUser.sub)
            return res.redirect(`/users/${currentUser.sub}`);
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
};*/

/*//routes
router.post('/authenticate', authenticate);
router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);

module.exports = router;*/