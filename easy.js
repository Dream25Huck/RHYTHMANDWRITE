document.addEventListener('DOMContentLoaded', () => {
    const audio = document.querySelector('.audio');
    const li = document.querySelectorAll('.li');
    const imgPerson = document.querySelector('.personImg');
    const profileTitle = document.querySelector('#profileTitle');
    const profileParagraph = document.querySelector('#profileParagraph');
    const playBtn = document.querySelector('.fa-pause');
    const bottomBar = document.querySelector('.bottomBar');
    const span = document.querySelectorAll('.span');
    let updateInterval;
    const seekBar = document.querySelector('.seek-bar');
    const bkgEasyContainer = document.querySelector('.easyContainer');
    const images = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
    const titles = ['Happy', "Can't Stop The Feeling!", "Don't Worry, Be Happy", "Over the Rainbow", 'Count On Me', "Happier", "Here Comes The Sun"];
    const beginnerArtists = [
        "Pharrell Williams",
        "Justin Timberlake",
        "Bobby McFerrin",
        "Israel Kamakawiwo'ole",
        "Bruno Mars",
        "Marshmello ft. Bastille",
        "The Beatles"
    ];

    li.forEach((element, index) => {
        element.addEventListener('click', () => {
            clearInterval(updateInterval); // Clear any previous interval
            bkgEasyContainer.style.backgroundImage = `url(img/${images[index]}.png)`;    
            
            
            audio.src = `music/${index+1}.mp3`; // Set new source for audio
            audio.play(); // Play audio
            
            // Update UI elements
            bottomBar.style.transform = "translateY(0px)";
            imgPerson.src = `img-person/${index+1}.jpeg`;
            
            
            profileTitle.textContent = titles[index];
            
            profileParagraph.textContent = beginnerArtists[index];
            
            // Update playing time
            updateInterval = setInterval(() => {
                const currentTime = Math.floor(audio.currentTime);
                span[index].textContent = formatTime(currentTime);
                seekBar.value = 100 * (audio.currentTime / audio.duration);
            }, 1000);
        });
    });



    playBtn.addEventListener('click', () => {
        if (!audio.paused) {
            audio.pause();
            playBtn.classList.remove('fa-pause');
            playBtn.classList.add('fa-play');
        } else {
            audio.play();
            playBtn.classList.remove('fa-play');
            playBtn.classList.add('fa-pause');
        }
    });

    // Add event listener to seekBar
    seekBar.addEventListener('input', () => {
        const seekTo = audio.duration * (seekBar.value / 100);
        audio.currentTime = seekTo;
    });

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }
});
