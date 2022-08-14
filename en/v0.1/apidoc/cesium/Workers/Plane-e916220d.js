/*! For license information please see Plane-e916220d.js.LICENSE.txt */
define(["exports","./Matrix2-73789715","./RuntimeError-4f8ec8a2","./defaultValue-97284df2","./ComponentDatatype-e7fbe225"],(function(n,e,t,a,r){"use strict";function i(n,t){this.normal=e.Cartesian3.clone(n),this.distance=t}i.fromPointNormal=function(n,t,r){const s=-e.Cartesian3.dot(t,n);return a.defined(r)?(e.Cartesian3.clone(t,r.normal),r.distance=s,r):new i(t,s)};const s=new e.Cartesian3;i.fromCartesian4=function(n,t){const r=e.Cartesian3.fromCartesian4(n,s),o=n.w;return a.defined(t)?(e.Cartesian3.clone(r,t.normal),t.distance=o,t):new i(r,o)},i.getPointDistance=function(n,t){return e.Cartesian3.dot(n.normal,t)+n.distance};const o=new e.Cartesian3;i.projectPointOntoPlane=function(n,t,r){a.defined(r)||(r=new e.Cartesian3);const s=i.getPointDistance(n,t),c=e.Cartesian3.multiplyByScalar(n.normal,s,o);return e.Cartesian3.subtract(t,c,r)};const c=new e.Matrix4,l=new e.Cartesian4,f=new e.Cartesian3;i.transform=function(n,t,a){const r=n.normal,s=n.distance,o=e.Matrix4.inverseTranspose(t,c);let C=e.Cartesian4.fromElements(r.x,r.y,r.z,s,l);C=e.Matrix4.multiplyByVector(o,C,C);const d=e.Cartesian3.fromCartesian4(C,f);return C=e.Cartesian4.divideByScalar(C,e.Cartesian3.magnitude(d),C),i.fromCartesian4(C,a)},i.clone=function(n,t){return a.defined(t)?(e.Cartesian3.clone(n.normal,t.normal),t.distance=n.distance,t):new i(n.normal,n.distance)},i.equals=function(n,t){return n.distance===t.distance&&e.Cartesian3.equals(n.normal,t.normal)},i.ORIGIN_XY_PLANE=Object.freeze(new i(e.Cartesian3.UNIT_Z,0)),i.ORIGIN_YZ_PLANE=Object.freeze(new i(e.Cartesian3.UNIT_X,0)),i.ORIGIN_ZX_PLANE=Object.freeze(new i(e.Cartesian3.UNIT_Y,0)),n.Plane=i}));