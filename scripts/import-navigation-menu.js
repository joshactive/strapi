const fetch = require('node-fetch');

const STRAPI_URL = 'http://localhost:1337';

const navigationData = {
  datesFindYourNext: [
    { name: 'Tennis Holiday', href: '#' },
    { name: 'UK Tennis Clinic', href: '#' },
    { name: 'Padel Holiday', href: '#' },
    { name: 'Pickleball Holiday', href: '#' },
    { name: 'Play & Watch Event', href: '#' },
    { name: 'School Tennis Tour', href: '#' },
    { name: 'Ski Holiday', href: '#' },
    { name: 'View All Destinations', href: '#' },
  ],
  
  aboutMegaMenuItems: [
    {
      title: 'Meet Active Away',
      description: "Established in 2006, we've welcomed thousands of people to The Active Away family. United through a love of all things 'rackets'.",
      href: '#',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Jamie Murray',
      description: 'The programmes on our tennis events are designed by 7 time grand slam champion Jamie Murray who is the Active Away brand ambassador.',
      href: '#',
      gradient: 'from-teal-500 to-teal-600',
    },
    {
      title: "Dragons' Den",
      description: "You may have seen Active Away on Dragons' Den! Peter Jones is proud to be an investor in Active Away and loves all things tennis.",
      href: '#',
      gradient: 'from-pink-500 to-rose-600',
    },
  ],
  
  destinationsCategories: [
    {
      label: 'Tennis Holidays',
      destinations: [
        { name: 'Cyprus, 5* Aphrodite Hills - Adult', href: '#' },
        { name: 'Corfu, 5* Daphnila Bay - Adult', href: '#' },
        { name: 'Corfu, 5* Ikos Odisia - Adult', href: '#' },
        { name: 'Crete, 5* Lyttos Mare - Adult', href: '#' },
        { name: 'Crete, 5* Royal Mare - Adult', href: '#' },
        { name: 'Dubai, 5* JA Lakeview Hotel - Adult', href: '#' },
        { name: 'Greece, 5* Sani Beach Hotel - Adult', href: '#' },
        { name: 'Kos, 5* Ikos Aria - Adult', href: '#' },
        { name: 'Mallorca, 4* Beach Club - Adult', href: '#' },
        { name: 'Portugal, 5* Hilton Vilamoura - Adult', href: '#' },
        { name: 'Turkey, 5* Corendon Playa Kemer - Adult', href: '#' },
        { name: 'Turkey, 5* Liberty Adult Only - Adult', href: '#' },
        { name: 'Turkey, 5* Liberty Lykia - Adult', href: '#' },
        { name: 'Turkey, 5* Liberty Lykia - Family', href: '#' },
        { name: 'USA, 4* Hilton El Conquistador - Adult', href: '#' },
        { name: 'UK, 4* The Lensbury - Adult', href: '#' },
      ],
    },
    {
      label: 'Tennis Clinics',
      destinations: [
        { name: 'David Lloyd Beaconsfield', href: '#' },
        { name: 'David Lloyd Bristol', href: '#' },
        { name: 'David Lloyd Cheshire Oaks', href: '#' },
        { name: 'David Lloyd Edinburgh', href: '#' },
        { name: 'David Lloyd Finchley', href: '#' },
        { name: 'David Lloyd Hull', href: '#' },
        { name: 'David Lloyd Northwood', href: '#' },
        { name: 'David Lloyd Southampton', href: '#' },
        { name: 'David Lloyd West Bridgford', href: '#' },
        { name: 'David Lloyd Woking', href: '#' },
        { name: "St George's Hill LTC", href: '#' },
      ],
    },
    {
      label: 'Junior Tennis Camps',
      destinations: [
        { name: 'UK, Churchers College - Non-Residential', href: '#' },
        { name: 'UK, Royal Russell - Non-Residential', href: '#' },
      ],
    },
    {
      label: 'Pickleball',
      destinations: [
        { name: 'Crete, 5* Lyttos Mare - Adult Pickleball Holiday', href: '#' },
        { name: 'Portugal, 5* Hilton Vilamoura - Adult Pickleball Holiday', href: '#' },
      ],
    },
    {
      label: 'Play & Watch',
      destinations: [
        { name: 'Spain, Barcelona Open - Adult Play & Watch', href: '#' },
      ],
    },
    {
      label: 'School Tennis Tours',
      destinations: [
        { name: 'Cyprus, 4* Aphrodite Hills - School Tennis Tour', href: '#' },
        { name: 'Greece, 5* Sani Beach - School Tennis Tour', href: '#' },
        { name: 'Mallorca, 4* Beach Club - School Tennis Tour', href: '#' },
        { name: 'Portugal, 5* Hilton Vilamora - School Tennis Tour', href: '#' },
        { name: 'Portugal, 3* Prado Villas - School Tennis Tour', href: '#' },
        { name: 'Spain, 4* Hipotels Barrosa Park - School Tennis Tour', href: '#' },
        { name: 'Spain, 4* Hotel Impressive Granada Golf - School Tennis Tour', href: '#' },
        { name: 'Turkey, 5* Corendon Playa Kemer - School Tennis Tour', href: '#' },
      ],
    },
    {
      label: 'Ski Holidays',
      destinations: [
        { name: 'Italy, 3* Hotel Monterosa - Adult Ski Holiday', href: '#' },
        { name: 'Italy, 4* Hotel Cristallo - Adult Ski Holiday', href: '#' },
      ],
    },
  ],
};

