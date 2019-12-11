// Fire an Action:
//  Host.GUI.Commands.interpretCommand("category","action")

/*   MESSAGING   */

// alert (value)
// Common alert box, string formatting is performed in the function
function alert(vValue) {
    Host.GUI.alert(vValue.toString())
}

// print (value)
// Write to console, string formatting is performed in the function
// Outputs to the Studio One message window
function print(vValue) {
    Host.Console.writeLine(vValue.toString())
}

/*   MISCELLANEOUS   */

// getDateTime ():
// Returns month/day/year (hour_minute_seconds)
function getDateTime() {
    var vDate = new Date(Date.now());
    return ((vDate.getMonth() + 1) + "/" + vDate.getDate() + "/" + vDate.getFullYear() + " (" + vDate.getHours() + "_" + (vDate.getMinutes()) + "_" + vDate.getSeconds() + ")").toString()
}

function getAllPropertyNames(vObject) {
    var vPropertyNames = [];
    do {
        vPropertyNames = vPropertyNames.concat(Object.getOwnPropertyNames(vObject))
    } while (vObject = Object.getPrototypeOf(vObject));;
    var vPrintPropertyNames = vPropertyNames.join("\r\n");
    Host.GUI.alert(String(vPrintPropertyNames))
}

/*   TRACKS   */

// selectTrack (track [object])
// Use this to optionally select tracks when iterating when necessary
function selectTrack(vTrack) {
    var vTrackList = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/TrackList").mainTrackList;
    vTrackList.selectTrack(vTrack)
}

// muteTrack:
// if (track.channel != undefined) {track.channel.mute = 1};
function muteTrack(vTrack) {
    if (vTrack.channel != undefined) {
        try {
            vTrack.channel.mute = 1
        } catch (err) {}
    }
}

// soloTrack:
// if {track.channel != undefined) {track.channel.solo = 1);
function soloTrack(vTrack) {
    if (vTrack.channel != undefined) {
        try {
            vTrack.channel.solo = 1
        } catch (err) {}
    }
}

// getTracks (selected [bool])
// Returns an array of arrange tracks
// Argument is optional: None or 0 = all tracks, 1 = selected tracks
/*
```
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
*/
function getTracks(vSelected) {
    if (vSelected != 0 && vSelected != 1) {
        vSelected = 0
    };
    var vTrackList = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/TrackList").mainTrackList;
    var vOutTrack = [];
    switch (vSelected) {
    case 0:
        for (i = 0; i < vTrackList.numTracks; i++) {
            var vTrack = vTrackList.getTrack(i);
            if (vOutTrack.indexOf(vTrack) == -1) {
                vOutTrack.push(vTrack)
            }
        };
        return vOutTrack;
        break;
    case 1:
        for (i = 0; i < vTrackList.numSelectedTracks; i++) {
            var vTrack = vTrackList.getSelectedTrack(i);
            if (vOutTrack.indexOf(vTrack) == -1) {
                vOutTrack.push(vTrack)
            }
        };
        return vOutTrack;
        break
    }
}

// getTracksByName (string, [integer])
// Returns an array of tracks where the track name contains the string.
// Optional case sensitivy matching: 0 or none = no case sensitivity, 1 = case sensitive
function getTracksByName(vName, vCaseMatching) {
    if (vName.trim() == 0) {
        return
    };
    if (vCaseMatching != 0 && vCaseMatching != 1) {
        (vCaseMatching = 0)
    };
    var vTrackList = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/TrackList").mainTrackList;
    var vOutTrack = [];
    switch (vCaseMatching) {
    case 0:
        for (i = 0; i < vTrackList.numTracks; i++) {
            var vTrack = vTrackList.getTrack(i);
            var vTrackNameTrimed = vTrack.name.trim();
            if (vTrackNameTrimed.toUpperCase().indexOf(vName.toUpperCase()) > -1 && vOutTrack.indexOf(vTrack) == -1) {
                vOutTrack.push(vTrack)
            }
        };
        return vOutTrack;
        break;
    case 1:
        for (i = 0; i < vTrackList.numTracks; i++) {
            var vTrack = vTrackList.getTrack(i);
            var vTrackNameTrimed = vTrack.name.trim();
            if (vTrackNameTrimed.indexOf(vName) > -1 && vOutTrack.indexOf(vTrack) == -1) {
                vOutTrack.push(vTrack)
            }
        };
        return vOutTrack;
        break
    }
}

