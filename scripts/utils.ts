
/// <reference path="../../DefinitelyTyped/jake/jake.d.ts" />

import fs = require("fs");
import path = require("path");

var currentVersion = function(){
    var content = fs.readFileSync(__dirname + '/../src/compiler/tsc.ts').toString('utf8');

    var m = content.match(/version = "([0-9]).([0-9])/)
    if(!m)
        throw new Error('Unable to find TS version')

    return Number(m[1] + m[2])
}();

export function getDiffTool() {
    var program = process.env['DIFF'] || null
    if (!program) {
        // auto-detect WinMerge
        var winMerge = path.join(process.env['ProgramFiles'], 'WinMerge', 'WinMergeU.exe')
        if (fs.existsSync(winMerge))
            program = winMerge;
    }

    if (!program)
        throw new Error("Add the %DIFF% environment variable to the path of the program you want to use.")

    return program;
}


export function checkAdmin(cb: Function, errorMsg?: string) {
    var ex = jake.createExec("net session");
    ex.addListener("error", function (err) {
        console.log(errorMsg || 'This command requires administrator privileges (elevated prompt).')
    });
    ex.addListener("cmdEnd", function () {
        cb();
    });
    ex.run();
}

export function getOriginalExt() {
    return '.orig';
}

export function findTsPathsOfVS() {
    var paths = {
        'tsc': null,
        'tsc.lib.d': null,
        'services': null,
        'services.lib.d': null,
    }
    var oext = getOriginalExt();

    // Support TS currentVersion down to 1.0
    var tscReleases = []
    var c = currentVersion;
    while(c > 10) {
        tscReleases.push(String(c/10))
        c--;
    }

    var fpath = findSDK(tscReleases)
    if (!fpath)
        throw new Error("Could not find TypeScript SDK " + tscReleases.join(','))

    paths['tsc'] = fpath
    paths['tsc.lib.d'] = path.join(path.dirname(fpath), 'lib.d.ts')

    // Try env variables first
    var extPath = path.normalize('Common7/IDE/CommonExtensions/Microsoft/TypeScript/typescriptServices.js')
    var vsVersions = ['12.0', '11.0']
    var checkPaths = []
    for (var i in vsVersions) {
        var num = vsVersions[i].replace('.', '')
        if (process.env['VS' + num + 'COMNTOOLS']) {
            checkPaths.push(path.join(process.env['VS' + num + 'COMNTOOLS'], '..', '..', extPath))
        }
        checkPaths.push(path.join(process.env['ProgramFiles'], 'Microsoft Visual Studio ' + vsVersions[i], extPath))
    }

    for (var i in checkPaths) {
        fpath = checkPaths[i]
        if (fs.existsSync(fpath) || fs.existsSync(fpath + oext)) {
            paths['services'] = fpath
            paths['services.lib.d'] = path.join(path.dirname(fpath), 'lib.d.ts')
            break;
        }
    }
    if (!paths.services)
        throw new Error("Could not find TypeScript Services for Visual Studio " + vsVersions.join(','))

    return paths;
}

function findSDK(tscReleases: string[]){
    var oext = getOriginalExt();
    var fpath = ''
    for (var i in tscReleases) {
        fpath = path.join(process.env['ProgramFiles'], 'Microsoft SDKs', 'TypeScript', tscReleases[i], 'tsc.js')
        console.log(fpath)
        if (fs.existsSync(fpath) || fs.existsSync(fpath + oext)) {
            return fpath
        }

        if(process.env['ProgramFiles(x86)']) {
            fpath = path.join(process.env['ProgramFiles(x86)'], 'Microsoft SDKs', 'TypeScript', tscReleases[i], 'tsc.js')
            if (fs.existsSync(fpath) || fs.existsSync(fpath + oext)) {
                return fpath
            }
        }
    }
    return null
}

export function unlinkPaths(paths: string[]) {
    for (var i in paths) {
        try {
            fs.unlinkSync(paths[i])
        } catch (e) { }
    }
}
