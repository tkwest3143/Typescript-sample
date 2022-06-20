#!/bin/bash

CURRENT=$(cd $(dirname $0);pwd)


echo $CURRENT

cd $CURRENT
sh build.sh

cd ../../backend
yarn build:dmg
