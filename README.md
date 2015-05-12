# volt.js

Volt.js is lightweight library that provide basic functionality for simple web pages and applications 
and JQuery-like syntax as well.

V(collection) method create array-like object (numeric dom links collection and length property) 
that inherit from prototype all corresponding methods (except static create(), unit(), trim()).

Signature List:
	
	V(collection).on(handler, type) // type='click' by default
	V(collection).hasClass(className) 
	V(collection).addClass(className) 
	V(collection).remClass(className) 
	V(collection).hasAttr(attrName)
	V(collection).getAttr(attrName)
	V(collection).setAttr(attrName,attrVal)
	V(collection).hide()
	V(collection).show()
	V(collection).style(styleName, styleVal)
	V(collection).html()
	V(collection).val()
	V(collection).append(elem)
	V.create(tag)
	V.uni(event)
	V.trim(string)
	
Browser support: IE8+