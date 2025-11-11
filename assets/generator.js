// Booking System Configurator - Generator Script
console.log('🚀 Configurator loaded');

let services = [];
let serviceCounter = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM loaded, initializing...');
  
  // Add first service by default
  addService();
  
  // Setup event listeners
  setupEventListeners();
  
  // Update preview on any change
  updatePreview();
});

function setupEventListeners() {
  // Color pickers sync
  document.getElementById('primaryColor').addEventListener('input', (e) => {
    document.getElementById('primaryColorText').value = e.target.value;
    updatePreview();
  });
  
  document.getElementById('primaryColorText').addEventListener('input', (e) => {
    document.getElementById('primaryColor').value = e.target.value;
    updatePreview();
  });
  
  document.getElementById('secondaryColor').addEventListener('input', (e) => {
    document.getElementById('secondaryColorText').value = e.target.value;
    updatePreview();
  });
  
  document.getElementById('secondaryColorText').addEventListener('input', (e) => {
    document.getElementById('secondaryColor').value = e.target.value;
    updatePreview();
  });
  
  document.getElementById('backgroundColor').addEventListener('input', (e) => {
    document.getElementById('backgroundColorText').value = e.target.value;
    updatePreview();
  });
  
  document.getElementById('backgroundColorText').addEventListener('input', (e) => {
    document.getElementById('backgroundColor').value = e.target.value;
    updatePreview();
  });
  
  // Business name and tagline preview
  document.getElementById('businessName').addEventListener('input', updatePreview);
  document.getElementById('tagline').addEventListener('input', updatePreview);
  
  // Location dropdown - show custom input if "custom" selected
  document.getElementById('location').addEventListener('change', (e) => {
    const customInput = document.getElementById('customLocation');
    if (e.target.value === 'custom') {
      customInput.style.display = 'block';
      customInput.required = true;
    } else {
      customInput.style.display = 'none';
      customInput.required = false;
    }
    updatePreview();
  });
  
  // Skip Firebase toggle
  document.getElementById('skipFirebase').addEventListener('change', (e) => {
    const firebaseFields = document.getElementById('firebaseConfigFields');
    const firebaseInputs = document.querySelectorAll('.firebase-input');
    
    if (e.target.checked) {
      firebaseFields.style.display = 'none';
      // Remove required attribute from all Firebase inputs
      firebaseInputs.forEach(input => input.required = false);
    } else {
      firebaseFields.style.display = 'block';
      // Add required attribute back to essential fields
      document.getElementById('firebaseApiKey').required = true;
      document.getElementById('firebaseProjectId').required = true;
      document.getElementById('firebaseAppId').required = true;
    }
  });
  
  // PayPal toggle
  document.getElementById('paymentPaypal').addEventListener('change', (e) => {
    document.getElementById('paypalEmailGroup').style.display = e.target.checked ? 'block' : 'none';
  });
  
  // Update preview on all inputs
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', updatePreview);
    input.addEventListener('change', updatePreview);
  });
}

function addService() {
  serviceCounter++;
  const serviceId = `service_${serviceCounter}`;
  
  const serviceItem = document.createElement('div');
  serviceItem.className = 'service-item';
  serviceItem.id = serviceId;
  serviceItem.innerHTML = `
    <div class="service-header">
      <span class="service-number">Service #${serviceCounter}</span>
      <button class="btn-remove" onclick="removeService('${serviceId}')">✕ Remove</button>
    </div>
    <div class="service-grid">
      <div class="form-group" style="grid-column: 1 / -1;">
        <label class="form-label">Service Name <span class="label-required">*</span></label>
        <input type="text" class="form-input service-name" placeholder="Haircut" required oninput="updatePreview()">
      </div>
      <div class="form-group">
        <label class="form-label">Duration (min) <span class="label-required">*</span></label>
        <input type="number" class="form-input service-duration" placeholder="30" min="5" required oninput="updatePreview()">
      </div>
      <div class="form-group">
        <label class="form-label">Price <span class="label-required">*</span></label>
        <input type="number" class="form-input service-price" placeholder="20" min="0" step="0.01" required oninput="updatePreview()">
      </div>
      <div class="form-group" style="grid-column: 1 / -1;">
        <label class="form-label">Category <span style="color: #94a3b8; font-weight: 400;">(Optional - Leave blank if not needed)</span></label>
        <input type="text" class="form-input service-category" placeholder="Leave blank unless service has explicit category" oninput="updatePreview()">
        <span class="form-hint">⚠️ Only use if services are grouped into categories (e.g., "Hair Services", "Beard Services"). Otherwise, leave blank.</span>
      </div>
    </div>
  `;
  
  document.getElementById('servicesList').appendChild(serviceItem);
  updatePreview();
}

