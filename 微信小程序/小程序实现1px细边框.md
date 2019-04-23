小程序1px
```
.t-line, .b-line, .l-line, .r-line, .ta-line, .ba-line, .la-line, .ra-line, .a-line, .aa-line, .d-line, .da-line {
    position: relative;
}

.t-line::before, .b-line::before, .l-line::before, .r-line::before, .a-line::before, .d-line::before
.ta-line::after, .ba-line::after, .la-line::after, .ra-line::after, .aa-line::after, .da-line::after {
 content: '';
 position: absolute;
 width: 200%;
 height: 200%;
 transform: scale(0.5);
 transform-origin: 0 0;
 pointer-events: none;
 box-sizing: border-box;
 border: 0 solid #e0e0e0;
 left: 0;
 right: 0;
 top: 0;
 z-index: 1000;
}

.t-line::before, .ta-line::after {
 border-top-width: 1px;
}

.b-line::before, .ba-line::after {
 border-bottom-width: 1px;
}

.l-line::before, .la-line::after {
 border-left-width: 1px;
}

.r-line::before, .ra-line::after {
 border-right-width: 1px;
}

.a-line::before, .aa-line::after {
  border-width: 1px;
}

.d-line::before, .da-line::after {
 border: 0 dotted #e0e0e0;
 border-width: 1px;
}
```
