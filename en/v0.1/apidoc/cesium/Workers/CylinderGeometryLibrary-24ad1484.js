/*! For license information please see CylinderGeometryLibrary-24ad1484.js.LICENSE.txt */
define(["exports","./ComponentDatatype-e7fbe225"],(function(t,e){"use strict";const n={computePositions:function(t,n,o,s,r){const i=.5*t,c=-i,a=s+s,u=new Float64Array(3*(r?2*a:a));let f,y=0,m=0;const p=r?3*a:0,h=r?3*(a+s):3*s;for(f=0;f<s;f++){const t=f/s*e.CesiumMath.TWO_PI,a=Math.cos(t),l=Math.sin(t),C=a*o,M=l*o,b=a*n,d=l*n;u[m+p]=C,u[m+p+1]=M,u[m+p+2]=c,u[m+h]=b,u[m+h+1]=d,u[m+h+2]=i,m+=3,r&&(u[y++]=C,u[y++]=M,u[y++]=c,u[y++]=b,u[y++]=d,u[y++]=i)}return u}};t.CylinderGeometryLibrary=n}));