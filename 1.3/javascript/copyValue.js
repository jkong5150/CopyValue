irise.namespace("irise");

irise.CopyValue= function() {};

irise.CopyValue.prototype.execute = function() {
	try {
		// retrieve the source widget value
		var val;
		var sWidget;
		if (this.getProperty('source')!=undefined) {
			sWidget = this.getProperty('source');
			val = this.getSourceValue(sWidget);
		} else
			alert("Please add a source widget");
		
		var target = this.getProperty('destination');
		//need to simplify this if block
		if(target != undefined && target != '') {
		    if($.isArray(target)) {
				for (var i = 0; i < target.length; i++) {
					this.setDestinations(target[i],val);
				} 
			} else  //if there is only one target - (doesn't interpret as array)
				this.setDestinations(target,val);
		}		
	}catch(err){
		alert("	Error"+	err.message);
	}
}
irise.CopyValue.prototype.getSourceValue = function(sWidget) {
	//return the value in the source widget
	var val;
	switch(sWidget.getHtmlElement().nodeName) {
		case 'DIV': //for text widgets
			val = $("#"+sWidget.getId()).text();
			break;
		default: //input, text area, select
			//val = sWidget.getWidgetDiv().attr("value");
			switch(sWidget.getHtmlElement().type) 
			{
				case 'radio':// for radio buttons
					val = $("input[name="+ sWidget.getHtmlElement().name + "]:checked").val();					
					break;
				default: //for other input types and text area
					val = sWidget.getWidgetDiv().val();
					break;
			}
			break;
	}	
	return val;
}

irise.CopyValue.prototype.setDestinations = function(target,val) {
	//set the destination or target widget(s)
	switch(target.getHtmlElement().nodeName) { //will be INPUT, SELECT or DIV (Default)
		case 'INPUT': 
			if (target.getHtmlElement().type=='radio') { //specifically handle radio buttons - what a pain!
				var radioSet = $('input[name='+target.getHtmlElement().name + ']');
				for (var i =0; i < radioSet.length;i++){
					if (radioSet[i].value==val) 
						radioSet[i].checked=true;
				}
			break;
			} else{}
				//do nothing and fall through to next case
		case 'SELECT':
			//target.getWidgetDiv().attr("value",val);
			target.getWidgetDiv().val(val);
			break;
		default:
			$("#"+target.getId()).html(val);
	}	
}