import { Notyf } from "notyf";
import "notyf/notyf.min.css";

class Helpers {
  static appName = "CrownSync";
  static localhost = "127.0.0.1:8000";
  static server = "https://testapi.crownsync.ai";
  // static server = "http://127.0.0.1:8000";
  static basePath = `${this.server}`;
  static apiUrl = `${this.basePath}/api/`;
  static backendUrl = `${this.basePath}/`;
  // Ensure that `authUser` is either a parsed JSON object or an empty object
  static authUser = (() => {
    const user = localStorage.getItem("user");
    try {
      return JSON.parse(user) || {};
    } catch (e) {
      console.error("Parsing error:", e);
      return {};
    }
  })();

  static authHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  
  static authFileHeaders = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  // Other static methods...

  static getItem = (data, isJson = false) => {
    const item = localStorage.getItem(data);
    if (isJson && item) {
      try {
        return JSON.parse(item);
      } catch (e) {
        console.error("Parsing error:", e);
        return null;
      }
    }
    return item;
  };

  static setItem = (key, data, isJson = false) => {
    if (isJson) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data);
    }
  };
  static toast = (type, message) => {
    const notyf = new Notyf();
    notyf.open({
      message: message,
      type: type,
      position: { x: "right", y: "top" },
      ripple: true,
      dismissible: true,
      duration: 2000,
    });
  };
  static loadScript(scriptUrl) {
    return new Promise((resolve, reject) => {
      const scriptPath = `/${scriptUrl}`;
      const script = document.createElement("script");
      script.src = scriptPath;
      script.async = true;

      script.onload = () => resolve(script);
      script.onerror = () =>
        reject(new Error(`Script load error: ${scriptPath}`));

      document.body.appendChild(script);
    });
  }

  // Additional static properties and methods...
}

export default Helpers;
