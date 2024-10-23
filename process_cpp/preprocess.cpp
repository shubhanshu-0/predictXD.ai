#include <opencv2/opencv.hpp>
#include <jni.h>
#include <iostream>

// JNI function that calls the C++ preprocessing function
extern "C" JNIEXPORT void JNICALL
Java_com_frontend_ImagePreprocessorModule_preprocess(JNIEnv *env, jobject instance, jstring imagePath)
{
    const char *nativeImagePath = env->GetStringUTFChars(imagePath, 0);
    preprocess(nativeImagePath); // Call the C++ preprocessing logic
    env->ReleaseStringUTFChars(imagePath, nativeImagePath);
}

extern "C"
{
    void preprocess(const char *imagePath)
    {
        cv::ocl::setUseOpenCL(true); // Hardware Acceleration

        cv::Mat image = cv::imread(imagePath);

        if (image.empty())
        {
            std::cerr << "Error: Image cannot be loaded!" << std::endl;
            return;
        }

        cv::Mat denoised;
        cv::fastNlMeansDenoising(image, denoised);

        cv::Mat equalized;
        cv::equalizeHist(denoised, equalized);

        cv::Mat blurred;
        cv::GaussianBlur(equalized, blurred, cv::Size(5, 5), 0);

        cv::Mat edges;
        cv::Canny(blurred, edges, 100, 200);

        cv::Mat resized;
        cv::resize(edges, resized, cv::Size(256, 256));

        std::string outputImagePath = std::string(imagePath) + "_processed.png";
        if (!cv::imwrite(outputImagePath, resized))
        {
            std::cerr << "Error: Could not save processed image!" << std::endl;
            return;
        }
    }
}
