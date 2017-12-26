Iframe App Framework SDK
=========================

[![Build Status](https://travis-ci.org//iframe-app-framework-sdk.svg?branch=master)](https://travis-ci.org//iframe-app-framework-sdk)

## What is it?

The Iframe App Framework (IAF) SDK is a JavaScript library that simplifies cross-frame communication between iframe'ed apps and host applications. Based on work done by [Zendesk](https://github.com/zendesk/zendesk_app_framework_sdk).

## How to use this

This library only provides the client (embedded application) library. The hosting (parent) application needs to integrate functions to complete the interactions of passing data back and forth between the parent and client apps. These are generally all clientside functionality and since clientside frameworks and each application differ, that exercise is specific to the parent application.

### `get`

Pull data from the parent application's state asynchronously.

### `invoke`

Call a given method with parameters to invoke an action in the parent application.

### Emit events

#### Emit blocking events

https://developer.zendesk.com/apps/docs/apps-v2/using_sdk#hook-events

### `request` - avoiding secret keys

In order to avoid having to bundle secret keys into clientside code (not secure), calls can be "proxied" to the host app's API by sending them through the parent application's window context, which, presumably, has access to the API via the same-origin-policy and existing authentication methods.

### Serverside feature

There are several features that also require server side integration. This includes:
* https://developer.zendesk.com/apps/docs/apps-v2/using_sdk#using-secure-settings

## Iframe App boot process

1. `<iframe>` inserted into page source and rendered by host app, `load` event handler created for iframe.
2. Each `<iframe>`'s app loads content and issue's the `iframe.handshake` event to the host
3. Host app receives `iframe.handshake` from each, registers app with given instance id and issues `app.registered` and `context.updated` events.

## Development

You will need:

* [Node.js](http://nodejs.org/)
* [npm](https://www.npmjs.org/)

Then run:

`npm install` - Install dependencies

`npm run server` - Serve the [public](./public) directory at [http://localhost:9001](http://localhost:9001)

## Building for distribution

Run:

```
grunt run build
```

## References

* https://javascript.info/cross-window-communication
* https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
* http://pbojinov.github.io/iframe-communication/

## Copyright and license

Use of this software is subject to important terms and conditions as set forth in the License file.

Portions of this code Copyright 2014 Zendesk

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
