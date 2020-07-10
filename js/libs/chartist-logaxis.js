(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(require("chartist"))
    : typeof define === "function" && define.amd
    ? define(["chartist"], factory)
    : ((global = global || self), factory(global.Chartist));
})(this, function (Chartist) {
  "use strict";

  var globalChartist = Chartist;
  function AutoScaleAxis(axisUnit, data, chartRect, options) {
    var scale = options.scale || "linear";
    var match = scale.match(/^([a-z]+)(\d+)?$/);
    this.scale = {
      type: match[1],
      base: Number(match[2]) || 10,
    };
    if (this.scale.type === "log") {
      var highLow =
        options.highLow || getLogAxisHighLow(data, options, axisUnit.pos);
      this.bounds = getLogAxisBounds(
        chartRect[axisUnit.rectEnd] - chartRect[axisUnit.rectStart],
        highLow,
        options.scaleMinSpace || 20,
        options.onlyInteger,
        this.scale.base
      );
    } else {
      // Usually we calculate highLow based on the data but this can be
      // overriden by a highLow object in the options
      var highLow =
        options.highLow ||
        globalChartist.getHighLow(data, options, axisUnit.pos);
      this.bounds = globalChartist.getBounds(
        chartRect[axisUnit.rectEnd] - chartRect[axisUnit.rectStart],
        highLow,
        options.scaleMinSpace || 20,
        options.onlyInteger
      );
    }
    this.range = {
      min: this.bounds.min,
      max: this.bounds.max,
    };
    globalChartist.AutoScaleAxis["super"].constructor.call(
      this,
      axisUnit,
      chartRect,
      this.bounds.values,
      options
    );
  }
  function createGridAndLabels(
    gridGroup,
    labelGroup,
    useForeignObject,
    chartOptions,
    eventEmitter
  ) {
    var _this = this;
    var axisOptions = chartOptions["axis" + this.units.pos.toUpperCase()];
    globalChartist.AutoScaleAxis["super"].createGridAndLabels.call(
      this,
      gridGroup,
      labelGroup,
      useForeignObject,
      chartOptions,
      eventEmitter
    );
    if (axisOptions.showMinorGrid) {
      this.ticks.forEach(function (tick, index) {
        var lines = _this.scale.type === "log" ? 8 : 4; // default number of lines
        if (axisOptions.showMinorGrid !== true) {
          // showMinorGrid can be boolean for defaults or number of lines
          var linesOption = +axisOptions.showMinorGrid;
          if (linesOption > 0 && linesOption <= 10) {
            lines = linesOption;
          }
        }
        var sections = lines + 1;
        var nextTick = _this.ticks[index + 1];
        if (nextTick) {
          var minorGridTick = (nextTick - tick) / sections;
          for (var i = 1; i < sections; ++i) {
            var projectedValue = _this.projectValue(tick + i * minorGridTick);
            // Transform to global coordinates using the chartRect
            if (_this.units.pos === "x") {
              projectedValue = _this.chartRect.x1 + projectedValue;
            } else {
              projectedValue = _this.chartRect.y1 - projectedValue;
            }
            globalChartist.createGrid(
              projectedValue,
              index,
              _this,
              _this.gridOffset,
              _this.chartRect[_this.counterUnits.len](),
              gridGroup,
              [
                chartOptions.classNames.grid,
                chartOptions.classNames[_this.units.dir],
                chartOptions.classNames.gridMinor,
              ],
              eventEmitter
            );
          }
        }
      });
    }
  }
  globalChartist.AutoScaleAxis = globalChartist.Axis.extend({
    constructor: AutoScaleAxis,
    createGridAndLabels: createGridAndLabels,
    projectValue: logAxisProjectValue,
  });
  function getLogAxisBounds(
    axisLength,
    highLow,
    scaleMinSpace,
    onlyInteger,
    logBase
  ) {
    var bounds = globalChartist.getBounds(
      axisLength,
      highLow,
      scaleMinSpace,
      onlyInteger
    );
    var minDecade = Math.floor(baseLog(highLow.low, logBase));
    var maxDecade = Math.ceil(baseLog(highLow.high, logBase));
    bounds.min = Math.pow(logBase, minDecade);
    bounds.max = Math.pow(logBase, maxDecade);
    bounds.values = [];
    for (var decade = minDecade; decade <= maxDecade; ++decade) {
      bounds.values.push(Math.pow(logBase, decade));
    }
    return bounds;
  }
  function baseLog(val, base) {
    return Math.log(val) / Math.log(base);
  }
  function allValuesEqual(data, dimension) {
    var value = null;
    function sameValue(data) {
      if (Array.isArray(data)) {
        return data.every(sameValue);
      }
      var v = dimension ? +data[dimension] : +data;
      return value == null;
    }
    return sameValue(data);
  }
  function getLogAxisHighLow(data, options, dimension) {
    var highLow =
      options.highLow || globalChartist.getHighLow(data, options, dimension);
    if (data.length === 0) {
      highLow.low = 1;
      highLow.high = 1000;
    } else if (
      highLow.low === 0 &&
      highLow.high > 0 &&
      allValuesEqual(data, dimension)
    ) {
      // Chartist.getHighLow sets low to 0 if low would equal high
      highLow.low = highLow.high * 0.9;
    } else if (highLow.low * highLow.high <= 0) {
      throw new Error(
        "Negative or zero values are not supported on logarithmic axes."
      );
    }
    return highLow;
  }
  function logAxisProjectValue(value) {
    value = +globalChartist.getMultiValue(value, this.units.pos);
    var max = this.bounds.max;
    var min = this.bounds.min;
    if (this.scale.type === "log") {
      var base = this.scale.base;
      return (
        (this.axisLength / baseLog(max / min, base)) *
        baseLog(value / min, base)
      );
    }
    return (this.axisLength * (value - min)) / this.bounds.range;
  }
});
