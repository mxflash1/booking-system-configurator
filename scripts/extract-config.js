#!/usr/bin/env node

/**
 * Extract client configuration from Firestore order
 * Fetches the order data and generates a proper client-config.json
 */

const fs = require('fs');
const path = require('path');

const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function parseServices(servicesText) {
  if (!servicesText) return [];
  
  const lines = servicesText.split('\n').filter(line => line.trim());
  return lines.map((line, index) => {
    const parts = line.split('-').map(p => p.trim());
    return {
      name: parts[0] || `Service ${index + 1}`,
      duration: parseInt(parts[1]) || 30,
      price: parseFloat(parts[2]?.replace(/[^0-9.]/g, '')) || 20,
      category: parts[3] || 'Services'
    };
  });
}

function mapFontStyle(fontStyle) {
  const fontMap = {
    'modern': 'Poppins, sans-serif',
    'professional': 'Inter, sans-serif',
    'retro': 'Press Start 2P, monospace',
    'bold': 'Montserrat, sans-serif',
    'elegant': 'Lato, sans-serif'
  };
  return fontMap[fontStyle] || 'Poppins, sans-serif';
}

async function extractConfig() {
  console.log('\n');
  log('🔍 Extract Client Configuration', 'blue');
  console.log('\n');

  const orderId = process.argv[2];
  
  if (!orderId) {
    log('Usage: npm run extract-config <order-id>', 'yellow');
    log('Example: npm run extract-config abc123xyz', 'yellow');
    console.log('\n');
    log('This will fetch the order from Firestore and generate client-config.json', 'reset');
    process.exit(1);
  }

  log(`📋 Fetching order: ${orderId}`, 'blue');
  console.log('\n');

  // Check if Firebase Admin is configured
  const configPath = path.join(__dirname, '../client-files/firebase-admin-config.js');
  
  if (!fs.existsSync(configPath)) {
    log('❌ Firebase admin config not found!', 'red');
    log('   Please configure firebase-admin-config.js first', 'yellow');
    process.exit(1);
  }

  log('⚠️  Manual Configuration Required', 'yellow');
  console.log('\n');
  log('Due to Firebase Admin SDK limitations in Node scripts,', 'reset');
  log('please manually copy the order data from your admin dashboard.', 'reset');
  console.log('\n');

  log('📋 Steps:', 'blue');
  log('1. Open admin-files/admin-dashboard.html', 'reset');
  log('2. Find the order', 'reset');
  log('3. Copy the order details', 'reset');
  log('4. Update the client-config.json manually', 'reset');
  console.log('\n');

  log('💡 Alternative: Use the order data to fill client-config.json', 'blue');
  log('   The config template is already in output/<order-id>/client-config.json', 'reset');
  console.log('\n');

  // Generate template with instructions
  const outputDir = path.join(__dirname, '../output', orderId);
  
  if (!fs.existsSync(outputDir)) {
    log('⚠️  Project folder doesn\'t exist yet', 'yellow');
    log(`   Run: npm run new-client ${orderId}`, 'yellow');
    log('   Then update the client-config.json manually', 'yellow');
    process.exit(0);
  }

  const configJsonPath = path.join(outputDir, 'client-config.json');
  
  if (fs.existsSync(configJsonPath)) {
    log('📝 client-config.json already exists', 'green');
    log(`   Location: ${configJsonPath}`, 'reset');
    console.log('\n');
    log('Update it with data from the admin dashboard order', 'yellow');
  }

  console.log('\n');
  log('✅ Next: Open the config file and fill in actual client data', 'green');
  console.log('\n');
}

extractConfig().catch(error => {
  log(`\n❌ Error: ${error.message}`, 'red');
  process.exit(1);
});

