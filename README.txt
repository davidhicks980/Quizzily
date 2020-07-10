1) log tick marks

https://shib.media.unc.edu/pkilam/
https://unc-ilams.pharmsim.unc.edu/index.php


MD grapher -> ensure full final dose
MD grapher -> step 4 8 12 18 24 36 48 
MD grapher -> take log_10 of concentrations, log of zero won't be number. Take y axis to 10^x
MD grapher -> graph tool pullout
MD grapher -> delay before first dose -> fix downward slope following last dose

ONE-COMPARTMENT MODEL
 
Systemic Clearance
Q 2--line doesn't match original. Not steep enough when slider is set to 50  (and at all other settings, too).

$$ ON GRAPH ENGINE $$
 
Protein Binding
Q3--check the KA slider. The numbers don't match. (1000 at the top instead of 1.) The math in the equation doesn't match original, either, but that's probably because of the middle slider bar number being wrong.

$$ Complete $$ 

Impact of Clearance and Volume
Q2--the lines seem a tiny bit off. If you set the button at 98.1 L, for example, it doesn't quite match what we see at 99.6 L in the original. In the original, the red line ends on the blue line to the right of 6. In the new version, the red line ends exactly on 6. The same thing happens if you push the slider all the way to the top (500 L).In the original, the red line extends all the way over to 12. In the new version, it stops at 9.
 
$$ ON GRAPH ENGINE $$
 
ABSORPTION KINETICS
Kinetics of Drug Absorption
Q2: capitalize the first letter of each of the distractors (Low, High, Low, High)

$$ FIXED $$ 

C-T Profile and Extravascular Dose
Q1--If you put all of the sliders at the bottom, the shape of the line doesn't match the original. Same thing happens if you move all of the sliders to the top. Also, the maximum numbers for kA, Cl, and V are incorrect (5.5, 55, and 550 instead of 5, 50, and 500 in the original.
 
$$ FIXED AND ON GRAPH ENGINE $$
 
MULTIPLE DOSE ADMINISTRATION REGIMENS
Constant Rate Infusion: Overview
Q1--I moved the slider bars all the way to the bottom (5 and 10), and no line appeared. The line that appears when I move the sliders to the top is a little too high compared to the original, and it doesn't extend all the way to the right.

C = C0*e^-k*t


$$ ON GRAPH ENGINE AND NO SCALE $$

 
Multiple Dose Administration: Overview
Q1--if you select 4 hr. and 4 doses, and then move all of the slider bars to the top, the resulting line doesn't match the original line. (The new one starts at 0, while the original one start a bit above 40.) Same thing happens if you move the sliders all the way to the bottom. The new line starts at 0, while the original line starts around 90.

$$ DOESN'T MAKE ANY SENSE BUT REBUILT PKMDMD $$

 
Multiple Dose Administration: Recovering Parameters
Q2--Select 4 hours and 4 doses, and then move the sliders all the way to the bottom. The resulting line doesn't match the original. (The new line starts at 0 and stops around 10, while in the original it starts at 10 and extends to 25.)

$$MDMP$$
ON GRAPH
 
Multiple Dose Administration: Designing Dosage Regimens
Q1--select 4 hours and 4 doses, and then move the slider bars all the way to the top. The new line doesn't match the original one (starts at 0 instead of 40). Same thing happens is you move the sliders all the way down--the line starts at 0 instead of 90.
 
 $$MDDR$$
 COMPLETE

HEPATIC CLEARANCE
The Well-Stirred Model
Q2--If I move all of the sliders to the bottom, a random gray bar appears on the left side of the screen. (It appears to be the ClH bar, which is supposed to be on the right. Not sure why it moves to the left.)
 
$$ FIXED $$
 
NONLINEAR AND NON-STATIONARY PHARMACOKINETICS
Michaelis-Menten Equation
Q3--the VMAX, T50%, and KM numbers don't match what's in the original. (When I pull the slider bar to the bottom, I see 1.37, 1.14. and 1.82, instead of 400, 6.93125, and 10 that appear in the original.) Same thing happens if I push the slider bar all the way to the top--the numbers are off.

//x0/TAU = DOSING RATE
//Cl = Vmax/(Km + C)
//T90% -> (5*.693*V)/cl
//R is dosing rate
//https://pdfs.semanticscholar.org/182a/2b59168ceb8798256cccfce85882e5d52627.pdf
//((X0/tau)*Km)/(Vmax-Km) = Css
//
 

$$ FIXED $$
I THINK I FIXED. I took (.693*Vmax)/Cl to get t50%, which may or may not be right
 
 
KINETICES OF PHARMACOLOGIC RESPONSE
The C-R Relationship
Q1--when the slider bars are pushed to the top, the curve doesn't match the one in the original exercise. When the sliders are all the way at the bottom, the line completely disappears, instead of being slightly present (as in the original).
 
Q2--curves don't match
 
Q3--curves don't match

$$ REBUILT $$

Metabolites of Drugs
Q1--SEt CL to 25 and Vm to 100. The corresponding red and blue lines don't match the originals. They're close, but they're about one square off. I played around with different settings, and the lines were always off.

$$ WORKS OUT $$

