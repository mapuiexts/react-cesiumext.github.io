import defaultValue from"../Core/defaultValue.js";import defined from"../Core/defined.js";import DeveloperError from"../Core/DeveloperError.js";import Event from"../Core/Event.js";import knockout from"../ThirdParty/knockout.js";function createCommand(e,r){if(!defined(e))throw new DeveloperError("func is required.");r=defaultValue(r,!0);const o=new Event,n=new Event;function command(){if(!command.canExecute)throw new DeveloperError("Cannot execute command, canExecute is false.");const r={args:arguments,cancel:!1};let t;return o.raiseEvent(r),r.cancel||(t=e.apply(null,arguments),n.raiseEvent(t)),t}return command.canExecute=r,knockout.track(command,["canExecute"]),Object.defineProperties(command,{beforeExecute:{value:o},afterExecute:{value:n}}),command}export default createCommand;