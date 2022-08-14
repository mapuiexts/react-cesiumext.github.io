/*! For license information please see createWallGeometry.js.LICENSE.txt */
define(["./defaultValue-97284df2","./Matrix2-73789715","./Transforms-d3d3b2a9","./ComponentDatatype-e7fbe225","./RuntimeError-4f8ec8a2","./GeometryAttribute-fd1d7e90","./GeometryAttributes-734a3446","./IndexDatatype-65271ba3","./VertexFormat-9886cb81","./WallGeometryLibrary-27f90b78","./_commonjsHelpers-3aae1032-65601a27","./combine-d11b1f00","./WebGLConstants-6da700a2","./arrayRemoveDuplicates-6f91355d","./PolylinePipeline-ebd42f23","./EllipsoidGeodesic-ed8a0e40","./EllipsoidRhumbLine-60f14314","./IntersectionTests-33ace2d6","./Plane-e916220d"],(function(e,t,n,i,a,o,r,s,l,m,u,d,p,c,f,y,g,h,C){"use strict";const x=new t.Cartesian3,b=new t.Cartesian3,A=new t.Cartesian3,_=new t.Cartesian3,E=new t.Cartesian3,w=new t.Cartesian3,F=new t.Cartesian3;function v(n){const a=(n=e.defaultValue(n,e.defaultValue.EMPTY_OBJECT)).positions,o=n.maximumHeights,r=n.minimumHeights,s=e.defaultValue(n.vertexFormat,l.VertexFormat.DEFAULT),m=e.defaultValue(n.granularity,i.CesiumMath.RADIANS_PER_DEGREE),u=e.defaultValue(n.ellipsoid,t.Ellipsoid.WGS84);this._positions=a,this._minimumHeights=r,this._maximumHeights=o,this._vertexFormat=l.VertexFormat.clone(s),this._granularity=m,this._ellipsoid=t.Ellipsoid.clone(u),this._workerName="createWallGeometry";let d=1+a.length*t.Cartesian3.packedLength+2;e.defined(r)&&(d+=r.length),e.defined(o)&&(d+=o.length),this.packedLength=d+t.Ellipsoid.packedLength+l.VertexFormat.packedLength+1}v.pack=function(n,i,a){let o;a=e.defaultValue(a,0);const r=n._positions;let s=r.length;for(i[a++]=s,o=0;o<s;++o,a+=t.Cartesian3.packedLength)t.Cartesian3.pack(r[o],i,a);const m=n._minimumHeights;if(s=e.defined(m)?m.length:0,i[a++]=s,e.defined(m))for(o=0;o<s;++o)i[a++]=m[o];const u=n._maximumHeights;if(s=e.defined(u)?u.length:0,i[a++]=s,e.defined(u))for(o=0;o<s;++o)i[a++]=u[o];return t.Ellipsoid.pack(n._ellipsoid,i,a),a+=t.Ellipsoid.packedLength,l.VertexFormat.pack(n._vertexFormat,i,a),i[a+=l.VertexFormat.packedLength]=n._granularity,i};const L=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),H=new l.VertexFormat,V={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:L,vertexFormat:H,granularity:void 0};return v.unpack=function(n,i,a){let o;i=e.defaultValue(i,0);let r=n[i++];const s=new Array(r);for(o=0;o<r;++o,i+=t.Cartesian3.packedLength)s[o]=t.Cartesian3.unpack(n,i);let m,u;if(r=n[i++],r>0)for(m=new Array(r),o=0;o<r;++o)m[o]=n[i++];if(r=n[i++],r>0)for(u=new Array(r),o=0;o<r;++o)u[o]=n[i++];const d=t.Ellipsoid.unpack(n,i,L);i+=t.Ellipsoid.packedLength;const p=l.VertexFormat.unpack(n,i,H),c=n[i+=l.VertexFormat.packedLength];return e.defined(a)?(a._positions=s,a._minimumHeights=m,a._maximumHeights=u,a._ellipsoid=t.Ellipsoid.clone(d,a._ellipsoid),a._vertexFormat=l.VertexFormat.clone(p,a._vertexFormat),a._granularity=c,a):(V.positions=s,V.minimumHeights=m,V.maximumHeights=u,V.granularity=c,new v(V))},v.fromConstantHeights=function(t){const n=(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).positions;let i,a;const o=t.minimumHeight,r=t.maximumHeight,s=e.defined(o),l=e.defined(r);if(s||l){const e=n.length;i=s?new Array(e):void 0,a=l?new Array(e):void 0;for(let t=0;t<e;++t)s&&(i[t]=o),l&&(a[t]=r)}return new v({positions:n,maximumHeights:a,minimumHeights:i,ellipsoid:t.ellipsoid,vertexFormat:t.vertexFormat})},v.createGeometry=function(a){const l=a._positions,u=a._minimumHeights,d=a._maximumHeights,p=a._vertexFormat,c=a._granularity,f=a._ellipsoid,y=m.WallGeometryLibrary.computePositions(f,l,d,u,c,!0);if(!e.defined(y))return;const g=y.bottomPositions,h=y.topPositions,C=y.numCorners;let L=h.length,H=2*L;const V=p.position?new Float64Array(H):void 0,k=p.normal?new Float32Array(H):void 0,G=p.tangent?new Float32Array(H):void 0,D=p.bitangent?new Float32Array(H):void 0,P=p.st?new Float32Array(H/3*2):void 0;let T,z=0,O=0,R=0,S=0,I=0,N=F,M=w,W=E,B=!0;L/=3;let U=0;const q=1/(L-C-1);for(T=0;T<L;++T){const e=3*T,n=t.Cartesian3.fromArray(h,e,x),a=t.Cartesian3.fromArray(g,e,b);if(p.position&&(V[z++]=a.x,V[z++]=a.y,V[z++]=a.z,V[z++]=n.x,V[z++]=n.y,V[z++]=n.z),p.st&&(P[I++]=U,P[I++]=0,P[I++]=U,P[I++]=1),p.normal||p.tangent||p.bitangent){let a=t.Cartesian3.clone(t.Cartesian3.ZERO,_);const o=t.Cartesian3.subtract(n,f.geodeticSurfaceNormal(n,b),b);if(T+1<L&&(a=t.Cartesian3.fromArray(h,e+3,_)),B){const e=t.Cartesian3.subtract(a,n,A),i=t.Cartesian3.subtract(o,n,x);N=t.Cartesian3.normalize(t.Cartesian3.cross(i,e,N),N),B=!1}t.Cartesian3.equalsEpsilon(n,a,i.CesiumMath.EPSILON10)?B=!0:(U+=q,p.tangent&&(M=t.Cartesian3.normalize(t.Cartesian3.subtract(a,n,M),M)),p.bitangent&&(W=t.Cartesian3.normalize(t.Cartesian3.cross(N,M,W),W))),p.normal&&(k[O++]=N.x,k[O++]=N.y,k[O++]=N.z,k[O++]=N.x,k[O++]=N.y,k[O++]=N.z),p.tangent&&(G[S++]=M.x,G[S++]=M.y,G[S++]=M.z,G[S++]=M.x,G[S++]=M.y,G[S++]=M.z),p.bitangent&&(D[R++]=W.x,D[R++]=W.y,D[R++]=W.z,D[R++]=W.x,D[R++]=W.y,D[R++]=W.z)}}const J=new r.GeometryAttributes;p.position&&(J.position=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:V})),p.normal&&(J.normal=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:k})),p.tangent&&(J.tangent=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:G})),p.bitangent&&(J.bitangent=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:D})),p.st&&(J.st=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:P}));const Y=H/3;H-=6*(C+1);const j=s.IndexDatatype.createTypedArray(Y,H);let Z=0;for(T=0;T<Y-2;T+=2){const e=T,n=T+2,a=t.Cartesian3.fromArray(V,3*e,x),o=t.Cartesian3.fromArray(V,3*n,b);if(t.Cartesian3.equalsEpsilon(a,o,i.CesiumMath.EPSILON10))continue;const r=T+1,s=T+3;j[Z++]=r,j[Z++]=e,j[Z++]=s,j[Z++]=s,j[Z++]=e,j[Z++]=n}return new o.Geometry({attributes:J,indices:j,primitiveType:o.PrimitiveType.TRIANGLES,boundingSphere:new n.BoundingSphere.fromVertices(V)})},function(n,i){return e.defined(i)&&(n=v.unpack(n,i)),n._ellipsoid=t.Ellipsoid.clone(n._ellipsoid),v.createGeometry(n)}}));