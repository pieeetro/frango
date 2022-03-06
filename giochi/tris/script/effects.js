const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var sfx = {
    sound: new Howl({
        src: ['./538701__eminyildirim__pingpong-drop-raw.wav']
    })
}

window.setInterval(sfx.sound.play(), 1000);

<script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js" 
        integrity="sha512-6+YN/9o9BWrk6wSfGxQGpt3EUK6XeHi6yeHV+TYD2GR0Sj/cggRpXr1BrAQf0as6XslxomMUxXp2vIl+fv0QRA==" 
        crossorigin="anonymous"></script>