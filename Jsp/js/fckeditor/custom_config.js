FCKConfig.PluginsPath = FCKConfig.BasePath.substring(0,FCKConfig.BasePath.length-7) + 'custom/plugins/' ;
FCKConfig.Plugins.Add('userselector','zh_cn,en',FCKConfig.PluginsPath);
FCKConfig.Plugins.Add('depselector','zh_cn,en',FCKConfig.PluginsPath);
FCKConfig.Plugins.Add('dtextfield','zh_cn,en',FCKConfig.PluginsPath);
FCKConfig.Plugins.Add('dtextarea','zh_cn,en',FCKConfig.PluginsPath);
FCKConfig.Plugins.Add('dgrid','zh_cn,en',FCKConfig.PluginsPath);
FCKConfig.Plugins.Add('dhiddenfield','zh_cn,en',FCKConfig.PluginsPath);
FCKConfig.Plugins.Add('dcheckbox','zh_cn,en',FCKConfig.PluginsPath);
FCKConfig.Plugins.Add('dselectfield','zh_cn,en',FCKConfig.PluginsPath);
FCKConfig.Plugins.Add('ddateselect','zh_cn,en',FCKConfig.PluginsPath);
FCKConfig.Plugins.Add('dfckeditor','zh_cn,en',FCKConfig.PluginsPath);
FCKConfig.Plugins.Add('dradiobutton','zh_cn,en',FCKConfig.PluginsPath);
FCKConfig.Plugins.Add( 'flvPlayer','en,zh-cn',FCKConfig.PluginsPath) ;
FCKConfig.Plugins.Add( 'dfileattach','zh_cn,en',FCKConfig.PluginsPath) ;
FCKConfig.Plugins.Add( 'diccombo','zh_cn,en',FCKConfig.PluginsPath) ;
FCKConfig.Plugins.Add( 'dtemplates','zh_cn,en',FCKConfig.PluginsPath) ;
FCKConfig.Plugins.Add( 'dofficearea','zh_cn,en',FCKConfig.PluginsPath) ;

FCKConfig.ContextMenu.push('userselector');
FCKConfig.ContextMenu.push('depselector');
FCKConfig.ContextMenu.push('dtextfield');
FCKConfig.ContextMenu.push('dtextarea');
FCKConfig.ContextMenu.push('dgrid');
FCKConfig.ContextMenu.push('dhiddenfield');
FCKConfig.ContextMenu.push('dcheckbox');
FCKConfig.ContextMenu.push('dselectfield');
FCKConfig.ContextMenu.push('ddateselect');
FCKConfig.ContextMenu.push('dfckeditor');
FCKConfig.ContextMenu.push('dradiobutton');
FCKConfig.ContextMenu.push('dfileattach');
FCKConfig.ContextMenu.push('diccombo');
FCKConfig.ContextMenu.push('dtemplates');
FCKConfig.ContextMenu.push('dofficearea');

//FCKConfig.ContextMenu = ['Generic','Link','Anchor','Image','Flash','Select','Textarea','Checkbox','Radio','TextField','HiddenField','ImageButton','s_dep','s_users','Button','BulletedList','NumberedList','Table','Form','DivContainer'] ;
FCKConfig.ToolbarSets["Design"] = [
    ['Source','DocProps','-','Save','NewPage','Preview','-','Templates'],
	['Cut','Copy','Paste','PasteText','PasteWord','-','Print','SpellCheck'],
	['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
	['Form','Button','ImageButton','dcheckbox','dradiobutton','dtextfield','dtextarea','dselectfield','dhiddenfield','ddateselect','dfckeditor','depselector','userselector','diccombo','dgrid','dfileattach','dofficearea'],//,'flvPlayer'
	'/',
	['Bold','Italic','Underline','StrikeThrough','-','Subscript','Superscript'],
	['OrderedList','UnorderedList','-','Outdent','Indent','Blockquote','CreateDiv'],
	['JustifyLeft','JustifyCenter','JustifyRight','JustifyFull'],
	['Link','Unlink','Anchor'],
	['Image','Flash','Table','Rule','Smiley','SpecialChar','PageBreak'],
	'/',
	['Style','FontFormat','FontName','FontSize','dtemplates'],
	['TextColor','BGColor'],
	['FitWindow','ShowBlocks','-','About']		// No comma for the last row.
] ;

FCKConfig.DTemplatesXmlPath	= FCKConfig.PluginsPath + '/dtemplates/dform_templates.xml' ;

