# belly-button-challenge
Module 14 challenge assignment

The biggest issue I had with this assignment was getting the metadata/charts to update when selecting a new sample. I realized far too slowly that the most likely cause was because I had originally defined most my variable using "const" rather than "let", which as far as I know, means they're universal and can't be changed. I'm still not sure if that was the ONLY issue, but once I switched them all to "let", things started running much smoother.

As far as assistance in this one, most of my syntax issues were solved by looking back at the classwork and exercises, as well as reading up on some of the official documentation for Plotly.