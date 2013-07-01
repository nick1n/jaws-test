
var Keyboard = {

	// states
	UP: 1,
	DOWN: 2,

	keys: {},

	setup: function() {

		$(document).on('keydown', Keyboard.down);
		$(document).on('keypress', Keyboard.press);
		$(document).on('keyup', Keyboard.up);

	},

	down: function(event) {
		var which = event.which;

		if (Keyboard.keys[which]) {
			if (Keyboard.keys[which].state == Keyboard.UP) {
				Keyboard.keys[which].state = Keyboard.DOWN;
				Keyboard.keys[which].callback();
			}
		}
	},

	press: function(event) {

	},

	up: function(event) {
		var which = event.which;

		if (Keyboard.keys[which]) {
			Keyboard.keys[which].state = Keyboard.UP;
		}
	},

	register: function(which, callback) {
		Keyboard.keys[which] = {};
		Keyboard.keys[which].state = Keyboard.UP;
		Keyboard.keys[which].callback = callback;
	}
};

var Player = {

	//states
	STANDING: 0,
	JUMPING: 1,
	DBL_JUMPING: 2,


	sprite: null,
	vx: 0,
	vy: 0,
	state: null,
	run: 750,
	accelerate: 0.7,
	speed: 0,


	setup: function() {
		Player.sprite = new jaws.Sprite({
			image: 'images/player.png',
			x: jaws.width * .05,
			y: jaws.height * .4
		});

		Keyboard.setup();
		Keyboard.register(32, Player.jump);
		//jaws.on_keydown("space", Player.jump);

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
			Player.speed = -Player.run;

		} else if (jaws.pressed("right")) {
			Player.speed = Player.run;

		} else {
			Player.speed = 0;
		}

		Player.vx = Player.accelerate * Player.speed * tick + (1 - Player.accelerate) * Player.vx;
		if (Math.abs(Player.vx) < 0.0001) {
			Player.vx = 0;
		}

		Player.sprite.x += Player.vx;
		Player.sprite.y -= Player.vy * tick;
	},

	jump: function() {

		if (Player.state == Player.JUMPING) {
			Player.vy = 1000;
			Player.state = Player.DBL_JUMPING;
		}

		if (Player.state != Player.JUMPING && Player.state != Player.DBL_JUMPING) {
			Player.vy = 1500;
			Player.state = Player.JUMPING;
		}
	}

};

var Box = {

	sprite: null,

	setup: function() {

		Box.sprite = new jaws.Sprite({
			image: 'images/player.png',
			x: jaws.width * .5,
			y: jaws.height * .6
		});

	},

	update: function(tick) {},

	draw: function() {
		Box.sprite.draw();
	}

};

var Game = {

	//constants
	FRICTION: 0.70,
	GRAVITY: 10000,
	FLOOR: 336,


	setup: function() {
		//once
		Player.setup();
		Box.setup();
	},

	update: function() {
		var tick = jaws.game_loop.tick_duration / 1000;

		//each gametick
		Player.update(tick);
		Box.update(tick);
	},

	draw: function() {
		//after each update
		jaws.clear();

		Player.draw();
		Box.draw();
	}

};

jaws.onload = function() {
	jaws.assets.add("images/player.png");
	jaws.start(Game);
}
