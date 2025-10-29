#!/usr/bin/env node

/**
 * Import Script for Venues Page Content Type
 * 
 * This script will:
 * 1. Create the venues-page single type in Strapi
 * 2. Optionally add default content
 * 3. Set up public permissions
 * 
 * Usage:
 *   node import-venues-page.js
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

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// Main function
async function importVenuesPage() {
  log('\n╔════════════════════════════════════════════════════════╗', 'bright');
  log('║     Venues Page Content Type Import Script          ║', 'bright');
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
    
    const schemaDir = path.join(__dirname, 'src', 'api', 'venues-page', 'content-types', 'venues-page');
    const schemaPath = path.join(schemaDir, 'schema.json');
    
    // Create directories if they don't exist
    fs.mkdirSync(schemaDir, { recursive: true });
    
    // Read the schema template
    const schemaTemplatePath = path.join(__dirname, 'schema-venues-page.json');
    if (!fs.existsSync(schemaTemplatePath)) {
      throw new Error('Schema template file not found: schema-venues-page.json');
    }
    
    const schema = JSON.parse(fs.readFileSync(schemaTemplatePath, 'utf8'));
    
    // Write the schema file
    fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2), 'utf8');
    logSuccess('Schema file created at: ' + schemaPath);

    // Step 3: Create the controller file
    logStep(3, 'Creating controller...');
    
    const controllerDir = path.join(__dirname, 'src', 'api', 'venues-page', 'controllers');
    const controllerPath = path.join(controllerDir, 'venues-page.js');
    
    fs.mkdirSync(controllerDir, { recursive: true });
    
    const controllerContent = `'use strict';

/**
 * venues-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::venues-page.venues-page');
`;
    
    fs.writeFileSync(controllerPath, controllerContent, 'utf8');
    logSuccess('Controller created at: ' + controllerPath);

    // Step 4: Create the service file
    logStep(4, 'Creating service...');
    
    const serviceDir = path.join(__dirname, 'src', 'api', 'venues-page', 'services');
    const servicePath = path.join(serviceDir, 'venues-page.js');
    
    fs.mkdirSync(serviceDir, { recursive: true });
    
    const serviceContent = `'use strict';

/**
 * venues-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::venues-page.venues-page');
`;
    
    fs.writeFileSync(servicePath, serviceContent, 'utf8');
    logSuccess('Service created at: ' + servicePath);

    // Step 5: Create the route file
    logStep(5, 'Creating routes...');
    
    const routesDir = path.join(__dirname, 'src', 'api', 'venues-page', 'routes');
    const routesPath = path.join(routesDir, 'venues-page.js');
    
    fs.mkdirSync(routesDir, { recursive: true });
    
    const routesContent = `'use strict';

/**
 * venues-page router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::venues-page.venues-page');
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
    
    logInfo('3. Navigate to Content Manager → Venues Page');
    console.log('   (You should see the new single type in the sidebar)\n');
    
    logInfo('4. Add content:');
    console.log('   - Upload a hero background image');
    console.log('   - Fill in the text fields (defaults are pre-filled)');
    console.log('   - Click Save → Publish\n');
    
    logInfo('5. Set permissions:');
    console.log('   Settings → Roles → Public');
    console.log('   Check "find" under venues-page');
    console.log('   Click Save\n');

    logInfo('6. Test the API:');
    console.log('   curl http://localhost:1337/api/venues-page?populate=*\n');

    // Step 7: Check for default data file
    const dataPath = path.join(__dirname, 'data-venues-page.json');
    if (fs.existsSync(dataPath)) {
      log('\n📄 Sample data file found: data-venues-page.json', 'yellow');
      log('   You can reference this for the default values to enter.', 'yellow');
    }

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
importVenuesPage();

