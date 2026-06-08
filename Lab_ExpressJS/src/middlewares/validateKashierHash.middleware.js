const APIError = require("../utils/APIError");
const crypto = require('crypto');
const queryString = require('query-string');
const _ = require('underscore');

const validateKashierHash = (req, res, next)=>{
    let body = req.body;

    if (!body) {
        throw new APIError("Webhook body is required", 400);
    }

    if (typeof body === "string" || Buffer.isBuffer(body)) {
        try {
            body = JSON.parse(body.toString());
        } catch (error) {
            throw new APIError("Invalid webhook payload", 400);
        }
    }

    const { data } = body;

    if (!data || !Array.isArray(data.signatureKeys)) {
        throw new APIError("Invalid webhook payload", 400);
    }

    data.signatureKeys.sort();
    const objectSignaturePayload = _.pick(data, data.signatureKeys);
    const signaturePayload = queryString.stringify(objectSignaturePayload);
    const signature = crypto
        .createHmac('sha256', process.env.KASHIER_API_KEY)
        .update(signaturePayload)
        .digest('hex');
    const kashierSignature = req.header('x-kashier-signature');

    if (kashierSignature === signature) {
        console.log('valid signature');
        req.body = body;
        return next();
    }

    throw new APIError("invalid signature", 401);
}


module.exports = validateKashierHash;

