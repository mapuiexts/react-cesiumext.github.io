define(["exports","./Matrix2-7a8e9daf","./Matrix3-b2351961","./defaultValue-f6d5e6da","./Transforms-f17097e5"],(function(t,e,n,i,h){"use strict";function r(t,e,n,h){this.x=i.defaultValue(t,0),this.y=i.defaultValue(e,0),this.width=i.defaultValue(n,0),this.height=i.defaultValue(h,0)}r.packedLength=4,r.pack=function(t,e,n){return n=i.defaultValue(n,0),e[n++]=t.x,e[n++]=t.y,e[n++]=t.width,e[n]=t.height,e},r.unpack=function(t,e,n){return e=i.defaultValue(e,0),i.defined(n)||(n=new r),n.x=t[e++],n.y=t[e++],n.width=t[e++],n.height=t[e],n},r.fromPoints=function(t,e){if(i.defined(e)||(e=new r),!i.defined(t)||0===t.length)return e.x=0,e.y=0,e.width=0,e.height=0,e;const n=t.length;let h=t[0].x,d=t[0].y,a=t[0].x,u=t[0].y;for(let e=1;e<n;e++){const n=t[e],i=n.x,o=n.y;h=Math.min(i,h),a=Math.max(i,a),d=Math.min(o,d),u=Math.max(o,u)}return e.x=h,e.y=d,e.width=a-h,e.height=u-d,e};const d=new h.GeographicProjection,a=new n.Cartographic,u=new n.Cartographic;r.fromRectangle=function(t,n,h){if(i.defined(h)||(h=new r),!i.defined(t))return h.x=0,h.y=0,h.width=0,h.height=0,h;const o=(n=i.defaultValue(n,d)).project(e.Rectangle.southwest(t,a)),c=n.project(e.Rectangle.northeast(t,u));return e.Cartesian2.subtract(c,o,c),h.x=o.x,h.y=o.y,h.width=c.x,h.height=c.y,h},r.clone=function(t,e){if(i.defined(t))return i.defined(e)?(e.x=t.x,e.y=t.y,e.width=t.width,e.height=t.height,e):new r(t.x,t.y,t.width,t.height)},r.union=function(t,e,n){i.defined(n)||(n=new r);const h=Math.min(t.x,e.x),d=Math.min(t.y,e.y),a=Math.max(t.x+t.width,e.x+e.width),u=Math.max(t.y+t.height,e.y+e.height);return n.x=h,n.y=d,n.width=a-h,n.height=u-d,n},r.expand=function(t,e,n){n=r.clone(t,n);const i=e.x-n.x,h=e.y-n.y;return i>n.width?n.width=i:i<0&&(n.width-=i,n.x=e.x),h>n.height?n.height=h:h<0&&(n.height-=h,n.y=e.y),n},r.intersect=function(t,e){const n=t.x,i=t.y,d=e.x,a=e.y;return n>d+e.width||n+t.width<d||i+t.height<a||i>a+e.height?h.Intersect.OUTSIDE:h.Intersect.INTERSECTING},r.equals=function(t,e){return t===e||i.defined(t)&&i.defined(e)&&t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height},r.prototype.clone=function(t){return r.clone(this,t)},r.prototype.intersect=function(t){return r.intersect(this,t)},r.prototype.equals=function(t){return r.equals(this,t)},t.BoundingRectangle=r}));