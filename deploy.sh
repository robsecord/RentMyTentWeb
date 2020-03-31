#!/usr/bin/env bash

echo "Bumping version number.."
version update -p

echo "Rebuilding.."
rm -rf public/
yarn build

echo "Pushing to Github (Triggers deploy via Terminal)"
git add .
git commit -m "$1"
git push
