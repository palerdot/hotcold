*************************************************************************************************************************************************
Hot-cold Typing !
*************************************************************************************************************************************************

Smart touch typing learning with instant key glow indications, live statistics, live graphs and dynamic course creation.

*************************************************************************************************************************************************

Learn touch typing in a smart, easy and colorful way ! Watch your onscreen keys glow in different colors depending on the corresponding key accuracy. All your key statistics are updated and presented after every keypress. You don't have to wait till the end to know your key statistics. Watch live graphs on your accuracy, gross and net speeds during the course, and plan your progress accordingly. Create your own courses on the fly, and have fun learning with all these features. A lot of other intuitive features like differentiating characters from key glows, automatic pausing makes touch typing learning a real fun!.

Please read and understand the getting started guide thoroughly before attempting the courses.

*************************************************************************************************************************************************

This project has won second place in Mozilla dev derby for the month of April 2013. 
It can be viewed live at this dev derby url: https://developer.mozilla.org/en-US/demos/detail/hot-cold-typing

**************************************************************************************************************************************************

General Info:

This section has some general information on the application.

This application uses modern html5 features like web workers and canvas. It is necessary to have support for these two in your browser to experience the app in your browser.

This application uses two libraries

- jquery javascript library.
- Twitter Bootstrap library.

The courses for this application are in a JSON format. Each line of the course is an object which has three arrays: text, code(ascii code) and pattern(finger highlighting pattern). A simple JSON generator file named json_gen_easy.html is present in the folder 'other', which can be used as a reference by those interested. This file consumes some text as an input, where each line is delimited by a newline character. This file can be extended and tweaked by interested people to create their JSON lesson files.  

*************************************************************************************************************************************************