// getPan (track [object])
// Returns the pan value from a track's channel if any
function getPan(vTrack) {
    if (vTrack.channel.findParameter("pan") != undefined) {
        return vTrack.channel.findParameter("pan").string.replace("<", "").replace(">", "")
    }
}

// setPan (track [object], value [string])
// Sets the pan value for a track's channel if any setPan(track, 'L45')
function setPan(vTrack, vValue) {
    if (vTrack.channel.findParameter("pan") != undefined) {
        return vTrack.channel.findParameter("pan").string = vValue
    }
}

// renameTracks (find [string], replace [string])
// Replace parts of all track names. Case sensitive matching (search string, replacment string)
function renameTracks(vFind, vReplace) {
    let vTrackList = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/TrackList").mainTrackList;
    let _0xDE02 = vTrackList.getTrack(0).getRoot().createFunctions();
    if (_0xDE02 == undefined) {
        return
    };
    for (i = 0; i < vTrackList.numTracks; i++) {
        var vTrack = vTrackList.getTrack(i);
        if (vTrack.name == null || vTrack.name == undefined) {
            continue
        };
        var vName = vTrack.name.toString();
        var _0xDE2B = vName.replace(vFind, vReplace);
        _0xDE02.renameEvent(vTrack, _0xDE2B.toString())
    }
}

// setTrackColor (track [object], color [hex])
// Sets a track to a hex color, # char irrelevant
function setTrackColor(vTrack, vColor) {
    var vTrackList = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/TrackList").mainTrackList;
    var _0xDE02 = vTrackList.getTrack(0).getRoot().createFunctions();
    if (_0xDE02 == undefined) {
        return
    };
    var _0xE017 = getColorVal(vColor.replace("#", ""));
    _0xDE02.colorizeEvent(vTrack, _0xE017)
}

function getColorVal(vColor) {
    let vValue = parseInt(vColor, 16);
    let _0xDAA5 = (vValue >> 16) & 0xff;
    let _0xDA53 = (vValue >> 8) & 0xff;
    let _0xDA2A = vValue & 0xff;
    return ((_0xDA2A << 16) | (_0xDA53 << 8) | _0xDAA5) | 0xff000000
}

/*   CHANNELS    */
// [does not include input or sub-out channels]

// getChannels (selected [bool])
// Returns an array of mixer channels
// Argument is optional: None or 0 = all Channels, 1 = selected channels
/*
```
var channels = getChannels();  // all channels
{
    for (i = 0; i < channels.length; i++)
    {
        var channel = channels[i];
        setFader(channel,-6.0)          // set to -6dB
        if (channel.pan != undefined)  // i.e, VCA's don't have pans for example
        {
            print(channel.pan);  // print to console
        }
    }
}
```
*/
function getChannels(vSelected) {
    if (vSelected != 0 && vSelected != 1) {
        vSelected = 0
    };
    var vChannelList = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/Environment/MixerConsole").getChannelList(1);
    var vChannelOut = [];
    switch (vSelected) {
    case 0:
        for (i = 0; i < vChannelList.numChannels; i++) {
            vChannelOut.push(vChannelList.getChannel(i))
        };
        return vChannelOut;
        break;
    case 1:
        for (i = 0; i < vChannelList.numSelectedChannels; i++) {
            vChannelOut.push(vChannelList.getSelectedChannel(i))
        };
        return vChannelOut;
        break
    }
}

