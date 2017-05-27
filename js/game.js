/*global Phaser*/
var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});

var player1;
var player2;
var player3;
var player4;
var ball;

var life1;
var life2;
var life3;
var life4;

var texto1;
var texto2;
var texto3;
var texto4;
var textorepete;

var contderrota;
var stoptexto;

var bloqueio1;
var bloqueio2;
var bloqueio3;
var bloqueio4;

var perdeu1;
var perdeu2;
var perdeu3;
var perdeu4;

var launched_ball;
var ball_velocity;
var launch;

var canto1;
var canto2;
var canto3;
var canto4;
var canto5;
var canto6;
var canto7;
var canto8;

var up1;
var down1;
var up2;
var down2;
var left3;
var right3;

var musica;
var pong;
var perdevi;

var cursors;

function preload(){
    game.load.baseURL = 'assets/';
    game.load.image('player1', 'sprites/player1.png');
    game.load.image('player2', 'sprites/player2.png');
    game.load.image('player3', 'sprites/player3.png');
    game.load.image('player4', 'sprites/player4.png');
    game.load.image('ball', 'sprites/ball.png');
    game.load.image('cantohori', 'sprites/canto.png');
    game.load.image('cantovert', 'sprites/canto2.png');
    game.load.image('bloqueiovert','sprites/bloqueio.png');
    game.load.image('bloqueiohori', 'sprites/bloqueio2.png');
    game.load.audio('musica', 'audio/musica.mp3');
    game.load.audio('pong', 'audio/pong.wav');
    game.load.audio('perdevi', 'audio/perdevi.wav');
}

function create(){
    life1 = 3;
    life2 = 3;
    life3 = 3;
    life4 = 3;
    
    perdeu1 = false;
    perdeu2 = false;
    perdeu3 = false;
    perdeu4 = false;
    
    contderrota = 0;
    stoptexto = false;
    
    musica = game.add.audio('musica');
    musica.loopFull(0.4);
    
    pong = game.add.audio('pong');
    pong.volume = 0.4;
    perdevi = game.add.audio('perdevi');
    perdevi.volume = 0.4;
    //superior esquerdo
    canto1 = game.add.sprite(5, 5, 'cantohori');
    canto1.anchor.setTo(0.5, 0.5);
    canto2 = game.add.sprite(5, 5, 'cantovert');
    canto2.anchor.setTo(0.5, 0.5);
    
    //inferior esquerdo
    canto3 = game.add.sprite(5, 768-5, 'cantohori');
    canto3.anchor.setTo(0.5, 0.5);
    canto4 = game.add.sprite(5, 768-5, 'cantovert');
    canto4.anchor.setTo(0.5, 0.5);
    
    //superior direito
    canto5 = game.add.sprite(1024-5, 5, 'cantohori');
    canto5.anchor.setTo(0.5, 0.5);
    canto6 = game.add.sprite(1024-5, 5, 'cantovert');
    canto6.anchor.setTo(0.5, 0.5);
    
    //inferior direito
    canto7 = game.add.sprite(1024-5, 768-5, 'cantohori');
    canto7.anchor.setTo(0.5, 0.5);
    canto8 = game.add.sprite(1024-5, 768-5, 'cantovert');
    canto8.anchor.setTo(0.5, 0.5);
    
    texto1 = game.add.text(45, game.world.centerY, life1, {
        font: "40px Arial",
        fill: "#ff0044",
        align: "center"
    });
    texto1.anchor.setTo(0.5, 0.5);
    
    texto2 = game.add.text(1024-50, game.world.centerY, life2, {
        font: "40px Arial",
        fill: "#ff0044",
        align: "center"
    });
    texto2.anchor.setTo(0.5, 0.5);
    
    texto3 = game.add.text(game.world.centerX, 50, life3, {
        font: "40px Arial",
        fill: "#ff0044",
        align: "center"
    });
    texto3.anchor.setTo(0.5, 0.5);
    
    texto4 = game.add.text(game.world.centerX, 768-55, life4, {
        font: "40px Arial",
        fill: "#ff0044",
        align: "center"
    });
    texto4.anchor.setTo(0.5, 0.5);
    
    
    
    game.physics.arcade.enable(canto1);
    game.physics.arcade.enable(canto2);
    game.physics.arcade.enable(canto3);
    game.physics.arcade.enable(canto4);
    game.physics.arcade.enable(canto5);
    game.physics.arcade.enable(canto6);
    game.physics.arcade.enable(canto7);
    game.physics.arcade.enable(canto8);
    
    
    
    cursors = game.input.keyboard.createCursorKeys();
    
    game.world.setBounds(0,0, 1024, 768);
    
    player1 = game.add.sprite(5, 768/2, 'player1');
    player2 = game.add.sprite(1024-5, 768/2, 'player2');
    player3 = game.add.sprite(1024/2, 5, 'player3');
    player4 = game.add.sprite(1024/2, 768-5, 'player4');
    ball = game.add.sprite(1024/2, 768/2, 'ball');
    
    
    player1.anchor.setTo(0.5, 0.5);
    player2.anchor.setTo(0.5, 0.5);
    player3.anchor.setTo(0.5, 0.5);
    player4.anchor.setTo(0.5, 0.5);
    ball.anchor.setTo(0.5, 0.5);
    
    game.physics.arcade.enable(player1);
    game.physics.arcade.enable(player2);
    game.physics.arcade.enable(player3);
    game.physics.arcade.enable(player4);
    game.physics.arcade.enable(ball);
    
    player1.body.collideWorldBounds = true;
    player2.body.collideWorldBounds = true;
    player3.body.collideWorldBounds = true;
    player4.body.collideWorldBounds = true;
    ball.body.collideWorldBounds = true;
    
    ball.body.bounce.setTo(1,1);
    
    //ball.body.immovable = true;
    player1.body.immovable = true;
    player2.body.immovable = true;
    player3.body.immovable = true;
    player4.body.immovable = true;
    
    canto1.body.immovable = true;
    canto2.body.immovable = true;
    canto3.body.immovable = true;
    canto4.body.immovable = true;
    canto5.body.immovable = true;
    canto6.body.immovable = true;
    canto7.body.immovable = true;
    canto8.body.immovable = true;
    
    launched_ball = false;
    ball_velocity = 400
    
    up1 = game.input.keyboard.addKey(Phaser.Keyboard.W);
    down1 = game.input.keyboard.addKey(Phaser.Keyboard.S);
    
    up2 = game.input.keyboard.addKey(Phaser.Keyboard.T);
    down2 = game.input.keyboard.addKey(Phaser.Keyboard.G);
    
    left3 = game.input.keyboard.addKey(Phaser.Keyboard.J);
    right3 = game.input.keyboard.addKey(Phaser.Keyboard.K);
    
    launchBall();
    
}

