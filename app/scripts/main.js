'use strict';
$(function () {
  //Global Variables
  var owner = 'Geoff';
  var items = [];

  $('#filters').on('click', '.my-lists', function(){
    var results = [];
    $.each(items, function(key,value) {
      var myList = value.owners;
      if($.inArray(owner, myList)!==-1 && myList.length === 1){
        results.push(value);
      }
    });
    renderItemsPage(results);
  });

  $('#filters').on('click', '.shared-lists', function(){
    var results = [];
    $.each(items, function(key,value) {
      var sharedList = value.owners;
      if($.inArray(owner, sharedList)!==-1 && sharedList.length > 1){
        results.push(value);
      }
    });
    renderItemsPage(results);
  });

  $('#filters').on('click', '.assigned-items', function(){
    var results = [];
    $.each(items, function(key,value) {

    });
  });

    //Get the Data
    $.getJSON( 'data.json', function( data ) {
    items = data;
        // Call a function that will turn that data into HTML.
        generateAllItemsHTML(data);
        // Manually trigger a hashchange to start the app.
        $(window).trigger('hashchange');
    });

    $(window).on('hashchange', function(){
        // On every hash change the render function is called with the new hash.
        // This is how the navigation of the app happens.
        render(window.location.hash);
    });


    function render(url) {
        // This function decides what type of page to show
        // depending on the current url hash value.
    }


  // This function receives an object containing all the product I want to show.
  function renderItemsPage(data){
    var page = $('.all-items'),
      allItems = $('.all-items .items-list > li');

    // Hide all the items in the items list.
    allItems.addClass('hidden');

    // Iterate over all of the products.
    // If their ID is somewhere in the data object remove the hidden class to reveal them.
    allItems.each(function () {
      var that = $(this);
      data.forEach(function (item) {
        if(that.data('index') === item.id){
          that.removeClass('hidden');
        }
      });
    });

    // Show the page itself.
    page.addClass('visible');

  }

  function renderSingleItemPage(index, data){
      // Shows the Single Product Page with appropriate data.
  }

  function renderFilterResults(filters, items){
      // Crates an object with filtered items and passes it to renderItemsPage.
      renderItemsPage(results);
  }

  function renderErrorPage(){
      // Shows the error page.
  }

//navigation
    // var map = {

    //   // The "Homepage".
    //   '': function() {

    //     // Clear the filters object, uncheck all checkboxes, show all the products
    //     filters = {};
    //     checkboxes.prop('checked',false);

    //     renderProductsPage(items);
    //   };,

    //   // Single Products page.
    //   '#product': function() {

    //     // Get the index of which product we want to show and call the appropriate function.
    //     var index = url.split('#item/')[1].trim();

    //     renderSingleItemPage(index, products);
    //   },

    //   // Page with filtered products
    //   '#filter': function() {

    //     // Grab the string after the '#filter/' keyword. Call the filtering function.
    //     url = url.split('#filter/')[1].trim();

    //     // Try and parse the filters object from the query string.
    //     try {
    //       filters = JSON.parse(url);
    //     }
    //       // If it isn't a valid json, go back to homepage ( the rest of the code won't be executed ).
    //     catch(err) {
    //       window.location.hash = '#';
    //       return;
    //     }

    //     renderFilterResults(filters, items);
    //   }

    // };

//call this function once on pageload
  function generateAllItemsHTML(data){
    var list = $('.all-items .items-list');
    var theTemplateScript = $('#items-template').html();
    //Compile the template​
    var theTemplate = Handlebars.compile (theTemplateScript);
    list.append (theTemplate(data));
    console.log(list);


    // Each item has a data-index attribute.
    // On click change the url hash to open up a preview for this item only.
    // Remember: every hashchange triggers the render function.
    list.find('li').on('click', function (e) {
      e.preventDefault();
      var listIndex = $(this).data('index');
      window.location.hash = 'list/' + listIndex;
    });
  }

  // Get the filters object, turn it into a string and write it into the hash.
  // function createQueryHash(filters){

  //   // Here I check if filters isn't empty.
  //   if(!$.isEmptyObject(filters)){
  //     // Stringify the object via JSON.stringify and write it after the '#filter' keyword.
  //     window.location.hash = '#filter/' + JSON.stringify(filters);
  //   }
  //   else{
  //     // If it's empty change the hash to '#' (the homepage).
  //     window.location.hash = '#';
  //   }


});

// var obj = {
//     name: 'Dhayalan',
//     score: 100
// };

// localStorage.setItem('gameStorage', JSON.stringify(obj));
// And to retrieve the object later, such as on page refresh or browser close/open...

// var obj = JSON.parse(localStorage.getItem('gameStorage'));