// getChannelsByName (name [string], caseMatching [bool])
// Returns an array of mixer channels where the channel name contains the string.
// Optional case sensitivy matching: 0 or none = no case sensitivity, 1 = case sensitive
function getChannelsByName(vName, vCaseMatching) {
    if (vName.trim() == 0) {
        return
    };
    if (vCaseMatching != 0 && vCaseMatching != 1) {
        (vCaseMatching = 0)
    };
    var vChannelList = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/Environment/MixerConsole").getChannelList(1);
    var vChannelOut = [];
    switch (vCaseMatching) {
    case 0:
        for (i = 0; i < vChannelList.numChannels; i++) {
            var vChannel = vChannelList.getChannel(i);
            var _0xD9D8 = vChannel.label.trim();
            if (_0xD9D8.toUpperCase().indexOf(vName.toUpperCase()) > -1) {
                vChannelOut.push(vChannel)
            }
        };
        return vChannelOut;
        break;
    case 1:
        for (i = 0; i < vChannelList.numChannels; i++) {
            var vChannel = vChannelList.getChannel(i);
            var _0xD9D8 = vChannel.label.trim();
            if (channlName.indexOf(vName) > -1) {
                vChannelOut.push(vChannel)
            }
        };
        return tracks;
        break
    }
}

// getFader (channel [object])
// Returns a fader level in dB.
function getFader(vChannel) {
    return vChannel.findParameter("volume").string
}

// setFader (channel [object], level [integer])
// Sets a fader to a specific dB value. -144 to 10
/*
```
// set all faders to -3
var channels = getChannels();  // all channels
{
    var level = -3;
    var goingUp = true;
    for (i = 0; i < channels.length; i++)
    {
        var channel = channels[i];
        setFader(channel, level)
    }
}
```
*/
function setFader(vChannel, vLevel) {
    newValue = (Math.pow(10, parseFloat(vLevel / 20)));
    if (vChannel.findParameter("volume") == undefined) {
        return
    };
    vChannel.findParameter("volume").setValue(newValue), true
}

// centerPans ()
// Centers pans on all selected channel(s)
function centerPans() {
    var vChannelList = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/Environment/MixerConsole").getChannelList(1);
    for (i = 0; i < vChannelList.numSelectedChannels; i++) {
        var vChannel = vChannelList.getSelectedChannel(i);
        if (vChannel.pan != undefined) {
            vChannel.pan = 0.5
        }
    }
}

// resetInputs (selected [bool])
// Set input gains to unity
// Argument is optional: None or 0 = all, 1 = selected
function resetInputs(vSelected) {
    var _0xDEA6 = Host.Objects.getObjectByUrl("://studioapp/Application").findParameter("appNameAndVersion").value.replace("Studio One", "").trim().substring(0, 3);
    if (_0xDEA6 < 4.5) {
        Host.GUI.alert("This function requires Studio One 4.5 or greater.");
        return
    };
    var vChannelList = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/Environment/MixerConsole").getChannelList(1);
    var _0xDEF8 = [];
    if (vChannelList.numSelectedChannels > 0) {
        for (i = 0; i < vChannelList.numSelectedChannels; i++) {
            _0xDEF8.push(vChannelList.getSelectedChannel(i))
        };
        for (i = 0; i < vChannelList.numSelectedChannels; i++) {
            vChannelList.getSelectedChannel(i).findParameter("selected").setValue(0, true)
        }
    };
    if (vSelected == 1) {
        for (i = 0; i < _0xDEF8.length; i++) {
            var vChannel = _0xDEF8[i];
            if (vChannel.find("InputFX") != undefined) {
                vChannel.find("InputFX").findParameter("gain").setValue(0, true)
            }
        }
    } else {
        for (i = 0; i < vChannelList.numChannels; i++) {
            var vChannel = vChannelList.getChannel(i);
            if (vChannel.find("InputFX") != undefined) {
                vChannel.find("InputFX").findParameter("gain").setValue(0, true)
            }
        }
    }
}


// setMasterFader (level [integer])
// Sets the master bus fader to a specific dB value.
// Example: setMasterFader( -10.5);
function setMasterFader(vLevel) {
    var _0xDF4A = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/Environment/AudioMixer");
    _0xDF4A.findParameter("masterVolume").string = vLevel.toString()
}

