const config = require('../config/secret.json');
const jwt = require('jsonwebtoken');
const Role = require('../_helpers/role');

//Instead of using database
const users = [
    {id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin},
    {id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User}
];

let authenticate = async ({username, password}) => {
    const user = users.find(u => u.username === username && u.password === password);
    if(user){
        const token = jwt.sign({sub: user.id, role: user.role}, config.secret);
        const { password, ...userWithoutPassword} = user; //split password and the rest part;
        return{
            ...userWithoutPassword,
            token
        };
    }
};

let getAll = async () => {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
};

let getById = async (id) => {
    const user = users.find(u => u.id === parseInt(id));
    if(!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword
};

module.exports = {
    authenticate,
    getAll,
    getById
};