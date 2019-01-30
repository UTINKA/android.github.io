// func's system 
var 
	location_site = window.location.href.substring(0, window.location.href.length-1),
	system_walls_url = '',
	recent_apps = [],
	started_apps = [],
	ExitAppShowed = '',
	CurrentAppShowed = '',
	
	SystemVolume = 1,
	NotyfiVolume = 1,
	AudioVolume = 1
;

function GetLocationSite()
{
	return location_site;
}

/* System Audio */

function SClick()
{
	SysPlaySound('/system/media/ui/Effect_Tick.mp3', 1);
}

/*
	comp:
	0 - SystemAudio
	1 - NotifiAudio
	2 - AudioVolume
*/
function SetVolume(comp, vol)
{
	if(vol < 0 || vol > 1) return;
	if(comp == 0) SystemVolume = vol;
	else if(comp == 1) NotyfiVolume = vol;
	else if(comp == 2) AudioVolume = vol;
}

function GetVolume(comp)
{
	if(comp == 0) return SystemVolume;
	else if(comp == 1) return NotyfiVolume;
	else if(comp == 2) return AudioVolume;
}


function SysPlaySound(url, volume)
{
	var src = location_site + url;
	var a = $('.SystemAudio')[0];
	a.pause();
	a.src = src;
	a.volume = volume;
	a.load();
	a.play();
	//
	a.addEventListener('ended', function ()
	{
		a.pause();
		a.currentTime = 0;
		a.src = '';
	});
}

function NotyfiPlaySound(url,volume)
{
	var src = location_site + url;
	var a = $('.NotifiAudio')[0];
	a.pause();
	a.src = src;
	a.volume = volume;
	a.load();
	a.play();
	//
	a.addEventListener('ended', function ()
	{
		a.pause();
		a.currentTime = 0;
		a.src = '';
	});
}

/* notifications */
function Notifi(label,text,app_name = '',icon = '',components = undefined)
{
	return NotyfiPlaySound('/system/media/notifications/Iapetus.mp3', 1);
}

/* system interfase functions */
function UpdateUserControls(type_setting, setting)
{
	var Box = $('#user_controls');
	/*
		0 - background
	*/
	switch(type_setting)
	{
		case 0:
		{
			Box.css('background', setting);
		}
	}
	
}
function UpdateUpBar(type_setting, setting)
{
	var Box = $('#app_up_id');
	var ShadowUpBar = $('#up_bar');
	/*
		0 - background
		1 - box_shadow
	*/
	switch(type_setting)
	{
		case 0: return Box.css('background', setting);
		case 1:
		{
			if(setting == 0) return ShadowUpBar.css('box-shadow', 'inset 0px 17px 20px -15px rgba(0, 0, 0, 0)');
			else if(setting == 1) return ShadowUpBar.css('box-shadow', 'inset 0px 17px 20px -15px rgba(0, 0, 0, 0.6)');
		}

	}
}

function SetWalls(url)
{
	system_walls_url = url;
	$('.mobile .display').css({
		'background': 'url(' + GetLocationSite() + url + ')',
		'background-size': 'cover',
		'background-repeat': 'no-repeat',
		'background-position': 'top'
	});
}
/* system interfase functions */

function AppScreenShot()
{
	html2canvas(document.getElementById("app_block_id")).then(function(canvas) 
	{
		recent_apps.push(canvas);
	});
}

function GetScreenApp(app_id)
{
	return recent_apps[app_id];
}

function IsAddedRecentApp(name_app)
{

}

function CheckInRecentApp(name_app) // return true(если есть в RA) false(есди нету в RA)
{
	for(var app_id = 0; app_id < started_apps.length; app_id++) 
	{
		var started_app = new String(started_apps[app_id]).split(':');
		if(name_app == started_app[0])
		{
			return true; 
		}
	}
	return false;
}

function SetCurrentApp(name_app, value)
{
	if(CheckInRecentApp(name_app) == false)
	{
		var val = name_app + ':' + value;
		started_apps.push(val);
		setTimeout(function(){ AppScreenShot(); }, 1000);
		console.log(val);
	}
}

function GetCurrentApp()
{
	return CurrentAppShowed;
}

function RemoveRecentApp(name_app)
{
	if(CheckInRecentApp(name_app) == true)
	{
		for(var app_id = 0; app_id < started_apps.length; app_id++) 
		{
			var started_app = new String(started_apps[app_id]).split(':');
			if(name_app == started_app[0])
			{
				//delete started_apps[app_id];
				var index = started_apps.indexOf(started_apps[app_id]);
				started_apps.splice(index, 1);
			}
		}
	}
}

