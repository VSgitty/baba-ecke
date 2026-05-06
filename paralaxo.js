/* Enhanced 3D Parallax Cinema Section */
.enhanced-parallax-cinema {
    position: relative;
    height: 100vh;
    min-height: 800px;
    overflow: hidden;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
    perspective: 1000px;
    transform-style: preserve-3d;
}

.parallax-3d-container {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
}

/* Parallax Layers */
.parallax-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
}

.parallax-bg-far {
    transform: translateZ(-300px) scale(1.3);
    opacity: 0.6;
}

.parallax-bg-mid {
    transform: translateZ(-150px) scale(1.15);
    opacity: 0.8;
}

.parallax-bg-near {
    transform: translateZ(-50px) scale(1.05);
}

.parallax-content {
    transform: translateZ(0);
    z-index: 10;
}

/* Stars Field */
.stars-field {
    position: relative;
    width: 100%;
    height: 100%;
}

.star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 50%;
    animation: twinkle 3s infinite alternate;
}

.star:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
.star:nth-child(2) { top: 30%; left: 80%; animation-delay: 0.5s; }
.star:nth-child(3) { top: 60%; left: 20%; animation-delay: 1s; }
.star:nth-child(4) { top: 80%; left: 70%; animation-delay: 1.5s; }
.star:nth-child(5) { top: 15%; left: 60%; animation-delay: 2s; }
.star:nth-child(6) { top: 70%; left: 90%; animation-delay: 2.5s; }
.star:nth-child(7) { top: 40%; left: 40%; animation-delay: 3s; }
.star:nth-child(8) { top: 90%; left: 30%; animation-delay: 3.5s; }

@keyframes twinkle {
    0% { opacity: 0.3; transform: scale(1); }
    100% { opacity: 1; transform: scale(1.5); }
}

/* Floating Posters */
.floating-elements {
    position: relative;
    width: 100%;
    height: 100%;
}

.floating-poster {
    position: absolute;
    width: 120px;
    height: 180px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s ease;
    animation: float 6s ease-in-out infinite;
}

.floating-poster img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.floating-poster:hover {
    transform: translateY(-10px) rotateY(15deg);
}

.floating-poster:hover img {
    transform: scale(1.1);
}

.poster-1 {
    top: 20%;
    left: 15%;
    animation-delay: 0s;
    transform: rotateY(-15deg) rotateX(5deg);
}

.poster-2 {
    top: 60%;
    right: 20%;
    animation-delay: 2s;
    transform: rotateY(15deg) rotateX(-5deg);
}

.poster-3 {
    top: 40%;
    left: 70%;
    animation-delay: 4s;
    transform: rotateY(-10deg) rotateX(10deg);
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotateY(var(--rotate-y, 0deg)); }
    50% { transform: translateY(-20px) rotateY(var(--rotate-y, 0deg)); }
}

/* 3D Cinema Elements */
.cinema-elements {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.cinema-screen-3d {
    position: relative;
    width: 300px;
    height: 200px;
    background: linear-gradient(135deg, #222 0%, #444 100%);
    border-radius: 15px;
    transform: perspective(500px) rotateX(10deg);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8);
    margin-bottom: 50px;
}

.screen-glow {
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: radial-gradient(ellipse at center, rgba(244, 193, 15, 0.3) 0%, transparent 70%);
    border-radius: 25px;
    animation: pulse 3s ease-in-out infinite;
}

.screen-content {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.play-button {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #f4c10f 0%, #da7f09 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: playPulse 2s ease-in-out infinite;
}

.play-button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 30px rgba(244, 193, 15, 0.6);
}

.play-icon {
    color: #fff;
    font-size: 24px;
    margin-left: 3px;
}

@keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
}

@keyframes playPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

/* 3D Cinema Seats */
.cinema-seats-3d {
    display: flex;
    flex-direction: column;
    gap: 10px;
    transform: perspective(300px) rotateX(20deg);
}

.seat-row {
    display: flex;
    gap: 8px;
    justify-content: center;
}

.seat {
    width: 25px;
    height: 25px;
    background: linear-gradient(135deg, #666 0%, #444 100%);
    border-radius: 8px 8px 15px 15px;
    position: relative;
    transition: all 0.3s ease;
}

.seat::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 2px;
    right: 2px;
    height: 8px;
    background: linear-gradient(135deg, #777 0%, #555 100%);
    border-radius: 5px 5px 0
