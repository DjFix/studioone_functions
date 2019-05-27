# functions.js
_Functions to help with developing scripts for PreSonus Studio One 4.5+.  The file is obfuscated and cannot be edited. I may add some additional functions later._

<HR>
    
**How To Use:**</br>

_Right click the link and **Save As...** to download:_
[functions.js](https://raw.githubusercontent.com/expressmix/studioone_functions/master/functions.js) </br>
Copy it to your script project folder(s) and add **_include_file('functions.js')_** to the top of your JS code file.


<HR>

### MESSAGING

- **alert**(value)</br>
Common alert box, string formatting is performed in the function.

- **print**(value)</br>
Write to console, string formatting is performed in the function.

<HR>

### TRACKS 

- **getTracks(_[bool]_)**</br>
Returns an array of arrange tracks</br>
Argument: None or 0 = all tracks, 1 = selected tracks

```
var tracks = getTracks(1)               // selected tracks
{
    for (i = 0; i < tracks.length; i++)
    {
       var track = tracks[i];
       setTrackColor(track,"#32c382")   // green
       print(track.name);               // print to console
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

- **getChannels(_[bool]_)**</br>
Returns an array of mixer channels _(not input or sub outs)_. Argument: None or 0 = all Channels, 1 = seleced channels


```
var channels = getChannels();           // all channels
{
    for (i = 0; i < channels.length; i++)
    {
        var channel = channels[i];
        setFader(channel,-6.0)          // set to -6dB
        if (channel.pan != undefined)   // i.e, VCA's don't have pans for example
        {
            print(channel.pan);         // print to console
        }
    }
}
```

- **getChannelsByName(string, [integer])**</br>
Returns an array of arrange tracks containing the string. Matching: 0 or none = no case sensitivity, 1 = case sensitive matching

- **getFader(channel)**</br>
Retiurns a fader level in dB.  Example: getFader(channel[i]);

- **setFader(channel, integer)**</br>
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
