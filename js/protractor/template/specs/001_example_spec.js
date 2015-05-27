describe('etachki', function() {
  	it('001_example_spec.js calculator test accessibility', function() {

        var params = browser.params;
        var tmpUrl = "http://" + params.host;
	    browser.get(tmpUrl);
	    browser.sleep('1000');
	    element(by.model('login_name')).sendKeys(params.user);
	    element(by.model('password')).sendKeys(params.password);
        element(by.binding("username")).getText().then(function(text) {
            expect(text).toEqual(params.user);
        });
	});
 	
});