function removeService(serviceId) {
  const service = document.getElementById(serviceId);
  if (service) {
    service.remove();
    updatePreview();
  }
}

function updatePreview() {
  const businessName = document.getElementById('businessName').value || 'Your Business';
  const tagline = document.getElementById('tagline').value || 'Clean cuts. No wait.';
  const primaryColor = document.getElementById('primaryColor').value;
  const secondaryColor = document.getElementById('secondaryColor').value;
  const backgroundColor = document.getElementById('backgroundColor').value;
  const currency = document.getElementById('currency').value || '$';
  const fontFamily = document.getElementById('fontFamily').value;
  const phone = document.getElementById('phone').value || '0402098123';
  
  // Generate complete real booking interface
  const realPreview = document.getElementById('realPreview');
  if (!realPreview) return;
  
  // Collect services
  const serviceElements = document.querySelectorAll('.service-item');
  let servicesHTML = '';
  
  serviceElements.forEach((element, index) => {
    const name = element.querySelector('.service-name').value || `Service ${index + 1}`;
    const duration = element.querySelector('.service-duration').value || '30';
    const price = element.querySelector('.service-price').value || '20';
    
    servicesHTML += `
      <div class="preview-service-card">
        <div class="preview-service-name">${name}</div>
        <div class="preview-service-meta">${duration} min • ${currency}${price}</div>
      </div>
    `;
  });
  
  if (!servicesHTML) {
    servicesHTML = `
      <p style="color: #999; text-align: center; font-size: 14px;">Add services to see them here</p>
    `;
  }
  
  // Generate the actual booking interface
  realPreview.innerHTML = `
    <style>
      #realPreview {
        font-family: ${fontFamily};
        background-color: ${backgroundColor};
        color: #fff;
        min-height: 600px;
      }
      
      #realPreview * {
        font-family: ${fontFamily};
      }
      
      .preview-nav {
        background: #111;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .preview-nav-logo {
        font-size: 18px;
        font-weight: bold;
        color: #fff;
      }
      
      .preview-nav-links {
        display: flex;
        gap: 15px;
        font-size: 12px;
      }
      
      .preview-nav-link {
        color: #fff;
        text-decoration: none;
        transition: color 0.3s;
      }
      
      .preview-nav-link:hover {
        color: ${primaryColor};
      }
      
      .preview-hero-section {
        padding: 60px 20px;
        text-align: center;
        background: ${backgroundColor};
      }
      
      .preview-logo-placeholder {
        width: 150px;
        height: 150px;
        margin: 0 auto 20px;
        background: rgba(255,255,255,0.05);
        border: 2px dashed rgba(255,255,255,0.2);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48px;
      }
      
      .preview-business-title {
        font-size: 36px;
        color: #fff;
        margin-bottom: 15px;
        font-weight: bold;
      }
      
      .preview-tagline {
        font-size: 16px;
        color: rgba(255,255,255,0.8);
        margin-bottom: 25px;
      }
      
      .preview-cta-button {
        display: inline-block;
        padding: 12px 30px;
        background: ${secondaryColor};
        color: #fff;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .preview-cta-button:hover {
        background: ${adjustBrightness(secondaryColor, -20)};
        transform: scale(0.95);
      }
      
      .preview-about-section {
        padding: 40px 20px;
        max-width: 600px;
        margin: 0 auto;
        text-align: center;
      }
      
      .preview-about-title {
        font-size: 24px;
        color: ${primaryColor};
        margin-bottom: 15px;
      }
      
      .preview-about-text {
        font-size: 14px;
        line-height: 1.8;
        color: rgba(255,255,255,0.8);
      }
      
      .preview-booking-section {
        padding: 40px 20px;
        max-width: 600px;
        margin: 0 auto;
      }
      
      .preview-booking-title {
        font-size: 24px;
        color: ${primaryColor};
        margin-bottom: 20px;
        text-align: center;
      }
      
      .preview-booking-form {
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: rgba(255,255,255,0.03);
        padding: 25px;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.1);
      }
      
      .preview-form-input {
        padding: 12px;
        border: none;
        border-radius: 5px;
        background: rgba(255,255,255,0.9);
        color: #000;
        font-size: 14px;
      }
      
      .preview-form-textarea {
        padding: 12px;
        border: none;
        border-radius: 5px;
        background: rgba(255,255,255,0.9);
        color: #000;
        font-size: 14px;
        min-height: 60px;
        resize: vertical;
      }
      
      .preview-form-button {
        padding: 14px;
        background: ${primaryColor};
        color: #fff;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.3s;
      }
      
      .preview-form-button:hover {
        background: ${adjustBrightness(primaryColor, -20)};
      }
      
      .preview-services-section {
        padding: 40px 20px;
        max-width: 800px;
        margin: 0 auto;
      }
      
      .preview-services-title {
        font-size: 24px;
        color: ${primaryColor};
        margin-bottom: 30px;
        text-align: center;
      }
      
      .preview-services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 15px;
      }
      
      .preview-service-card {
        background: rgba(255,255,255,0.05);
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        border: 1px solid rgba(255,255,255,0.1);
        transition: all 0.3s;
      }
      
      .preview-service-card:hover {
        background: rgba(255,255,255,0.08);
        border-color: ${primaryColor};
      }
      
      .preview-service-name {
        font-size: 16px;
        color: #fff;
        margin-bottom: 8px;
        font-weight: bold;
      }
      
      .preview-service-meta {
        font-size: 12px;
        color: rgba(255,255,255,0.7);
      }
      
      .preview-footer {
        background: #111;
        padding: 30px 20px;
        text-align: center;
        font-size: 12px;
        color: rgba(255,255,255,0.6);
      }
    </style>
    
    <!-- Navigation -->
    <div class="preview-nav">
      <div class="preview-nav-logo">💈 ${businessName}</div>
      <div class="preview-nav-links">
        <a href="#" class="preview-nav-link">About</a>
        <a href="#" class="preview-nav-link">Book</a>
        <a href="#" class="preview-nav-link">Contact</a>
      </div>
    </div>
    
    <!-- Hero Section -->
    <div class="preview-hero-section">
      <div class="preview-logo-placeholder">💈</div>
      <h1 class="preview-business-title">${businessName}</h1>
      <p class="preview-tagline">${tagline}</p>
      <button class="preview-cta-button">Book Now</button>
    </div>
    
    <!-- About Section -->
    <div class="preview-about-section">
      <h2 class="preview-about-title">About ${businessName}</h2>
      <p class="preview-about-text">The best service for your money. Professional quality at affordable prices. Book your appointment online today.</p>
      <p style="font-size: 12px; color: #666; margin-top: 12px; font-style: italic;">
        *You will receive the exact address when you book your appointment
      </p>
    </div>
    
    <!-- Booking Section -->
    <div class="preview-booking-section">
      <h2 class="preview-booking-title">Book Your Appointment</h2>
      <div class="preview-booking-form">
        <input type="text" class="preview-form-input" placeholder="Full Name" disabled>
        <input type="tel" class="preview-form-input" placeholder="Phone Number" disabled>
        <input type="text" class="preview-form-input" placeholder="Select Date" disabled>
        <textarea class="preview-form-textarea" placeholder="Notes (optional)" disabled></textarea>
        <button class="preview-form-button">Confirm Booking</button>
      </div>
      <p style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
        📱 ${phone}
      </p>
    </div>
    
    <!-- Services Section -->
    <div class="preview-services-section">
      <h2 class="preview-services-title">Our Services</h2>
      <div class="preview-services-grid">
        ${servicesHTML}
      </div>
    </div>
    
    <!-- Footer -->
    <div class="preview-footer">
      <p>Contact: ${phone}</p>
      <p>Follow us on social media</p>
    </div>
  `;
}

