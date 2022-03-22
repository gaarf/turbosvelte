#!/usr/bin/env bash
if [ -z "$1" ]
  then
    >&2 echo "No argument supplied"
    exit 1
fi
>&2 echo in `pwd`
>&2 echo "Rewriting first line of $1 ..."
sed -i '' -e '1s/import { TypedDocumentNode/import type { TypedDocumentNode/' $1
