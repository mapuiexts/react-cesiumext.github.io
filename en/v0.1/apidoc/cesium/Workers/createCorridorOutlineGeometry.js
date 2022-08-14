/*! For license information please see createCorridorOutlineGeometry.js.LICENSE.txt */
define(["./arrayRemoveDuplicates-6f91355d","./Transforms-d3d3b2a9","./Matrix2-73789715","./RuntimeError-4f8ec8a2","./ComponentDatatype-e7fbe225","./PolylineVolumeGeometryLibrary-a4b92b4e","./CorridorGeometryLibrary-ab3e6481","./defaultValue-97284df2","./GeometryAttribute-fd1d7e90","./GeometryAttributes-734a3446","./GeometryOffsetAttribute-59b14f45","./IndexDatatype-65271ba3","./PolygonPipeline-00dc0c6e","./_commonjsHelpers-3aae1032-65601a27","./combine-d11b1f00","./WebGLConstants-6da700a2","./EllipsoidTangentPlane-7ae496b2","./AxisAlignedBoundingBox-b1c095aa","./IntersectionTests-33ace2d6","./Plane-e916220d","./PolylinePipeline-ebd42f23","./EllipsoidGeodesic-ed8a0e40","./EllipsoidRhumbLine-60f14314"],(function(e,t,i,r,o,n,s,a,l,d,u,p,f,c,h,y,g,b,m,A,_,E,C){"use strict";const G=new i.Cartesian3,T=new i.Cartesian3,P=new i.Cartesian3;function v(e,t){const r=[],u=e.positions,f=e.corners,c=e.endPositions,h=new d.GeometryAttributes;let y,g,b,m=0,A=0,_=0;for(g=0;g<u.length;g+=2)b=u[g].length-3,m+=b,_+=b/3*4,A+=u[g+1].length-3;for(m+=3,A+=3,g=0;g<f.length;g++){y=f[g];const e=f[g].leftPositions;a.defined(e)?(b=e.length,m+=b,_+=b/3*2):(b=f[g].rightPositions.length,A+=b,_+=b/3*2)}const E=a.defined(c);let C;E&&(C=c[0].length-3,m+=C,A+=C,C/=3,_+=4*C);const L=m+A,D=new Float64Array(L);let x,k,V,H,N,O,I=0,S=L-1;const B=C/2,M=p.IndexDatatype.createTypedArray(L/3,_+4);let R=0;if(M[R++]=I/3,M[R++]=(S-2)/3,E){r.push(I/3),O=G,N=T;const e=c[0];for(g=0;g<B;g++)O=i.Cartesian3.fromArray(e,3*(B-1-g),O),N=i.Cartesian3.fromArray(e,3*(B+g),N),s.CorridorGeometryLibrary.addAttribute(D,N,I),s.CorridorGeometryLibrary.addAttribute(D,O,void 0,S),k=I/3,H=k+1,x=(S-2)/3,V=x-1,M[R++]=x,M[R++]=V,M[R++]=k,M[R++]=H,I+=3,S-=3}let U=0,F=u[U++],Y=u[U++];for(D.set(F,I),D.set(Y,S-Y.length+1),b=Y.length-3,r.push(I/3,(S-2)/3),g=0;g<b;g+=3)k=I/3,H=k+1,x=(S-2)/3,V=x-1,M[R++]=x,M[R++]=V,M[R++]=k,M[R++]=H,I+=3,S-=3;for(g=0;g<f.length;g++){let e;y=f[g];const o=y.leftPositions,l=y.rightPositions;let d,p=P;if(a.defined(o)){for(S-=3,d=V,r.push(H),e=0;e<o.length/3;e++)p=i.Cartesian3.fromArray(o,3*e,p),M[R++]=d-e-1,M[R++]=d-e,s.CorridorGeometryLibrary.addAttribute(D,p,void 0,S),S-=3;r.push(d-Math.floor(o.length/6)),t===n.CornerType.BEVELED&&r.push((S-2)/3+1),I+=3}else{for(I+=3,d=H,r.push(V),e=0;e<l.length/3;e++)p=i.Cartesian3.fromArray(l,3*e,p),M[R++]=d+e,M[R++]=d+e+1,s.CorridorGeometryLibrary.addAttribute(D,p,I),I+=3;r.push(d+Math.floor(l.length/6)),t===n.CornerType.BEVELED&&r.push(I/3-1),S-=3}for(F=u[U++],Y=u[U++],F.splice(0,3),Y.splice(Y.length-3,3),D.set(F,I),D.set(Y,S-Y.length+1),b=Y.length-3,e=0;e<Y.length;e+=3)H=I/3,k=H-1,V=(S-2)/3,x=V+1,M[R++]=x,M[R++]=V,M[R++]=k,M[R++]=H,I+=3,S-=3;I-=3,S+=3,r.push(I/3,(S-2)/3)}if(E){I+=3,S-=3,O=G,N=T;const e=c[1];for(g=0;g<B;g++)O=i.Cartesian3.fromArray(e,3*(C-g-1),O),N=i.Cartesian3.fromArray(e,3*g,N),s.CorridorGeometryLibrary.addAttribute(D,O,void 0,S),s.CorridorGeometryLibrary.addAttribute(D,N,I),H=I/3,k=H-1,V=(S-2)/3,x=V+1,M[R++]=x,M[R++]=V,M[R++]=k,M[R++]=H,I+=3,S-=3;r.push(I/3)}else r.push(I/3,(S-2)/3);return M[R++]=I/3,M[R++]=(S-2)/3,h.position=new l.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:D}),{attributes:h,indices:M,wallIndices:r}}function w(e){const t=(e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT)).positions,r=e.width,s=a.defaultValue(e.height,0),l=a.defaultValue(e.extrudedHeight,s);this._positions=t,this._ellipsoid=i.Ellipsoid.clone(a.defaultValue(e.ellipsoid,i.Ellipsoid.WGS84)),this._width=r,this._height=Math.max(s,l),this._extrudedHeight=Math.min(s,l),this._cornerType=a.defaultValue(e.cornerType,n.CornerType.ROUNDED),this._granularity=a.defaultValue(e.granularity,o.CesiumMath.RADIANS_PER_DEGREE),this._offsetAttribute=e.offsetAttribute,this._workerName="createCorridorOutlineGeometry",this.packedLength=1+t.length*i.Cartesian3.packedLength+i.Ellipsoid.packedLength+6}w.pack=function(e,t,r){r=a.defaultValue(r,0);const o=e._positions,n=o.length;t[r++]=n;for(let e=0;e<n;++e,r+=i.Cartesian3.packedLength)i.Cartesian3.pack(o[e],t,r);return i.Ellipsoid.pack(e._ellipsoid,t,r),r+=i.Ellipsoid.packedLength,t[r++]=e._width,t[r++]=e._height,t[r++]=e._extrudedHeight,t[r++]=e._cornerType,t[r++]=e._granularity,t[r]=a.defaultValue(e._offsetAttribute,-1),t};const L=i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE),D={positions:void 0,ellipsoid:L,width:void 0,height:void 0,extrudedHeight:void 0,cornerType:void 0,granularity:void 0,offsetAttribute:void 0};return w.unpack=function(e,t,r){t=a.defaultValue(t,0);const o=e[t++],n=new Array(o);for(let r=0;r<o;++r,t+=i.Cartesian3.packedLength)n[r]=i.Cartesian3.unpack(e,t);const s=i.Ellipsoid.unpack(e,t,L);t+=i.Ellipsoid.packedLength;const l=e[t++],d=e[t++],u=e[t++],p=e[t++],f=e[t++],c=e[t];return a.defined(r)?(r._positions=n,r._ellipsoid=i.Ellipsoid.clone(s,r._ellipsoid),r._width=l,r._height=d,r._extrudedHeight=u,r._cornerType=p,r._granularity=f,r._offsetAttribute=-1===c?void 0:c,r):(D.positions=n,D.width=l,D.height=d,D.extrudedHeight=u,D.cornerType=p,D.granularity=f,D.offsetAttribute=-1===c?void 0:c,new w(D))},w.createGeometry=function(r){let n=r._positions;const d=r._width,c=r._ellipsoid;n=function(e,t){for(let i=0;i<e.length;i++)e[i]=t.scaleToGeodeticSurface(e[i],e[i]);return e}(n,c);const h=e.arrayRemoveDuplicates(n,i.Cartesian3.equalsEpsilon);if(h.length<2||d<=0)return;const y=r._height,g=r._extrudedHeight,b=!o.CesiumMath.equalsEpsilon(y,g,0,o.CesiumMath.EPSILON2),m={ellipsoid:c,positions:h,width:d,cornerType:r._cornerType,granularity:r._granularity,saveAttributes:!1};let A;if(b)m.height=y,m.extrudedHeight=g,m.offsetAttribute=r._offsetAttribute,A=function(e){const t=e.ellipsoid,i=v(s.CorridorGeometryLibrary.computePositions(e),e.cornerType),r=i.wallIndices,n=e.height,d=e.extrudedHeight,c=i.attributes,h=i.indices;let y=c.position.values,g=y.length,b=new Float64Array(g);b.set(y);const m=new Float64Array(2*g);if(y=f.PolygonPipeline.scaleToGeodeticHeight(y,n,t),b=f.PolygonPipeline.scaleToGeodeticHeight(b,d,t),m.set(y),m.set(b,g),c.position.values=m,g/=3,a.defined(e.offsetAttribute)){let t=new Uint8Array(2*g);if(e.offsetAttribute===u.GeometryOffsetAttribute.TOP)t=t.fill(1,0,g);else{const i=e.offsetAttribute===u.GeometryOffsetAttribute.NONE?0:1;t=t.fill(i)}c.applyOffset=new l.GeometryAttribute({componentDatatype:o.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:t})}let A;const _=h.length,E=p.IndexDatatype.createTypedArray(m.length/3,2*(_+r.length));E.set(h);let C,G,T=_;for(A=0;A<_;A+=2){const e=h[A],t=h[A+1];E[T++]=e+g,E[T++]=t+g}for(A=0;A<r.length;A++)C=r[A],G=C+g,E[T++]=C,E[T++]=G;return{attributes:c,indices:E}}(m);else if(A=v(s.CorridorGeometryLibrary.computePositions(m),m.cornerType),A.attributes.position.values=f.PolygonPipeline.scaleToGeodeticHeight(A.attributes.position.values,y,c),a.defined(r._offsetAttribute)){const e=A.attributes.position.values.length,t=r._offsetAttribute===u.GeometryOffsetAttribute.NONE?0:1,i=new Uint8Array(e/3).fill(t);A.attributes.applyOffset=new l.GeometryAttribute({componentDatatype:o.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:i})}const _=A.attributes,E=t.BoundingSphere.fromVertices(_.position.values,void 0,3);return new l.Geometry({attributes:_,indices:A.indices,primitiveType:l.PrimitiveType.LINES,boundingSphere:E,offsetAttribute:r._offsetAttribute})},function(e,t){return a.defined(t)&&(e=w.unpack(e,t)),e._ellipsoid=i.Ellipsoid.clone(e._ellipsoid),w.createGeometry(e)}}));