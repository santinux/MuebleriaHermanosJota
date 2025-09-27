const logger = ((req, res, next) => {
    const date = new Date();

    console.log(`Petición Recibida: [${req.method}]${req.originalUrl} - ${date}.`);
    next();
});

module.exports = logger;
