#!/usr/bin/env node

/**
 * Deploy Client Website to Firebase
 * Guides through deployment process
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function deployClient() {
  console.log('\n');
  log('🚀 Deploy Client Website', 'bold');
  console.log('\n');

  const orderId = process.argv[2];
  
  if (!orderId) {
    log('Usage: npm run deploy <order-id>', 'yellow');
    log('Example: npm run deploy joes-barbershop', 'yellow');
    process.exit(1);
  }

  const projectDir = path.join(__dirname, '../output', orderId);
  
  if (!fs.existsSync(projectDir)) {
    log(`❌ Project not found: ${orderId}`, 'red');
    log('   Run npm run new-client <order-id> first', 'yellow');
    process.exit(1);
  }

  log(`📁 Project: ${orderId}`, 'blue');
  console.log('\n');

  // Check if client-config exists
  const configPath = path.join(projectDir, 'client-config.json');
  if (!fs.existsSync(configPath)) {
    log('❌ client-config.json not found', 'red');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  // Pre-deployment checklist
  log('✅ Pre-Deployment Checklist', 'blue');
  console.log('\n');

  log('Before deploying, ensure:', 'yellow');
  log('  [ ] client-config.json is fully updated', 'reset');
  log('  [ ] All branding is applied', 'reset');
  log('  [ ] Firebase config is correct', 'reset');
  log('  [ ] Website tested locally', 'reset');
  log('  [ ] Admin panel works', 'reset');
  log('  [ ] Mobile view checked', 'reset');
  console.log('\n');

  log('📋 Client Details:', 'blue');
  log(`   Business: ${config.businessName}`, 'reset');
  log(`   Firebase Project: ${config.firebase.projectId || 'NOT SET'}`, 'reset');
  console.log('\n');

  if (!config.firebase.projectId) {
    log('⚠️  Firebase project ID not set in config!', 'yellow');
    log('   Update client-config.json with Firebase credentials first', 'yellow');
    console.log('\n');
  }

  log('🔥 Deployment Steps:', 'blue');
  console.log('\n');

  log('1. Navigate to project folder:', 'yellow');
  log(`   cd ${projectDir}`, 'reset');
  console.log('\n');

  log('2. Initialize Firebase (if first time):', 'yellow');
  log('   firebase init', 'reset');
  log('   - Select: Firestore, Hosting, Functions', 'reset');
  log('   - Choose existing project', 'reset');
  log('   - Public directory: . (current directory)', 'reset');
  log('   - Single-page app: No', 'reset');
  console.log('\n');

  log('3. Deploy to Firebase:', 'yellow');
  log('   firebase deploy', 'reset');
  console.log('\n');

  log('4. Test the deployed site:', 'yellow');
  log('   Visit the Firebase Hosting URL', 'reset');
  log('   Test booking form', 'reset');
  log('   Test admin panel access', 'reset');
  console.log('\n');

  log('5. Send to client:', 'yellow');
  log('   - Website URL', 'reset');
  log('   - Admin URL (secret!)', 'reset');
  log('   - Quick start guide', 'reset');
  console.log('\n');

  log('💡 Helpful Commands:', 'blue');
  log('   firebase deploy --only hosting    # Just update website', 'reset');
  log('   firebase deploy --only functions  # Just update functions', 'reset');
  log('   firebase hosting:sites:list       # See all hosting sites', 'reset');
  console.log('\n');

  log('📧 Client Delivery Template:', 'blue');
  console.log('\n');

  const deliveryEmail = `
Hi ${config.businessName},

Your custom booking website is ready! 🎉

🌐 Website URL: [Your Firebase URL here]
   Share this with your customers!

🔐 Admin Dashboard: [Your Firebase URL]/[${config.adminUrl}]
   ⚠️ Keep this URL secret - it's only for you!

📋 What You Can Do:
- View all bookings in real-time
- Manage your availability
- Track payments
- Update business hours

📱 The website works perfectly on:
- Desktop computers
- Tablets
- Mobile phones

✨ Features Included:
- Online booking 24/7
- Automatic email confirmations
- SMS notifications (if configured)
- Customer accounts
- Mobile-optimized design

🆘 Need Help?
- Reply to this email
- We'll schedule a quick walkthrough
- First month is FREE trial

Enjoy your new booking system!

Best regards,
Your Business
  `;

  log(deliveryEmail, 'reset');
  console.log('\n');

  log('═══════════════════════════════════════', 'green');
  log('   Ready to deploy!', 'green');
  log('═══════════════════════════════════════', 'green');
  console.log('\n');
}

deployClient().catch(error => {
  log(`\n❌ Error: ${error.message}`, 'red');
  process.exit(1);
});

