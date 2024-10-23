cmake_minimum_required(VERSION 3.10)

project(preprocess)

find_package(OpenCV REQUIRED)

include_directories(${OpenCV_INCLUDE_DIRS})

add_library(preprocess SHARED preprocess.cpp)

target_link_libraries(preprocess ${OpenCV_LIBS})
