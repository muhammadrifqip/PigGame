/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Penjelasan ada di notepad. Pig Game.txt

var playerScore, currentScore, activePlayer, globalPlay,sameSix,click;
var input, winnerScore;

init();



document.querySelector(".btn-roll").addEventListener('click', function(){ //iki button roll
	if(globalPlay){
		ifUndefined();
		//1. Mengenerate bilangan random
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		//2. menampilkan nilai dadu sesuai bilangan
		var diceDOM1 = document.getElementById('dice-1');
		var diceDOM2 = document.getElementById('dice-2');
		diceDOM1.style.display = "block";// memunculkan gambar dadu
		diceDOM2.style.display = "block";
		diceDOM1.src = 'dice-'+dice1+'.png';
		diceDOM2.src = 'dice-'+dice2+'.png';

		//3. mengupdate nilai current score, lek dadu nilai 1 maka GANTIAN lawan
		if(dice1 != 1 && dice2 != 1){
			currentScore+=dice1 + dice2;
			document.getElementById('current-'+activePlayer).textContent = currentScore;
		}else{
			nextPlayer();
		}

		// Jika dalam satu putaran mendapatkan angka 6 selama 2 kali, maka global score menjadi 0
		//click === 0 ? click = 1 : click = 0;
		//sameSix[click] = dice; ini buat satu dadu
		sameSix[0] = dice1;
		sameSix[1] = dice2;
		if (sameSix[0] == 6 && sameSix[1] == 6){
			playerScore[activePlayer] = 0;
			document.getElementById('score-'+activePlayer).textContent = playerScore[activePlayer];
			nextPlayer();
		}

	}
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if(globalPlay){
		//1. Memasukan nilai Current ke Global
		playerScore[activePlayer] += currentScore

		//2. UI nya di rubah
		document.getElementById('score-'+activePlayer).textContent = playerScore[activePlayer];

		//3.0 Input by user
		ifUndefined();

		//3.1 Ngecek yang menang jika nilai udah 100 duluan
		if(playerScore[activePlayer] < winnerScore){
			//4. Ada next player
			nextPlayer();
			
		}else{
			document.getElementById('name-'+activePlayer).textContent = "Winner";
			document.querySelector('.dice').style.display = "none";
			document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
			document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
			globalPlay = false;
		}	
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		currentScore = 0;
		sameSix = [0,0];
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		document.getElementById('dice-1').style.display = "none"// menghilangkangambar dadu
		document.getElementById('dice-2').style.display = "none"
}

function ifUndefined(){ //Pengecekan nilai input
	input = document.querySelector(".final-score").value;
	if(input){
			winnerScore = input;
		}else{
			winnerScore = 100;
			document.querySelector(".final-score").value = '100';
		}
	document.querySelector('.final-score').disabled = true;	//mendisabled seteah from. jadi gabisa diubah2
}

function init(){
	playerScore = [0 , 0];
	currentScore = 0;
	activePlayer = 0;
	globalPlay= true;
	sameSix = [0,0];
	click = 0;

	document.getElementById('dice-1').style.display = "none"// menghilangkangambar dadu
	document.getElementById('dice-2').style.display = "none"

	// Intitial semua nilai bernilai 0
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = "Player 1";
	document.getElementById('name-1').textContent = "Player 2";
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
	document.querySelector('.final-score').disabled = false;
	document.querySelector(".final-score").value = '';
	
}