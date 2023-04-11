export const loadRecaptcha = (callback) => {
    const existingScript = document.getElementById("recaptcha");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoadCallback&render=explicit";
      script.async = true;
      script.defer = true;
      script.id = "recaptcha";
      document.body.appendChild(script);
    }
  
    window.onRecaptchaLoadCallback = () => {
      callback();
    };
  };
  
  export const removeRecaptcha = () => {
    const script = document.getElementById("recaptcha");
    if (script) {
      script.remove();
    }
  };
  