#!/bin/bash

CURRENT=$(cd $(dirname $0);pwd)
echo $CURRENT

cd $CURRENT

cd ../../frontend
yarn install
yarn run build

cd ../backend
yarn install
yarn run build

mv ../frontend/build ./dist/public