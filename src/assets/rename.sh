#!/bin/bash

if [ -z "$1" ]; then
  echo "Veuillez fournir le chemin vers le dossier contenant les fichiers à renommer."
  exit 1
fi

count=1

cd "$1"

for file in *
do
    if [ -f "$file" ]; then
        extension="${file##*.}"
        new_filename="img-$count.$extension"
        mv "$file" "$new_filename"
        ((count++))
    fi
done

