class SceneMainMenu extends Phaser.Scene {
	constructor() {
		super({key: "SceneMainMenu"});
	}

	preload() {

		this.load.image("sprBtnPlay", "content/sprBtnPlay.png");
		this.load.image("sprBtnPlayHover", "content/sprBtnPlayHover.png");
		this.load.audio("sndBtn", "content/sndBtn_alt.wav");


	}

	create() {
		this.sfx = {
			btn: this.sound.add("sndBtn")
		}
	

	this.title = this.add.text(

		this.game.config.width * 0.5,
		this.game.config.height * 0.15,
		"TABLE TENNIS",
		{
			fontFamily: "monospace",
			fontSize: 72,
			align: "center"
		}
	);
	this.title.setOrigin(0.5);

	this.btnPlay = this.add.sprite(
		this.game.config.width * 0.5,
		this.game.config.height * 0.5,
		"sprBtnPlay"
	);

	this.btnPlay.setInteractive();

	this.btnPlay.on("pointerover", function() {
		this.setTexture("sprBtnPlayHover");
	});

	this.btnPlay.on("pointerout", function() {
		this.setTexture("sprBtnPlay");
	});

	this.btnPlay.on("pointerup", function() {
		this.sfx.btn.play();

		this.scene.start("SceneMain");
	}, this);





	}

}