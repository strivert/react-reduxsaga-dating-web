import React, { Component } from 'react';

class CirculatorPercentIndicator extends Component {

	render() {
		const { percentComplete } = this.props;

    const radius = 98;
    const circumference = 615.75;
    let arcLength = circumference * percentComplete / 100

    return (
      <svg height="199px" width="199px" version="1.1" viewBox="0 0 199 199">
        <defs>
          <circle cx="99.5" cy="99.5" r={radius} />
          <mask height="197.160156" id="mask-2" width="197.160156" fill="white" x="0" y="0">
            <circle cx="99.5" cy="99.5" r={radius} />
          </mask>
        </defs>
        <g fill="none" stroke="none" strokeWidth="1">
          <g transform="translate(-1029.000000, -244.000000)">
            <g transform="translate(964.000000, 244.000000)">
              <g transform="translate(65.000000, 0.000000)">
                <circle cx="99.5" cy="99.5" opacity="0.475687966" r={radius} stroke="#9B9B9B"/>
                <circle style={{transform: "rotate(-90deg)", transformOrigin: "center"}} cx="99.5" cy="99.5" r={radius} stroke="#FA7114" mask="url(#mask-2)" strokeWidth="16" strokeLinejoin="bevel" strokeDasharray={`${arcLength}, ${circumference}`} />
                <g fontFamily="Rubik-Medium, Rubik" transform="translate(37.000000, 52.000000)">
                  <text id="Your-Profile-Is" fill="#2B7DB6" fontSize="15">
                    <tspan x="2.6" y="14">Your Profile Is</tspan>
                  </text>
                  <text fill="#2B7DB6" fontSize="22">
                    <tspan x="11.372" y="89">Complete</tspan>
                  </text>
                  <text fill="#004B79" fontSize="48">
                    <tspan x="14.5" y="61">{ percentComplete }%</tspan>
                  </text>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
	}
}

export default CirculatorPercentIndicator;
