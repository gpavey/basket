'use strict';
$(function () {
  //Global Variables
    //  An array containing objects with information about the items.
  var owner = 'Geoff';
  var items = [];

  $('#filters').on('click', '.my-lists', function(){
    $.each(items, function(key,value) {
      console.log(value);
    });
      $('.item-detail').addClass('show');
      // Then I call this function which writes the filtering criteria in the url hash.
    // createQueryHash(filters);
  });

  $('#filters').on('click', '.shared-lists', function(){
    $('.tour').filter('.shared-lists').addClass('show');
    createQueryHash(filters);
  });

  $('#filters').on('click', '.assigned-items', function(){
    $('.tour').filter('.assigned-items').addClass('show');
    createQueryHash(filters);
  });

    //Get the Data
    $.getJSON( 'data.json', function( data ) {
        // Write the data into the global variable.
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


    function renderItemsPage(data){
        // Hides and shows items in the All Items Page depending on the data it recieves.
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


//call this function once on pageload
  function generateAllItemsHTML(data){
    var list = $('.all-items .items-list');
    var theTemplateScript = $('#items-template').html();
    //Compile the template​
    var theTemplate = Handlebars.compile (theTemplateScript);
    list.append (theTemplate(data));


    // Each item has a data-index attribute.
    // On click change the url hash to open up a preview for this item only.
    // Remember: every hashchange triggers the render function.
    list.find('li').on('click', function (e) {
      e.preventDefault();
      var listIndex = $(this).data('index');
      window.location.hash = 'list/' + listIndex;
    })
  }

  // Get the filters object, turn it into a string and write it into the hash.
  function createQueryHash(filters){

    // Here I check if filters isn't empty.
    if(!$.isEmptyObject(filters)){
      // Stringify the object via JSON.stringify and write it after the '#filter' keyword.
      window.location.hash = '#filter/' + JSON.stringify(filters);
    }
    else{
      // If it's empty change the hash to '#' (the homepage).
      window.location.hash = '#';
    }

  }
});

// var obj = {
//     name: 'Dhayalan',
//     score: 100
// };

// localStorage.setItem('gameStorage', JSON.stringify(obj));
// And to retrieve the object later, such as on page refresh or browser close/open...

// var obj = JSON.parse(localStorage.getItem('gameStorage'));