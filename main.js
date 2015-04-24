//Quote Constructor

var Quote = function(author, quote, password){
  this.author = author;
  this.quote = quote;
  this.password = password;
  this.rating = 'None yet.  Be the first!';
  this.ratingArray  = [];
  this.rateButton = 'Rate Me!';
  this.deleteButton = 'Remove Quote';
  this.render(); 
};

// Empty Quote Array to be populated as quotes are submitted via form
var quoteArray = [];

// Not entirely necessary, but decided to try puttin these buttons into variables as practice
var sortButton = $('.sort-button');

var randomizeButton = $('.random-button');


$(document).on('ready', function() {


Quote.prototype.render = function() {
    if(this.el === undefined){
      this.el = $('#tpl-quote')
          .clone()
          .attr('id', null)
          .addClass('quote');
          var originalQuote = this;
          // Ask user for a quote - must be between 1 and 5, otherwise asks again
          this.el.find('.rating-button').on("click", function(){
            var rating = Number(prompt("Please rate this quote from 1 to 5"));
            while(rating < 1 || rating > 5){
              rating = Number(prompt("That is an unacceptable answer.  Please rate this quote from 1 to 5"));
            }
            console.log(rating);
            // Pushes quote to an array, so it can find the average and display that
            originalQuote.ratingArray.push(rating);
              var avgRating = function(arr){
                var sum = 0;
                for(var i=0 ; i<arr.length ; i++){
                  sum+=arr[i]; 
                }
                var rating = sum/arr.length;
                return rating;
              }
              originalQuote.rating = avgRating(originalQuote.ratingArray);
              console.log(originalQuote.rating);
              originalQuote.render();
            })
          //Clicking the delete button will ask you for an accurate password, otherwise you can't delete the quote entry.  If you meet criteria, it will delete from the DOM and the array via splice method.
          this.el.find('.delete-button').on("click", function(){
            var passwordMatch = prompt("Please enter the delete password");
            console.log(passwordMatch);
            if(passwordMatch === originalQuote.password){
              originalQuote.el.remove();
              for(var i = 0 ; i < quoteArray.length ; i++){
                if(quoteArray[i]['author'] === originalQuote.author){
                  quoteArray.splice(i,1);
                } 
              }
              
            }
            else{
              alert('Whoops, wrong password!  Please try again.');
            }
          
          })
        }


    this.el.find('.quote-author').text(this.author);
    this.el.find('.quote-text').text(this.quote);
    this.el.find('.quote-password').text(this.password);
    this.el.find('.quote-rating').text(this.rating);
    this.el.find('.rating-array').text(this.ratingArray);
    this.el.find('.rating-button').text(this.rateButton);
    this.el.find('.delete-button').text(this.deleteButton);

    

    return this.el;


};


// Takes values from form and enters them as arguments into Quote constructor.  Then it appends it to the quote list, shows the sort button and pushes the quote to the array

$(".quote-entry").on("submit",function(event){
    event.preventDefault();
    var quote = $(".form-quote").val();
    $(".form-quote").val("");
    console.log(quote);
    var author = $(".form-author").val();
    $(".form-author").val("");
    console.log(author);
    var password = $(".form-password").val();
    $(".form-password").val("");
    console.log(author);

    var currentQuote = new Quote(author, quote, password);
    console.log(currentQuote);

    $('.quote-list').append(currentQuote.el);

    sortButton.show();

    // randomizeButton.show();  -  Functionality does not work properly yet

    quoteArray.push(currentQuote);

  });

// This sorts the array by rataing (highest to lowest) and then re-renders it to the DOM

sortButton.on("click", function(){
  quoteArray.sort(function(a, b){
    return b.rating-a.rating
  });


  for (var i=0 ; i<quoteArray.length ; i++){

    $('.quote-list').append(quoteArray[i].render());
  }

})


// //--------Code below is an attempt at display a random quote, which works, but if you display another quote, the old one remains.  Efforts to use .remove() were not working appropriately
// randomizeButton.on("click", function(){

//     $('#random-quote-container').show();

//     var randomQuote = quoteArray[Math.floor(Math.random()*quoteArray.length)];
    
//     $('#random-quote-container').prepend("<div class='randomized-quote'>"+'\"'+randomQuote['quote']+'\"'+"</div>");
    


//     console.log($('.randomized-quote'));
//     $('.close-random-quote').on("click", function(){

//         console.log($('.randomized-quote'));


//         $('#random-quote-container').hide();


//       })

// })


});
