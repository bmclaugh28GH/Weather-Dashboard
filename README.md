# Weather-Dashboard

# Goals 

Weather dashboard seems mostly intended to demonstrate that we can make Ajax calls to an API, open weather in this case, and update HTML elements based on the results. We'll also use localStorage, and create HTML dynamically based on what's in there. 

# Implementation 

My implementation uses moment.js to get current date and +1 thru +5. 

It uses bootstrap for a structure like this: 

BS row = the entire page. 
   BS col1 is fixed sidebar which contains city search.
   BS col2 is a 100% height column for the forecasts

      H1 for a header
      Ordinary div for current day forecast
      BS row for the remaining height. 

         5 evenly spaced BS columns for days +1 thru +5. 

# Behavior 

At page open I'll gather any previously-searched cities from localStorage, which I think I'll store as a stringified JSON object. They'll be displayed in a dynamically created something-or-other in the sidebar. 

On clicking one of the previously-searched cities, I'll replace whatever's in the city/country field with the selected data. 

The user can also type a city and country. 

At click of SEARCH, I'll gather the city and country string, parse it, and get the data. Ugh. That could be ugly, parsing out a city and country string. Do I use a comma to delineate them? IRL I'd probably, I dunno what exactly...let them use dropdowns? Or do like a type-ahead kinda thingy maybe.  

This could get ugly also in recognizing duplicates. How do I recognize Paris,France is the same as Paris, France? We need a database. Lol. 

Not going to stress too much about these last 2....
