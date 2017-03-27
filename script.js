
//old code
  var audio, playbtn, mutebtn, seekslider, volumeslider, seeking=false, seekto, curtimetext, durtimetext;
function initAudioPlayer(){
	audio = new Audio();
	audio.src = "https://www.soundjay.com/free-music/midnight-ride-01a.mp3";
	audio.loop = true;
	audio.play();
	// Set object references
	playbtn = document.getElementById("playpausebtn");
	mutebtn = document.getElementById("mutebtn");
	seekslider = document.getElementById("seekslider");
	volumeslider = document.getElementById("volumeslider");
	curtimetext = document.getElementById("curtimetext");
	durtimetext = document.getElementById("durtimetext");
	
  // Add Event Handling
	playbtn.addEventListener("click",playPause);
	mutebtn.addEventListener("click", mute);
	seekslider.addEventListener("mousedown", function(event){ seeking=true; seek(event); });
	seekslider.addEventListener("mousemove", function(event){ seek(event); });
	seekslider.addEventListener("mouseup",function(){ seeking=false; });
	volumeslider.addEventListener("mousemove", setvolume);
	audio.addEventListener("timeupdate", function(){ seektimeupdate(); });
	
  // Functions
	function playPause(){
		if(audio.paused){
		    audio.play();
		    playbtn.style.background = "url(https://image.flaticon.com/icons/svg/189/189889.svg) no-repeat";
	    } else {
		    audio.pause();
		    playbtn.style.background = "url(https://image.flaticon.com/icons/svg/148/148744.svg) no-repeat";
	    }
	}
	function mute(){
		if(audio.muted){
		    audio.muted = false;
		    mutebtn.style.background = "url(https://image.flaticon.com/icons/svg/204/204287.svg) no-repeat";
	    } else {
		    audio.muted = true;
		    mutebtn.style.background = "url(https://image.flaticon.com/icons/svg/148/148757.svg) no-repeat";
	    }
	}
	function seek(event){
	    if(seeking){
		    seekslider.value = event.clientX - seekslider.offsetLeft;
	        seekto = audio.duration * (seekslider.value / 100);
	        audio.currentTime = seekto;
	    }
    }
	function setvolume(){
	    audio.volume = volumeslider.value / 100;
    }
	function seektimeupdate(){
		var nt = audio.currentTime * (100 / audio.duration);
		seekslider.value = nt;
		var curmins = Math.floor(audio.currentTime / 60);
	    var cursecs = Math.floor(audio.currentTime - curmins * 60);
	    var durmins = Math.floor(audio.duration / 60);
	    var dursecs = Math.floor(audio.duration - durmins * 60);
		if(cursecs < 10){ cursecs = "0"+cursecs; }
	    if(dursecs < 10){ dursecs = "0"+dursecs; }
	    if(curmins < 10){ curmins = "0"+curmins; }
	    if(durmins < 10){ durmins = "0"+durmins; }
		curtimetext.innerHTML = curmins+":"+cursecs;
	    durtimetext.innerHTML = durmins+":"+dursecs;
	}
  
  
  
  //new function for speed audio	
	var speedlist = document.getElementById("speedlist");
	speedlist.addEventListener("change",changeSpeed);
	
    function changeSpeed(event){
		audio.playbackRate = event.target.value;
	} 
}

  window.addEventListener("load", initAudioPlayer);
