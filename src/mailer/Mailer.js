
const nodemailer = require("nodemailer")

class Mailer {

        constructor({withSMTP, service, host, port,authCredentials}){
                this.transport = withSMTP ? nodemailer.createTransport({ service, auth:authCredentials}) : nodemailer.createTransport("direct", {debug:true})
            
           
        }


        sendMail(from, to, subject, text){
         
            return new Promise((resolve, reject)=>{
                this.transport.sendMail({
                    from,
                    to,
                    subject,
                    text,
                    }, (err, info)=>{
                    if(err)
                        reject(err)
                    else
                        resolve(info)
                })
            })
        }




}


module.exports = Mailer