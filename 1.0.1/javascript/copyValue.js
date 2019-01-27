irise.namespace("irise");

irise.CopyValue= function() {};

irise.CopyValue.prototype.execute = function() {
	try{
		// retrieve the source widget value
		var val;
		if (this.getProperty('source')!=undefined) {
			var sWidget = this.getProperty('source');
			val = sWidget.getWidgetDiv().attr("value");
		} else
			alert("Please add a source widget");
		//v1.0.1 enhancement begin
		if (this.getProperty('destination') && this.getProperty('destination')!='') {
			var resultID = this.getProperty('destination').getId();
			if (this.getProperty('destination').getHtmlElement().nodeName=="INPUT")
				this.getProperty('destination').getWidgetDiv().attr("value",val);
			else
				$("#"+resultID).html(val);*/
		}
		//v1.0.1 enhancement end 
	}catch(err){
		alert("	Error"+	err.message);
	}

}
