---
layout: default
title: Jetson TX2
---

# Installation of JetPack

> Update:
>
> The latest JetPack is 3.1 and we can follow the same procedure to install the system. This time, the host PC's os should be ubuntu 16.04

Recently, I bought the NVIDIA® Jetson™ TX2 Developer Kit for studying CUDA since my laptop doesn't have a Nvidia GPU. The process of installing the environment is quite tough so I'd like to write it down if never it can help someone else.

1. First, after receiving Jetson TX2, we need to power it up (cf. Quick Start Guide), login (username and password are both nvidia) and install the graphical desktop by following the guide.

2. Next, we need to flash it's system. Finally, I succeeded with a laptop in Ubuntu 14.04 with more than 40 GB space in the disk by following the [video tutorial](https://www.youtube.com/watch?v=D7lkth34rgM) of JetsonHacks.

    > In fact, I tried to flash Jetson with Ubuntu 16.04 (with 21 GB at all since it's dual system any I have no more disk space) but it failed (probably because of the lack of disk space). So I recommand to reserve at least 40 GB.
    >
    > Moreover, according to the [post](https://devtalk.nvidia.com/default/topic/1016861/jetson-tx2/jetson-tx2-do-i-need-the-host-pc-/) in the nvidia forum, it's recommanded to use a host PC (Ubuntu 14.04) for flashing.

    > The problems that I had are 
    >   -   Can't finish flashing Jetson's system. It's because of the lack of disk space.
    >
    >   -   Succeed to flash the system but can't install on target. Precisely, I saw "logout Connection to 192.168.1.162 closed" but it didn't continue and I couldn't see "nvidia: Connection to 192.168.1.162 closed". I don't know the reason, but I observed that when choosing "Network Interface Selection", it was something long and strange instead of eth0. Maybe it's because that I used a USB-Ethernet adapter. Later, I borrowed another laptop and plugged the cable directly and I saw eth0 as interface.

3. After testing the car detection sample, I found that we can't use IDE for coding in Jetson TX2 directly because it's ARM-based. But we can do "cross-compiling" or "synchronize projects" with the help of Nsight Eclipse.

    > Cross-compiling for ARM on your x86 host system requires that all of the ARM libraries with which you will link your application be present on your host system. In synchronize-projects mode, on the other hand, your source code is synchronized between host and target systems and compiled and linked directly on the remote target, which has the advantage that all your libraries get resolved on the target system and need not be present on the host. Neither of these remote development modes requires an NVIDIA GPU to be present in your host system.

    Since the dual system made some conflicts with windows 10, I deleted it and use VirtualBox to create a virtual machine(Ubuntu 16.04) to try "cross-compiling" by following Nvidia's [article](https://devblogs.nvidia.com/parallelforall/cuda-jetson-nvidia-nsight-eclipse-edition/) but I can't build locally. So I tried "synchronize projects" by using another [article](https://devblogs.nvidia.com/parallelforall/remote-application-development-nvidia-nsight-eclipse-edition/) and I succeeded.

    What I did actually is:

    -   Create a virtual machine and install ubuntu 16.04
    
    -   Install JetPack 3.0 but cancel all the actions related to target.
    
    -   Followed the first three steps of [article](https://devblogs.nvidia.com/parallelforall/cuda-jetson-nvidia-nsight-eclipse-edition/).
    
        > I don't know if all the steps are necessaries.
        
        > I didn't do "sudo apt-get install cuda" because it seems that there are some problems of nvidia drivers and it caused a login loop (when I entered my password, it returned to the welcome page and asked for password again so I couldn't login).

    - Install nsight by apt-get

    - Launch nsight

        - Click on File->New->CUDA C/C++ Project to launch the project creation wizard.
        
        - Enter project name "particles", select "Import CUDA Sample" as the project type and select "CUDA Toolkit 8.0".

        - Select the CUDA sample by applying "Simulations" as the samples filter type. Select "Particles".

        - Select 6.0 for "Generate PTX code" and "Generate GPU code"

        - Select remote connection by adding a connection in "Manage..." and selecting it. Host name is the IP of Jetson. The CPU Architecture is AArch64 for remote connection. Use search to find toolkit path. Then click finish.

        - Right-click the project and choose "Properties"

        - Build - Settings - Tool Settings - NVCC Linker - Libraries - Library search path, change the path to "${cuda_samples_dir:/Test}/common/lib/linux/aarch64"

            > Here "Test" is the name of the project.

        - Build - Settings - Tool Settings - NVCC Linker - Miscellaneous - Other objects, change the path to "${cuda_samples_dir:/Test}/common/lib/linux/aarch64/libGLEW.a"

        - It's OK. Click on the build "hammer" icon in the toolbar (click the triangle to assure that it's nvidia-debug instead of Local-debug). Then click on the Run icon in the toolbar to pull down the Run menu and select "Run As->Remote C/C++ Application". And normally we can see the figure on Jetson's system.

            > Here nvidia is the username in Jetson system.

That's all. Now we can run the application remotely.

# Installation of other packages

-   [Tensorflow](https://www.youtube.com/watch?v=z8LYFVBC5oQ)

-   [OpenCV](https://www.youtube.com/watch?v=GlDjscSAtDY)
    > To install opencv for python3.x, we may need to type `cmake -D BUILD_opencv_python3=ON ..` before sudo make install

-   [Openai Gym](https://github.com/openai/gym)
    > For Atari games, it contains the Arcade Learning Environment.

-   [Openai Baselines](https://github.com/openai/baselines)
    > This package only support python3 and the DQN test uses OpenCV. Therefore we have to install OpenCV for python3.