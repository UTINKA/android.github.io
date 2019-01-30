var 
	sab_head = $('.settings_app_header'),
	sab = $('.settings_app'),
	sab_obj,
	sab_page = 'null',
	sab_scroll
;

function AppUpdateSecond()
{

}

function BackInApp()
{
	if(sab_page != 'null')
	{
		sab_head.css('top', '0');
		sab.css({
			'overflow-y': 'auto',
			'top': '0',
			'height': 'calc(100% - 40px)'
		});
		sab.find('.s_content').css('width', '95%');
		//
		sab_obj.attr('state','null');
		sab.find('.s_content').find('.s_block').each(function()
		{
			if($(this).attr('state') != 'opened')
			{
				$(this).css('z-index','3');
			} 
		});
		//
		sab_obj.css({
			'position': 'relative',
			'top': 'unset',
			'left': 'unset',
			'right': 'unset',
			'margin': '5px',
			'height': '40px',
			'border-radius': '2px',
			'z-index': '3'
		});
		sab.find('.s_content').find('.s_block_open').css({
			'height': '0',
			'display': 'none'
		});
		//
		sab.scrollTop(sab_scroll);
		sab_page = 'null';
	}
}

sab.find('.s_content').find('.s_block').click(function(e)
{
	var obj = $(this);
	if(sab_page == 'null')
	{
		sab_page = obj.find('label').text();
		//
		sab_scroll = sab.scrollTop();
		sab.scrollTop(0);
		sab_head.css('top', '-40px');
		sab.css({
			'overflow-y': 'hidden',
			'top': '-40px',
			'height': '100%'
		});
		sab.find('.s_content').css('width', '100%');
		//
		obj.attr('state','opened');
		sab.find('.s_content').find('.s_block').each(function()
		{
			if($(this).attr('state') != 'opened')
			{
				$(this).css('z-index','1');
			} 
		});
		//
		obj.css({
			'z-index': '4',
			'position': 'absolute',
			'top': '0',
			'left': '0',
			'right': '0',
			'margin': '0',
			'height': '40px',
			'border-radius': '0'
		});
		sab.find('.s_content').find('.s_block_open').css({
			'display': 'block',
			'height': 'auto'
		});
		// update opened page
		sab.find('.s_content').find('.s_block_open').text(sab_page);
		sab_obj = obj;
	}
	else if(sab_page != 'null')
	{
		sab_head.css('top', '0');
		sab.css({
			'overflow-y': 'auto',
			'top': '0',
			'height': 'calc(100% - 40px)'
		});
		sab.find('.s_content').css('width', '95%');
		//
		obj.attr('state','null');
		sab.find('.s_content').find('.s_block').each(function()
		{
			if($(this).attr('state') != 'opened')
			{
				$(this).css('z-index','3');
			} 
		});
		//
		obj.css({
			'position': 'relative',
			'top': 'unset',
			'left': 'unset',
			'right': 'unset',
			'margin': '5px',
			'height': '40px',
			'border-radius': '2px',
			'z-index': '3'
		});
		sab.find('.s_content').find('.s_block_open').css({
			'height': '0',
			'display': 'none'
		});
		//
		sab.scrollTop(sab_scroll);
		sab_page = 'null';
	}
	SClick();
});