#include <iostream>
#include <opencv2/imgcodecs.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/imgproc.hpp>

using namespace cv;
using namespace std;

int main()
{
    string path = "/Users/shubhanshusaraf/Documents/ok/image_processing_skindisease/preprocess/image.png"; // Corrected line
    Mat img = imread(path);

    if (img.empty())
    {
        cout << "Could not open or find the image at path: " << path << endl;
        return -1;
    }

    imshow("Image", img);
    waitKey(0);
    return 0;

    // VideoCapture cap(0);
    // Mat img;

    // while (1)
    // {
    //     cap.read(img);
    //     imshow("Image", img);
    //     waitKey(1);
    // }
    // return 0;
}
