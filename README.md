# YuiBlog

Serverless Personal Blog System on Firebase.  
_This application is not yet in the practical stage._
_Many releases contains breaking changes._


## Requirements

* Node.js 8.12.0
* Yarnpkg
* Firebase Tools
  * `yarn global add firebase-tools`


## Packages

* `admin`
  * Administration Console for Desktop
* `app`
  * Frontend (App) and Server-Side Rendering
* `functions`
  * Firebase Functions for statistics, registration and others.
* `types`
  * Type Definitions for YuiBlog.


## Development

1. `yarn run install`
1. `yarn run bootstrap`
1. Start API Server
   1. `cd packages/functions`
   1. `yarn run dev:express`
   1. Host: `http://localhost:3001`
2. Start App Server
   1. `cd packages/app`
   1. `yarn run dev`
   1. Host: `http://localhost:3000`

