import transport from "../MiddleWares/NodeMailer.js";

async function sendSignUpConfirmationMail(user){

    try{
      transport().then((transportX) => {
        const mailOptions = {
            from : process.env.google_email,
            to : user.email,
            subject : "Welcome to the Lost & Found",
            text : `Welcome to the Community ${user.name}`,
            html : `<span> <a href="http://localhost:3000/user/verifyAccount?email=${user.email}" >verify </a> the email to finish signing up to Lost & Found</span>`
            
        };
        transportX.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log("Contollers/Mailer/Mailer 1 => Error in sending mail", err);        //   1
            }
            else{
                console.log("Mail Sent", info);
            }
        });
      }).catch(err=>{
            console.log("Mailer/Mailer.js => error in transport",err);
      });
    }
    catch(err){
        console.log("Mailer/Mailer 2 => error in getting access token for oAuth2Client",err);   //    2
    }

}

async function sendPasswordResetMail(user){
    try{
        transport().then((transportX) => {
            const mailOptions = {
                from : `Lost & Found || ${process.env.google_email}`,
                to : user.email,
                subject : "Password Reset",
                text : `Hi User,
                Click on the link below to reset your password. 
                If you did not request a password reset, ignore this email.`,
                html : `<a href="http://localhost:3000/User/ResetPassword?email=${user.email}"> Reset Password </a> `
            };
            transportX.sendMail(mailOptions, (err, info) => {
                if(err){
                    console.log("Contollers/Mailer/Mailer 3 => Error in sending mail", err);        //   3
                }
                else{
                    console.log("Controllers/Mailer/Mailer.js 4=> Mail Sent", info);          //      4
                }
            });
        }).catch(err=>{
                console.log("Mailer/Mailer.js => error in transport",err);
        });
    }
    catch(err){
        console.log("Mailer/Mailer 3 => error in getting access token for oAuth2Client",err);   //    3
    }
}


  async function sendOrderConfirmationMail({order,user}){
   console.log("Mailer/Mailer.js => sendOrderConfirmationMail => order",order,"user",user)
    try{
        var secureCode = Math.floor(Math.random() * 9999 + 1000);
      transport().then((transportX) => {
        const mailOptions = {
            from : process.env.google_email,
            to : user.email,
            subject : "Order Confirmation",
            text : `Hi ${user.name},
            Your Order has been submitted Successfully. 
            .`,
            html: `
            <div style={{
                width: '100%',
                min-width: '280px',
                max-width: '500px',
                margin: '0 auto',
                boxSizing: 'border-box',
                fontFamily: 'sans-serif',
                padding: '10px',
                box-shadow: '0 0 10px rgba(0,0,0,0.1)',
                display:flex,
                flex-flow:column wrap,
                justify-content:center,
                align-items:center,
            }}>
            
            <span> Your ${order.orderType} order has been placed successfully</span>
            <span style={{"display:block",
            color:'green',
        }}
            >Your Order ID is ${secureCode}, do not share the order it</span>
            </div>
            `
        };
        transportX.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log("Contollers/Mailer/Mailer 5 => Error in sending mail", err);        //   5
            }
            else{
                console.log("Mail Sent", info);
            }
        });
      }).catch(err=>{
            console.log("Mailer/Mailer.js => error in transport",err);
      });
    }
    catch(err){
        console.log("Mailer/Mailer 6 => error in getting access token for oAuth2Client",err);   //    6
    }
  }


  


export {
    sendSignUpConfirmationMail,
    sendPasswordResetMail,
    sendOrderConfirmationMail,
}