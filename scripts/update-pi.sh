#!/bin/bash
set -e

REPO_DIR="/home/nathantam/rose-academies-uganda"
APP_DIR="$REPO_DIR/apps/local"

cd "$REPO_DIR"

git switch main
git pull --ff-only origin main
pnpm install

cd "$APP_DIR"
pnpm build

sudo systemctl restart rose-web
sudo systemctl status rose-web --no-pager
