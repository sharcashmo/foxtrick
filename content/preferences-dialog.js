/**
 * Preference dialog functions.
 * @author Mod-PaV
 */
////////////////////////////////////////////////////////////////////////////////

var FoxtrickPreferencesDialog = {
      
    init : function() {
        // var doc = ev.originalTarget;
        var i;
                
        for ( i in FoxtrickPreferencesDialog.core_modules ) {
            FoxtrickPreferencesDialog.core_modules[i].init()
        }
		
		this.initCaptionsAndLabels( document );
        this.initMainPref( document );

		for each ( cat in Foxtrick.moduleCategories ) {
            this._fillModulesList( document, cat );
        }
        
        this.pref_show ('main_list');
    },
	

	initCaptionsAndLabels : function( document ) {
	
		// Window title
		window.title = Foxtrickl10n.getString( "foxtrick.prefs.preferences" );
		// Captions and labels
		var allLabels = [ "MainTab", "ShortcutsTab", "MatchesTab",
						  "ForumTab", "LinksTab", "AboutTab",
						  "buttonSave", "buttonCancel" ];
		for(var i = 0; i < allLabels.length; i++) {
			var thisElement = document.getElementById(allLabels[i]);
			thisElement.setAttribute( "label", Foxtrickl10n.getString(
				"foxtrick.prefs." + allLabels[i]) );
		}
	},
    
	initMainPref : function( doc ) {
		var modules_list = doc.getElementById( "main_list" );

        // language & currency
        var groupbox= doc.createElement("groupbox");
        var hbox= doc.createElement("hbox");

        var vbox1= doc.createElement("vbox");
        vbox1.setAttribute('flex',"1");
        var caption1= doc.createElement("caption");
        caption1.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.captionHTLanguage"));
        var menulist1= doc.createElement("menulist");
        menulist1.setAttribute('id',"htLanguage");
        var menupopup1= doc.createElement("menupopup");
        menupopup1.setAttribute('id',"htLanguagePopup");

        var vbox2= doc.createElement("vbox");
        vbox2.setAttribute('flex',"1");
        var caption2= doc.createElement("caption");
        caption2.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.captionHTCurrency"));
        var menulist2= doc.createElement("menulist");
        menulist2.setAttribute('id',"htCurrency");
        var menupopup2= doc.createElement("menupopup");
        menupopup2.setAttribute('id',"htCurrencyPopup");
        
        var vbox3= doc.createElement("vbox");
        vbox3.setAttribute('flex',"1");
        var caption3= doc.createElement("caption");
        caption3.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.captionHTDateformat"));
        var menulist3= doc.createElement("menulist");
        menulist3.setAttribute('id',"htDateformat");
        var menupopup3= doc.createElement("menupopup");
        menupopup3.setAttribute('id',"htDateformatPopup");
        
        menulist1.appendChild(menupopup1);
        vbox1.appendChild(caption1);
        vbox1.appendChild(menulist1);
        menulist2.appendChild(menupopup2);
        vbox2.appendChild(caption2);
        vbox2.appendChild(menulist2);
        menulist3.appendChild(menupopup3);
        vbox3.appendChild(caption3);
        vbox3.appendChild(menulist3);
        hbox.appendChild(vbox1);
        hbox.appendChild(vbox2);
        hbox.appendChild(vbox3);
        groupbox.appendChild(hbox);
        modules_list.appendChild(groupbox);

        var htLanguagesXml = doc.implementation.createDocument("", "", null);
        htLanguagesXml.async = false;
        htLanguagesXml.load("chrome://foxtrick/content/htlocales/htlang.xml", "text/xml");
        var itemToSelect=this.fillListFromXml("htLanguagePopup", "htLanguage-", htLanguagesXml, "language", "desc", "name", FoxtrickPrefs.getString("htLanguage"));
        document.getElementById("htLanguage").selectedIndex=itemToSelect;
 
        var htCurrencyXml = document.implementation.createDocument("", "", null);
        htCurrencyXml.async = false;
        htCurrencyXml.load("chrome://foxtrick/content/htlocales/htcurrency.xml", "text/xml");
        var itemToSelect2=this.fillListFromXml("htCurrencyPopup", "htCurrency-", htCurrencyXml, "currency", "name", "code", FoxtrickPrefs.getString("htCurrency"));
        document.getElementById("htCurrency").selectedIndex=itemToSelect2;

        var htDateFormatXml = document.implementation.createDocument("", "", null);
        htDateFormatXml.async = false;
        htDateFormatXml.load("chrome://foxtrick/content/htlocales/htdateformat.xml", "text/xml");
        var itemToSelect3=this.fillListFromXml("htDateformatPopup", "htDateformat-", htDateFormatXml, "dateformat", "name", "code", FoxtrickPrefs.getString("htDateformat"));
        document.getElementById("htDateformat").selectedIndex=itemToSelect3;
        
		// ShowOnStatusBar
		var groupbox= doc.createElement("groupbox");
		var caption= doc.createElement("caption");
		caption.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.captionShowOnStatusBar"));
		var vbox= doc.createElement("vbox");
		var checkbox= doc.createElement("checkbox");
		checkbox.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.statusbarpref"));
		checkbox.setAttribute('id',"statusbarpref");
		checkbox.setAttribute( "checked", FoxtrickPrefs.getBool( "statusbarshow" ) );
        
		vbox.appendChild(checkbox);
		groupbox.appendChild(caption);
		groupbox.appendChild(vbox);
		modules_list.appendChild(groupbox);

		// alert
		var groupbox= doc.createElement("groupbox");
		var caption= doc.createElement("caption");
		caption.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.captionAlertSettings"));
		var vbox= doc.createElement("vbox");
		var checkbox= doc.createElement("checkbox");
		checkbox.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.alertsliderpref"));
		checkbox.setAttribute('id',"alertsliderpref");
		checkbox.setAttribute( "checked", FoxtrickPrefs.getBool( "alertSlider" ) );
		vbox.appendChild(checkbox);
		var checkbox= doc.createElement("checkbox");
		checkbox.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.alertslidermacpref"));
		checkbox.setAttribute('id',"alertslidermacpref");
		checkbox.setAttribute( "checked", FoxtrickPrefs.getBool( "alertSliderGrowl" ) );
		vbox.appendChild(checkbox);
		var checkbox= doc.createElement("checkbox");
		checkbox.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.alertsoundpref"));
		checkbox.setAttribute('id',"alertsoundpref");
		checkbox.setAttribute( "checked", FoxtrickPrefs.getBool( "alertSound" ) );
		vbox.appendChild(checkbox);
		var textbox= doc.createElement("textbox");
		textbox.setAttribute('id',"alertsoundurlpref");
        textbox.setAttribute( "value", FoxtrickPrefs.getString( "alertSoundUrl" ) );
 		vbox.appendChild(textbox);
 		
 		
		var hbox= doc.createElement("hbox");
		hbox.setAttribute('align',"center");
		vbox.appendChild(hbox);
		var button= doc.createElement("button");
		button.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.buttonSelectFile"));
		button.setAttribute('id',"buttonSelectFile");
		button.setAttribute('oncommand',"var file = Foxtrick.selectFile(window); if (file != null) {document.getElementById('alertsoundurlpref').value='file://' + (file)}");
		hbox.appendChild(button);
		var button= doc.createElement("button");
		button.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.buttonTest"));
		button.setAttribute('id',"buttonTest");
		button.setAttribute('oncommand',"Foxtrick.playSound(document.getElementById('alertsoundurlpref').value);");
		hbox.appendChild(button);
	
  		vbox.appendChild(checkbox);
		groupbox.appendChild(caption);
		groupbox.appendChild(vbox);
		modules_list.appendChild(groupbox);

    // Skin
		var groupbox= doc.createElement("groupbox");
		var caption= doc.createElement("caption");
		caption.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.captionSkinSettings"));
		var vbox= doc.createElement("vbox");
		var textbox= doc.createElement("textbox");
		textbox.setAttribute('id',"cssskinpref");
    textbox.setAttribute( "value", FoxtrickPrefs.getString( "cssSkin" ) );
 		vbox.appendChild(textbox);
        
		vbox.appendChild(textbox);
		groupbox.appendChild(caption);
		groupbox.appendChild(vbox);
		modules_list.appendChild(groupbox);


		// stage
		var groupbox= doc.createElement("groupbox");
		var caption= doc.createElement("caption");
		caption.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.captionStageSettings"));
		var vbox= doc.createElement("vbox");
		var checkbox= doc.createElement("checkbox");
		checkbox.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.stagepref"));
		checkbox.setAttribute('id',"stagepref");
		checkbox.setAttribute( "checked", FoxtrickPrefs.getBool( "disableOnStage" ) );
        
		vbox.appendChild(checkbox);
		groupbox.appendChild(caption);
		groupbox.appendChild(vbox);
		modules_list.appendChild(groupbox);

		// CleanupBranch
		var groupbox= doc.createElement("groupbox");
		var caption= doc.createElement("caption");
		caption.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.captionCleanupBranch"));
		groupbox.appendChild(caption);
		var hbox= doc.createElement("hbox");
		var button= doc.createElement("button");
		button.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.buttonCleanupBranch"));
		button.setAttribute('id',"buttonCleanupBranch");
		button.setAttribute('oncommand',"FoxtrickPreferencesDialog.confirmCleanupBranch();");
		hbox.appendChild(button);
		var desc_box = this._getWrapableBox ( Foxtrickl10n.getString("foxtrick.prefs.labelCleanupBranch") );
		desc_box.setAttribute("flex","1");
		hbox.appendChild(desc_box);
		groupbox.appendChild(hbox);
		modules_list.appendChild(groupbox);
		
		// LoadSavePrefs
		var groupbox= doc.createElement("groupbox");
		var caption= doc.createElement("caption");
		caption.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.captionLoadSavePrefs"));
		groupbox.appendChild(caption);

		var hbox= doc.createElement("hbox");
		groupbox.appendChild(hbox);
		var hbox2= doc.createElement("hbox");
		groupbox.appendChild(hbox2);
		
		var button= doc.createElement("button");
		button.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.buttonSavePrefs"));
		button.setAttribute('id',"buttonSavePrefs");
		button.setAttribute('oncommand',"FoxtrickPreferencesDialog.SavePrefs();");
		hbox.appendChild(button);
		var desc_box = this._getWrapableBox ( Foxtrickl10n.getString("foxtrick.prefs.labelSavePrefs") );
		desc_box.setAttribute("flex","1");
		hbox.appendChild(desc_box);
		
		var button= doc.createElement("button");
		button.setAttribute("label",Foxtrickl10n.getString("foxtrick.prefs.buttonLoadPrefs"));
		button.setAttribute('id',"buttonLoadPrefs");
		button.setAttribute('oncommand',"FoxtrickPreferencesDialog.LoadPrefs();");
		hbox2.appendChild(button);
		var desc_box = this._getWrapableBox ( Foxtrickl10n.getString("foxtrick.prefs.labelLoadPrefs") );
		desc_box.setAttribute("flex","1");
		hbox2.appendChild(desc_box);
		
		modules_list.appendChild(groupbox);
    },


    onDialogAccept : function() {
        var modules_list;
                
        for each ( cat in Foxtrick.moduleCategories ) {
                switch(cat) {
                        case Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS:
                                modules_list = document.getElementById( 'shortcuts_list' );
								break;
						case Foxtrick.moduleCategories.MATCHES:
								modules_list = document.getElementById( 'matchfunctions_list' );
								break;
                        case Foxtrick.moduleCategories.FORUM:
                                modules_list = document.getElementById( 'forum_list' );
                                break;
                        case Foxtrick.moduleCategories.LINKS:
                                modules_list = document.getElementById( 'links_list' );
                                break;
                }
				
				for ( var i = 0; i < modules_list.childNodes.length; ++i ) {
					FoxtrickPreferencesDialog.setModuleEnableState( modules_list.childNodes[i].prefname,
                                                   modules_list.childNodes[i].childNodes[0].childNodes[0].checked );
					if (modules_list.childNodes[i].radio) {
						var radiogroup = modules_list.childNodes[i].childNodes[3].childNodes[0].childNodes;
						for (var j = 0; j < radiogroup.length; j++) {
							if (radiogroup[j].selected) {
								FoxtrickPreferencesDialog.setModuleValue( modules_list.childNodes[i].prefname, j );
								break;
							}
						}
					} else if (modules_list.childNodes[i].checkbox) {
						var checkboxes = modules_list.childNodes[i].childNodes[3].childNodes;
						for (var j = 0; j < checkboxes.length; j++) {
							if (checkboxes[j].id.search(/_text$/) == -1)
								FoxtrickPreferencesDialog.setModuleEnableState( modules_list.childNodes[i].prefname + "." + checkboxes[j].id, checkboxes[j].checked );
							else
								FoxtrickPreferencesDialog.setModuleOptionsText( modules_list.childNodes[i].prefname + "." + checkboxes[j].firstChild.id, checkboxes[j].firstChild.value );
						}
					}                                                   
						// modules_list.childNodes[i].checked );
            // dump( modules_list.childNodes[i].prefname + " " + modules_list.childNodes[i].childNodes[0].childNodes[0].checked + "\n" );
                }
        }
        
        //Lang
        FoxtrickPrefs.setString("htLanguage", document.getElementById("htLanguage").value);
		
		//Currency
        FoxtrickPrefs.setString("htCurrency", document.getElementById("htCurrency").value);
        
		//Dateformat
        FoxtrickPrefs.setString("htDateformat", document.getElementById("htDateformat").value);

        //Statusbar
        FoxtrickPrefs.setBool("statusbarshow", document.getElementById("statusbarpref").checked);

        //Alert
        FoxtrickPrefs.setBool("alertSlider", document.getElementById("alertsliderpref").checked);
        FoxtrickPrefs.setBool("alertSliderGrowl", document.getElementById("alertslidermacpref").checked);
        FoxtrickPrefs.setBool("alertSound", document.getElementById("alertsoundpref").checked);
        FoxtrickPrefs.setString("alertSoundUrl", document.getElementById("alertsoundurlpref").value);
        
        //Skins
        FoxtrickPrefs.setString("cssSkin", document.getElementById("cssskinpref").value);
        
        //Stage
		FoxtrickPrefs.setBool("disableOnStage", document.getElementById("stagepref").checked);
        // reinitialize
        FoxtrickMain.init();
                
        return true;
    },
    
    fillListFromXml: function(id, prefix, xmlDoc, elem, descAttr, valAttr, itemToSelect){
        
        var indexToSelect=-1;
        var values = xmlDoc.getElementsByTagName(elem);
        var menupopup = document.getElementById(id);
        var langs = [];

        for (var i=0; i<values.length; i++) {
            var label = values[i].attributes.getNamedItem(descAttr).textContent;
            var value = values[i].attributes.getNamedItem(valAttr).textContent;
            langs.push([label,value]);
        }
        
        function sortfunction(a,b) {
            return a[0].localeCompare(b[0]);
        }
        
        langs.sort(sortfunction);
    
        for (var i=0; i<langs.length; i++) {
            
            var label = langs[i][0];
            var value = langs[i][1];
    
            var obj = document.createElement("menuitem");
            obj.setAttribute("id", prefix+value);
            obj.setAttribute("label", label);
            obj.setAttribute("value", value);
            
            menupopup.appendChild(obj);
            
            if (itemToSelect==value)
                indexToSelect=i;
        }
    
        return indexToSelect;
    },

    _fillModulesList : function( doc, category ) {
                var modules_list;
                
                switch(category) {
						case Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS:
                                modules_list = document.getElementById( 'shortcuts_list' );
								break;
						case Foxtrick.moduleCategories.MATCHES:
								modules_list = document.getElementById( 'matchfunctions_list' );
								break;
                        case Foxtrick.moduleCategories.FORUM:
                                modules_list = document.getElementById( 'forum_list' );
                                break;
                        case Foxtrick.moduleCategories.LINKS:
                                modules_list = document.getElementById( 'links_list' );
                                break;
                }

				for ( i in Foxtrick.modules ) {
					var module = Foxtrick.modules[i];  
                        var module_category;
                        module_category = module.MODULE_CATEGORY;
                        if(!module_category) {
                                // MODULE_CATEGORY isn't set; use default
                                module_category = "shortcutsandtweaks";
                        }
                        if(module_category == category) {
							var entry;
							if (module.RADIO_OPTIONS != null) {
								entry = FoxtrickPreferencesDialog._radioModule(module);
							} else if (module.OPTIONS != null) {
								var bOptionTexts = (module.OPTION_TEXTS != null && module.OPTION_TEXTS);
								entry = FoxtrickPreferencesDialog._checkboxModule(module, bOptionTexts);
							} else {
								entry = FoxtrickPreferencesDialog._normalModule(module);
							}
							modules_list.appendChild( entry );
                        }
        }
    },
	
	_getWrapableBox : function( desc_text ) {
		var desc_box = document.createElement( "hbox" );
		var desc = document.createElement("textbox"); 
		desc.setAttribute( "class", "plain");
		desc.setAttribute( "style", "background-color: transparent !important; color: #000000;");
		desc.setAttribute( "height", "20 ");
		desc.setAttribute( "flex", "1");
		desc.setAttribute( "multiline", "true");
		desc.setAttribute( "readonly","true");   
		desc.setAttribute( "onoverflow", "this.heigh=20; this.height = this.inputField.scrollHeight;");
		desc.setAttribute( "DOMAttrModified","if(event.attrName == 'value') this.value = event.newValue; return true;");   
		desc.setAttribute( "value",desc_text);   
		desc_box.appendChild( desc );  
		return desc_box;
	},	
	
	_radioModule : function( module ) {
		var entry = document.createElement( "vbox" );
		entry.prefname = module.MODULE_NAME;
		entry.radio = true;
        entry.setAttribute( "class", "radio_group_box" );
		var hbox = document.createElement( "hbox" );
		
		var check = document.createElement( "checkbox" );
		check.addEventListener( "click", function( ev ) { ev.target.checked = !ev.target.checked; }, true );
		check.setAttribute( "checked", Foxtrick.isModuleEnabled( module ) ); 
        check.setAttribute( "class", "radiobox_group" ); 
		hbox.appendChild( check );
		hbox.addEventListener( "click", function( ev ) { 
			ev.currentTarget.childNodes[0].checked = !(ev.currentTarget.childNodes[0].checked);
			var radios = ev.currentTarget.nextSibling.nextSibling.nextSibling.childNodes[0].childNodes;
			if (!ev.currentTarget.childNodes[0].checked) {
				for (var i = 0; i < radios.length; i++) {
					radios[i].setAttribute( "disabled", true);
                    radios[i].setAttribute( "hidden", true);
				}
			} else {
				for (var i = 0; i < radios.length; i++) {
					radios[i].setAttribute( "disabled", false);
                    radios[i].setAttribute( "hidden", false);
				}
			}
		}, false );
		
		var name = document.createElement( "label" );
		name.setAttribute( "class", "name" );
		name.setAttribute( "value", module.MODULE_NAME );
		hbox.appendChild( name );
		entry.appendChild( hbox );

		var desc_box = this._getWrapableBox ( FoxtrickPreferencesDialog.getModuleDescription( module.MODULE_NAME ) );
		entry.appendChild (desc_box);
        
		var spacer = document.createElement( "spacer" );
        spacer.height = "5";
        entry.appendChild( spacer );
		
		hbox = document.createElement( "hbox" );
		entry.appendChild( hbox );
		var radiogroup = document.createElement( "radiogroup" );
		var selectedValue = Foxtrick.getModuleValue( module );
		for (var i = 0; i < module.RADIO_OPTIONS.length; i++) {
			var radio = document.createElement( "radio" );
            radio.setAttribute( "class", "radio_in_group" );
			radio.addEventListener( "click", function( ev ) {
				if (!ev.target.disabled) {
					ev.target.setAttribute( "selected", true);
				}
			}, true );
			var selected;
			if (selectedValue == i) {
				selected = true;
			} else {
				selected = false;
			}
			radio.setAttribute( "selected", selected);
			radio.setAttribute( "label", FoxtrickPreferencesDialog.getModuleDescription( 
				module.MODULE_NAME + "." + module.RADIO_OPTIONS[i] ));
			if (!Foxtrick.isModuleEnabled( module )) {
				radio.setAttribute( "disabled", true);
                radio.setAttribute( "hidden", true);
            } else {
                radio.setAttribute( "hidden", false);            
            }            
			radiogroup.appendChild( radio );
		}
		hbox.appendChild( radiogroup );
		return entry;
	},
	
	_checkboxModule : function (module, bOptionTexts) {
		var entry = document.createElement( "vbox" );
		entry.prefname = module.MODULE_NAME;
		entry.checkbox = true;
		entry.setAttribute( "class", "checkbox_group_box" );
		var hbox = document.createElement( "hbox" );
		
		var check = document.createElement( "checkbox" );
		check.addEventListener( "click", function( ev ) { ev.target.checked = !ev.target.checked;}, true );
		check.setAttribute( "checked", Foxtrick.isModuleEnabled( module ) );
        check.setAttribute( "class", "checkbox_group" ); 
		hbox.appendChild( check );
		hbox.addEventListener( "click", function( ev ) { 
			ev.currentTarget.childNodes[0].checked = !(ev.currentTarget.childNodes[0].checked);
			var checkboxes = ev.currentTarget.nextSibling.nextSibling.nextSibling.childNodes;
			if (!ev.currentTarget.childNodes[0].checked) {
				for (var i = 0; i < checkboxes.length; i++) {
					checkboxes[i].setAttribute( "disabled", true);
                    checkboxes[i].setAttribute( "hidden", true);
				}
			} else {
				for (var i = 0; i < checkboxes.length; i++) {
					checkboxes[i].setAttribute( "disabled", false);
                    checkboxes[i].setAttribute( "hidden", false);
				}
			}
		}, false );
		
		var name = document.createElement( "label" );
		name.setAttribute( "class", "name" );
		name.setAttribute( "value", module.MODULE_NAME );
		hbox.appendChild( name );
		entry.appendChild( hbox );
		
		var desc_box = this._getWrapableBox ( FoxtrickPreferencesDialog.getModuleDescription( module.MODULE_NAME ) );
		entry.appendChild (desc_box);

        var spacer = document.createElement( "spacer" );
        spacer.height = "5";
        entry.appendChild( spacer );
		
		hbox = document.createElement( "vbox" );
		entry.appendChild( hbox );
		for (var i = 0; i < module.OPTIONS.length; i++) {
			var checkbox = document.createElement( "checkbox" );
			var key,title;
			if (module.OPTIONS[i]["key"]==null){
                key=module.OPTIONS[i];
                //title=module.OPTIONS[i];
                title = FoxtrickPreferencesDialog.getModuleElementDescription( module.MODULE_NAME, module.OPTIONS[i] );
            }
			else {key=module.OPTIONS[i]["key"];title=module.OPTIONS[i]["title"];}
			checkbox.setAttribute( "checked", Foxtrick.isModuleFeatureEnabled( module, key) );
			checkbox.setAttribute( "label", title);
			checkbox.setAttribute( "id", key);
            checkbox.setAttribute( "class", "checkbox_in_group" );
			if (!Foxtrick.isModuleEnabled( module )) {
				checkbox.setAttribute( "disabled", true);
                checkbox.setAttribute( "hidden", true);
            } else {
                checkbox.setAttribute( "disabled", false);
                checkbox.setAttribute( "hidden", false);
            }
			hbox.appendChild( checkbox );
			if (bOptionTexts){
				var htextbox = document.createElement("hbox");
				htextbox.setAttribute("id", "hbox_" + key + "_text");
				var textbox = document.createElement("textbox");
				textbox.setAttribute("id", key + "_text");
				textbox.setAttribute("style", "margin-left:20px;");
				textbox.setAttribute("width", "300px");
				var val = FoxtrickPrefs.getString( "module." + module.MODULE_NAME + "." + key + "_text" );
				if (!val && module.OPTION_TEXTS_DEFAULT_VALUES && module.OPTION_TEXTS_DEFAULT_VALUES[i]){
					val = module.OPTION_TEXTS_DEFAULT_VALUES[i];
				}
				textbox.setAttribute("value", val);
				htextbox.appendChild(textbox);
				hbox.appendChild(htextbox);
			}
		}
		
		return entry;
	},
	
	_normalModule : function (module) {
		var entry = document.createElement( "vbox" );
        entry.prefname = module.MODULE_NAME;
		entry.setAttribute( "class", "normal_entry" );
		var hbox = document.createElement( "hbox" );
		hbox.addEventListener( "click", function( ev ) { 
			ev.currentTarget.childNodes[0].checked =
				!(ev.currentTarget.childNodes[0].checked);
		}, false );

		var check = document.createElement( "checkbox" );
		check.addEventListener( "click", function( ev ) { ev.target.checked = !ev.target.checked; }, true );
		check.setAttribute( "checked", Foxtrick.isModuleEnabled( module ) ); 
        check.setAttribute( "class", "checkbox_normal" );
		hbox.appendChild( check );
		var name = document.createElement( "label" );
		name.setAttribute( "class", "name" );
		name.setAttribute( "value", module.MODULE_NAME );
		hbox.appendChild( name );
		entry.appendChild( hbox );
		
		var desc_box = this._getWrapableBox ( FoxtrickPreferencesDialog.getModuleDescription( module.MODULE_NAME ) );
		entry.appendChild (desc_box);
        
		return entry;
	}
};

