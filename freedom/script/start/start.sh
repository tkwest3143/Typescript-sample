#!/bin/bash

CURRENT=$(cd $(dirname $0);pwd)
echo $CURRENT

cd $CURRENT

cd ../build

sh ./build.sh
cd ../../backend

yarn run start