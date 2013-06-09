
var Player = {

	//states
	STANDING: 0,
	JUMPING: 1,
	DBL_JUMPING: 2,


	sprite: null,
	vx: 0,
	vy: 0,
	state: null,
	run: 1000,

	setup: function() {
		Player.sprite = new jaws.Sprite({
			image: 'images/player.png',
			x: jaws.width * .05,
			y: jaws.height * .4
		});

		jaws.on_keydown("space", Player.jump);

		Player.state = Player.STANDING;
	},

	update: function(tick) {
		Player.move(tick);
		Player.grav(tick);
	},

	draw: function() {
		Player.sprite.draw();
	},

	grav: function(tick) {
		Player.vx *= Game.FRICTION;
		Player.vy *= Game.FRICTION;

		if (Player.sprite.y < Game.FLOOR) {
			Player.vy -= Game.GRAVITY * tick;

		} else {
			Player.vy = 0;
			Player.sprite.y = Game.FLOOR;
			Player.state = Player.STANDING;
		}
	},

	move: function(tick) {
		if (jaws.pressed("left")) {
			Player.sprite.x -= Player.run * tick;
		}

		if (jaws.pressed("right")) {
			Player.sprite.x += Player.run * tick;
		}

		Player.sprite.x += Player.vx * tick;
		Player.sprite.y -= Player.vy * tick;
	},

	jump: function() {
		if (Player.state == Player.JUMPING) {
			Player.vy += 2000;
			Player.state = Player.DBL_JUMPING;
		}

		if (Player.state != Player.JUMPING && Player.state != Player.DBL_JUMPING) {
			Player.vy += 2500;
			Player.state = Player.JUMPING;
		}
	}

};

var Game = {

	//constants
	FRICTION: 0.90,
	GRAVITY: 10000,
	FLOOR: 336,


	setup: function() {
		//once
		Player.setup();
	},

	update: function() {
		var tick = jaws.game_loop.tick_duration / 1000;

		//each gametick
		Player.update(tick);
	},

	draw: function() {
		//after each update
		jaws.clear();

		Player.draw();
	}

};

jaws.onload = function() {
	jaws.assets.add("images/player.png");
	jaws.start(Game);
}
