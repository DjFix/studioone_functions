# functions.js
Some basic functions to help with developing scripts for PreSonus Studio One 4.5+.  The .js file is obfuscated and cannot be edited. 

<HR>
    
**How To Use:**</br>

Right click the link and **Save As...** to download:
[functions.js](https://raw.githubusercontent.com/expressmix/studioone_functions/master/functions.js) </br>
Copy it to your script project folder(s) and add **_include_file('functions.js')_** to the top of your JS code file.


<HR>

### MESSAGING

- **alert** (value)</br>
Common alert box, string formatting is performed in the function

- **print** (value)</br>
Write to console, string formatting is performed in the function</br>
Outputs to the Studio One message window

<HR>

### TRACKS 

- **getTracks** (_selected [bool]_)</br>
Returns an array of arrange tracks</br>
Argument is optional: None or 0 = all tracks, 1 = selected tracks

- **getTracksByName** (string, _[integer]_)</br>
Returns an array of arrange tracks where the track name contains the string. Matching: 0 or none = no case sensitivity, 1 = case sensitive matching

- **renameTracks** (find _[string]_, replace _[string]_)</br>
Replace parts of all track names. Case sensitive matching (search string, replacment string)

- **selectTrack** (track _[object]_)</br>
Use this to optionally select tracks when iterating when necessary

- **setTrackColor** (channel _[object]_, color _[hex]_)</br>
Sets a channel to a hex color, # char irrelevant

<HR>

### CHANNELS </br>
_[does not include input or sub out channels]_

-  **getChannels** (_selected [bool]_)</br>
Returns an array of mixer channelsArgument:</br>
Argument is optionsl: None or 0 = all Channels, 1 = selected channels

- **getChannelsByName** (name _[string]_, caseMatching _[bool]_)</br>
Returns an array of mixer channels where the channel name contains the string.</br> 
Matching: 0 or none = no case sensitivity, 1 = case    sensitive matching


- **getFader** (channel _[object]_)</br>
Returns a fader level in dB. 

- **setFader** (channel _[object]_, level _[integer]_)</br>
Sets a fader to a specific dB value.  -144 to 10

- **setMasterFader** (level _[integer]_)</br>
Sets the master bus fader to a specific dB value. </br>
_Example: setMasterFader( -10.5);_

- **setChannelColor** (channel _[object]_, color _[hex]_)</br>
 Sets a channel to a hex color, # char irrelevant
 
- **centerPans ()**</br>
Centers pans on all selected channel(s)

<HR>

### External Instruments 

   - **setProgram** (bank _[integer]_, program _[integer]_)</br>
    Set bank and program for an external instrument 
    
<HR>

### Miscellaneous

- **Mute:** if (track.channel != undefined) {track.channel.mute = 1};
- **Solo:** if {track.channel != undefined) {track.channel.solo = 1);
- **Action:** Host.GUI.Commands.interpretCommand("category","action")
