
//Make a function that takes the id from the selected letter
//Give it an id
var letter = ''
$(document).ready(function(){
	$('span').click(function(){
		letter = $(this).attr('id')
		console.log(letter)
	})
})

