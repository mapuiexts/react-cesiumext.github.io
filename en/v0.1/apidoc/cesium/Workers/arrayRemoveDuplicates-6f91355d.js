/*! For license information please see arrayRemoveDuplicates-6f91355d.js.LICENSE.txt */
define(["exports","./RuntimeError-4f8ec8a2","./defaultValue-97284df2","./ComponentDatatype-e7fbe225"],(function(e,n,t,i){"use strict";const d=i.CesiumMath.EPSILON10;e.arrayRemoveDuplicates=function(e,n,i,f){if(!t.defined(e))return;i=t.defaultValue(i,!1);const u=t.defined(f),r=e.length;if(r<2)return e;let s,l,a,c=e[0],o=0,p=-1;for(s=1;s<r;++s)l=e[s],n(c,l,d)?(t.defined(a)||(a=e.slice(0,s),o=s-1,p=0),u&&f.push(s)):(t.defined(a)&&(a.push(l),o=s,u&&(p=f.length)),c=l);return i&&n(e[0],e[r-1],d)&&(u&&(t.defined(a)?f.splice(p,0,o):f.push(r-1)),t.defined(a)?a.length-=1:a=e.slice(0,-1)),t.defined(a)?a:e}}));