// Preview is now handled by the main updatePreview function

function adjustBrightness(hex, percent) {
  // Convert hex to RGB
  const num = parseInt(hex.replace('#', ''), 16);
  const r = (num >> 16) + percent;
  const g = ((num >> 8) & 0x00FF) + percent;
  const b = (num & 0x0000FF) + percent;
  
  // Clamp values
  const newR = Math.max(0, Math.min(255, r));
  const newG = Math.max(0, Math.min(255, g));
  const newB = Math.max(0, Math.min(255, b));
  
  return `#${((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1)}`;
}

function collectFormData() {
  console.log('🔶 collectFormData started');
  
  // Collect services
  const serviceElements = document.querySelectorAll('.service-item');
  console.log('🔶 Found service elements:', serviceElements.length);
  const services = [];
  
  serviceElements.forEach((element, index) => {
    const name = element.querySelector('.service-name').value;
    const category = element.querySelector('.service-category').value || 'Services';
    const duration = parseInt(element.querySelector('.service-duration').value) || 30;
    const price = parseFloat(element.querySelector('.service-price').value) || 0;
    
    if (name) {
      services.push({
        id: `service_${index + 1}`,
        name: name,
        category: category,
        duration: duration,
        price: price
      });
    }
  });
  
  // Get location (handle custom input)
  const locationSelect = document.getElementById('location').value;
  const location = locationSelect === 'custom' 
    ? document.getElementById('customLocation').value 
    : locationSelect;
  
  // Build configuration object
  const config = {
    business: {
      name: document.getElementById('businessName').value,
      tagline: document.getElementById('tagline').value || 'Clean cuts. No wait.',
      timezone: document.getElementById('timezone').value,
      location: location,
      currency: document.getElementById('currency').value,
      defaultPrice: services[0]?.price || 20
    },
    branding: {
      primaryColor: document.getElementById('primaryColor').value,
      secondaryColor: document.getElementById('secondaryColor').value,
      backgroundColor: document.getElementById('backgroundColor').value,
      fontFamily: document.getElementById('fontFamily').value,
      logoUrl: '/images/logo.png',
      faviconUrl: '/images/favicon.png'
    },
    services: services,
    contact: {
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      adminUrl: document.getElementById('adminUrl').value
    },
    firebase: {
      enabled: !document.getElementById('skipFirebase').checked,
      apiKey: document.getElementById('firebaseApiKey').value || 'YOUR_API_KEY',
      authDomain: document.getElementById('firebaseAuthDomain').value || 'your-project.firebaseapp.com',
      projectId: document.getElementById('firebaseProjectId').value || 'your-project-id',
      storageBucket: document.getElementById('firebaseStorageBucket').value || 'your-project.appspot.com',
      messagingSenderId: document.getElementById('firebaseMessagingSenderId').value || '123456789',
      appId: document.getElementById('firebaseAppId').value || '1:123:web:abc',
      measurementId: ''
    },
    businessHours: generateBusinessHours(),
    scheduleText: generateScheduleText(),
    features: {
      authentication: document.getElementById('featureAuth').checked,
      leaderboard: document.getElementById('featureLeaderboard').checked,
      deposits: {
        enabled: document.getElementById('featureDeposits').checked,
        amount: 0,
        percentage: 0
      },
      payments: {
        acceptCash: document.getElementById('paymentCash').checked,
        acceptCard: document.getElementById('paymentCard').checked,
        acceptPaypal: document.getElementById('paymentPaypal').checked,
        paypalEmail: document.getElementById('paypalEmail')?.value || ''
      },
      calendar: {
        autoAddToCalendar: document.getElementById('featureCalendar').checked,
        googleCalendarEnabled: true
      }
    },
    bookingForm: {
      fields: ['name', 'phone', 'email'],
      requireEmail: false,
      requireNotes: false
    },
    notifications: {
      sms: {
        enabled: document.getElementById('notifSMS').checked,
        provider: 'twilio'
      },
      email: {
        enabled: document.getElementById('notifEmail').checked
      },
      whatsapp: {
        enabled: document.getElementById('notifWhatsApp').checked
      }
    },
    integrations: {
      googleSheets: {
        enabled: true,
        backupSheetId: '',
        paymentSheetId: ''
      }
    },
    language: {
      code: document.getElementById('language').value,
      translations: getTranslations(document.getElementById('language').value)
    }
  };
  
  return config;
}

