const fs = require('fs');
const path = require('path');

// Blog posts data with categories (same as blog.html)
const blogPosts = {
  "audit-onlyfans-agency.html": { category: "agency", title: "How to Audit Your OnlyFans Agency" },
  "best-link-in-bio-tools-onlyfans-2025.html": { category: "strategy", title: "Best Link-in-Bio Tools for OnlyFans Creators 2025" },
  "onlyfans-girl-next-door-niche-complete-guide-2025.html": { category: "niches", title: "Girl Next Door OnlyFans Niche Guide 2025" },
  "onlyfans-domme-findom-niche-complete-guide-2025.html": { category: "niches", title: "Domme/Findom OnlyFans Niche Guide 2025" },
  "onlyfans-trans-niche-complete-guide-2025.html": { category: "niches", title: "Trans OnlyFans Niche Guide 2025" },
  "onlyfans-egirl-niche-complete-guide-2025.html": { category: "niches", title: "E-Girl OnlyFans Niche Guide 2025" },
  "onlyfans-altgirl-niche-complete-guide-2025.html": { category: "niches", title: "Alt Girl OnlyFans Niche Guide 2025" },
  "onlyfans-cosplay-niche-complete-guide-2025.html": { category: "niches", title: "Cosplay OnlyFans Niche Guide 2025" }
};

const backButtonHTML = `    <style>
        .back-button {
            position: fixed;
            top: 80px;
            left: 20px;
            z-index: 999;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            color: white;
            padding: 12px 20px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .back-button:hover {
            background: rgba(255, 23, 68, 0.9);
            transform: translateX(-5px);
            box-shadow: 0 4px 20px rgba(255, 23, 68, 0.4);
        }

        @media (max-width: 768px) {
            .back-button {
                top: 70px;
                left: 10px;
                padding: 10px 16px;
                font-size: 0.85rem;
            }
        }
    </style>
</head>`;

const backButtonElement = `<body>
    <a href="../blog.html" class="back-button">
        <span>←</span> Back to Blog
    </a>`;

function getRelatedPostsHTML(currentFile, category) {
    // Get all posts in same category
    const relatedPosts = [];
    for (const [filename, data] of Object.entries(blogPosts)) {
        if (filename !== currentFile && data.category === category) {
            relatedPosts.push({ filename, ...data });
        }
    }

    // Shuffle and take first 3
    const shuffled = relatedPosts.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(3, shuffled.length));

    if (selected.length === 0) return '';

    let html = `
        <div style="margin-top: 4rem; padding: 2rem; background: #f8f9fa; border-radius: 12px; border-left: 4px solid #ff1744;">
            <h3 style="margin-top: 0; color: #000; font-size: 1.5rem;">Related Articles</h3>
            <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-top: 1.5rem;">`;

    selected.forEach(post => {
        html += `
                <a href="${post.filename}" style="text-decoration: none; color: inherit; display: block; padding: 1.2rem; background: white; border-radius: 8px; border: 1px solid #e0e0e0; transition: all 0.3s ease;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #ff1744; font-size: 1.1rem;">${post.title}</h4>
                    <p style="margin: 0; color: #666; font-size: 0.9rem;">Click to read more →</p>
                </a>`;
    });

    html += `
            </div>
        </div>`;

    return html;
}

// Process each blog post
const blogDir = path.join(__dirname, 'blog');

for (const [filename, data] of Object.entries(blogPosts)) {
    const filePath = path.join(blogDir, filename);

    if (!fs.existsSync(filePath)) {
        console.log(`⏭️  Skipping ${filename} (not found)`);
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Add back button styles and element
    if (!content.includes('back-button')) {
        // Add styles before </head>
        content = content.replace('</head>', backButtonHTML);

        // Add back button element after <body>
        content = content.replace('<body>', backButtonElement);

        console.log(`✅ Added back button to ${filename}`);
    }

    // Add related posts
    if (!content.includes('Related Articles')) {
        const relatedPostsHTML = getRelatedPostsHTML(filename, data.category);

        if (relatedPostsHTML) {
            // Find the closing </article> tag or last </div> before </body>
            const articleEndRegex = /<\/article>|<div style="margin-top: 3rem; padding-top: 2rem; border-top: 2rem; border-top: 2px solid #eee;">/;
            const match = content.match(articleEndRegex);

            if (match) {
                const insertIndex = content.indexOf(match[0]);
                content = content.slice(0, insertIndex) + relatedPostsHTML + '\n\n' + content.slice(insertIndex);
                console.log(`✅ Added related posts to ${filename}`);
            }
        }
    }

    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
}

console.log('\n✨ Blog features added successfully!');
