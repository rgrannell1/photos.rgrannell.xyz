#! /usr/bin/env bash
# Push the social-card dump to remote D1. The dump drops and recreates the
# table itself, and its statements are idempotent against import retries.

npx --yes wrangler@4 d1 execute photo_cards --yes --file "$HOME/media_d1.sql" --remote
