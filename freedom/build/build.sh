#!/bin/bash

CURRENT=$(cd $(dirname $0);pwd)
echo $CURRENT

cd $CURRENT/frontend

yarn run build

cd ../backend
yarn run build

mv ../frontend/build ./dist/public