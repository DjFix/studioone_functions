# studioone_functions
_An obfuscated functions file to include for PreSonus Studio One 4.5 + scripts_

**_Use:  include_file('functions.js')_**

**MESSAGING  -----------------------**

- **alert**(value)
Common alert box, no need to format to string beforehand.

- **print**(value)
Write to console, no need to format to string beforehand.

##TRACKS ---------------------------

- **getTracks(bool)**
Returns an array of arrange tracks
Argument None or 0 = all tracks, 1 = selected tracks

- **getTracksByName(string, [integer])**
Returns an array of arrange tracks containing the string
Matching: 0 or none = no case sensitivity, 1 = case sensitive matching

- **renameTracks(string, string)**
Replace parts of all track names:  Case sensitive matching (search string, replacment string)

- **selectTrack(track)**
Used to optionally select tracks when iterating if necessary

- **setTrackColor(channel, color)**
Sets a channel to a hex color, # char irrelevant


##MIXER CHANNELS -------------------

- **getChannels(bool)**
Returns an array of mixer channels (not input or sub outs)
Argument: None or 0 = all Channels, 1 = seleced channels

- **getChannelsByName(string, [integer])**
Returns an array of arrange tracks containing the string
Matching: 0 or none = no case sensitivity, 1 = case sensitive matching

- **getFader(channel)**
Retiurns a fader level in dB.  Example: getFader(channel[i]);

- **setFader(channel, integeR)**
Sets a fader level in dB.  Example: setFader(channel[i], -10);

- **masterFader(integer)**
Sets the master bus level in dB.  Example: masterFader( -10.5);

- **centerPans()**
Centers pans on all selected channel(s)

- **setChannelColor(channel, color)**
Sets a channel to a hex color, # char irrelevant

##External Instruments -----------------

- **setProgram(integer, integer)**
Set bank and program for an external instrument (bank, program)
