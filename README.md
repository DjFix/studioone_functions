# functions.js
_An obfuscated functions file to include for PreSonus Studio One 4.5 + scripts_

**_Use:  include_file('functions.js')_**

### MESSAGING  -----------------------

- **alert**(value)</br>
Common alert box, no need to format to string beforehand.

- **print**(value)</br>
Write to console, no need to format to string beforehand.

### TRACKS ---------------------------

- **getTracks(bool)**</br>
Returns an array of arrange tracks
Argument None or 0 = all tracks, 1 = selected tracks

- **getTracksByName(string, [integer])**</br>
Returns an array of arrange tracks containing the string
Matching: 0 or none = no case sensitivity, 1 = case sensitive matching

- **renameTracks(string, string)**</br>
Replace parts of all track names:  Case sensitive matching (search string, replacment string)

- **selectTrack(track)**</br>
Used to optionally select tracks when iterating if necessary

- **setTrackColor(channel, color)**</br>
Sets a channel to a hex color, # char irrelevant


### MIXER CHANNELS -------------------

- **getChannels(bool)**</br>
Returns an array of mixer channels (not input or sub outs)
Argument: None or 0 = all Channels, 1 = seleced channels

- **getChannelsByName(string, [integer])**</br>
Returns an array of arrange tracks containing the string
Matching: 0 or none = no case sensitivity, 1 = case sensitive matching

- **getFader(channel)**</br>
Retiurns a fader level in dB.  Example: getFader(channel[i]);

- **setFader(channel, integeR)**</br>
Sets a fader level in dB.  Example: setFader(channel[i], -10);

- **masterFader(integer)**</br>
Sets the master bus level in dB.  Example: masterFader( -10.5);

- **centerPans()**</br>
Centers pans on all selected channel(s)

- **setChannelColor(channel, color)**</br>
Sets a channel to a hex color, # char irrelevant

### External Instruments -----------------

- **setProgram(integer, integer)**</br>
Set bank and program for an external instrument (bank, program)
