const assert = require('assert');
const loginUrl = 'https://demo.applitools.com/hackathonV2.html';
const dashboardURL = "https://demo.applitools.com/hackathonAppV2.html";

function inputCreds() {
    $('#username').setValue('valid@user.com');
    $('#password').setValue('hunter2');
}

describe("Traditional test suite", function () {

    describe('Login Page', () => {
        beforeEach(async () => {
            await browser.url(loginUrl)
        });
        it('should let you log in', () => {
            inputCreds();
            $('#log-in').click();
            var pageUrl = browser.getUrl();
            //assert.notEqual(pageUrl, dashboardURL);
            assert.equal(pageUrl, dashboardURL);
        });
        it("should throw an error, If you don't enter the username and password and click the login button", async () => {
            $('#log-in').click();
            let el = await browser.isVisible('div[id^="random_id"]');
            assert.equal(el, true);
        });
        it('should throw an error, If you only enter the username and click the login button,', async () => {
            $('#username').setValue('valid@user.com');
            $('#log-in').click();
            let el = await browser.isVisible('div[id^="random_id"]');
            assert.equal(el, true);
        });
        it('should throw an error, If you only enter the password and click the login button', async () => {
            $('#password').setValue('hunter2');
            $('#log-in').click();
            let el = await browser.isVisible('div[id^="random_id"]');
            assert.equal(el, true);
        });
    });

    describe('Login Page Content', () => {
        //let pageUrl = 'https://demo.applitools.com/hackathon.html';        
        beforeEach(async () => {
            await browser.url(loginUrl);
        });
        it('should test Login Page UI Element "Login Form"', () => {
            let loginFormName = $('h4.auth-header').getText();
            assert.equal(loginFormName, "Login Form");
        });
        it('should test Login Page UI Element "Log In button"', () => {
            let logInBtn = $('#log-in').getText();
            assert.equal(logInBtn, "Log In");
        });
        it('should test Login Page UI Element "Username"', () => {
            let userName = $('div.form-group label').getText();
            assert.equal(userName, "Username");
        });
        it('should test Login Page UI Element "Remember Me"', () => {
            let rememberMeLabel = $('label.form-check-label').getText();
            assert.equal(rememberMeLabel, "Remember Me");
        });
        it('should test Login Page UI Element "Password"', () => {
            let pwd = $$('div.form-group:nth-child(2) label').getText();
            assert.equal(pwd, "Password");
        });
    });


    describe('DashBoard', () => {
        //const dashboardURL_V1 = "https://demo.applitools.com/hackathonApp.html";
        beforeEach(async () => {
            await browser.url(dashboardURL);
            $('#amount').click();
        })
        //table Sort test
        describe("table sort", function () {
            it("Compare first row amounts", function () {
                assert.equal($$(".text-right")[1].getText(), "- 320.00 USD");
            });
            it("Compare last row amounts", function () {
                assert.equal($$(".text-right")[6].getText(), "+ 1,250.00 USD");
            });
            it("Compare first row first cell data", function () {
                assert.equal($("//table/tbody/tr[1]/td[1]").getText(), "Pending");
            });
            it("Compare first row second cell data", function () {
                assert.equal($("//table/tbody/tr[1]/td[2]").getText(), "Yesterday7:45am");
            });
            it("Compare last row first cell data", function () {
                assert.equal($("//table/tbody/tr[6]/td[1]").getText(), "Complete");
            });
            it("Compare last row second cell data", function () {
                assert.equal($("//table/tbody/tr[6]/td[2]").getText(), "Today1:52am");
            });
        });        
    });

    //Canvas Chart Test
    xdescribe('Canvas', () => {
        //This test does not seems to be feasible with the traditional testing methods
        //So leaving it blank
    });

    //Dynamic Content Test
    describe('Dynamic Content Test', () => {
        beforeEach(async () => {
            await browser.url(dashboardURL + "?showAd=true")
        });
        it('should show two different "Flash sale" gifs', async () => {
            let gif1_isvisible = await browser.isVisible('#flashSale');
            let gif2_isvisible = await browser.isVisible('#flashSale2');
            assert.equal(gif1_isvisible, gif2_isvisible, true);
        });
    });
});