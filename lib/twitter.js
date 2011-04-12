var oauthModule = require('./oauth')
  , Promise = require('./promise');

var twitter = module.exports =
oauthModule.submodule('twitter')
  .apiHost('https://api.twitter.com')
  .requestTokenPath('/oauth/request_token')
  .accessTokenPath('/oauth/access_token')
  .entryPath('/auth/twitter')
  .callbackPath('/auth/twitter/callback')
  .fetchOAuthUser( function (accessToken, accessTokenSecret, params) {
    var promise = new Promise();
    this.oauth.get('http://api.twitter.com/users/show.json?user_id=' + params.user_id, accessToken, accessTokenSecret, function (err, data) {
      if (err) return promise.fail(err);
      promise.fulfill(data);
    });
    return promise;
  })