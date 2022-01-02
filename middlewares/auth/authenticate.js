const jwt = require('jsonwebtoken');
const authenticate = async (req, res, next) => {
    if(!(typeof req.header('Authorization') ==="undefined"))
    {
        const token = await req.header('Authorization').replace('Bearer ', '')
        try {
            const decode = jwt.verify(token, "Dai-Phong-1807");
        
            if (decode) {
                req.user = decode;               
                next();
            } else {
                res.status(401).send({
                    isSuccess : false,
                    message : "Bạn chưa đăng nhập nè"
                });
            }
        } catch (error) {
            console.log(error);
            res.status(401).send({
                isSuccess : false,
                message : "Bạn chưa đăng nhập nè"
            });
        }
        
    }
    else{
        res.status(401).send({
            isSuccess : false,
            message : "Bạn chưa đăng nhập nhà"
        });
    }
    

}
module.exports = {
    authenticate
}