function generateBusinessHours() {
  // For now, generate a default schedule
  // In a future version, add UI controls for business hours
  return {
    "Saturday": {
      "enabled": true,
      "startTime": "08:00",
      "endTime": "18:00",
      "slotDuration": 30
    },
    "Sunday": { "enabled": false },
    "Monday": { "enabled": false },
    "Tuesday": {
      "enabled": true,
      "startTime": "15:30",
      "endTime": "16:30",
      "slotDuration": 30
    },
    "Wednesday": { "enabled": false },
    "Thursday": {
      "enabled": true,
      "startTime": "15:30",
      "endTime": "16:30",
      "slotDuration": 30
    },
    "Friday": { "enabled": false }
  };
}

function generateScheduleText() {
  // Generate display text for the schedule
  return {
    "Saturday": "Saturdays: 8:00am – 6:00pm",
    "Tuesday": "Tuesdays: 3:30pm – 4:30pm",
    "Thursday": "Thursdays: 3:30pm – 4:30pm"
  };
}

function getTranslations(langCode) {
  const translations = {
    en: {
      bookNow: 'Book Now',
      selectTime: 'Select Time',
      confirm: 'Confirm',
      cancel: 'Cancel',
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      notes: 'Notes'
    },
    es: {
      bookNow: 'Reservar Ahora',
      selectTime: 'Seleccionar Hora',
      confirm: 'Confirmar',
      cancel: 'Cancelar',
      name: 'Nombre',
      phone: 'Teléfono',
      email: 'Correo Electrónico',
      notes: 'Notas'
    },
    fr: {
      bookNow: 'Réserver Maintenant',
      selectTime: 'Sélectionner l\'Heure',
      confirm: 'Confirmer',
      cancel: 'Annuler',
      name: 'Nom',
      phone: 'Téléphone',
      email: 'Email',
      notes: 'Notes'
    }
  };
  
  return translations[langCode] || translations.en;
}

