#!/bin/bash

# create a dist directories
mkdir -p dist/client
mkdir -p dist/server

# copy admin
cp -r packages/admin/dist/ dist/client/admin/

# copy app
cp -r packages/app/dist/. dist/

# install deps
yarn --cwd dist/server install --frozen-lockfile
