/*! For license information please see createVerticesFromQuantizedTerrainMesh.js.LICENSE.txt */
define(["./AxisAlignedBoundingBox-b1c095aa","./Matrix2-73789715","./defaultValue-97284df2","./TerrainEncoding-080f16eb","./IndexDatatype-65271ba3","./ComponentDatatype-e7fbe225","./RuntimeError-4f8ec8a2","./Transforms-d3d3b2a9","./WebMercatorProjection-04ef6bc3","./createTaskProcessorWorker","./AttributeCompression-5744d52e","./WebGLConstants-6da700a2","./_commonjsHelpers-3aae1032-65601a27","./combine-d11b1f00"],(function(e,t,r,n,o,i,a,s,c,d,h,u,l,I){"use strict";function g(){a.DeveloperError.throwInstantiationError()}Object.defineProperties(g.prototype,{errorEvent:{get:a.DeveloperError.throwInstantiationError},credit:{get:a.DeveloperError.throwInstantiationError},tilingScheme:{get:a.DeveloperError.throwInstantiationError},ready:{get:a.DeveloperError.throwInstantiationError},readyPromise:{get:a.DeveloperError.throwInstantiationError},hasWaterMask:{get:a.DeveloperError.throwInstantiationError},hasVertexNormals:{get:a.DeveloperError.throwInstantiationError},availability:{get:a.DeveloperError.throwInstantiationError}});const m=[];g.getRegularGridIndices=function(e,t){let n=m[e];r.defined(n)||(m[e]=n=[]);let o=n[t];return r.defined(o)||(o=e*t<i.CesiumMath.SIXTY_FOUR_KILOBYTES?n[t]=new Uint16Array((e-1)*(t-1)*6):n[t]=new Uint32Array((e-1)*(t-1)*6),p(e,t,o,0)),o};const T=[];g.getRegularGridIndicesAndEdgeIndices=function(e,t){let n=T[e];r.defined(n)||(T[e]=n=[]);let o=n[t];if(!r.defined(o)){const r=g.getRegularGridIndices(e,t),i=E(e,t),a=i.westIndicesSouthToNorth,s=i.southIndicesEastToWest,c=i.eastIndicesNorthToSouth,d=i.northIndicesWestToEast;o=n[t]={indices:r,westIndicesSouthToNorth:a,southIndicesEastToWest:s,eastIndicesNorthToSouth:c,northIndicesWestToEast:d}}return o};const f=[];function E(e,t){const r=new Array(t),n=new Array(e),o=new Array(t),i=new Array(e);let a;for(a=0;a<e;++a)i[a]=a,n[a]=e*t-1-a;for(a=0;a<t;++a)o[a]=(a+1)*e-1,r[a]=(t-a-1)*e;return{westIndicesSouthToNorth:r,southIndicesEastToWest:n,eastIndicesNorthToSouth:o,northIndicesWestToEast:i}}function p(e,t,r,n){let o=0;for(let i=0;i<t-1;++i){for(let t=0;t<e-1;++t){const t=o,i=t+e,a=i+1,s=t+1;r[n++]=t,r[n++]=i,r[n++]=s,r[n++]=s,r[n++]=i,r[n++]=a,++o}++o}}function y(e,t,r,n){let o=e[0];const i=e.length;for(let a=1;a<i;++a){const i=e[a];r[n++]=o,r[n++]=i,r[n++]=t,r[n++]=t,r[n++]=i,r[n++]=t+1,o=i,++t}return n}g.getRegularGridAndSkirtIndicesAndEdgeIndices=function(e,t){let n=f[e];r.defined(n)||(f[e]=n=[]);let i=n[t];if(!r.defined(i)){const r=e*t,a=(e-1)*(t-1)*6,s=2*e+2*t,c=r+s,d=a+6*Math.max(0,s-4),h=E(e,t),u=h.westIndicesSouthToNorth,l=h.southIndicesEastToWest,I=h.eastIndicesNorthToSouth,m=h.northIndicesWestToEast,T=o.IndexDatatype.createTypedArray(c,d);p(e,t,T,0),g.addSkirtIndices(u,l,I,m,r,T,a),i=n[t]={indices:T,westIndicesSouthToNorth:u,southIndicesEastToWest:l,eastIndicesNorthToSouth:I,northIndicesWestToEast:m,indexCountWithoutSkirts:a}}return i},g.addSkirtIndices=function(e,t,r,n,o,i,a){let s=o;a=y(e,s,i,a),s+=e.length,a=y(t,s,i,a),s+=t.length,a=y(r,s,i,a),s+=r.length,y(n,s,i,a)},g.heightmapTerrainQuality=.25,g.getEstimatedLevelZeroGeometricErrorForAHeightmap=function(e,t,r){return 2*e.maximumRadius*Math.PI*g.heightmapTerrainQuality/(t*r)},g.prototype.requestTileGeometry=a.DeveloperError.throwInstantiationError,g.prototype.getLevelMaximumGeometricError=a.DeveloperError.throwInstantiationError,g.prototype.getTileDataAvailable=a.DeveloperError.throwInstantiationError,g.prototype.loadTileDataAvailability=a.DeveloperError.throwInstantiationError;const N=32767,w=new t.Cartesian3,S=new t.Cartesian3,b=new t.Cartesian3,M=new t.Cartographic,x=new t.Cartesian2;function A(e,r,n,o,a,s,c,d,h){let u=Number.POSITIVE_INFINITY;const l=a.north,I=a.south;let m=a.east;const T=a.west;m<T&&(m+=i.CesiumMath.TWO_PI);const f=e.length;for(let a=0;a<f;++a){const f=e[a],N=n[f],S=o[f];M.longitude=i.CesiumMath.lerp(T,m,S.x),M.latitude=i.CesiumMath.lerp(I,l,S.y),M.height=N-r;const b=s.cartographicToCartesian(M,w);t.Matrix4.multiplyByPoint(c,b,b),t.Cartesian3.minimumByComponent(b,d,d),t.Cartesian3.maximumByComponent(b,h,h),u=Math.min(u,M.height)}return u}function C(e,t,n,o,a,s,d,h,u,l,I,m,T,f){const N=r.defined(d),S=u.north,b=u.south;let v=u.east;const P=u.west;v<P&&(v+=i.CesiumMath.TWO_PI);const D=n.length;for(let r=0;r<D;++r){const u=n[r],D=a[u],k=s[u];M.longitude=i.CesiumMath.lerp(P,v,k.x)+T,M.latitude=i.CesiumMath.lerp(b,S,k.y)+f,M.height=D-l;const F=h.cartographicToCartesian(M,w);if(N){const e=2*u;x.x=d[e],x.y=d[e+1]}let H,_;o.hasWebMercatorT&&(H=(c.WebMercatorProjection.geodeticLatitudeToMercatorAngle(M.latitude)-I)*m),o.hasGeodeticSurfaceNormals&&(_=h.geodeticSurfaceNormal(F)),t=o.encode(e,t,F,k,M.height,x,H,_)}}function W(e,t){let n;return"function"==typeof e.slice&&(n=e.slice(),"function"!=typeof n.sort&&(n=void 0)),r.defined(n)||(n=Array.prototype.slice.call(e)),n.sort(t),n}return d((function(a,d){const h=a.quantizedVertices,u=h.length/3,l=a.octEncodedNormals,I=a.westIndices.length+a.eastIndices.length+a.southIndices.length+a.northIndices.length,m=a.includeWebMercatorT,T=a.exaggeration,f=a.exaggerationRelativeHeight,v=1!==T,P=t.Rectangle.clone(a.rectangle),D=P.west,k=P.south,F=P.east,H=P.north,_=t.Ellipsoid.clone(a.ellipsoid),G=a.minimumHeight,V=a.maximumHeight,Y=a.relativeToCenter,O=s.Transforms.eastNorthUpToFixedFrame(Y,_),B=t.Matrix4.inverseTransformation(O,new t.Matrix4);let R,L;m&&(R=c.WebMercatorProjection.geodeticLatitudeToMercatorAngle(k),L=1/(c.WebMercatorProjection.geodeticLatitudeToMercatorAngle(H)-R));const j=h.subarray(0,u),U=h.subarray(u,2*u),z=h.subarray(2*u,3*u),q=r.defined(l),Q=new Array(u),K=new Array(u),X=new Array(u),Z=m?new Array(u):[],J=v?new Array(u):[],$=S;$.x=Number.POSITIVE_INFINITY,$.y=Number.POSITIVE_INFINITY,$.z=Number.POSITIVE_INFINITY;const ee=b;ee.x=Number.NEGATIVE_INFINITY,ee.y=Number.NEGATIVE_INFINITY,ee.z=Number.NEGATIVE_INFINITY;let te=Number.POSITIVE_INFINITY,re=Number.NEGATIVE_INFINITY,ne=Number.POSITIVE_INFINITY,oe=Number.NEGATIVE_INFINITY;for(let e=0;e<u;++e){const r=j[e],n=U[e],o=r/N,a=n/N,s=i.CesiumMath.lerp(G,V,z[e]/N);M.longitude=i.CesiumMath.lerp(D,F,o),M.latitude=i.CesiumMath.lerp(k,H,a),M.height=s,te=Math.min(M.longitude,te),re=Math.max(M.longitude,re),ne=Math.min(M.latitude,ne),oe=Math.max(M.latitude,oe);const d=_.cartographicToCartesian(M);Q[e]=new t.Cartesian2(o,a),K[e]=s,X[e]=d,m&&(Z[e]=(c.WebMercatorProjection.geodeticLatitudeToMercatorAngle(M.latitude)-R)*L),v&&(J[e]=_.geodeticSurfaceNormal(d)),t.Matrix4.multiplyByPoint(B,d,w),t.Cartesian3.minimumByComponent(w,$,$),t.Cartesian3.maximumByComponent(w,ee,ee)}const ie=W(a.westIndices,(function(e,t){return Q[e].y-Q[t].y})),ae=W(a.eastIndices,(function(e,t){return Q[t].y-Q[e].y})),se=W(a.southIndices,(function(e,t){return Q[t].x-Q[e].x})),ce=W(a.northIndices,(function(e,t){return Q[e].x-Q[t].x}));let de;G<0&&(de=new n.EllipsoidalOccluder(_).computeHorizonCullingPointPossiblyUnderEllipsoid(Y,X,G));let he=G;he=Math.min(he,A(a.westIndices,a.westSkirtHeight,K,Q,P,_,B,$,ee)),he=Math.min(he,A(a.southIndices,a.southSkirtHeight,K,Q,P,_,B,$,ee)),he=Math.min(he,A(a.eastIndices,a.eastSkirtHeight,K,Q,P,_,B,$,ee)),he=Math.min(he,A(a.northIndices,a.northSkirtHeight,K,Q,P,_,B,$,ee));const ue=new e.AxisAlignedBoundingBox($,ee,Y),le=new n.TerrainEncoding(Y,ue,he,V,O,q,m,v,T,f),Ie=le.stride,ge=new Float32Array(u*Ie+I*Ie);let me=0;for(let e=0;e<u;++e){if(q){const t=2*e;x.x=l[t],x.y=l[t+1]}me=le.encode(ge,me,X[e],Q[e],K[e],x,Z[e],J[e])}const Te=Math.max(0,2*(I-4)),Ee=a.indices.length+3*Te,pe=o.IndexDatatype.createTypedArray(u+I,Ee);pe.set(a.indices,0);const fe=1e-4,ye=(re-te)*fe,Ne=(oe-ne)*fe,we=-ye,Se=ye,be=Ne,Ae=-Ne;let Me=u*Ie;return C(ge,Me,ie,le,K,Q,l,_,P,a.westSkirtHeight,R,L,we,0),Me+=a.westIndices.length*Ie,C(ge,Me,se,le,K,Q,l,_,P,a.southSkirtHeight,R,L,0,Ae),Me+=a.southIndices.length*Ie,C(ge,Me,ae,le,K,Q,l,_,P,a.eastSkirtHeight,R,L,Se,0),Me+=a.eastIndices.length*Ie,C(ge,Me,ce,le,K,Q,l,_,P,a.northSkirtHeight,R,L,0,be),g.addSkirtIndices(ie,se,ae,ce,u,pe,a.indices.length),d.push(ge.buffer,pe.buffer),{vertices:ge.buffer,indices:pe.buffer,westIndicesSouthToNorth:ie,southIndicesEastToWest:se,eastIndicesNorthToSouth:ae,northIndicesWestToEast:ce,vertexStride:Ie,center:Y,minimumHeight:G,maximumHeight:V,occludeePointInScaledSpace:de,encoding:le,indexCountWithoutSkirts:a.indices.length}}))}));