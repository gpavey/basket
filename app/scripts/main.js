'use strict';
$(function () {
  //Global Variables
  var owner = 'Geoff';
  var items = [];
  var tasks = [];

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

    //Get the List Items
    $.getJSON( 'items.json', function( data ) {
    items = data;
        // Call a function that will turn that data into HTML.
        generateAllItemsHTML(data);
    });

    //Get the User Tasks
    $.getJSON( 'data/tasks.json', function( data ) {
    tasks = data;
        // Call a function that will turn that data into HTML.
        // generateAllTasksHTML(data);
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
    });
  }

// call this function once on pageload
  // function generateAllTasksHTML(data){
  //   console.log('task-data: '+data);
  //   var task = $('.all-tasks .tasks-list');
  //   var theTemplateScript = $('#tasks-template').html();
  //   //compile the template
  //   var theTemplate = Handlebars.compile(theTemplateScript);
  //   task.append(theTemplate(data));
  //   console.log('task:'+task);
  // }

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