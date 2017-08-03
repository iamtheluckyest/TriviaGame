function makeQuestion(q, i, f, a) {
	var question;
	var img;
	var fact;
	var used;

	this.question = q;
	this.img = i;
	this.fact = f;
	this.answers = a;
};

/****************************
Variables
****************************/

var start=true; // Disables "click to start" welcome message after it is clicked
var qInterval; // setTimeout until question time is up
var aInterval; // setTimeout until answer time is up
var endTime; // setTimeout for last question
var timeLength = 20; //set to however long the timer should be for
var seconds = timeLength;
var timer;
var qNum = 0; // keeps track of question number
var correct = 0; // keeps track of right answers
var incorrect = 0; // keeps track of wrong answers
var radioValue; // Stores value of answer. Set to "timeout" (somewhat arbitrarily) if no answer is selected
var answersArray = []; // Gets the value of the answers for the currect question
var questionsOrig = [
	new makeQuestion(
		"What was the name of the second Indiana Jones movie, released in 1984?", 
		"https://upload.wikimedia.org/wikipedia/en/1/10/Indiana_Jones_and_the_Temple_of_Doom_PosterB.jpg", 
		"The inspiration for the “Indiana” in Indiana Jones’ name came from the name of producer George Lucas’ Alaskan Malamute.", 
	{
		"<em>Indiana Jones and the Temple of Doom</em>" : true,
		"<em>Indiana Jones and the Raiders of the Lost Ark</em>" : false,
		"<em>Indiana Jones and the Last Crusade</em>" : false,
		"<em>Indiana Jones and the Kingdom of the Crystal Skull</em>" : false
	}
	),
	new makeQuestion(
		"Which of the following movies was not directed by Martin Scorcese?", 
		"https://upload.wikimedia.org/wikipedia/en/a/a7/2001_A_Space_Odyssey_%281968%29_theatrical_poster_variant.jpg", 
		"<em>2001: A Space Odyssey</em> was the last movie made about men on the moon before Neil Armstrong and Buzz Aldrin walked there in real life. 40 years later, conspiracy theorists insist that this is not a coincidence, claiming that all footage of Armstrong’s voyage was a hoax film directed by Stanley Kubrick using leftover scenes and props from this movie.", 
	{
		"<em>Shutter Island</em>" : false,
		"<em>Hugo</em>" : false,
		"<em>The Last Temptation of Christ</em>" :false,
		"<em>2001: A Space Odyssey</em>" : true
	}
	),
	new makeQuestion(
		'The line "I love the smell of napalm in morning" comes from which movie about the Vietnam War?', 
		"https://upload.wikimedia.org/wikipedia/en/c/c2/Apocalypse_Now_poster.jpg", 
		"<em>Apocalypse Now</em>, which was inspired by the book <em>Heart of Darkness</em> was originally intended to be directed by George Lucas but Lucas dropped out to film <em>Star Wars</em> instead. The movie contains a nod to Lucas in its naming of Colonel Lucas, played by Harrison Ford.", 
	{
		"<em>The Deer Hunter</em>" : false,
		"<em>Platoon</em>" : false,
		"<em>Apocalypse Now</em>" : true,
		"<em>We Were Soldiers</em>" : false
	}
	),
	new makeQuestion(
		"Humphrey Bogart stars alongside which actress in the 1943 film <em>Casablanca</em>?", 
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/CasablancaPoster-Gold.jpg/409px-CasablancaPoster-Gold.jpg", 
		'While this movie has many memorable quotes, one of the most well-known, "Play it again, Sam," is actually a misquotation. The actual line is merely "Play it, Sam."', 
	{
		"Elizabeth Taylor" : false,
		"Ingrid Bergman" : true,
		"Lana Turner" : false,
		"Barbara Stanwick" : false
	}
	),
	new makeQuestion(
		"In the movie <em>The Shining</em>, what phrase is repeated in the manuscript that Jack Torrance writes?", 
		"https://upload.wikimedia.org/wikipedia/en/2/25/The_Shining_poster.jpg", 
		"Stephen King, who wrote the book <em>The Shining</em> that inspired the movie, didn't like the casting of Jack Nicholson as Jack Torrance. Because Nicholson's last movie had been <em>One Flew Over the Cuckoo's Nest</em> and because of Nicholson's characteristic creepy grin, King felt that the audience could identify him as crazy from the first scene. This detracted from what he felt was intended to be a story about the gradual descent into madness caused by the environment of the hotel.", 
	{
		"REDRUM" : false,
		"Jack and Jill went up a hill." : false,
		"All work and no play makes Jack a dull boy." : true,
		"Here's Johnny!" : false
	}
	),
	new makeQuestion(
		"How many monkeys are in the title of the 1995 sci-fi movie starring Bruce Willis?", 
		"https://images-na.ssl-images-amazon.com/images/M/MV5BN2Y2OWU4MWMtNmIyMy00YzMyLWI0Y2ItMTcyZDc3MTdmZDU4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg", 
		"<em>Twelve Monkeys</em> was based off of the French short film <em>La Jetée</em>. However, Terry Gilliam, the director of the full-length feature, did not watch the French version before going to work on <em>Twelve Monkeys</em?, partly to keep himself from being intimidated by the original.", 
	{
		"Three" : false,
		"Six" : false,
		"Nine" : false,
		"Twelve" : true
	}
	),
	new makeQuestion(
		"Which of the following actors appear in both Christopher Nolan's <em>Dark Knight Rises</em>, and <em>Inception</em>?", 
		"http://4.bp.blogspot.com/-o8sHgLRcZIQ/UAfQWguwVMI/AAAAAAAAB4c/qshEapcvJ3A/s1600/John+Blake+&+Miranda+Blake-Joseph+Gordon+Levitt+&+Marion+Cotillard.jpg", 
		"Also appearing in both of these movies were Joseph Gordon-Levitt, Tom Hardy, and Cillian Murphy.", 
	{
		"Joseph Gordon-Levitt and Anne Hathaway" : false,
		"Christian Bale and Tom Hardy" : false,
		"Michael Caine and Marion Cotillard" : true,
		"Gary Oldman and Mark Boone Junior" : false
	}
	),
	new makeQuestion(
		"Which of the following actors was approached to play the role of Neo in <em>The Matrix</em> but turned it down, resulting in Keanu Reeves' eventual casting?", 
		"http://t0.gstatic.com/images?q=tbn:ANd9GcQq3pIz-aKgkmYX1dJ-EL-AlHSPcOO7wdqRIJ5gJy9qNinXpmle", 
		"In the first forty-five minutes of the film, Neo has eighty lines. Forty-four of these lines are questions, just over half of his total dialogue, averaging at roughly one question per minute.", 
	{
		"Hugh Jackman" : false,
		"Will Smith" : true,
		"Ewan McGregor" : false,
		"Rufus Sewell" : false
	}
	),
	new makeQuestion(
		"Most well-known for his direction for suspense films, Alfred Hitchcock also directed which of the following comedies?", 
		"http://t2.gstatic.com/images?q=tbn:ANd9GcT_tWgjtCwcV8j2tyQwe_maWP2tJOqvlHUdpqT45uvTlXI9yLNa", 
		'Alfred Hitchcock appears on a 32-cent U.S. postage stamp, in the "Legends of Hollywood" series, that was released 8/3/98 in Los Angeles, California.', 
	{
		"Pillow Talk" : false,
		"The Matchmaker" : false,
		"Harvey" : false,
		"The Trouble with Harry" : true
	}
	),
	new makeQuestion(
		"Which actor, in addition to playing James Bond, starred in the television show <em>Remington Steel</em>?", 
		"http://8games.ucoz.ru/_ld/4/83242882.jpg", 
		'All 94 episodes of <em>Remington Steele</em> contain the word "Steele" in their titles - most of them are puns.', 
	{
		"Pierce Brosnan" : true,
		"Sean Connery" : false,
		"Roger Moore" : false,
		"Timothy Dalton" : false
	}
	)
	];
