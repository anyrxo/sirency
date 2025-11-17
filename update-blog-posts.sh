#!/bin/bash

# Update all blog post HTML files to add modal, CTA, and copy protection

BLOG_DIR="blog"

# Find all HTML files in blog directory (excluding index.html)
find "$BLOG_DIR" -name "*.html" ! -name "index.html" | while read file; do
    echo "Updating: $file"

    # Check if airtable-modal.css is already added
    if ! grep -q "airtable-modal.css" "$file"; then
        # Add CSS after mobile-fixes.css
        sed -i 's|<link href="../css/mobile-fixes.css" rel="stylesheet" type="text/css">|<link href="../css/mobile-fixes.css" rel="stylesheet" type="text/css">\n    <link href="../css/airtable-modal.css" rel="stylesheet" type="text/css">|' "$file"
        echo "  ✓ Added airtable-modal.css"
    fi

    # Check if scripts are already added
    if ! grep -q "airtable-modal.js" "$file"; then
        # Add scripts before </body>
        sed -i 's|</body>|  <!-- Airtable Modal, Floating CTA, Copy Protection -->\n  <script src="../js/airtable-modal.js" type="text/javascript"></script>\n  <script src="../js/floating-cta.js" type="text/javascript"></script>\n  <script src="../js/copy-protection.js" type="text/javascript"></script>\n</body>|' "$file"
        echo "  ✓ Added scripts"
    fi
done

echo "All blog posts updated!"
