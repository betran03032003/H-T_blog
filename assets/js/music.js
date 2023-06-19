//Daytime
var today = new Date();
var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

 document.getElementById("current_time").innerHTML = dateTime;

 //Songs
let app =  [
        {
            name: 'Black Moon Light',
            artist: '黑月光 - 张碧晨 & 毛不易 | 长月烬明 OST',
            src: 'Black Moon Light',
            img: 'Black Moon Light'
        },
         {
            name: 'Arcade',
            artist: 'Daneliya Tuleshova',
            src: 'Arcade',
            img: 'Arcade'
        },
        {
            name: 'Night Wind',
            artist: 'Tieu Lang',
            src: 'Night Wind I 傍晚的风 小淩',
            img: 'Night Wind'
        },
        {
            name: 'Someone You Loved',
            artist: 'JFla Cover ',
            src: 'Someone You Loved',
            img: 'Someone You Loved'
        },
        {
            name: 'They',
            artist: 'Ngai Than',
            src: 'They I 他他他',
            img: 'They'
        }, 
        {
            name: 'Flower',
            artist: 'Jiso',
            src: 'Flower',
            img: 'Flower'
        },
        {
            name: 'Echo',
            artist: 'Alexander Stewart',
            src: 'Echo',
            img: 'Echo'
        },
        {
            name: 'On The Ground',
            artist: 'Rose',
            src: 'On The Ground',
            img: 'On The Ground'
        },
        {
            name: 'Pastlives',
            artist: 'Sapientdream',
            src: 'Pastlives',
            img: 'Pastlives'
        }, 
        {
            name: 'Lalisa',
            artist: 'Lisa',
            src: 'Lalisa',
            img: 'Lalisa'
        },
        {
            name: 'She Used To Be Mine',
            artist: 'Chloe Adams Cover',
            src: 'She Used To Be Mine',
            img: 'She Used To Be Mine'
        },
        {
            name: 'Solo',
            artist: 'Jennie',
            src: 'Solo',
            img: 'Solo'
        },
        {
            name: 'Somewhere Only We Know',
            artist: ' Rhianne cover',
            src: 'Somewhere Only We Know',
            img: 'Somewhere Only We Know'
        },
        {
            name: 'Making My Way',
            artist: 'Son Tung MTP',
            src: 'Making My Way',
            img: 'Making My Way'
        },
        {
            name: 'Water Run Dry',
            artist: 'Chelsea Collins',
            src: 'Water Run Dry',
            img: 'Water Run Dry'
        },
        {
            name: 'Playing With Fire',
            artist: 'Black Pink',
            src: 'Playing With Fire',
            img: 'Playing With Fire'
        },
];
//Music player
let ctrlIcon = document.getElementById('ctrlIcon'),
progress = document.getElementById('progress');
const wrapper =document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".song-img"),
musicName = wrapper.querySelector(".name"),
musicArtist = wrapper.querySelector(".artist"),
audio = wrapper.querySelector("#song"),
playPauseBtn = wrapper.querySelector(".play-btn"),
prevBtn = wrapper.querySelector(".prebtn"),
nextBtn = wrapper.querySelector(".nextbtn");

let musicIndex = 0;


function loadMusic(index) {
    musicName.innerText = app[index].name;
    musicArtist.innerText = app[index].artist;
    musicImg.src =`assets/img/Songs_img/${app[index].img}.jpg`;
    audio.src =`assets/audio/${app[index].src}.mp3`;
}


window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingNow();
})


function playMusic(){
    wrapper.classList.add("paused");
    if(ctrlIcon.classList.contains('fa-play')){
        ctrlIcon.classList.remove('fa-play');
        ctrlIcon.classList.add('fa-pause');
    }
    audio.play();
}
  //pause music function
function pauseMusic(){
    wrapper.classList.remove("paused");
    if(ctrlIcon.classList.contains('fa-pause')){
        song.pause();
        ctrlIcon.classList.remove('fa-pause');
        ctrlIcon.classList.add('fa-play');
    }
    audio.pause();
}

function nextMusic() {
    musicIndex++;
    musicIndex > app.length ? musicIndex = 0 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}
function prevMusic() {
    musicIndex--;
    musicIndex < 0 ? musicIndex = app.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

playPauseBtn.addEventListener("click", ()=>{
    const isMusicPlay = wrapper.classList.contains("paused");
    //if isPlayMusic is true then call pauseMusic else call playMusic
    isMusicPlay ? pauseMusic() : playMusic();
  });

nextBtn.addEventListener("click", () => {
    nextMusic();
})
prevBtn.addEventListener("click", () => {
    prevMusic();
})

song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
}

if(song.play()){
    setInterval(()=>{
       progress.value = song.currentTime; 
    },500);
}

/*Change btn play */
progress.onchange = function(){
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add('fa-pause');
    ctrlIcon.classList.remove('fa-play');
}

/* Change time  */
audio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    let musicCurrentTime = wrapper.querySelector(".current-time"),
    musicDuartion = wrapper.querySelector(".total-time");
    audio.addEventListener("loadeddata", ()=>{
      // update song total duration
      let mainAdDuration = audio.duration;
      let totalMin = Math.floor(mainAdDuration / 60);
      let totalSec = Math.floor(mainAdDuration % 60);
      if(totalSec < 10){ //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
      }
      musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });
    // update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){ //if sec is less than 10 then add 0 before it
      currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  });

  /* Repeat btn */
  const repeatBtn = wrapper.querySelector("#repeat");
  repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;
    switch(getText){
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped")
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playlist shuffle")
            break;
        case "shuffle":
             repeatBtn.innerText = "repeat";
             repeatBtn.setAttribute("title", "Playlist looped")
            break;
    }

  })



audio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText;
    switch(getText){
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            audio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
             let randIndex = Math.floor(Math.random() * app.length);
             do {
                randIndex = Math.floor(Math.random() * app.length);
             }while(musicIndex == randIndex);
             musicIndex = randIndex ;
             loadMusic(musicIndex);
             playMusic();
             playingNow();
            break;
    }
})

const ulTag = wrapper.querySelector("ul")
for(let j = 0 ; j < app.length; j++) {
    let liTag = ` <li class="song" index="${j}">
    <img src="assets/img/Songs_img/${app[j].img}.jpg" alt="" class="thumb">
    <div class="body">
        <h3 class="song_name">${app[j].name}</h3>
        <p class="author">${app[j].artist}</p>
        <audio id="${app[j].src}" src="assets/audio/${app[j].src}.mp3"></audio>
    </div>
    <div class="option">
        <i class="fas fa-ellipsis-h"></i>
    </div>
</li>
    `
    ulTag.insertAdjacentHTML("beforeend", liTag);
}

const select = document.querySelectorAll("li");
function playingNow() {
    for(let i = 0; i < select.length; i++) {
        if(select[i].classList.contains("playing")) {
            select[i].classList.remove("playing")
        }
        if(select[i].getAttribute("index")== musicIndex) {
            select[i].classList.add("playing");
        }
        select[i].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(element) {
    let getSongIndex = element.getAttribute("index");
    musicIndex = getSongIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

const btn = document.getElementById('favorite');

btn.addEventListener("click", function(evt){
    btn.classList.toggle("like");
});

const openList = document.querySelector("#cricle-list");
const listMusic = document.querySelector(".container_playlist");
const closeList = document.querySelector("#close");

openList.addEventListener("click", () => {
    listMusic.style.display = "block";
 });

closeList.addEventListener("click", () => {
    listMusic.style.display = "none";
})