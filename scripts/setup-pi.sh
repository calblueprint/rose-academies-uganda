#!/bin/bash

set -euo pipefail

REPO_URL="https://github.com/calblueprint/rose-academies-uganda.git"
REPO_DIR="$HOME/rose-academies-uganda"
APP_DIR="$REPO_DIR/apps/local"
FILES_DIR="$HOME/rose-files"
SERVICE_NAME="rose-web"
PNPM_VERSION="10.20.0"

echo "Setting up Rose Academies Pi..."

read -p "Enter DEVICE_ID for this Pi: " DEVICE_ID

if [ -z "$DEVICE_ID" ]; then
  echo "DEVICE_ID cannot be empty."
  exit 1
fi

echo "Updating system packages..."
sudo apt update
sudo apt install -y git curl build-essential ca-certificates

echo "Checking Node installation..."

if ! command -v node >/dev/null 2>&1; then
  echo "Installing Node.js 22..."
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt install -y nodejs
fi

echo "Node version:"
node -v

echo "Configuring pnpm $PNPM_VERSION with Corepack..."
sudo corepack enable
corepack prepare "pnpm@$PNPM_VERSION" --activate

PNPM_CMD="corepack pnpm"

echo "pnpm version:"
$PNPM_CMD -v

echo "Preparing folders..."
mkdir -p "$FILES_DIR"

if [ ! -d "$REPO_DIR" ]; then
  echo "Cloning repo..."
  git clone "$REPO_URL" "$REPO_DIR"
fi

cd "$REPO_DIR"

echo "Checking out main..."
git switch main || git checkout main
git pull --ff-only origin main

if [ -f "$APP_DIR/.env.local" ]; then
  read -p ".env.local already exists. Overwrite? [y/N] " OVERWRITE_ENV

  if [[ "$OVERWRITE_ENV" != "y" && "$OVERWRITE_ENV" != "Y" ]]; then
    echo "Keeping existing .env.local"
  else
    echo "Writing local env file..."

    cat > "$APP_DIR/.env.local" <<EOF
NEXT_PUBLIC_SUPABASE_URL=https://tyckvrwfblheqxuliscl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5Y2t2cndmYmxoZXF4dWxpc2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzIwNTksImV4cCI6MjA3NDc0ODA1OX0.dggjzvmAdwHif9v3hUZWrYdwOFPfZAPMO9BHGlPaqPg

DEVICE_ID=$DEVICE_ID
NEXT_PUBLIC_DEVICE_ID=$DEVICE_ID

LOCAL_FILES_DIR=$FILES_DIR
LOCAL_REPO_DIR=$REPO_DIR
EOF
  fi
else
  echo "Writing local env file..."

  cat > "$APP_DIR/.env.local" <<EOF
NEXT_PUBLIC_SUPABASE_URL=https://tyckvrwfblheqxuliscl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE

DEVICE_ID=$DEVICE_ID
NEXT_PUBLIC_DEVICE_ID=$DEVICE_ID

LOCAL_FILES_DIR=$FILES_DIR
LOCAL_REPO_DIR=$REPO_DIR
EOF
fi

echo "Installing project dependencies..."
$PNPM_CMD install

echo "Building local app..."
cd "$APP_DIR"
$PNPM_CMD build

echo "Installing systemd service..."

sudo tee /etc/systemd/system/$SERVICE_NAME.service > /dev/null <<EOF
[Unit]
Description=Rose Academies Next.js app
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$APP_DIR
Environment="LOCAL_FILES_DIR=$FILES_DIR"
ExecStart=/usr/bin/bash -lc 'cd $APP_DIR && corepack pnpm start'
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

echo "Starting service..."

sudo systemctl daemon-reload
sudo systemctl enable "$SERVICE_NAME"
sudo systemctl restart "$SERVICE_NAME"

echo "Waiting for local app..."
sleep 5

echo "Testing local app..."

curl -I http://localhost:3000 || {
  echo "Local app did not respond."
  exit 1
}

echo "Setup complete."

sudo systemctl status "$SERVICE_NAME" --no-pager