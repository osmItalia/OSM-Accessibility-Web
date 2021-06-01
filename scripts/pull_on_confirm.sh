#!/bin/bash

read -p "Download data from overpass? (y/n) " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    node scripts/fetch-overpass.js
fi
