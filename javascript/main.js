$(function(){
	'use strict';
	
	var list = $('ul');
	list.delegate('li:not(:last)', 'swipe click', function(){
		var current = $(this).next();
		current.css('left', 0);
		
		window.localStorage.setItem('current', current[0].id);
	});

	var time = 120 * 1000;
	var timerIsOn = false;
	var interval;
	$('time').click(function(){
		if (!timerIsOn) {
			timerIsOn = true;
			interval = window.setInterval(function(){
				time -= 1000;
				$('time').text(getText(time));
				if (time <= 0) {
					turnOffTimer();
				}
			}, 1000)
		} else {
			turnOffTimer();
		}
	});
	
	function turnOffTimer(){
		window.clearInterval(interval);
		timerIsOn = false;
		$('time').text("2:00");
		time = 120 * 1000;
	};	
	
	function getText(time){
		var dateTime = new Date(time);
		var min = dateTime.getMinutes();
		var sec = dateTime.getSeconds();
		if (sec < 10){
			sec = "0" + sec.toString()
		}
		return min + ":" + sec;
	}
	
	window.loadData(function(count){
		if(count == 1){
			var currentId = window.localStorage.getItem('current');
			if(currentId){
				$('#' + currentId).css('left', 0);
			}
		}
	});
});
