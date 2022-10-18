export const comparePasswords = async (userPassword, currentPassword) => {
    let bcrypt = require('bcrypt');
    return await bcrypt.compare(currentPassword, userPassword);
};