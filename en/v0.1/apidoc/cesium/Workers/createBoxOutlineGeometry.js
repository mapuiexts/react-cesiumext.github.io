/*! For license information please see createBoxOutlineGeometry.js.LICENSE.txt */
define(["./Transforms-d3d3b2a9","./Matrix2-73789715","./RuntimeError-4f8ec8a2","./ComponentDatatype-e7fbe225","./defaultValue-97284df2","./GeometryAttribute-fd1d7e90","./GeometryAttributes-734a3446","./GeometryOffsetAttribute-59b14f45","./_commonjsHelpers-3aae1032-65601a27","./combine-d11b1f00","./WebGLConstants-6da700a2"],(function(e,t,n,a,i,r,o,u,s,m,f){"use strict";const c=new t.Cartesian3;function d(e){const n=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).minimum,a=e.maximum;this._min=t.Cartesian3.clone(n),this._max=t.Cartesian3.clone(a),this._offsetAttribute=e.offsetAttribute,this._workerName="createBoxOutlineGeometry"}d.fromDimensions=function(e){const n=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).dimensions,a=t.Cartesian3.multiplyByScalar(n,.5,new t.Cartesian3);return new d({minimum:t.Cartesian3.negate(a,new t.Cartesian3),maximum:a,offsetAttribute:e.offsetAttribute})},d.fromAxisAlignedBoundingBox=function(e){return new d({minimum:e.minimum,maximum:e.maximum})},d.packedLength=2*t.Cartesian3.packedLength+1,d.pack=function(e,n,a){return a=i.defaultValue(a,0),t.Cartesian3.pack(e._min,n,a),t.Cartesian3.pack(e._max,n,a+t.Cartesian3.packedLength),n[a+2*t.Cartesian3.packedLength]=i.defaultValue(e._offsetAttribute,-1),n};const p=new t.Cartesian3,l=new t.Cartesian3,y={minimum:p,maximum:l,offsetAttribute:void 0};return d.unpack=function(e,n,a){n=i.defaultValue(n,0);const r=t.Cartesian3.unpack(e,n,p),o=t.Cartesian3.unpack(e,n+t.Cartesian3.packedLength,l),u=e[n+2*t.Cartesian3.packedLength];return i.defined(a)?(a._min=t.Cartesian3.clone(r,a._min),a._max=t.Cartesian3.clone(o,a._max),a._offsetAttribute=-1===u?void 0:u,a):(y.offsetAttribute=-1===u?void 0:u,new d(y))},d.createGeometry=function(n){const s=n._min,m=n._max;if(t.Cartesian3.equals(s,m))return;const f=new o.GeometryAttributes,p=new Uint16Array(24),l=new Float64Array(24);l[0]=s.x,l[1]=s.y,l[2]=s.z,l[3]=m.x,l[4]=s.y,l[5]=s.z,l[6]=m.x,l[7]=m.y,l[8]=s.z,l[9]=s.x,l[10]=m.y,l[11]=s.z,l[12]=s.x,l[13]=s.y,l[14]=m.z,l[15]=m.x,l[16]=s.y,l[17]=m.z,l[18]=m.x,l[19]=m.y,l[20]=m.z,l[21]=s.x,l[22]=m.y,l[23]=m.z,f.position=new r.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:l}),p[0]=4,p[1]=5,p[2]=5,p[3]=6,p[4]=6,p[5]=7,p[6]=7,p[7]=4,p[8]=0,p[9]=1,p[10]=1,p[11]=2,p[12]=2,p[13]=3,p[14]=3,p[15]=0,p[16]=0,p[17]=4,p[18]=1,p[19]=5,p[20]=2,p[21]=6,p[22]=3,p[23]=7;const y=t.Cartesian3.subtract(m,s,c),b=.5*t.Cartesian3.magnitude(y);if(i.defined(n._offsetAttribute)){const e=l.length,t=n._offsetAttribute===u.GeometryOffsetAttribute.NONE?0:1,i=new Uint8Array(e/3).fill(t);f.applyOffset=new r.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:i})}return new r.Geometry({attributes:f,indices:p,primitiveType:r.PrimitiveType.LINES,boundingSphere:new e.BoundingSphere(t.Cartesian3.ZERO,b),offsetAttribute:n._offsetAttribute})},function(e,t){return i.defined(t)&&(e=d.unpack(e,t)),d.createGeometry(e)}}));