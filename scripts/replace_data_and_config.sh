#!/bin/bash

DIR="build"
if [ -d "$DIR" ]; then
  cp -Rv public/static/data build/static
  cp public/static/config.js build/static/config.js
  echo "installed new data and config inside build dir"
else
  echo "Build directory not found, ensure to run build process"
fi
