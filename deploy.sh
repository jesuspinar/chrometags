#!/bin/bash

# Save the current branch to return to it after deployment
CURRENT_BRANCH=$(git branch --show-current)

# Enable extglob for file exclusion
shopt -s extglob

# Run the build
npm run build

# Check if the build was successful
if [ $? -ne 0 ]; then
    echo "Error: The build process failed"
    exit 1
fi

# Switch to the gh-pages branch or create it if it doesn't exist
git checkout gh-pages || git checkout -b gh-pages

# Delete all files except node_modules, .git, .gitignore, and dist
# Note: Ensure that "dist" only contains temporary files
rm -rf !(node_modules|.git|.gitignore|dist)

# Copy the files from dist to the root directory
cp -r dist/* .

# Delete the dist folder as it is no longer needed
rm -rf dist

# Add all files to the commit
git add .

# Check if there are changes before committing
if ! git diff-index --quiet HEAD --; then
    # Commit with a deployment message
    git commit -m "Updated deploy"

    # Push to the gh-pages branch
    git push origin gh-pages
else
    echo "No changes to deploy"
fi

# Show confirmation message
echo "Published"

# Disable extglob (revert changes made to the shell)
shopt -u extglob

# Return to the original branch
git checkout "$CURRENT_BRANCH"
