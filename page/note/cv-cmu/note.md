---
layout: default
math: true
title: Computer Vision
---

# Computer Vision (CMU)

> [http://www.cs.cmu.edu/~16385/](http://www.cs.cmu.edu/~16385/)
>
> [Computer Vision: Algorithms and Applications](http://szeliski.org/Book/)
>
> [Multiple View Geometry](http://cvrs.whu.edu.cn/downloads/ebooks/Multiple%20View%20Geometry%20in%20Computer%20Vision%20(Second%20Edition).pdf) (best reference for geometry and vision)

---

# Image processing

## Basics of filtering

- Convolution ($f*g$)
    - 1d/2d, continue/discrete

        $(f*g)(x)=\int\limits f(y)g(x-y)dy$
        
        f = filter, g = signal
    - separable ($M\times M$ pixels with $N\times N$ filter)

        non-separable $M^2\times N^2$
        
        separable $2\times M^2\times N$
- Gradients

    Blur the image first then calculate the gradient

    Because $\frac{\partial}{\partial x}(h*f) = (\frac{\partial}{\partial x} h) * f$, do the convolution with the derivative of filter (Gaussian)

- 2D Gaussian filters
    - Gaussian

        $h_\sigma(u,v)=\frac{1}{2\pi\sigma^2}\exp(-\frac{u^2+v^2}{2\sigma^2})$

    - Derivative of Gaussian

        $\frac{\partial}{\partial x}h_\sigma(u,v)$, x can be u or v

    - Laplacian of Gaussian (LoG) filter

        $\nabla^2h_\sigma(u,v)$

    - Gabor filters

        $\exp(-\frac{u^2+v^2}{2\sigma^2})\cos(2\pi(k_uu+k_vv))$

## Image pyramids
- Gaussian pyramid
    - Algorithm
        Repeat until min resolution reached
        - Use Gaussian filter to smooth the image
        - Subsample (e.g. remove even rows and cols)
    - Can’t recover the image from upper level (blurring is losy)
- Laplacian pyramid
    - Downsample Algorithm
        Repeat until min resolution reached
        - Use Gaussian filter to smooth the image
        - Calculate the residual (retain the residuals instead of blurred images)
        - Subsample
    - Upsample Algorithm
        Repeat until original resolution reached
        - Upsample
        - Sum with residual
    - Why called Laplacian
        x - Gaussian(x) ~= Laplacian(x)
- Other pyramids
    - Steerable pyramid (each level keeps multiple directions)
    - Wavelets
- Fourier transform ($\mathcal{F}(g)$)
![Fourier transform](https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553430275582_Screenshot+from+2019-03-24+12-24-00.png)

    Discrete Fourier transform (DFT) is a matrix multiplication $F=Wf$, in practice is implemented using fast Fourier transform (FFT)

    Convolution theorem

    The Fourier transform of the convolution of two functions is the product of their Fourier transforms
    
    $\mathcal{F}(g*h)=\mathcal{F}(g)\mathcal{F}(h)$

    $\mathcal{F}^{-1}(gh)=\mathcal{F}^{-1}(g)*\mathcal{F}^{-1}(h)$
## Hough transforms
- Line parameterizations
    - Slope intercept form $y=mx+b$
    - Double intercept form $\frac{x}{a}+\frac{y}{b}=1$
    - Normal form $x\cos\theta+y\sin\theta=\rho$
- Hough transform
    - Image space
        x, y are vars and theta, rho are parameters
    - Parameter space
        theta, rho are vars and x, y are parameters
    One point in image space becomes a curve in parameter spaces (all lines that pass the point). The local maximum in parameter space corresponds to detected lines in image space.

![Hough lines](https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553431196253_Screenshot+from+2019-03-24+12-39-41.png)

- Hough circles […]

# Feature detection and correspondences

## Corner detection

- Error function

    $E(u,v)=\sum\limits_{x,y}w(x,y)(I(x+u,y+v)-I(x,y))^2$

    E: error function, w: window function (e.g. Gaussian, or 1 in window 0 outside), I: intensity

    Using Taylor expansion, approximate E as
    
    $$E(u,v)=\begin{bmatrix}u&v\end{bmatrix}M\begin{bmatrix}u \\ v\end{bmatrix}$$
     
    $$M=\sum\limits_{x,y}w(x,y)\begin{bmatrix}I_x^2 & I_xI_y \\ I_xI_y & I_y^2\end{bmatrix}$$

- Calculate eigen values of $M$:

    $$M=R^{-1}\begin{bmatrix}\lambda_1 & 0 \\ 0 & \lambda_2\end{bmatrix}R$$

    - Corners
        - $\lambda_1\approx\lambda_2$ and both large: corner
        - $\lambda_1\approx\lambda_2$ and both small: flat
        - $\lambda_1\gg\lambda_2$: vertical edge
        - $\lambda_2\gg\lambda_1$: horizontal edge
    - Detectors
        - Harris & Stephens: $\det M - \kappa\text{Trace}^2 M$
            - invariant to intensity shift ($I+b$) or scale ($aI$)
            - not invariant to scale of image
        - Kanade & Tomasi: $\min(\lambda_1,\lambda_2)$
        - Nobel: $\frac{\det M}{\text{Trace} M + \varepsilon}$
- Multi-scale blob detection
    - For each level of Gaussian pyramid
        compute feature response
    - For each level of Gaussian pyramid
        if the response is local maximum cross scale, save scale and location of feature (x,y,s)

## Feature descriptors

- Basics
    - Image patch (vector of intensity values, e.g. for a 3 * 3 neighbor)
    - Image gradient (difference of intensity values)
    - Color histogram (count colors), invariant to scale and rotation
    - Spatial histograms (compute histograms over spatial cells)
    - Orientation normalization (use the dominant image gradient direction to normalize the patch)
- Multi-Scale Oriented Patches (MOPS)
    -  Given a feature (x, y, s, theta)
        - Get a 40 * 40 image patch along the direction theta (possible interpolation for pixels), subsample to 8 * 8 (low frequency filtering to absorb localization error)
        - Subtract the mean and divide by standard deviation
        - Haar wavelet transform
- Histograms of Oriented Gradients (HOG)
    > https://www.learnopencv.com/histogram-of-oriented-gradients/
    > http://www.geocities.ws/talh_davidc/#cst_extract
    - Given a image, calculate the gradient (magnitude & direction) using filters (e.g. Sober)
    - Divide images into cells of size 8 * 8
    - Create a histogram of gradient directions, containing 9 bins
        0, 20, 40, …, 160
        (if the angle is 165, with magnitude M, put M/4 to bin 0 and 3M/4 to bin 160)
    - Normalize the histogram
        Consider block of size 16 * 16, with stride 8, for each block, concatenate the histogram counts into a vector, and stored the normalized vector
        Concatenate all the normalized vectors of all blocks into a giant vector as the HOG feature vector
- Scale Invariant Feature Transform (SIFT)
    > http://aishack.in/tutorials/sift-scale-invariant-feature-transform-introduction/
    - scale space (SIFT suggests 4 octaves and 5 blur levels, so 20 images in total)
        - take the original image, blur it progressively (this series of images called an octave)
        - resize the image to half, blur it progressively
    - LoG approximations
        for each octave, calculate the difference between images (difference of Gaussian approximate laplacian)
    - Find key points
        - locate maxima/minima in DoG
            A pixel is key point if it’s largest/smallest of all 26 neighbors (8 in the same blur scale, 9 in the previous blur scale, and 9 in the later blur scale)
        - Find subpixel maxima/minima
            Use interpolation (taylor expansion) on marked key points to find the extreme points between pixels

            5 blur levels give 4 DoG, which gives two extrema images

            ![Red are key points, green is the actual extreme point.](https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553439994227_image.png)

            
    - Remove low contrast key points
    
        - Remove low contrast features (if the intensity is below a threshold, reject the point)
        - Remove edges (calculate x, y gradients at the key point (eigenvalues of M), reject the point if the ratio of two eigenvalues is large)
    
    - Key point orientations

        Until now, for each key point, we have the location (x, y) and scale s (the Gaussian variance is sigma), need to determine the direction theta
        - The magnitude and orientation is calculated for all pixels in a window (size is 1.5 sigma) around the key point
        - The orientations are broken into 36 bins (10 degrees each), the histogram is blurred by 1.5 sigma.
        - The key point is assigned to the histogram peak
        - The key point is also assigned to any peak above 80% of the highest (creating a new key point with same location and scale but different orientation)
    
    - Generate a feature

        Now, for each key point we have location (x, y), scale s, and orientation theta.
        For each key point,

        - Consider a 16 * 16 window around it, break the window into sixteen 4 * 4 small windows (we have 16 small windows)
        - Within each small window, gradient magnitudes and orientations (the key point’s orientation theta is subtracted, so it’s relative orientations) are calculated, and put into a 8 bin histogram (45 degrees each), the amount added also depends on the distance from the key point.
            So each small window as 8 features (for 8 bins)
        - 16 small windows give in total 128 features (can cap the features at 0.2, any number >= 0.2 is replaced by 0.2)

# Transformations and geometry

Transformation $x'=f(x;p)$

## Homographies
- Projective space
    A projective space is roughly the set of the lines passing through the origin.
![](https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553449541849_Screenshot+from+2019-03-24+17-37-30.png)

- Homography
    A homography is an isomorphism of projective spaces.

- Transformation
    Affine transformation (combinations of linear transformations and translations)

    $$\begin{bmatrix}x'\\y'\\1\end{bmatrix}=\begin{bmatrix}*&*&*\\*&*&*\\0&0&1\end{bmatrix}\begin{bmatrix}x\\y\\1\end{bmatrix}$$


    Projective transformation

    $$\begin{bmatrix}x'\\y'\\w'\end{bmatrix}=\begin{bmatrix}*&*&*\\*&*&*\\*&*&*\end{bmatrix}\begin{bmatrix}x\\y\\1\end{bmatrix}$$

    (8 degrees of freedom), (x’, y’, w’) convert back to (x’/w’, y’/w’)
- Determine unknown transformations
    linear system, minimize square errors, least squares error
    $E=\|Ax-b\|_2^2$
    $x=(A^TA)^{-1}A^Tb$

- Summary

    ![](https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553449796041_Screenshot+from+2019-03-24+17-49-08.png)

    ![](https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553449801188_Screenshot+from+2019-03-24+17-49-24.png)

## Image alignment
- panoramas from image stitching
    when can we use homographies
    - the scene is planar
    - the scene is very far or has small depth variation, so approximatEly planar
    - the scene is captured under camera rotation only, no translation or pose change
- Direct linear transform (DLT)
    Given $\{(p_i',p_i)\}$, find the best $H$ such that
    $P'=HP$
    - Linear system (can assume $h_9=1$, so 8 DO)

        ![](https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553451317287_Screenshot+from+2019-03-24+18-13-56.png)

    - Expand

        ![](https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553451355564_Screenshot+from+2019-03-24+18-14-05.png)

    - Replace $\alpha$ and rearrange into $A_ih=0$ for i-th point

        ![](https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553451429649_Screenshot+from+2019-03-24+18-14-10.png)

    - Stack systems together and solve the least square problem to have $H$

- Image alignment pipeline
    - Feature point detection (e.g. detect corners and extract features)
    - Feature matching (match points from two images)
        - Exhaustive search

            for each feature in one image, look at all the other features in the other image(s)

        - Hashing

            compute a short descriptor from each feature vector, or hash longer descriptors (randomly)
        - Nearest neighbor techniques
        - Feature-space outlier rejection

            sum of squared differences (SSD)

            - 1-NN: SSD of the closest match
            - 2-NN: SSD of the second-closest match
            - calculate 1-NN / 2-NN, it’s a match if the ratio smaller than a threshold (e.g. threshold = 5)

    - Homography estimation

        Random Sample Consensus (RANSAC)

        - Algorithm

            Repeat until the best model is found with high confidence

            - Sample (randomly) the number of points required to fit the model
            - Solve for model parameters using samples
            - Score by the fraction of inliers within a preset threshold of the model

                e.g. if the model is a line, inliers are the points which distance to the line is smaller than a threshold

                ![](https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553452003228_Screenshot+from+2019-03-24+18-26-32.png)

        - For image alignment (RANSAC)
            - Repeat
                - Get four pair of points randomly
                - Compute H using DLT
                - Count inliers (pair of points have similar projections)
                - End if H has large number of inliers
            - Recompute H using all inliers


| | Structure (scene geometry) | Motion (camera geometry) | Measurements |
| --- | --- | --- | --- |
| Pose Estimation | known | estimate | 3D to 2D correspondences |
| Triangulation   | estimate | known | 2D to 2D correspondences |
| Reconstruction  | estimate | estimate | 2D to 2D correspondences |

## Camera calibration

- Homogeneous corrdinates and inhomogeneous (heterogeneous) coordinates
    
    > Multiple View Geometry Section 2.2.1

    - line

        A line in the plane can be represented by $ax+by+c=0$, thus $(a,b,c)$ and for non-zero $k$, $k(a,b,c)$ represent the same line.
        
        $(a,b,c)$ is the homogeneous representation of a line

    - point

        A point $(x,y)$ lies on a line $l=(a,b,c)$ iff $ax+by+c=0$, i.e. $\langle(x,y,z),(a,b,c)\rangle=0$. For non-zero $k$, $k(x,y,1)$ also satisfies the equation.

        $(x,y,1)$ is the homogeneous representation of a point.

        $(x,y)$ is the inhomogeneous representation of a point.

- Camera model

    > Multiple View Geometry Section 6.1

    ![](https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553462579864_Screenshot+from+2019-03-24+21-22-35.png)

    Assume
    - The focal length of the camera is $f$
    - A 3D world point is $(X,Y,Z)$, where the origin point is the center of camera $C$
    - The image plane is at $Z=f$

    Camera center is also known as optical center.

    The point where the principal axis meets the image plane is called the principle point ($p$ in the image above).

    The plane through the camera center parallel to the image plane is called the principal plane.
    
    Camera model using homogeneous coordinates

    Denote:
    - World point $\mathbf{X}_\text{cam}=(X,Y,Z,1)$ in the camera coordinate frame.
    - Image point $\mathbf{x}=(x,y,w)$ in the camera coordinate frame
    - Camera projection matrix $P\in\mathbb{R}^{3\times4}$

    Then $\mathbf{x}=P\mathbf{X}_\text{cam}$


    - If the origin of image plane is at the principal point (intersection of image plane and principle axis), then

        $$(X,Y,Z)\mapsto (fX/Z,fY/Z)$$

        $$\mathbf{x}=P\mathbf{X}=K\begin{bmatrix}I&0_{3,1}\end{bmatrix}\mathbf{X}_\text{cam}$$

        $$K=\begin{bmatrix}f&0&0\\0&f&0\\0&0&1\end{bmatrix}$$
        
        $K$ is the camera calibration matrix.

    - If the principal point’s coordinates in the image plane is $(p_x,p_y)$, then
        
        $$(X,Y,Z)\mapsto (fX/Z+p_x,fY/Z+p_y)$$

        $$\mathbf{x}=P\mathbf{X}_\text{cam}=K\begin{bmatrix}I&0_{3,1}\end{bmatrix}\mathbf{X}_\text{cam}$$

        $$K=\begin{bmatrix}f&0&p_x\\0&f&p_y\\0&0&1\end{bmatrix}$$

    - In general, world point is in the world coordinate frame

        Denote
        - the inhomogeneous coordinates of a point in the world frame as $\tilde{\mathbf{X}}_\text{world}\in\mathbb{R}^3$
        - the inhomogeneous coordinates of the camera center $\tilde{\mathbf{C}}_\text{world}\in\mathbb{R}^3$
        - the inhomogeneous coordinates of a point in the camera frame as $\tilde{\mathbf{X}}_\text{cam}\in\mathbb{R}^3$

        Then we have 
        $$\tilde{\mathbf{X}}_\text{cam}=R(\tilde{\mathbf{X}}_\text{world}-\tilde{\mathbf{C}}_\text{world})$$ using inhomogeneous coordinates.

        In homogeneous coordinates, it’s $$\mathbf{X}_\text{cam}=\begin{bmatrix}R&-R\tilde{\mathbf{C}}\\0_{1,3}&1\end{bmatrix}\mathbf{X}_\text{world}$$

        which gives:

        $$\mathbf{x}=K\begin{bmatrix}I&0_{3,1}\end{bmatrix}\mathbf{X}_\text{cam}=K\begin{bmatrix}I&0_{3,1}\end{bmatrix}\begin{bmatrix}R&-R\tilde{\mathbf{C}}\\0_{1,3}&1\end{bmatrix}\mathbf{X}_\text{world}=KR\begin{bmatrix}I&-\tilde{\mathbf{C}}\end{bmatrix}\mathbf{X}_\text{world}$$
        
        here $\mathbf{x}\in\mathbb{R}^3$ and $\mathbf{X}_\text{world}\in\mathbb{R}^4$, and we can denote $$P=K\begin{bmatrix}R&t\end{bmatrix}$$

        This system has 9 degrees of freedom
        - 3 for K ($f,p_x,p_y$)
        - 3 for $R$ (can rotate about x,y,z-axis)
        - 3 for $\tilde{\mathbf{C}}\in\mathbb{R}^3$

    - Pixel might not be square, 10 DOF

        $$K=\begin{bmatrix}\alpha_x&0&p_x\\0&\alpha_y&p_y\\0&0&1\end{bmatrix}$$

    - Sensor might be skewed, finite projective camera, 11 DOF

        $$K=\begin{bmatrix}\alpha_x&s&p_x\\0&\alpha_y&p_y\\0&0&1\end{bmatrix}$$

    - weak perspective camera

- Geometric camera calibration (pose estimation)

    Given matched points $\{\mathbf{X}_i,\mathbf{x}_i\}$ and a camera model $\mathbf{x}=P\mathbf{X}$, need to estimate $P$

    - $$\begin{bmatrix}x\\y\\w\end{bmatrix}=\mathbf{x}=P\mathbf{X}=\begin{bmatrix}p_1^T\\p_2^T\\p_3^T\end{bmatrix}\mathbf{X}$$

    - heterogeneous coordinates $(x',y')$ are $x'=\frac{p_1^T\mathbf{X}}{p_3^T\mathbf{X}},y'=\frac{p_2^T\mathbf{X}}{p_3^T\mathbf{X}}$, equivalent to

        $p_1^T\mathbf{X}-p_3^T\mathbf{X}x'=0$
        
        $p_2^T\mathbf{X}-p_3^T\mathbf{X}y'=0$

    - Combine to a single system

        $$\begin{bmatrix}\mathbf{X}^T & 0_{1,3} & -x'\mathbf{X}^T\\0_{1,3}&\mathbf{X}^T&-y'\mathbf{X}^T\end{bmatrix}\begin{bmatrix}p_1\\p_2\\p_3\end{bmatrix}=0_{2,1}$$

    - Concatenate systems into one $Ap=0$

        Solve $\arg\min\|Ap\|_2^2$ subject to $\|p\|_2^2=1$

    - After getting $P$ need to find the intrinsic (of $K$) and extrinsic parameters

        We know that $$P=K\begin{bmatrix}R&t\end{bmatrix}=KR\begin{bmatrix}I&-\tilde{\mathbf{C}}\end{bmatrix}=\begin{bmatrix}M&-M\tilde{\mathbf{C}}\end{bmatrix}$$ with $M=KR$

        - So we can find $\tilde{\mathbf{C}}$ first as the projection of the camera center is origin.

            $$P\begin{bmatrix}\tilde{\mathbf{C}}\\1\end{bmatrix}=\begin{bmatrix}M&-M\tilde{\mathbf{C}}\end{bmatrix}\begin{bmatrix}\tilde{\mathbf{C}}\\1\end{bmatrix}=0_{3,1}$$, so $P\tilde{\mathbf{C}}=0_{3,1}$

            Do SVD of $P$ and $\tilde{\mathbf{C}}$ is the eigen vector with smallest eigen value

        - Find $M=KR$ for right upper triangle matrix $K$ and orthogonal matrix $R$, QR decomposition!

    - Pros and cons
        - pros: simple, analytical
        - cons: doesn’t minimize the correct error function

- Minimizing reprojection error

## Triangulation

- Definition

    Given a set of (noisy) matched points $\{(x_i,x_i')\}$ and camera matrices $P,P'$, estimate the 3D point $X$ in the world frame.

    The model is $\mathbf{x}=P\mathbf{X}$, also $\mathbf{x}=\alpha P\mathbf{X}$ as we are using homogeneous coordinates.

- Cross product

    $c=a\times b=|a||b|\sin\theta~n$, with $\theta$ the angle between $a$ and $b$, $n$ the unit vector perpendicular to $a$ and $b$, the direction is determined using right hand rule. Thus $a\times a = 0$
    
- Solution

    $\mathbf{x}=\alpha P\mathbf{X}$ means $\mathbf{x}$ and $P\mathbf{X}$ has the same direction, thus, $\mathbf{x}\times P\mathbf{X}=0$, which gives
    
    $$\begin{bmatrix}x\\y\\1\end{bmatrix}\times\begin{bmatrix}p_1^T\mathbf{X}\\p_2^T\mathbf{X}\\p_3^T\mathbf{X}\end{bmatrix}=\begin{bmatrix}yp_3^T\mathbf{X}-p_2^T\mathbf{X}\\p_1^T\mathbf{X}-xp_3^T\mathbf{X}\\xp_2^T\mathbf{X}-yp_1^T\mathbf{X}\end{bmatrix}=\begin{bmatrix}0\\0\\0\end{bmatrix}$$

    Here, the last equation is a combination of the first two. By stacking the system for $P$ and $P'$, $X$ can be estimated using SVD.

## Epipolar geometry

- Epipole might not be always in the image.
    
    <img src="https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553510289148_image.png" height="300">

- Points on the epipolar line $l'$ marked as $x'$ are the potential matches for $x$.

    <img src="https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553510367300_image.png" height="300">

- Cross product

    $$a\times b=\begin{bmatrix}0&-a_3&a_2\\a_3&0&-a_1\\-a_2&a_1&0\end{bmatrix}\begin{bmatrix}b_1\\b_2\\b_3\end{bmatrix}=[a]_\times b$$

- Essential matrix (maps a point to a line)

    Given a point in one image, multiplying by the essential matrix will tell us the epipolar line in the second view, i.e. $l'=Ex$.

    Derivation

    - Denote $t=o-o'$, then $x'=R(x-t)$ where $R$ is the rotation of view.
    - Three vectors, $x,t,x'$ are coplanar, thus
        $x^T(t\times x)=0$ and also $(x-t)^T(t\times x)=0$
    - Since $x'=R(x-t)$, we have ${x'}^TR=(x-t)$, then
        $$({x'}^TR)(t\times x)=({x'}^TR)([t]_\times x)={x'}^T(R[t]_\times) x=0$$
    - $E=R[t]_\times$ is a 3*3 matrix


    Properties

    - Longuet-Higgins equation ${x'}^TEx=0$

    - Epipolar lines
        - $x^Tl=0$, $l=E^Tx'$
        - ${x'}^Tl'=0$, $l'=Ex$

        where an epipolar line $l$, i.e. $ax+by+c=0$, is denoted as $l=[a,b,c]^T$, and a point $x$ is on $l$ means $x^Tl=0$.

    - Epipoles
        - $Ee=0$
        - ${e'}^TE=0$


    Assumption
    We assume that the points aligned to camera coordinate axis (calibrated camera).
    The points $x,x'$ above are actually points in camera frame, should be denoted as $\hat{x},\hat{x}'$ and note the image points as $x,x'$, then we have $\hat{x}=K^{-1}x$.

    Note that before we have $$\mathbf{x}=K\begin{bmatrix}I&0_{3,1}\end{bmatrix}\mathbf{X}_\text{cam}$$ where $\mathbf{x}$ is homogenous image point and $\mathbf{X}_\text{cam}$ is homogenous camera point.
    
- Fundamental matrix

    The fundamental matrix is a generalization of the essential matrix, where the assumption of calibrated cameras is removed.


    The equation of essential matrix is in fact ${\hat{x}'}^TE\hat{x}=0$, using $\hat{x}=K^{-1}x$, we have ${x'}^TFx=0$ with $F={K'}^{-T}EK^{-1}$, a 3*3 matrix.


    Eight-point algorithm
## Stereo

- We have $\frac{X}{Z}=\frac{x}{f}, \frac{b-X}{Z}=\frac{x'}{f}$, therefore disparity $d=x-x'=\frac{bf}{Z}$ which is inversely proportional to depth $Z$. In the figure, orange lines are image planes and $O,O'$ are camera centers.

    <img src="https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553515140814_image.png" height="250">

- Stereo rectification

    <img src="https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553516459110_image.png" height="250">

- Compute Depth

    To compute depth, need to make epipolar lines horizontal and calculate the depth from disparity $Z=\frac{bf}{d}$. The epipolar lines are horizontal when $R=I,t=(T,0,0)$, then
    
    $$E=\begin{bmatrix}0&0&0\\0&0&-T\\0&T&0\end{bmatrix}$$
    
    ${x'}^TEx=0$ gives $v=v'$ where $x=(u,v,1)^T$. So the image of a 3D point will always be on the same horizontal line.

- Stereo rectification

    Reproject image planes onto a common plane parallel to the line between camera centers. It requires two homographies (3*3 transform) for each input image.
    
    <img src="https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553516942103_image.png" height="250">
    <img src="https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553516966726_image.png" height="250">
    <img src="https://d2mxuefqeaa7sj.cloudfront.net/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1553517040371_image.png" height="250">

    Rotate the right camera by $R$, Rotate both cameras so that the epipoles are at infinity, Adjust the scale

- Stereo matching

    For each pixel, find the epipolar line, scan the line for best match, and compute the depth from dispartiy
    
## Structure from motion

# Physics-based vision (not finished)
- Reflectance and image formation
- Radiometry
- Shape from shading
- Photometric stereo
- Color

# Objects, faces, and learning
- Basics of probability
- K-means, KNN, PCA, SVM
- Bag of words
- Viola-Jones face detection
- Perceptron, backpropagation
- Convolutional neural networks

# Dealing with motion

## Optical flow

Assumptions:

- Color constancy

    Brightness constancy for intensity images. Intensity is the same.

- Small motion

    Pixels only moves a little. Displacement is small $(u\delta t, v\delta t)$.

$I(x+u\delta t,y+v\delta t,t+\delta t)=I(x,y,t)$

$\dfrac{dI}{dt}=\dfrac{\partial I}{\partial x}\dfrac{dx}{dt}+\dfrac{\partial I}{\partial y}\dfrac{dy}{dt}+\dfrac{\partial I}{\partial t}=0y$ ($dt$ is total derivative)

$I_xu+I_yv+I_t=0$

### Constant flow

Assumptions:

- Flow is locally smooth
- Neighboring pixels have same displacement

Use a 5*5 image patch, gives 25 equaltions:

$I_x(p_i)u+I_y(p_i)v+I_t(p_i)=0$

Can be solved by LS

$$\begin{bmatrix}\sum\limits_iI_x(p_i)I_x(p_i) & \sum\limits_iI_x(p_i)I_y(p_i)\\\sum\limits_iI_x(p_i)I_y(p_i) &\sum\limits_iI_y(p_i)I_y(p_i)\end{bmatrix}\begin{bmatrix}u\\ v\end{bmatrix}=-\begin{bmatrix}\sum\limits_iI_x(p_i)I_t(p_i)\\ \sum\limits_iI_y(p_i)I_t(p_i)\end{bmatrix}$$

Matrix is the same as Harris Corner Detector.

### Aperture problem

Horn-Schunck optical flow

$$\min\limits_{u,v} \sum_{i, j}\left\{E_{s}(i, j)+\lambda E_{d}(i, j)\right\}$$

- Enforce brightness constancy

    $E_{d}(i, j)=\left[I_{x} u_{i j}+I_{y} v_{i j}+I_{t}\right]^{2}$

- Enforce smooth flow field

    $E_{s}(i, j)=\frac{1}{4}\left[\left(u_{i j}-u_{i+1, j}\right)^{2}+\left(u_{i j}-u_{i, j+1}\right)^{2}+\left(v_{i j}-v_{i+1, j}\right)^{2}+\left(v_{i j}-v_{i, j+1}\right)^{2}\right]$

## Image Alignment

$\min\limits_p \sum\limits_x[I(W(x;p))-T(x)]^2$
where

- $T$ is template image
- $W$ is warped image
- $I(x')=I(W(x;p))$, $I$ is non-parametric

### Lucas-Kanade alignment

$I(W(x;p+\Delta p))\approx I(W(x;p))+\dfrac{\partial I(W(x;p))}{\partial x'}\dfrac{\partial W(x;p)}{\partial p}\Delta p$

Assume we have a initial guess of $p$, then solve for $\Delta p$ using LS

$$\min\limits_p \sum\limits_x[I(W(x;p))+\nabla I \frac{\partial \mathbf{W}}{\partial p} \Delta p-T(x)]^2$$

<img src="https://paper-attachments.dropbox.com/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1555628056974_Screenshot+from+2019-04-18+23-54-00.png" height="250">

Left: Lucas Kanade (Additive alignment), Right: Shum-Szeliski (Compositional alignment)

In conclusion, the update rules are:

- Lucas Kanade (additive alignment)

    $W(x;p)\leftarrow W(x;p+\Delta p)$

- Shum-Szeliski (compositional alignment)

    $W(x;p)\leftarrow W(x;p)\circ W(x;\Delta p)$

- Baker-Matthews (inverse compositional alignment)

    $W(x;p)\leftarrow W(x;p)\circ W(x;\Delta p)^{-1}$

## Kalman Filtering

## Tracking (KLT, Mean-Shift)

### Kanade-Lucas-Tomasi (KLT)

1. Find corners satisfying $\min(\lambda_1,\lambda_2)>\lambda$
2. For each corner compute displacement to next frame using the Lucas-Kanade method
3. Store displacement of each corner, update corner position 
4. (optional) Add more corner points every M frames using 1
5. Repeat 2 to 4
6. Returns long trajectories for each corner point

### Mean-Shift

Like gradient descent of the kernel density estimate $P(x)$ A

<img src="https://paper-attachments.dropbox.com/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1555662812640_Screenshot+from+2019-04-19+09-33-18.png" height="250">
<img src="https://paper-attachments.dropbox.com/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1555662837090_Screenshot+from+2019-04-19+09-33-42.png" height="250">

### Mean-Shift for images

Each pixel is point with a weight

<img src="https://paper-attachments.dropbox.com/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1555663325275_Screenshot+from+2019-04-19+09-41-46.png" height="250">

### Non-rigid object tracking

- Target descriptor $q=\{q_1,\cdots,q_M\}$
    with $q_{m}=C \sum\limits_n k(\|x_{n}\|^{2}) \delta[b(x_{n})-m]$

- Candidate descriptor $p(y)=\{p_1(y),\cdots,p_M(y)\}$
    with $p_{m}(y)=C_{h} \sum\limits_{n} k(\|\frac{y-x_{n}}{h}\|^{2}) \delta[b(x_{n})-m]$

    There’s only one target but multiple candidates.

- Similarity between target and candidate
    
    $d(y)=\sqrt{1-\rho[p(y),q]}$
    
    $\rho[p(y),q]=\frac{p(y)^\intercal q}{\|p\|\|q\|}$ is the cosine distance
    minimize the distance $d$ is to maximize $\rho$

<img src="https://paper-attachments.dropbox.com/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1555664836264_Screenshot+from+2019-04-19+10-06-49.png" height="250">
<img src="https://paper-attachments.dropbox.com/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1555664836245_Screenshot+from+2019-04-19+10-06-58.png" height="250">
<img src="https://paper-attachments.dropbox.com/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1555664836284_Screenshot+from+2019-04-19+10-06-31.png" height="250">

## Temporal inference and SLAM

Temporal state model. States $X_t$ and observation $E_t$. Assumptions:
- stationary process
    $P(E_t|X_t)=P_t(E_t|X_t)$
- Markov
    $P(X_t|X_t-1,\cdots)=P(X_t|X_t-1)$
- prior state is known
    $X_0$ is known
- Joint probability 
    $P(X_{0}) \prod_{t=1}^{T} P(X_{t} | X_{t-1}) P(E_{t} | X_{t})$

![](https://paper-attachments.dropbox.com/s_1318AA747222A592C1AAB7639C877213266FDF07325852E17F0CB186C44326C8_1555666741125_Screenshot+from+2019-04-19+10-38-47.png)

# Not finished