async function generateConfig() {
  console.log('🔷 generateConfig started');
  
  let config;
  try {
    config = collectFormData();
    console.log('🔷 Config collected:', config);
  } catch (error) {
    console.error('❌ Error collecting form data:', error);
    alert('Error collecting form data: ' + error.message);
    return;
  }
  
  // Validate required fields
  console.log('🔷 Validating fields...');
  if (!config.business.name || !config.contact.phone || !config.contact.email) {
    console.log('❌ Validation failed:', {
      name: config.business.name,
      phone: config.contact.phone,
      email: config.contact.email
    });
    alert('⚠️ Please fill in all required fields (marked with *)');
    return;
  }
  console.log('✅ Validation passed');
  
  console.log('🔷 Checking services...');
  if (config.services.length === 0) {
    console.log('❌ No services found');
    alert('⚠️ Please add at least one service');
    return;
  }
  console.log('✅ Services OK:', config.services.length);
  
  // Validate Firebase config (only if not skipped)
  console.log('🔷 Checking Firebase config...', {
    enabled: config.firebase.enabled,
    apiKey: config.firebase.apiKey,
    projectId: config.firebase.projectId
  });
  
  if (config.firebase.enabled && (!config.firebase.apiKey || config.firebase.apiKey === 'YOUR_API_KEY' || !config.firebase.projectId || config.firebase.projectId === 'your-project-id')) {
    console.log('❌ Firebase validation failed');
    alert('⚠️ Please fill in Firebase configuration fields or check "Skip Firebase for now"');
    return;
  }
  console.log('✅ Firebase validation passed');
  
  // Show warning if Firebase was skipped
  if (!config.firebase.enabled) {
    console.log('🔷 Firebase disabled - showing test mode modal');
    // Store config for later use
    window.pendingConfig = config;
    // Show beautiful modal instead of ugly confirm
    document.getElementById('testModeModal').style.display = 'flex';
    console.log('✅ Modal shown');
    return;
  }
  
  // If Firebase is configured, proceed directly
  console.log('🔷 Proceeding with generation...');
  await proceedWithGeneration(config);
}

