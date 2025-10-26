@echo off
echo ================================================================
echo.
echo          SirenCY GitHub Repository Setup
echo.
echo ================================================================
echo.
echo This will help you push your SirenCY website to GitHub!
echo.
echo.

set /p GITHUB_USERNAME="Enter your GitHub username: "

echo.
echo Opening GitHub in your browser to create a new repository...
echo.
start https://github.com/new
echo.
echo ================================================================
echo   Follow these steps in your browser:
echo ================================================================
echo.
echo   1. Repository name: sirency
echo   2. Description: SirenCY - OnlyFans Creator Management Website
echo   3. Choose Public or Private
echo   4. DO NOT check any boxes (no README, .gitignore, or license)
echo   5. Click "Create repository"
echo.
echo ================================================================
echo.
pause

echo.
echo Setting up git remote...
git remote remove origin 2>nul
git remote add origin https://github.com/%GITHUB_USERNAME%/sirency.git

echo.
echo Pushing to GitHub...
echo You may be prompted for authentication.
echo.
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================================
    echo   SUCCESS! Your repository is now on GitHub!
    echo ================================================================
    echo.
    echo Repository URL: https://github.com/%GITHUB_USERNAME%/sirency
    echo.
    echo To enable GitHub Pages:
    echo   1. Go to: https://github.com/%GITHUB_USERNAME%/sirency/settings/pages
    echo   2. Under Source: Deploy from branch 'main'
    echo   3. Folder: / (root^)
    echo   4. Click Save
    echo   5. Your site will be at: https://%GITHUB_USERNAME%.github.io/sirency
    echo.
) else (
    echo.
    echo ================================================================
    echo   Push failed. You may need to authenticate.
    echo ================================================================
    echo.
    echo Try running this command manually:
    echo   git push -u origin main
    echo.
    echo Or see GITHUB-SETUP.md for more help.
    echo.
)

echo.
pause
