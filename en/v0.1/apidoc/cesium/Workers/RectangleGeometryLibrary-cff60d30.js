/*! For license information please see RectangleGeometryLibrary-cff60d30.js.LICENSE.txt */
define(["exports","./Matrix2-73789715","./defaultValue-97284df2","./RuntimeError-4f8ec8a2","./Transforms-d3d3b2a9","./ComponentDatatype-e7fbe225"],(function(t,n,a,e,o,r){"use strict";const s=Math.cos,i=Math.sin,c=Math.sqrt,g={computePosition:function(t,n,e,o,r,g,u){const h=n.radiiSquared,l=t.nwCorner,C=t.boundingRectangle;let d=l.latitude-t.granYCos*o+r*t.granXSin;const w=s(d),M=i(d),m=h.z*M;let X=l.longitude+o*t.granYSin+r*t.granXCos;const Y=w*s(X),f=w*i(X),p=h.x*Y,x=h.y*f,R=c(p*Y+x*f+m*M);if(g.x=p/R,g.y=x/R,g.z=m/R,e){const n=t.stNwCorner;a.defined(n)?(d=n.latitude-t.stGranYCos*o+r*t.stGranXSin,X=n.longitude+o*t.stGranYSin+r*t.stGranXCos,u.x=(X-t.stWest)*t.lonScalar,u.y=(d-t.stSouth)*t.latScalar):(u.x=(X-C.west)*t.lonScalar,u.y=(d-C.south)*t.latScalar)}}},u=new n.Matrix2;let h=new n.Cartesian3;const l=new n.Cartographic;let C=new n.Cartesian3;const d=new o.GeographicProjection;function S(t,a,e,o,r,s,i){const c=Math.cos(a),g=o*c,l=e*c,w=Math.sin(a),M=o*w,m=e*w;h=d.project(t,h),h=n.Cartesian3.subtract(h,C,h);const X=n.Matrix2.fromRotation(a,u);h=n.Matrix2.multiplyByVector(X,h,h),h=n.Cartesian3.add(h,C,h),s-=1,i-=1;const Y=(t=d.unproject(h,t)).latitude,f=Y+s*m,p=Y-g*i,x=Y-g*i+s*m,R=Math.max(Y,f,p,x),G=Math.min(Y,f,p,x),y=t.longitude,O=y+s*l,b=y+i*M,P=y+i*M+s*l;return{north:R,south:G,east:Math.max(y,O,b,P),west:Math.min(y,O,b,P),granYCos:g,granYSin:M,granXCos:l,granXSin:m,nwCorner:t}}g.computeOptions=function(t,a,e,o,s,i,c){let g,u=t.east,h=t.west,w=t.north,M=t.south,m=!1,X=!1;w===r.CesiumMath.PI_OVER_TWO&&(m=!0),M===-r.CesiumMath.PI_OVER_TWO&&(X=!0);const Y=w-M;g=h>u?r.CesiumMath.TWO_PI-h+u:u-h;const f=Math.ceil(g/a)+1,p=Math.ceil(Y/a)+1,x=g/(f-1),R=Y/(p-1),G=n.Rectangle.northwest(t,i),y=n.Rectangle.center(t,l);0===e&&0===o||(y.longitude<G.longitude&&(y.longitude+=r.CesiumMath.TWO_PI),C=d.project(y,C));const O=R,b=x,P=n.Rectangle.clone(t,s),W={granYCos:O,granYSin:0,granXCos:b,granXSin:0,nwCorner:G,boundingRectangle:P,width:f,height:p,northCap:m,southCap:X};if(0!==e){const t=S(G,e,x,R,0,f,p);w=t.north,M=t.south,u=t.east,h=t.west,W.granYCos=t.granYCos,W.granYSin=t.granYSin,W.granXCos=t.granXCos,W.granXSin=t.granXSin,P.north=w,P.south=M,P.east=u,P.west=h}if(0!==o){e-=o;const t=n.Rectangle.northwest(P,c),a=S(t,e,x,R,0,f,p);W.stGranYCos=a.granYCos,W.stGranXCos=a.granXCos,W.stGranYSin=a.granYSin,W.stGranXSin=a.granXSin,W.stNwCorner=t,W.stWest=a.west,W.stSouth=a.south}return W},t.RectangleGeometryLibrary=g}));