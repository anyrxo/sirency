/**
 * ADVANCED SEO ENHANCEMENTS
 * Comprehensive SEO optimization for SirenCY
 */

(function() {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    enhanceMetaTags();
    addStructuredData();
    addBreadcrumbs();
    optimizeImages();
    addFAQSchema();
  }

  function enhanceMetaTags() {
    // Enhanced meta descriptions with keywords
    const metaUpdates = {
      'description': 'SirenCY - #1 OnlyFans Agency for Creator Growth | Scale from $0 to $130k/month with proven TikTok, Instagram & OnlyFans marketing strategies. Elite creator management, 24/7 chatting, professional account optimization. Join 100+ successful creators.',
      'keywords': 'onlyfans management agency, onlyfans growth, creator management, onlyfans marketing, content creator agency, onlyfans chatting service, tiktok growth, instagram growth, social media management, creator income, onlyfans success, subscription growth, fan engagement, creator monetization'
    };

    Object.keys(metaUpdates).forEach(name => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', metaUpdates[name]);
    });

    // Enhanced Open Graph tags
    const ogUpdates = {
      'og:title': 'SirenCY | #1 OnlyFans Growth Agency - $0 to $130k/Month',
      'og:description': 'Transform your OnlyFans with SirenCY. Proven strategies used by top creators making $100k+/month. Expert management, marketing & 24/7 support. Apply now.',
      'og:url': 'https://www.sirency.com',
      'og:site_name': 'SirenCY',
      'og:locale': 'en_US',
      'og:image': 'https://www.sirency.com/images/sirency-og-image.jpg',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': 'SirenCY - Elite OnlyFans Creator Management Agency'
    };

    Object.keys(ogUpdates).forEach(property => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', ogUpdates[property]);
    });

    // Enhanced Twitter Card tags
    const twitterUpdates = {
      'twitter:card': 'summary_large_image',
      'twitter:title': 'SirenCY | Scale Your OnlyFans to $100k+/Month',
      'twitter:description': 'Elite OnlyFans management agency. Proven growth strategies, professional chatting, 24/7 support. Join 100+ successful creators making six figures.',
      'twitter:image': 'https://www.sirency.com/images/sirency-twitter-card.jpg',
      'twitter:image:alt': 'SirenCY OnlyFans Growth Agency',
      'twitter:site': '@sirency',
      'twitter:creator': '@sirency'
    };

    Object.keys(twitterUpdates).forEach(name => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', twitterUpdates[name]);
    });

    // Additional SEO meta tags
    const additionalMeta = {
      'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      'googlebot': 'index, follow',
      'bingbot': 'index, follow',
      'author': 'SirenCY',
      'rating': 'general',
      'revisit-after': '7 days',
      'language': 'English',
      'geo.region': 'US',
      'geo.placename': 'United States',
      'theme-color': '#00CCAA'
    };

    Object.keys(additionalMeta).forEach(name => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', additionalMeta[name]);
    });
  }

  function addStructuredData() {
    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SirenCY",
      "alternateName": "SirenCY Agency",
      "url": "https://www.sirency.com",
      "logo": "https://www.sirency.com/images/Logo-1-1.svg",
      "description": "Elite OnlyFans creator management and growth agency. Proven strategies to scale creators from $0 to $130k+ per month.",
      "sameAs": [
        "https://twitter.com/sirency",
        "https://instagram.com/sirency",
        "https://www.tiktok.com/@sirency"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "availableLanguage": ["English"]
      }
    };

    // Professional Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "SirenCY - OnlyFans Growth Agency",
      "image": "https://www.sirency.com/images/Logo-1-1.svg",
      "url": "https://www.sirency.com",
      "telephone": "",
      "priceRange": "$$$$",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "37.7749",
        "longitude": "-122.4194"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    // Service Offered Schema
    const servicesOfferedSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "OnlyFans Management & Growth",
      "provider": {
        "@type": "Organization",
        "name": "SirenCY"
      },
      "areaServed": "Worldwide",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "OnlyFans Growth Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "OnlyFans Account Management",
              "description": "Full-service OnlyFans account management including content strategy, posting, and engagement"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Social Media Marketing",
              "description": "TikTok, Instagram, and Twitter growth strategies to drive traffic to OnlyFans"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "24/7 Fan Chatting",
              "description": "Professional chatting service to maximize subscriber retention and tips"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Content Optimization",
              "description": "Strategic content planning and optimization for maximum engagement and revenue"
            }
          }
        ]
      }
    };

    // WebSite Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "SirenCY",
      "url": "https://www.sirency.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.sirency.com/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    // Insert all schemas
    const schemas = [
      organizationSchema,
      serviceSchema,
      servicesOfferedSchema,
      websiteSchema
    ];

    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `schema-${index}`;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }

  function addBreadcrumbs() {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.sirency.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "How We Work",
          "item": "https://www.sirency.com#how-we-work"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Case Studies",
          "item": "https://www.sirency.com#case-study"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'breadcrumb-schema';
    script.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);
  }

  function optimizeImages() {
    // Add alt text to images missing it
    const images = document.querySelectorAll('img:not([alt]), img[alt=""]');
    images.forEach((img, index) => {
      const src = img.src || img.getAttribute('src') || '';
      const filename = src.split('/').pop().split('.')[0];

      // Generate descriptive alt text based on context
      let altText = 'SirenCY';

      if (filename.includes('dani') || filename.includes('Danii')) {
        altText = 'SirenCY Success Story - Creator earning six figures monthly';
      } else if (filename.includes('chelsea') || filename.includes('Chelsea')) {
        altText = 'SirenCY Creator Success - $130k per month';
      } else if (filename.includes('logo') || filename.includes('Logo')) {
        altText = 'SirenCY - Elite OnlyFans Management Agency Logo';
      } else if (img.classList.contains('instaimage')) {
        altText = 'SirenCY Managed Creator - OnlyFans Success Story';
      } else if (img.classList.contains('member-image')) {
        const memberName = img.closest('.member')?.querySelector('.member-name')?.textContent || '';
        altText = memberName ? `${memberName} - SirenCY Creator` : 'SirenCY Elite Creator Member';
      } else {
        altText = 'SirenCY OnlyFans Growth and Management Services';
      }

      img.setAttribute('alt', altText);
      img.setAttribute('loading', 'lazy');
    });
  }

  function addFAQSchema() {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much can I make with SirenCY?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our creators typically scale from $2k-5k/month to $50k-$130k/month. Results vary based on your current following, content quality, and consistency. We've helped creators go from $0 to $130k/month in under a year."
          }
        },
        {
          "@type": "Question",
          "name": "What services does SirenCY provide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SirenCY provides full-service OnlyFans management including: account optimization, content strategy, TikTok/Instagram/Twitter marketing, professional 24/7 fan chatting, subscriber growth campaigns, and revenue optimization. We handle everything so you can focus on creating content."
          }
        },
        {
          "@type": "Question",
          "name": "How does SirenCY grow my OnlyFans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use proven marketing strategies across TikTok, Instagram, and Twitter to drive targeted traffic to your OnlyFans. Our team optimizes your content funnel, manages your DMs professionally, and implements conversion strategies that turn free followers into paying subscribers."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to see results?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most creators see measurable growth within the first 30 days. Significant income increases (5-10x) typically occur within 3-6 months. Our fastest growing creator went from $0 to $130k/month in under 12 months."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need a large following to work with SirenCY?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. We've helped creators start from zero followers and scale to six figures. While a larger following helps, our proven system works regardless of your current audience size. We focus on quality over quantity."
          }
        },
        {
          "@type": "Question",
          "name": "What makes SirenCY different from other agencies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SirenCY uses data-driven, proprietary growth strategies developed since 2023. We don't just manage accounts - we build revenue-generating systems. Our professional chatting team, proven marketing funnels, and consistent results (average 500%+ income increase) set us apart."
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);
  }
})();
