#!/usr/bin/env bash

HASH=`git rev-parse --short HEAD`
echo $HASH

docker buildx build \
    --platform linux/arm/v7 \
    --push \
    -t cqlanus/lan-wx:$HASH \
    -t cqlanus/lan-wx:latest .

kubectl set image deployment/lan-wx lan-wx=cqlanus/lan-wx:$HASH -n lan-wx

