module.exports.clean = (msg) => {
    let cleaned = msg.split("undefined.")[0].trim();
    return cleaned.endsWith(".") ? cleaned : `${cleaned}.`;
};