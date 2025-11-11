#!/usr/bin/env node

/**
 * Smart Template System - New Client Project
 * Creates a new client project from template with their order data
 */

const fs = require('fs');
const path = require('path');

// Colors for terminal output
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

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function createNewClientProject() {
  console.log('\n');
  log('🚀 Smart Template System - New Client Project', 'bold');
  console.log('\n');

  // Get order ID from command line or prompt
  const orderId = process.argv[2];
  
  if (!orderId) {
    log('Usage: npm run new-client <order-id>', 'yellow');
    log('Example: npm run new-client joes-barbershop', 'yellow');
    console.log('\n');
    log('💡 TIP: Get the order ID from the admin dashboard URL or Firebase', 'blue');
    process.exit(1);
  }

  log(`📋 Creating project for order: ${orderId}`, 'blue');
  console.log('\n');

  // Paths
  const templateDir = path.join(__dirname, '../template');
  const outputDir = path.join(__dirname, '../output', orderId);
  const configPath = path.join(outputDir, 'client-config.json');
  const checklistPath = path.join(outputDir, 'BUILD-CHECKLIST.md');

  // Check if project already exists
  if (fs.existsSync(outputDir)) {
    log('⚠️  Project already exists!', 'yellow');
    log(`   Location: ${outputDir}`, 'yellow');
    console.log('\n');
    log('Options:', 'blue');
    log('  1. Delete the existing folder and run again', 'reset');
    log('  2. Work on the existing project', 'reset');
    process.exit(0);
  }

  // Step 1: Copy template
  log('📁 Step 1/4: Copying template files...', 'blue');
  try {
    copyDirectory(templateDir, outputDir);
    log('   ✅ Template copied successfully', 'green');
  } catch (error) {
    log(`   ❌ Error copying template: ${error.message}`, 'red');
    process.exit(1);
  }

  // Step 2: Create client-config.json
  log('📝 Step 2/4: Creating client-config.json...', 'blue');
  const clientConfig = {
    orderId: orderId,
    businessName: "Client Business Name",
    tagline: "Clean cuts. No wait.",
    location: "City, State",
    timezone: "America/New_York",
    currency: "$",
    phone: "555-1234",
    email: "client@business.com",
    adminUrl: "admin_secret",
    branding: {
      primaryColor: "#CE1126",
      secondaryColor: "#006847",
      backgroundColor: "#000000",
      fontFamily: "Press Start 2P, monospace"
    },
    services: [
      {
        name: "Haircut",
        duration: 30,
        price: 20,
        category: "Hair Services"
      }
    ],
    features: {
      authentication: true,
      leaderboard: true,
      deposits: false,
      calendar: true
    },
    notifications: {
      email: true,
      sms: true,
      whatsapp: false
    },
    firebase: {
      projectId: "",
      apiKey: "",
      authDomain: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: ""
    },
    status: "in-progress",
    createdAt: new Date().toISOString(),
    notes: "⚠️ IMPORTANT: Update this config with actual client data from their order!"
  };

  fs.writeFileSync(configPath, JSON.stringify(clientConfig, null, 2));
  log('   ✅ client-config.json created', 'green');
  log('   ⚠️  Remember to update with actual client data!', 'yellow');

  // Step 3: Generate checklist
  log('📋 Step 3/4: Generating build checklist...', 'blue');
  const checklist = `# 🚀 Build Checklist - ${orderId}

## 📋 Setup Phase

- [ ] **Update client-config.json** with actual order data
  - Get data from admin dashboard
  - Business name, colors, services, contact info
  - Firebase config (create new Firebase project)

- [ ] **Create Firebase Project**
  - Go to console.firebase.google.com
  - Create new project: "${orderId}"
  - Enable Firestore, Authentication, Hosting, Functions
  - Copy config to client-config.json

---

## 🎨 Branding Phase

Use Cursor to apply branding:

\`\`\`
@workspace Apply the client-config.json branding to all files:
- Update colors in style.css
- Change business name everywhere
- Update contact information
- Configure services
\`\`\`

Manual checks:
- [ ] Colors look good in style.css
- [ ] Business name updated in index.html
- [ ] Services list is correct
- [ ] Contact info (phone, email) updated
- [ ] Logo placeholders ready (if client provides logo)

---

## 🔥 Firebase Configuration

Use Cursor:

\`\`\`
@workspace Configure Firebase using client-config.json:
- Update firebase-config.json
- Set up firestore.rules
- Configure availability-config.json
\`\`\`

Manual checks:
- [ ] Firebase config is correct
- [ ] Firestore rules are secure
- [ ] Business hours set properly
- [ ] Admin URL is unique and secret

---

## 🧪 Testing Phase

- [ ] **Test Locally**
  - Open index.html in browser
  - Test booking flow (name, phone, date selection)
  - Check mobile responsiveness
  - Test all service selections

- [ ] **Test Colors & Branding**
  - All buttons use correct colors
  - Business name appears everywhere
  - Contact info is correct
  - Footer looks good

- [ ] **Test Admin Panel**
  - Access admin URL (yoursite.com/{adminUrl})
  - Can view bookings
  - Can manage availability
  - Can see payment tracking

---

## 🚀 Deployment Phase

1. **Install Firebase CLI** (if not already)
   \`\`\`bash
   npm install -g firebase-tools
   firebase login
   \`\`\`

2. **Initialize Firebase** (in this project folder)
   \`\`\`bash
   firebase init
   # Select: Firestore, Functions, Hosting
   # Choose existing project
   # Public directory: .
   \`\`\`

3. **Deploy**
   \`\`\`bash
   firebase deploy
   \`\`\`

4. **Post-Deployment Checks**
   - [ ] Website loads at the Firebase URL
   - [ ] Booking form works
   - [ ] Admin panel accessible
   - [ ] Mobile version works
   - [ ] All colors/branding correct

---

## 📧 Delivery Phase

- [ ] **Send to Client**
  - Email the live URL
  - Provide admin credentials (admin URL + password)
  - Include quick start guide
  - Offer to do walkthrough call

- [ ] **Client Training**
  - Show how to access admin panel
  - Explain how to view bookings
  - Show how to manage availability
  - Explain payment tracking

- [ ] **Follow Up**
  - Check in after 1 week
  - Ask for feedback
  - Offer adjustments if needed
  - Get testimonial if happy!

---

## 📝 Notes

Add any client-specific notes here:
- 
- 
- 

---

## ✅ Completion

**Built by:** _________  
**Date Started:** ${new Date().toLocaleDateString()}  
**Date Completed:** _________  
**Deployed URL:** _________  
**Client Satisfied:** [ ] Yes [ ] No

---

**Next Steps:** Mark as completed in admin dashboard!
`;

  fs.writeFileSync(checklistPath, checklist);
  log('   ✅ BUILD-CHECKLIST.md created', 'green');

  // Step 4: Create quick reference
  log('📄 Step 4/4: Creating quick reference...', 'blue');
  const readme = `# ${orderId}

## 🚀 Quick Start

1. **Update client-config.json** with actual order data
2. **Use Cursor** to apply changes:
   \`\`\`
   @workspace Apply client-config.json to this project
   \`\`\`
3. **Follow BUILD-CHECKLIST.md**
4. **Deploy to Firebase**

## 📁 Important Files

- \`client-config.json\` - All client data (UPDATE THIS FIRST!)
- \`BUILD-CHECKLIST.md\` - Step-by-step build guide
- \`index.html\` - Main booking page
- \`style.css\` - Styling and colors
- \`firebase-config.json\` - Firebase configuration

## 💡 Cursor Commands

### Apply Full Config
\`\`\`
@workspace Apply all settings from client-config.json:
- Branding (colors, fonts, business name)
- Services
- Contact information
- Firebase configuration
\`\`\`

### Update Just Branding
\`\`\`
@workspace Update only the branding from client-config.json:
- Colors in style.css
- Business name in all files
- Font family
\`\`\`

### Add Services
\`\`\`
@workspace Add the services from client-config.json to the booking system
\`\`\`

### Configure Firebase
\`\`\`
@workspace Set up Firebase using the config from client-config.json
\`\`\`

## 🎯 Workflow

1. Open this folder in Cursor
2. Update \`client-config.json\`
3. Use Cursor to apply changes
4. Test locally
5. Deploy to Firebase
6. Deliver to client

## 📞 Client Info

**Business:** (from config)  
**Contact:** (from config)  
**Status:** In Progress

---

**Created:** ${new Date().toLocaleString()}
`;

  fs.writeFileSync(path.join(outputDir, 'README.md'), readme);
  log('   ✅ README.md created', 'green');

  // Success!
  console.log('\n');
  log('════════════════════════════════════════════════════', 'green');
  log('   ✨ PROJECT CREATED SUCCESSFULLY! ✨', 'green');
  log('════════════════════════════════════════════════════', 'green');
  console.log('\n');

  log('📁 Location:', 'blue');
  log(`   ${outputDir}`, 'reset');
  console.log('\n');

  log('🎯 Next Steps:', 'blue');
  log('   1. Open this folder in Cursor:', 'reset');
  log(`      cd ${outputDir}`, 'yellow');
  log('      cursor .', 'yellow');
  console.log('\n');
  log('   2. Update client-config.json with actual order data', 'reset');
  console.log('\n');
  log('   3. Use Cursor to apply changes:', 'reset');
  log('      @workspace Apply client-config.json to this project', 'yellow');
  console.log('\n');
  log('   4. Follow BUILD-CHECKLIST.md', 'reset');
  console.log('\n');

  log('💡 Helpful Commands:', 'blue');
  log('   npm run extract-config <order-id>  # Get config from Firestore', 'reset');
  log('   npm run checklist <order-id>       # Regenerate checklist', 'reset');
  log('   npm run deploy <order-id>          # Deploy to Firebase', 'reset');
  console.log('\n');
}

// Run the script
createNewClientProject().catch(error => {
  log(`\n❌ Error: ${error.message}`, 'red');
  process.exit(1);
});