// setChannelColor (channel [object], color [hex])
// Sets a channel to a hex color, # char irrelevant
function setChannelColor(vChannel, vColor) {
    if (vColor.indexOf("#") == -1) {
        vColor = "#" + vColor
    };
    vChannel.findParameter("color").string = vColor
}

/*   EXTERNAL INSTRUMENTS   */
// You can use this function in your own custom patch manager script, to send program and bank changes out to MIDI hardware.

// setProgram (bank [integer], program [integer])
// Set bank and program for an external instrument
function setProgram(vBank, vProgram) {
    var vTrackList = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/TrackList").mainTrackList;
    if (vTrackList.getSelectedTrack(0) == undefined || vTrackList.getSelectedTrack(0).mediaType != "Music") {
        return
    };
    var _0xDF9C = vTrackList.getSelectedTrack(0).channel.name;
    if (_0xDF9C == undefined) {
        return
    };
    var _0xDFEE = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/Environment/MusicTrackDevice" + "/Channels/MusicTrack/" + _0xDF9C + "/Programs");
    try {
        _0xDFEE.findParameter("programEnabled").setValue(1, true);
        _0xDFEE.findParameter("bankNumber").setValue(vBank, true);
        _0xDFEE.findParameter("programNumber").setValue(vProgram, true)
    } catch (err) {
        return
    }
}

// loadCubasePatchFile (debug [integer])
// Returns an array from a Cubase patch script (.txt) file.
// Argument is optional. 1 = print array to console.
// Array item 0 is the Instrument Name, all other array items are comma delimited as follows:
// Program Name, program number, bank number, group name
function loadCubasePatchFile(vDebug) {
    var vFileSelector = Host.Classes.createInstance("CCL:FileSelector");
    var vCubasePatch = {
        description: ("Cubase Patch Script"),
        extension: "txt",
        mimetype: "text"
    };
    vFileSelector.addFilter(vCubasePatch);
    vFileSelector.runOpen();
    var vPath = vFileSelector.getPath();
    var _0xDD87 = [];
    var vFile = Host.IO.openTextFile(vPath);
    if (vFile) {
        var _0xDC68 = 0;
        var _0xDBC4 = "";
        while (!vFile.endOfStream) {
            var _0xDC91 = vFile.readLine().toString();
            if (_0xDC91.trim() == "" || _0xDC91 == null) {
                continue
            };
            if (_0xDC91.indexOf("[script name]") > -1) {
                _0xDC91 = _0xDC91.replace("\t", "").replace("[script name]", "");
                _0xDD87[_0xDC68] = _0xDC91.trim();
                _0xDC68++;
                continue
            };
            if (_0xDC91.indexOf("[g") > -1) {
                _0xDC91 = _0xDC91.replace("\t", "");
                var _0xDC16 = _0xDC91.split("]");
                _0xDBC4 = _0xDC16[1].trim();
                continue
            };
            if (_0xDC91.indexOf("[p") > -1 && _0xDC91.indexOf(",") > -1) {
                _0xDC91 = _0xDC91.replace("\t", "");
                var _0xDC16 = _0xDC91.split("]");
                var _0xDD5E = _0xDC16[1].trim();
                var _0xDD35 = _0xDC16[0].split(",");
                var _0xDCE3 = _0xDD35[2];
                var _0xDCBA = _0xDD35[3];
                var _0xDBED = (_0xDCE3 * 128) + _0xDCBA;
                _0xDD87[_0xDC68] = (_0xDD5E + "," + _0xDD35[1] + "," + _0xDBED + "," + _0xDBC4);
                _0xDC68++;
                continue
            }
        };
        vFile.close();
        if (vDebug == 1) {
            for (_0xDC68 = 0; _0xDC68 < _0xDD87.length; _0xDC68++) {
                print(_0xDD87[_0xDC68])
            }
        };
        return _0xDD87
    }
}
