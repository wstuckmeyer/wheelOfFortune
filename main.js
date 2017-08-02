
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
		{'fillStyle':'#ef0758','text':'1,000','value':1000},
		{'fillStyle':'#8402ef','text':'2','value':2},
		{'fillStyle':'#02e83b','text':'4,000','value':4000},
		{'fillStyle':'#04ddf9','text':'300','value':300},
		{'fillStyle':'#f5f904','text':'600','value':600},
		{'fillStyle':'#ad0855','text':'6','value':6},
		{'fillStyle':'#e21309','text':'700','value':700},
		{'fillStyle':'#FFFFFF','text':'Bankrupt','value':0}
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
	// $('#spinStuff').css('display','none');
	// $('#lowerContent').delay(5000).fadeIn('slow');
})
//gets the value of the segment the player spun
var spinValue = ''
function getPrize(){
	//checks if the segment is bankrupt
	spinValue=theWheel.getIndicatedSegment();
	if(spinValue.value==0){
		winnings = winnings*0;
		$('#amount').text('$'+winnings)
		startGame();
		theWheel.rotationAngle=0
	}else{
	//otherwise it just gets the value of that piece
	console.log(spinValue.value);
	theWheel.rotationAngle=0
	$('#playAmount').text('This guess is worth: $'+spinValue.text)
	$('#spinStuff').css('display','none');
	$('#lowerContent').fadeIn('slow');
	}	
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
var one = new game('AVACADO TOAST','"Brunch"');
var two = new game('PUMPKIN SPICE LATTE', '"Fall Favorite Drink"');
var three = new game('GLUTEN FREE','"Vegan, Dairy Free, Non GMO, ..."')
var phraseArray = []
//add objects to an array
rounds.prototype.addPhrase = function(game){
	this.rounds.push(game)
}
allGames.addPhrase(one);
allGames.addPhrase(two);
allGames.addPhrase(three);
var winningNumber=0
//pick a random phrase at random
var newRound = allGames.rounds[Math.floor(Math.random()*allGames.rounds.length)]
//next I need to make a variable that will make a white box for the length of the string
$('#play').click(function(){
	$('#play').fadeOut(function(){
		$('#rules').css('display','inline')
		var word = newRound.phrase.length
		var wordArray = newRound.phrase.split('')
		//sets the number of letters a player has to find to win
		winningNumber=wordArray.length
		$('#hint').append('<h2> Category is: ' + newRound.category + '</h2>')
		for(var i=0; i<wordArray.length; i++){
			//console.log(wordArray)
			$('#phrase').append('<div class="box ' + wordArray[i] + '"></div>')
			if(wordArray[i].match(/\s/g)){
				//checks for a space and adds a break 
				$('#phrase').append('<br class="break">');
				var space = wordArray[i]
				$('.break').prev().css('display','none')
				$('.break').prev().attr('class','done')
				//console.log(wordArray[i])
				winningNumber-=1
				console.log(winningNumber)
			}
		}
		startGame();
	})
})

//Make a function that takes the id from the selected letter
//Give it an id


var winValue=0
var winnings=0
var letter = ''
$(document).ready(function(){
	$('#lowerContent').css('display','none');
	$('#play').effect('bounce', {times:3}, 1000);
	$('span').click(function(){
		letter = $(this).attr('id')
		//console.log(letter)
		if(newRound.phrase.match(letter)){
			winValue += $('.' + letter).length
			$('.' + letter).text(letter)
			$('.' + letter).css('fontSize','50px').css('backgroundColor','transparent').css('boxShadow','none')
			$('.' + letter).attr('class', letter + ' done box win')
			//calculate number of letters found to add that times wheel value
			var classNum = $('.' + letter).length
			winnings = winnings + (spinValue.value*classNum)
			console.log(winnings)
			$('#amount').text('$'+winnings)
			//gets rid of selected letter
			$('#' + letter).html('<img src="letters/icons8-delete_sign.png"');
				if(winValue==winningNumber){
				//alert('Win')
				$('#myModal').css('display','block')
     			$('#blur').css('display','block')
     			$('#modalHead').html('<h1>You\'ve Won $ '+ winnings + '</h1><br><h4>Take That to the Bank</h4>')
     			$('#again').effect('shake',3000)
     			$('#again').click(function(){
     				location.reload()
     			})
			}else{
				return
			}
		//remove letter if its been selected incorrectly
		}else if(!newRound.phrase.match(letter)){
			$('#' + letter).html('<img src="letters/icons8-delete_sign.png"');
			$('#spinTxt').text('Wrong Letter! Spin Again.')
			startGame();
		}	
		
	})
})


//function thats in charge of the actual gameplay
//disable letters. only let player spin and then get that value
function startGame(){
	$('#lowerContent').css('display','none')
	$('#spinStuff').css('display','block')
	$('#spinStuff').effect('bounce', {times:8}, 2000)
	theWheel.rotationAngle=0
	//now go back up to the spin on click event
}


