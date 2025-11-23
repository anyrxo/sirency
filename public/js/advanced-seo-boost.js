/**
 * ADVANCED SEO BOOST - ENTERPRISE LEVEL
 * Next-generation SEO optimization for SirenCY
 * Goes beyond standard SEO implementation
 */

(function() {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log('🚀 Initializing Advanced SEO Boost...');

    addAdvancedMetaTags();
    addVideoSchema();
    addTestimonialSchema();
    addServiceSchema();
    addLocalBusinessSchema();
    addBreadcrumbSchema();
    addPersonSchema();
    addCourseSchema();
    addHowToSchema();
    addEventSchema();
    addProductSchema();
    enhanceImageSEO();
    addAlternateLanguages();
    addMobileAppLinks();
    addRichSnippets();

    console.log('✅ Advanced SEO Boost Complete!');
  }

  // ===================================
  // ADVANCED META TAGS
  // ===================================
  function addAdvancedMetaTags() {
    const advancedMeta = {
      // Google-specific
      'google': 'notranslate',
      'google-site-verification': '', // Add your verification code

      // Mobile-specific
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title': 'SirenCY',
      'application-name': 'SirenCY',

      // Microsoft-specific
      'msapplication-TileColor': '#00CCAA',
      'msapplication-TileImage': '/images/favicon.png',
      'msapplication-config': '/browserconfig.xml',

      // Security
      'referrer': 'origin-when-cross-origin',

      // Content classification
      'classification': 'Business, Marketing, Creator Economy',
      'coverage': 'Worldwide',
      'distribution': 'Global',
      'target': 'all',

      // Additional keywords (LSI - Latent Semantic Indexing)
      'news_keywords': 'OnlyFans, Creator Economy, Digital Marketing, Influencer Management, Content Monetization, Social Media Growth',

      // Article metadata
      'article:author': 'SirenCY Team',
      'article:publisher': 'https://www.sirency.com',

      // Business classification
      'business:contact_data:street_address': '470 St Kilda Rd',
      'business:contact_data:locality': 'Melbourne',
      'business:contact_data:region': 'VIC',
      'business:contact_data:postal_code': '3004',
      'business:contact_data:country_name': 'Australia',
    };

    Object.keys(advancedMeta).forEach(name => {
      if (advancedMeta[name]) { // Skip empty values
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', advancedMeta[name]);
      }
    });

    // Add Open Graph advanced tags
    const ogAdvanced = {
      'og:type': 'website',
      'og:updated_time': new Date().toISOString(),
      'og:locale:alternate': 'en_GB',
      'og:video': 'https://www.sirency.com/videos/Hero--Video.mp4',
      'og:video:type': 'video/mp4',
      'og:video:width': '1920',
      'og:video:height': '1080',
    };

    Object.keys(ogAdvanced).forEach(property => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', ogAdvanced[property]);
    });
  }

  // ===================================
  // VIDEO SCHEMA
  // ===================================
  function addVideoSchema() {
    const videoSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "SirenCY - Transform Your OnlyFans Success",
      "description": "See how SirenCY helps creators scale from $0 to $130k/month with proven strategies",
      "thumbnailUrl": "https://www.sirency.com/videos/Hero--Video-poster-00001.jpg",
      "uploadDate": "2024-12-01T00:00:00Z",
      "duration": "PT1M30S",
      "contentUrl": "https://www.sirency.com/videos/Hero--Video.mp4",
      "embedUrl": "https://www.sirency.com/",
      "publisher": {
        "@type": "Organization",
        "name": "SirenCY",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.sirency.com/images/Logo-1-1.svg"
        }
      }
    };

    insertSchema(videoSchema, 'video-schema');
  }

  // ===================================
  // TESTIMONIAL / REVIEW SCHEMA
  // ===================================
  function addTestimonialSchema() {
    const testimonials = [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Chelsea"
        },
        "reviewBody": "I started with nothing—no followers, no strategy, no clue what to do. Then I found SirenCY. They didn't just give me a plan—they gave me a system that works. Within months, I went from $0 to $130K/month, and I'm still growing.",
        "datePublished": "2024-10-01"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Anonymous Creator"
        },
        "reviewBody": "Before SirenCY, I thought maybe I just wasn't cut out for this. Turns out, my content was fine. My strategy wasn't. They fixed what I couldn't see. Now I'm making consistent income that keeps growing with 3,000 new subscribers every week.",
        "datePublished": "2024-09-15"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Ruby"
        },
        "reviewBody": "My last agency made me doubt myself. SirenCY showed me I wasn't the problem. Every minute I check and there's a new subscriber. It's consistent. It's predictable. And it works.",
        "datePublished": "2024-08-20"
      }
    ];

    const testimonialSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SirenCY",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": testimonials
    };

    insertSchema(testimonialSchema, 'testimonial-schema');
  }

  // ===================================
  // DETAILED SERVICE SCHEMA
  // ===================================
  function addServiceSchema() {
    const services = [
      {
        "@type": "Service",
        "name": "OnlyFans Account Management",
        "description": "Full-service OnlyFans account management with professional chatting, content strategy, and revenue optimization",
        "provider": {
          "@type": "Organization",
          "name": "SirenCY"
        },
        "serviceType": "Account Management",
        "areaServed": "Worldwide",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "price": "Contact for pricing",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "Service",
        "name": "Social Media Marketing & Growth",
        "description": "TikTok, Instagram, and Twitter growth strategies to drive traffic and subscribers to your OnlyFans",
        "provider": {
          "@type": "Organization",
          "name": "SirenCY"
        },
        "serviceType": "Social Media Marketing",
        "areaServed": "Worldwide"
      },
      {
        "@type": "Service",
        "name": "24/7 Professional Fan Chatting",
        "description": "Expert chatting service to maximize subscriber retention, tips, and revenue",
        "provider": {
          "@type": "Organization",
          "name": "SirenCY"
        },
        "serviceType": "Chatting Service",
        "areaServed": "Worldwide"
      }
    ];

    insertSchema({ "@context": "https://schema.org", "@graph": services }, 'services-schema');
  }

  // ===================================
  // LOCAL BUSINESS SCHEMA
  // ===================================
  function addLocalBusinessSchema() {
    const localBusiness = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "SirenCY",
      "image": "https://www.sirency.com/images/Logo-1-1.svg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "470 St Kilda Rd",
        "addressLocality": "Melbourne",
        "addressRegion": "VIC",
        "postalCode": "3004",
        "addressCountry": "AU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-37.8456",
        "longitude": "144.9785"
      },
      "url": "https://www.sirency.com",
      "telephone": "",
      "email": "sirenxmedia@gmail.com",
      "priceRange": "$$$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      ],
      "sameAs": [
        "https://twitter.com/sirency",
        "https://instagram.com/sirency",
        "https://www.tiktok.com/@sirency"
      ]
    };

    insertSchema(localBusiness, 'local-business-schema');
  }

  // ===================================
  // BREADCRUMB SCHEMA
  // ===================================
  function addBreadcrumbSchema() {
    const pathname = window.location.pathname;
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.sirency.com"
        }
      ]
    };

    // Add current page to breadcrumb
    if (pathname.includes('privacy')) {
      breadcrumbList.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Privacy Policy",
        "item": "https://www.sirency.com/privacy-policy.html"
      });
    } else if (pathname.includes('terms')) {
      breadcrumbList.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Terms and Conditions",
        "item": "https://www.sirency.com/terms-and-conditions.html"
      });
    }

    insertSchema(breadcrumbList, 'breadcrumb-schema-advanced');
  }

  // ===================================
  // PERSON SCHEMA (Team Members)
  // ===================================
  function addPersonSchema() {
    const team = [
      { name: "Daniela Tabares", social: "@danitabares06", role: "Creator Partner" },
      { name: "Telari Love", social: "@Telarixlove", role: "Creator Partner" },
      { name: "Tiffany Stanley", social: "@tiffanystanley1", role: "Creator Partner" },
      { name: "Chelsea", social: "@chelseax0xo", role: "Creator Partner" }
    ];

    const personSchemas = team.map(person => ({
      "@type": "Person",
      "name": person.name,
      "jobTitle": person.role,
      "worksFor": {
        "@type": "Organization",
        "name": "SirenCY"
      },
      "sameAs": `https://instagram.com/${person.social.replace('@', '')}`
    }));

    insertSchema({ "@context": "https://schema.org", "@graph": personSchemas }, 'team-schema');
  }

  // ===================================
  // COURSE/EDUCATIONAL CONTENT SCHEMA
  // ===================================
  function addCourseSchema() {
    const course = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "OnlyFans Growth Mastery by SirenCY",
      "description": "Learn the proven strategies that helped creators scale from $0 to $130k+/month",
      "provider": {
        "@type": "Organization",
        "name": "SirenCY",
        "sameAs": "https://www.sirency.com"
      },
      "coursePrerequisites": "OnlyFans account",
      "educationalLevel": "All Levels",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "courseWorkload": "PT40H"
      }
    };

    insertSchema(course, 'course-schema');
  }

  // ===================================
  // HOW-TO SCHEMA
  // ===================================
  function addHowToSchema() {
    const howTo = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Scale Your OnlyFans to Six Figures with SirenCY",
      "description": "Step-by-step guide to growing your OnlyFans income from $0 to $100k+/month",
      "totalTime": "PT6M",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Apply to SirenCY",
          "text": "Submit your application through our online form",
          "url": "https://form.typeform.com/to/msWwMM4D"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Get Onboarded",
          "text": "Work with our team to set up your account and strategy"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Launch Marketing Campaigns",
          "text": "We deploy proven TikTok, Instagram, and Twitter strategies to drive traffic"
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Scale and Optimize",
          "text": "Watch your subscriber count and income grow as we continuously optimize"
        }
      ]
    };

    insertSchema(howTo, 'howto-schema');
  }

  // ===================================
  // EVENT SCHEMA
  // ===================================
  function addEventSchema() {
    // Example: If you have webinars or live events
    const event = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Creator Success Webinar",
      "description": "Learn how top creators are scaling to six figures",
      "startDate": "2025-11-01T18:00:00-05:00",
      "endDate": "2025-11-01T19:30:00-05:00",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
      "location": {
        "@type": "VirtualLocation",
        "url": "https://www.sirency.com"
      },
      "organizer": {
        "@type": "Organization",
        "name": "SirenCY",
        "url": "https://www.sirency.com"
      }
    };

    // Only add if you have actual events
    // insertSchema(event, 'event-schema');
  }

  // ===================================
  // PRODUCT SCHEMA (Service as Product)
  // ===================================
  function addProductSchema() {
    const product = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "SirenCY Creator Management Service",
      "description": "Elite OnlyFans management and growth service - Scale from $0 to $130k+/month",
      "brand": {
        "@type": "Brand",
        "name": "SirenCY"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://www.sirency.com",
        "priceCurrency": "USD",
        "price": "Contact for pricing",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "SirenCY"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    insertSchema(product, 'product-schema');
  }

  // ===================================
  // ENHANCE IMAGE SEO
  // ===================================
  function enhanceImageSEO() {
    const images = document.querySelectorAll('img');

    images.forEach((img, index) => {
      const src = img.src || img.getAttribute('src') || '';
      const filename = src.split('/').pop().split('.')[0];

      // Add title attribute if missing
      if (!img.title) {
        let title = 'SirenCY';

        if (filename.toLowerCase().includes('logo')) {
          title = 'SirenCY - Elite OnlyFans Management Agency';
        } else if (img.closest('.member')) {
          const memberName = img.closest('.member')?.querySelector('.member-name')?.textContent || '';
          title = `${memberName} - Successful SirenCY Creator`;
        } else if (filename.toLowerCase().includes('chelsea')) {
          title = 'Chelsea - $0 to $130k/month Success Story';
        }

        img.title = title;
      }

      // Add loading="lazy" if not hero image
      if (!img.closest('.herosection') && !img.hasAttribute('loading')) {
        img.loading = 'lazy';
      }

      // Add width and height for CLS (Cumulative Layout Shift)
      if (img.naturalWidth && !img.hasAttribute('width')) {
        img.width = img.naturalWidth;
        img.height = img.naturalHeight;
      }
    });
  }

  // ===================================
  // ALTERNATE LANGUAGES (Future-proof)
  // ===================================
  function addAlternateLanguages() {
    // Add hreflang tags for international SEO
    const alternates = [
      { lang: 'en', href: 'https://www.sirency.com' },
      { lang: 'x-default', href: 'https://www.sirency.com' }
      // Add more when you have international versions:
      // { lang: 'es', href: 'https://www.sirency.com/es' },
      // { lang: 'fr', href: 'https://www.sirency.com/fr' }
    ];

    alternates.forEach(alt => {
      let link = document.querySelector(`link[hreflang="${alt.lang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = alt.lang;
        link.href = alt.href;
        document.head.appendChild(link);
      }
    });
  }

  // ===================================
  // MOBILE APP LINKS (Future-proof)
  // ===================================
  function addMobileAppLinks() {
    // iOS App Links (when you have an app)
    const iosAppLinks = {
      'apple-itunes-app': 'app-id=YOUR_APP_ID', // Replace when you have iOS app
      'al:ios:url': 'sirency://open',
      'al:ios:app_store_id': 'YOUR_APP_ID',
      'al:ios:app_name': 'SirenCY'
    };

    // Android App Links
    const androidAppLinks = {
      'al:android:url': 'sirency://open',
      'al:android:package': 'com.sirency.app',
      'al:android:app_name': 'SirenCY'
    };

    // Don't add these until you actually have apps
    // Object.keys(iosAppLinks).forEach(name => { ... });
  }

  // ===================================
  // RICH SNIPPETS
  // ===================================
  function addRichSnippets() {
    // Add speakable content for voice search
    const speakable = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".heading-80", ".heading-81", ".heading-82", ".pricetext"]
      }
    };

    insertSchema(speakable, 'speakable-schema');
  }

  // ===================================
  // HELPER FUNCTION
  // ===================================
  function insertSchema(schema, id) {
    if (document.getElementById(id)) return; // Already exists

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }

})();
