package com.codigotest; // replace com.your-app-name with your app’s name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;
import com.facebook.react.bridge.Callback;

public class MovieModule extends ReactContextBaseJavaModule {
   MovieModule(ReactApplicationContext context) {
       super(context);
   }
   @Override
   public String getName() {
    return "MovieModule";
    }

    @ReactMethod
    public void changeStatus(String status, Callback callback) {
        switch(status) {
            case "active":
              status = "inactive";
            case "inactive":
              status = "active";
          }
        callback.invoke(status);
    }
}