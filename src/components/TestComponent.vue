<template>
    <div class="container">
      <div class="arrow-rectangle" v-for="(square, index) in squares" :key="index" :style="getSquareStyle(index)"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        squares: 5, // Anzahl der Vierecke
        colorStart: '#0000FF', // Startfarbe
        colorEnd: '#FF0000' // Endfarbe
      };
    },
    methods: {
      getSquareStyle(index) {
        const percentageStart = (index / (this.squares - 1)) * 100; // Berechnung des prozentualen Fortschritts
        const colorStart = this.calculateColor(percentageStart); // Berechnung der aktuellen Farbe basierend auf dem prozentualen Fortschritt
  
        const percentageEnd = ((index+1) / (this.squares - 1)) * 100; // Berechnung des prozentualen Fortschritts
        const colorEnd = this.calculateColor(percentageEnd); // Berechnung der aktuellen Farbe basierend auf dem prozentualen Fortschritt
  
        return {
          width: '200px',
          height: '40px',
          background: `linear-gradient(to right, ${colorStart}, ${colorEnd})`,
        };
      },
      calculateColor(percentage) {
        const startRGB = this.hexToRGB(this.colorStart);
        const endRGB = this.hexToRGB(this.colorEnd);
  
        const r = this.calculateInterpolatedValue(startRGB.r, endRGB.r, percentage);
        const g = this.calculateInterpolatedValue(startRGB.g, endRGB.g, percentage);
        const b = this.calculateInterpolatedValue(startRGB.b, endRGB.b, percentage);
  
        return `rgb(${r}, ${g}, ${b})`;
      },
      hexToRGB(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
  
        return { r, g, b };
      },
      calculateInterpolatedValue(start, end, percentage) {
        return Math.round(start + (end - start) * (percentage / 100));
      }
    }
  };
  </script>
  
  <style>
  .container {
    display: flex;
  }
  
  .container div {
    margin-right: 10px;
  }


.arrow-rectangle {
  position: relative;
  color: inherit;
}

.arrow-rectangle::before,
.arrow-rectangle::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
}

.arrow-rectangle::before {
  top: 0;
  right: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 10px solid currentColor; /* gleiche Farbe wie das Rechteck */
  transform: translateX(100%);
}

  </style>
  