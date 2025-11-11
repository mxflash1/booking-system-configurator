#!/usr/bin/env node

/**
 * Smart Template System - Help Guide
 */

const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

console.log('\n');
log('═══════════════════════════════════════════════════════', 'cyan');
log('   🚀 SMART TEMPLATE SYSTEM - Help Guide', 'bold');
log('═══════════════════════════════════════════════════════', 'cyan');
console.log('\n');

log('📋 WORKFLOW OVERVIEW', 'blue');
console.log('\n');
log('1. Client submits order on landing page', 'reset');
log('2. You view order in admin-dashboard.html', 'reset');
log('3. Run npm run new-client <order-id>', 'reset');
log('4. Open project in Cursor and use AI to build', 'reset');
log('5. Deploy to Firebase', 'reset');
log('6. Deliver to client', 'reset');
console.log('\n');

log('══════════════════════════════════════════════════════', 'cyan');
log('📦 AVAILABLE COMMANDS', 'blue');
log('══════════════════════════════════════════════════════', 'cyan');
console.log('\n');

log('npm run new-client <order-id>', 'yellow');
log('  Creates a new client project from template', 'reset');
log('  Example: npm run new-client joes-barbershop', 'reset');
log('  Output: output/<order-id>/ folder with all files', 'reset');
console.log('\n');

log('npm run extract-config <order-id>', 'yellow');
log('  Guides you to extract config from Firestore order', 'reset');
log('  Example: npm run extract-config abc123', 'reset');
log('  Output: Instructions to update client-config.json', 'reset');
console.log('\n');

log('npm run deploy <order-id>', 'yellow');
log('  Shows deployment guide for client project', 'reset');
log('  Example: npm run deploy joes-barbershop', 'reset');
log('  Output: Step-by-step deployment instructions', 'reset');
console.log('\n');

log('npm run help', 'yellow');
log('  Shows this help guide', 'reset');
console.log('\n');

log('══════════════════════════════════════════════════════', 'cyan');
log('🎯 TYPICAL WORKFLOW', 'blue');
log('══════════════════════════════════════════════════════', 'cyan');
console.log('\n');

log('STEP 1: Create New Project', 'green');
log('────────────────────────────', 'green');
log('$ npm run new-client joes-barbershop', 'yellow');
log('', 'reset');
log('This creates:', 'reset');
log('  • output/joes-barbershop/ folder', 'reset');
log('  • client-config.json (template)', 'reset');
log('  • BUILD-CHECKLIST.md', 'reset');
log('  • README.md with Cursor commands', 'reset');
console.log('\n');

log('STEP 2: Get Client Data', 'green');
log('────────────────────────────', 'green');
log('1. Open admin-files/admin-dashboard.html', 'reset');
log('2. Find the client\'s order', 'reset');
log('3. Copy their information:', 'reset');
log('   - Business name', 'reset');
log('   - Colors', 'reset');
log('   - Services', 'reset');
log('   - Contact info', 'reset');
console.log('\n');

log('STEP 3: Update Config', 'green');
log('────────────────────────────', 'green');
log('$ cd output/joes-barbershop', 'yellow');
log('$ cursor .', 'yellow');
log('', 'reset');
log('Then edit client-config.json with actual data', 'reset');
console.log('\n');

log('STEP 4: Use Cursor AI', 'green');
log('────────────────────────────', 'green');
log('In Cursor, tell the AI:', 'reset');
log('', 'reset');
log('  @workspace Apply client-config.json to this project', 'yellow');
log('', 'reset');
log('Cursor will:', 'reset');
log('  • Update colors in style.css', 'reset');
log('  • Replace business name everywhere', 'reset');
log('  • Add services', 'reset');
log('  • Configure Firebase', 'reset');
log('  • Update contact information', 'reset');
console.log('\n');

log('STEP 5: Test Locally', 'green');
log('────────────────────────────', 'green');
log('$ open index.html', 'yellow');
log('', 'reset');
log('Check:', 'reset');
log('  • Colors look right', 'reset');
log('  • Business name everywhere', 'reset');
log('  • Services display correctly', 'reset');
log('  • Booking form works', 'reset');
log('  • Mobile view is good', 'reset');
console.log('\n');

