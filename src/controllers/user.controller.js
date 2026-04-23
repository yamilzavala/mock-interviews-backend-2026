let users = [
  { id: 1, name: 'Juan' },
  { id: 2, name: 'Ana' },
];

// GET all users
const getUsers = ((req, res) => {
    res.json(users)
})

module.exports = {
    getUsers
}