#!/usr/bin/env bash
sed -i '' -e '1s/import { TypedDocumentNode/import type { TypedDocumentNode/' $1
