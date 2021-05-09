module.exports = { handleError, notFound };

function handleError(err, req, res, next) {
    console.error({ err });
    if (res.headersSent) return next(err);

    const statusCode = err.statusCode ?? 500;
    const errorMessage = err.message ?? '';

    res.status(statusCode).json({ error: errorMessage });
}

function notFound(req, res) {
    res.status(404).json({ error: 'Not Found' });
}
