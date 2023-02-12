const { NotFound, BadRequest } = require("http-errors");

const { User } = require("../../models/user");

const {sendEmail} = require("../../helpers");

const resendVerifyEmail = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw NotFound();
    }
    if(user.verify) {
        throw BadRequest("User alredy verify");
    };
    const mail = {
        to: email,
        subject: "Подтверждение регистрации на сайте",
        html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}" target="_blank">Нажмите для подтверждения email</a>`
    };
    await sendEmail(mail);
    res.json({
        message: "Email verify resend"
    })
};

module.exports = resendVerifyEmail;