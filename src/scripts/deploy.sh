#!/usr/bin/env bash

docker buildx build \
    --platform linux/arm/v7 \
    --push \
    -t cqlanus/lan-wx:latest .

kubectl apply -f k3s/deploy.yaml

