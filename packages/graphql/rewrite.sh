#!/usr/bin/env bash
if [ -z "$1" ]
  then
    echo "No argument supplied"
    exit 1
fi
echo "Rewriting first line of $1 ..."
sed -i '' -e '1s/import { TypedDocumentNode/import type { TypedDocumentNode/' $1
