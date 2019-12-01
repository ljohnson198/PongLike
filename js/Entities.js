class Entity extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, key) {
		super(scene, x, y, key)
		this.scene.add.existing(this);
		this.scene.physics.world.enableBody(this, 0);
	}
}

class Ball extends Entity {

	constructor(scene,x,y){

		super(scene, x, y, "sprBall");
		this.setOrigin(0.5);
		this.body.setBounce(1);

		this.setData("speed", 500);
		this.body.setVelocity(this.getData("speed"), 0);

	}

	update() {

		if (this.y < this.displayHeight * 0.5 || this.y > this.scene.game.config.height - (this.displayHeight *0.5)) {
			this.body.velocity.y = -this.body.velocity.y;
		}

	}
}

class PaddlePlayer extends Entity {
	constructor(scene, x, y) {
		super(scene, x, y, "sprPaddle");
		this.setOrigin(0.5);
		this.body.setImmovable(true);
		this.setData("speed", 500);
	}

	moveUp() {
		this.body.setVelocityY(-this.getData("speed"));
	}

	moveDown() {
		this.body.setVelocityY(this.getData("speed"));
	}

	update() {
		this.body.setVelocity(0,0);
		this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);
	}

}

class PaddleCPU extends Entity {
	constructor(scene,x,y) {
		super(scene, x, y, "sprPaddle");
		this.setOrigin(0.5);
		this.body.setImmovable(true);
	}

	update() {
		this.body.setVelocity(0,0);
		this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);
	}
}