const deduplicateUsers = (users) => {
    const map = new Map();

    for(const user of users) {
        map.set(user.id, user)
    }

    return Array.from(map.values())
}

module.exports = deduplicateUsers;