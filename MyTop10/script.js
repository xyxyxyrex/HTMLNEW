let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let volume_slider = document.querySelector('.volume-slider');
let seek_slider = document.querySelector('.seek-slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let repeatIcon = document.querySelector('.fa-repeat');
let curr_track = document.createElement('audio');

let track_index=0;
let isPlaying = false;
let isRandom = false;
let updateTimer;


const music_list = [
    {
        img: 'titleAlbumArt/fallen.jpg',
        bgImg: 'bgImg/fallen.jpg',
        name: 'Fallen',
        artist: 'Lola Amour',
        music: 'audioSrc/fallen.mp3',
    },
    
    {
        img: 'titleAlbumArt/goodnews.jpg',
        bgImg: 'bgImg/',
        name: 'Good News',
        artist: 'Mac Miller',
        music: 'audioSrc/goodnews.mp3',
    },
    
    {
        img: 'titleAlbumArt/pasilyo.jpg',
        bgImg: 'bgImg/',
        name: 'Pasilyo',
        artist: 'SunKissed Lola',
        music: 'audioSrc/pasilyo.mp3',
    },
    
    {
        img: 'titleAlbumArt/norolemodelz.png',
        bgImg: 'bgImg/',
        name: 'No Role Modelz',
        artist: 'J.Cole',
        music: 'audioSrc/norolemodelz.mp3',
    },
    
    {
        img: 'titleAlbumArt/dna.jpeg',
        bgImg: 'bgImg/',
        name: 'DNA',
        artist: 'Kendrick Lamar',
        music: 'audioSrc/dna.mp3',
    },
    
    {
        img: 'titleAlbumArt/maadcity.jfif',
        bgImg: 'bgImg/',
        name: 'm.A.A.d City',
        artist: 'Kendrick Lamar',
        music: 'audioSrc/maadcity.mp3',
    },
    
    {
        img: 'titleAlbumArt/hananibourei.jpg',
        bgImg: 'bgImg/',
        name: 'Hana ni Bourei',
        artist: 'Yorushika',
        music: 'audioSrc/hananibourei.mp3',
    },
    
    {
        img: 'titleAlbumArt/kataomoi.jpg',
        bgImg: 'bgImg/',
        name: 'Kataomoi',
        artist: 'Aimer',
        music: 'audioSrc/kataomoi.mp3',
    },
    
    {
        img: 'titleAlbumArt/deathbed.jpeg',
        bgImg: 'bgImg/',
        name: 'deathbed',
        artist: 'Powfu ft. beabadobee',
        music: 'audioSrc/deathbed.mp3',
    },
    
    {
        img: 'titleAlbumArt/mundo.webp',
        bgImg: 'bgImg/',
        name:'Mundo',
        artist: 'IV of Spades',
        music: 'audioSrc/mundo.mp3',
    },
    
    {
        img: 'titleAlbumArt/selfcare.jpg',
        bgImg: 'bgImg/',
        name: 'Self Care',
        artist: 'Mac Miller',
        music: 'audioSrc/selfcare.mp3',
    },
    
    {
        img: 'titleAlbumArt/paninindigan.jfif',
        bgImg: 'bgImg/',
        name: 'Paninindigan Kita',
        artist: 'Ben&Ben',
        music: 'audioSrc/paninindigankita.mp3',
    },
    
    {
        img: 'titleAlbumArt/maybemaybe.jpg',
        bgImg: 'bgImg/',
        name: 'Maybe Maybe',
        artist: 'Lola Amour',
        music: 'audioSrc/maybemaybe.mp3',
    },
    
    {
        img: 'titleAlbumArt/anghulingelbimbo.jfif',
        bgImg: 'bgImg/',
        name: 'Ang Huling el Bimbo',
        artist: 'Eraserheads',
        music: 'audioSrc/anghulingelbimbo.mp3',
    },
    
    {
        img: 'titleAlbumArt/psycho.png',
        bgImg: 'bgImg/',
        name: 'Psycho',
        artist: 'Red Velvet',
        music: 'audioSrc/psycho.mp3',
    },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage="url("+ music_list[track_index].img +")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function  randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function toggleRandom() {
    isRandom = !isRandom;
    randomIcon.classList.toggle('.randomActive');
    }
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
}

function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
}

function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
    }

    function prevTrack(){
        if(track_index > 0){
            track_index -= 1;
        }else{
            track_index = music_list.length -1;
        }
        loadTrack(track_index);
        playTrack();
    }

    function seekTo(){
        let seekto = curr_track.duration * (seek_slider.value / 100);
        curr_track.currentTime = seekto;
    }

    function setVolume(){
        curr_track.volume = volume_slider.value / 100;
    }

    function setUpdate(){
        let seekPosition = 0;
        if(!isNaN(curr_track.duration)){
            seekPosition = curr_track.currentTime * (100 / curr_track.duration);
            seek_slider.value = seekPosition;
    
            let currentMinutes = Math.floor(curr_track.currentTime / 60);
            let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(curr_track.duration / 60);
            let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
    
            if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
            if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
            if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
            if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    
            curr_time.textContent = currentMinutes + ":" + currentSeconds;
            total_duration.textContent = durationMinutes + ":" + durationSeconds;
    };
}
















































