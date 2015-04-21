// var Submission = function(quote,author){
// 	this.quote = quote;
// 	this.author = author;
// }

$(document).on('ready', function() {

	$(".quote-entry").on("submit",function(event){
	event.preventDefault();
	var quote = $(".form-quote").val();
	$(".form-quote").val("");
	//console.log(quote);
	var author = $(".form-author").val();
	$(".form-author").val("");
	//console.log(author);
	var Submission = function(quote,author){
		this.quote = quote;
		this.author = author;
		this.rating = 0;
		this.numReviews = 0;
	}
	
	var newEntry = new Submission(quote, author);
	console.log(newEntry.quote);
	console.log(newEntry.author);


	$('.quote-list').append('<li><span>Quote:  \"</span><div class="listed-quote">'+newEntry.quote+'</div><span>\"</span><br><span>Author:  </span><div class="listed-author">'+newEntry.author+'</div><br><span>Rating:  </span><div class="listed-rating">'+newEntry.rating+'</div><button class="rating-button">Rate Me!</button><br><br></li>');
	

	$('.rating-button').on("click", function(e){
		e.preventDefault();
		var rating = prompt("Please rate this quote from 1 to 5");
		console.log(rating);
		newEntry.numReviews++
		console.log(newEntry.numReviews);
		var cumulativeRating = ((newEntry.rating*(newEntry.numReviews-1)) + rating)/newEntry.numReviews;
		console.log(cumulativeRating);
		$('.listed-rating').replaceWith(cumulativeRating);

	});

	});





  
});