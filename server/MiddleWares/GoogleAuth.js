import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

 
const clientId = process.env.client_id;
const clientSecret = process.env.client_secret;
const refreshToken = process.env.google_refresh_token;
const redirect_uri = process.env.redirect_uri;

const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirect_uri
);

oAuth2Client.setCredentials({
    refresh_token: process.env.google_refresh_token
});


export default oAuth2Client;


