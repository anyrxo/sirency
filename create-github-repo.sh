#!/bin/bash

# SirenCY GitHub Repository Creation Script
# This script will help you create a GitHub repository and push your code

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                                                                  ║"
echo "║          🌊 SirenCY GitHub Repository Setup 🌊                   ║"
echo "║                                                                  ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Get GitHub username
echo "📝 Please enter your GitHub username:"
read GITHUB_USERNAME

echo ""
echo "🔑 You'll need a GitHub Personal Access Token to create the repository."
echo "   Don't have one? Create it here: https://github.com/settings/tokens"
echo ""
echo "   Required permissions: repo (Full control of private repositories)"
echo ""
echo "📝 Please enter your GitHub Personal Access Token:"
read -s GITHUB_TOKEN

echo ""
echo "🚀 Creating repository 'sirency' on GitHub..."
echo ""

# Create the repository using GitHub API
RESPONSE=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d '{
    "name": "sirency",
    "description": "SirenCY - OnlyFans Creator Management Website with Liquid Glass Effects",
    "private": false,
    "has_issues": true,
    "has_projects": true,
    "has_wiki": true
  }')

# Check if repository was created successfully
if echo "$RESPONSE" | grep -q '"full_name"'; then
    echo "✅ Repository created successfully!"
    echo ""
    REPO_URL=$(echo "$RESPONSE" | grep -o '"html_url": "[^"]*' | grep -o 'https://[^"]*')
    echo "📍 Repository URL: $REPO_URL"
    echo ""

    # Add remote and push
    echo "🔗 Adding remote origin..."
    git remote add origin "https://github.com/$GITHUB_USERNAME/sirency.git" 2>/dev/null || git remote set-url origin "https://github.com/$GITHUB_USERNAME/sirency.git"

    echo "📤 Pushing code to GitHub..."
    git push -u origin main

    if [ $? -eq 0 ]; then
        echo ""
        echo "╔══════════════════════════════════════════════════════════════════╗"
        echo "║                                                                  ║"
        echo "║                  ✅ SUCCESS! Repository is live!                 ║"
        echo "║                                                                  ║"
        echo "╚══════════════════════════════════════════════════════════════════╝"
        echo ""
        echo "🎉 Your repository is now available at:"
        echo "   $REPO_URL"
        echo ""
        echo "🌐 To enable GitHub Pages:"
        echo "   1. Go to $REPO_URL/settings/pages"
        echo "   2. Under 'Source', select 'Deploy from a branch'"
        echo "   3. Select branch 'main' and folder '/ (root)'"
        echo "   4. Click 'Save'"
        echo "   5. Your site will be live at: https://$GITHUB_USERNAME.github.io/sirency"
        echo ""
    else
        echo ""
        echo "⚠️  Repository created but push failed."
        echo "   You may need to authenticate. Try:"
        echo "   git push -u origin main"
    fi
else
    echo "❌ Failed to create repository."
    echo ""
    echo "Error response:"
    echo "$RESPONSE" | grep -o '"message": "[^"]*' | grep -o ': .*' | cut -c 3-
    echo ""
    echo "💡 Common issues:"
    echo "   - Invalid token (create one at: https://github.com/settings/tokens)"
    echo "   - Repository 'sirency' already exists"
    echo "   - Token doesn't have 'repo' permission"
    echo ""
    echo "🔧 Manual setup instructions:"
    echo "   1. Go to https://github.com/new"
    echo "   2. Create repository named 'sirency'"
    echo "   3. Run: git remote add origin https://github.com/$GITHUB_USERNAME/sirency.git"
    echo "   4. Run: git push -u origin main"
fi

echo ""
echo "📚 For more help, see: GITHUB-SETUP.md"
