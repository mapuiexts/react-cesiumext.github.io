/*! For license information please see TerrainEncoding-080f16eb.js.LICENSE.txt */
define(["exports","./Transforms-d3d3b2a9","./Matrix2-73789715","./RuntimeError-4f8ec8a2","./defaultValue-97284df2","./AttributeCompression-5744d52e","./ComponentDatatype-e7fbe225"],(function(t,e,i,o,a,r,n){"use strict";function s(t,e){this._ellipsoid=t,this._cameraPosition=new i.Cartesian3,this._cameraPositionInScaledSpace=new i.Cartesian3,this._distanceToLimbInScaledSpaceSquared=0,a.defined(e)&&(this.cameraPosition=e)}Object.defineProperties(s.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},cameraPosition:{get:function(){return this._cameraPosition},set:function(t){const e=this._ellipsoid.transformPositionToScaledSpace(t,this._cameraPositionInScaledSpace),o=i.Cartesian3.magnitudeSquared(e)-1;i.Cartesian3.clone(t,this._cameraPosition),this._cameraPositionInScaledSpace=e,this._distanceToLimbInScaledSpaceSquared=o}}});const c=new i.Cartesian3;s.prototype.isPointVisible=function(t){return S(this._ellipsoid.transformPositionToScaledSpace(t,c),this._cameraPositionInScaledSpace,this._distanceToLimbInScaledSpaceSquared)},s.prototype.isScaledSpacePointVisible=function(t){return S(t,this._cameraPositionInScaledSpace,this._distanceToLimbInScaledSpaceSquared)};const d=new i.Cartesian3;s.prototype.isScaledSpacePointVisiblePossiblyUnderEllipsoid=function(t,e){const i=this._ellipsoid;let o,r;return a.defined(e)&&e<0&&i.minimumRadius>-e?(r=d,r.x=this._cameraPosition.x/(i.radii.x+e),r.y=this._cameraPosition.y/(i.radii.y+e),r.z=this._cameraPosition.z/(i.radii.z+e),o=r.x*r.x+r.y*r.y+r.z*r.z-1):(r=this._cameraPositionInScaledSpace,o=this._distanceToLimbInScaledSpaceSquared),S(t,r,o)},s.prototype.computeHorizonCullingPoint=function(t,e,i){return f(this._ellipsoid,t,e,i)};const u=i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE);s.prototype.computeHorizonCullingPointPossiblyUnderEllipsoid=function(t,e,i,o){return f(h(this._ellipsoid,i,u),t,e,o)},s.prototype.computeHorizonCullingPointFromVertices=function(t,e,i,o,a){return x(this._ellipsoid,t,e,i,o,a)},s.prototype.computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid=function(t,e,i,o,a,r){return x(h(this._ellipsoid,a,u),t,e,i,o,r)};const l=[];s.prototype.computeHorizonCullingPointFromRectangle=function(t,o,a){const r=i.Rectangle.subsample(t,o,0,l),n=e.BoundingSphere.fromPoints(r);if(!(i.Cartesian3.magnitude(n.center)<.1*o.minimumRadius))return this.computeHorizonCullingPoint(n.center,r,a)};const m=new i.Cartesian3;function h(t,e,o){if(a.defined(e)&&e<0&&t.minimumRadius>-e){const a=i.Cartesian3.fromElements(t.radii.x+e,t.radii.y+e,t.radii.z+e,m);t=i.Ellipsoid.fromCartesian3(a,o)}return t}function f(t,e,o,r){a.defined(r)||(r=new i.Cartesian3);const n=T(t,e);let c=0;for(let e=0,i=o.length;e<i;++e){const i=y(t,o[e],n);if(i<0)return;c=Math.max(c,i)}return N(n,c,r)}const p=new i.Cartesian3;function x(t,e,o,r,n,c){a.defined(c)||(c=new i.Cartesian3),r=a.defaultValue(r,3),n=a.defaultValue(n,i.Cartesian3.ZERO);const d=T(t,e);let u=0;for(let e=0,i=o.length;e<i;e+=r){p.x=o[e]+n.x,p.y=o[e+1]+n.y,p.z=o[e+2]+n.z;const i=y(t,p,d);if(i<0)return;u=Math.max(u,i)}return N(d,u,c)}function S(t,e,o){const a=e,r=o,n=i.Cartesian3.subtract(t,a,c),d=-i.Cartesian3.dot(n,a);return!(r<0?d>0:d>r&&d*d/i.Cartesian3.magnitudeSquared(n)>r)}const C=new i.Cartesian3,g=new i.Cartesian3;function y(t,e,o){const a=t.transformPositionToScaledSpace(e,C);let r=i.Cartesian3.magnitudeSquared(a),n=Math.sqrt(r);const c=i.Cartesian3.divideByScalar(a,n,g);r=Math.max(1,r),n=Math.max(1,n);const d=1/n;return 1/(i.Cartesian3.dot(c,o)*d-i.Cartesian3.magnitude(i.Cartesian3.cross(c,o,c))*(Math.sqrt(r-1)*d))}function N(t,e,o){if(!(e<=0||e===1/0||e!=e))return i.Cartesian3.multiplyByScalar(t,e,o)}const M=new i.Cartesian3;function T(t,e){return i.Cartesian3.equals(e,i.Cartesian3.ZERO)?e:(t.transformPositionToScaledSpace(e,M),i.Cartesian3.normalize(M,M))}const b={getHeight:function(t,e,i){return(t-i)*e+i}},P=new i.Cartesian3;b.getPosition=function(t,e,o,a,r){const n=e.cartesianToCartographic(t,P),c=b.getHeight(n.height,o,a);return i.Cartesian3.fromRadians(n.longitude,n.latitude,c,e,r)};var z=Object.freeze({NONE:0,BITS12:1});const _=new i.Cartesian3,E=new i.Cartesian3,H=new i.Cartesian2,w=new i.Matrix4,A=new i.Matrix4,I=Math.pow(2,12);function V(t,e,o,r,n,c,d,u,l,m){let p,C,g=z.NONE;if(a.defined(e)&&a.defined(o)&&a.defined(r)&&a.defined(n)){const t=e.minimum,a=e.maximum,c=i.Cartesian3.subtract(a,t,E),d=r-o;g=Math.max(i.Cartesian3.maximumComponent(c),d)<I-1?z.BITS12:z.NONE,p=i.Matrix4.inverseTransformation(n,new i.Matrix4);const u=i.Cartesian3.negate(t,_);i.Matrix4.multiply(i.Matrix4.fromTranslation(u,w),p,p);const l=_;l.x=1/c.x,l.y=1/c.y,l.z=1/c.z,i.Matrix4.multiply(i.Matrix4.fromScale(l,w),p,p),C=i.Matrix4.clone(n),i.Matrix4.setTranslation(C,i.Cartesian3.ZERO,C),n=i.Matrix4.clone(n,new i.Matrix4);const m=i.Matrix4.fromTranslation(t,w),M=i.Matrix4.fromScale(c,A),b=i.Matrix4.multiply(m,M,w);i.Matrix4.multiply(n,b,n),i.Matrix4.multiply(C,b,C)}this.quantization=g,this.minimumHeight=o,this.maximumHeight=r,this.center=i.Cartesian3.clone(t),this.toScaledENU=p,this.fromScaledENU=n,this.matrix=C,this.hasVertexNormals=c,this.hasWebMercatorT=a.defaultValue(d,!1),this.hasGeodeticSurfaceNormals=a.defaultValue(u,!1),this.exaggeration=a.defaultValue(l,1),this.exaggerationRelativeHeight=a.defaultValue(m,0),this.stride=0,this._offsetGeodeticSurfaceNormal=0,this._offsetVertexNormal=0,this._calculateStrideAndOffsets()}V.prototype.encode=function(t,e,o,a,c,d,u,l){const m=a.x,p=a.y;if(this.quantization===z.BITS12){(o=i.Matrix4.multiplyByPoint(this.toScaledENU,o,_)).x=n.CesiumMath.clamp(o.x,0,1),o.y=n.CesiumMath.clamp(o.y,0,1),o.z=n.CesiumMath.clamp(o.z,0,1);const a=this.maximumHeight-this.minimumHeight,d=n.CesiumMath.clamp((c-this.minimumHeight)/a,0,1);i.Cartesian2.fromElements(o.x,o.y,H);const l=r.AttributeCompression.compressTextureCoordinates(H);i.Cartesian2.fromElements(o.z,d,H);const C=r.AttributeCompression.compressTextureCoordinates(H);i.Cartesian2.fromElements(m,p,H);const g=r.AttributeCompression.compressTextureCoordinates(H);if(t[e++]=l,t[e++]=C,t[e++]=g,this.hasWebMercatorT){i.Cartesian2.fromElements(u,0,H);const o=r.AttributeCompression.compressTextureCoordinates(H);t[e++]=o}}else i.Cartesian3.subtract(o,this.center,_),t[e++]=_.x,t[e++]=_.y,t[e++]=_.z,t[e++]=c,t[e++]=m,t[e++]=p,this.hasWebMercatorT&&(t[e++]=u);return this.hasVertexNormals&&(t[e++]=r.AttributeCompression.octPackFloat(d)),this.hasGeodeticSurfaceNormals&&(t[e++]=l.x,t[e++]=l.y,t[e++]=l.z),e};const q=new i.Cartesian3,G=new i.Cartesian3;V.prototype.addGeodeticSurfaceNormals=function(t,e,i){if(this.hasGeodeticSurfaceNormals)return;const o=this.stride,a=t.length/o;this.hasGeodeticSurfaceNormals=!0,this._calculateStrideAndOffsets();const r=this.stride;for(let n=0;n<a;n++){for(let i=0;i<o;i++){const a=n*o+i;e[n*r+i]=t[a]}const a=this.decodePosition(e,n,q),c=i.geodeticSurfaceNormal(a,G),d=n*r+this._offsetGeodeticSurfaceNormal;e[d]=c.x,e[d+1]=c.y,e[d+2]=c.z}},V.prototype.removeGeodeticSurfaceNormals=function(t,e){if(!this.hasGeodeticSurfaceNormals)return;const i=this.stride,o=t.length/i;this.hasGeodeticSurfaceNormals=!1,this._calculateStrideAndOffsets();const a=this.stride;for(let r=0;r<o;r++)for(let o=0;o<a;o++){const n=r*i+o;e[r*a+o]=t[n]}},V.prototype.decodePosition=function(t,e,o){if(a.defined(o)||(o=new i.Cartesian3),e*=this.stride,this.quantization===z.BITS12){const a=r.AttributeCompression.decompressTextureCoordinates(t[e],H);o.x=a.x,o.y=a.y;const n=r.AttributeCompression.decompressTextureCoordinates(t[e+1],H);return o.z=n.x,i.Matrix4.multiplyByPoint(this.fromScaledENU,o,o)}return o.x=t[e],o.y=t[e+1],o.z=t[e+2],i.Cartesian3.add(o,this.center,o)},V.prototype.getExaggeratedPosition=function(t,e,i){i=this.decodePosition(t,e,i);const o=this.exaggeration,a=this.exaggerationRelativeHeight;if(1!==o&&this.hasGeodeticSurfaceNormals){const r=this.decodeGeodeticSurfaceNormal(t,e,G),n=this.decodeHeight(t,e),c=b.getHeight(n,o,a)-n;i.x+=r.x*c,i.y+=r.y*c,i.z+=r.z*c}return i},V.prototype.decodeTextureCoordinates=function(t,e,o){return a.defined(o)||(o=new i.Cartesian2),e*=this.stride,this.quantization===z.BITS12?r.AttributeCompression.decompressTextureCoordinates(t[e+2],o):i.Cartesian2.fromElements(t[e+4],t[e+5],o)},V.prototype.decodeHeight=function(t,e){return e*=this.stride,this.quantization===z.BITS12?r.AttributeCompression.decompressTextureCoordinates(t[e+1],H).y*(this.maximumHeight-this.minimumHeight)+this.minimumHeight:t[e+3]},V.prototype.decodeWebMercatorT=function(t,e){return e*=this.stride,this.quantization===z.BITS12?r.AttributeCompression.decompressTextureCoordinates(t[e+3],H).x:t[e+6]},V.prototype.getOctEncodedNormal=function(t,e,o){const a=t[e=e*this.stride+this._offsetVertexNormal]/256,r=Math.floor(a),n=256*(a-r);return i.Cartesian2.fromElements(r,n,o)},V.prototype.decodeGeodeticSurfaceNormal=function(t,e,i){return e=e*this.stride+this._offsetGeodeticSurfaceNormal,i.x=t[e],i.y=t[e+1],i.z=t[e+2],i},V.prototype._calculateStrideAndOffsets=function(){let t=0;this.quantization===z.BITS12?t+=3:t+=6,this.hasWebMercatorT&&(t+=1),this.hasVertexNormals&&(this._offsetVertexNormal=t,t+=1),this.hasGeodeticSurfaceNormals&&(this._offsetGeodeticSurfaceNormal=t,t+=3),this.stride=t};const O={position3DAndHeight:0,textureCoordAndEncodedNormals:1,geodeticSurfaceNormal:2},B={compressed0:0,compressed1:1,geodeticSurfaceNormal:2};V.prototype.getAttributes=function(t){const e=n.ComponentDatatype.FLOAT,i=n.ComponentDatatype.getSizeInBytes(e),o=this.stride*i;let a=0;const r=[];function s(n,c){r.push({index:n,vertexBuffer:t,componentDatatype:e,componentsPerAttribute:c,offsetInBytes:a,strideInBytes:o}),a+=c*i}if(this.quantization===z.NONE){s(O.position3DAndHeight,4);let t=2;t+=this.hasWebMercatorT?1:0,t+=this.hasVertexNormals?1:0,s(O.textureCoordAndEncodedNormals,t),this.hasGeodeticSurfaceNormals&&s(O.geodeticSurfaceNormal,3)}else{const t=this.hasWebMercatorT||this.hasVertexNormals,e=this.hasWebMercatorT&&this.hasVertexNormals;s(B.compressed0,t?4:3),e&&s(B.compressed1,1),this.hasGeodeticSurfaceNormals&&s(B.geodeticSurfaceNormal,3)}return r},V.prototype.getAttributeLocations=function(){return this.quantization===z.NONE?O:B},V.clone=function(t,e){if(a.defined(t))return a.defined(e)||(e=new V),e.quantization=t.quantization,e.minimumHeight=t.minimumHeight,e.maximumHeight=t.maximumHeight,e.center=i.Cartesian3.clone(t.center),e.toScaledENU=i.Matrix4.clone(t.toScaledENU),e.fromScaledENU=i.Matrix4.clone(t.fromScaledENU),e.matrix=i.Matrix4.clone(t.matrix),e.hasVertexNormals=t.hasVertexNormals,e.hasWebMercatorT=t.hasWebMercatorT,e.hasGeodeticSurfaceNormals=t.hasGeodeticSurfaceNormals,e.exaggeration=t.exaggeration,e.exaggerationRelativeHeight=t.exaggerationRelativeHeight,e._calculateStrideAndOffsets(),e},t.EllipsoidalOccluder=s,t.TerrainEncoding=V}));