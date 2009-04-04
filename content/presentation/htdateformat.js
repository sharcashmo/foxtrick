/**
 * HTDateFormat displays week and season next to date
 * @author spambot
 */

FoxtrickHTDateFormat = {

    MODULE_NAME : "HTDateFormat",
    MODULE_CATEGORY : Foxtrick.moduleCategories.PRESENTATION,
    DEFAULT_ENABLED : true,
    NEW_AFTER_VERSION: "0.4.6.2",	
	SCREENSHOT:"",
	PREF_SCREENSHOT:"",
	LASTEST_CHANGE:"Option to set first day of week added",
	OPTIONS :  new Array("LocalSaison","FirstDayOfWeekOffset"), 
	OPTION_TEXTS : true,
	OPTION_TEXTS_DEFAULT_VALUES : new Array("","-2"),
	OPTION_TEXTS_DISABLED_LIST : new Array(true,false),

    init : function() {
        Foxtrick.registerPageHandler('transfersTeam', this);
        Foxtrick.registerPageHandler('TransfersPlayer', this);
        Foxtrick.registerPageHandler('TransferCompare', this);
        Foxtrick.registerPageHandler('matches', this);
        // Foxtrick.registerPageHandler('match', this);
        Foxtrick.registerPageHandler('matchesarchiv', this);
        Foxtrick.registerPageHandler('teamPageGeneral', this);
        Foxtrick.registerPageHandler('achievements', this);
        Foxtrick.registerPageHandler('teamevents', this);
        Foxtrick.registerPageHandler('history', this);
        Foxtrick.registerPageHandler('arena', this);
        Foxtrick.registerPageHandler('league', this);
    },

    run : function(page, doc) {

        var httime = doc.getElementById( "time" ).innerHTML;

        HT_date = getDatefromCellHTML( httime );
        if (!HT_date) return;

        var mainBody = doc.getElementById( "mainBody" );
        if (!mainBody) return;
        
		var weekdayoffset = FoxtrickPrefs.getString("module." + this.MODULE_NAME + "." + "FirstDayOfWeekOffset_text"); 
		if (!weekdayoffset) weekdayoffset = this.OPTION_TEXTS_DEFAULT_VALUES[1]; 
			
        switch ( page ) {

            case 'transfersTeam' :
                modifyDates ( mainBody, true, 'td', '&nbsp;', '',weekdayoffset );
                break;

            case 'TransfersPlayer' :
                modifyDates ( mainBody, true, 'td', '&nbsp;', '',weekdayoffset );
                break;
/*
            case 'match' :
                this._modifyDates ( mainBody, false, 'div', '&nbsp;' , '',weekdayoffset );
                break;
*/                
            case 'matches' :
                modifyDates ( mainBody, false, 'td', '&nbsp;' , '',weekdayoffset );
                break;

            case 'matchesarchiv' :
                modifyDates ( mainBody, false, 'span', '&nbsp;' , '',weekdayoffset );
                break;
                
            case 'teamPageGeneral' :
                modifyDates ( mainBody, false, 'span', '&nbsp;', '',weekdayoffset );
                modifyDates ( mainBody, false, 'td', '&nbsp;', '',weekdayoffset );
                break;

            case 'TransferCompare' :
                modifyDates ( mainBody, true, 'td', '&nbsp;', '',weekdayoffset );
                break;
                
            case 'achievements' :
                modifyDates ( mainBody, true, 'td', '&nbsp;', '',weekdayoffset );
                break;
                
            case 'teamevents' :
                modifyDates ( mainBody, true, 'td', '&nbsp;', '',weekdayoffset );
                break;
                
            case 'history' :
                modifyDates ( mainBody, true, 'td', '&nbsp;', '',weekdayoffset );
                break;                

            case 'arena' :
                modifyDates ( mainBody, true, 'td', '&nbsp;', '' ,weekdayoffset);
                break;
                
            case 'league' :
                modifyDates ( mainBody, true, 'h3', '&nbsp;', '',weekdayoffset );
                break;
                
                
        }
    },

	change : function( page, doc ) {

	},       
};