FoxtrickPreferencesDialog.core_modules = [ FoxtrickPrefs, Foxtrickl10n ];

FoxtrickPreferencesDialog.setModuleEnableState = function( module_name, value ) {
	  FoxtrickPrefs.setBool( "module." + module_name + ".enabled", value );
}

FoxtrickPreferencesDialog.setModuleOptionsText = function( module_name, value ) {
	  FoxtrickPrefs.setString( "module." + module_name, value );
}

FoxtrickPreferencesDialog.setModuleValue = function( module_name, value ) {
    FoxtrickPrefs.setInt( "module." + module_name + ".value", value );
}

FoxtrickPreferencesDialog.getModuleDescription = function( module_name ) {
    var name = "foxtrick." + module_name + ".desc";
    if ( Foxtrickl10n.isStringAvailable( name ) )
        return Foxtrickl10n.getString( name );
    else {
        dump( "Foxtrick string MODULE " + module_name + " missing!\n");
        return "No description";
    }
}

FoxtrickPreferencesDialog.getModuleElementDescription = function( module_name, option ) {
    var name = "foxtrick." + module_name + "." + option + ".desc";
    if ( Foxtrickl10n.isStringAvailable( name ) )
        return Foxtrickl10n.getString( name );
    else {
        dump( "Foxtrick string ELEMENT " + name + " missing!\n");
        //return "No description";
        return option;
    }
}

