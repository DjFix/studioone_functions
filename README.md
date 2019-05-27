# functions.js
_A functions file to help with writing scripts for PreSonus Studio One 4.5+_

Right click the link below and Save Target As...
#[functions.js](https://raw.githubusercontent.com/expressmix/studioone_functions/master/functions.js)

**_Use:  include_file('functions.js')_**

<HR>

### MESSAGING

- **alert**(value)</br>
Common alert box, no need to format to string beforehand.

- **print**(value)</br>
Write to console, no need to format to string beforehand.

<HR>

### TRACKS 

- **getTracks(bool)**</br>
Returns an array of arrange tracks</br>
Argument None or 0 = all tracks, 1 = selected tracks

```
// example
var tracks = getTracks(1)  // selected tracks
{
    for (i = 0; i < tracks.length; i++)
    {
       var track = tracks[i];
       setTrackColor(tracks[i],"#32c382") // green
       print(track.name);  // print to console
    }
}
```

- **getTracksByName(string, [integer])**</br>
Returns an array of arrange tracks containing the string. Matching: 0 or none = no case sensitivity, 1 = case sensitive matching

- **renameTracks(string, string)**</br>
Replace parts of all track name. Case sensitive matching (search string, replacment string)

- **selectTrack(track)**</br>
Used to optionally select tracks when iterating if necessary

- **setTrackColor(channel, color)**</br>
Sets a channel to a hex color, # char irrelevant

<HR>

### MIXER CHANNELS 

- **getChannels(bool)**</br>
Returns an array of mixer channels _(not input or sub outs)_. Argument: None or 0 = all Channels, 1 = seleced channels

- **getChannelsByName(string, [integer])**</br>
Returns an array of arrange tracks containing the string. Matching: 0 or none = no case sensitivity, 1 = case sensitive matching

- **getFader(channel)**</br>
Retiurns a fader level in dB.  Example: getFader(channel[i]);

- **setFader(channel, integeR)**</br>
Sets a fader level in dB.  </br>Example: setFader(channel[i], -10);

- **masterFader(integer)**</br>
Sets the master bus level in dB. </br>Example: masterFader( -10.5);

- **centerPans()**</br>
Centers pans on all selected channel(s)

- **setChannelColor(channel, color)**</br>
Sets a channel to a hex color, # char irrelevant

<HR>

### External Instruments 

- **setProgram(integer, integer)**</br>
Set bank and program for an external instrument (bank, program)
