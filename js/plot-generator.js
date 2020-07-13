const renderPlot = (plotName, count) => {
  try {
    console.log(
      `%cPlot ${count + 1} is ${plotName}`,
      "color:#6699C2; font-size:15px"
    );
    const plot = equationList.filter(function (graph) {
      return graph.id === String(plotName);
    })[0];

    //document.getElementById("instructions").innerHTML = String(equationInfo.instructions);

    const multipleDose = plot.multiple_dose;
    const linearTopBound = plot.topBound;
    const linearBottomBound = plot.bottomBound;
    const logTopBound = Math.log10(plot.topBound);
    const logBottomBound = Math.log10(plot.bottomBound);
    let bottomBound = linearBottomBound;
    let topBound = linearTopBound;
    let bottomBoundArray = [],
      topBoundArray = [];
    //HTML divs
    const wrapperDivID = "slider_wrapper" + "-" + plotName;
    const latexDivID = "div_latex" + "-" + plotName;
    const plotDivID = "div_plot" + "-" + plotName;
    let go = true;
    const logToggle = document.getElementById(`toggle-track-${plotName}-log`);
    const fixToggle = document.getElementById(`toggle-track-${plotName}-fix`);
    const vars = plot.variables;
    let isFixed = false,
      range = plot.range,
      axisNames = plot.axis,
      xVar = plot.x,
      coords = {
        x: [],
        y: [],
        xy: [],
      },
      yMax,
      yMin;
    isLog = false;
    function getMinMax() {
      yMax = isLog ? Math.max(Math.log10(...coords.y)) : Math.max(...coords.y);
      yMin = isLog ? Math.min(Math.log10(...coords.y)) : Math.min(...coords.y);
    }
    fixToggle.addEventListener("click", function () {
      getMinMax();
      isFixed = this.checked;
    });

    logToggle.addEventListener("click", function () {
      isLog = this.checked;
      if (isLog) {
        topBound = logTopBound;
        bottomBound = logBottomBound;
        fixToggle.disabled = true;
        fixToggle.checked = false;
      } else {
        topBound = linearTopBound;
        bottomBound = linearBottomBound;
        fixToggle.disabled = false;
      }
    });
    let tauValueArray = [null, 4, 8, 12, 18, 24, 36, 48];

    function getBounds(coordinates) {
      coordinates.x.forEach(() => {
        if (bottomBound != null) {
          bottomBoundArray.push(bottomBound);
          topBoundArray.push(topBound);
        }
      });
    }
    const plottedEquation = plot.equation
        .replace(/v\[\"/g, "variables.")
        .replace(/\"]/g, ""),
      latexEquation = plot.equation
        .replace(/v\[\"/g, '${variables["')
        .replace(/\"]/g, '"]}')
        .replace(/\)\}/g, ").toPrecision(3)}");

    const parse = (equation, vars) => {
      let calculate = new Function(
        "variables",
        '"use strict";return (' + equation + ")"
      );
      return calculate(vars);
    };
    const scale = range != undefined ? range : 40;

    const getStep = (step, max) => {
      if (step > 0) {
        return step;
      } else {
        if (max > 10) {
          step = 1;
          return 1;
        } else {
          step = max / 20;
          return step;
        }
      }
    };

    function createSliders() {
      let inputParameters = [];
      let sliders = [];
      let index = 0;
      for (let variable of vars) {
        const inputContainer = document.getElementById(wrapperDivID);
        //creates div tags to hold the slider, name of variable (leftCell), and variable value (rightCell)
        const sliderContainer = drawSliderCell(index, plotName);
        const labelContainer = drawLabelCell(index, plotName);
        const valueContainer = drawValueCell(index, plotName);
        //creates the slider input object. Min, max, value, step, and id all come from the equation array.
        const minimum = Number(JSON.stringify(variable.min));
        const maximum = Number(JSON.stringify(variable.max));
        const initGradient =
          ((variable.value - minimum) / (maximum - minimum)) * 100;

        stepValue = getStep(variable.step, maximum);

        const sliderSelector = createRangeInput(
          minimum,
          maximum,
          variable,
          initGradient
        );

        sliders.push({
          selector: sliderSelector,
          symbol: variable.symbol,
        });
        inputParameters.push({
          slider: sliderSelector,
          valueContainer: valueContainer,
          maximum: maximum,
          minimum: minimum,
        });

        inputContainer.appendChild(labelContainer);
        inputContainer.appendChild(valueContainer);
        inputContainer.appendChild(sliderContainer);

        sliderContainer.appendChild(sliderSelector);
        valueContainer.innerHTML = sliderSelector.value;
        labelContainer.innerHTML = `${variable.name} (${variable.units})`;
        index++;
      }
      const attachListeners = () => {
        let i = 0;
        for (let input of inputParameters) {
          let { slider, valueContainer, maximum, minimum } = input;
          slider.addEventListener("input", function () {
            //sets the blue color tracking on the slider. aesthetic is key
            let gradient = ((this.value - minimum) / (maximum - minimum)) * 100;
            this.style.background = `linear-gradient(to right, rgb(75, 156, 211) 0%, rgb(75, 156, 211)${gradient}%, #fff ${gradient}%, white 100%)`;
            //updates the displayed value of the slider
            valueContainer.innerHTML =
              slider.id == "var_tau_Slider"
                ? tauValueArray[this.value]
                : this.value;

            inputEquation = plottedEquation
              .replace(/\^/g, "**")
              .replace(/\`/g, "");
            if (go === true) {
              go = false;
              setTimeout(() => {
                go = true;
              }, 50);
              let updatedVariables = updateVariables(sliders);
              convertASCIItoLaTeX(updatedVariables);
              startPlotCascade(updatedVariables);
            } else {
              console.log("blocked");
            }
          });
        }
      };
      attachListeners();
      return sliders[0].selector;

      function startPlotCascade(updatedVariables) {
        if (multipleDose === true) {
          getMultipleDosingCoords(inputEquation, updatedVariables).then(
            (result) => {
              updatePlot(result);
            }
          );
        } else {
          getBolusCoords(inputEquation, updatedVariables);
          updatePlot(coords);
        }
      }
    }
    var drawSliders = function (elem) {
      // clicks slider to initiate
      var evt = new MouseEvent("input", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      var canceled = !elem.dispatchEvent(evt);
    };
    const updateVariables = (sliders) => {
      let variable = {};
      for (let slider of sliders) {
        variable[String(slider.symbol)] = Number(slider.selector.value);
      }
      return variable;
    };

    //convertASCIItoLatex takes the ASCII (plain text) equation in the equation-list.js file and converts it to Latex using Katex
    const convertASCIItoLaTeX = (parameters) => {
      const ASCIIEquation = parse(latexEquation, parameters);
      //Get the latex container
      const latexElement = document.getElementById(latexDivID);
      /*Parse the equation to latex. Variables x, n, and e are replaced because they are updated later in the function chain, when the math is run
       *0.06 represents the conversion of V/Cl to mL/min (currently L/hour)
       */
      let displayEquation = AMTparseAMtoTeX(
        ASCIIEquation.replace(/-n/g, "n")
          .replace(/x/g, function () {
            if (xVar != undefined) {
              return xVar;
            } else {
              return "time";
            }
          })
          .replace(/2.71/g, "e")
          .replace(/0.06\*/g, "")
      );
      //prettier-ignore
      let sumOf =  multipleDose === true ? `\\displaystyle\\sum_{0}^{n=${parameters['n']}}` : ``;
      displayEquation = sumOf + plot.equationTemplate + " " + displayEquation;
      //Renders the latex equation in the latex HTML element
      katex.render(displayEquation, latexElement);
    };

    function getBolusCoords(input, parameters) {
      let i;
      coords = {
        x: [],
        y: [],
        xy: [],
      };
      for (i = 0; i < scale; i += 0.5) {
        let parsedFunct = input.replace(/x/g, i);
        coords.x.push(i);
        coords.y.push(parse(parsedFunct, parameters));
        coords.xy.push({ x: i, y: parse(parsedFunct, parameters) });
      }

      return coords;
    }
    function updateCoordinateArrays(
      equation,
      filledEquation,
      parameters,
      time,
      xValue,
      yValue
    ) {
      filledEquation = equation.replace(/x/g, time);
      yValue = parse(filledEquation, parameters);
      coords.x.push(xValue);
      coords.y.push(yValue);
      coords.xy.push({ x: xValue, y: yValue });
    }
    const getMultipleDosingCoords = (input, parameters) => {
      return new Promise((resolve, reject) => {
        coords = {
          x: [],
          y: [],
          xy: [],
        };
        let i,
          stepCount,
          hour = 0;
        let tau = tauValueArray[Number(parameters["tau"])];
        const doses = document.getElementById("var_n_Slider").value;
        let stepEquation;
        let filledEquation;
        let result = Number;
        for (i = 0; i < doses; i++) {
          stepEquation = input.replace(/n/g, i + 1);
          for (stepCount = 0; stepCount < tau; stepCount++) {
            hour = hour + 1;
            updateCoordinateArrays(
              stepEquation,
              filledEquation,
              parameters,
              stepCount,
              hour,
              result
            );
            if (hour == doses * tau) {
              stepCount++;
              for (stepCount; stepCount < doses * tau * 1.2; stepCount++) {
                hour = hour + 1;
                updateCoordinateArrays(
                  stepEquation,
                  filledEquation,
                  parameters,
                  stepCount,
                  hour
                );
              }
            }
          }
        }

        resolve(coords);
      });
    };

    function updatePlot(coordinates) {
      bottomBoundArray = [];
      topBoundArray = [];
      bottomBound != null ? getBounds(coordinates) : null;
      let data = {
        labels: coordinates.x,
        series: [coordinates.xy, bottomBoundArray, topBoundArray],
      };

      let options = {
        chartPadding: {
          top: 0,
          right: 20,
          bottom: 20,
          left: 20,
        },
        low: 0,
        fullWidth: true,
        showPoint: false,
        fullHeight: true,
        showMinorGrid: true,
        axisX: {
          onlyInteger: true,
          labelInterpolationFnc: function skipLabels(value, index) {
            let divisor = Math.round(Math.max(...coordinates.x) / 7);
            divisor = index % divisor === 0 ? value : null;
            return divisor;
          },
        },
        plugins: [
          Chartist.plugins.ctAxisTitle({
            axisX: {
              axisTitle: axisNames[0],
              offset: {
                x: 0,
                y: 35,
              },
              textAnchor: "middle",
            },
            axisY: {
              offset: {
                y: 20,
              },
              axisTitle: axisNames[1],
              textAnchor: "middle",
              flipTitle: true,
            },
          }),
        ],
      };
      setScale(options);

      let responsiveOptions = [
        ["screen and (min-width: 1201px)", { width: "500px", height: "500px" }],
        [
          "screen and (min-width: 961px) and (max-width: 1201px)",
          { width: "415px", height: "415px" },
        ],
        [
          "screen and (min-width: 701px) and (max-width:960px)",
          { width: "370px", height: "370px" },
        ],
        [
          "screen and (max-width: 700px)",
          {
            width: "400px",
            height: "400px",
          },
        ],
      ];

      new Chartist.Line(`#${plotDivID}`, data, options, responsiveOptions);
    }

    function setScale(options) {
      if (isLog) {
        options.classNames = {
          gridMinor: "ct-grid-minor",
        };
        options.axisY = {
          showMinorGrid: true,
          type: Chartist.AutoScaleAxis,
          scale: "log10",
        };
      } else if (isFixed) {
        options.axisY = {
          high: yMax,
          low: yMin,
        };
      } else {
        options.axisY = {
          onlyInteger: false,
          type: Chartist.AutoScaleAxis,
          scale: "linear",
        };
      }
    }

    drawSliders(createSliders());
  } catch (err) {
    console.log(err);
  }

  function drawValueCell(i, plotID) {
    const valueContainer = document.createElement("div");
    valueContainer.id = "var" + String(i) + "rightCell_" + plotID;
    valueContainer.width = "50";
    valueContainer.className = "right_label_cell";
    valueContainer.style = `grid-area:${2 * i + 2}/2/${
      2 * i + 2
    }/2;font-family:Arial, Helvetica, sans-serif; color: gray; text-align: left; font-size: 9.5pt; font-weight: normal; padding-top:12px`;
    return valueContainer;
  }

  function drawLabelCell(i, plotID) {
    const labelContainer = document.createElement("div");
    labelContainer.id = "var" + String(i) + "leftCell_" + plotID;
    labelContainer.className = "left_label_cell";
    labelContainer.style = `grid-area:${2 * i + 2}/1/${
      2 * i + 2
    }/1; font-family:Arial, Helvetica, sans-serif; color: darkslategray; text-align: left; font-size: 9.5pt; font-weight: bold; padding-top: 12px;`;
    return labelContainer;
  }

  function drawSliderCell(i, plotID) {
    const sliderContainer = document.createElement("div");
    sliderContainer.id = "var" + String(i) + "sliderCell" + plotID;
    sliderContainer.style = `grid-area: ${2 * i + 3}/1/${
      2 * i + 3
    }/span 2; width = 100%; padding-bottom: 15px; padding-top: 10px`;
    return sliderContainer;
  }

  function createRangeInput(minimum, maximum, variable, initGradient) {
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = minimum;
    slider.max = maximum;
    slider.value = variable.value;
    slider.step = stepValue;
    slider.className = "slider";
    slider.id = "var_" + variable.symbol + "_Slider";
    slider.style.background = `linear-gradient(to right, rgb(75, 156, 211) 0%, rgb(75, 156, 211) ${initGradient}%, whitesmoke ${initGradient}%, 	whitesmoke 100%)`;
    return slider;
  }
};
