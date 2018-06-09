import React, { Component } from 'react';
import imgRunner1 from './runnerImg/runner_1.png';
import imgRunner2 from './runnerImg/runner_2.png';
import imgRunner3 from './runnerImg/runner_3.png';
import imgRunner4 from './runnerImg/runner_4.png';
import imgRunner5 from './runnerImg/runner_5.png';
import imgRunner6 from './runnerImg/runner_6.png';

class AnimatedRunner extends Component {

    constructor(props) {
        super(props);

        this.drawRunner = this.drawRunner.bind(this);
        this.drawFrame = this.drawFrame.bind(this);

        this.runnerFrames = this.loadRunnerFrames();
        this.runnerWidth = this.runnerFrames[0].width;
        this.state = {runnerX: -this.runnerWidth, prevTime: null, prevTimeFrame: null, frameIndex: 0};
    }

    createImage() {
        return new Image(61, 75);
    }

    loadRunnerFrames() {
        const img1 = this.createImage();
        img1.src = imgRunner1;
        const img2 = this.createImage();
        img2.src = imgRunner2;
        const img3 = this.createImage();
        img3.src = imgRunner3;
        const img4 = this.createImage();
        img4.src = imgRunner4;
        const img5 = this.createImage();
        img5.src = imgRunner5;
        const img6 = this.createImage();
        img6.src = imgRunner6;
        const runnerFrames = [ img1, img2, img3, img4, img5, img6 ];
        return runnerFrames;
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        this.resizeCanvas(canvas);
        requestAnimationFrame(this.drawFrame);
    }

    componentDidUpdate() {
        requestAnimationFrame(this.drawFrame);
    }

    drawRunner(ctx, x, y, timeDelta, frameIndex) {
        ctx.drawImage(this.runnerFrames[frameIndex], x, y, 61, 75);
    }

    drawFrame(timestamp) {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let prevTime = this.state.prevTime;
        if (!prevTime) prevTime = timestamp;
        let timeDelta = timestamp - prevTime;
        prevTime = timestamp;

        const animationSpeed = 1000 / 6;
        const movingSpeed = 0.05;

        let prevTimeFrame = this.state.prevTimeFrame;
        if (prevTimeFrame === null) 
            prevTimeFrame = 0;
        else
            prevTimeFrame += timeDelta;
        let frameIndex = parseInt((prevTimeFrame / animationSpeed) % 6, 10);

        let x = this.state.runnerX;
        x += timeDelta * movingSpeed;
        if (x > canvas.width) {
            x = -this.runnerWidth;
        }
        const y = canvas.height - this.runnerFrames[0].height;
        this.drawRunner(ctx, x, y, timeDelta, frameIndex);

        this.setState({...this.state, runnerX: x, prevTime: prevTime, prevTimeFrame: prevTimeFrame});
    }

    resizeCanvas(canvas) {
        canvas.style.width = "100%";
        canvas.style.height = "200px";
        canvas.style.position = "absolute";
        canvas.style.zIndex = 0;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    render() {
        return (
            <canvas ref="canvas" />
        );
    }
}

export default AnimatedRunner;
