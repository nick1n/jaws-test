var game = {
	player: null,
	setup: function() {
		//once
		this.player = new jaws.Sprite({image: 'images/player.png',x:jaws.width * .05,y:jaws.height * .8});
	},
	update: function(){
		//each gametick
		if(jaws.pressed("left"))  { this.player.x--; }
		if(jaws.pressed("right")) { this.player.x++; }
	},
	draw: function(){
		//after each update
		jaws.clear();
		this.player.draw();
	}
};
jaws.onload = function(){
	jaws.assets.add("images/player.png");
	jaws.start(game);
}