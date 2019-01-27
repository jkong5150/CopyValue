irise.namespace("irise");

irise.CopyValue= function() {};

irise.CopyValue.prototype.execute = function() {
	try{
		// retrieve the so urce widget value
		var val;
		var sWidget;
		if (this.getProperty('source')!=undefined) {
			sWidget = this.getProperty('source');
			var sourceNodeName = sWidget.getHtmlElement().nodeName;
			val = this.runSourceSwitch(sourceNodeName,sWidget);
		} else
			alert("Please add a source widget");
		
		var target = this.getProperty('destination');
		
		if(target != undefined && target != '') {
		    if($.isArray(target)) {
				var nodeName;
				var resultID;
				for (var i = 0; i < target.length; i++) {
					resultID = target[i].getId();
					nodeName =target[i].getHtmlElement().nodeName;
					switch(nodeName) {
						case 'INPUT':
						case 'SELECT':
							target[i].getWidgetDiv().attr("value",val);
							break;
						default:
							$("#"+resultID).html(val);			
					}
				}	
			} else { //if there is only one target - (doesn't interpret as array)
				nodeName = target.getHtmlElement().nodeName;
				resultID = target.getId();
				switch(nodeName) {
					case 'INPUT':
					case 'SELECT':
						//target.getWidgetDiv().attr("value",val);
						target.getWidgetDiv().val(val);
						break;
					default:
						$("#"+resultID).html(val);
				}				
		    }
		}

	}catch(err){
		alert("	Error"+	err.message);
	}
}
irise.CopyValue.prototype.runSourceSwitch = function(nodeName,sWidget) {
	var val;
	switch(nodeName) {
		case 'DIV': //for text widgets
			val = $("#"+sWidget.getId()).text();
			break;
		default: //input, text area, select
			val = sWidget.getWidgetDiv().attr("value");
			break;
	}	
	return val;
}