function myGameState(){
	var player;
	this.setup = function() {
		//once
		player = new jaws.Sprite({image: 'images/player.png',x:50,y:20});
	};
	this.update = function(){
		//each gametick
		if(jaws.pressed("left"))  { player.x--; }
		if(jaws.pressed("right")) { player.x++; }
	};
	this.draw = function(){
		//after each update
		jaws.clear();
		player.draw();
	};
}
jaws.onload = function(){
	jaws.assets.add("images/player.png");
	jaws.start(myGameState);
}