var questions = questionsOrig; // Gets value of the questionsOrig object while preserving the original


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function qTime() {
	// display question after timeLength seconds
	clearInterval(timer);
	qInterval = setTimeout(displayQuestion, 1000 * timeLength);
};

function aTime() {
	// display answer after timeLength seconds
	clearInterval(timer);
	aInterval = setTimeout(displayAnswer, 1000 * timeLength);	
};

function timeBar() {
	seconds = timeLength;
	timer = setInterval(function(){
			seconds--;
			console.log(seconds)
			$("#inner-timer").css("width", ((seconds/timeLength)*100 + "%"))
		}, 1000);
	
}

function displayQuestion() {
	clearTimeout(aInterval);
	timeBar();
	$("#answers").empty();
	$("#displayAnswer").css("display", "none");
	$("#q-header").html("Question " + (qNum+1));
	$("#question").html(questions[qNum].question);
	answersArray = Object.keys(questions[qNum].answers)
	for (i=0; i < 4; i++){
		$("#answers").append("<input id='answer-button' type='radio' value='" + answersArray[i] + "'>" + answersArray[i] + "<br>");
	};
	$("#qs-left").html("Questions left: " + (questions.length-(correct+incorrect)));
	qNum++;
	radioValue = "timeout";
	aTime();
};

