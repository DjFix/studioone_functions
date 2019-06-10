# functions.js
A few basic functions to help with developing scripts for PreSonus Studio One 4.5+.  The file is obfuscated and cannot be edited. 

<HR>
    
**How To Use:**</br>

Right click the link and **Save As...** to download:
[functions.js](https://raw.githubusercontent.com/expressmix/studioone_functions/master/functions.js) </br>
Copy it to your script project folder(s) and add **_include_file('functions.js')_** to the top of your JS code file.

_There is error handling in the functions but if you encounter any errors with any function please leave a detailed comment here explaining the use so it can be trapped._

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
Returns an array of tracks where the track name contains the string. </br>
Optional case sensitivy matching: 0 or none = no case sensitivity, 1 = case sensitive 

- **renameTracks** (find _[string]_, replace _[string]_)</br>
Replace parts of all track names. Case sensitive matching (search string, replacment string)

- **selectTrack** (track _[object]_)</br>
Use this to optionally select tracks when iterating when necessary

- **setTrackColor** (channel _[object]_, color _[hex]_)</br>
Sets a channel to a hex color, # char irrelevant

- **getPan** (track _[object]_)</br>
Returns the pan value from a track's channel if any

- **setPan** (track _[object]_, value _[string]_)</br>
Sets the pan value for a track's channel if any
_setPan(track, 'L45')_

<HR>

### CHANNELS </br>
_[does not include input or sub-out channels]_

-  **getChannels** (_selected [bool]_)</br>
Returns an array of mixer channels</br>
Argument is optional: None or 0 = all Channels, 1 = selected channels

- **getChannelsByName** (name _[string]_, caseMatching _[bool]_)</br>
Returns an array of mixer channels where the channel name contains the string.</br> 
Optional case sensitivy matching: 0 or none = no case sensitivity, 1 = case sensitive 


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

_You can use this function in your own custom patch manager script, to send program and bank changes out to MIDI hardware._

   - **setProgram** (bank _[integer]_, program _[integer]_)</br>
    Set bank and program for an external instrument 
    
   - **loadCubasePatchFile** (debug _[integer]_)</br>
    Returns an array from a Cubase patch script (.txt) file.</br>
    _Argument is optional.  1 = print array to console.</br>_
    Array item 0 is the Instrument Name, all other array items are comma delimited as follows:</br>
    _Program Name, program number, bank number, group name_
    
    
<HR>

### Miscellaneous

- **Mute:** if (track.channel != undefined) {track.channel.mute = 1};
- **Solo:** if {track.channel != undefined) {track.channel.solo = 1);
- **Fire an Action:** Host.GUI.Commands.interpretCommand("category","action")
- **getDateTime ():** Returns month/day/year (hour_minute_seconds)

<HR>

### Script Package Example

A Studio One script package consists of *(at minimum)* three files as outlined below, zipped with a **.package** extender.  
*You can use this package to test various functions in functions.js.*

- **metainfo.xml:** *Meta information for the script package.*

***Package:ID** must be unique*
```
<?xml version="1.0" encoding="UTF-8"?>
<MetaInformation>
	<Attribute id="Package:ID" value="test.functions"/>
	<Attribute id="Package:SkinFile" value="skin/"/>
	<Attribute id="Package:TranslationFile" value="translations/"/>
	<Attribute id="Package:Version" value="1.0.0/"/>
</MetaInformation>
```

- **classfactory.xml:** *Class definitions for each individual action.* 

***ClassID's** must be unique.   
This package adds a new action named TEST FUNCTIONS to the command list and Track menu.  
menuPriority.value -1 = don't list in menu*
```
<?xml version="1.0" encoding="UTF-8"?>
<ClassFactory>
	<ScriptClass
		classID="{80CBE1FC-3EC1-4A97-A79E-FC46990FAEE8}"
		category="EditTask"
		subCategory="TrackEdit"
		name="TEST FUNCTIONS"
		sourceFile="code.js"
		functionName="createInstance"
		metaClassID="{B6099740-B26D-4BC3-A471-CBAAAED8CADC}">
		<Attribute id="menuPriority" value="0"/>
	</ScriptClass>
</ClassFactory>
```

- **code.js:** *JavaScript code file.*

***createInstance()** is the entry function used by classFactory.xml in    
this example although the name of that function and of this js code file are both irrelevant,    
they only have to match the names used in classfactory.xml.*
```
include_file('functions.js')
function testFunctions() 
{
    this.interfaces = [Host.Interfaces.IEditTask];

    this.prepareEdit = function (context)
    {        
        return Host.Results.kResultOk;
    }

    this.performEdit = function (context)
    {
        // ---------------------------------------
    	// return all tracks with 'voc' in the name
        var tracks = getTracksByName('voc')
        for (i = 0; i < tracks.length; i++)
        {
            // do something
        }
	
	// ----------------------------------------
	
        // test print Cubase patch script programs  
	// array to console, arg(1)
	// opens file selector dialog
        var inst = loadCubasePatchFile(1);
       
        return Host.Results.kResultOk;
    }
}

// Entry Function ---------------------------------

function createInstance ()
{
    return new testFunctions;
}
```
