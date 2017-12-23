var Client    = require('client'),
    Utils     = require('utils'),
    IAFClient = {};

/// ### IAFClient API
///
/// When you include the IAF SDK on your website, you get access to the `IAFClient` object.
///
/// #### IAFClient.init([callback(context)])
///
/// Returns a [`client`](#client-object) object.
///
/// ##### Arguments
///
///   * `callback(context)` (optional) a function called as soon as communication with
///     the host app is established. The callback receives a context object with
///     data related to the host app, including `currentAccount`, `currentUser`, and `location`
///
/// Example:
///
/// ```javascript
/// var client = IAFClient.init(function(context) {
///   var currentUser = context.currentUser;
///   console.log('Hi ' + currentUser.name);
/// });
/// ```
IAFClient.init = function(callback) {
  var queryParams = Utils.queryParameters(),
      hashParams = Utils.queryParameters(( document.location.hash || '' ).slice(1)),
      origin = queryParams.origin || hashParams.origin,
      app_guid = queryParams.app_guid || hashParams.app_guid,
      client;

  if (!origin || !app_guid) { return false; }

  client = new Client({ origin: origin, appGuid: app_guid });

  if (typeof callback === 'function') {
    client.on('app.registered', callback.bind(client));
  }

  return client;
};

module.exports = IAFClient;
