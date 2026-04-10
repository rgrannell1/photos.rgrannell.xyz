#! /usr/bin/env bash

npx wrangler d1 execute photo_cards --yes --command "DROP TABLE IF EXISTS social_cards;" --remote
npx wrangler d1 execute photo_cards --yes --file $HOME/media_d1.sql --remote
