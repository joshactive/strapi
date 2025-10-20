const crypto = require('crypto');

module.exports = ({ env }) => {
    const existing = env('JWT_SECRET');

    if (existing) {
        return { jwtSecret: existing };
    }

    if (!process.env.JWT_SECRET) {
        process.env.JWT_SECRET = crypto.randomBytes(32).toString('hex');

        if (process.env.NODE_ENV !== 'test') {
            console.warn(
                '⚠️  Missing JWT_SECRET. Generated an ephemeral secret; set JWT_SECRET to keep user tokens valid across restarts.'
            );
        }
    }

    return { jwtSecret: process.env.JWT_SECRET };
};
