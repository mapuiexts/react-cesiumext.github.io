define(["exports","./Transforms-f17097e5","./Matrix2-7a8e9daf","./Matrix3-b2351961","./defaultValue-f6d5e6da","./EllipsoidTangentPlane-c3e9d965","./Math-355606c6","./Plane-5931b53e"],(function(a,t,e,n,r,i,s,o){"use strict";function C(a,t){this.center=n.Cartesian3.clone(r.defaultValue(a,n.Cartesian3.ZERO)),this.halfAxes=n.Matrix3.clone(r.defaultValue(t,n.Matrix3.ZERO))}C.packedLength=n.Cartesian3.packedLength+n.Matrix3.packedLength,C.pack=function(a,t,e){return e=r.defaultValue(e,0),n.Cartesian3.pack(a.center,t,e),n.Matrix3.pack(a.halfAxes,t,e+n.Cartesian3.packedLength),t},C.unpack=function(a,t,e){return t=r.defaultValue(t,0),r.defined(e)||(e=new C),n.Cartesian3.unpack(a,t,e.center),n.Matrix3.unpack(a,t+n.Cartesian3.packedLength,e.halfAxes),e};const c=new n.Cartesian3,u=new n.Cartesian3,l=new n.Cartesian3,d=new n.Cartesian3,h=new n.Cartesian3,x=new n.Cartesian3,m=new n.Matrix3,M={unitary:new n.Matrix3,diagonal:new n.Matrix3};C.fromPoints=function(a,t){if(r.defined(t)||(t=new C),!r.defined(a)||0===a.length)return t.halfAxes=n.Matrix3.ZERO,t.center=n.Cartesian3.ZERO,t;let e;const i=a.length,s=n.Cartesian3.clone(a[0],c);for(e=1;e<i;e++)n.Cartesian3.add(s,a[e],s);const o=1/i;n.Cartesian3.multiplyByScalar(s,o,s);let f,p=0,g=0,y=0,b=0,N=0,T=0;for(e=0;e<i;e++)f=n.Cartesian3.subtract(a[e],s,u),p+=f.x*f.x,g+=f.x*f.y,y+=f.x*f.z,b+=f.y*f.y,N+=f.y*f.z,T+=f.z*f.z;p*=o,g*=o,y*=o,b*=o,N*=o,T*=o;const O=m;O[0]=p,O[1]=g,O[2]=y,O[3]=g,O[4]=b,O[5]=N,O[6]=y,O[7]=N,O[8]=T;const A=n.Matrix3.computeEigenDecomposition(O,M),P=n.Matrix3.clone(A.unitary,t.halfAxes);let I=n.Matrix3.getColumn(P,0,d),R=n.Matrix3.getColumn(P,1,h),E=n.Matrix3.getColumn(P,2,x),S=-Number.MAX_VALUE,U=-Number.MAX_VALUE,L=-Number.MAX_VALUE,z=Number.MAX_VALUE,B=Number.MAX_VALUE,V=Number.MAX_VALUE;for(e=0;e<i;e++)f=a[e],S=Math.max(n.Cartesian3.dot(I,f),S),U=Math.max(n.Cartesian3.dot(R,f),U),L=Math.max(n.Cartesian3.dot(E,f),L),z=Math.min(n.Cartesian3.dot(I,f),z),B=Math.min(n.Cartesian3.dot(R,f),B),V=Math.min(n.Cartesian3.dot(E,f),V);I=n.Cartesian3.multiplyByScalar(I,.5*(z+S),I),R=n.Cartesian3.multiplyByScalar(R,.5*(B+U),R),E=n.Cartesian3.multiplyByScalar(E,.5*(V+L),E);const _=n.Cartesian3.add(I,R,t.center);n.Cartesian3.add(_,E,_);const k=l;return k.x=S-z,k.y=U-B,k.z=L-V,n.Cartesian3.multiplyByScalar(k,.5,k),n.Matrix3.multiplyByScale(t.halfAxes,k,t.halfAxes),t};const f=new n.Cartesian3,p=new n.Cartesian3;function w(a,t,e,i,s,o,c,u,l,d,h){r.defined(h)||(h=new C);const x=h.halfAxes;n.Matrix3.setColumn(x,0,t,x),n.Matrix3.setColumn(x,1,e,x),n.Matrix3.setColumn(x,2,i,x);let m=f;m.x=(s+o)/2,m.y=(c+u)/2,m.z=(l+d)/2;const M=p;M.x=(o-s)/2,M.y=(u-c)/2,M.z=(d-l)/2;const g=h.center;return m=n.Matrix3.multiplyByVector(x,m,m),n.Cartesian3.add(a,m,g),n.Matrix3.multiplyByScale(x,M,x),h}const g=new n.Cartographic,y=new n.Cartesian3,b=new n.Cartographic,N=new n.Cartographic,T=new n.Cartographic,O=new n.Cartographic,A=new n.Cartographic,P=new n.Cartesian3,I=new n.Cartesian3,R=new n.Cartesian3,E=new n.Cartesian3,S=new n.Cartesian3,U=new e.Cartesian2,L=new e.Cartesian2,z=new e.Cartesian2,B=new e.Cartesian2,V=new e.Cartesian2,_=new n.Cartesian3,k=new n.Cartesian3,W=new n.Cartesian3,X=new n.Cartesian3,q=new e.Cartesian2,D=new n.Cartesian3,j=new n.Cartesian3,Z=new n.Cartesian3,v=new o.Plane(n.Cartesian3.UNIT_X,0);C.fromRectangle=function(a,t,c,u,l){let d,h,x,m,M,f,p;if(t=r.defaultValue(t,0),c=r.defaultValue(c,0),u=r.defaultValue(u,n.Ellipsoid.WGS84),a.width<=s.CesiumMath.PI){const r=e.Rectangle.center(a,g),s=u.cartographicToCartesian(r,y),_=new i.EllipsoidTangentPlane(s,u);p=_.plane;const k=r.longitude,W=a.south<0&&a.north>0?0:r.latitude,X=n.Cartographic.fromRadians(k,a.north,c,b),q=n.Cartographic.fromRadians(a.west,a.north,c,N),D=n.Cartographic.fromRadians(a.west,W,c,T),j=n.Cartographic.fromRadians(a.west,a.south,c,O),Z=n.Cartographic.fromRadians(k,a.south,c,A),v=u.cartographicToCartesian(X,P);let Y=u.cartographicToCartesian(q,I);const G=u.cartographicToCartesian(D,R);let F=u.cartographicToCartesian(j,E);const H=u.cartographicToCartesian(Z,S),J=_.projectPointToNearestOnPlane(v,U),K=_.projectPointToNearestOnPlane(Y,L),Q=_.projectPointToNearestOnPlane(G,z),$=_.projectPointToNearestOnPlane(F,B),aa=_.projectPointToNearestOnPlane(H,V);return d=Math.min(K.x,Q.x,$.x),h=-d,m=Math.max(K.y,J.y),x=Math.min($.y,aa.y),q.height=j.height=t,Y=u.cartographicToCartesian(q,I),F=u.cartographicToCartesian(j,E),M=Math.min(o.Plane.getPointDistance(p,Y),o.Plane.getPointDistance(p,F)),f=c,w(_.origin,_.xAxis,_.yAxis,_.zAxis,d,h,x,m,M,f,l)}const Y=a.south>0,G=a.north<0,F=Y?a.south:G?a.north:0,H=e.Rectangle.center(a,g).longitude,J=n.Cartesian3.fromRadians(H,F,c,u,_);J.z=0;const K=Math.abs(J.x)<s.CesiumMath.EPSILON10&&Math.abs(J.y)<s.CesiumMath.EPSILON10?n.Cartesian3.UNIT_X:n.Cartesian3.normalize(J,k),Q=n.Cartesian3.UNIT_Z,$=n.Cartesian3.cross(K,Q,W);p=o.Plane.fromPointNormal(J,K,v);const aa=n.Cartesian3.fromRadians(H+s.CesiumMath.PI_OVER_TWO,F,c,u,X);h=n.Cartesian3.dot(o.Plane.projectPointOntoPlane(p,aa,q),$),d=-h,m=n.Cartesian3.fromRadians(0,a.north,G?t:c,u,D).z,x=n.Cartesian3.fromRadians(0,a.south,Y?t:c,u,j).z;const ta=n.Cartesian3.fromRadians(a.east,F,c,u,Z);return M=o.Plane.getPointDistance(p,ta),f=0,w(J,$,Q,K,d,h,x,m,M,f,l)},C.fromTransformation=function(a,t){return r.defined(t)||(t=new C),t.center=e.Matrix4.getTranslation(a,t.center),t.halfAxes=e.Matrix4.getMatrix3(a,t.halfAxes),t.halfAxes=n.Matrix3.multiplyByScalar(t.halfAxes,.5,t.halfAxes),t},C.clone=function(a,t){if(r.defined(a))return r.defined(t)?(n.Cartesian3.clone(a.center,t.center),n.Matrix3.clone(a.halfAxes,t.halfAxes),t):new C(a.center,a.halfAxes)},C.intersectPlane=function(a,e){const r=a.center,i=e.normal,s=a.halfAxes,o=i.x,c=i.y,u=i.z,l=Math.abs(o*s[n.Matrix3.COLUMN0ROW0]+c*s[n.Matrix3.COLUMN0ROW1]+u*s[n.Matrix3.COLUMN0ROW2])+Math.abs(o*s[n.Matrix3.COLUMN1ROW0]+c*s[n.Matrix3.COLUMN1ROW1]+u*s[n.Matrix3.COLUMN1ROW2])+Math.abs(o*s[n.Matrix3.COLUMN2ROW0]+c*s[n.Matrix3.COLUMN2ROW1]+u*s[n.Matrix3.COLUMN2ROW2]),d=n.Cartesian3.dot(i,r)+e.distance;return d<=-l?t.Intersect.OUTSIDE:d>=l?t.Intersect.INSIDE:t.Intersect.INTERSECTING};const Y=new n.Cartesian3,G=new n.Cartesian3,F=new n.Cartesian3,H=new n.Cartesian3,J=new n.Cartesian3,K=new n.Cartesian3;C.distanceSquaredTo=function(a,t){const e=n.Cartesian3.subtract(t,a.center,f),r=a.halfAxes;let i=n.Matrix3.getColumn(r,0,Y),o=n.Matrix3.getColumn(r,1,G),c=n.Matrix3.getColumn(r,2,F);const u=n.Cartesian3.magnitude(i),l=n.Cartesian3.magnitude(o),d=n.Cartesian3.magnitude(c);let h=!0,x=!0,m=!0;u>0?n.Cartesian3.divideByScalar(i,u,i):h=!1,l>0?n.Cartesian3.divideByScalar(o,l,o):x=!1,d>0?n.Cartesian3.divideByScalar(c,d,c):m=!1;const M=!h+!x+!m;let p,g,y;if(1===M){let a=i;p=o,g=c,x?m||(a=c,g=i):(a=o,p=i),y=n.Cartesian3.cross(p,g,J),a===i?i=y:a===o?o=y:a===c&&(c=y)}else if(2===M){p=i,x?p=o:m&&(p=c);let a=n.Cartesian3.UNIT_Y;a.equalsEpsilon(p,s.CesiumMath.EPSILON3)&&(a=n.Cartesian3.UNIT_X),g=n.Cartesian3.cross(p,a,H),n.Cartesian3.normalize(g,g),y=n.Cartesian3.cross(p,g,J),n.Cartesian3.normalize(y,y),p===i?(o=g,c=y):p===o?(c=g,i=y):p===c&&(i=g,o=y)}else 3===M&&(i=n.Cartesian3.UNIT_X,o=n.Cartesian3.UNIT_Y,c=n.Cartesian3.UNIT_Z);const b=K;b.x=n.Cartesian3.dot(e,i),b.y=n.Cartesian3.dot(e,o),b.z=n.Cartesian3.dot(e,c);let N,T=0;return b.x<-u?(N=b.x+u,T+=N*N):b.x>u&&(N=b.x-u,T+=N*N),b.y<-l?(N=b.y+l,T+=N*N):b.y>l&&(N=b.y-l,T+=N*N),b.z<-d?(N=b.z+d,T+=N*N):b.z>d&&(N=b.z-d,T+=N*N),T};const Q=new n.Cartesian3,$=new n.Cartesian3;C.computePlaneDistances=function(a,e,i,s){r.defined(s)||(s=new t.Interval);let o=Number.POSITIVE_INFINITY,c=Number.NEGATIVE_INFINITY;const u=a.center,l=a.halfAxes,d=n.Matrix3.getColumn(l,0,Y),h=n.Matrix3.getColumn(l,1,G),x=n.Matrix3.getColumn(l,2,F),m=n.Cartesian3.add(d,h,Q);n.Cartesian3.add(m,x,m),n.Cartesian3.add(m,u,m);const M=n.Cartesian3.subtract(m,e,$);let f=n.Cartesian3.dot(i,M);return o=Math.min(f,o),c=Math.max(f,c),n.Cartesian3.add(u,d,m),n.Cartesian3.add(m,h,m),n.Cartesian3.subtract(m,x,m),n.Cartesian3.subtract(m,e,M),f=n.Cartesian3.dot(i,M),o=Math.min(f,o),c=Math.max(f,c),n.Cartesian3.add(u,d,m),n.Cartesian3.subtract(m,h,m),n.Cartesian3.add(m,x,m),n.Cartesian3.subtract(m,e,M),f=n.Cartesian3.dot(i,M),o=Math.min(f,o),c=Math.max(f,c),n.Cartesian3.add(u,d,m),n.Cartesian3.subtract(m,h,m),n.Cartesian3.subtract(m,x,m),n.Cartesian3.subtract(m,e,M),f=n.Cartesian3.dot(i,M),o=Math.min(f,o),c=Math.max(f,c),n.Cartesian3.subtract(u,d,m),n.Cartesian3.add(m,h,m),n.Cartesian3.add(m,x,m),n.Cartesian3.subtract(m,e,M),f=n.Cartesian3.dot(i,M),o=Math.min(f,o),c=Math.max(f,c),n.Cartesian3.subtract(u,d,m),n.Cartesian3.add(m,h,m),n.Cartesian3.subtract(m,x,m),n.Cartesian3.subtract(m,e,M),f=n.Cartesian3.dot(i,M),o=Math.min(f,o),c=Math.max(f,c),n.Cartesian3.subtract(u,d,m),n.Cartesian3.subtract(m,h,m),n.Cartesian3.add(m,x,m),n.Cartesian3.subtract(m,e,M),f=n.Cartesian3.dot(i,M),o=Math.min(f,o),c=Math.max(f,c),n.Cartesian3.subtract(u,d,m),n.Cartesian3.subtract(m,h,m),n.Cartesian3.subtract(m,x,m),n.Cartesian3.subtract(m,e,M),f=n.Cartesian3.dot(i,M),o=Math.min(f,o),c=Math.max(f,c),s.start=o,s.stop=c,s};const aa=new n.Cartesian3,ta=new n.Cartesian3,ea=new n.Cartesian3;C.computeCorners=function(a,t){r.defined(t)||(t=[new n.Cartesian3,new n.Cartesian3,new n.Cartesian3,new n.Cartesian3,new n.Cartesian3,new n.Cartesian3,new n.Cartesian3,new n.Cartesian3]);const e=a.center,i=a.halfAxes,s=n.Matrix3.getColumn(i,0,aa),o=n.Matrix3.getColumn(i,1,ta),c=n.Matrix3.getColumn(i,2,ea);return n.Cartesian3.clone(e,t[0]),n.Cartesian3.subtract(t[0],s,t[0]),n.Cartesian3.subtract(t[0],o,t[0]),n.Cartesian3.subtract(t[0],c,t[0]),n.Cartesian3.clone(e,t[1]),n.Cartesian3.subtract(t[1],s,t[1]),n.Cartesian3.subtract(t[1],o,t[1]),n.Cartesian3.add(t[1],c,t[1]),n.Cartesian3.clone(e,t[2]),n.Cartesian3.subtract(t[2],s,t[2]),n.Cartesian3.add(t[2],o,t[2]),n.Cartesian3.subtract(t[2],c,t[2]),n.Cartesian3.clone(e,t[3]),n.Cartesian3.subtract(t[3],s,t[3]),n.Cartesian3.add(t[3],o,t[3]),n.Cartesian3.add(t[3],c,t[3]),n.Cartesian3.clone(e,t[4]),n.Cartesian3.add(t[4],s,t[4]),n.Cartesian3.subtract(t[4],o,t[4]),n.Cartesian3.subtract(t[4],c,t[4]),n.Cartesian3.clone(e,t[5]),n.Cartesian3.add(t[5],s,t[5]),n.Cartesian3.subtract(t[5],o,t[5]),n.Cartesian3.add(t[5],c,t[5]),n.Cartesian3.clone(e,t[6]),n.Cartesian3.add(t[6],s,t[6]),n.Cartesian3.add(t[6],o,t[6]),n.Cartesian3.subtract(t[6],c,t[6]),n.Cartesian3.clone(e,t[7]),n.Cartesian3.add(t[7],s,t[7]),n.Cartesian3.add(t[7],o,t[7]),n.Cartesian3.add(t[7],c,t[7]),t};const na=new n.Matrix3;C.computeTransformation=function(a,t){r.defined(t)||(t=new e.Matrix4);const i=a.center,s=n.Matrix3.multiplyByUniformScale(a.halfAxes,2,na);return e.Matrix4.fromRotationTranslation(s,i,t)};const ra=new t.BoundingSphere;C.isOccluded=function(a,e){const n=t.BoundingSphere.fromOrientedBoundingBox(a,ra);return!e.isBoundingSphereVisible(n)},C.prototype.intersectPlane=function(a){return C.intersectPlane(this,a)},C.prototype.distanceSquaredTo=function(a){return C.distanceSquaredTo(this,a)},C.prototype.computePlaneDistances=function(a,t,e){return C.computePlaneDistances(this,a,t,e)},C.prototype.computeCorners=function(a){return C.computeCorners(this,a)},C.prototype.computeTransformation=function(a){return C.computeTransformation(this,a)},C.prototype.isOccluded=function(a){return C.isOccluded(this,a)},C.equals=function(a,t){return a===t||r.defined(a)&&r.defined(t)&&n.Cartesian3.equals(a.center,t.center)&&n.Matrix3.equals(a.halfAxes,t.halfAxes)},C.prototype.clone=function(a){return C.clone(this,a)},C.prototype.equals=function(a){return C.equals(this,a)},a.OrientedBoundingBox=C}));