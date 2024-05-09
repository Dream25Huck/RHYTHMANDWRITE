document.addEventListener('DOMContentLoaded', () => {
  const bkgEasyContainer = document.getElementsByClassName('easyContainer')[0];
  const diskPlayer = document.getElementsByClassName('diskPlayer')[0];
  const audio = document.getElementsByClassName('audio')[0];
  const li = document.querySelectorAll('.li');
  const imgPerson = document.querySelector('.personImg');
  const profileTitle = document.querySelector('#profileTitle');
  const profileParagraph = document.querySelector('#profileParagraph');
  const playBtn = document.querySelector('.fa-pause');
  const bottomBar = document.querySelector('.bottomBar');
  const seekBar = document.querySelector('.seek-bar');
  const span = document.querySelectorAll('.span');
  let updateInterval;

  const images = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  const titles = [
      "Happy",
      "Can't Stop The Feeling!",
      "Don't Worry, Be Happy",
      "Over the Rainbow",
      "Count On Me",
      "Happier",
      "Here Comes The Sun",
      "Take Me Home, Country Roads",
      "With a Little Help From My Friends",
      "You've Got a Friend in Me",
      "Roar",
      "Good Life",
      "Scars To Your Beautiful",
      "Best Day of My Life",
      "Viva La Vida",
      "The Greatest",
      "I'll Be There for You",
      "We Are Family",
      "Stronger (What Doesn't Kill You)",
      "On Top of the World"
  ];

  let intermediateArtists = [
      "John Denver",
      "The Beatles",
      "Toy Story",
      "Katy Perry",
      "OneRepublic",
      "Alessia Cara",
      "American Authors"
  ];

  li.forEach((element, index) => {
      element.addEventListener('click', function() {
          clearInterval(updateInterval); // Clear previous interval if exists

          bottomBar.style.transform = "translateY(0px)";
          bkgEasyContainer.style.backgroundImage = `url(img/${images[index]}.png)`;
          imgPerson.src = `img-person/${index+8}.jpeg`;
          
          audio.src = `music/${index+8}.mp3`;
          audio.play();

          profileTitle.textContent = titles[index+7];
          profileParagraph.textContent = intermediateArtists[index % intermediateArtists.length]; // Repeat artists in a cyclic order if needed

          updateInterval = setInterval(() => {
              const currentTime = Math.floor(audio.currentTime);
              if (index < span.length) {
                  span[index].textContent = formatTime(currentTime);
                  seekBar.value = 100 * (audio.currentTime / audio.duration);
              }
          }, 1000);
      })
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
