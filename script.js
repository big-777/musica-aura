const audio = document.getElementById("audio");
const bar = document.getElementById("bar");
const current = document.getElementById("current");
const duration = document.getElementById("duration");

let playing = false;

function toggle(){
  if(playing){
    audio.pause();
  } else {
    audio.play();
  }
  playing = !playing;
}

audio.addEventListener("loadedmetadata", ()=>{
  duration.textContent = format(audio.duration);
});

audio.addEventListener("timeupdate", ()=>{
  const percent = (audio.currentTime / audio.duration) * 100;
  bar.style.width = percent + "%";
  current.textContent = format(audio.currentTime);
});

document.getElementById("progress").onclick = (e)=>{
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
};

function format(t){
  const m = Math.floor(t/60);
  const s = Math.floor(t%60);
  return m + ":" + (s < 10 ? "0"+s : s);
}