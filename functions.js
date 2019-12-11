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

// getDateTime ():
// Returns month/day/year (hour_minute_seconds)
function getDateTime() {
    var vDate = new Date(Date.now());
    return ((vDate.getMonth() + 1) + "/" + vDate.getDate() + "/" + vDate.getFullYear() + " (" + vDate.getHours() + "_" + (vDate.getMinutes()) + "_" + vDate.getSeconds() + ")").toString()
}

function getAllPropertyNames(_0xD8B9) {
    var _0xD8E2 = [];
    do {
        _0xD8E2 = _0xD8E2.concat(Object.getOwnPropertyNames(_0xD8B9))
    } while (_0xD8B9 = Object.getPrototypeOf(_0xD8B9));;
    var _0xD90B = _0xD8E2.join("\r\n");
    Host.GUI.alert(String(_0xD90B))
}

// selectTrack (track [object])
// Use this to optionally select tracks when iterating when necessary
function selectTrack(vTrack) {
    var _0xDB49 = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/TrackList").mainTrackList;
    _0xDB49.selectTrack(vTrack)
}

function muteTrack(vTrack) {
    if (vTrack.channel != undefined) {
        try {
            vTrack.channel.mute = 1
        } catch (err) {}
    }
}

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
function getTracks(vSelected) {
    if (vSelected != 0 && vSelected != 1) {
        vSelected = 0
    };
    var _0xDB49 = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/TrackList").mainTrackList;
    var _0xDB72 = [];
    switch (vSelected) {
    case 0:
        for (i = 0; i < _0xDB49.numTracks; i++) {
            var vTrack = _0xDB49.getTrack(i);
            if (_0xDB72.indexOf(vTrack) == -1) {
                _0xDB72.push(vTrack)
            }
        };
        return _0xDB72;
        break;
    case 1:
        for (i = 0; i < _0xDB49.numSelectedTracks; i++) {
            var vTrack = _0xDB49.getSelectedTrack(i);
            if (_0xDB72.indexOf(vTrack) == -1) {
                _0xDB72.push(vTrack)
            }
        };
        return _0xDB72;
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
    var _0xDB49 = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/TrackList").mainTrackList;
    var _0xDB72 = [];
    switch (vCaseMatching) {
    case 0:
        for (i = 0; i < _0xDB49.numTracks; i++) {
            var vTrack = _0xDB49.getTrack(i);
            var _0xDB9B = vTrack.name.trim();
            if (_0xDB9B.toUpperCase().indexOf(vName.toUpperCase()) > -1 && _0xDB72.indexOf(vTrack) == -1) {
                _0xDB72.push(vTrack)
            }
        };
        return _0xDB72;
        break;
    case 1:
        for (i = 0; i < _0xDB49.numTracks; i++) {
            var vTrack = _0xDB49.getTrack(i);
            var _0xDB9B = vTrack.name.trim();
            if (_0xDB9B.indexOf(vName) > -1 && _0xDB72.indexOf(vTrack) == -1) {
                _0xDB72.push(vTrack)
            }
        };
        return _0xDB72;
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
function renameTracks(_0xDE7D, _0xDE54) {
    let _0xDB49 = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/TrackList").mainTrackList;
    let _0xDE02 = _0xDB49.getTrack(0).getRoot().createFunctions();
    if (_0xDE02 == undefined) {
        return
    };
    for (i = 0; i < _0xDB49.numTracks; i++) {
        var vTrack = _0xDB49.getTrack(i);
        if (vTrack.name == null || vTrack.name == undefined) {
            continue
        };
        var vName = vTrack.name.toString();
        var _0xDE2B = vName.replace(_0xDE7D, _0xDE54);
        _0xDE02.renameEvent(vTrack, _0xDE2B.toString())
    }
}

function setTrackColor(vTrack, _0xDA7C) {
    var _0xDB49 = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/TrackList").mainTrackList;
    var _0xDE02 = _0xDB49.getTrack(0).getRoot().createFunctions();
    if (_0xDE02 == undefined) {
        return
    };
    var _0xE017 = getColorVal(_0xDA7C.replace("#", ""));
    _0xDE02.colorizeEvent(vTrack, _0xE017)
}

function getColorVal(_0xDA7C) {
    let vValue = parseInt(_0xDA7C, 16);
    let _0xDAA5 = (vValue >> 16) & 0xff;
    let _0xDA53 = (vValue >> 8) & 0xff;
    let _0xDA2A = vValue & 0xff;
    return ((_0xDA2A << 16) | (_0xDA53 << 8) | _0xDAA5) | 0xff000000
}

function setProgram(_0xDF73, _0xDFC5) {
    var _0xDB49 = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/TrackList").mainTrackList;
    if (_0xDB49.getSelectedTrack(0) == undefined || _0xDB49.getSelectedTrack(0).mediaType != "Music") {
        return
    };
    var _0xDF9C = _0xDB49.getSelectedTrack(0).channel.name;
    if (_0xDF9C == undefined) {
        return
    };
    var _0xDFEE = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/Environment/MusicTrackDevice" + "/Channels/MusicTrack/" + _0xDF9C + "/Programs");
    try {
        _0xDFEE.findParameter("programEnabled").setValue(1, true);
        _0xDFEE.findParameter("bankNumber").setValue(_0xDF73, true);
        _0xDFEE.findParameter("programNumber").setValue(_0xDFC5, true)
    } catch (err) {
        return
    }
}

// getChannels (selected [bool])
// Returns an array of mixer channels
// Argument is optional: None or 0 = all Channels, 1 = selected channels
function getChannels(vSelected) {
    if (vSelected != 0 && vSelected != 1) {
        vSelected = 0
    };
    var _0xD95D = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/Environment/MixerConsole").getChannelList(1);
    var _0xD934 = [];
    switch (vSelected) {
    case 0:
        for (i = 0; i < _0xD95D.numChannels; i++) {
            _0xD934.push(_0xD95D.getChannel(i))
        };
        return _0xD934;
        break;
    case 1:
        for (i = 0; i < _0xD95D.numSelectedChannels; i++) {
            _0xD934.push(_0xD95D.getSelectedChannel(i))
        };
        return _0xD934;
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
    var _0xD890 = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/Environment/MixerConsole").getChannelList(1);
    var _0xD934 = [];
    switch (vCaseMatching) {
    case 0:
        for (i = 0; i < _0xD890.numChannels; i++) {
            var vChannel = _0xD890.getChannel(i);
            var _0xD9D8 = vChannel.label.trim();
            if (_0xD9D8.toUpperCase().indexOf(vName.toUpperCase()) > -1) {
                _0xD934.push(vChannel)
            }
        };
        return _0xD934;
        break;
    case 1:
        for (i = 0; i < _0xD890.numChannels; i++) {
            var vChannel = _0xD890.getChannel(i);
            var _0xD9D8 = vChannel.label.trim();
            if (channlName.indexOf(vName) > -1) {
                _0xD934.push(vChannel)
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
    var _0xD890 = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/Environment/MixerConsole").getChannelList(1);
    for (i = 0; i < _0xD890.numSelectedChannels; i++) {
        var vChannel = _0xD890.getSelectedChannel(i);
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
    var _0xD890 = Host.Objects.getObjectByUrl("://hostapp/DocumentManager/ActiveDocument/Environment/MixerConsole").getChannelList(1);
    var _0xDEF8 = [];
    if (_0xD890.numSelectedChannels > 0) {
        for (i = 0; i < _0xD890.numSelectedChannels; i++) {
            _0xDEF8.push(_0xD890.getSelectedChannel(i))
        };
        for (i = 0; i < _0xD890.numSelectedChannels; i++) {
            _0xD890.getSelectedChannel(i).findParameter("selected").setValue(0, true)
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
        for (i = 0; i < _0xD890.numChannels; i++) {
            var vChannel = _0xD890.getChannel(i);
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



// loadCubasePatchFile (debug [integer])
// Returns an array from a Cubase patch script (.txt) file.
// Argument is optional. 1 = print array to console.
// Array item 0 is the Instrument Name, all other array items are comma delimited as follows:
// Program Name, program number, bank number, group name
function loadCubasePatchFile(vValue) {
    var _0xDC3F = Host.Classes.createInstance("CCL:FileSelector");
    var _0xDDD9 = {
        description: ("Cubase Patch Script"),
        extension: "txt",
        mimetype: "text"
    };
    _0xDC3F.addFilter(_0xDDD9);
    _0xDC3F.runOpen();
    var _0xDD0C = _0xDC3F.getPath();
    var _0xDD87 = [];
    var _0xDDB0 = Host.IO.openTextFile(_0xDD0C);
    if (_0xDDB0) {
        var _0xDC68 = 0;
        var _0xDBC4 = "";
        while (!_0xDDB0.endOfStream) {
            var _0xDC91 = _0xDDB0.readLine().toString();
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
        _0xDDB0.close();
        if (vValue == 1) {
            for (_0xDC68 = 0; _0xDC68 < _0xDD87.length; _0xDC68++) {
                print(_0xDD87[_0xDC68])
            }
        };
        return _0xDD87
    }
}
