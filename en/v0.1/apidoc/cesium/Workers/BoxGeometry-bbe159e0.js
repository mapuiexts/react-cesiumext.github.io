define(["exports","./Transforms-f17097e5","./Matrix3-b2351961","./ComponentDatatype-ab629b88","./defaultValue-f6d5e6da","./GeometryAttribute-9c1a6bab","./GeometryAttributes-1e4ddcd2","./GeometryOffsetAttribute-2579b8d2","./VertexFormat-fbdec922"],(function(t,e,n,a,r,i,o,m,u){"use strict";const s=new n.Cartesian3;function y(t){const e=(t=r.defaultValue(t,r.defaultValue.EMPTY_OBJECT)).minimum,a=t.maximum,i=r.defaultValue(t.vertexFormat,u.VertexFormat.DEFAULT);this._minimum=n.Cartesian3.clone(e),this._maximum=n.Cartesian3.clone(a),this._vertexFormat=i,this._offsetAttribute=t.offsetAttribute,this._workerName="createBoxGeometry"}y.fromDimensions=function(t){const e=(t=r.defaultValue(t,r.defaultValue.EMPTY_OBJECT)).dimensions,a=n.Cartesian3.multiplyByScalar(e,.5,new n.Cartesian3);return new y({minimum:n.Cartesian3.negate(a,new n.Cartesian3),maximum:a,vertexFormat:t.vertexFormat,offsetAttribute:t.offsetAttribute})},y.fromAxisAlignedBoundingBox=function(t){return new y({minimum:t.minimum,maximum:t.maximum})},y.packedLength=2*n.Cartesian3.packedLength+u.VertexFormat.packedLength+1,y.pack=function(t,e,a){return a=r.defaultValue(a,0),n.Cartesian3.pack(t._minimum,e,a),n.Cartesian3.pack(t._maximum,e,a+n.Cartesian3.packedLength),u.VertexFormat.pack(t._vertexFormat,e,a+2*n.Cartesian3.packedLength),e[a+2*n.Cartesian3.packedLength+u.VertexFormat.packedLength]=r.defaultValue(t._offsetAttribute,-1),e};const c=new n.Cartesian3,p=new n.Cartesian3,x=new u.VertexFormat,f={minimum:c,maximum:p,vertexFormat:x,offsetAttribute:void 0};let l;y.unpack=function(t,e,a){e=r.defaultValue(e,0);const i=n.Cartesian3.unpack(t,e,c),o=n.Cartesian3.unpack(t,e+n.Cartesian3.packedLength,p),m=u.VertexFormat.unpack(t,e+2*n.Cartesian3.packedLength,x),s=t[e+2*n.Cartesian3.packedLength+u.VertexFormat.packedLength];return r.defined(a)?(a._minimum=n.Cartesian3.clone(i,a._minimum),a._maximum=n.Cartesian3.clone(o,a._maximum),a._vertexFormat=u.VertexFormat.clone(m,a._vertexFormat),a._offsetAttribute=-1===s?void 0:s,a):(f.offsetAttribute=-1===s?void 0:s,new y(f))},y.createGeometry=function(t){const u=t._minimum,c=t._maximum,p=t._vertexFormat;if(n.Cartesian3.equals(u,c))return;const x=new o.GeometryAttributes;let f,l;if(p.position&&(p.st||p.normal||p.tangent||p.bitangent)){if(p.position&&(l=new Float64Array(72),l[0]=u.x,l[1]=u.y,l[2]=c.z,l[3]=c.x,l[4]=u.y,l[5]=c.z,l[6]=c.x,l[7]=c.y,l[8]=c.z,l[9]=u.x,l[10]=c.y,l[11]=c.z,l[12]=u.x,l[13]=u.y,l[14]=u.z,l[15]=c.x,l[16]=u.y,l[17]=u.z,l[18]=c.x,l[19]=c.y,l[20]=u.z,l[21]=u.x,l[22]=c.y,l[23]=u.z,l[24]=c.x,l[25]=u.y,l[26]=u.z,l[27]=c.x,l[28]=c.y,l[29]=u.z,l[30]=c.x,l[31]=c.y,l[32]=c.z,l[33]=c.x,l[34]=u.y,l[35]=c.z,l[36]=u.x,l[37]=u.y,l[38]=u.z,l[39]=u.x,l[40]=c.y,l[41]=u.z,l[42]=u.x,l[43]=c.y,l[44]=c.z,l[45]=u.x,l[46]=u.y,l[47]=c.z,l[48]=u.x,l[49]=c.y,l[50]=u.z,l[51]=c.x,l[52]=c.y,l[53]=u.z,l[54]=c.x,l[55]=c.y,l[56]=c.z,l[57]=u.x,l[58]=c.y,l[59]=c.z,l[60]=u.x,l[61]=u.y,l[62]=u.z,l[63]=c.x,l[64]=u.y,l[65]=u.z,l[66]=c.x,l[67]=u.y,l[68]=c.z,l[69]=u.x,l[70]=u.y,l[71]=c.z,x.position=new i.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:l})),p.normal){const t=new Float32Array(72);t[0]=0,t[1]=0,t[2]=1,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=1,t[9]=0,t[10]=0,t[11]=1,t[12]=0,t[13]=0,t[14]=-1,t[15]=0,t[16]=0,t[17]=-1,t[18]=0,t[19]=0,t[20]=-1,t[21]=0,t[22]=0,t[23]=-1,t[24]=1,t[25]=0,t[26]=0,t[27]=1,t[28]=0,t[29]=0,t[30]=1,t[31]=0,t[32]=0,t[33]=1,t[34]=0,t[35]=0,t[36]=-1,t[37]=0,t[38]=0,t[39]=-1,t[40]=0,t[41]=0,t[42]=-1,t[43]=0,t[44]=0,t[45]=-1,t[46]=0,t[47]=0,t[48]=0,t[49]=1,t[50]=0,t[51]=0,t[52]=1,t[53]=0,t[54]=0,t[55]=1,t[56]=0,t[57]=0,t[58]=1,t[59]=0,t[60]=0,t[61]=-1,t[62]=0,t[63]=0,t[64]=-1,t[65]=0,t[66]=0,t[67]=-1,t[68]=0,t[69]=0,t[70]=-1,t[71]=0,x.normal=new i.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:t})}if(p.st){const t=new Float32Array(48);t[0]=0,t[1]=0,t[2]=1,t[3]=0,t[4]=1,t[5]=1,t[6]=0,t[7]=1,t[8]=1,t[9]=0,t[10]=0,t[11]=0,t[12]=0,t[13]=1,t[14]=1,t[15]=1,t[16]=0,t[17]=0,t[18]=1,t[19]=0,t[20]=1,t[21]=1,t[22]=0,t[23]=1,t[24]=1,t[25]=0,t[26]=0,t[27]=0,t[28]=0,t[29]=1,t[30]=1,t[31]=1,t[32]=1,t[33]=0,t[34]=0,t[35]=0,t[36]=0,t[37]=1,t[38]=1,t[39]=1,t[40]=0,t[41]=0,t[42]=1,t[43]=0,t[44]=1,t[45]=1,t[46]=0,t[47]=1,x.st=new i.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:t})}if(p.tangent){const t=new Float32Array(72);t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t[6]=1,t[7]=0,t[8]=0,t[9]=1,t[10]=0,t[11]=0,t[12]=-1,t[13]=0,t[14]=0,t[15]=-1,t[16]=0,t[17]=0,t[18]=-1,t[19]=0,t[20]=0,t[21]=-1,t[22]=0,t[23]=0,t[24]=0,t[25]=1,t[26]=0,t[27]=0,t[28]=1,t[29]=0,t[30]=0,t[31]=1,t[32]=0,t[33]=0,t[34]=1,t[35]=0,t[36]=0,t[37]=-1,t[38]=0,t[39]=0,t[40]=-1,t[41]=0,t[42]=0,t[43]=-1,t[44]=0,t[45]=0,t[46]=-1,t[47]=0,t[48]=-1,t[49]=0,t[50]=0,t[51]=-1,t[52]=0,t[53]=0,t[54]=-1,t[55]=0,t[56]=0,t[57]=-1,t[58]=0,t[59]=0,t[60]=1,t[61]=0,t[62]=0,t[63]=1,t[64]=0,t[65]=0,t[66]=1,t[67]=0,t[68]=0,t[69]=1,t[70]=0,t[71]=0,x.tangent=new i.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:t})}if(p.bitangent){const t=new Float32Array(72);t[0]=0,t[1]=1,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=1,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=1,t[14]=0,t[15]=0,t[16]=1,t[17]=0,t[18]=0,t[19]=1,t[20]=0,t[21]=0,t[22]=1,t[23]=0,t[24]=0,t[25]=0,t[26]=1,t[27]=0,t[28]=0,t[29]=1,t[30]=0,t[31]=0,t[32]=1,t[33]=0,t[34]=0,t[35]=1,t[36]=0,t[37]=0,t[38]=1,t[39]=0,t[40]=0,t[41]=1,t[42]=0,t[43]=0,t[44]=1,t[45]=0,t[46]=0,t[47]=1,t[48]=0,t[49]=0,t[50]=1,t[51]=0,t[52]=0,t[53]=1,t[54]=0,t[55]=0,t[56]=1,t[57]=0,t[58]=0,t[59]=1,t[60]=0,t[61]=0,t[62]=1,t[63]=0,t[64]=0,t[65]=1,t[66]=0,t[67]=0,t[68]=1,t[69]=0,t[70]=0,t[71]=1,x.bitangent=new i.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:t})}f=new Uint16Array(36),f[0]=0,f[1]=1,f[2]=2,f[3]=0,f[4]=2,f[5]=3,f[6]=6,f[7]=5,f[8]=4,f[9]=7,f[10]=6,f[11]=4,f[12]=8,f[13]=9,f[14]=10,f[15]=8,f[16]=10,f[17]=11,f[18]=14,f[19]=13,f[20]=12,f[21]=15,f[22]=14,f[23]=12,f[24]=18,f[25]=17,f[26]=16,f[27]=19,f[28]=18,f[29]=16,f[30]=20,f[31]=21,f[32]=22,f[33]=20,f[34]=22,f[35]=23}else l=new Float64Array(24),l[0]=u.x,l[1]=u.y,l[2]=u.z,l[3]=c.x,l[4]=u.y,l[5]=u.z,l[6]=c.x,l[7]=c.y,l[8]=u.z,l[9]=u.x,l[10]=c.y,l[11]=u.z,l[12]=u.x,l[13]=u.y,l[14]=c.z,l[15]=c.x,l[16]=u.y,l[17]=c.z,l[18]=c.x,l[19]=c.y,l[20]=c.z,l[21]=u.x,l[22]=c.y,l[23]=c.z,x.position=new i.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:l}),f=new Uint16Array(36),f[0]=4,f[1]=5,f[2]=6,f[3]=4,f[4]=6,f[5]=7,f[6]=1,f[7]=0,f[8]=3,f[9]=1,f[10]=3,f[11]=2,f[12]=1,f[13]=6,f[14]=5,f[15]=1,f[16]=2,f[17]=6,f[18]=2,f[19]=3,f[20]=7,f[21]=2,f[22]=7,f[23]=6,f[24]=3,f[25]=0,f[26]=4,f[27]=3,f[28]=4,f[29]=7,f[30]=0,f[31]=1,f[32]=5,f[33]=0,f[34]=5,f[35]=4;const A=n.Cartesian3.subtract(c,u,s),d=.5*n.Cartesian3.magnitude(A);if(r.defined(t._offsetAttribute)){const e=l.length,n=t._offsetAttribute===m.GeometryOffsetAttribute.NONE?0:1,r=new Uint8Array(e/3).fill(n);x.applyOffset=new i.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:r})}return new i.Geometry({attributes:x,indices:f,primitiveType:i.PrimitiveType.TRIANGLES,boundingSphere:new e.BoundingSphere(n.Cartesian3.ZERO,d),offsetAttribute:t._offsetAttribute})},y.getUnitBox=function(){return r.defined(l)||(l=y.createGeometry(y.fromDimensions({dimensions:new n.Cartesian3(1,1,1),vertexFormat:u.VertexFormat.POSITION_ONLY}))),l},t.BoxGeometry=y}));