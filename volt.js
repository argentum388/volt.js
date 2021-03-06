

/* 

	*** LIGHTWEIGHT VOLT.JS LIB (IE8+) ***

*/


;(function( global,doc ) {
	
	"use strict";
	
	var Volt = function( collection, elem ) {
		
		elem = elem || doc;
		var domlist,
			i;
		
		if ( !(this instanceof Volt) ) {
			
			return new Volt(collection, elem);
			
		}
		
		if ( typeof collection === 'string' ) {	

			domlist = elem.querySelectorAll(collection);
			
			i = this.length = domlist.length;
			
			while(i) {
				
				i -= 1;
				this[i] = domlist[i];
				
			}
			
			return this;
			
		} else if ( typeof collection === 'object' ) {
			
			if ( 'length' in collection ) { 
				
				// if HTMLCollection/NodeList array-like object
				
				i = this.length = collection.length;
				
				while(i) {
					
					i -= 1;
					if( collection[i].nodeType !== 1 ) {
						
						throw new Error('HTMLCollection object expected!');
						
					}
					
					this[i] = collection[i];
					
				}
				
				return this;
				
			} else { 
			
				// if single DOM object
			
				if( collection.nodeType === 1 ) {
					
					this[0] = collection;
					
					this.length = 1;
					
					return this;
					
				} else {
					
					throw new Error('DOM object expected!');
				
				}

			}
			
		} else {
		
			throw new Error('Search returned empty value or inappropriate parameter in arguments!');	
			
		}

	};
	


	var __volt__ = Volt.prototype;
	
	
	
	/***    ITEM    ***/
	
	__volt__.item = function( num ) {
		
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

	
	
	/***    CLASS ACTIONS    ***/ 
	
	if ("classList" in document.createElement("fake")) {	
		
		
		// single V-element
		__volt__.hasClass = function(className) {
			
			return this[0].classList.contains(className);
			
		};	
		
		// V-collection
		__volt__.addClass = function( className ) {
			
			var i = this.length;
			
			while(i) {
				
				i -= 1;
				this[i].classList.add(className);
					
			}
			
			return this.classList;
			
		};
		
		
		__volt__.remClass = function(className) {
			
			var i = this.length;
			
			while(i) {
				
				i -= 1;
				this[i].classList.remove(className);
					
			}
			
			return this.classList;
			
		};
		
		
	} else {
		
		//  single DOM element
		
		__volt__.hasClass = function( className ) {
			
			return ~(this[0].getAttribute('class').indexOf(className));
			
		};
		
		// V-collection
		
		__volt__.addClass = function( className ) {
			
			var i = this.length;
			
			while(i) {
				
				i -= 1;
				this[i].setAttribute('class', this[i].getAttribute('class') + ' ' + className );
					
			}
			
			return;
			
		};


		// V-collection
		
		__volt__.remClass = function( className ) {
			
			var i = this.length;
			
			while(i) {
				
				i -= 1;
				this[i].setAttribute('class', this[i].getAttribute('class').replace(className, '') );
					
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
		
		var i = this.length;
		while(i) {
			
			i -= 1;
			this[i].setAttribute(attrName, attrVal);
				
		}
		return this;
		
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
	
	
	
	__volt__.style = function(styleName, styleVal) {
		
		var i = this.length;
		while(i) {
			
			i -= 1;
			this[i].style[styleName] = styleVal;
			
		}
	
	};
	
	
	__volt__.html = function(html) {
		
		var i = this.length;
		while(i) {
			
			i -= 1;
			this[i].innerHTML = html;
			
		}
	
	};
	
	
	__volt__.val = function(val) {
		
		if(val) {
			
			var i = this.length;
			while(i) {
				
				i -= 1;
				this[i].value = val;
				
			}
			
		} else {
			
			return this[0].value;
			
		}

	};
	
	__volt__.append = function(elem) {
		
		var i = this.length;
		while(i) {
			
			i -= 1;
			this[i].appendChild(elem);
			
		}
	
	};
	
	
	/*** STATIC METHODS ***/
	
	
	Volt.create = function(tag) {
		
		return document.createElement(tag);
	
	};
	
	
	Volt.uni = function(e) {
		
		e = e || global.event;
		
		if(!e.target) {
			
			e.target = e.srcElement;
			
		}
		
		e.pred = e.target.parentNode;
		e.predec= e.pred.parentNode;
		e.predecessor = e.predec.parentNode;
		
		return e;
		
	};	
	
	Volt.trim = String.prototype.trim || function(str) {
			
		return str.replace(/^\s+|\s+$/gm,'');
		
	};

	
	/***   EXPORT    ***/ 
	
	global.V = global.v = global.Volt = global.volt = Volt;
	
	
	
})(this,document);