function createBloqueio1(x, y){
    
    bloqueio1 = game.add.sprite(x, y, 'bloqueiovert');
    bloqueio1.anchor.setTo(0.5, 0.5);
    
    game.physics.arcade.enable(bloqueio1);
    bloqueio1.body.collideWorldBounds = true;
    bloqueio1.body.immovable = true;
    perdeu1 = true;

    console.log('Bloqueio Criado 1');
}

function createBloqueio2(x, y){
    bloqueio2 = game.add.sprite(x, y, 'bloqueiovert');
    bloqueio2.anchor.setTo(0.5, 0.5);
    
    game.physics.arcade.enable(bloqueio2);
    bloqueio2.body.collideWorldBounds = true;
    bloqueio2.body.immovable = true;
    
    perdeu2 = true;

    console.log('Bloqueio Criado 2');
}

function createBloqueio3(x, y){
    
    bloqueio3 = game.add.sprite(x, y, 'bloqueiohori');
    bloqueio3.anchor.setTo(0.5, 0.5);
    
    game.physics.arcade.enable(bloqueio3);
    bloqueio3.body.collideWorldBounds = true;
    bloqueio3.body.immovable = true;
    
    perdeu3 = true;

    console.log('Bloqueio Criado 3');
}

function createBloqueio4(x, y){
    bloqueio4 = game.add.sprite(x, y, 'bloqueiohori');
    bloqueio4.anchor.setTo(0.5, 0.5);
    
    game.physics.arcade.enable(bloqueio4);
    bloqueio4.body.collideWorldBounds = true;
    bloqueio4.body.immovable = true;
    
    perdeu4 = true;

    console.log('Bloqueio Criado 4');
}

