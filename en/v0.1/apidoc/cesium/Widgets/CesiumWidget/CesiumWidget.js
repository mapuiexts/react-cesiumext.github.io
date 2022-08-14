import buildModuleUrl from"../../Core/buildModuleUrl.js";import Cartesian3 from"../../Core/Cartesian3.js";import Clock from"../../Core/Clock.js";import defaultValue from"../../Core/defaultValue.js";import defined from"../../Core/defined.js";import destroyObject from"../../Core/destroyObject.js";import DeveloperError from"../../Core/DeveloperError.js";import Ellipsoid from"../../Core/Ellipsoid.js";import FeatureDetection from"../../Core/FeatureDetection.js";import formatError from"../../Core/formatError.js";import requestAnimationFrame from"../../Core/requestAnimationFrame.js";import ScreenSpaceEventHandler from"../../Core/ScreenSpaceEventHandler.js";import createWorldImagery from"../../Scene/createWorldImagery.js";import Globe from"../../Scene/Globe.js";import Moon from"../../Scene/Moon.js";import Scene from"../../Scene/Scene.js";import SceneMode from"../../Scene/SceneMode.js";import ShadowMode from"../../Scene/ShadowMode.js";import SkyAtmosphere from"../../Scene/SkyAtmosphere.js";import SkyBox from"../../Scene/SkyBox.js";import Sun from"../../Scene/Sun.js";import getElement from"../getElement.js";function getDefaultSkyBoxUrl(e){return buildModuleUrl(`Assets/Textures/SkyBox/tycho2t3_80_${e}.jpg`)}function startRenderLoop(e){e._renderLoopRunning=!0;let t=0;requestAnimationFrame((function render(r){if(!e.isDestroyed())if(e._useDefaultRenderLoop)try{const n=e._targetFrameRate;if(defined(n)){const o=1e3/n,i=r-t;i>o&&(e.resize(),e.render(),t=r-i%o),requestAnimationFrame(render)}else e.resize(),e.render(),requestAnimationFrame(render)}catch(t){if(e._useDefaultRenderLoop=!1,e._renderLoopRunning=!1,e._showRenderLoopErrors){const r="An error occurred while rendering.  Rendering has stopped.";e.showErrorPanel(r,void 0,t)}}else e._renderLoopRunning=!1}))}function configurePixelRatio(e){let t=e._useBrowserRecommendedResolution?1:window.devicePixelRatio;return t*=e._resolutionScale,defined(e._scene)&&(e._scene.pixelRatio=t),t}function configureCanvasSize(e){const t=e._canvas;let r=t.clientWidth,n=t.clientHeight;const o=configurePixelRatio(e);e._canvasClientWidth=r,e._canvasClientHeight=n,r*=o,n*=o,t.width=r,t.height=n,e._canRender=0!==r&&0!==n,e._lastDevicePixelRatio=window.devicePixelRatio}function configureCameraFrustum(e){const t=e._canvas,r=t.width,n=t.height;if(0!==r&&0!==n){const t=e._scene.camera.frustum;defined(t.aspectRatio)?t.aspectRatio=r/n:(t.top=t.right*(n/r),t.bottom=-t.top)}}function CesiumWidget(e,t){if(!defined(e))throw new DeveloperError("container is required.");e=getElement(e),t=defaultValue(t,defaultValue.EMPTY_OBJECT);const r=document.createElement("div");r.className="cesium-widget",e.appendChild(r);const n=document.createElement("canvas"),o=FeatureDetection.supportsImageRenderingPixelated();function blurActiveElement(){n!==n.ownerDocument.activeElement&&n.ownerDocument.activeElement.blur()}this._supportsImageRenderingPixelated=o,o&&(n.style.imageRendering=FeatureDetection.imageRenderingValue()),n.oncontextmenu=function(){return!1},n.onselectstart=function(){return!1},n.addEventListener("mousedown",blurActiveElement),n.addEventListener("pointerdown",blurActiveElement),r.appendChild(n);const i=document.createElement("div");i.className="cesium-widget-credits";const s=defined(t.creditContainer)?getElement(t.creditContainer):r;s.appendChild(i);const a=defined(t.creditViewport)?getElement(t.creditViewport):r,d=defaultValue(t.showRenderLoopErrors,!0),c=defaultValue(t.useBrowserRecommendedResolution,!0);this._element=r,this._container=e,this._canvas=n,this._canvasClientWidth=0,this._canvasClientHeight=0,this._lastDevicePixelRatio=0,this._creditViewport=a,this._creditContainer=s,this._innerCreditContainer=i,this._canRender=!1,this._renderLoopRunning=!1,this._showRenderLoopErrors=d,this._resolutionScale=1,this._useBrowserRecommendedResolution=c,this._forceResize=!1,this._clock=defined(t.clock)?t.clock:new Clock,configureCanvasSize(this);try{const e=new Scene({canvas:n,contextOptions:t.contextOptions,creditContainer:i,creditViewport:a,mapProjection:t.mapProjection,orderIndependentTranslucency:t.orderIndependentTranslucency,scene3DOnly:defaultValue(t.scene3DOnly,!1),shadows:t.shadows,mapMode2D:t.mapMode2D,requestRenderMode:t.requestRenderMode,maximumRenderTimeChange:t.maximumRenderTimeChange,depthPlaneEllipsoidOffset:t.depthPlaneEllipsoidOffset,msaaSamples:t.msaaSamples});this._scene=e,e.camera.constrainedAxis=Cartesian3.UNIT_Z,configurePixelRatio(this),configureCameraFrustum(this);const r=defaultValue(e.mapProjection.ellipsoid,Ellipsoid.WGS84);let o=t.globe;defined(o)||(o=new Globe(r)),!1!==o&&(e.globe=o,e.globe.shadows=defaultValue(t.terrainShadows,ShadowMode.RECEIVE_ONLY));let s=t.skyBox;defined(s)||(s=new SkyBox({sources:{positiveX:getDefaultSkyBoxUrl("px"),negativeX:getDefaultSkyBoxUrl("mx"),positiveY:getDefaultSkyBoxUrl("py"),negativeY:getDefaultSkyBoxUrl("my"),positiveZ:getDefaultSkyBoxUrl("pz"),negativeZ:getDefaultSkyBoxUrl("mz")}})),!1!==s&&(e.skyBox=s,e.sun=new Sun,e.moon=new Moon);let d=t.skyAtmosphere;defined(d)||(d=new SkyAtmosphere(r)),!1!==d&&(e.skyAtmosphere=d);let c=!1!==t.globe&&t.imageryProvider;defined(c)||(c=createWorldImagery()),!1!==c&&e.imageryLayers.addImageryProvider(c),defined(t.terrainProvider)&&!1!==t.globe&&(e.terrainProvider=t.terrainProvider),this._screenSpaceEventHandler=new ScreenSpaceEventHandler(n),defined(t.sceneMode)&&(t.sceneMode===SceneMode.SCENE2D&&this._scene.morphTo2D(0),t.sceneMode===SceneMode.COLUMBUS_VIEW&&this._scene.morphToColumbusView(0)),this._useDefaultRenderLoop=void 0,this.useDefaultRenderLoop=defaultValue(t.useDefaultRenderLoop,!0),this._targetFrameRate=void 0,this.targetFrameRate=t.targetFrameRate;const l=this;this._onRenderError=function(e,t){if(l._useDefaultRenderLoop=!1,l._renderLoopRunning=!1,l._showRenderLoopErrors){const e="An error occurred while rendering.  Rendering has stopped.";l.showErrorPanel(e,void 0,t)}},e.renderError.addEventListener(this._onRenderError)}catch(e){if(d){const t="Error constructing CesiumWidget.",r='Visit <a href="http://get.webgl.org">http://get.webgl.org</a> to verify that your web browser and hardware support WebGL.  Consider trying a different web browser or updating your video drivers.  Detailed error information is below:';this.showErrorPanel(t,r,e)}throw e}}Object.defineProperties(CesiumWidget.prototype,{container:{get:function(){return this._container}},canvas:{get:function(){return this._canvas}},creditContainer:{get:function(){return this._creditContainer}},creditViewport:{get:function(){return this._creditViewport}},scene:{get:function(){return this._scene}},imageryLayers:{get:function(){return this._scene.imageryLayers}},terrainProvider:{get:function(){return this._scene.terrainProvider},set:function(e){this._scene.terrainProvider=e}},camera:{get:function(){return this._scene.camera}},clock:{get:function(){return this._clock}},screenSpaceEventHandler:{get:function(){return this._screenSpaceEventHandler}},targetFrameRate:{get:function(){return this._targetFrameRate},set:function(e){if(e<=0)throw new DeveloperError("targetFrameRate must be greater than 0, or undefined.");this._targetFrameRate=e}},useDefaultRenderLoop:{get:function(){return this._useDefaultRenderLoop},set:function(e){this._useDefaultRenderLoop!==e&&(this._useDefaultRenderLoop=e,e&&!this._renderLoopRunning&&startRenderLoop(this))}},resolutionScale:{get:function(){return this._resolutionScale},set:function(e){if(e<=0)throw new DeveloperError("resolutionScale must be greater than 0.");this._resolutionScale!==e&&(this._resolutionScale=e,this._forceResize=!0)}},useBrowserRecommendedResolution:{get:function(){return this._useBrowserRecommendedResolution},set:function(e){this._useBrowserRecommendedResolution!==e&&(this._useBrowserRecommendedResolution=e,this._forceResize=!0)}}}),CesiumWidget.prototype.showErrorPanel=function(e,t,r){const n=this._element,o=document.createElement("div");o.className="cesium-widget-errorPanel";const i=document.createElement("div");i.className="cesium-widget-errorPanel-content",o.appendChild(i);const s=document.createElement("div");s.className="cesium-widget-errorPanel-header",s.appendChild(document.createTextNode(e)),i.appendChild(s);const a=document.createElement("div");function resizeCallback(){a.style.maxHeight=`${Math.max(Math.round(.9*n.clientHeight-100),30)}px`}a.className="cesium-widget-errorPanel-scroll",i.appendChild(a),resizeCallback(),defined(window.addEventListener)&&window.addEventListener("resize",resizeCallback,!1);const d=defined(t),c=defined(r);if(d||c){const n=document.createElement("div");if(n.className="cesium-widget-errorPanel-message",a.appendChild(n),c){let n=formatError(r);d||("string"==typeof r&&(r=new Error(r)),t=formatError({name:r.name,message:r.message}),n=r.stack),"undefined"!=typeof console&&console.error(`${e}\n${t}\n${n}`);const o=document.createElement("div");o.className="cesium-widget-errorPanel-message-details collapsed";const s=document.createElement("span");s.className="cesium-widget-errorPanel-more-details",s.appendChild(document.createTextNode("See more...")),o.appendChild(s),o.onclick=function(e){o.removeChild(s),o.appendChild(document.createTextNode(n)),o.className="cesium-widget-errorPanel-message-details",i.className="cesium-widget-errorPanel-content expanded",o.onclick=void 0},a.appendChild(o)}n.innerHTML=`<p>${t}</p>`}const l=document.createElement("div");l.className="cesium-widget-errorPanel-buttonPanel",i.appendChild(l);const u=document.createElement("button");u.setAttribute("type","button"),u.className="cesium-button",u.appendChild(document.createTextNode("OK")),u.onclick=function(){defined(resizeCallback)&&defined(window.removeEventListener)&&window.removeEventListener("resize",resizeCallback,!1),n.removeChild(o)},l.appendChild(u),n.appendChild(o)},CesiumWidget.prototype.isDestroyed=function(){return!1},CesiumWidget.prototype.destroy=function(){defined(this._scene)&&(this._scene.renderError.removeEventListener(this._onRenderError),this._scene=this._scene.destroy()),this._container.removeChild(this._element),this._creditContainer.removeChild(this._innerCreditContainer),destroyObject(this)},CesiumWidget.prototype.resize=function(){const e=this._canvas;(this._forceResize||this._canvasClientWidth!==e.clientWidth||this._canvasClientHeight!==e.clientHeight||this._lastDevicePixelRatio!==window.devicePixelRatio)&&(this._forceResize=!1,configureCanvasSize(this),configureCameraFrustum(this),this._scene.requestRender())},CesiumWidget.prototype.render=function(){if(this._canRender){this._scene.initializeFrame();const e=this._clock.tick();this._scene.render(e)}else this._clock.tick()};export default CesiumWidget;