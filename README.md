# functions.js
_Functions to help with developing scripts for PreSonus Studio One 4.5+.  The file is obfuscated and cannot be edited. I may add some additional functions later._

<HR>
    
**How To Use:**</br>

_Right click the link and **Save As...** to download:_
[functions.js](https://raw.githubusercontent.com/expressmix/studioone_functions/master/functions.js) </br>
Copy it to your script project folder(s) and add **_include_file('functions.js')_** to the top of your JS code file.


<HR>

### MESSAGING

- **alert** (value)</br>
Common alert box, string formatting is performed in the function.

- **print** (value)</br>
Write to console, string formatting is performed in the function.

<HR>

### TRACKS 

- **getTracks (_selected [bool]_)**</br>
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

- **getTracksByName (string, [integer])**</br>
Returns an array of arrange tracks where the track name contains the string. Matching: 0 or none = no case sensitivity, 1 = case sensitive matching

- **renameTracks (match _[string]_, replace _[string]_)**</br>
Replace parts of all track name. Case sensitive matching (search string, replacment string)

- **selectTrack (track _[object]_)**</br>
Used to optionally select tracks when iterating if necessary

- **setTrackColor (channel _[object]_, color _[hex])**</br>
Sets a channel to a hex color, # char irrelevant

<HR>

### MIXER CHANNELS 

&nbsp;&nbsp;&nbsp; **getChannels** (_selected [bool]_)</br>
&nbsp;&nbsp;&nbsp; Returns an array of mixer channels _(not input or sub outs)_. Argument: None or 0 = all Channels, 1 = seleced channels

```
var channels = getChannels();           // all channels
{
    for (i = 0; i < channels.length; i++)
    {
        var channel = channels[i];
        setFader(channel,-6.0)          // set to -6dB
        if (channel.pan != undefined)   // i.e, VCA's don't have pans for examplename
        {
            print(channel.pan);         // print to console
        }
    }
}
```

&nbsp;&nbsp;&nbsp; **getChannelsByName** (name _[string]_, caseMatching _[bool]_)</br>
&nbsp;&nbsp;&nbsp; Returns an array of mixer channels where the channel name contains the string.</br> 
&nbsp;&nbsp;&nbsp; Matching: 0 or none = no case sensitivity, 1 = case    sensitive matching

&nbsp;&nbsp;&nbsp;**getFader** (channel [object])</br>
&nbsp;&nbsp;&nbsp;    Returns a fader level in dB.  Example: getFader(channel[i]);

&nbsp;&nbsp;&nbsp;**setFader** (channel _[object]_, level _[integer])</br>
&nbsp;&nbsp;&nbsp; Sets a fader level in dB.  </br>Example: setFader(channel[i], -10);

&nbsp;&nbsp;&nbsp;**masterFader (level _[integer])**</br>
&nbsp;&nbsp;&nbsp; Sets the master bus level in dB. </br>Example: masterFader( -10.5);

&nbsp;&nbsp;&nbsp;**centerPans ()**</br>
&nbsp;&nbsp;&nbsp; Centers pans on all selected channel(s)

&nbsp;&nbsp;&nbsp;**setChannelColor** (channel _[object]_, color _[hex]_)</br>
&nbsp;&nbsp;&nbsp; Sets a channel to a hex color, # char irrelevant

<HR>

### External Instruments 

   **setProgram** (bank _[integer], program _[integer]_)</br>
    Set bank and program for an external instrument (bank, program)
