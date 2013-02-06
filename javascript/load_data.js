(function(){
	var i = 0;
	window.loadData = function(callback){
		var ul = $('ul');
		$.getJSON('/data.json?date=' + new Date().getTime()).success(function(ret){
			var size = ul.children().size();
			ret = ret.slice(size);
			$(ret).each(function(idx, word){
				ul.append('<li id="slide' + (idx + size) + '"><span>' + word + '</span></li>');
			});
			callback && callback(++i);
			setTimeout(function(){
				window.loadData(callback);
			}, 3000);
		});
	};
})();