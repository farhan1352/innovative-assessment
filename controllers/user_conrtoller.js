const userRepo = require('../repos/user_repo');
let mUserRepo = new userRepo();

const authMw = require('../middlewares/auth');
let mAuth = new authMw();

const bcrypt = require('bcryptjs');

/**
 * This controller is being used to manage users
 */
class UserController {

    /**
     * To create user
     * @param {Object} user - user object will hold the values for creating user
     */
    async register(req, res) {
        let user = req.body;

        if(user){
            try{
                /** Hashed password to avoid secuity breach */
                let hashedPassword = bcrypt.hashSync(user.password, 8);
                user.password = hashedPassword;


                let result = await mUserRepo.create(user);
                console.log('User created: ', result);

                let tokens = await mAuth.getTokens(user.email);
                res.status(200).send({'status': 'success', access_token: tokens.access_token, refresh_token: tokens.refresh_token}); 
            }catch(e){
                console.log(e)
                res.status(206).send({'status': 'error', message: 'Failed to register, possible cause, duplicate email found!'}); 
            }
        }else{
            res.status(206).send({'status': 'error', message: 'Please provide data to register'}); 
        }
    }

    /**
     * Check username/password and proceed signin
     */
    async signIn(req, res){
        let { email, password } = req.body;

        let user = await mUserRepo.retrieveOne(email);    
        if(user){
            let isValidPassword = bcrypt.compareSync(password, user.password);
            if (!isValidPassword){
                return res.status(401).send({ status: "error", login: false, message: 'Invalid password' });
            }

            let token = await mAuth.getTokens(user.email);
            res.status(200).send({'status': 'success', login: true, access_token: token.access_token, refresh_token: token.refresh_token}); 
        }else{
            res.status(206).send({'status': 'error', login: false, message: "User doesn't exist"});
        }
    }

     /**
     * To churn out any specific user
     */
    async retrieveOne(req, res){
        let { email } = req.params;
        let user = await mUserRepo.retrieveOne(email);
        res.status(200).send({'status': 'success', data: user});
    }


     /**
     * To update specific user
     */
    async update(req, res){
        let { email } = req.params;
        let data = req.params.body;

        let usersUpdated = await mUserRepo.updateOne(email, data);
        res.status(200).send({'status': 'success', data: usersUpdated});
    }


     /**
     * To delete any specific user
     */
    async delete(req, res){
        let { email } = req.params;
        let usersDeleted = await mUserRepo.deleteOne(email);
        res.status(200).send({'status': 'success', data: usersDeleted});
    }
}

module.exports = UserController;