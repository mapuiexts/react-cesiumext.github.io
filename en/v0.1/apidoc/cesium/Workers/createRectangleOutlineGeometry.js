/*! For license information please see createRectangleOutlineGeometry.js.LICENSE.txt */
define(["./defaultValue-97284df2","./Matrix2-73789715","./Transforms-d3d3b2a9","./ComponentDatatype-e7fbe225","./RuntimeError-4f8ec8a2","./GeometryAttribute-fd1d7e90","./GeometryAttributes-734a3446","./GeometryOffsetAttribute-59b14f45","./IndexDatatype-65271ba3","./PolygonPipeline-00dc0c6e","./RectangleGeometryLibrary-cff60d30","./_commonjsHelpers-3aae1032-65601a27","./combine-d11b1f00","./WebGLConstants-6da700a2","./EllipsoidRhumbLine-60f14314"],(function(e,t,i,n,o,a,r,l,s,u,c,p,d,f,g){"use strict";const h=new i.BoundingSphere,y=new i.BoundingSphere,m=new t.Cartesian3,b=new t.Rectangle;function _(e,t){const i=e._ellipsoid,o=t.height,l=t.width,u=t.northCap,p=t.southCap;let d=o,f=2,g=0,h=4;u&&(f-=1,d-=1,g+=1,h-=2),p&&(f-=1,d-=1,g+=1,h-=2),g+=f*l+2*d-h;const y=new Float64Array(3*g);let b,A=0,G=0;const R=m;if(u)c.RectangleGeometryLibrary.computePosition(t,i,!1,G,0,R),y[A++]=R.x,y[A++]=R.y,y[A++]=R.z;else for(b=0;b<l;b++)c.RectangleGeometryLibrary.computePosition(t,i,!1,G,b,R),y[A++]=R.x,y[A++]=R.y,y[A++]=R.z;for(b=l-1,G=1;G<o;G++)c.RectangleGeometryLibrary.computePosition(t,i,!1,G,b,R),y[A++]=R.x,y[A++]=R.y,y[A++]=R.z;if(G=o-1,!p)for(b=l-2;b>=0;b--)c.RectangleGeometryLibrary.computePosition(t,i,!1,G,b,R),y[A++]=R.x,y[A++]=R.y,y[A++]=R.z;for(b=0,G=o-2;G>0;G--)c.RectangleGeometryLibrary.computePosition(t,i,!1,G,b,R),y[A++]=R.x,y[A++]=R.y,y[A++]=R.z;const P=y.length/3*2,L=s.IndexDatatype.createTypedArray(y.length/3,P);let v=0;for(let e=0;e<y.length/3-1;e++)L[v++]=e,L[v++]=e+1;L[v++]=y.length/3-1,L[v++]=0;const w=new a.Geometry({attributes:new r.GeometryAttributes,primitiveType:a.PrimitiveType.LINES});return w.attributes.position=new a.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:y}),w.indices=L,w}function E(i){const o=(i=e.defaultValue(i,e.defaultValue.EMPTY_OBJECT)).rectangle,a=e.defaultValue(i.granularity,n.CesiumMath.RADIANS_PER_DEGREE),r=e.defaultValue(i.ellipsoid,t.Ellipsoid.WGS84),l=e.defaultValue(i.rotation,0),s=e.defaultValue(i.height,0),u=e.defaultValue(i.extrudedHeight,s);this._rectangle=t.Rectangle.clone(o),this._granularity=a,this._ellipsoid=r,this._surfaceHeight=Math.max(s,u),this._rotation=l,this._extrudedHeight=Math.min(s,u),this._offsetAttribute=i.offsetAttribute,this._workerName="createRectangleOutlineGeometry"}E.packedLength=t.Rectangle.packedLength+t.Ellipsoid.packedLength+5,E.pack=function(i,n,o){return o=e.defaultValue(o,0),t.Rectangle.pack(i._rectangle,n,o),o+=t.Rectangle.packedLength,t.Ellipsoid.pack(i._ellipsoid,n,o),o+=t.Ellipsoid.packedLength,n[o++]=i._granularity,n[o++]=i._surfaceHeight,n[o++]=i._rotation,n[o++]=i._extrudedHeight,n[o]=e.defaultValue(i._offsetAttribute,-1),n};const A=new t.Rectangle,G=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),R={rectangle:A,ellipsoid:G,granularity:void 0,height:void 0,rotation:void 0,extrudedHeight:void 0,offsetAttribute:void 0};E.unpack=function(i,n,o){n=e.defaultValue(n,0);const a=t.Rectangle.unpack(i,n,A);n+=t.Rectangle.packedLength;const r=t.Ellipsoid.unpack(i,n,G);n+=t.Ellipsoid.packedLength;const l=i[n++],s=i[n++],u=i[n++],c=i[n++],p=i[n];return e.defined(o)?(o._rectangle=t.Rectangle.clone(a,o._rectangle),o._ellipsoid=t.Ellipsoid.clone(r,o._ellipsoid),o._surfaceHeight=s,o._rotation=u,o._extrudedHeight=c,o._offsetAttribute=-1===p?void 0:p,o):(R.granularity=l,R.height=s,R.rotation=u,R.extrudedHeight=c,R.offsetAttribute=-1===p?void 0:p,new E(R))};const P=new t.Cartographic;return E.createGeometry=function(t){const o=t._rectangle,r=t._ellipsoid,p=c.RectangleGeometryLibrary.computeOptions(o,t._granularity,t._rotation,0,b,P);let d,f;if(n.CesiumMath.equalsEpsilon(o.north,o.south,n.CesiumMath.EPSILON10)||n.CesiumMath.equalsEpsilon(o.east,o.west,n.CesiumMath.EPSILON10))return;const g=t._surfaceHeight,m=t._extrudedHeight;let A;if(n.CesiumMath.equalsEpsilon(g,m,0,n.CesiumMath.EPSILON2)){if(d=_(t,p),d.attributes.position.values=u.PolygonPipeline.scaleToGeodeticHeight(d.attributes.position.values,g,r,!1),e.defined(t._offsetAttribute)){const e=d.attributes.position.values.length;A=t._offsetAttribute===l.GeometryOffsetAttribute.NONE?0:1;const i=new Uint8Array(e/3).fill(A);d.attributes.applyOffset=new a.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:i})}f=i.BoundingSphere.fromRectangle3D(o,r,g)}else{if(d=function(e,t){const i=e._surfaceHeight,n=e._extrudedHeight,o=e._ellipsoid,a=n,r=i,l=_(e,t),c=t.height,p=t.width,d=u.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values,r,o,!1);let f=d.length;const g=new Float64Array(2*f);g.set(d);const h=u.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values,a,o);g.set(h,f),l.attributes.position.values=g;const y=t.northCap,m=t.southCap;let b=4;y&&(b-=1),m&&(b-=1);const A=2*(g.length/3+b),G=s.IndexDatatype.createTypedArray(g.length/3,A);f=g.length/6;let R,P=0;for(let e=0;e<f-1;e++)G[P++]=e,G[P++]=e+1,G[P++]=e+f,G[P++]=e+f+1;if(G[P++]=f-1,G[P++]=0,G[P++]=f+f-1,G[P++]=f,G[P++]=0,G[P++]=f,y)R=c-1;else{const e=p-1;G[P++]=e,G[P++]=e+f,R=p+c-2}if(G[P++]=R,G[P++]=R+f,!m){const e=p+R-1;G[P++]=e,G[P]=e+f}return l.indices=G,l}(t,p),e.defined(t._offsetAttribute)){const e=d.attributes.position.values.length/3;let i=new Uint8Array(e);t._offsetAttribute===l.GeometryOffsetAttribute.TOP?i=i.fill(1,0,e/2):(A=t._offsetAttribute===l.GeometryOffsetAttribute.NONE?0:1,i=i.fill(A)),d.attributes.applyOffset=new a.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:i})}const c=i.BoundingSphere.fromRectangle3D(o,r,g,y),b=i.BoundingSphere.fromRectangle3D(o,r,m,h);f=i.BoundingSphere.union(c,b)}return new a.Geometry({attributes:d.attributes,indices:d.indices,primitiveType:a.PrimitiveType.LINES,boundingSphere:f,offsetAttribute:t._offsetAttribute})},function(i,n){return e.defined(n)&&(i=E.unpack(i,n)),i._ellipsoid=t.Ellipsoid.clone(i._ellipsoid),i._rectangle=t.Rectangle.clone(i._rectangle),E.createGeometry(i)}}));