async function proceedWithGeneration(config) {
  console.log('Generated Config:', config);
  
  try {
    // Show loading state
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
      generateBtn.disabled = true;
      generateBtn.innerHTML = '⏳ Generating...';
    }
    
    // Generate all files from templates
    const files = await generateFilesFromTemplates(config);
    
    console.log('✅ Files generated:', Object.keys(files));
    
    // Store files for download
    window.generatedFiles = files;
    // Config is already stored by generateFilesFromTemplates
  
    // Auto-download all files
    await downloadAllFiles(files, config.business.name);
    
    // Show success status
    document.getElementById('generationStatus').style.display = 'block';
    
    // Scroll to success message
    document.getElementById('generationStatus').scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Re-enable button
    if (generateBtn) {
      generateBtn.disabled = false;
      generateBtn.innerHTML = '🚀 Generate My Website';
    }
    
  } catch (error) {
    console.error('Error generating config:', error);
    alert('❌ Error generating files: ' + error.message + '\n\nPlease check the console for details.');
    
    // Re-enable button
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
      generateBtn.disabled = false;
      generateBtn.innerHTML = '🚀 Generate My Website';
    }
  }
}

async function downloadConfig() {
  // Check if files have been generated
  if (window.generatedFiles) {
    // Download all generated files
    await downloadAllFiles(window.generatedFiles, window.generatedConfig.business.name);
    alert('✅ Files downloaded again!\n\nCheck your Downloads folder.');
  } else {
    alert('⚠️ No files generated yet!\n\nPlease click "Generate My Website" first.');
    return;
  }
}

/**
 * Download all generated files
 */
