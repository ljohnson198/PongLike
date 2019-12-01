class SceneMain extends Phaser.Scene {
	constructor() {
		super({key:"SceneMain"});
	}

	preload() {

		this.load.image("sprBall", "content/sprBall.png");
		this.load.image("sprPaddle", "content/sprPaddle.png");
		this.load.image("sprHalfLine", "content/sprHalfLine.png");

		this.load.audio("sndHit", "content/sndHit_alt.wav");

	}

	createHalfLine() {

		for (var i = 0; i < this.game.config.height / 16; i++ ) {

			var line = this.add.sprite(this.game.config.width * 0.5, i * 24 + 8, "sprHalfLine");
			this.halfLines.add(line);

		}


	}

	reset() {
		if (this.scorePlayer > 10 || this.scoreCpu > 10) {
			this.setGameOver();
		}
		else {
			this.textScorePlayer.setVisible(true);
			this.textScoreCpu.setVisible(true);
			this.textWin.setVisible(false);

			this.isGameOver = false;
			this.balls.clear(true,true);
		}

	}

	setGameOver() {

		this.isGameOver = true;

		this.balls.clear(true, true);



				//  Timers

		this.time.addEvent({
			delay: 1000,
			callback: function(){
				// reset paddle positions
				this.player.y = this.game.config.height * 0.5;
				this.cpu.y = this.game.config.height * 0.5;

				// remove balls
				this.balls.clear(true, true);

				// create ball
				var ball = new Ball(
					this,
					this.game.config.width * 0.5,
					this.game.config.height * 0.5
				);

				this.balls.add(ball);

								// Nested Timer
				this.time.addEvent({
					delay: 500,
					callback: function() {
						if(this.balls.getChildren().length > 0) {
							var ball = this.balls.getChildren()[0];
							ball.body.setVelocity(
								ball.getData("speed"),
								0
							);
						}
					},
					callbackScope: this,
					loop: false
				});


			},
			callbackScope: this,
			loop: false

		});

		if (this.scorePlayer > 10) {
			this.textWin.setText("YOU WON!");
		}
		else if (this.scoreCpu > 10) {
			this.textWin.setText("CPU WON!");
		}

		this.textScorePlayer.setVisible(false);
		this.textScoreCpu.setVisible(false);
		this.textWin.setVisible(true);

		this.balls.clear(true,true);

		//Restart sequence
		this.time.addEvent({
			delay:3000,
			callback: function() {
				this.scene.start("SceneMain");
			},
			callbackScope: this,
			loop: false
		});

	}

	create() {

		this.sfx = {
			hit: this.sound.add("sndHit")
		};

		this.isGameOver = false;
		this.scorePlayer = 0;
		this.scoreCpu = 0;


		// Add Ball

		this.balls = this.add.group(); // this is made for collision check consistency when ball is destroyed

		var ball = new Ball(
			this,
			this.game.config.width * 0.5,
			this.game.config.height * 0.5
		);

		this.balls.add(ball);


		// Add Paddles

		this.player = new PaddlePlayer(
			this,
			32,
			this.game.config.height * 0.5
		);

		this.cpu = new PaddleCPU(
			this,
			this.game.config.width - 32,
			this.game.config.height * 0.5
		);


		// Add HalfLine

		this.halfLines = this.add.group();
		this.createHalfLine;


		// Text Objects

		this.textScorePlayer = this.add.text(
			this.game.config.width * 0.25,
			64,
			this.scorePlayer,
			{
				fontFamily: "monospace",
				fontSize: 64
			}

		);

		this.textScorePlayer.setOrigin(0.5);

		this.textScoreCpu = this.add.text(
			this.game.config.width * 0.75,
			64,
			this.scoreCpu,
			{
				fontFamily: "monospace",
				fontSize: 64
			}
		);
		this.textScoreCpu.setOrigin(0.5);

		this.textWin = this.add.text(
			this.game.config.width * 0.5,
			64,
			"",
			{
				fontFamily: "monospace",
				fontSize: 64
			}
		);
		this.textWin.setOrigin(0.5);
		this.textWin.setVisible(false);



		// Colliders

		this.physics.add.collider(this.balls, this.player, function(ball, player) {

			var dist = Phaser.Math.Distance.Between(0, ball.y, 0, player.y);

			if (ball.y < player.y) {
				dist = -dist;
			}

			ball.body.velocity.y = dist * 30;
			this.sfx.hit.play();

		}, null, this);



		this.physics.add.collider(this.balls, this.cpu, function(cpu, ball) {

			var dist = Phaser.Math.Distance.Between(0, ball.y, 0, cpu.y);

			if (ball.y < cpu.y) {
				dist = -dist;
			}

			ball.body.velocity.y = dist * 30;
			this.sfx.hit.play();

		}, null, this);


	}


	update() {

		if (this.balls.getChildren.length > 0) {

			var ball = this.balls.getChildren()[0];
			ball.update();

			if (ball.x < 0) {
				this.scoreCpu++;
				this.textScoreCpu.setText(this.scoreCpu);

				this.reset();
			}
			else if (ball.x > this.game.config.width) {
				this.scorePlayer++;
				this.textScorePlayer.setText(this.scorePlayer);

				this.reset();
			}

		if (ball.body !==undefined) {
			var cpuVelY = ball.body.velocity.y;
			this.cpu.body.velocity.y = cpuVelY * Phaser.Math.Between(6,14) * 0.1;
			}
		}

		this.player.update();
		this.player.y = this.input.activePointer.y;


	}

}