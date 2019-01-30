var DownBox = $('#user_controls');
var RA = false;

function SetRAState(state)
{
	RA = state;
}

DownBox.find('#back').click(function(e)
{
	SysPlaySound('/system/media/ui/Effect_Tick.mp3', 1);
	if(GetCurrentApp() == 'recent_apps')
	{
		LoadContent_rp_app(ExitAppShowed);
		RA = false;
		return;
	}
	BackInApp();
});

DownBox.find('#home').click(function(e)
{
	SysPlaySound('/system/media/ui/Effect_Tick.mp3', 1);
	if(GetCurrentApp() == 'home_app') return BackInApp();
	//
	LoadContent_rp_app('home_app', true);
	if(RA == true) RA = false;	
});
	
DownBox.find('#recent_apps').click(function(e)
{
	SysPlaySound('/system/media/ui/Effect_Tick.mp3', 1);
	if(RA == false)
	{
		ExitAppShowed = GetCurrentApp();
		LoadContent_rp_app('recent_apps');
		RA = true;
	}
	else if(RA == true)
	{
		LoadContent_rp_app(ExitAppShowed);
		RA = false;
	}
});