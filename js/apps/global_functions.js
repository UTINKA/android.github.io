// Apps Names
var Apps_Names = [
	"home_app",
	"settings_app",
	"recent_apps",
	"dev_app",
	"market_app"
];

var Apps_Info = [];

// Apps Names
var Showed_Apps = [
	"settings_app",
	"dev_app",
	"market_app"
];



/* load priv_apps */
function LoadCss_pr_app(name_app)
{
	$('head').append('<link rel="stylesheet" href="' + GetLocationSite() + '/priv_apps/' + name_app + '/' + name_app + '.css" app_info="' + name_app + '" type="text/css" />');
}

function LoadJS_pr_app(name_app)
{
	$('#display_app').find('#app_block_id').append('<script class="scr_'+ name_app +'" type="text/javascript" src="' + GetLocationSite() +'/priv_apps/' + name_app + '/' + name_app + '.js" app_info="' + name_app + '"></script>');
}

function ReloadJS_pr_app(name_app)
{
	$('#display_app').find('#app_block_id').find('.scr_' + name_app).remove();
	setTimeout(function()
	{
		LoadJS_pr_app(name_app);
	}, 100);
}

function LoadContent_rp_app(name_app, hide_show_anim = true)
{
	if(hide_show_anim == true)
	{
		UpdateUpBar(0, 'transparent');
		$("#app_block_id").css('opacity','0');
		UpdateUserControls(0, 'rgba(0, 0, 0, 0.3)');
		setTimeout(function() 
		{ 
			$("#app_block_id").load(GetLocationSite() + '/priv_apps/'+name_app+'/'+name_app+'.html'); 
		}, 500);
	}
	else
	{
		$("#app_block_id").load(GetLocationSite() + '/priv_apps/'+name_app+'/'+name_app+'.html'); 
	}
	//
	$.ajax(
	{
		url: GetLocationSite() + '/priv_apps/'+name_app+'/'+name_app+'.txt',
		dataType: 'text',
		success: function (data) 
		{
			var setting_app = eval(data);
			//
			var app_name = setting_app.app_name;
			var up_bar_color = setting_app.status_bar_color;
			var up_bar_shadow = setting_app.status_bar_shadow;
			var down_UC_color = setting_app.down_user_controls_color;
			//
			if(hide_show_anim == true)
			{
				setTimeout(function()
				{
					UpdateUpBar(0, up_bar_color);
					UpdateUserControls(0, down_UC_color);
					//
					if(up_bar_shadow == 0) UpdateUpBar(1, 0);
					else if(up_bar_shadow == 1) UpdateUpBar(1, 1);
					//
					$("#app_block_id").css('opacity','1');
					ReloadJS_pr_app(name_app);
				}, 500);
			}
			else
			{
				UpdateUpBar(0, up_bar_color);
				UpdateUserControls(0, down_UC_color);
				//
				if(up_bar_shadow == 0) UpdateUpBar(1, 0);
				else if(up_bar_shadow == 1) UpdateUpBar(1, 1);
				//
				$("#app_block_id").css('opacity','1');
				ReloadJS_pr_app(name_app);
			}
			CurrentAppShowed = name_app;
			// app recent_apps
			for(var count = 0; count < Showed_Apps.length; count++)
			{
				if(Showed_Apps[count] == name_app) 
				{
					SetCurrentApp(name_app, app_name + ':showed');
				}
			}
		}
	});
}


function LoadAllApps_sys()
{
	var appscount = 0;
	while(appscount < Apps_Names.length)
	{
		LoadCss_pr_app(Apps_Names[appscount]);
		LoadJS_pr_app(Apps_Names[appscount]);
		LoadAllAppInfo(Apps_Names[appscount]);
		appscount++;
	}
}

function LoadAllAppInfo(app_name)
{
	for(var count = 0; count < Showed_Apps.length; count++)
	{
		if(Showed_Apps[count] == app_name) 
		{
			$.ajax(
			{
				url: GetLocationSite() + '/priv_apps/' + app_name + '/' + app_name + '.txt',
				dataType: 'text',
				success: function (data) 
				{
					var setting_app = eval(data);
					//
					var name = setting_app.app_name;
					var up_bar_color = setting_app.status_bar_color;
					var up_bar_shadow = setting_app.status_bar_shadow;
					var down_UC_color = setting_app.down_user_controls_color;
					//
					Apps_Info.push(name + ':' + up_bar_color + ':' + up_bar_shadow + ':' + down_UC_color);
				}
			});
		}
	}
}

/* load priv_apps */