// func's Date
var Date_Time = new Date();
// Time
function RealHours() 
{ 
	var res;
	if(Date_Time.getHours() < 10) res = '0' + Date_Time.getHours();
	if(Date_Time.getHours() > 9) res = Date_Time.getHours();
	return res;
}
function RealMinutes() 
{ 
	var res;
	if(Date_Time.getMinutes() < 10) res = '0' + Date_Time.getMinutes();
	if(Date_Time.getMinutes() > 9) res = Date_Time.getMinutes();
	return res;
}
	
function RealSeconds() 
{ 
	var res;
	if(Date_Time.getSeconds() < 10) res = '0' + Date_Time.getSeconds();
	if(Date_Time.getSeconds() > 9) res = Date_Time.getSeconds();
	return res;
}
// Date
function RealDay(nul = true) 
{ 
	var res;
	if(nul == true)
	{
		if(Date_Time.getDate() < 10) res = '0' + Date_Time.getDate();
		if(Date_Time.getDate() > 9) res = Date_Time.getDate();
	}
	else if(nul == false)
	{
		res = Date_Time.getDate();
	}
	return res;
}
	
function RealMonth() 
{ 
	var res;
	res = Date_Time.getMonth();
	return res;
}

function DaysOfWeek(rus_eng = false)
{
	// rus_eng = false(rus), true(eng)
	var DFW = Date_Time.getDay();
	if(rus_eng == false)
	{
		switch(DFW)
		{
			case 0: return 'Воскресенье';
			case 1: return 'Понедельник';
			case 2: return 'Вторник';
			case 3: return 'Среда';
			case 4: return 'Четверг';
			case 5: return 'Пятница';
			case 6: return 'Суббота';
		}
	}
	else if(rus_eng == true)
	{
		switch(DFW)
		{
			case 0: return 'Sunday';
			case 1: return 'Monday';
			case 2: return 'Tuesday';
			case 3: return 'Wednesday';
			case 4: return 'Thursday';
			case 5: return 'Friday';
			case 6: return 'Saturday';
		}
	}
	return '';
}
function RealMonthName(number, TextUp = true, TextA = false) 
{ 
	if(TextUp == true)
	{
		if(TextA == false)
		{
			switch(number)
			{
				case 0: return 'Январь';
				case 1: return 'Февраль';
				case 2: return 'Март';
				case 3: return 'Апрель';
				case 4: return 'Май';
				case 5: return 'Июнь';
				case 6: return 'Июль';
				case 7: return 'Август';
				case 8: return 'Сентябрь';
				case 9: return 'Октябрь';
				case 10: return 'Ноябрь';
				case 11: return 'Декабрь';
			}
		}
		else if(TextA == true)
		{
			switch(number)
			{
				case 0: return 'Января';
				case 1: return 'Февраля';
				case 2: return 'Марта';
				case 3: return 'Апреля';
				case 4: return 'Мая'; 
				case 5: return 'Июня';
				case 6: return 'Июля';
				case 7: return 'Августа';
				case 8: return 'Сентября';
				case 9: return 'Октября';
				case 10: return 'Ноября';
				case 11: return 'Декабря';
			}
		}
	}
	else if(TextUp == false)
	{
		if(TextA == false)
		{
			switch(number)
			{
				case 0: return 'январь'; 
				case 1: return 'Февраль';
				case 2: return 'март';
				case 3: return 'апрель';
				case 4: return 'май'; 
				case 5: return 'июнь';
				case 6: return 'июль';
				case 7: return 'август';
				case 8: return 'сентябрь';
				case 9: return 'октябрь';
				case 10: return 'ноябрь';
				case 11: return 'декабрь';
			}
		}
		else if(TextA == true)
		{
			switch(number)
			{
				case 0: return 'января';
				case 1: return 'Февраля';
				case 2: return 'марта';
				case 3: return 'апреля';
				case 4: return 'мая';
				case 5: return 'июня';
				case 6: return 'июля';
				case 7: return 'августа';
				case 8: return 'сентября';
				case 9: return 'октября';
				case 10: return 'ноября';
				case 11: return 'декабря';
			}
		}
	}
	return '';
}

function RealFullYear() 
{ 
	var res;
	res = Date_Time.getFullYear();
	return res;
}