async function downloadAllFiles(files, businessName) {
  const folderName = businessName.toLowerCase().replace(/\s+/g, '-');
  
  // Download each file with a slight delay to prevent browser blocking
  const fileNames = Object.keys(files);
  
  for (let i = 0; i < fileNames.length; i++) {
    const filename = fileNames[i];
    const content = files[filename];
    
    const blob = new Blob([content], { 
      type: filename.endsWith('.json') ? 'application/json' : 
            filename.endsWith('.html') ? 'text/html' :
            filename.endsWith('.css') ? 'text/css' : 'text/plain'
    });
    
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
    a.download = `${folderName}-${filename}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
    // Wait 300ms between downloads
    if (i < fileNames.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
  
  console.log(`✅ Downloaded ${fileNames.length} files to Downloads folder`);
}

function closeModal() {
  document.getElementById('successModal').style.display = 'none';
}

function closeTestModeModal() {
  document.getElementById('testModeModal').style.display = 'none';
  window.pendingConfig = null;
}

async function confirmTestMode() {
  document.getElementById('testModeModal').style.display = 'none';
  if (window.pendingConfig) {
    await proceedWithGeneration(window.pendingConfig);
    window.pendingConfig = null;
  }
}

// ========================================
// TEMPLATE REPLACEMENT ENGINE
// ========================================

/**
 * Template Replacement Engine
 * Replaces {{PLACEHOLDERS}} with actual values
 * Handles conditional blocks: {{#FEATURE}}...{{/FEATURE}}
 */
class TemplateEngine {
  constructor(config) {
    this.config = config;
    this.replacements = this.buildReplacements();
  }

  /**
   * Build all replacement values from config
   */
  buildReplacements() {
    const config = this.config;
    
    // Calculate darker shades for hover effects
    const primaryDark = this.darkenColor(config.branding.primaryColor, 20);
    const secondaryDark = this.darkenColor(config.branding.secondaryColor, 20);
    
    return {
      // Business Info
      'BUSINESS_NAME': config.business.name,
      'BUSINESS_NAME_SLUG': config.business.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      'LOCATION': config.business.location,
      'PHONE': config.contact.phone,
      'EMAIL': config.contact.email,
      'ADMIN_URL': config.contact.adminUrl,
      'TAGLINE': config.business.tagline || 'Clean cuts. No wait.',
      'ABOUT_TEXT': config.business.aboutText || `The best service for your money. Professional quality at affordable prices.`,
      'BOOKING_DESCRIPTION': this.generateBookingDescription(),
      'FOOTER_TEXT': config.business.footerText || `Follow us on social media`,
      
      // Branding
      'PRIMARY_COLOR': config.branding.primaryColor,
      'SECONDARY_COLOR': config.branding.secondaryColor,
      'BACKGROUND_COLOR': config.branding.backgroundColor,
      'PRIMARY_COLOR_DARK': primaryDark,
      'SECONDARY_COLOR_DARK': secondaryDark,
      'FONT_FAMILY': config.branding.fontFamily,
      'FONT_FAMILY_IMPORT': this.getFontImportName(config.branding.fontFamily),
      
      // Firebase Config
      'FIREBASE_API_KEY': config.firebase.apiKey,
      'FIREBASE_AUTH_DOMAIN': config.firebase.authDomain,
      'FIREBASE_PROJECT_ID': config.firebase.projectId,
      'FIREBASE_STORAGE_BUCKET': config.firebase.storageBucket,
      'FIREBASE_MESSAGING_SENDER_ID': config.firebase.messagingSenderId,
      'FIREBASE_APP_ID': config.firebase.appId,
      'FIREBASE_MEASUREMENT_ID': config.firebase.measurementId || '',
      
      // Business Hours & Services
      'BUSINESS_HOURS': JSON.stringify(config.businessHours, null, 2),
      'SCHEDULE_TEXT': JSON.stringify(config.scheduleText, null, 2),
      'SERVICES_LIST': this.generateServicesList(),
      
      // Metadata
      'GENERATION_DATE': new Date().toLocaleString(),
      
      // Conditional Features (for {{#FEATURE}}...{{/FEATURE}})
      'FEATURE_AUTH': config.features.authentication,
      'FEATURE_LEADERBOARD': config.features.leaderboard,
      'NOTIF_EMAIL': config.notifications.email.enabled,
      'NOTIF_SMS': config.notifications.sms.enabled,
      'NOTIF_WHATSAPP': config.notifications.whatsapp.enabled,
    };
  }

  /**
   * Replace all placeholders in text
   */
  replace(text) {
    let result = text;
    
    // Replace simple {{PLACEHOLDER}} values
    for (const [key, value] of Object.entries(this.replacements)) {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      result = result.replace(regex, value);
    }
    
    // Handle conditional blocks {{#FEATURE}}...{{/FEATURE}}
    result = this.handleConditionals(result);
    
    return result;
  }

  /**
   * Handle conditional blocks in template
   * {{#FEATURE_NAME}}content{{/FEATURE_NAME}}
   */
  handleConditionals(text) {
    let result = text;
    
    // Find all conditional blocks
    const conditionalRegex = /\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g;
    
    result = result.replace(conditionalRegex, (match, featureName, content) => {
      // Check if feature is enabled
      const isEnabled = this.replacements[featureName];
      return isEnabled ? content : '';
    });
    
    return result;
  }

  /**
   * Generate booking description text
   */
  generateBookingDescription() {
    const config = this.config;
    const services = config.services;
    
    if (services.length === 1) {
      return `Each ${services[0].name.toLowerCase()} is ${config.business.currency}${services[0].price}. Times available:`;
    } else {
      return `Check our services below. Times available:`;
    }
  }

  /**
   * Generate services list for README
   */
  generateServicesList() {
    const services = this.config.services;
    const currency = this.config.business.currency;
    
    return services.map(service => 
      `- **${service.name}** (${service.duration} min) - ${currency}${service.price}`
    ).join('\n');
  }

  /**
   * Get font import name for Google Fonts
   */
  getFontImportName(fontFamily) {
    // Extract font name before comma (e.g., "Poppins, sans-serif" -> "Poppins")
    const fontName = fontFamily.split(',')[0].trim().replace(/['"]/g, '');
    
    // Convert to URL-safe format
    return fontName.replace(/\s+/g, '+');
  }

  /**
   * Darken a hex color by a percentage
   */
  darkenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (num >> 16) - percent);
    const g = Math.max(0, ((num >> 8) & 0x00FF) - percent);
    const b = Math.max(0, (num & 0x0000FF) - percent);
    
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
}

/**
 * Load template file from template directory
 */
async function loadTemplate(filename) {
  // Since we can't use fetch() with file:// protocol,
  // we'll generate files programmatically instead
  const config = window.generatedConfig || {};
  
  switch(filename) {
    case 'firebase-config.json':
      return JSON.stringify({
        apiKey: config.firebase?.apiKey || 'YOUR_API_KEY',
        authDomain: config.firebase?.authDomain || 'your-project.firebaseapp.com',
        projectId: config.firebase?.projectId || 'your-project-id',
        storageBucket: config.firebase?.storageBucket || 'your-project.appspot.com',
        messagingSenderId: config.firebase?.messagingSenderId || '123456789',
        appId: config.firebase?.appId || '1:123:web:abc'
      }, null, 2);
      
    case 'availability-config.json':
      return JSON.stringify(config.businessHours || {}, null, 2);
      
    case 'README.md':
      return `# ${config.business?.name || 'Your Business'} Booking System\n\nWelcome to your custom booking system!\n\n## Setup Instructions\n\n1. Upload all files to your Firebase hosting\n2. Configure Firebase authentication\n3. Update the Firebase config if needed\n4. Test your booking system\n\n## Support\n\nFor help, contact: ${config.contact?.email || 'your-email@example.com'}`;
      
    case 'DEPLOYMENT-GUIDE.md':
      return `# Deployment Guide\n\n## Step 1: Install Firebase CLI\n\`\`\`bash\nnpm install -g firebase-tools\n\`\`\`\n\n## Step 2: Login to Firebase\n\`\`\`bash\nfirebase login\n\`\`\`\n\n## Step 3: Deploy\n\`\`\`bash\nfirebase deploy\n\`\`\`\n\nYour site will be live at: https://${config.firebase?.projectId || 'your-project'}.web.app`;
      
    default:
      // For other files, return a basic placeholder
      return `/* ${filename} - Configure this file based on your needs */`;
  }
}

