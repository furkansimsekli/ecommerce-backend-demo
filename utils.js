const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");


function hashPassword(password) {
  const hash = crypto
  .pbkdf2Sync(password + process.env.PASSWORD_PEPPER, process.env.PASSWORD_SALT, 10000, 64, 'sha256')
  .toString('hex');
  return hash;
}

function validateUser(user) {
    // TODO: refactor
    const errors = [];

    if (!user.firstName) {
        errors.push('First name is required');
    }

        if (!user.lastName) {
    errors.push('Last name is required');
    }

    if (!user.passwordHash) {
        errors.push('Password is required');
    }

    if (!user.phone) {
        errors.push('Phone number is required');
    }

    if (!user.email) {
        errors.push('Email is required');
    }

    if (!user.country) {
        errors.push('Country is required');
    }

    if (!user.city) {
        errors.push('City is required');
    }

    if (!user.zip) {
        errors.push('Zip code is required');
    }

    if (!user.street) {
        errors.push('Street address is required');
    }

    if (!user.apartment) {
        errors.push('Apartment name is required');
    }

    if (errors.length > 0) {
    return { error: errors.join(', ') };
    }

    return {};
}

function validateReview(review) {
    // TODO: refactor
    const errors = [];

    if (!review.productId) {
        errors.push("productId is required")
    }

    if (!review.author) {
        errors.push("author is required");
    }

    if (!review.context) {
        errors.push("context is required");
    }

    if (errors.length > 0) {
        return { error: errors.join(', ') };
    }

    return {};
}

function generateId() {
    return uuidv4();
}


module.exports = {
    hashPassword,
    validateUser,
    validateReview,
    generateId
}