function displayAnswer() {
	clearTimeout(qInterval);
	timeBar();
	$("#answers").empty();
	$("#displayAnswer").css("display", "block");
	//Find and display correct answer
	for (i=0; i < 4; i++){
		if(questions[(qNum-1)].answers[answersArray[i]] === true) {
			$("#correct-answer").html(answersArray[i]);
		}
	};
	$('#correct-img').attr("src", questions[(qNum-1)].img);
	$('#fact').html(questions[(qNum-1)].fact);

	if(questions[(qNum-1)].answers[radioValue] === true) {
	 	$("#a-header").html("You are correct!");
	 	correct++;
	 	$("#stat-correct").html("Correct answers: " + correct);
	}
	else if (radioValue === 'timeout') {
		$("#a-header").html("Out of time! The correct answer is:");
	 	incorrect++;
	 	$("#stat-incorrect").html("Incorrect answers: " + incorrect);
	}
	else {
	 	$("#a-header").html("That was incorrect! The correct answer is:");
	 	incorrect++;
	 	$("#stat-incorrect").html("Incorrect answers: " + incorrect);
	};

	// Next question
	if (qNum < questions.length){
		qTime();
	}
	// Stop game
	else {
		$("#next-question").html("End quiz").attr("id", "end");
		endTime = setTimeout(endGame, 1000 * timeLength);
	}
};
	
function endGame() {
	clearTimeout(aInterval);
	clearTimeout(endTime);
	clearTimeout(qInterval);
	if (correct === questions.length) {
		$("#q-header").html(correct + "/" + questions.length + "! A perfect score!");
		$("#question").html("Play again to show off!");
	}
	else if ((correct/questions.length) < .5) {
		$("#q-header").html(correct + "/" + questions.length + "! You can do better than that...");
		$("#question").html("I believe in you! Try it again.");
	}
	else {
		$("#q-header").html(correct + "/" + questions.length + "! Not bad...");
		$("#question").html("...For a novice! Try again?");
	}
	$("#end").html("Next question").attr("id", "next-question");
	$("#displayAnswer").css("display", "none");
	$("#answers").append("<button class='btn' id='replay'>Replay</button>");
	$(document).on("click", "#replay", function(){
		qNum = 0;
		correct = 0;
		incorrect = 0;
		questions = questionsOrig;
		shuffle(questions);
		displayQuestion();
	});
}

$(document).ready(function() {
	$("#q-header, #question").on("click", function() {
		$("#q-header, #question").css("cursor", "default");
		timeBar();
		if (start===true) {
			start=false
			shuffle(questions);
			displayQuestion();
		}
	});

	$(document).on("click", "#answer-button", function(){
		radioValue = $("input:checked").val();
		displayAnswer();
	});

	$(document).on("click", "#next-question", function(){
		clearTimeout(qInterval);
		displayQuestion();
	});

	$(document).on("click", "#end", function(){
		endGame();
	});

});
