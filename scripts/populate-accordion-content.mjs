/**
 * Populate Accordion Content in Strapi Home
 * This script adds the temporary accordion content from the frontend to Strapi
 */

import 'dotenv/config';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';

const accordionData = {
  accordionTitle: "Tennis Holiday Experts",
  
  accordion1Title: "Tennis Holidays",
  accordion1Content: "Tennis Holidays are an immersive experience that unite people through their shared love for tennis in stunning destinations with world-class Tennis Courts. We've put together some incredible Tennis Breaks that will fulfil your dreams and create lasting memories. You'll have seen Active Away Tennis Holidays on Dragons' Den! Why not start by exploring our Tennis Holidays Dates to find your dream Tennis Holiday.",
  
  accordion2Title: "What is a Tennis Holiday?",
  accordion2Content: "A tennis holiday is a specialized vacation experience that combines travel with tennis coaching, playing opportunities, and social activities. It's designed for tennis enthusiasts who want to improve their game while enjoying beautiful destinations.",
  
  accordion3Title: "Why book your Tennis Holidays with Active Away?",
  accordion3Content: "Active Away offers unique tennis holidays crafted by doubles champion Jamie Murray, featuring world-class coaching, stunning destinations, and personalized attention from our expert hosts.",
  
  accordion4Title: "Luxury Tennis Holiday Camps",
  accordion4Content: "Our luxury tennis holiday camps provide premium accommodation, top-tier coaching facilities, and exclusive experiences in some of the world's most beautiful tennis destinations.",
  
  accordion5Title: "Adult Only Tennis Holidays",
  accordion5Content: "Our adult-only tennis holidays offer a sophisticated environment for mature players to enjoy focused coaching, competitive play, and social activities without distractions.",
  
  accordion6Title: "Padel Tennis Holidays",
  accordion6Content: "Experience the exciting world of padel tennis with our specialized holidays that combine traditional tennis with the fast-paced, social nature of padel in stunning locations.",
  
  accordion7Title: "Tennis Coaching Holidays Abroad",
  accordion7Content: "Tennis Holidays are an immersive experience that unite people through their shared love for tennis in stunning destinations with world-class Tennis Courts. We've put together some incredible Tennis Breaks that will fulfil your dreams and create lasting memories. You'll have seen Active Away Tennis Holidays on Dragons' Den! Why not start by exploring our Tennis Holidays Dates to find your dream Tennis Holiday.",
  
  accordion8Title: "Tennis Holidays in Europe",
  accordion8Content: "Discover Europe's finest tennis destinations with our carefully curated holidays that showcase the continent's most beautiful courts, from Mediterranean coastlines to Alpine resorts.",
  
  accordion9Title: "Tennis Holidays for Singles",
  accordion9Content: "Our singles tennis holidays are perfect for solo travelers looking to meet like-minded tennis enthusiasts while enjoying world-class coaching and beautiful destinations.",
  
  accordion10Title: "Tennis Holidays Deals",
  accordion10Content: "Take advantage of our special offers and early bird discounts on tennis holidays throughout the year. We regularly update our deals to provide the best value for tennis enthusiasts.",
  
  accordion11Title: "Pickleball Holidays",
  accordion11Content: "Join our growing community of pickleball enthusiasts with holidays that combine this exciting sport with beautiful destinations and expert coaching.",
  
  accordion12Title: "Tennis Holiday Links",
  accordion12Content: "Access all our tennis holiday resources, including booking information, destination guides, coaching schedules, and special offers in one convenient location."
};

async function populateAccordions() {
  console.log('🎯 Starting accordion content population...\n');
  
  if (!STRAPI_TOKEN) {
    console.error('❌ STRAPI_API_TOKEN not found in environment');
    process.exit(1);
  }

  try {
    console.log('📡 Updating Home content type with accordion data...');
    
    const response = await fetch(`${STRAPI_URL}/api/home`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify({
        data: accordionData
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error (${response.status}): ${error}`);
    }

    const result = await response.json();
    console.log('✅ Accordion content updated successfully!\n');
    
    console.log('📋 Summary:');
    console.log(`   - Title: "${accordionData.accordionTitle}"`);
    console.log(`   - Accordions populated: 12`);
    console.log('');
    
    // Display accordion titles
    console.log('🎉 Accordions Added:');
    console.log(`   1. ${accordionData.accordion1Title}`);
    console.log(`   2. ${accordionData.accordion2Title}`);
    console.log(`   3. ${accordionData.accordion3Title}`);
    console.log(`   4. ${accordionData.accordion4Title}`);
    console.log(`   5. ${accordionData.accordion5Title}`);
    console.log(`   6. ${accordionData.accordion6Title}`);
    console.log(`   7. ${accordionData.accordion7Title}`);
    console.log(`   8. ${accordionData.accordion8Title}`);
    console.log(`   9. ${accordionData.accordion9Title}`);
    console.log(`   10. ${accordionData.accordion10Title}`);
    console.log(`   11. ${accordionData.accordion11Title}`);
    console.log(`   12. ${accordionData.accordion12Title}`);
    console.log('');
    
    console.log('✨ All done! Your accordion content is now in Strapi.');
    console.log('🌐 You can view it at:', `${STRAPI_URL}/admin/content-manager/singleType/api::home.home`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

populateAccordions();

