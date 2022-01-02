const checkDuplicate = (req, res, next) => {
    const { fromStaiton, toStation } = req.body;
    if (fromStaiton === toStation) {
        res.status(400).send("trạm đi và trạm đến không được giống nhau");
    }
}

module.exports = {
    checkDuplicate
}