/**
 * Generate all files from templates
 */
async function generateFilesFromTemplates(config) {
  console.log('📦 Generating files from templates...');
  
  // Store config globally so loadTemplate can access it
  window.generatedConfig = config;
  
  const engine = new TemplateEngine(config);
  const files = {};
  
  try {
    // Load and process each template
    const templates = [
      'firebase-config.json',
      'availability-config.json',
      'README.md',
      'DEPLOYMENT-GUIDE.md'
    ];
    
    for (const template of templates) {
      console.log(`  Processing ${template}...`);
      const templateContent = await loadTemplate(template);
      files[template] = templateContent;
    }
    
    console.log('✅ All files generated successfully');
    return files;
    
  } catch (error) {
    console.error('❌ Error generating files:', error);
    throw error;
  }
}

/**
 * Create a ZIP file from generated files
 */
async function createZipPackage(files, businessName) {
  // Note: This requires JSZip library
  // For now, we'll download files individually
  // In production, integrate JSZip for proper ZIP creation
  
  console.log('📦 Creating package...');
  
  // For now, download as individual files
  // TODO: Integrate JSZip for proper ZIP packaging
  
  return files;
}

// Export functions to window
window.addService = addService;
window.removeService = removeService;
window.generateConfig = generateConfig;
window.downloadConfig = downloadConfig;
window.closeModal = closeModal;
window.TemplateEngine = TemplateEngine;
window.generateFilesFromTemplates = generateFilesFromTemplates;


