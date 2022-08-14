/*! For license information please see RuntimeError-4f8ec8a2.js.LICENSE.txt */
define(["exports","./defaultValue-97284df2"],(function(t,e){"use strict";function n(t){let e;this.name="DeveloperError",this.message=t;try{throw new Error}catch(t){e=t.stack}this.stack=e}e.defined(Object.create)&&(n.prototype=Object.create(Error.prototype),n.prototype.constructor=n),n.prototype.toString=function(){let t=`${this.name}: ${this.message}`;return e.defined(this.stack)&&(t+=`\n${this.stack.toString()}`),t},n.throwInstantiationError=function(){throw new n("This function defines an interface and should not be called directly.")};const o={};function r(t,e,o){return`Expected ${o} to be typeof ${e}, actual typeof was ${t}`}function i(t){let e;this.name="RuntimeError",this.message=t;try{throw new Error}catch(t){e=t.stack}this.stack=e}o.typeOf={},o.defined=function(t,o){if(!e.defined(o))throw new n(function(t){return`${t} is required, actual value was undefined`}(t))},o.typeOf.func=function(t,e){if("function"!=typeof e)throw new n(r(typeof e,"function",t))},o.typeOf.string=function(t,e){if("string"!=typeof e)throw new n(r(typeof e,"string",t))},o.typeOf.number=function(t,e){if("number"!=typeof e)throw new n(r(typeof e,"number",t))},o.typeOf.number.lessThan=function(t,e,f){if(o.typeOf.number(t,e),e>=f)throw new n(`Expected ${t} to be less than ${f}, actual value was ${e}`)},o.typeOf.number.lessThanOrEquals=function(t,e,f){if(o.typeOf.number(t,e),e>f)throw new n(`Expected ${t} to be less than or equal to ${f}, actual value was ${e}`)},o.typeOf.number.greaterThan=function(t,e,f){if(o.typeOf.number(t,e),e<=f)throw new n(`Expected ${t} to be greater than ${f}, actual value was ${e}`)},o.typeOf.number.greaterThanOrEquals=function(t,e,f){if(o.typeOf.number(t,e),e<f)throw new n(`Expected ${t} to be greater than or equal to ${f}, actual value was ${e}`)},o.typeOf.object=function(t,e){if("object"!=typeof e)throw new n(r(typeof e,"object",t))},o.typeOf.bool=function(t,e){if("boolean"!=typeof e)throw new n(r(typeof e,"boolean",t))},o.typeOf.bigint=function(t,e){if("bigint"!=typeof e)throw new n(r(typeof e,"bigint",t))},o.typeOf.number.equals=function(t,e,f,a){if(o.typeOf.number(t,f),o.typeOf.number(e,a),f!==a)throw new n(`${t} must be equal to ${e}, the actual values are ${f} and ${a}`)},e.defined(Object.create)&&(i.prototype=Object.create(Error.prototype),i.prototype.constructor=i),i.prototype.toString=function(){let t=`${this.name}: ${this.message}`;return e.defined(this.stack)&&(t+=`\n${this.stack.toString()}`),t},t.Check=o,t.DeveloperError=n,t.RuntimeError=i}));