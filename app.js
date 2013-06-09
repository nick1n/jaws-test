var game = {
	constants : {
		FRICTION : 0.90,
		GRAVITY : 1,
		FLOOR : 336
	},
	player: null,
	setup: function() {
		//once
		this.player = new jaws.Sprite({image: 'images/player.png',x:jaws.width * .05,y:jaws.height * .4});
		this.player.vx = 0;
		this.player.vy = 0;
		this.player.state = "standing";
		this.player.run = 10;
		this.player.grav = function(){
			this.vx *= game.constants.FRICTION;
			this.vy *= game.constants.FRICTION;
			if( game.player.y < game.constants.FLOOR ){
				game.player.vy -= game.constants.GRAVITY;
			} else {
				game.player.vy = 0;
				game.player.y = game.constants.FLOOR;
				game.player.state = "standing";
			}
		}
		this.player.move = function(){
			this.x += this.vx;
			this.y -= this.vy;
			this.grav();
		}
		jaws.on_keydown("space", function(){
			if(this.player.state == "jumping"){
				this.player.vy += 20;
				this.player.state = "dbljumping";
			}
			if(this.player.state != "jumping" && this.player.state != "dbljumping"){
				this.player.vy += 25;
				this.player.state = "jumping";
			}
		}.bind(this));
	},
	update: function(){
		//each gametick
		if(jaws.pressed("left") && jaws.pressed)  { this.player.x -= this.player.run; }
		if(jaws.pressed("right")) { this.player.x += this.player.run; }
		this.player.move();
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