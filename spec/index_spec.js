describe('IAFClient', function() {
  var sandbox   = sinon.sandbox.create(),
      IAFClient = require('index'),
      Client    = require('client'),
      Utils     = require('utils');

  beforeEach(function() {
    sandbox.stub(Utils, 'queryParameters');
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('.init', function() {
    describe('given origin and app_guid exist', function() {
      beforeEach(function() {
        Utils.queryParameters.returns({
          origin: document.location,
          app_guid: 'A2'
        });
      });

      describe('when a callback is passed', function() {
        var callback = function() { return 'abcxyz'; };
        callback.bind = function() { return callback; };

        beforeEach(function() {
          sandbox.spy(Client.prototype, 'on');
          IAFClient.init(callback);
        });

        it('binds the callback to app.registered', function() {
          var callbackMatcher = sinon.match(function (cb) {
            // performs an identity check, meaning that bind must be stubbed to return the same method
            return cb === callback;
          }, 'wrong callback');
          expect(Client.prototype.on).to.have.been.calledWith('app.registered', callbackMatcher);
        });
      });
    });

    describe('given origin and app_guid are missing', function() {
      it("won't create a Client instance", function() {
        Utils.queryParameters.returns({});
        expect(IAFClient.init()).to.equal(false);
      });
    });
  });

});
