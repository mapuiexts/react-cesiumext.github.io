/*! For license information please see AxisAlignedBoundingBox-b1c095aa.js.LICENSE.txt */
define(["exports","./Matrix2-73789715","./RuntimeError-4f8ec8a2","./defaultValue-97284df2","./Transforms-d3d3b2a9"],(function(e,n,t,i,a){"use strict";function m(e,t,a){this.minimum=n.Cartesian3.clone(i.defaultValue(e,n.Cartesian3.ZERO)),this.maximum=n.Cartesian3.clone(i.defaultValue(t,n.Cartesian3.ZERO)),a=i.defined(a)?n.Cartesian3.clone(a):n.Cartesian3.midpoint(this.minimum,this.maximum,new n.Cartesian3),this.center=a}m.fromCorners=function(e,t,a){return i.defined(a)||(a=new m),a.minimum=n.Cartesian3.clone(e,a.minimum),a.maximum=n.Cartesian3.clone(t,a.maximum),a.center=n.Cartesian3.midpoint(e,t,a.center),a},m.fromPoints=function(e,t){if(i.defined(t)||(t=new m),!i.defined(e)||0===e.length)return t.minimum=n.Cartesian3.clone(n.Cartesian3.ZERO,t.minimum),t.maximum=n.Cartesian3.clone(n.Cartesian3.ZERO,t.maximum),t.center=n.Cartesian3.clone(n.Cartesian3.ZERO,t.center),t;let a=e[0].x,r=e[0].y,s=e[0].z,u=e[0].x,c=e[0].y,o=e[0].z;const l=e.length;for(let n=1;n<l;n++){const t=e[n],i=t.x,l=t.y,d=t.z;a=Math.min(i,a),u=Math.max(i,u),r=Math.min(l,r),c=Math.max(l,c),s=Math.min(d,s),o=Math.max(d,o)}const d=t.minimum;d.x=a,d.y=r,d.z=s;const f=t.maximum;return f.x=u,f.y=c,f.z=o,t.center=n.Cartesian3.midpoint(d,f,t.center),t},m.clone=function(e,t){if(i.defined(e))return i.defined(t)?(t.minimum=n.Cartesian3.clone(e.minimum,t.minimum),t.maximum=n.Cartesian3.clone(e.maximum,t.maximum),t.center=n.Cartesian3.clone(e.center,t.center),t):new m(e.minimum,e.maximum,e.center)},m.equals=function(e,t){return e===t||i.defined(e)&&i.defined(t)&&n.Cartesian3.equals(e.center,t.center)&&n.Cartesian3.equals(e.minimum,t.minimum)&&n.Cartesian3.equals(e.maximum,t.maximum)};let r=new n.Cartesian3;m.intersectPlane=function(e,t){r=n.Cartesian3.subtract(e.maximum,e.minimum,r);const i=n.Cartesian3.multiplyByScalar(r,.5,r),s=t.normal,u=i.x*Math.abs(s.x)+i.y*Math.abs(s.y)+i.z*Math.abs(s.z),c=n.Cartesian3.dot(e.center,s)+t.distance;return c-u>0?a.Intersect.INSIDE:c+u<0?a.Intersect.OUTSIDE:a.Intersect.INTERSECTING},m.prototype.clone=function(e){return m.clone(this,e)},m.prototype.intersectPlane=function(e){return m.intersectPlane(this,e)},m.prototype.equals=function(e){return m.equals(this,e)},e.AxisAlignedBoundingBox=m}));