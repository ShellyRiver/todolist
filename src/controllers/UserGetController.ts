const User = require('../models/User');

class UserGetController {
    defaultMethod() {
        return {
            text: `You've reached the ${this.constructor.name} default method`
        };
    }

    async getUser(req:any, res: any){
        try{
            const user = await User.find(req.query.where == null ? {} : JSON.parse(req.query.where))
                .limit(parseInt(req.query.limit))
                .select(req.query.select == null ? {} : JSON.parse(req.query.select))
                .sort(req.query.sort == null ? {} : JSON.parse(req.query.sort))
                .skip(req.query.skip == null ? 0 : parseInt(req.query.skip));
            if (user.length === 0) {
                return res.status(404).json({
                    message: "User not found!",
                    data: null
                })
            }
            else {
                res.status(200);
                res.json({
                    message: "OK",
                    data: user
                })
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Sorry, we meet some sever error for getting you the data.",
                data: null
            })
        }
    }
}

export = new UserGetController();