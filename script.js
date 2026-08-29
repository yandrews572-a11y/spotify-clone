const songs = [
    {
        title: "Thangapoove",
        artist: "Masstamilan.MY",
        img: "assets/thangapoove.png",
        url: "https://res.cloudinary.com/dcnhbcem0/video/upload/q_auto/f_auto/v1778252441/Thangapoove_-_Masstamilan.MY_cwnrab.mp3"
    },
    {
        title: "Pavazha Malli",
        artist: "Think Indie",
        img: "assets/pavazha_malli.png",
        url: "https://res.cloudinary.com/dcnhbcem0/video/upload/q_auto/f_auto/v1778252432/Pavazha_Malli_From_Think_Indie_-_Masstamilan.MY_lztlds.mp3"
    },
    {
        title: "Neelothi",
        artist: "Masstamilan.MY",
        img: "assets/neelothi.png",
        url: "https://res.cloudinary.com/dcnhbcem0/video/upload/q_auto/f_auto/v1778252428/Neelothi_-_Masstamilan.MY_dxtxcy.mp4"
    },
    {
        title: "Dheema",
        artist: "Masstamilan.MY",
        img: "assets/dheema.png",
        url: "https://res.cloudinary.com/dcnhbcem0/video/upload/q_auto/f_auto/v1778252398/Dheema_-_Masstamilan.MY_ugcaet.mp4"
    }
];

let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio();

const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.querySelector('.progress-bar');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const trackTitle = document.getElementById('current-track-title');
const trackArtist = document.getElementById('current-track-artist');
const trackImg = document.getElementById('current-track-img');
const songCards = document.querySelectorAll('.song-card');

function loadSong(index) {
    const song = songs[index];
    audio.src = song.url;
    trackTitle.innerText = song.title;
    trackArtist.innerText = song.artist;
    trackImg.src = song.img;
    currentSongIndex = index;
}

function playSong() {
    isPlaying = true;
    audio.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
}

function pauseSong() {
    isPlaying = false;
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (isNaN(duration)) return;
    
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Update time displays
    currentTimeEl.innerText = formatTime(currentTime);
    durationEl.innerText = formatTime(duration);
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Event Listeners
playPauseBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
progressBar.addEventListener('click', setProgress);

// Click on song cards to play
songCards.forEach(card => {
    card.addEventListener('click', () => {
        const index = parseInt(card.getAttribute('data-index'));
        loadSong(index);
        playSong();
    });
});

// Initialize
loadSong(currentSongIndex);
