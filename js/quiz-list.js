/* eslint-disable max-len 
pk_mdmp_q2_mdplot*/
const quizList = [
  {
    name: "pkMDMP",
    title: "Multiple Dosing Regimen",
    description:
      "An interactive graph. <br /> A project from the UNC Kinetics Department",
    questions: [
      {
        id: "pk_mdmp_q1",
        number: 1,
        type: "fill-in-the-blank",
        correctAnswer: 155,
        units: "L",
        correctFeedback:
          "V ~ 155 L. You must calculate the half-life in order to estimate the accumulation ratio. Then you estimate and use the relationship V=X0*C0*RA When you are ready, click Continue to proceed to the next question.",
        incorrectFeedback:
          "Remember that C_0 is a function of the dose and the volume of distribution. Because you are at steady-state, you must also consider the accumulation ratio. Please try again.",
        tries: 2,
        question: `
      <div class="data-table-flex">
          <div style="width:70%">Drug X is an antibiotic with a therapeutic range between 20 and 40 mg/L. It is administered as an IV bolus. The population average for clearance and volume are 6 L/h and 85 L, respectively. Using the slider bars, explore how changes in dose and dosing interval impact achieving concentrations within the therapeutic window while maintaining an average steady-state concentration of 30 mg/L.</div>
          <table class="data-table">
            <thead>
              <tr>
                <th class="data-table-xp0o">Time <br>(hr)</th>
                <th class="data-table-xp0o">Conc<br>(ug/L)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="data-table-x1xs">0</td>
                <td class="data-table-x1xs">34.8</td>
              </tr>
              <tr>
                <td class="data-table-x1xs">1</td>
                <td class="data-table-x1xs">31.3</td>
              </tr>
              <tr>
                <td class="data-table-x1xs">2</td>
                <td class="data-table-x1xs">25.3</td>
              </tr>
              <tr>
                <td class="data-table-x1xs">4</td>
                <td class="data-table-x1xs">16.4</td>
              </tr>
              <tr>
                <td class="data-table-x1xs">6</td>
                <td class="data-table-x1xs">10.7</td>
              </tr>
              <tr>
                <td class="data-table-x1xs">8</td>
                <td class="data-table-x1xs">6.9</td>
              </tr>
            </tbody>
          </table>
      </div>
`,
      },
      {
        id: "pk_mdmp_q2_mdplot",
        number: 2,
        type: "md-pk-graph",
        question: `Drug X has a therapeutic range of 100 ug/L and 25 ug/L. The population average parameters for Cl and V are 25 L/h and 250 L, respectively. Targeting an average steady-state concentrations in the middle of the therapeutic range, use the sliders and buttons below to design a dosing regimen (dose and dosing interval) for IV bolus administration. <math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>C</mi><mi>t</mi></msub><mo>=</mo><mfrac><msub><mi>X</mi><mn>0</mn></msub><mi>V</mi></mfrac><mi>*</mi><mfenced separators="|"><mfrac><mrow><mn>1</mn><mo>-</mo><msup><mi>e</mi><mrow><mo>-</mo><mi>n</mi><mi>*</mi><mi>K</mi><mi>*</mi><mi>t</mi><mi>a</mi><mi>u</mi></mrow></msup></mrow><mrow><mn>1</mn><mo>-</mo><msup><mi>e</mi><mrow><mo>-</mo><mi>K</mi><mo>*</mo><mi>t</mi><mi>a</mi><mi>u</mi></mrow></msup></mrow></mfrac></mfenced><mi>*</mi><msup><mi>e</mi><mrow><mo>-</mo><mi>K</mi><mi>*</mi><mi>t</mi><mi>a</mi><mi>u</mi></mrow></msup></math>`,
      },
    ],
  },
  {
    name: "pkKOPR",
    title: "Multiple Dosing Regimen",
    description:
      "An interactive graph. <br /> A project from the UNC Kinetics Department",
    questions: [
      {
        id: "pk_KOCR_q1_scplot",
        number: 1,
        type: "sc-pk-graph",
        question: `<b>Use the graph below to visualize the following three scenarios:</b> <br /><br />
    Drug X interacts with Drug Y. This interaction decreases the potency of Drug Y.<br />`,
      },
      {
        id: "pk_KOCR_q2_scplot",
        number: 2,
        type: "sc-pk-graph",
        question: `<b>Use the graph below to visualize the following three scenarios:</b> <br /><br />
    Drug Y blocks a receptor. As a compensatory mechanism, the body synthesizes new receptors which raises the theoretical E<sub>MAX</sub> of the drug. <br />
    `,
      },
      {
        id: "pk_KOCR_q3_scplot",
        number: 3,
        type: "sc-pk-graph",
        question: `<b>Use the graph below to visualize the following three scenarios:</b> <br /><br />
    Drug W is currently given to a patient. Due to side effects, Drug W is discontinued
and Drug Z is started. Drug 2 has a lower γ.`,
      },
    ],
  },
  {
    name: "pkMDMD",
    title: "Multiple Dosing Regimen",
    description:
      "An interactive graph. <br /> A project from the UNC Kinetics Department",
    questions: [
      {
        id: "pk_mdmd_q1_mdplot",
        number: 1,
        type: "md-pk-graph",
        question: `Drug X has a therapeutic range of 100 ug/L and 25 ug/L. The population average parameters for Cl and V are 25 L/h and 250 L, respectively. Targeting an average steady-state concentrations in the middle of the therapeutic range, use the sliders and buttons below to design a dosing regimen (dose and dosing interval) for IV bolus administration. <math xmlns="http://www.w3.org/1998/Math/MathML"><msub><mi>C</mi><mi>t</mi></msub><mo>=</mo><mfrac><msub><mi>X</mi><mn>0</mn></msub><mi>V</mi></mfrac><mi>*</mi><mfenced separators="|"><mfrac><mrow><mn>1</mn><mo>-</mo><msup><mi>e</mi><mrow><mo>-</mo><mi>n</mi><mi>*</mi><mi>K</mi><mi>*</mi><mi>t</mi><mi>a</mi><mi>u</mi></mrow></msup></mrow><mrow><mn>1</mn><mo>-</mo><msup><mi>e</mi><mrow><mo>-</mo><mi>K</mi><mo>*</mo><mi>t</mi><mi>a</mi><mi>u</mi></mrow></msup></mrow></mfrac></mfenced><mi>*</mi><msup><mi>e</mi><mrow><mo>-</mo><mi>K</mi><mi>*</mi><mi>t</mi><mi>a</mi><mi>u</mi></mrow></msup></math>`,
      },
      {
        id: "pk_mdmd_q2",
        number: 2,
        type: "fill-in-the-blank",
        question:
          "An analgesic is administered as a 10-mg intravenous bolus every 6 hr. The approximate half-life of the drug is 6 hr. After the first dose, the peak concentration is 0.2 mg/L. Predict the peak concentration at steady-state.",
        correctAnswer: 0.4,
        units: "mg/L",
        correctFeedback: `The correct answer is shown here.
        <math><mi>K</mi><mo>=</mo><mfrac><mn>0.693</mn><msub><mi>t</mi><mfrac bevelled="true"><mn>1</mn><mn>2</mn></mfrac></msub></mfrac></math>
        , and tau=6hr, (the dosing interval) RA≈2 CpeakSS=0.2mg/L•2 CpeakSS=0.4mg/L When you are ready, click Continue to see the results for this practice.`,
        incorrectFeedback:
          "That's incorrect. To predict the concentration at steady-state, you need to calculate the accumulation ratio. Please try again.",
        tries: 2,
      },
    ],
  },
  {
    name: "pkMDCR",
    title: "Constant Rate Infusions",
    description:
      "An interactive graph. <br /> A project from the UNC Kinetics Department",
    questions: [
      {
        id: "pk_mdcr_q1_scplot",
        number: 1,
        type: "sc-pk-graph",
        question: `Use the slider bars to explore the impact of changes in systemic clearance (CI) and
apparent volume of distribution (V) on the concentration-time profile. Pay attention
to the time it takes to reach steady-state and the steady-state concentration. The equation being used is <math xmlns="http://www.w3.org/1998/Math/MathML"><mi>C</mi><mo>=</mo><mfrac><msub><mi>k</mi><mn>0</mn></msub><mrow><mi>C</mi><mi>l</mi></mrow></mfrac><mo>(</mo><mn>1</mn><mo>-</mo><msup><mi>e</mi><mrow><mo>-</mo><mfrac><mrow><mi>C</mi><mi>l</mi></mrow><mi>V</mi></mfrac><mo>*</mo><mi>t</mi></mrow></msup><mo>)</mo></math>`,
        units: "",
        correctFeedback: "",
        incorrectFeedback: "",
        tries: 0,
        equation: "pkOCIC",
        isGraph: true,
      },
    ],
  },
  {
    /* is this just a graph?
        *Q1--If you put all of the sliders at the bottom, the shape of the line doesn't match the original.
        *Same thing happens if you move all of the sliders to the top.
        *Also, the maximum numbers for kA, Cl, and V are incorrect (5.5, 55, and 550 instead of 5, 50, and 500 in the original.

        */
    name: "pkAKCT",
    title: "Absorption Kinetics and Extravascular Dosing Plot",
    description: "A project from the UNC Kinetics Department",
    questions: [
      {
        id: "pk_akct_q1_sdplot",
        number: 1,
        type: "sc-pk-graph",
        question: `Move the slider bar to see the effects of clearance on the concentration-time profile. Concentration is related to time using the equation 
                    <math xmlns="http://www.w3.org/1998/Math/MathML"><mtext>C=</mtext><mfrac><mrow><msub><mtext>k</mtext><mtext>a</mtext></msub><msub><mtext>*X</mtext><mtext>0</mtext></msub><mtext>&#xA0;&#xA0;</mtext></mrow><mrow><mtext>V</mtext><mfenced separators="|"><mrow><msub><mtext>k</mtext><mtext>a</mtext></msub><mtext>-k</mtext></mrow></mfenced></mrow></mfrac><mtext>*</mtext><mfenced separators="|"><mrow><msup><mtext>e</mtext><mtext>-kt</mtext></msup><msup><mtext>-e</mtext><mrow><msub><mtext>-k</mtext><mtext>a</mtext></msub><mtext>*t</mtext></mrow></msup></mrow></mfenced></math>`,
        equation: "pkAKCT",
        isGraph: true,
      },
    ],
  },
  {
    name: "pkOCIC",
    questions: [
      {
        id: "pk_ocic_q_1",
        number: 2,
        type: "sc-pk-graph",
        question:
          "Move the slider bar to see how changes in clearance influence the concentration- time profile and the area under the concentration - time profile.",
        units: "",
        correctFeedback: "",
        incorrectFeedback: "",
        tries: 0,
        equation: "pkOCIC",
        isGraph: true,
      },
      {
        id: "pk_ocic_q_2",
        number: 2,
        type: "sc-pk-graph",
        question:
          "Move the slider bar to see how changes in volume influence the concentration- time profile and the area under the concentration - time profile.",
        units: "",
        correctFeedback: "",
        incorrectFeedback: "",
        tries: 0,
        equation: "pkOCIV",
        isGraph: true,
      },
    ],
  },
  {
    name: "pkOCPB",
    questions: [
      {
        id: "pk_ocpb_q_1",
        number: 1,
        type: "select-best-answer",
        question:
          "A patient is administered a drug, and a blood sample drawn 4 hr later. The laboratory report indicates a plasma concentration of 12.3 mcg/L and an unbound plasma concentration of 2.2 mcg/L. What is the unbound fraction of this drug?",
        options: {
          a: "5.6%",
          b: "18%",
          c: "82%",
          d: "121%",
        },
        correctAnswer: ["b"],
        correctFeedback:
          "This is the correct answer Based on this formula: fu=CuC the unbound fraction of the drug is 0.81 or 18%. Click Continue to move to the next question.",
        incorrectFeedback: `That's Incorrect.Remember that unbound fraction can be calculated as follows: \n fu=CuC \n Please try again.`,
        tries: 2,
      },
      {
        id: "pk_ocpb_q_2",
        number: 2,
        type: "select-best-answer",
        question:
          "A patient is administered an antibiotic for an infection. The therapeutic concentration range for this medication is 10 to 30 mg / L.According to the drug literature, the protein binding based on the population average for this drug is 93%.Calculate the unbound concentration range of this drug in its therapeutic range.",
        options: {
          a: "9.3 to 28 mg/L",
          b: "0.7 to 2.1 mg/L",
          c: "10.8 to 325 mg/L",
          d: "142 to 429 mg/L",
        },
        correctAnswer: ["b"],
        correctFeedback:
          "This is the correct answer Using this formula: Cu=C•fu you can determine that the unbound concentration range is 0.7 to 2.1 mg / L. Click Continue to move to the next question.",
        incorrectFeedback:
          "That's Incorrect \n Try using this formula to determine the solution: \n Cu = C•fu \n Please try again.",
        tries: 2,
      },
      {
        id: "pk_ocpb_q_3",
        number: 3,
        type: "sc-pk-calc",
        question:
          "Use the sliding bars to see the impact of total drug concentration (C), the binding affinity of drug for blood proteins(KA) and blood protein concentration(PT) on the unbound concentration of drug in the blood and on the unbound fraction of drug. \n Please note: This simulation ls applicable only when the number of binding sites is equal to 1 and blood concentrations are far below the protein concentration { that is, the system is in the linear range).",
        units: "",
        correctFeedback: "",
        incorrectFeedback: "",
        tries: 0,
        isCalc: true,
      },
    ],
  },
  {
    name: "pkOCSC",
    questions: [
      {
        id: "pk_ocsc_q_1",
        number: 1,
        type: "select-all-that-apply",
        question: "Which of the following are true regarding clearance?",
        options: {
          a: "Volume and systemic clearance are dependent on one another",
          b: "Together systemic clearance and volume determine half-life",
          c:
            "After an IV bolus dose, C<sub>0</sub> is directly proportional to systemic clearance",
          d:
            "Systemic exposure is inversely proportional to systemic clearance",
          e: "Organ clearance cannot exceed organ blood flow",
        },
        correctAnswer: ["b", "d", "e"],
        correctFeedback:
          "Although volume and systemic clearance are not dependent on each other, together these two factors determine half life. Also, it is the rate of elimination (not systemic clearance) that is proportional to concentration; systemic exposure is inversely proportional to systemic clearance. Finally, clearance by an organ cannot exceed blood flow to that organ. <br/><br/>Click Continue to move to the next question.",
        incorrectFeedback:
          "That’s incorrect. You may find the following equations helpful for answering the question: <br/><br/><math><mi>t</mi></sub><mn>1/2</mn></sub><mo>=</mo><mfrac><mrow><mi>0.693</mi></mrow><mi>K</mi></mfrac><mi>, K</mi><mo>=</mo><mfrac><mrow><mi>Cl</mi></mrow><mi>V</mi></mfrac><mi>, Cl</mi><mo>=</mo><mi>Q • E</mi><mi>, </mi><msub><mi>Cl</mi><mn>H</mn></msub><mo>&le;</mo><mi>Q</mi></math><br/><br/>Please try again.",
        tries: 2,
      },
      {
        id: "pk_ocsc_plot_pkOCSC",
        number: 2,
        type: "sc-pk-graph",
        question:
          "Move the slider bar to see the effects of clearance on the concentration-time profile. Concentration is related to time using the equation C<sub>t</sub> = C<sub>0</sub>*e<sup>-K*t</sup>",
        units: "",
        correctFeedback: "",
        incorrectFeedback: "",
        tries: 0,
      },
      {
        id: "pk_ocsc_q_3",
        number: 3,
        type: "fill-in-the-blank",
        question:
          "The antipyretic agent antipyrine has a volume of distribution that approximates total body water (700 mL/kg) and a half-life of 12 hr. Calculate the clearance of antipyrine, rounding the answer to the nearest 0.5. Enter your result below, and click Submit.",
        correctAnswer: 40.5,
        units: "mL/hr/kg",
        correctFeedback:
          "The clearance of antipyrine is 40.5 mL/hr/kg.<br/><br/>Click Continue to move to the next question.",
        incorrectFeedback: "Please try again",
        tries: 2,
      },
      {
        id: "pk_ocsc_q_4",
        number: 4,
        type: "fill-in-the-blank",
        question:
          "Drug X is administered via IV at a dose of 100 mg. The renal clearance of the drug is 7 L/hr, and the hepatic clearance is 23 L/hr. Assuming these are the only two routes of elimination, how much drug is excreted in the urine? Enter your result below, and click Submit.",
        correctAnswer: 23.3,
        units: "mg",
        correctFeedback: `The correct response is 23.3 mg. See the equations below:<br/><br/><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="upper C l equals upper C l upper H plus upper C l upper R">
                        <mi>Cl</mi>
                        <mo>=</mo>
                            <mi>Cl</mi>
                        <sub>
                            <mn>H</mn>
                        </sub>
                        <mo>+</mo>
                            <mi>Cl</mi>
                        <sub>
                            <mn>R</mn>
                        </sub>
</math ><br/><br/>When you are ready, click Continue to see the results for this practice.`,
        incorrectFeedback: "Please try again",
        tries: 2,
      },
    ],
  },
];
