#!/usr/bin/env bash
echo "Rewriting first line..."
sed -i '' -e '1s/import { TypedDocumentNode/import type { TypedDocumentNode/' "./$1"