FoxtrickPreferencesDialog.configureFoxtrick = function( button ) {
	if(!button) {
        window.open("chrome://foxtrick/content/preferences-dialog.xul",
                      "", 
                      "centerscreen, chrome, modal, resizable=yes");
	}
}

FoxtrickPreferencesDialog.pref_show = function ( vbox ) {
    VBOXES = ["main_list", "shortcuts_list", "matchfunctions_list", "forum_list", "links_list", "about_list"];
    var box;
    for (var i = 0; i < VBOXES.length; i++) {
        try { 
            box = document.getElementById( VBOXES[i] );
            if ( VBOXES[i] == vbox) {
                box.style.width = "100%";
                box.style.height = "100%";
                box.style.overflow = "hidden";
            }
            else {
                box.style.width = "100%";
                box.style.height = "300px";
                box.style.overflow = "hidden";
            }
        }
        catch (e) {
            dump(e);
        }
    }
}

FoxtrickPreferencesDialog.prefhelp_show = function ( HelpTitle, HelpDesc, where ) {
    openDialog("chrome://foxtrick/content/preferences-help.xul",
               "FoxTrick Help",
               "titlebar=no, modal, left=" + (where.boxObject.screenX + 20) + ", top=" + (where.boxObject.screenY - 10),
               HelpTitle, 
               HelpDesc);
}

