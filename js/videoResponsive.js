$(document).ready(function(){
  // Showcase video of my latest project
	var vimeoUrl = 'http://player.vimeo.com/external/87856382.hd.mp4?s=e09aec518f163bd6d03f98776ccf93cc';

	var $video = $('<video>').attr('src', vimeoUrl);
	var video = $video[0];

	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	var loaded = false;


	$('.playbutton').on('click', function(e){
		e.preventDefault();

		var $button = $(this);
		var $holder = $(this).parent();
		var state = $button.hasClass('paused') ? 'paused' 	:
					$button.hasClass('playing') ? 'playing' :
					'loading';

		if( state == 'loading'){
			$holder.prepend($video);

			if( isMobile ){
				video.play();
				$button.addClass('playing');
				return;
			}

			$button.addClass('loading');

			if( loaded ){
				$button.addClass('playing');
				video.play();
			}

			video.load();

			$video.on('canplay', function(){
				loaded = true;
				$button.addClass('playing');
				$button.removeClass('loading');
				video.play();	
			});

			$video.on('ended', function(){
				$button.removeClass('playing');
			});

			return;
		}

		if( state === 'playing' ){
			video.pause();
			$button.addClass('paused');

			return;
		}

		if( state === 'paused' ){
			video.play();
			$button.removeClass('paused');

			return;
		}

	})
})