$(document).ready(function(){

$('nav a').removeClass('active');
$('nav a:contains("Featured Work")').addClass('active');
$('.video-js').css('position','absolute');
$('.introLogo').find('img').attr('src','../images/im_logo_white.png');

var videoArray = [{mp4:'Cannes.mp4',ogv:'Cannes.ogv',link:'twitter-cannes'},{mp4:'Lincoln.mp4',ogv:'Lincoln.ogv',link:'lincoln-mkz-launch'},{mp4:'Naked.mp4',ogv:'Naked.ogv',link:'power-garden'},{mp4:'PaintOut.mp4',ogv:'PaintOut.ogv',link:'paintout'},{mp4:'Tones_Samsung.mp4',ogv:'Tones_Samsung.ogv',link:'make-it-mega'},{mp4:'Tones_sxsw.mp4',ogv:'Tones_sxsw.ogv',link:'tones'},{mp4:'VFA.mp4',ogv:'VFA.ogv',link:'vfa'}];

var videoPlay = shuffle(videoArray);
console.log(videoPlay[0].mp4);
var videoIndex = 0;

var topPadding=20;
$('#portfolio').css('padding-top',$('header').height()+topPadding).css('margin-top',-$('header').height());

console.log($('.intro-vid').css('display'));
if($('.intro-vid').css('display')=='none'){
	console.log('mobile')
	$('header.home').css({
				top: 0,
				background: 'rgb(0,0,0)',
			});
			$('nav a:contains("Featured Work")').addClass('active');
			// $('.logoHome').show();
}

else{
	$('header.home').css({
				background: 'transparent',
				top: '',
				bottom: 0,
				transition: 'background 0.4s ease-in'
			});
}

videojs("intro-video-1").ready(function(){
	var myPlayer = this;
  	var amtScroll = 0,
  	sH = window.innerHeight,
	sW = window.innerWidth;

	myPlayer.src([
  		{ type: "video/mp4", src: "/videos/homepage/"+videoPlay[videoIndex].mp4 },
 		{ type: "video/ogg", src: "/videos/homepage/"+videoPlay[videoIndex].mp4 }
	]);

$('.vid-project').attr('href',"/projects/"+videoPlay[videoIndex].link);

/*   var aspect=myPlayer.width()/myPlayer.height(); */
var aspect=16/9;
  console.log(aspect);
  	if(window.innerHeight<window.innerWidth*(1/aspect)){
	  	myPlayer.dimensions(window.innerWidth,window.innerWidth*(1/aspect));
	  	$('#intro-video-1').css("left",0);
	  	$('#intro-video-1').css("top",(window.innerHeight-myPlayer.height())/2);
  	}
  	else{
	  	myPlayer.dimensions(window.innerHeight*aspect,window.innerHeight);
	  	$('#intro-video-1').css("top",0);
	  		$('#intro-video-1').css("left",(window.innerWidth-myPlayer.width())/2);
	  	}
  console.log(window.innerHeight-$('.title-nav').height());

$('#intro-vid').css("height",myPlayer.height());

	
	
	userResize = function() {
if($('.intro-vid').css('display')=='none'){
		$('header.home').css({
				top: 0,
				background: 'rgb(0,0,0)',
			});
			$('nav a:contains("Featured Work")').addClass('active');
			// $('.logoHome').show();
		}
else{
	var amtScroll = $(window).scrollTop();
	if (amtScroll >= sH-70) {
			$('header.home').css({
				top: 0,
				background: 'rgb(0,0,0)',
				transition: 'background 0.4s ease-in'
			});
			$('nav a:contains("Featured Work")').addClass('active');
			$('.logoHome').fadeIn();
		} 
		else {
			console.log('scrolling up');
			// remove top:0
			$('header.home').css({
				background: 'transparent',
				top: '',
				bottom: amtScroll,
				transition: 'background 0.4s ease-in'
			});
			$('nav a').removeClass('active');
			$('.logoHome').fadeOut();
		}

  	if(window.innerHeight<window.innerWidth*(1/aspect)){
	  	myPlayer.dimensions(window.innerWidth,window.innerWidth*(1/aspect));
	  	$('#intro-video-1').css("left",0);
	  	$('#intro-video-1').css("top",(window.innerHeight-myPlayer.height())/2);
  	}
  	else{
		 myPlayer.dimensions(window.innerHeight*aspect,window.innerHeight);
		 $('#intro-video-1').css("top",0);
		 	  		$('#intro-video-1').css("left",(window.innerWidth-myPlayer.width())/2);

	}
		  
	console.log(myPlayer.width(),myPlayer.height(), window.innerHeight);
	$('.intro-vid').css("height",myPlayer.height());
	sH = window.innerHeight;
	sW = window.innerWidth;
}

	
	};
	
	userScroll=function() {

		if($('.intro-vid').css('display')=='none'){
			$('header.home').css({
				top: 0,
				background: 'rgb(0,0,0)',
			});
			$('nav a:contains("Featured Work")').addClass('active');
			// $('.logoHome').show();
		}

		else{
		var amtScroll = $(window).scrollTop();
		if (amtScroll >= sH-70) {
			$('header.home').css({
				top: 0,
				background: 'rgb(0,0,0)',
				transition: 'background 0.4s ease-in'
			});
			$('nav a:contains("Featured Work")').addClass('active');
			$('.logoHome').fadeIn();
		} 
		else {
			console.log('scrolling up');
			// remove top:0
			$('header.home').css({
				background: 'transparent',
				top: '',
				bottom: amtScroll,
				transition: 'background 0.4s ease-in'
			});
			$('nav a').removeClass('active');
			$('.logoHome').fadeOut();
		}
	}
	};



function playNext(){
	videoIndex++;
	if(videoIndex>videoPlay.length-1){
		videoIndex=0;
	}
	myPlayer.src([
  		{ type: "video/mp4", src: "/videos/homepage/"+videoPlay[videoIndex].mp4 },
 		{ type: "video/ogg", src: "/videos/homepage/"+videoPlay[videoIndex].mp4 }
	]);
}


	 
			  
  window.addEventListener('resize', userResize, false);
  window.addEventListener('scroll',userScroll,false);
  window.addEventListener('scroll',userScroll,false);
  myPlayer.on('ended',playNext);
  // window.addEventListener('click',userClick.false);
});

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

});
