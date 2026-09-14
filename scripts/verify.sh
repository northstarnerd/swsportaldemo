#!/usr/bin/env bash
# scripts/verify.sh — Deterministic verification gate for sws-portal-poc
# Runs TypeScript type-checking and Next.js production build.
# Provides concise backpressure for human and AI agent sessions.

set -eo pipefail

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Running Deterministic Quality Gate ===${NC}"

# 1. Type Checking
echo -n "1. Checking TypeScript types (tsc --noEmit)... "
if npx tsc --noEmit; then
  echo -e "${GREEN}✓ Passed${NC}"
else
  echo -e "${RED}✗ Type check failed${NC}"
  exit 1
fi

# 2. Next.js Production Build
echo -n "2. Verifying production build (next build)... "
BUILD_OUTPUT=$(npm run build 2>&1)
BUILD_STATUS=$?

if [ $BUILD_STATUS -eq 0 ]; then
  echo -e "${GREEN}✓ Passed${NC}"
else
  echo -e "${RED}✗ Production build failed${NC}"
  echo -e "${YELLOW}--- Build Error Digest ---${YELLOW}"
  echo "$BUILD_OUTPUT" | tail -n 25
  exit 1
fi

echo -e "${GREEN}=== All Quality Gates Passed (Ready for commit / deploy) ===${NC}"
exit 0
