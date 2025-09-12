#!/bin/bash

echo "Starting Next.js with PM2 (local)..."
/apps/loena2/services_v2/miniapps/./node_modules/.bin/pm2 delete all
/apps/loena2/services_v2/miniapps/./node_modules/.bin/pm2 start npm --name "miniapps" -- run start