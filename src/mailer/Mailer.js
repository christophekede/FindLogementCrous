
const nodemailer = require("nodemailer")

class Mailer {

        constructor({withSMTP, service, host, port,authCredentials}){
                this.transport = withSMTP ? nodemailer.createTransport({ service, auth:authCredentials}) : nodemailer.createTransport("direct", {debug:true})
            
           
        }


        sendMail(){
            this.transport.sendMail({
                from: 'christophe.kede.biloa@gmail.com',
                to: 'chris.kede@yahoo.fr',
                subject: 'Message',
                text: 'I hope this message gets delivered!'
            }, (err, info)=>{
                console.log(err)
                //console.log(info.envelope);
                //console.log(info.messageId);
            })
        }




}


module.exports = Mailer