
/*** VOLT.JS EXAMPLE SCRIPT ***/

({
	addItem : function(e) {
	
		if ( V('.list-item').length<9 ) {
			
			var title = V('.band-title').val(),
				genre = V('.band-genre').val(),
				neu = V.create('li');
			V(neu).addClass('list-item');
			V(neu).html(title + '<span class="list-item-genre">, '+ genre +'</span>');
			V('.list-content').append(neu);
		}
		
	
	},
	
	clear : function(e) {
	
		V('.list-content').html('');
		
	},

	init : function(win, doc) {
	
		V('.btn-add').on(this.addItem);
		V('.btn-clear').on(this.clear);
	
	}

}).init(this, document);