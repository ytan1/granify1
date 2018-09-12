var assert = require('assert');
module.exports = {
  'click add' : (browser) => {
        browser.url(browser.launchUrl)
                .waitForElementVisible('.page-footer', 100)
                .click('#add')
        browser.assert.urlContains('add')
   },   
  'add and display a record': (browser) => {
    //type in wrong format 
    browser.setValue('#name', 'Yang')
           .setValue('#phone', 'wrong format')
           .click('.btn')
           .waitForElementVisible('.alert', 100)
           .getText('.alert', function(res){
                this.assert.equal(res.value, 'Phone no. is not valid')
           })
    //type in correct format
    browser.url('localhost:3000/add')
            .waitForElementVisible('.btn', 100)
            .setValue('#name', 'Yang')
           .setValue('#phone', '587-591-4041')
           .click('.btn')
           .waitForElementVisible('.card-body .card-phone', 1000)
    //url will redirect after submit
    browser.assert.urlContains('display')
    var isFound = false
    browser.elements('css selector', '.card-body .card-phone', function(res){
        res.value.forEach(function (jsonWebElement) {
            var jsonWebElementId = jsonWebElement.ELEMENT;
            browser.elementIdText(jsonWebElementId, function (jsonElement) {
                var text = jsonElement.value;
                if (text.indexOf('587-591-4041') !== -1) {
                    isFound = true;
                }
            })
        })
    })
    
    browser.perform(function(){
        
        assert.ok(isFound, 'Phone number found')
    })

  },
  'delete a record': (browser) => {
    var isFound = false
    browser.click('#delete')
            .waitForElementVisible('.delete-card', 100)
            .assert.urlContains('delete')
    browser.elements('css selector', '.card-phone', function (resultValues) {
                resultValues.value.forEach(function(element) {
                    browser.elementIdText(element.ELEMENT, function (result) {
                    // if word found.
                        if(result.value.indexOf("Phone: 587-591-4041") > -1) {

                            // move the cursor on the same element and can perform click.
                            browser.moveTo(element.ELEMENT, 0,0 , function () {
                                 browser.elementIdClick(element.ELEMENT, function (clicked) { 
                                    console.log("Click on the desired element")                         
                                 })
                           })
                        }
                    })
                })
            })
            .pause(1000)
            .elements('css selector', '.card-phone', function(res){
                res.value.forEach(function (jsonWebElement) {
                    var jsonWebElementId = jsonWebElement.ELEMENT;
                    browser.elementIdText(jsonWebElementId, function (jsonElement) {
                        var text = jsonElement.value;
                        if (text.indexOf('587-591-4041') !== -1) {
                            console.log('found one')
                            isFound = true;
                        }
                    })
                })
            })

    browser.perform(function(){
        assert.ok(!isFound, 'Phone number deleted')
    })    
  },
  'close': (browser) => {
    browser.end()
  },
}