import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import oAuth2Client from './GoogleAuth.js';
import dotenv from 'dotenv';


dotenv.config();

  async function transport(){
    try{
        const access_token = await oAuth2Client.getAccessToken();
        
      var transportX;
    return transportX = nodemailer.createTransport({
        service : "gmail",
        auth : {
            type : "OAuth2",
            user : process.env.google_email,
            clientId : process.env.client_id,
            clientSecret : process.env.client_secret,
            refreshToken : process.env.google_refresh_token,
            accessToken : access_token,
        },
    });

    
    }
    catch(err){
        console.log("error in getting access token for oAuth2Client",err);
    }
  }


    export default transport;