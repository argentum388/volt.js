

/* 

	*** LIGHTWEIGHT VOLT.JS LIB (IE8+) ***

		Signature List:
		
		V(collection).on(handler, type)
		V.uni(e)
		
		V(collection).hasClass(className) 
		V(collection).addClass(className) 
		V(collection).remClass(className) 
		
		V(collection).hasAttr(attrName)
		V(collection).getAttr(attrName)
		V(collection).setAttr(attrName,attrVal)

		V(collection).hide()
		V(collection).show()
		
	
*/

;"use strict";


(function( win,doc ) {
	
	var Volt = function( collection, elem ) {
		
		var elem = elem || doc,
				domlist,
				i;
		
		if ( !(this instanceof Volt) ) {
			
			return new Volt(collection, elem);
			
		}
		
		if ( typeof collection === 'string' ) {	

			domlist = [].slice.call(elem.querySelectorAll(collection));
			i = this.length = domlist.length;
			
			while(i) {
				
				i -= 1;
				this[i] = domlist[i];
				
			}
			
			return this;
			
		} else if ( typeof collection === 'object' ) {
			
			if ( 'length' in collection ) { // if HTMLCollection/NodeList array-like object
				
				i = this.length = collection.length;
				
				while(i) {
					
					i -= 1;
					if( collection[i].nodeType !== 1 ) {
						
						throw new Error('Incorrect HTMLCollection object!');
						
					}
					
					this[i] = collection[i];
					
				}
				
				return this;
				
			} else { // if single DOM object
			
				if( collection.nodeType === 1 ) {
					
					this[0] = collname;
					this.length = 1;
					return this;
					
				} else {
					
					throw new Error('Not DOM object!');
				
				}

			}
			
		} else {
		
			throw new Error('Inappropriate parameter!');	
			
		}

	};
	


	var __volt__ = Volt.prototype;
	
	
	
	/***    ITEM    ***/
	
	__volt__.item = function( num ) {
		
		// проверка типа
		this[0] = this[num];
		this.length = 1;
		return this;
		
	};
	

	
	/***    EVENTS    ***/ 
	
	if ( typeof doc.addEventListener === 'function' ) {
		
		__volt__.on = function( handler, type ) {
			
			type = type || 'click';	
			var i = this.length;
			
			while(i) {
				
				i -= 1;
				this[i].addEventListener(type, function(e){handler(e)}, false);
				
			}
			
		};
		
	} else if ( typeof doc.attachEvent === 'function' ) {
		
		__volt__.on = function(handler, type) {
			
			type = type || 'click';
			var i = this.length;
			
			while(i) {
				
				i -= 1;
				this[i].attachEvent('on' + type, handler);
				
			}
			
		};
		
	} else {
	
		__volt__.on = function(handler, type) {
			
			type = type || 'click';
			var i = this.length;
			
			while(i) {
				
				i -= 1;
				this[i]['on' + type] = handler;
				
			}
			
		};
	}		
	
	
	/***   TRIM    ***/ 
	
	__volt__.trim = String.prototype.trim || function(str) {
			
		return str.replace(/^\s+|\s+$/gm,'');
		
	};
	
	
	
	/***    CLASS ACTIONS    ***/ 
	
	if ("classList" in document.createElement("fake")) {	
		
		
		// проверка только одного dom-элемента
		__volt__.hasClass = function(className) {
			
			return this[0].classList.contains(className);
			
		};	
		
		// работа над коллекцией
		__volt__.addClass = function( className ) {
			
			var i = this.length;
			
			while(i) {
				
				i -= 1;
				this[i].classList.add(className);
					
			}
			
			return this.classList;
			
		};
		
		
		__volt__.prototype.remClass = function(className) {
			
			var i = this.length;
			
			while(i) {
				
				i -= 1;
				this[i].classList.remove(className);
					
			}
			
			return this.classList;
			
		};
		
		
	} else {
		
		// проверка только одного dom-элемента
		__volt__.hasClass = function( className ) {
			
			return ~(this[0].getAttribute('class').indexOf(className));
			
		};
		
		// работа с коллекцией
		__volt__.addClass = function( className ) {
			
			var i = this.length;
			
			while(i) {
				
				i -= 1;
				this[i].setAttribute('class', this[i].getAttribute('class') + ' ' + className );
					
			}
			
			return;
			
		};


		// работа с коллекцией
		__volt__.remClass = function( className ) {
			
			var i = this.length;
			
			while(i) {
				
				i -= 1;
				this[i].setAttribute('class', this[i].getAttribute('class').replace(' ' + className, '') );
					
			}
			
			return;
			
		};

	}
	


	/***   ATTRIBUTE ACTIONS     ***/ 	
	
	__volt__.hasAttr = function(attrName) {
		
		return !!this[0].getAttribute(attrName);
		
	};	
	
	__volt__.getAttr = function(attrName) {
		
		return this[0].getAttribute(attrName);
		
	};
	
	__volt__.setAttr = function(attrName, attrVal) {
		
		return this[0].setAttribute(attrName, attrVal);
		
	};
	
	
	
	/***   STYLE ACTIONS     ***/ 
	
	__volt__.hide = function() {
		
		var i = this.length;
		while(i) {
			
			i -= 1;
			this[i].style.display = 'none';
			
		}

		
	};
	
	__volt__.show = function() {
		
		var i = this.length;
		while(i) {
			
			i -= 1;
			this[i].style.display = 'block';
			
		}
	
	};
	
	Volt.uni = function(e) { // статический метод
		
		e = e || window.event;
		
		if(!e.target) {
			
			e.target = e.srcElement;
			
		}
		
		e.pred = e.target.parentNode;
		e.predec= e.pred.parentNode;
		e.predecessor = e.predec.parentNode;
		
		return e;
		
	};	
	
	
	/***   EXPORT    ***/ 
	
	win.V = win.v = win.Volt = win.volt = Volt;
	
	
	
})(this,document);


( function( win, doc, Volt ) {
	
	if ( Volt ) {
		
		return;

	} else {
		
		throw new Error('Can\'t load Volt Library'); 
		alert('Извините, что-то пошло не так :)))');
		
	}

})( this, document, this.V );










