'use strict';
$(function () {
  //Global Variables
  var owner = 'Geoff';
  var items = [];
  var tasks = [];

  // Set event handlers
  $('#filters').on('click', '.my-lists', function(){
    var results = [];
    $.each(items, function(key,value) {
      var myList = value.owners;
      if($.inArray(owner, myList)!==-1 && myList.length === 1){
        results.push(value);
      }
    });
    renderListsPage(results);
  });

  $('#filters').on('click', '.shared-lists', function(){
    var results = [];
    $.each(items, function(key,value) {
      var sharedList = value.owners;
      if($.inArray(owner, sharedList)!==-1 && sharedList.length > 1){
        results.push(value);
      }
    });
    renderListsPage(results);
  });
  //Mark item as done
  $('.items-detail').on('click','span',function() {
    $(this).find('a').toggleClass('ui-icon-check');
    $(this).next('span').toggleClass('strikethrough');
  });
  //Delete item
  $('.items-detail').on('click','span:not(first)', function(){
    alert('got it');
    $(this).parent().hide();
  })

    //Get the List Items
    $.getJSON( 'items.json', function( data ) {
    items = data;
        // Call a function that will turn that data into HTML.
        generateAllListsHTML(data);
    });

    //Get the User Tasks
    $.getJSON( 'data/tasks.json', function( data ) {
    tasks = data;
        // Call a function that will turn that data into HTML.
        // generateAllTasksHTML(data);
    });

  // This function receives an object containing all the products to show.
  function renderListsPage(data){
    var page = $('.all-lists'),
      allItems = $('.all-lists .items-list > li');

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

  function renderItemsPage(data){
    var page = $('.all-lists'),
      allItems = $('.all-items .items-detail > li');

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

  function renderErrorPage(){
      // Shows the error page.
  }


// Handlebars compile the lists template
  function generateAllListsHTML(data){
    var list = $('.all-lists .items-list');
    var theTemplateScript = $('#lists-template').html();
    //Compile the template​
    var theTemplate = Handlebars.compile (theTemplateScript);
    list.append (theTemplate(data));

    // Each item has a data-index attribute.
    // On click get the data to be injected into the page for this list only.
    list.find('li').on('click', function (e) {
      e.preventDefault();
      var listIndex = $(this).data('index');
      var results = findListById(listIndex);
      window.location.hash = '#two';

    });
  }
// Handlebars compile the items template from the script tag
  function generateAllItemsHTML(results){
    var items = $('.all-items .items-detail');
    var theTemplateScript = $('#items-template').html();
    //compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);
    var detached = items;
    // $('body').append(detached);
    items.append(theTemplate(results));
  }

//get all items from a list
  function findListById(listIndex){
    var results = [];
    $.each(items, function(key,value) {
      var listId = value.id;
      if( listId === listIndex){
        results.push(value);
      }
    });
    generateAllItemsHTML(results);
  }

});

// var obj = {
//     name: 'Dhayalan',
//     score: 100
// };

// localStorage.setItem('gameStorage', JSON.stringify(obj));
// And to retrieve the object later, such as on page refresh or browser close/open...

// var obj = JSON.parse(localStorage.getItem('gameStorage'));