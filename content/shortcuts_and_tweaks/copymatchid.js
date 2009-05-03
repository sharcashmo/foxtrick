/**
* copymatchid.js
* Foxtrick Copies post id to clipboard
* @author convinced
*/

var FoxtrickCopyMatchID = {

	MODULE_NAME : "CopyMatchID",
	MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	DEFAULT_ENABLED : false,

	init : function() {
		Foxtrick.registerPageHandler( 'matches',
			FoxtrickCopyMatchID );
		Foxtrick.registerPageHandler( 'matchesarchiv',
			FoxtrickCopyMatchID );
		Foxtrick.registerPageHandler( 'matcheshistory',
			FoxtrickCopyMatchID );
		Foxtrick.registerPageHandler( 'matchesLatest',
			FoxtrickCopyMatchID );
		Foxtrick.registerPageHandler( 'arena',
			FoxtrickCopyMatchID );
			
		Foxtrick.registerPageHandler( 'matchLineup',
			FoxtrickCopyMatchID );
		Foxtrick.registerPageHandler( 'match',
			FoxtrickCopyMatchID );
	},
	
	run : function( page, doc ) { 
	try { 
		var count = 0;

		if (page=='matchesarchiv' || page =='matches' || page =='matcheshistory' || page =='matchesLatest'||page=='arena') {
			var cells = doc.getElementById('mainBody').getElementsByTagName('td');
			for (var i = 0; i < cells.length; i++) { 
				// nested table check
				var td = cells[i].getElementsByTagName('td').length; 
				if (td!=0) continue;
				
				var images = cells[i].getElementsByTagName('img');
				for (var j = 0; j < images.length; j++) {
					if (images[j].className.search(/matchLeague|matchFriendly|matchMasters|matchCup|matchQualification/)==-1) continue;
					
					var matchid = FoxtrickHelper.findMatchId(cells[i+1]); 
					var link = doc.createElement('a');
					images[j].setAttribute('title',images[j].title+ ' : '+Foxtrickl10n.getString( 'foxtrick.copymatchid')); 
					var link=doc.createElement('a');
					link.appendChild(images[j].cloneNode(true));
					link.href='javascript:void(0);';
					link.setAttribute("matchid",matchid);
					link.setAttribute("id","_"+this.MODULE_NAME+count);
					link.addEventListener( "click", FoxtrickCopyMatchID._copy_matchid_to_clipboard, false );	
					var div=images[j].parentNode;
					div.replaceChild(link,images[j]);
				
					count++; 
				}
			}
		}	
		else if (page=='matchLineup'||page=='match') 
			{
			var images = doc.getElementById('mainBody').getElementsByTagName('img');
			for (var i = 0; i < images.length; i++) {
				if (images[i].className.search(/matchLeague|matchFriendly|matchMasters|matchCup|matchQualification/)==-1) continue;

				var matchid=FoxtrickHelper.findMatchId(doc.getElementById('mainWrapper')); 
				images[i].setAttribute('title',images[i].title+ ' : '+Foxtrickl10n.getString( 'foxtrick.copymatchid')); 
				var link=doc.createElement('a');
				link.appendChild(images[i].cloneNode(true));
				link.href='javascript:void(0);';
				link.setAttribute("matchid",matchid);
				link.setAttribute("id","_"+this.MODULE_NAME+count);
				link.addEventListener( "click", FoxtrickCopyMatchID._copy_matchid_to_clipboard, false );	
				var div=images[i].parentNode;
				div.replaceChild(link,images[i]);
				
				count++; 
				break;
				
			}
		}
	} catch(e) {dump('FoxtrickCopyMatchID: '+e+'\n');}
	},
	
	change : function( page, doc ) {
		var spanId = "_"+this.MODULE_NAME+"0";  
		if( !doc.getElementById ( spanId ) ) {
			this.run( page, doc );
		}
	},	

	_copy_matchid_to_clipboard : function(ev) { 
		var matchid = ev.target.parentNode.getAttribute("matchid");
		Foxtrick.copyStringToClipboard(matchid);
		if (FoxtrickPrefs.getBool( "copyfeedback" )) 
			Foxtrick.alert(Foxtrickl10n.getString("foxtrick.tweaks.matchidcopied"));
	},	
};