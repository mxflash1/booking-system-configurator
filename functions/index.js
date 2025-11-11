/**
 * Firebase Cloud Functions for Booking System Configurator
 * 
 * This function sends you an email notification whenever a new client order is submitted
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure your email settings here
// OPTION 1: Gmail (easiest for testing)
// You need to create an "App Password" in your Google Account settings
const EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: 'mexicutsbookings@gmail.com', // Your Gmail address
    pass: 'etapkcxrkkmexotg' // Get this from Google Account > Security > App Passwords
  }
};

// OPTION 2: SendGrid (better for production)
// const EMAIL_CONFIG = {
//   host: 'smtp.sendgrid.net',
//   port: 587,
//   auth: {
//     user: 'apikey',
//     pass: 'YOUR_SENDGRID_API_KEY'
//   }
// };

// Your email address to receive notifications
const YOUR_EMAIL = 'matias.oliverac@outlook.com';

const transporter = nodemailer.createTransport(EMAIL_CONFIG);

/**
 * Triggers when a new client submission is created in Firestore
 */
exports.sendNewOrderNotification = functions.firestore
  .document('client_submissions/{submissionId}')
  .onCreate(async (snap, context) => {
    const orderData = snap.data();
    const submissionId = context.params.submissionId;
    
    console.log('🆕 New order received:', orderData.businessName);
    
    try {
      // Prepare email content
      const emailSubject = `🎉 New Order: ${orderData.businessName}`;
      
      const emailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 10px;
              text-align: center;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .section {
              background: #f7f7f7;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .section h2 {
              color: #667eea;
              margin-top: 0;
              font-size: 20px;
              border-bottom: 2px solid #667eea;
              padding-bottom: 10px;
            }
            .detail {
              margin-bottom: 15px;
            }
            .label {
              font-weight: bold;
              color: #555;
            }
            .value {
              color: #333;
              margin-left: 10px;
            }
            .color-box {
              display: inline-block;
              width: 30px;
              height: 30px;
              border-radius: 5px;
              vertical-align: middle;
              border: 2px solid #ddd;
              margin-left: 10px;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              color: #888;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎉 New Booking Website Order!</h1>
          </div>
          
          <div class="section">
            <h2>👤 Client Information</h2>
            <div class="detail">
              <span class="label">Name:</span>
              <span class="value">${orderData.clientName}</span>
            </div>
            <div class="detail">
              <span class="label">Email:</span>
              <span class="value">${orderData.clientEmail}</span>
            </div>
            <div class="detail">
              <span class="label">Phone:</span>
              <span class="value">${orderData.clientPhone}</span>
            </div>
          </div>
          
          <div class="section">
            <h2>🏢 Business Details</h2>
            <div class="detail">
              <span class="label">Business Name:</span>
              <span class="value">${orderData.businessName}</span>
            </div>
            <div class="detail">
              <span class="label">Location:</span>
              <span class="value">${orderData.businessLocation}</span>
            </div>
            <div class="detail">
              <span class="label">Business Phone:</span>
              <span class="value">${orderData.businessPhone || 'Not provided'}</span>
            </div>
          </div>
          
          <div class="section">
            <h2>🎨 Branding</h2>
            <div class="detail">
              <span class="label">Primary Color:</span>
              <span class="value">${orderData.primaryColor}</span>
              <span class="color-box" style="background: ${orderData.primaryColor}"></span>
            </div>
            <div class="detail">
              <span class="label">Accent Color:</span>
              <span class="value">${orderData.secondaryColor}</span>
              <span class="color-box" style="background: ${orderData.secondaryColor}"></span>
            </div>
            <div class="detail">
              <span class="label">Font Style:</span>
              <span class="value">${orderData.fontStyle}</span>
            </div>
          </div>
          
          <div class="section">
            <h2>✂️ Services</h2>
            <pre style="background: white; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${orderData.services}</pre>
          </div>
          
          ${orderData.specialRequests ? `
            <div class="section">
              <h2>💬 Special Requests</h2>
              <p>${orderData.specialRequests}</p>
            </div>
          ` : ''}
          
          <div style="text-align: center;">
            <a href="https://console.firebase.google.com/project/${admin.instanceId().app.options.projectId}/firestore/data/~2Fclient_submissions~2F${submissionId}" class="cta-button">
              View in Dashboard
            </a>
          </div>
          
          <div class="footer">
            <p><strong>⚡ Action Required:</strong> Contact the client within 24 hours to discuss their project!</p>
            <p style="font-size: 12px; color: #aaa;">Submission ID: ${submissionId}</p>
          </div>
        </body>
        </html>
      `;
      
      const emailText = `
        NEW BOOKING WEBSITE ORDER
        
        CLIENT INFORMATION:
        Name: ${orderData.clientName}
        Email: ${orderData.clientEmail}
        Phone: ${orderData.clientPhone}
        
        BUSINESS DETAILS:
        Business Name: ${orderData.businessName}
        Location: ${orderData.businessLocation}
        Business Phone: ${orderData.businessPhone || 'Not provided'}
        
        BRANDING:
        Primary Color: ${orderData.primaryColor}
        Accent Color: ${orderData.secondaryColor}
        Font Style: ${orderData.fontStyle}
        
        SERVICES:
        ${orderData.services}
        
        ${orderData.specialRequests ? `SPECIAL REQUESTS:\n${orderData.specialRequests}` : ''}
        
        ---
        Contact the client within 24 hours!
        Submission ID: ${submissionId}
      `;
      
      // Send email
      const mailOptions = {
        from: EMAIL_CONFIG.auth.user,
        to: YOUR_EMAIL,
        subject: emailSubject,
        text: emailText,
        html: emailHTML
      };
      
      await transporter.sendMail(mailOptions);
      
      console.log('✅ Email notification sent successfully');
      return null;
      
    } catch (error) {
      console.error('❌ Error sending email:', error);
      // Don't throw error - we don't want the function to fail if email fails
      return null;
    }
  });

/**
 * Send confirmation email to client
 */
exports.sendClientConfirmation = functions.firestore
  .document('client_submissions/{submissionId}')
  .onCreate(async (snap, context) => {
    const orderData = snap.data();
    
    try {
      const emailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 10px;
              text-align: center;
              margin-bottom: 30px;
            }
            .content {
              padding: 20px;
            }
            .footer {
              text-align: center;
              color: #888;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>✅ Order Received!</h1>
          </div>
          
          <div class="content">
            <p>Hi ${orderData.clientName},</p>
            
            <p>Thank you for your order! We've received your request for a custom booking website for <strong>${orderData.businessName}</strong>.</p>
            
            <h3>What happens next:</h3>
            <ol>
              <li>We'll review your requirements within 24 hours</li>
              <li>We'll contact you at <strong>${orderData.clientEmail}</strong> to discuss details</li>
              <li>Your custom website will be built within 1 week</li>
              <li>You'll get a FREE 1-month trial to test everything</li>
            </ol>
            
            <p><strong>Important:</strong> Keep an eye on your email (and spam folder) for our follow-up message!</p>
            
            <p>If you have any urgent questions, feel free to reply to this email.</p>
            
            <p>Best regards,<br>
            Matias Olivera Cervantes</p>
          </div>
          
          <div class="footer">
            <p style="font-size: 12px; color: #aaa;">This is an automated confirmation. We'll be in touch soon!</p>
          </div>
        </body>
        </html>
      `;
      
      const mailOptions = {
        from: EMAIL_CONFIG.auth.user,
        to: orderData.clientEmail,
        subject: `✅ Order Confirmed: ${orderData.businessName} Booking Website`,
        html: emailHTML
      };
      
      await transporter.sendMail(mailOptions);
      
      console.log('✅ Client confirmation email sent');
      return null;
      
    } catch (error) {
      console.error('❌ Error sending client confirmation:', error);
      return null;
    }
  });


