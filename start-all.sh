#!/bin/bash
PORT=5001 NODE_ENV=development npx tsx server/index.ts &
cd web && npx next dev -p 5000 --hostname 0.0.0.0
