# functions.js
Some basic functions to help with developing scripts for PreSonus Studio One 4.5+.  The file is obfuscated and cannot be edited. I may add some additional functions to it later.

<HR>
    
**How To Use:**</br>

Right click the link and **Save As...** to download:
[functions.js](https://raw.githubusercontent.com/expressmix/studioone_functions/master/functions.js) </br>
Copy it to your script project folder(s) and add **_include_file('functions.js')_** to the top of your JS code file.


<HR>

### MESSAGING

- **alert** (value)</br>
Common alert box, string formatting is performed in the function.

- **print** (value)</br>
Write to console, string formatting is performed in the function.</br>
Outputs to the Studio One message window.

<HR>

### TRACKS 

- **getTracks** (_selected [bool]_)</br>
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

- **getTracksByName** (string, _[integer]_)</br>
Returns an array of arrange tracks where the track name contains the string. Matching: 0 or none = no case sensitivity, 1 = case sensitive matching

- **renameTracks** (find _[string]_, replace _[string]_)</br>
Replace parts of all track name. Case sensitive matching (search string, replacment string)

- **selectTrack** (track _[object]_)</br>
Use this to optionally select tracks when iterating when necessary

- **setTrackColor** (channel _[object]_, color _[hex]_)</br>
Sets a channel to a hex color, # char irrelevant


- **muteTrack** (track _[object]_)</br>

- **soloTrack** (track _[object]_)</br>


<HR>

### MIXER CHANNELS 

-  **getChannels** (_selected [bool]_)</br>
Returns an array of mixer channels _(not input or sub outs)_. Argument: None or 0 = all Channels, 1 = seleced channels

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

- **getChannelsByName** (name _[string]_, caseMatching _[bool]_)</br>
Returns an array of mixer channels where the channel name contains the string.</br> 
Matching: 0 or none = no case sensitivity, 1 = case    sensitive matching

- **getFader** (channel _[object]_)</br>
Returns a fader level in dB.  Example: getFader(channel[i]);

- **setFader** (channel _[object]_, level _[integer]_)</br>
Sets a fader to a specific dB value.  

- **setMasterFader** (level _[integer]_)**</br>
Sets the master bus fader to a specific dB value. </br>Example: setMasterFader( -10.5);

- **setChannelColor** (channel _[object]_, color _[hex]_)</br>
 Sets a channel to a hex color, # char irrelevant
 
- **centerPans ()**</br>
Centers pans on all selected channel(s)

<HR>

### External Instruments 

   - **setProgram** (bank _[integer]_, program _[integer]_)</br>
    Set bank and program for an external instrument 
