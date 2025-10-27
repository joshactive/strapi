#!/usr/bin/env node

const STRAPI_URL = 'https://strapi-production-b96d.up.railway.app';
const STRAPI_TOKEN = 'eefa701cf9f771a8825d61d29bd6b31ce72ef83549d9c7f56e5e1f52ac208aef3e644a61772ba13cfc6ddffd201d662342f1ac04e02f4bf448bd2804aefaea0003efd6e75b2cd3cfcfdab8c2077656d2c0eda3f161630ee00d59935e818bfb1e1835165fbfdb4b38224d54a221346cbcfcfff174f228e0b94e403f571e6355a0';

async function testAPIPopulate() {
  try {
    console.log('Testing API populate for padel-tennis-holiday entry...\n');

    // Test 1: Get the featured location without populate
    const url1 = `${STRAPI_URL}/api/featured-locations/jsdwm90mh0h227do63i2vhgd`;
    console.log(`🔗 Request 1 (no populate): ${url1}`);
    
    const response1 = await fetch(url1, {
      headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
    });
    const data1 = await response1.json();
    console.log('Response 1:', JSON.stringify(data1, null, 2));

    // Test 2: Get the featured location WITH populate
    const url2 = `${STRAPI_URL}/api/featured-locations/jsdwm90mh0h227do63i2vhgd?populate[padel_tennis_holiday][populate]=headerImage`;
    console.log(`\n🔗 Request 2 (with populate): ${url2}`);
    
    const response2 = await fetch(url2, {
      headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
    });
    const data2 = await response2.json();
    console.log('Response 2:', JSON.stringify(data2, null, 2));

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAPIPopulate();

