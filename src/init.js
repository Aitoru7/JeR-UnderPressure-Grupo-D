var config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 1200,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player1;
var player2;
var cursors;
var keys;
var gameOver = false;

var game = new Phaser.Game(config);
function preload ()
{
    this.load.spritesheet('robot1', 'assets/andar-sheet1.png', { frameWidth: 40, frameHeight: 50 });
    this.load.spritesheet('robot2', 'assets/andar-sheet.png', { frameWidth: 40, frameHeight: 50 });
    this.load.image('stop1', 'assets/player1.png');
    this.load.image('stop2', 'assets/player2.png');
    this.load.image('fondo', 'assets/Edificio.png')
}

function create ()
{
    this.physics.add.staticSprite(800, 700,'fondo');
    player1 = this.physics.add.sprite(100, 450, 'robot1');
    player2 = this.physics.add.sprite(100, 450, 'robot2');

    player2.setBounce(0.2);
    player2.setCollideWorldBounds(true);
    player1.setBounce(0.2);
    player1.setCollideWorldBounds(true);

    /*Here we create the camera
    this.cameras.main.setBounds(0, 0, 1024, 2048);

    this.cameras.main.setZoom(1);
    this.cameras.main.centerOn(0, 0);
    */
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('robot2', { start: 1, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'stop2', frame: 0 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('robot2', { start: 1, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'left2',
        frames: this.anims.generateFrameNumbers('robot1', { start: 1, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn2',
        frames: [ { key: 'stop1', frame: 0 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right2',
        frames: this.anims.generateFrameNumbers('robot1', { start: 1, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D' });

    this.physics.add.collider(player1, player2, function(player1, player2){
        if(player1.flipX==false){
           player1.setVelocityX(-160);
        }else{
            player1.setVelocityX(160); 
        }
        if(player2.flipX==false){
            player2.setVelocityX(-160);
        }else{
            player2.setVelocityX(160); 
        }
    });
}
//https://phaser.io/examples/v3/category/physics/arcade
function update ()
{
    if (gameOver)
    {
        return;
    }
    
    //const cam = this.cameras.main;
    
    if (keys.left.isDown)
    {
        player1.flipX = true;
        player1.setVelocityX(-160);

        player1.anims.play('left2', true);
        
        //cam.pan(player1.x, player1.y, 0, 'Power2');
        //cam.zoomTo(3, 3000);
    }
    else if (keys.right.isDown)
    {
        player1.flipX = false;
        player1.setX(player1.x+5);

        player1.anims.play('right2', true);
        
        //cam.pan(player1.x, player1.y, 0, 'Power2');
        //cam.zoomTo(3, 3000);
    }
    else
    {
        player1.setVelocityX(0);

        player1.anims.play('turn2');
        
        //cam.pan(player1.x, player1.y, 0, 'Power2');
        //cam.zoomTo(3, 3000);
    }
    if (keys.up.isDown) //&& player2.body.touching.down)
    {
        player1.setY(player1.y-5);
    }


    if (cursors.left.isDown)
    {
        player2.flipX = true;
        player2.setX(player2.x-5);

        player2.anims.play('left', true);
        
        //cam.pan(player2.x, player2.y, 0, 'Power2');
        //cam.zoomTo(3, 3000);
    }
    else if (cursors.right.isDown)
    {
        player2.flipX = false;
        player2.setX(player2.x+5);

        player2.anims.play('right', true);
        
        //cam.pan(player2.x, player2.y, 0, 'Power2');
        //cam.zoomTo(3, 3000);
    }
    else
    {
        player2.setVelocityX(0);

        player2.anims.play('turn');
        
        //cam.pan(player2.x, player2.y, 0, 'Power2');
        //cam.zoomTo(3, 3000);
    }
    if (cursors.up.isDown) //&& player2.body.touching.down)
    {
        player2.setY(player2.y-5);
    }
}