function launchBall(){
    if(launched_ball){
        ball.x = game.world.centerX;
        ball.y = game.world.centerY;
        ball.body.velocity.setTo(0, 0);
        launched_ball = false;
    }
    else{
        ball.body.velocity.x = -ball_velocity;
        ball.body.velocity.y = ball_velocity;
        launched_ball = true;
    }
}
function atualizarTexto(texto, life){
    texto.setText(life);
}

function textoPara(){
    textorepete = game.add.text(game.world.centerX, game.world.centerY, 'Aperte F5 para recomeçar!', {
        font: "40px Arial",
        fill: "#ff0044",
        align: "center"
    });
    textorepete.anchor.setTo(0.5, 0.5);
}

function bate(){
    pong.play();
}

function perdevida(){
    perdevi.play();
}


function update(){
    
    if(perdeu1 == true){
        game.physics.arcade.collide(bloqueio1, ball, bate);
    }
    
    if(perdeu2 == true){
        game.physics.arcade.collide(bloqueio2, ball, bate);
    }
    
    if(perdeu3 == true){
        game.physics.arcade.collide(bloqueio3, ball, bate);
    }
    
    if(perdeu4 == true){
        game.physics.arcade.collide(bloqueio4, ball, bate);
    }
    
    game.physics.arcade.collide(player1, ball, bate);
    game.physics.arcade.collide(player2, ball, bate);
    game.physics.arcade.collide(player3, ball, bate);
    game.physics.arcade.collide(player4, ball, bate); 
    
    game.physics.arcade.collide(canto1, ball);
    game.physics.arcade.collide(canto2, ball);
    game.physics.arcade.collide(canto3, ball);
    game.physics.arcade.collide(canto4, ball);
    game.physics.arcade.collide(canto5, ball);
    game.physics.arcade.collide(canto6, ball);
    game.physics.arcade.collide(canto7, ball);
    game.physics.arcade.collide(canto8, ball);
    
    player1.body.velocity.y = 0;
    player1.body.velocity.x = 0;
    
    player2.body.velocity.y = 0;
    player2.body.velocity.x = 0;
    
    player3.body.velocity.y = 0;
    player3.body.velocity.x = 0;
    
    player4.body.velocity.y = 0;
    player4.body.velocity.x = 0;
        
        
        if(up1.isDown) {
            player1.body.velocity.y = -250;
        }
        if(down1.isDown){
            player1.body.velocity.y = 250;
        }
        
        
        if(up2.isDown){
            player2.body.velocity.y = -250;
        }
        if(down2.isDown){
            player2.body.velocity.y = 250;
        }
        
        
        if(left3.isDown){
            player3.body.velocity.x = -250;
        }
        if(right3.isDown){
            player3.body.velocity.x = 250;
        }
        
        
        if(cursors.left.isDown){
            player4.body.velocity.x = -250;
        }
        if(cursors.right.isDown){
            player4.body.velocity.x = 250;
        }
        
        
        if(life1 == 0 && perdeu1 == false){
            createBloqueio1(5, 768/2);
            contderrota++;
        }
        
        if(life2 == 0 && perdeu2 == false){
            createBloqueio2(1024-5, 768/2);
            contderrota++;
        }
        
        if(life3 == 0 && perdeu3 == false){
            createBloqueio3(1024/2, 7);
            contderrota++;
        }
        
        if(life4 == 0 && perdeu4 == false){
            createBloqueio4(1024/2, 768-7);
            contderrota++;
        }
        
        
        if(ball.body.blocked.left){
            console.log('Jogador 1 Perdeu uma vida!');
            life1--;
            atualizarTexto(texto1, life1);
            perdevida();
        }
        if(ball.body.blocked.right){
            console.log('Jogador 2 Perdeu uma vida!');
            life2--;
            atualizarTexto(texto2, life2);
            perdevida();
        }
        if(ball.body.blocked.up){
            console.log('Jogador 3 Perdeu uma vida!');
            life3--;
            atualizarTexto(texto3, life3);
            perdevida();
        }
        if(ball.body.blocked.down){
            console.log('Jogador 4 Perdeu uma vida!');
            life4--;
            atualizarTexto(texto4, life4);
            perdevida();
        }
        
        if(contderrota >=3 && stoptexto == false){
            textoPara();
            stoptexto = true;
        }
        
        
    }