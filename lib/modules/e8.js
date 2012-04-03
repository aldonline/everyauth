var oauthModule = require('./oauth2');

var e8 = module.exports =
oauthModule.submodule('e8')
  .configurable({
      scope: 'specify types of access: (no scope), user, server'
  })

  .oauthHost('https://localhost:9443/e8fs-oauth2-provider')
  .apiHost('https://localhost:9443/e8fs-oauth2-provider/test.do')
  
  .authPath('/authorize')
  .authQueryParam('response_type', 'code')

  .accessTokenPath('/access_token')
  .accessTokenParam('grant_type', 'authorization_code')

  .entryPath('/auth/e8')
  .callbackPath('/auth/e8/callback')


  .fetchOAuthUser( function (accessToken) {
    var p = this.Promise();
    this.oauth.get(this.apiHost() + '?perform=me', accessToken, function (err, data) {
      if (err) return p.fail(err);
      var oauthUser = JSON.parse(data).result.data;
      p.fulfill(oauthUser);
    })
    return p;
  });