FoxtrickPreferencesDialog.confirmCleanupBranch = function ( ) {
    if ( Foxtrick.confirmDialog( Foxtrickl10n.getString( 'delete_foxtrick_branches_ask' ) ) )  {
        try {
			//var prefObj = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
            //var branch = prefObj.getBranch("extensions.foxtrick.");
            //branch.deleteBranch("prefs");
			var array = FoxtrickPrefs._getElemNames("");
			for(var i = 0; i < array.length; i++) {
				if( array[i].search( "YouthPlayer" ) == -1 
					&& array[i].search( "transferfilter" ) == -1
					&& array[i].search( "post_templates" ) == -1
					&& (array[i].search( "LinksCustom" ) == -1 || array[i].search( "LinksCustom.enabled" ) != -1) ){
					FoxtrickPrefs.deleteValue(array[i]);
				}
			}
            close();
        }
        catch (e) {
			dump(e);
        }
    } 
    return true;            
}

FoxtrickPreferencesDialog.SavePrefs = function () {
        try {
			var locpath=Foxtrick.selectFileSave(window);
			if (locpath==null) {return;}
			var File = Components.classes["@mozilla.org/file/local;1"].
                     createInstance(Components.interfaces.nsILocalFile);
			File.initWithPath(locpath);
			
			var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"].
                         createInstance(Components.interfaces.nsIFileOutputStream);
			foStream.init(File, 0x02 | 0x08 | 0x20, 0666, 0); 
			var os = Components.classes["@mozilla.org/intl/converter-output-stream;1"]
                   .createInstance(Components.interfaces.nsIConverterOutputStream);
			os.init(foStream, "UTF-8", 0, 0x0000);

			var array = FoxtrickPrefs._getElemNames("");
			for(var i = 0; i < array.length; i++) {
					var value=FoxtrickPrefs.getString(array[i]);
					if (value!=null) os.writeString('user_pref("extensions.foxtrick.prefs.'+array[i]+'","'+value.replace(/\n/g,"\\n")+'");\n');
					else { value=FoxtrickPrefs.getInt(array[i]);
						if (value==null) value=FoxtrickPrefs.getBool(array[i]);
						os.writeString('user_pref("extensions.foxtrick.prefs.'+array[i]+'",'+value+');\n');
						}
				}
			os.close();
			foStream.close(); 
			
			close();
		}
		catch (e) {
			Foxtrick.alert(e);
        }     	
    return true;            
}            

