import Phaser from 'phaser';
import WebFont from 'webfontloader';

export default class extends Phaser.State {
    init() {
        this.stage.backgroundColor = '#dd550c';
        this.fontsReady = false;
        this.fontsLoaded = this.fontsLoaded.bind(this);
    }

    preload() {
        WebFont.load({
            google: {
                families: ['Roboto']
            },
            active: this.fontsLoaded
        });

        let text = this.add.text(this.world.centerX, this.world.centerY, 'EastWorld is loading.', {
            font: '32px Roboto',
            fill: '#03244d',
            align: 'center'
        });
        text.anchor.setTo(0.5, 0.5);

        this.load.image('loaderBg', './assets/images/loader-bg.png');
        this.load.image('loaderBar', './assets/images/loader-bar.png');
    }

    render() {
        if (this.fontsReady) {
            this.state.start('Splash');
        }
    }

    fontsLoaded() {
        this.fontsReady = true;
    }

}
