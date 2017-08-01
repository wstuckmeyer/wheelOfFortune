
//Make a function that takes the id from the selected letter
//Give it an id
var letter = ''
$(document).ready(function(){
	$('span').click(function(){
		letter = $(this).attr('id')
		console.log(letter)
	})
})
//create something that represents the word and displays white squares for each letter in the word
//when a user clicks a letter check if it matches any of the letters in the word
//also need a button that when clicked randomly adds a dollar amount that the user
//wins if they guess a correct letter X the number of that letter
//if they click on a vowel make it subtract $200
//also add a bankrupt option that takes away all the players money
//if they click solve the player doesn't have to spin again. they can keep clicking letters
//if they click a wrong letter in solve they lose money and have to spin again and keep guessing


//making the wheel
var theWheel = new Winwheel({
	'numSegments':8,
	'textOrientation':'vertical',
	'textFontFamily':'Courier',
	'textFontSize':17,
	'textFontWeight':'bold',
	'segments':[
		{'fillStyle':'#ef0758','text':'1,000'},
		{'fillStyle':'#8402ef','text':'2'},
		{'fillStyle':'#02e83b','text':'4,000'},
		{'fillStyle':'#04ddf9','text':'300'},
		{'fillStyle':'#f5f904','text':'600'},
		{'fillStyle':'#ad0855','text':'6'},
		{'fillStyle':'#e21309','text':'5,000'},
		{'fillStyle':'#FFFFFF','text':'700'}
	],
	'pins':true,
	'animation':{
		'type':'spinToStop',
		'duration':4,
		'clearTheCanvas':true,
		'callbackFinished':'getPrize();',
		'direction':'clockwise'
			},
	
});
//adds spin functionality
$('#spin').click(function(){
	theWheel.startAnimation();
	$('#spinStuff').css('display','none');
	$('#lowerContent').delay(5000).fadeIn('slow');
})
var spinValue = ''
function getPrize(){
	spinValue=theWheel.getIndicatedSegment();
	console.log(spinValue.text);
	theWheel.rotationAngle=0
	$('#playAmount').text('This guess is worth: '+spinValue.text)
	
}
//create object constructor for words
function game(phrase, category){
	this.phrase=phrase,
	this.category=category
}
//create array to add every round to
function rounds(){
	this.rounds=[]
}

rounds.prototype=Object.create(game.prototype)
var allGames = new rounds()
var one = new game('AVACADO TOAST','Brunch');
var two = new game('I LITERALLY CAN NOT', '"Can You?"');
var three = new game('GLUTEN FREE','"Vegan, Dairy Free, Non GMO, ..."')
var phraseArray = []
//add objects to an array
rounds.prototype.addPhrase = function(game){
	this.rounds.push(game)
}
allGames.addPhrase(one);
allGames.addPhrase(two);
allGames.addPhrase(three);

//pick a random phrase at random
var newRound = allGames.rounds[Math.floor(Math.random()*allGames.rounds.length)]
//next I need to make a variable that will make a white box for the length of the string
$('#play').click(function(){
	$('#play').fadeOut(function(){
		var word = newRound.phrase.length
		var wordArray = newRound.phrase.split('')
		$('#hint').append('<h2>' + newRound.category + '</h2>')
		for(var i=0; i<wordArray.length; i++){
			//console.log(wordArray)
			$('#phrase').append('<div class="box ' + wordArray[i] + '"></div>')
			if(wordArray[i].match(/\s/g)){
				$('#phrase').append('<br class="break">');
				var space = wordArray[i]
				$('.break').prev().css('display','none')
				//console.log(wordArray[i])	
			}
		}
		startGame();
	})
})

//Make a function that takes the id from the selected letter
//Give it an id
var winnings=0
var letter = ''
$(document).ready(function(){
	$('span').click(function(){
		letter = $(this).attr('id')
		//console.log(letter)
		if(newRound.phrase.match(letter)){
			$('.' + letter).text(letter)
			$('.' + letter).css('fontSize','50px').css('backgroundColor','transparent')
			var text = spinValue.text
			var addNew = parseInt(text)
			winnings = this.winnings + addNew
			console.log(winnings)
			$('#amount').text('$'+winnings)
		}else if(!newRound.phrase.match(letter)){
			$('#' + letter).html('<img src="letters/icons8-delete_sign.png"');
			startGame();
		}else{
			return
		}
	})
})


//function thats in charge of the actual gameplay
//disable letters. only let player spin and then get that value
function startGame(){
	$('#lowerContent').css('display','none')
	$('#spinStuff').css('display','block')
	//now go back up to the spin on click event
}