async function importNavigationMenu() {
  console.log('🚀 Starting navigation menu data import...\n');

  // Check if API is accessible
  console.log('🔍 Checking Strapi API access...');
  const testResponse = await fetch(`${STRAPI_URL}/api/navigation-menu`);
  
  if (testResponse.status === 403) {
    console.error('\n❌ API Access Denied!');
    console.error('\n📋 Please enable API permissions:');
    console.error('   1. Go to Settings → Users & Permissions → Roles → Public');
    console.error('   2. Under Permissions → Navigation-menu:');
    console.error('      ✓ Enable "find"');
    console.error('      ✓ Enable "update"');
    console.error('   3. Click Save');
    console.error('   4. Run this script again\n');
    process.exit(1);
  }
  
  if (!testResponse.ok && testResponse.status !== 404) {
    console.error(`\n❌ API Error: ${testResponse.status} ${testResponse.statusText}`);
    console.error('   Make sure Strapi is running: npm run develop\n');
    process.exit(1);
  }

  console.log('✅ API is accessible\n');

  try {
    // Check if navigation menu exists
    const getResponse = await fetch(`${STRAPI_URL}/api/navigation-menu`);
    
    let method = 'POST';
    let url = `${STRAPI_URL}/api/navigation-menu`;
    let action = 'Creating';
    
    if (getResponse.ok) {
      const existing = await getResponse.json();
      if (existing.data) {
        method = 'PUT';
        url = `${STRAPI_URL}/api/navigation-menu`;
        action = 'Updating';
        console.log('📝 Navigation menu exists, updating...');
      }
    } else {
      console.log('📝 Creating new navigation menu...');
    }

    // Prepare the data payload
    const payload = {
      data: {
        datesFindYourNext: navigationData.datesFindYourNext,
        aboutMegaMenuItems: navigationData.aboutMegaMenuItems,
        destinationsCategories: navigationData.destinationsCategories,
        publishedAt: new Date().toISOString(),
      },
    };

    // Create or update navigation menu
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`\n❌ Failed to ${action.toLowerCase()} navigation menu:`);
      console.error(`   Status: ${response.status} ${response.statusText}`);
      console.error(`   Response: ${errorText}\n`);
      
      if (response.status === 403) {
        console.error('   This might be a permissions issue. Check the permissions above.\n');
      }
      
      process.exit(1);
    }

    const result = await response.json();
    console.log(`✅ Navigation menu ${action.toLowerCase()}d successfully!`);

    // Print summary
    console.log('\n📊 Summary:');
    console.log(`   • Dates Find Your Next: ${navigationData.datesFindYourNext.length} items`);
    console.log(`   • About Mega Menu Items: ${navigationData.aboutMegaMenuItems.length} items`);
    console.log(`   • Destination Categories: ${navigationData.destinationsCategories.length} categories`);
    
    let totalDestinations = 0;
    navigationData.destinationsCategories.forEach(cat => {
      totalDestinations += cat.destinations.length;
      console.log(`     - ${cat.label}: ${cat.destinations.length} destinations`);
    });
    console.log(`   • Total Destinations: ${totalDestinations}`);

    console.log('\n🎉 Import complete! Navigation menu is now published and ready to use.');
    console.log('\n💡 Next steps:');
    console.log('   1. Open Strapi Admin: http://localhost:1337/admin');
    console.log('   2. Go to Content Manager → Navigation Menu');
    console.log('   3. Add images for the 3 About menu items');
    console.log('   4. Save and Publish\n');

  } catch (error) {
    console.error('❌ Error importing navigation menu:', error);
    throw error;
  }
}

// Run the import
importNavigationMenu().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

