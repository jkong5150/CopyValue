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
		
		//  set the value of the destination widget
		//optional
		if (this.getProperty('destination')!=undefined  && this.getProperty('destination')!='') {
			this.getProperty('destination').getWidgetDiv().attr("value",val);
		}
		//to write HTML.
		if (this.getProperty('result') && this.getProperty('result')!='') {
			var resultID = this.getProperty('result').getId();
			$("#"+resultID).html(val);
		}
	}catch(err){
		alert("	Error"+	err.message);
	}

}
