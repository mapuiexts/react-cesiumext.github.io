!function(){"use strict";const{Array:t,Object:e,Math:n,Error:r,Uint8Array:i,Uint16Array:c,Uint32Array:o,Int32Array:l,DataView:h,TextEncoder:p,crypto:d,postMessage:u}=globalThis,f=[];for(let t=0;256>t;t++){let e=t;for(let t=0;8>t;t++)1&e?e=e>>>1^3988292384:e>>>=1;f[t]=e}class g{constructor(t){this.crc=t||-1}append(t){let e=0|this.crc;for(let n=0,r=0|t.length;r>n;n++)e=e>>>8^f[255&(e^t[n])];this.crc=e}get(){return~this.crc}}const w={concat(t,e){if(0===t.length||0===e.length)return t.concat(e);const n=t[t.length-1],r=w.getPartial(n);return 32===r?t.concat(e):w._shiftRight(e,r,0|n,t.slice(0,t.length-1))},bitLength(t){const e=t.length;if(0===e)return 0;const n=t[e-1];return 32*(e-1)+w.getPartial(n)},clamp(t,e){if(32*t.length<e)return t;const r=(t=t.slice(0,n.ceil(e/32))).length;return e&=31,r>0&&e&&(t[r-1]=w.partial(e,t[r-1]&2147483648>>e-1,1)),t},partial:(t,e,n)=>32===t?e:(n?0|e:e<<32-t)+1099511627776*t,getPartial:t=>n.round(t/1099511627776)||32,_shiftRight(t,e,n,r){for(void 0===r&&(r=[]);e>=32;e-=32)r.push(n),n=0;if(0===e)return r.concat(t);for(let i=0;i<t.length;i++)r.push(n|t[i]>>>e),n=t[i]<<32-e;const i=t.length?t[t.length-1]:0,c=w.getPartial(i);return r.push(w.partial(e+c&31,e+c>32?n:r.pop(),1)),r}},y={bytes:{fromBits(t){const e=w.bitLength(t)/8,n=new i(e);let r;for(let i=0;e>i;i++)0==(3&i)&&(r=t[i/4]),n[i]=r>>>24,r<<=8;return n},toBits(t){const e=[];let n,r=0;for(n=0;n<t.length;n++)r=r<<8|t[n],3==(3&n)&&(e.push(r),r=0);return 3&n&&e.push(w.partial(8*(3&n),r)),e}}},_={sha1:function(t){t?(this._h=t._h.slice(0),this._buffer=t._buffer.slice(0),this._length=t._length):this.reset()}};_.sha1.prototype={blockSize:512,reset:function(){const t=this;return t._h=this._init.slice(0),t._buffer=[],t._length=0,t},update:function(t){const e=this;"string"==typeof t&&(t=y.utf8String.toBits(t));const n=e._buffer=w.concat(e._buffer,t),i=e._length,c=e._length=i+w.bitLength(t);if(c>9007199254740991)throw new r("Cannot hash more than 2^53 - 1 bits");const l=new o(n);let h=0;for(let t=e.blockSize+i-(e.blockSize+i&e.blockSize-1);c>=t;t+=e.blockSize)e._block(l.subarray(16*h,16*(h+1))),h+=1;return n.splice(0,16*h),e},finalize:function(){const t=this;let e=t._buffer;const r=t._h;e=w.concat(e,[w.partial(1,1)]);for(let t=e.length+2;15&t;t++)e.push(0);for(e.push(n.floor(t._length/4294967296)),e.push(0|t._length);e.length;)t._block(e.splice(0,16));return t.reset(),r},_init:[1732584193,4023233417,2562383102,271733878,3285377520],_key:[1518500249,1859775393,2400959708,3395469782],_f:(t,e,n,r)=>t>19?t>39?t>59?t>79?void 0:e^n^r:e&n|e&r|n&r:e^n^r:e&n|~e&r,_S:(t,e)=>e<<t|e>>>32-t,_block:function(e){const r=this,i=r._h,c=t(80);for(let t=0;16>t;t++)c[t]=e[t];let o=i[0],l=i[1],h=i[2],p=i[3],d=i[4];for(let t=0;79>=t;t++){16>t||(c[t]=r._S(1,c[t-3]^c[t-8]^c[t-14]^c[t-16]));const e=r._S(5,o)+r._f(t,l,h,p)+d+c[t]+r._key[n.floor(t/20)]|0;d=p,p=h,h=r._S(30,l),l=o,o=e}i[0]=i[0]+o|0,i[1]=i[1]+l|0,i[2]=i[2]+h|0,i[3]=i[3]+p|0,i[4]=i[4]+d|0}};const m={getRandomValues(t){const e=new o(t.buffer),s=t=>{let e=987654321;const r=4294967295;return()=>(e=36969*(65535&e)+(e>>16)&r,(((e<<16)+(t=18e3*(65535&t)+(t>>16)&r)&r)/4294967296+.5)*(n.random()>.5?1:-1))};for(let r,i=0;i<t.length;i+=4){const t=s(4294967296*(r||n.random()));r=987654071*t(),e[i/4]=4294967296*t()|0}return t}},b={importKey:t=>new b.hmacSha1(y.bytes.toBits(t)),pbkdf2(t,e,n,i){if(n=n||1e4,0>i||0>n)throw new r("invalid params to pbkdf2");const c=1+(i>>5)<<2;let o,l,p,d,u;const f=new ArrayBuffer(c),g=new h(f);let _=0;const m=w;for(e=y.bytes.toBits(e),u=1;(c||1)>_;u++){for(o=l=t.encrypt(m.concat(e,[u])),p=1;n>p;p++)for(l=t.encrypt(l),d=0;d<l.length;d++)o[d]^=l[d];for(p=0;(c||1)>_&&p<o.length;p++)g.setInt32(_,o[p]),_+=4}return f.slice(0,i/8)},hmacSha1:class{constructor(t){const e=this,n=e._hash=_.sha1,r=[[],[]],i=n.prototype.blockSize/32;e._baseHash=[new n,new n],t.length>i&&(t=n.hash(t));for(let e=0;i>e;e++)r[0][e]=909522486^t[e],r[1][e]=1549556828^t[e];e._baseHash[0].update(r[0]),e._baseHash[1].update(r[1]),e._resultHash=new n(e._baseHash[0])}reset(){const t=this;t._resultHash=new t._hash(t._baseHash[0]),t._updated=!1}update(t){this._updated=!0,this._resultHash.update(t)}digest(){const t=this,e=t._resultHash.finalize(),n=new t._hash(t._baseHash[1]).update(e).finalize();return t.reset(),n}encrypt(t){if(this._updated)throw new r("encrypt on already updated hmac called!");return this.update(t),this.digest(t)}}},k="Invalid pasword",v=16,z={name:"PBKDF2"},C=e.assign({hash:{name:"HMAC"}},z),S=e.assign({iterations:1e3,hash:{name:"SHA-1"}},z),B=["deriveBits"],I=[8,12,16],D=[16,24,32],V=10,H=[0,0,0,0],K=void 0!==d,A=K&&void 0!==d.subtle,R=y.bytes,W=class{constructor(t){const e=this;e._tables=[[[],[],[],[],[]],[[],[],[],[],[]]],e._tables[0][0][0]||e._precompute();const n=e._tables[0][4],i=e._tables[1],c=t.length;let o,l,h,p=1;if(4!==c&&6!==c&&8!==c)throw new r("invalid aes key size");for(e._key=[l=t.slice(0),h=[]],o=c;4*c+28>o;o++){let t=l[o-1];(o%c==0||8===c&&o%c==4)&&(t=n[t>>>24]<<24^n[t>>16&255]<<16^n[t>>8&255]<<8^n[255&t],o%c==0&&(t=t<<8^t>>>24^p<<24,p=p<<1^283*(p>>7))),l[o]=l[o-c]^t}for(let t=0;o;t++,o--){const e=l[3&t?o:o-4];h[t]=4>=o||4>t?e:i[0][n[e>>>24]]^i[1][n[e>>16&255]]^i[2][n[e>>8&255]]^i[3][n[255&e]]}}encrypt(t){return this._crypt(t,0)}decrypt(t){return this._crypt(t,1)}_precompute(){const t=this._tables[0],e=this._tables[1],n=t[4],r=e[4],i=[],c=[];let o,l,h,p;for(let t=0;256>t;t++)c[(i[t]=t<<1^283*(t>>7))^t]=t;for(let d=o=0;!n[d];d^=l||1,o=c[o]||1){let c=o^o<<1^o<<2^o<<3^o<<4;c=c>>8^255&c^99,n[d]=c,r[c]=d,p=i[h=i[l=i[d]]];let u=16843009*p^65537*h^257*l^16843008*d,f=257*i[c]^16843008*c;for(let n=0;4>n;n++)t[n][d]=f=f<<24^f>>>8,e[n][c]=u=u<<24^u>>>8}for(let n=0;5>n;n++)t[n]=t[n].slice(0),e[n]=e[n].slice(0)}_crypt(t,e){if(4!==t.length)throw new r("invalid aes block size");const n=this._key[e],i=n.length/4-2,c=[0,0,0,0],o=this._tables[e],l=o[0],h=o[1],p=o[2],d=o[3],u=o[4];let f,g,w,y=t[0]^n[0],_=t[e?3:1]^n[1],m=t[2]^n[2],b=t[e?1:3]^n[3],k=4;for(let t=0;i>t;t++)f=l[y>>>24]^h[_>>16&255]^p[m>>8&255]^d[255&b]^n[k],g=l[_>>>24]^h[m>>16&255]^p[b>>8&255]^d[255&y]^n[k+1],w=l[m>>>24]^h[b>>16&255]^p[y>>8&255]^d[255&_]^n[k+2],b=l[b>>>24]^h[y>>16&255]^p[_>>8&255]^d[255&m]^n[k+3],k+=4,y=f,_=g,m=w;for(let t=0;4>t;t++)c[e?3&-t:t]=u[y>>>24]<<24^u[_>>16&255]<<16^u[m>>8&255]<<8^u[255&b]^n[k++],f=y,y=_,_=m,m=b,b=f;return c}},T=class{constructor(t,e){this._prf=t,this._initIv=e,this._iv=e}reset(){this._iv=this._initIv}update(t){return this.calculate(this._prf,t,this._iv)}incWord(t){if(255==(t>>24&255)){let e=t>>16&255,n=t>>8&255,r=255&t;255===e?(e=0,255===n?(n=0,255===r?r=0:++r):++n):++e,t=0,t+=e<<16,t+=n<<8,t+=r}else t+=1<<24;return t}incCounter(t){0===(t[0]=this.incWord(t[0]))&&(t[1]=this.incWord(t[1]))}calculate(t,e,n){let r;if(!(r=e.length))return[];const i=w.bitLength(e);for(let i=0;r>i;i+=4){this.incCounter(n);const r=t.encrypt(n);e[i]^=r[0],e[i+1]^=r[1],e[i+2]^=r[2],e[i+3]^=r[3]}return w.clamp(e,i)}},U=b.hmacSha1;class M{constructor(t,n,r){e.assign(this,{password:t,signed:n,strength:r-1,pendingInput:new i(0)})}async append(e){const n=this;if(n.password){const i=E(e,0,I[n.strength]+2);await(async(t,e,n)=>{await L(t,n,E(e,0,I[t.strength]));const i=E(e,I[t.strength]),c=t.keys.passwordVerification;if(c[0]!=i[0]||c[1]!=i[1])throw new r(k)})(n,i,n.password),n.password=null,n.aesCtrGladman=new T(new W(n.keys.key),t.from(H)),n.hmac=new U(n.keys.authentication),e=E(e,I[n.strength]+2)}return G(n,e,new i(e.length-V-(e.length-V)%v),0,V,!0)}flush(){const t=this,e=t.pendingInput,n=E(e,0,e.length-V),r=E(e,e.length-V);let c=new i(0);if(n.length){const e=R.toBits(n);t.hmac.update(e);const r=t.aesCtrGladman.update(e);c=R.fromBits(r)}let o=!0;if(t.signed){const e=E(R.fromBits(t.hmac.digest()),0,V);for(let t=0;V>t;t++)e[t]!=r[t]&&(o=!1)}return{valid:o,data:c}}}class j{constructor(t,n){e.assign(this,{password:t,strength:n-1,pendingInput:new i(0)})}async append(e){const n=this;let r=new i(0);n.password&&(r=await(async(t,e)=>{const n=(r=new i(I[t.strength]),K&&"function"==typeof d.getRandomValues?d.getRandomValues(r):m.getRandomValues(r));var r;return await L(t,e,n),P(n,t.keys.passwordVerification)})(n,n.password),n.password=null,n.aesCtrGladman=new T(new W(n.keys.key),t.from(H)),n.hmac=new U(n.keys.authentication));const c=new i(r.length+e.length-e.length%v);return c.set(r,0),G(n,e,c,r.length,0)}flush(){const t=this;let e=new i(0);if(t.pendingInput.length){const n=t.aesCtrGladman.update(R.toBits(t.pendingInput));t.hmac.update(n),e=R.fromBits(n)}const n=E(R.fromBits(t.hmac.digest()),0,V);return{data:P(e,n),signature:n}}}function G(t,e,n,r,c,o){const l=e.length-c;let h;for(t.pendingInput.length&&(e=P(t.pendingInput,e),n=((t,e)=>{if(e&&e>t.length){const n=t;(t=new i(e)).set(n,0)}return t})(n,l-l%v)),h=0;l-v>=h;h+=v){const i=R.toBits(E(e,h,h+v));o&&t.hmac.update(i);const c=t.aesCtrGladman.update(i);o||t.hmac.update(c),n.set(R.fromBits(c),h+r)}return t.pendingInput=E(e,h),n}async function L(t,n,r){const c=(t=>{if(void 0===p){const e=new i((t=unescape(encodeURIComponent(t))).length);for(let n=0;n<e.length;n++)e[n]=t.charCodeAt(n);return e}return(new p).encode(t)})(n),o=await((t,e,n,r,i)=>K&&A&&"function"==typeof d.subtle.importKey?d.subtle.importKey("raw",e,n,!1,i):b.importKey(e))(0,c,C,0,B),l=await(async(t,e,n)=>K&&A&&"function"==typeof d.subtle.deriveBits?await d.subtle.deriveBits(t,e,n):b.pbkdf2(e,t.salt,S.iterations,n))(e.assign({salt:r},S),o,8*(2*D[t.strength]+2)),h=new i(l);t.keys={key:R.toBits(E(h,0,D[t.strength])),authentication:R.toBits(E(h,D[t.strength],2*D[t.strength])),passwordVerification:E(h,2*D[t.strength])}}function P(t,e){let n=t;return t.length+e.length&&(n=new i(t.length+e.length),n.set(t,0),n.set(e,t.length)),n}function E(t,e,n){return t.subarray(e,n)}class X{constructor(t,n){e.assign(this,{password:t,passwordVerification:n}),O(this,t)}append(t){const e=this;if(e.password){const n=x(e,t.subarray(0,12));if(e.password=null,n[11]!=e.passwordVerification)throw new r(k);t=t.subarray(12)}return x(e,t)}flush(){return{valid:!0,data:new i(0)}}}class Y{constructor(t,n){e.assign(this,{password:t,passwordVerification:n}),O(this,t)}append(t){const e=this;let n,r;if(e.password){e.password=null;const c=d.getRandomValues(new i(12));c[11]=e.passwordVerification,n=new i(t.length+c.length),n.set(F(e,c),0),r=12}else n=new i(t.length),r=0;return n.set(F(e,t),r),n}flush(){return{data:new i(0)}}}function x(t,e){const n=new i(e.length);for(let r=0;r<e.length;r++)n[r]=J(t)^e[r],q(t,n[r]);return n}function F(t,e){const n=new i(e.length);for(let r=0;r<e.length;r++)n[r]=J(t)^e[r],q(t,e[r]);return n}function O(t,e){t.keys=[305419896,591751049,878082192],t.crcKey0=new g(t.keys[0]),t.crcKey2=new g(t.keys[2]);for(let n=0;n<e.length;n++)q(t,e.charCodeAt(n))}function q(t,e){t.crcKey0.append([e]),t.keys[0]=~t.crcKey0.get(),t.keys[1]=Q(t.keys[1]+N(t.keys[0])),t.keys[1]=Q(n.imul(t.keys[1],134775813)+1),t.crcKey2.append([t.keys[1]>>>24]),t.keys[2]=~t.crcKey2.get()}function J(t){const e=2|t.keys[2];return N(n.imul(e,1^e)>>>8)}function N(t){return 255&t}function Q(t){return 4294967295&t}const Z="deflate",$="inflate",tt="Invalid signature";class et{constructor(t,{signature:n,password:r,signed:i,compressed:c,zipCrypto:o,passwordVerification:l,encryptionStrength:h},{chunkSize:p}){const d=!!r;e.assign(this,{signature:n,encrypted:d,signed:i,compressed:c,inflate:c&&new t({chunkSize:p}),crc32:i&&new g,zipCrypto:o,decrypt:d&&o?new X(r,l):new M(r,i,h)})}async append(t){const e=this;return e.encrypted&&t.length&&(t=await e.decrypt.append(t)),e.compressed&&t.length&&(t=await e.inflate.append(t)),(!e.encrypted||e.zipCrypto)&&e.signed&&t.length&&e.crc32.append(t),t}async flush(){const t=this;let e,n=new i(0);if(t.encrypted){const e=t.decrypt.flush();if(!e.valid)throw new r(tt);n=e.data}if((!t.encrypted||t.zipCrypto)&&t.signed){const n=new h(new i(4).buffer);if(e=t.crc32.get(),n.setUint32(0,e),t.signature!=n.getUint32(0,!1))throw new r(tt)}return t.compressed&&(n=await t.inflate.append(n)||new i(0),await t.inflate.flush()),{data:n,signature:e}}}class nt{constructor(t,{encrypted:n,signed:r,compressed:i,level:c,zipCrypto:o,password:l,passwordVerification:h,encryptionStrength:p},{chunkSize:d}){e.assign(this,{encrypted:n,signed:r,compressed:i,deflate:i&&new t({level:c||5,chunkSize:d}),crc32:r&&new g,zipCrypto:o,encrypt:n&&o?new Y(l,h):new j(l,p)})}async append(t){const e=this;let n=t;return e.compressed&&t.length&&(n=await e.deflate.append(t)),e.encrypted&&n.length&&(n=await e.encrypt.append(n)),(!e.encrypted||e.zipCrypto)&&e.signed&&t.length&&e.crc32.append(t),n}async flush(){const t=this;let e,n=new i(0);if(t.compressed&&(n=await t.deflate.flush()||new i(0)),t.encrypted){n=await t.encrypt.append(n);const r=t.encrypt.flush();e=r.signature;const c=new i(n.length+r.data.length);c.set(n,0),c.set(r.data,n.length),n=c}return t.encrypted&&!t.zipCrypto||!t.signed||(e=t.crc32.get()),{data:n,signature:e}}}const at={init(t){t.scripts&&t.scripts.length&&importScripts.apply(void 0,t.scripts);const e=t.options;let n;self.initCodec&&self.initCodec(),e.codecType.startsWith(Z)?n=self.Deflate:e.codecType.startsWith($)&&(n=self.Inflate),rt=((t,e,n)=>e.codecType.startsWith(Z)?new nt(t,e,n):e.codecType.startsWith($)?new et(t,e,n):void 0)(n,e,t.config)},append:async t=>({data:await rt.append(t.data)}),flush:()=>rt.flush()};let rt;function st(t,n,r){return class{constructor(c){const o=this;o.codec=new t(e.assign({},n,c)),r(o.codec,(t=>{if(o.pendingData){const e=o.pendingData;o.pendingData=new i(e.length+t.length),o.pendingData.set(e,0),o.pendingData.set(t,e.length)}else o.pendingData=new i(t)}))}append(t){return this.codec.push(t),a(this)}flush(){return this.codec.push(new i(0),!0),a(this)}};function a(t){if(t.pendingData){const e=t.pendingData;return t.pendingData=null,e}return new i(0)}}addEventListener("message",(async t=>{const e=t.data,n=e.type,r=at[n];if(r)try{e.data&&(e.data=new i(e.data));const t=await r(e)||{};if(t.type=n,t.data)try{t.data=t.data.buffer,u(t,[t.data])}catch(e){u(t)}else u(t)}catch(t){u({type:n,error:{message:t.message,stack:t.stack}})}})),self.initCodec=()=>{const{Deflate:t,Inflate:e}=((t,e={},n)=>({Deflate:st(t.Deflate,e.deflate,n),Inflate:st(t.Inflate,e.inflate,n)}))(pako,{deflate:{raw:!0},inflate:{raw:!0}},((t,e)=>t.onData=e));self.Deflate=t,self.Inflate=e}}();