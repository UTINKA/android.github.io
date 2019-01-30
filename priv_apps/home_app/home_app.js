// home menu open ?
var hp_menu_state = false;




// buttons
$('.home_app .hp_down .apps_user .hp_menu_open').click(function(e)
{
	if(hp_menu_state == false)
	{
		SClick();
		$('.home_app .hp_box_menu').css({
			'top': '5px',
			'left': '5px',
			'right': '5px',
			'bottom': '5px',
			'border-radius': '5px',
			'z-index': '3'
		});
		hp_menu_state = true;
	}
});

// System Functions
function AppUpdateSecond()
{
	Date_Time = new Date();
	var HeadText = $('.hp_head').find('center').find('label');
	var DFW = DaysOfWeek() + ' ' + RealDay() + ' ' + RealMonthName(RealMonth(), true, true) + ' | 0°C';
	HeadText.text(DFW);
}

function BackInApp()
{
	if(hp_menu_state == true)
	{
		$('.home_app .hp_box_menu').css({
			'z-index': '1',
			'top': 'calc(91% - -10px)',
			'left': 'calc(46% - -10px)',
			'right': 'calc(46% - -10px)',
			'bottom': 'calc(3% - -10px)',
			'border-radius': '50%'
		});
		hp_menu_state = false;
	}
}


// load menu apps
function LoadMenuApps()
{
	var menu_box = $('.home_app .hp_box_menu');
	//
	var count = 0;
	while(count < Showed_Apps.length)
	{
		var app = Showed_Apps[count];
		var data = new String(Apps_Info[count]).split(':');
		var name = data[0];
		menu_box.append('\
		<a data="' + app + '">\
			<img src="' + GetLocationSite() +'/priv_apps/' + app + '/' + app + '.png">\
			<label>' + name + '</label>\
		</a>');
		count++;
	}
	menu_box.find('a').click(function(e)
	{
		var obj = $(this);
		var data = obj.attr('data');
		// load app
		LoadContent_rp_app(data);
	});
}
LoadMenuApps();