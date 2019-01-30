var 
	reab = $('.recent_apps'),
	reab_state_s = 0,
	reab_sroll = 0
; 

function AppUpdateSecond()
{
	
}

reab.find('.ra_content').bind('mousewheel', function(e) 
{
	e.preventDefault();
	var scrollTop = this.scrollTop;
	var sc = (scrollTop + ((e.deltaY * e.deltaFactor) * -1));
    e.stopPropagation(); 
	$(this).stop().animate(
	{ 
		scrollTop: sc 
	}, 150);
	
});


var load_reapp = 0;
while(load_reapp < started_apps.length)
{
	if(started_apps[load_reapp] != undefined || started_apps[load_reapp] != null)
	{
		var obj = started_apps[load_reapp].split(':');
		var app_name = obj[0];
		var app_title = obj[1];
		var app_state = obj[2];
		var Screen = GetScreenApp(load_reapp);
		//
		reab.find('.ra_content').append('\
		<a class="ra_block" data="' + app_name + ':' + app_title + ':' + app_state + '">\
			<label>\
				<img src="/priv_apps/' + app_name + '/' + app_name + '.png">\
				<text>' + app_title + '</text>\
				<div class="close_app" data="' + app_name + ':' + app_title + ':' + app_state + '"><i class="material-icons">close</i></div>\
			</label>\
			<div class="ra_app">\
			</div>\
		</a>\
		');
		$('.recent_apps .ra_content').find('a').each(function(e)
		{
			$(this).find('.ra_app').append(Screen)
		});
		CheckClicks();
	}
	load_reapp++;
}
if(started_apps.length == 0)
{
	reab.find('.close_all_apps').css({
		'display':'none',
		'opacity':'0'
	});
	reab.find('.ra_content').append('\
	<div class="apps_not">\
		<text>нет ранее запушеных приложений</text>\
	</div>');
}
else if(started_apps.length > 0)
{
	reab.find('.close_all_apps').css('display', 'block');
	setTimeout(function() 
	{
		reab.find('.close_all_apps').css('opacity', '1');
	}, 500);
}

reab.find('.close_all_apps').click(function(e)
{
	console.log('click_all_apps_close');
	$('.recent_apps .ra_content').find('a').each(function(e)
	{
		var obj = $(this);
		obj.css({
			'transform': 'scale(0)',
			'opacity': '0'
		});
		setTimeout(function() 
		{
			obj.css('display', 'none');
		}, 500);
		// remove app in RA
		var data = obj.attr('data').split(':');
		console.log('closed(' + data[0] + ':' + data[1] + ':' + data[2] + ')');
		RemoveRecentApp(data[0]);
		// HIDE RA
		if(started_apps.length <= 0)
		{
			setTimeout(function() 
			{	
				SetRAState(false);
				LoadContent_rp_app('home_app');
			}, 100);
		}
		SClick();
	});
});

function CheckClicks()
{
	// close app
	$('.recent_apps .ra_content').find('a label').find('.close_app').click(function(e)
	{
		var obj = $(this);
		// Anim Box
		obj.parent('label').parent('a').css({
			'transform': 'scale(0)',
			'opacity': '0'
		});
		setTimeout(function() 
		{
			obj.parent('label').parent('a').css('display', 'none');
		}, 500);
		// remove app in RA
		var data = obj.attr('data').split(':');
		console.log('click_close(' + data[0] + ':' + data[1] + ':' + data[2] + ')');
		RemoveRecentApp(data[0]);
		// HIDE RA
		if(started_apps.length <= 0)
		{
			setTimeout(function() 
			{	
				SetRAState(false);
				LoadContent_rp_app('home_app');
			}, 100);
		}
		SClick();
	});
	// open app
	reab.find('.ra_content').find('a').dblclick(function(e)
	{
		var obj = $(this);
		obj.find('.ra_app').find('canvas').remove();
		obj.css({
			'position': 'absolute',
			'top': '0',
			'left': '0',
			'right': '0',
			'bottom': '0',
			'width': 'auto',
			'height': 'auto',
			'margin': '0',
			'z-index': '5',
			'border-radius': '0'
		});
		setTimeout(function() 
		{ 
			obj.find('label').css('top', '-45px');
			setTimeout(function() 
			{ 
				var data = obj.attr('data').split(':');
				LoadContent_rp_app(data[0], false);
				SetRAState(false);
			}, 500);
		}, 500);
		SClick();
	});
}


