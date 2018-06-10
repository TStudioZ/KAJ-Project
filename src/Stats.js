import React, { Component } from 'react';
import * as Message from './Messages';

/**
 * Contains the functionality for drawing charts
 * in an <svg> element.
 */
class Stats extends Component {

    constructor(props) {
        super(props);

        this.svgNS = "http://www.w3.org/2000/svg";
        this.svgWidth = 400;
        this.svgHeight = 200;
        this.svgBoxWidth = 380;
        this.svgBoxHeight = 180;
        this.labelFontSize = 10;

        this.createSvgText = this.createSvgText.bind(this);
        this.createPath = this.createPath.bind(this);
        this.drawSevenDayDistanceChart = this.drawSevenDayDistanceChart.bind(this);

        this.svgSevenDayDistance = null;
        this.setSvgSevenDayDistance = (e) => {
            this.svgSevenDayDistance = e;
        }

        this.state = { loading: true };
        // simulate loading
        setTimeout(() => {
            this.setState({...this.state, loading: false});
        }, 750);
    }

    componentDidUpdate() {
        this.drawSevenDayDistanceChart();
    }

    /**
     * Creates an svg text element.
     */
    createSvgText(x, y, color, fontSize, text) {
        const t = document.createElementNS(this.svgNS, "text");
        t.setAttributeNS(null, "x", x);
        t.setAttributeNS(null, "y", y);
        t.setAttributeNS(null, "fill", color);
        t.setAttributeNS(null, "font-size", fontSize);
        t.textContent = text;
        return t;
    }

    /**
     * Creates an svg path element.
     */
    createPath(color, width) {
        const p = document.createElementNS(this.svgNS, "path");
        p.setAttributeNS(null, "stroke-width", width);
        p.setAttributeNS(null, "stroke", color);
        p.setAttributeNS(null, "fill", "transparent");
        return p;
    }

    /**
     * Expects an array of values in a format {x, y, index} for each value.
     */
    drawLineChart(svg, values) {
        // draw the axes
        let p = this.createPath("black", 5);
        let dAttr = `M${40} ${0}`;
        dAttr += ` V ${this.svgBoxHeight - 5}`;
        dAttr += ` H ${this.svgWidth}`;
        p.setAttributeNS(null, "d", dAttr);
        this.svgSevenDayDistance.appendChild(p);

        // basic params
        const startX = 60;
        const startY = 20;
        const yLabelsStartY = 20;
        const yHeight = 150;

        // count the offset for x-labels
        const xOffset = ((this.svgBoxWidth - startX) / (values.length - 1));

        let max = -1;
        for (let v of values) {
            if (v.y > max) {
                max = v.y;
            }
        }
        const scale = yHeight / max;

        // create y-labels
        const yLabelCount = 5;
        const yOffset = yHeight / yLabelCount;
        const valueOffset = max / yLabelCount;
        for (let y = yLabelsStartY + yHeight, i = 0; y >= startY; y -= yOffset, i += valueOffset) {
            const label = this.createSvgText(0, y, "#000", this.labelFontSize, `${i}`);
            svg.appendChild(label);
        }
        
        // scale the values
        for (let v of values) {
            v.y = v.y * scale;
            v.y = (yLabelsStartY + yHeight) - v.y;
        }

        // draw the line chart
        p = this.createPath("green", 2);
        dAttr = `M${startX} ${values[0].y}`;
        for (let x = startX, i = 0; x <= this.svgBoxWidth + 1; x += xOffset, i++) {
            const text = this.createSvgText(x - 10, this.svgHeight - this.labelFontSize, 
                "#000", this.labelFontSize, `${values[i].x}`);
            svg.appendChild(text);
            dAttr += ` L ${x} ${values[i].y}`;
        }
        p.setAttributeNS(null, "d", dAttr);
        svg.appendChild(p);
    }

    drawSevenDayDistanceChart() {
        if (!this.svgSevenDayDistance) {
            return;
        }

        this.svgSevenDayDistance.innerHTML = "";

        const values2 = [
            {x: "Today - 6", y: 5}, 
            {x: "Today - 5", y: 2}, 
            {x: "Today - 4", y: 9}, 
            {x: "Today - 3", y: 10}, 
            {x: "Today - 2", y: 0}, 
            {x: "Today - 1", y: 15}, 
            {x: "Today", y: 9}];
        this.drawLineChart(this.svgSevenDayDistance, values2);
    }

    renderHeader() {
        return (
            <div className="stats-header">
                My Stats
            </div>
        );
    }

    renderStats() {
        return (
            <div className="stats-seven-day-distance">
                <div className="stats-seven-day-distance-header">
                    Tracked distance in the last 7 days (day X distance in km)
                </div>
                <svg className="stats-seven-day-distance-chart" ref={this.setSvgSevenDayDistance} viewBox="0 0 400 200" />
            </div>
        );
    }

    render() {
        const header = this.renderHeader();
        let contents;
        if (this.state.loading) {
            contents = Message.MessageLoading;
        } else {
            contents = this.renderStats();
        }

        return (
            <div className="stats-wrapper">
                {header}
                {contents}
            </div>
        );
    }
}

export default Stats;
