(function() { var f=this,g=function(a,d){var c=a.split("."),b=window||f;c[0]in b||!b.execScript||b.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===d?b=b[e]?b[e]:b[e]={}:b[e]=d};var h=function(a){var d=chrome.runtime.connect("nmmhkkegccagdldgiimedpiccmgmieda",{}),c=!1;d.onMessage.addListener(function(b){c=!0;"response"in b&&!("errorType"in b.response)?a.success&&a.success(b):a.failure&&a.failure(b)});d.onDisconnect.addListener(function(){!c&&a.failure&&a.failure({request:{},response:{errorType:"INTERNAL_SERVER_ERROR"}})});d.postMessage(a)};g("google.payments.inapp.buy",function(a){a.method="buy";h(a)});
g("google.payments.inapp.getPurchases",function(a){a.method="getPurchases";h(a)});g("google.payments.inapp.getSkuDetails",function(a){a.method="getSkuDetails";h(a)}); })();

/*
This is Slim Donate.
It is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
It is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with It.  If not, see <http://www.gnu.org/licenses/>.
*/


window.onload = function(){





var donate = {};


donate.appName = (function(){
  var manifest = chrome.runtime.getManifest();
  if(manifest.short_name)
    return manifest.short_name;
  return manifest.name;
})();

// changeble settings:
donate.backgroundColor = "#e6e9f0";
donate.buttonColor = "lightgray";
donate.borderColor = donate.buttonColor;


donate.strP1 =  donate.appName + ' is free and open source and if you like this app, ' +
                'feel free to donate as much or little as you want! ' +
                'Any contribution is greatly appreciated!';
donate.strP2 =  'When you click on a donate button, a Google Wallet confirmation dialog ' +
                'will appear. This way the donation is run securely through Google.';
donate.strP3 =  'You can donate more than once.';

donate.styleParagraph = "margin-bottom: 4px;";
donate.styleNormalSize = "font-size: 14px;";
donate.styleSmallSize = "font-size: 11px;margin-top: 6px;";
donate.styleMargin = "margin: 4px;";
donate.styleButton = "padding: 1px 6px;white-space: normal;text-align: left;font-size: 14px; min-height: initial; max-height: initial; background-color: "+donate.buttonColor+";border-color:"+donate.borderColor+";width: initial;height: initial;";
donate.styleOuter = "display: none;position: fixed;top: 0px;left: 0px;width: 100vw;height: 100vh;background-color: rgba(0, 0, 0, 0.5);display: flex;align-items: center;justify-content: center;";
donate.styleInner = "max-width: 400px;padding: 10 15px;background-color: "+donate.backgroundColor+";";
donate.styleFlexRow = "display: flex;flex-direction: row;";

donate.donateDialog = $('<div style="'+donate.styleOuter+'">').hide();
donate.innerDialog = $('<div style="'+donate.styleInner+'">');
donate.heading = $('<h2 style="'+donate.styleParagraph+'">Donate to '+donate.appName+'</h2>');

donate.paragraph1 = $('<p style="'+donate.styleParagraph+donate.styleNormalSize+'">'+donate.strP1 +'</p>');



donate.outerList = $('<div style="'+donate.styleFlexRow+'flex: 1;overflow-y: auto;'+donate.styleMargin+'"></div>');
donate.donateList = $('<div style="display: flex;flex-direction: column;" class="leftTextParent"></div>');
donate.flexyDiv = $('<div style="flex: 1;"></div>');

donate.outerList.append(donate.donateList).append(donate.flexyDiv);
donate.paragraph2 = $('<p style="'+donate.styleParagraph+donate.styleNormalSize+'">'+donate.strP2+'</p>');

donate.footer = $('<span style="'+donate.styleFlexRow+'"></span>');

donate.paragraph3 = $('<p  style="'+donate.styleParagraph+donate.styleSmallSize+'">'+donate.strP3+'</p>');
donate.closeButton = $('<input type="button" style="'+donate.styleButton+'" value="Return" />');
donate.footer.append(donate.paragraph3).append(donate.flexyDiv).append(donate.closeButton);



donate.innerDialog
  .append(donate.heading)
  .append(donate.paragraph1)
  .append(donate.outerList)
  .append(donate.paragraph2)
  .append(donate.footer);

donate.donateDialog.append(donate.innerDialog);
$('body').append(donate.donateDialog);




donate.closeButton.click(function(){
  donate.donateDialog.hide();
});


donate.purchaseSuccess = function(e){

}

donate.purchaseFail = function(e){
//  donate.alert("Thanks for the consideration!");
}

donate.deleteAlert = function(){
  donate.alertBox.remove();
};

donate.alert = function(text){
  donate.alertBox = $('<div style="'+donate.styleOuter+'">').append(
    $('<div style="'+donate.styleInner+donate.styleFlexRow+'align-items: center;">').append(
      $('<p style="'+donate.styleMargin+'">' + text + '</p>')
    ).append(
      $('<input type="button" style="'+donate.styleButton+'" value="OK">').click(donate.deleteAlert)
    )
  );
  $('body').append( donate.alertBox );
};

donate.purchase = function(){
  donate.alert("Waiting for Google Wallet");

  var onSkuDetails = function(response){
    donate.donateList.empty();
    var products = response.response.details.inAppProducts;
    var count = products.length;
    for (var i = 0; i < count; i++) {
      var product = products[i];
      addProductToUI(product);
    }
    donate.deleteAlert();
    donate.donateDialog.show();
  }


  function addProductToUI(product) {
    var row = $("<tr></tr>");
    var colDesc = $("<td></td>").text(product.localeData[0].description);
    var price = parseInt(product.prices[0].valueMicros, 10) / 1000000;
    var currency = product.prices[0].currencyCode;
    var colPrice = $("<td></td>").text(price + currency);
    //var tittle = product.localeData[0].title    
    var val = "Donate " + price + " " + currency;

    var butAct = $("<input value='" + val +
                "' type='button' class='rowBreak' style='"+donate.styleButton+"'></input>")
      .data("sku", product.sku)
      .attr("id", "prodButPrefix" + product.sku)
      .click(onActionButton);
    donate.donateList.append(butAct);
  }
  var onActionButton = function(evt) {
    var actionButton = $(evt.currentTarget);
    if (actionButton.data("license")) {
      showLicense(actionButton.data("license"));
    } else {
      var sku = actionButton.data("sku");
      buyProduct(sku);
    }
  }

  var buyProduct = function(sku) {
    google.payments.inapp.buy({
      parameters: {'env': "prod"},
      'sku': sku,
      'success': donate.purchaseSuccess,
      'failure': donate.purchaseFail
    });
  }

  var onSkuDetailsFail = function(a){
    donate.deleteAlert();
    donate.alert( "Sorry, can not reach Google-wallet at the moment. "+
                  "This feature requires a connection to the internet.")
    return;   /* uncomment above here  

    var aProducts = [];
    
    var product = {}
    product.localeData = [];
    product.localeData[0] = {};
    product.localeData[0].title = "Donate little"
    product.localeData[0].description = "You like Troff!"
    product.prices = [];
    product.prices[0] = {};
    product.prices[0].valueMicros = 990000;
    product.prices[0].currencyCode = "USD";
    product.sku = "petra_suport_0";
    aProducts.push(product);
    aProducts.push(product);
    var product2 = {}
    product2.localeData = [];
    product2.localeData[0] = {};
    product2.localeData[0].title = "Vote for phone app"
    product2.localeData[0].description = "Vote for this feature!"
    product2.prices = [];
    product2.prices[0] = {};
    product2.prices[0].valueMicros = 1990000;
    product2.prices[0].currencyCode = "USD";
    product2.sku = "petra_suport_1";
    aProducts.push(product2);
    aProducts.push(product2);
    aProducts.push(product2);
    aProducts.push(product2);
    var fakeResponse = {response : {details : {inAppProducts : aProducts}}};
    onSkuDetails(fakeResponse)
    // */
  }


//onSkuDetailsFail();

  google.payments.inapp.getSkuDetails({
    'parameters': {'env': 'prod'},
    'success': onSkuDetails,
    'failure': onSkuDetailsFail
  });

}

document.getElementById('donate').addEventListener('click', donate.purchase);



}//end window.onload
