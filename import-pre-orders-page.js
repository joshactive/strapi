#!/usr/bin/env node

/**
 * Import Script for Pre-Orders Page Content Type
 * 
 * This script will:
 * 1. Create the pre-orders-page single type in Strapi
 * 2. Set up all required files (schema, controller, service, routes)
 * 
 * Usage:
 *   node import-pre-orders-page.js
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n${step}. ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// Main function
async function importPreOrdersPage() {
  log('\n╔════════════════════════════════════════════════════════╗', 'bright');
  log('║   Pre-Orders Page Content Type Import Script        ║', 'bright');
  log('╚════════════════════════════════════════════════════════╝', 'bright');

  try {
    // Step 1: Check if Strapi is installed
    logStep(1, 'Checking Strapi installation...');
    
    const packageJsonPath = path.join(__dirname, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('package.json not found. Are you in the Strapi root directory?');
    }
    
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (!packageJson.dependencies || !packageJson.dependencies['@strapi/strapi']) {
      throw new Error('This does not appear to be a Strapi project');
    }
    
    logSuccess('Strapi installation verified');

    // Step 2: Create the schema file
    logStep(2, 'Creating content type schema...');
    
    const schemaDir = path.join(__dirname, 'src', 'api', 'pre-orders-page', 'content-types', 'pre-orders-page');
    const schemaPath = path.join(schemaDir, 'schema.json');
    
    // Create directories if they don't exist
    fs.mkdirSync(schemaDir, { recursive: true });
    
    // Read the schema template
    const schemaTemplatePath = path.join(__dirname, 'schema-pre-orders-page.json');
    if (!fs.existsSync(schemaTemplatePath)) {
      throw new Error('Schema template file not found: schema-pre-orders-page.json');
    }
    
    const schema = JSON.parse(fs.readFileSync(schemaTemplatePath, 'utf8'));
    
    // Write the schema file
    fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2), 'utf8');
    logSuccess('Schema file created at: ' + schemaPath);

    // Step 3: Create the controller file
    logStep(3, 'Creating controller...');
    
    const controllerDir = path.join(__dirname, 'src', 'api', 'pre-orders-page', 'controllers');
    const controllerPath = path.join(controllerDir, 'pre-orders-page.js');
    
    fs.mkdirSync(controllerDir, { recursive: true });
    
    const controllerContent = `'use strict';

/**
 * pre-orders-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::pre-orders-page.pre-orders-page');
`;
    
    fs.writeFileSync(controllerPath, controllerContent, 'utf8');
    logSuccess('Controller created at: ' + controllerPath);

    // Step 4: Create the service file
    logStep(4, 'Creating service...');
    
    const serviceDir = path.join(__dirname, 'src', 'api', 'pre-orders-page', 'services');
    const servicePath = path.join(serviceDir, 'pre-orders-page.js');
    
    fs.mkdirSync(serviceDir, { recursive: true });
    
    const serviceContent = `'use strict';

/**
 * pre-orders-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pre-orders-page.pre-orders-page');
`;
    
    fs.writeFileSync(servicePath, serviceContent, 'utf8');
    logSuccess('Service created at: ' + servicePath);

    // Step 5: Create the route file
    logStep(5, 'Creating routes...');
    
    const routesDir = path.join(__dirname, 'src', 'api', 'pre-orders-page', 'routes');
    const routesPath = path.join(routesDir, 'pre-orders-page.js');
    
    fs.mkdirSync(routesDir, { recursive: true });
    
    const routesContent = `'use strict';

/**
 * pre-orders-page router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::pre-orders-page.pre-orders-page');
`;
    
    fs.writeFileSync(routesPath, routesContent, 'utf8');
    logSuccess('Routes created at: ' + routesPath);

    // Step 6: Instructions for adding content
    logStep(6, 'Setup complete! Next steps:');
    
    log('\n📋 To complete the setup:\n', 'bright');
    logInfo('1. Restart Strapi:');
    console.log('   npm run develop\n');
    
    logInfo('2. Go to Strapi Admin:');
    console.log('   http://localhost:1337/admin\n');
    
    logInfo('3. Navigate to Content Manager → Pre-Orders Page');
    console.log('   (You should see the new single type in the sidebar)\n');
    
    logInfo('4. Add content:');
    console.log('   - Upload a hero background image (1920x1080px recommended)');
    console.log('   - Hero Kicker: "EXCLUSIVE OPPORTUNITIES"');
    console.log('   - Hero Title: "Pre-Orders"');
    console.log('   - Hero Subtitle: "Be the first to secure your spot..."');
    console.log('   - Meta Title: "Pre-Orders - Active Away"');
    console.log('   - Meta Description: (SEO description, max 160 chars)');
    console.log('   - Click Save → Publish\n');
    
    logInfo('5. Set permissions:');
    console.log('   Settings → Roles → Public');
    console.log('   Check "find" under pre-orders-page');
    console.log('   Click Save\n');

    logInfo('6. Test the API:');
    console.log('   curl http://localhost:1337/api/pre-orders-page?populate=*\n');

    log('\n╔════════════════════════════════════════════════════════╗', 'green');
    log('║              ✅ Import Successful!                     ║', 'green');
    log('╚════════════════════════════════════════════════════════╝', 'green');

  } catch (error) {
    logError(`\nImport failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// Run the import
importPreOrdersPage();

