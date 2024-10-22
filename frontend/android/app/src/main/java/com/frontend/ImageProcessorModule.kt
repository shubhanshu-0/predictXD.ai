package com.yourapp

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class ImagePreprocessorModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        // Load the C++ library
        init {
            System.loadLibrary("preprocess")
        }
    }

    override fun getName(): String {
        return "ImagePreprocessorModule"
    }

    // This method will be called from React Native
    @ReactMethod
    fun preprocessImage(imagePath: String, promise: Promise) {
        try {
            preprocess(imagePath)  // Call the C++ function
            promise.resolve("Image Preprocessing Complete")
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }

    // Declare the native C++ function
    private external fun preprocess(imagePath: String)
}