FoxtrickPreferencesDialog.LoadPrefs = function () {
        try {
			// nsifile
			var locpath=Foxtrick.selectFile(window);
			if (locpath==null) return;
			var File = Components.classes["@mozilla.org/file/local;1"].
                     createInstance(Components.interfaces.nsILocalFile);
			File.initWithPath(locpath);
			// converter			
			var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"]
                          .createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
			converter.charset = "UTF-8";
			var fis = Components.classes["@mozilla.org/network/file-input-stream;1"]
                    .createInstance(Components.interfaces.nsIFileInputStream);
			fis.init(File, -1, -1, 0);
			var lis = fis.QueryInterface(Components.interfaces.nsILineInputStream);
			var lineData = {};
			var cont;
			do {
				cont = lis.readLine(lineData);
				var line = converter.ConvertToUnicode(lineData.value);
				var key = line.match(/user_pref\("extensions\.foxtrick\.prefs\.(.+)",/)[1];
				var value=line.match(/\",(.+)\)\;/)[1];				
				var strval = value.match(/\"(.+)\"/);
				if (value == "\"\"") FoxtrickPrefs.setString(key,"");
				else if (strval != null) FoxtrickPrefs.setString(key,strval[1]);
				else if (value == "true") FoxtrickPrefs.setBool(key,true);
				else if (value == "false") FoxtrickPrefs.setBool(key,false);
				else FoxtrickPrefs.setInt(key,value);
			} while (cont);
			
			fis.close();
			close();	
		}
		catch (e) {
			Foxtrick.alert(e);
        }     	
    return true;            
}            