log('STEP 6: Deploy', 'green');
log('────────────────────────────', 'green');
log('$ npm run deploy joes-barbershop', 'yellow');
log('', 'reset');
log('Follow the deployment instructions', 'reset');
console.log('\n');

log('══════════════════════════════════════════════════════', 'cyan');
log('💡 CURSOR AI COMMANDS', 'blue');
log('══════════════════════════════════════════════════════', 'cyan');
console.log('\n');

log('Full Configuration:', 'yellow');
log('  @workspace Apply client-config.json to this project', 'reset');
console.log('\n');

log('Just Branding:', 'yellow');
log('  @workspace Update branding from client-config.json', 'reset');
console.log('\n');

log('Just Services:', 'yellow');
log('  @workspace Add services from client-config.json', 'reset');
console.log('\n');

log('Just Firebase:', 'yellow');
log('  @workspace Configure Firebase from client-config.json', 'reset');
console.log('\n');

log('Testing:', 'yellow');
log('  @workspace Test this booking website', 'reset');
console.log('\n');

log('══════════════════════════════════════════════════════', 'cyan');
log('📁 PROJECT STRUCTURE', 'blue');
log('══════════════════════════════════════════════════════', 'cyan');
console.log('\n');

log('output/<client-name>/', 'yellow');
log('├── client-config.json       ← All client data (UPDATE THIS!)', 'reset');
log('├── BUILD-CHECKLIST.md       ← Step-by-step guide', 'reset');
log('├── README.md                ← Quick reference', 'reset');
log('├── index.html               ← Booking page', 'reset');
log('├── style.css                ← Styling/colors', 'reset');
log('├── firebase-config.json     ← Firebase settings', 'reset');
log('├── admin_[secret].html      ← Admin dashboard', 'reset');
log('└── ... (other template files)', 'reset');
console.log('\n');

log('══════════════════════════════════════════════════════', 'cyan');
log('🎓 TIPS & BEST PRACTICES', 'blue');
log('══════════════════════════════════════════════════════', 'cyan');
console.log('\n');

log('1. Always update client-config.json FIRST', 'green');
log('   This is your source of truth', 'reset');
console.log('\n');

log('2. Use Cursor AI to apply changes', 'green');
log('   Let AI handle the repetitive work', 'reset');
console.log('\n');

log('3. Test before deploying', 'green');
log('   Open index.html locally and check everything', 'reset');
console.log('\n');

log('4. Follow the checklist', 'green');
log('   BUILD-CHECKLIST.md ensures you don\'t miss anything', 'reset');
console.log('\n');

log('5. Keep admin URLs secret', 'green');
log('   Use unique names, never generic "admin.html"', 'reset');
console.log('\n');

log('══════════════════════════════════════════════════════', 'cyan');
log('🆘 TROUBLESHOOTING', 'blue');
log('══════════════════════════════════════════════════════', 'cyan');
console.log('\n');

log('Project already exists?', 'yellow');
log('  Delete the output/<client>/ folder and run again', 'reset');
console.log('\n');

log('Can\'t find order data?', 'yellow');
log('  Open admin-dashboard.html and look up the order', 'reset');
console.log('\n');

log('Cursor not applying changes?', 'yellow');
log('  Make sure client-config.json is updated', 'reset');
log('  Try being more specific in your command', 'reset');
console.log('\n');

log('Deployment failing?', 'yellow');
log('  Ensure Firebase CLI is installed: npm i -g firebase-tools', 'reset');
log('  Make sure you\'re logged in: firebase login', 'reset');
console.log('\n');

log('══════════════════════════════════════════════════════', 'cyan');
log('📞 QUICK REFERENCE', 'blue');
log('══════════════════════════════════════════════════════', 'cyan');
console.log('\n');

log('View orders:          open admin-files/admin-dashboard.html', 'reset');
log('View client page:     open client-files/index.html', 'reset');
log('Create project:       npm run new-client <order-id>', 'reset');
log('Deploy project:       npm run deploy <order-id>', 'reset');
log('Show this help:       npm run help', 'reset');
console.log('\n');

log('══════════════════════════════════════════════════════', 'cyan');
console.log('\n');
log('💪 You\'ve got this! Build amazing booking websites!', 'green');
console.log('\n');

