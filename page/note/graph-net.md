---
layout: default
math: true
title: Graph Neural Networks
---

# Graph Neural Networks

## Background

### Fourier Analysis
> [Reference](http://conteudo.icmc.usp.br/pessoas/gnonato/gs/slide1.pdf)

- Fourier Transform $$\mathcal{F}[f]=F$$

    $$F(\omega)=\frac{1}{\sqrt{2\pi}}\int\limits_{-\infty}^\infty f(t)\exp(-i\omega t)dt$$

- Inverse Fourier Transform $$\mathcal{F}^{-1}[F]=f$$

    $$f(t)=\frac{1}{\sqrt{2\pi}}\int\limits_{-\infty}^\infty F(\omega)\exp(i\omega t)d\omega$$

- Properties
    - Convolution theorem

        $$F[f*g]=F[g]F[g]$$

    - Impossibility of Perfect Band-Limiting

        A signal has perfectly bandlimited spectrum iff the signal persists for all time.

    - A filter $$\mathcal{L}$$ maps a signal $$f$$ into another signal $$\mathcal{L}[f]$$
        - Linear

            $$\mathcal{L}[af+bg]=a\mathcal{L}[f]+b\mathcal{L}[g]$$

        - Time invariant

            $$\mathcal{L}[f(\omega-x)](t)=\mathcal{L}[f(\omega)](t-c)$$

        - Theorem

            If a filter is linear and time invariant, there exists a function $$h$$ such that $$\mathcal{L}[f]=f*h$$

### Graph Laplacian
> [Reference](http://conteudo.icmc.usp.br/pessoas/gnonato/gs/slide2.pdf)

- Laplacian

    The pointwise formulation for the Laplacian acting on a function $$f:V\rightarrow\mathbb{R}$$ is
    $$\Delta f(x)=\sum\limits_{y\sim x}f(x)-f(y)$$

- Graph Laplacian
    - $L=D-A$
        - $$A$$ is the adjacency matrix, $$a_{ij}=1$$ if node i, j are connected
        - $$D$$ is diagonal with $$D_{ii}=\sum\limits_j a_{ij}$$
    
    - $L=D-W$
        - $$w_{ij}$$ is the weight of the edge between node i, j
        - $$D$$ is diagonal with $$D_{ii}=\sum\limits_j w_{ij}$$
        - Assuming non-negative edge weights, $$L$$ is positive semi-definite. $$x^TLx\geq0$$

    - Normalized Graph Laplacian

        $$\tilde{L}=D^{-1/2}LD^{-1/2}=I-D^{-1/2}AD^{-1/2}$$

        eigen values are between $[0,2]$

    - Properties
        - $$L1=0$$, zero is a eigen value.
        - The multiplicity of the eigenvalue zero is equal to the number of connected components of the graph.
        - Embedding
            - Supposing the graph is connected (there’s a path between every pair of nodes), the eigenvector associated to the smallest non-zero eigenvalue (Fiedler Vector) provides the best one-dimensional embedding.

                $$\min \sum\limits_{(i,j)\in E} w_{ij}(f_i-f_j)^2=f^TLf$$

                imposing the constraint $$\|f\|=1$$ to prevent $$f=0$$.

            - Embedding in $\mathbb{R}^d$

                Consider $f:V\rightarrow\mathbb{R}^d$, then $f_i\in\mathbb{R}^d$ is the embedding of  the i-th node, let $F=[f_1,f_2,\cdots]^T$ be the embedding matrix of size  $N\times M$, then

                $$\min \sum\limits_{(i,j)\in E} w_{ij}\|f_i-f_j\|^2=\text{Trace}[F^TLF]$$

                imposing the constraint $$\|f_i\|=1$$.

                The solutions are the eigen vectors of $$L$$ using the d smallest non-zero eigenvalues.

- Graph Laplacian Equation

    Let $G=(V,E)$ be a graph, consider a scalar function $f:V\rightarrow\mathbb{R}$, $f$ satisfies the Graph Laplacian equation if $Lf=0$, here $f$ is the vector of values of all nodes.

### Graph Fourier Transform
> References [[1]](http://conteudo.icmc.usp.br/pessoas/gnonato/gs/slide3.pdf), [[2]](http://www.norbertwiener.umd.edu/Research/lectures/2014/MBegue_Prelim.pdf)

- Graph Fourier Transform

    $$\mathcal{GF}[f](\lambda_l)=\hat{f}(\lambda_l)=\langle f,u_l\rangle=\sum\limits_{i=1}^nf(i)u_l(i)$$ 

    (the function is only defined on the eigen values)

    $$\mathcal{IGF}[\hat{f}](i)=f(i)=\sum\limits_{i=1}^n\hat{f}(\lambda_l)u_l(i)$$

    (the function is only defined on each node for i=1 to N)

    where $$\lambda_l$$ and $$u_l$$ is the eigen value and vector of $$L$$.

    Think $$f,u_l$$ are $$N\times1$$ vectors, $$\hat{f}$$ is $$M\times1$$ vector, let $U=[\cdots;u_l;\cdots]$ be a matrix of size $$N\times M$$, then
        
    $$\hat{f}=U^Tf,\quad f=U\hat{f}$$

    Columns of $$U$$ are eigen vectors of $$L$$ with $$\|u_l\|=1$$

- Parseval’s Identity
    
    $$\langle f,g\rangle=f^Tg=\hat{f}^TU^TU\hat{g}=\hat{f}^T\hat{g}=\langle \hat{f},\hat{g}\rangle$$

    In particular, $$\|f\|=\|\hat{f}\|$$

- Graph convolution

    $$[f*g](i)=\sum\limits_l\hat{f}(\lambda_l)\hat{g}(\lambda_l)u_l(i)$$

    so $$\mathcal{GF}[f*g]=\mathcal{GF}[f]\odot\mathcal{GF}[g]$$ ($$\odot$$ means element-wise)
    
    If $$\hat{g}$$ is polynomial, $$\hat{g}(\lambda_l)=\sum\limits_{k=0}^Ka_k\lambda_l^k$$, using $$\hat{f}(\lambda_l)=\sum\limits_{i=1}^nf(i)u_l(i)$$ then
    
    $$[f*g](i)=\sum\limits_l(\sum\limits_{j=1}^nf(j)u_l(j))(\sum\limits_{k=0}^Ka_k\lambda_l^k)u_l(i)$$

    Let $$(L^k)_{ij}=\sum\limits_l\lambda_l^ku_l(i)u_l(j)$$ and $$b_{ij}=\sum\limits_ka_k(L^k)_{ij}$$, then

    $$[f*g](i)=\sum\limits_{j=1}^nb_{ij}f(j)=Bf$$ with $$B\in\mathbb{R}^{N\times N}$$

    Therefore, when the filter is a polynomial in the spectral domain, the filtered signal (f*g) in each node i is a linear combination of the original signal in the neighborhood of i.


    If $$\hat{g}(\lambda_l)=\alpha+\beta\lambda_l$$, then $$b_{ij}=\alpha+\beta L_{ij}$$, $$B=\alpha I+\beta L$$, $$[f*g]=(\alpha I +\beta L)f$$. If take the normalized Laplacian, $$\tilde{L}=I-D^{-1/2}AD^{-1/2}$$, then it’s equivalent to
    
    $$[f*g]=(\alpha I +\beta D^{-1/2}AD^{-1/2})f$$
    
    This equation is very similar to the Eq (6) in [GCN](https://arxiv.org/abs/1609.02907).
    
- Translation

    Translation to a node j can be seen as a convolution with the delta function $$\delta_j$$ ($$\hat{\delta}_j=u_l(j)$$).

    $$(T_jf)(i)=\sqrt{N}(f*\delta_j)(i)=\sqrt{N}\sum\limits_l\hat{f}(\lambda_l)u_l(i)u_l(j)$$

    The energy of the signal is not preserved, $$\|T_jf\|\neq\|f\|$$.

- Modulation

    $$(M_lf)(i)=\sqrt{N}f(i)u_l(i)$$

    $$u_0=N^{-1/2}$$ then $$M_0$$ is the identity operator


### Batch Norm

![](https://paper-attachments.dropbox.com/s_FF2A5C7130C26DAE7CB42EFC8778FFB625833693677E040B9872E1BEE4CAE69E_1554129238439_image.png)

## Graph Networks

### Graph Convolutional Network
> [https://arxiv.org/abs/1609.02907](https://arxiv.org/abs/1609.02907)

$$Z=\tilde{D}^{-1/2}\tilde{A}\tilde{D}^{-1/2}X^{k-1}\Theta$$

where

- $$\tilde{A}=A+I_N$$ and $$A$$ is the adjacency matrix
- $$\tilde{D}_{ii}=\sum\limits_j\tilde{A}_{ij}$$ is a diagonal matrix
- $$X^k\in\mathbb{R}^{N\times C}$$ is the input features at k-th layer
- $$Z\in\mathbb{R}^{N\times F}$$ is the output features
- $$\Theta\in\mathbb{R}^{C\times F}$$ is the parameter matrix to develop features

An activation function should be applied to $$Z$$ with a bias:

$$X^k=\sigma(Z+b)$$

### Highway GCN
> [https://arxiv.org/abs/1804.08049](https://arxiv.org/abs/1804.08049)

$$\tilde{X}^k=\sigma(Z+b)$$

$$T=\text{sigmoid}(WX^{k-1}+c)$$

$$X^k=\tilde{X}^k\odot T + X^{k-1}\odot(1-T)$$

where $Z$ is the same as the $Z$ in GCN.

### Simplifying Graph Convolutional Networks
> [https://arxiv.org/abs/1902.07153](https://arxiv.org/abs/1902.07153)

$$S=\tilde{D}^{-1/2}\tilde{A}\tilde{D}^{-1/2}$$

$$Z=\sigma(S^KX\Theta)$$

where the non-linearities between layers are removed.

### FastGCN
> [https://arxiv.org/abs/1801.10247](https://arxiv.org/abs/1801.10247)

GCN can be treated as

$$S=\tilde{D}^{-1/2}\tilde{A}\tilde{D}^{-1/2}$$

$$Z=\sigma(SX\Theta)$$

where $$X\in\mathbb{R}^{N\times C}$$ is the input features and its i-th row is the features of the i-th node

$$Z_{i,:}=\sum\limits_{j=1}^NS_{ij}X_{j,:}\Theta$$

If for each layer, we sample $$T$$ nodes from $$N$$ nodes, denote the indices as $$I_T$$

$$Z_{i,:}=\frac{N}{T}\sum\limits_{j=1}^N1_{j\in I_T}S_{ij}X_{j,:}\Theta$$

Further, we can use **importance sampling** (sample the nodes following a distribution $$q$$)

$$Z_{i,:}=\frac{1}{T}\sum\limits_{j=1}^N1_{j\in I_T}q_j^{-1}S_{ij}X_{j,:}\Theta$$

with $$q_j\sim\|S_{:,j}\|^2$$.

The sampling in each GCN layer is independent.

### Relational Graph Convolutional Network
> [https://arxiv.org/abs/1703.06103](https://arxiv.org/abs/1703.06103)

- Message passing framework

    $$h_i=\sigma\left(\sum\limits_{m\in\mathcal{M}_i}g_m(h_i,h_j)\right)$$
    
    $$\mathcal{M}_i$$ is the set of incoming messages for node $$i$$
    
    $$g_m(h_i,h_j)$$ is the message from node $$j$$ to node $$i$$

- R-GCN

    $$h_i=\sigma\left(W_0h_i+\sum\limits_{r\in\mathcal{R}}\sum\limits_{j\in\mathcal{N}_i^r}c_{i,r}^{-1}W_rh_j\right)$$

    where
    - $$\mathcal{N}_i^r$$ is the set of neighbors for node $$i$$ under relation $$r$$
    - $c_{i,r}$ is a normalization constant, e.g. number of elements in $\mathcal{N}_i^r$ or the sum of number of elements over relations, but it might be problematic for nodes having high degree.

- Regularization
    - Basis decomposition

        $$W_r=\sum\limits_ba_{rb}V_b$$
    
        $$\{V_b\}$$ is a basis transformations and the transformation of each relation is a linear combination of the basis
    
    - Block decomposition
    
        $$W_r=\bigoplus\limits_bQ_{rb}$$
    
        $$W_r$$ is a direct sum of low dimensional matrices, therefore it is sparse.
        Direct sum: $$A\bigoplus B=\begin{bmatrix}A &\\&B\end{bmatrix}$$

### Graph Attention Networks
> [https://arxiv.org/abs/1710.10903](https://arxiv.org/abs/1710.10903)

$$h_i=\sigma\left(\sum\limits_{j\in\mathcal{N}_i}\alpha_{ij}Wh_j\right)$$

where $$\alpha_{ij}\sim\exp(\text{LeakyReLU}(a^T[Wh_i;Wh_j]))$$ (normalize over $j$) with a weight vector $$a$$.

The attention can be extended to multi-head like transformer, where $h_i$ from multiple heads are concatenated. If using multi-head attention, the results should be averaged before activation at the final layer:

$$\sigma\left(\frac{1}{K}\sum\limits_k\sum\limits_{j\in\mathcal{N}_i}\alpha_{ij}^kW^kh_j\right)$$

Skip connections could also be considered with attention mechanism.

### Line Graph Neural Network
> [https://arxiv.org/abs/1705.08415](https://arxiv.org/abs/1705.08415)

- GNN

    $$\tilde{x}_i=x_{i} \theta_{1}+\left(D x\right)_{i} \theta_{2}+\sum_{j=0}^{J-1}\left(A^{2^{j}} x\right)_{i} \theta_{3+j}$$

    $$x_i=[\rho\left[\tilde{x}_i\right];\tilde{x}_i]$$

    where $$Dx=\text{diag}(A1)x$$ is the degree operator and $$A\in\mathbb{R}^{\mid V\mid\times\mid V\mid}$$ is the adjacency matrix and $$x\in\mathbb{R}^{\mid V\mid\times d}$$.

- Line graph
    
    Given $$G=(V,E)$$, the line graph is $$L(G)=(V_L,E_L)$$, where the node are the ordered edges in $$E$$, $$V_{L}=\{(i \rightarrow j) ;(i, j) \in E\} \cup\{(j \rightarrow i) ;(i, j) \in E\}$$ and two nodes $$(i\rightarrow j)$$ and $$(i'\rightarrow j')$$ in $$L(G)$$ are connected if $$j=i',j'\neq i$$.
    
- LGNN
    
    $$\tilde{x}_{i, l}=x_{i} \theta_{1}+\left(D x\right)_{i} \theta_{2}+\sum_{j=0}^{J-1}\left(A^{2^{j}} x\right)_{i} \theta_{3+j}+[[\text{Pm}, \text{Pd}] y]_i \theta_{3+J}$$

    $$\tilde{y}_{i}=y_{i} \gamma_{1}+\left(D_{L(G)} y\right)_{i} \gamma_{2}+\sum_{j=0}^{J-1}\left(A_{L(G)}^{2^{j}} y\right)_{i} \gamma_{3+j}+[[\text{Pm}, \text{Pd}]^\intercal x]_i \gamma_{3+J}$$

    where
    - $$[\text{Pm,Pd}]\in\{0,1\}^{\mid V\mid\times2\mid E\mid}$$,
    - $$\mathrm{Pm}_{i,(i \rightarrow j)}=1, \mathrm{Pm}_{j,(i \rightarrow j)}=1, \mathrm{Pd}_{i,(i \rightarrow j)}=1, \mathrm{Pd}_{j,(i \rightarrow j)}=-1$$,
    - $$x\in\mathbb{R}^{\mid V\mid\times d},y\in\mathbb{R}^{2\mid E\mid\times d}$$,
    - $$\text{Pm}~y$$ calculates the sum of connected edges for the node,
    - $$\text{Pd}~y$$ calculates the sum of out edges for the node - the sum of in edges for the node.

### Large-Scale Learnable Graph Convolutional Network
> [https://arxiv.org/abs/1808.03965](https://arxiv.org/abs/1808.03965)

LGCL automatically selects a fixed number of neighboring nodes for each feature based on value ranking in order to transform graph data into grid-like structures in 1-D format, thereby enabling the use of regular convolutional operations on generic graphs.

- k-leargest node selection in one LGCN layer

    Consider node i, assume it has n > k neighbors, each node has F features. For each feature f, take the k-largest values, so for the node i, together with its own features, the result is a matrix of fixed-size (k+1)*F. This matrix is later reduced to a vector (node embedding) via 1D convolution.
    
    <img src="https://paper-attachments.dropbox.com/s_FF2A5C7130C26DAE7CB42EFC8778FFB625833693677E040B9872E1BEE4CAE69E_1554134570218_Screenshot+from+2019-04-01+17-02-25.png" alt="Learnable GCN" height="300">

- Sub-graph selection algorithm

    To deal with large graph, for each training, a sub-graph could be extracted as follows.

    <img src="https://paper-attachments.dropbox.com/s_FF2A5C7130C26DAE7CB42EFC8778FFB625833693677E040B9872E1BEE4CAE69E_1554133772215_Screenshot+from+2019-04-01+16-49-20.png" alt="Learnable GCN" height="250">
    <img src="https://paper-attachments.dropbox.com/s_FF2A5C7130C26DAE7CB42EFC8778FFB625833693677E040B9872E1BEE4CAE69E_1554133772231_Screenshot+from+2019-04-01+16-49-09.png" alt="Learnable GCN" height="250">

### GraphSage (sample and aggregate)
> [https://arxiv.org/abs/1706.02216](https://arxiv.org/abs/1706.02216)

- Algorithm

    Given Graph $$G(V, E)$$, each node $$v$$ has feature $$x_v$$

    - Init embedding by feature
    - For $$k=1:K$$
        - Sample a fixed size neighborhood for every node
        - for each node $$v$$ 
            - aggregate the embedding of neighbors into a embedding $$h^k_{n(v)}$$
            - concatenate $$h^k_{n(v)}$$ and $$h_v^{k-1}$$ then pass to a fully connected layer
                $$h^k_v=\sigma(W^k[h_v^{k-1};h_{n(v)}^k])$$
            - normalize $$h_v^k$$ to make sure the norm is one
    - $$h_v^K$$ is the final representation of node $$v$$

- Aggregator

    - LSTM/GRU/Attention
    - Pooling (max/mean)
    - Mean
    
        $$h^k_v=\sigma(W^k\text{mean}\{\{h_u^{k-1}\mid u\in n(v)\}\cup \{h_v^{k-1}\}\})$$

### Diffusion-Convolutional Neural Networks
> [https://arxiv.org/abs/1511.02136](https://arxiv.org/abs/1511.02136)

- Node classification

    $$Z=f(W\odot (P_*X))$$

    where
    - $$X\in\mathbb{R}^{N\times F}$$, $$P_*\in\mathbb{R}^{N\times H\times N}$$, $$W\in\mathbb{R}^{1\times H\times F}$$, $$Z\in\mathbb{R}^{N\times H\times F}$$
    - $$N$$ is the number of nodes, $$F$$ is the number of features
    - $$P_*$$ contains the power series of $$P\in\mathbb{R}^{N\times N}$$, $$\{P,\cdots,P^H\}$$
        $$P_{ij}$$ means the probability to jump from node i to node j
        $$P=D^{-1/2}AD^{-1/2}$$ with $$A$$ the adjacency matrix and $$D_{ii}=\sum\limits_jA_{ij}$$
    $$Z$$ is later flatten into $$N\times HF$$ and followed by MLP to produce label probabilities

- Graph classification

    $$Z=f(W\odot (\frac{1}{N}1_N^\intercal P_*X))$$

    where $$X\in\mathbb{R}^{N\times F}$$, $$P_*\in\mathbb{R}^{N\times H\times N}$$, $$W\in\mathbb{R}^{H\times F}$$, $$Z\in\mathbb{R}^{H\times F}$$
    $$Z$$ is later flatten into a single vector to produce label probabilities

- Edge classification with edge features

    An edge $$e:x\rightarrow y$$ can be converted into $$x\rightarrow e\rightarrow y$$, so the edge itself becomes a node.

### Gated Graph Sequence Neural Networks
> [https://arxiv.org/abs/1511.05493](https://arxiv.org/abs/1511.05493)

$$h_{n(v)}=\sum\limits_{u\in n(v)}h_u^{k-1}+b$$

$$h_v^{k}=\text{GRU}(x:h_{n(v)},h:h_v^{k-1})$$

### Jumping Knowledge Networks
> [https://arxiv.org/abs/1806.03536](https://arxiv.org/abs/1806.03536)

The idea is that, in the same graph, for different nodes, the same number of steps can lead to very different effect. Because the range of neighboring nodes that a node's representation draws from strongly depends on the graph structure. For a node, denote its representation at different layers as $$h_v^1,\cdots,h_v^k$$

The final representation is then an aggregation of these.

- Concatenation + projection
- LSTM+Attention
- Max pooling
