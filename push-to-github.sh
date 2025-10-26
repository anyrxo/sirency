#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                                                                  ║"
echo "║          🚀 Pushing SirenCY to GitHub 🚀                         ║"
echo "║                                                                  ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Ask for GitHub username
read -p "📝 Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Error: GitHub username is required"
    exit 1
fi

echo ""
echo "🔍 GitHub username: $GITHUB_USERNAME"
echo ""

# Check if we need a token for creating the repo
read -p "🔑 Do you want to create a NEW repository on GitHub? (y/n): " CREATE_REPO

if [ "$CREATE_REPO" = "y" ] || [ "$CREATE_REPO" = "Y" ]; then
    echo ""
    echo "To create a repository, you need a Personal Access Token."
    echo "Get one here: https://github.com/settings/tokens"
    echo ""
    read -sp "🔑 Enter your GitHub Personal Access Token (hidden): " GITHUB_TOKEN
    echo ""
    echo ""

    echo "🚀 Creating repository 'sirency' on GitHub..."

    RESPONSE=$(curl -s -X POST \
      -H "Authorization: token $GITHUB_TOKEN" \
      -H "Accept: application/vnd.github.v3+json" \
      https://api.github.com/user/repos \
      -d "{
        \"name\": \"sirency\",
        \"description\": \"SirenCY - OnlyFans Creator Management Website with Liquid Glass Effects\",
        \"private\": false,
        \"has_issues\": true,
        \"has_projects\": true,
        \"has_wiki\": true
      }")

    if echo "$RESPONSE" | grep -q '"full_name"'; then
        echo "✅ Repository created successfully!"
    else
        echo "⚠️  Repository may already exist or there was an error."
        echo "   Continuing with push anyway..."
    fi
fi

echo ""
echo "🔗 Adding remote origin..."
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$GITHUB_USERNAME/sirency.git"

echo ""
echo "📤 Pushing to GitHub..."
echo "   (You may be prompted for authentication)"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "╔══════════════════════════════════════════════════════════════════╗"
    echo "║                                                                  ║"
    echo "║              ✅ SUCCESS! Code pushed to GitHub! ✅                ║"
    echo "║                                                                  ║"
    echo "╚══════════════════════════════════════════════════════════════════╝"
    echo ""
    echo "🎉 Repository URL: https://github.com/$GITHUB_USERNAME/sirency"
    echo ""
    echo "🌐 Enable GitHub Pages:"
    echo "   1. Go to https://github.com/$GITHUB_USERNAME/sirency/settings/pages"
    echo "   2. Source: Deploy from branch 'main'"
    echo "   3. Folder: / (root)"
    echo "   4. Click Save"
    echo ""
    echo "   Your site will be live at:"
    echo "   https://$GITHUB_USERNAME.github.io/sirency"
    echo ""
else
    echo ""
    echo "❌ Push failed!"
    echo ""
    echo "💡 Common solutions:"
    echo "   1. Make sure the repository exists: https://github.com/$GITHUB_USERNAME/sirency"
    echo "   2. Use a Personal Access Token as password (not your GitHub password)"
    echo "   3. Create token at: https://github.com/settings/tokens"
    echo ""
fi
