export const comparePasswords = async (userPassword, currentPassword) => {
    let bcrypt = require('bcrypt');
    return await bcrypt.compare(currentPassword, userPassword);
};

export const encryptPasswords = async (userPassword, rand) => {
    let bcrypt = require('bcrypt');
    // generate salt to hash password
    let salt = await bcrypt.genSalt(rand);
    // now we set user password to hashed password
    userPassword = await bcrypt.hash(userPassword, salt);
    return userPassword
};