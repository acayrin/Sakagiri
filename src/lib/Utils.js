const chalk = require('chalk')
const {
    isMainThread,
    threadId
} = require('worker_threads')

// ===================================== Clean up duplicates in an Array =====================================
/**
@func uniq_fast
remove duplicates in an Array

@param {Array} a the array to unique
@return {Array} the unique'd array
*/
module.exports.uniq_fast = a => {
    const seen = {}
    const out = []
    let j = 0

    for (let item of a) {
        if (seen[item] !== 1) {
            seen[item] = 1
            out[j++] = item
        }
    }

    return out
}
// ===================================== Clean up duplicates in an Array =====================================


// ===================================== Format seconds to HH:mm:ss =====================================
/**
@func time_format
format seconds to HH:mm:ss format

@param {Number} time seconds to convert
@return {String} formatted time
*/
module.exports.time_format = time => {
    time = Math.floor(time)
    const hrs = ~~(time / 3600)
    const mins = ~~(time % 3600 / 60)
    const secs = ~~time % 60
    let ret = ""

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "")
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "")
    ret += "" + secs

    return ret
}
// ===================================== Format seconds to HH:mm:ss =====================================


// ===================================== Check if URL =====================================
/**
@func isValidURL
check if string is a valid URL

@param {String} string string to check
@return {boolean} boolean
*/
module.exports.isValidURL = string =>
    string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g)

module.exports.shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))[array[i], array[j]] = [array[j], array[i]]
    }

    return array
}
// ===================================== Check if URL =====================================


// ===================================== Logger =====================================
/**
@func log
pretty log to console

@param {String} string string to log
@param {boolean} _isConsole show as CONSOLE instead of DISCORD
*/
module.exports.log = (string, _isConsole) => {
    // specifically GMT+7
    const options = {
        timeZone: 'Asia/Bangkok',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    },
        formatter = new Intl.DateTimeFormat([], options)
    const msg = `${chalk.magentaBright(`[${_isConsole ? 'Console' : 'Discord'} - ${formatter.format(new Date())}]`)} ${chalk.yellowBright(`[${isMainThread ? 'Main' : `Mini #${threadId}`}]`)} ${string}`
    console.log(msg)
}
// ===================================== Logger =====================================


// ===================================== Json Diff =====================================
/**
@func jsonDiff
compare 2 json, return true if different, otherwise false

@param {Object} _a 1st json object
@param {Object} _b 2nd json object
@return {number|undefined} result code, undefined if both were same
*/
module.exports.jsonDiff = (_a, _b) => {
    // if two json have different keys length
    if (_a.constructor === Object && _b.constructor === Object && Object.keys(_a).length !== Object.keys(_b).length)
        return 0

    // loop
    for (let _pp of Object.keys(_a))
        // if target json doesn't have this json key
        if (_a[_pp] && !_b[_pp] || !_a[_pp] && _b[_pp])
            return 1
        // if both keys are Arrays
        else if (Array.isArray(_a[_pp]) && Array.isArray(_b[_pp]))
            // Arrays are different in size
            if (_a[_pp].length !== _b[_pp].length)
                return 3
            else
                // loop
                for (let _xx of _a[_pp])
                    // if target Array doesn't have one of this Json
                    _b[_pp].map(b => {
                        if (_xx.constructor === Object && b.constructor === Object)
                            return this.jsonDiff(_xx, b)
                        else if (_xx !== b)
                            return 4
                    })
        // if both are json, redo the script
        else if (_a[_pp].constructor === Object && _b[_pp].constructor === Object)
            return this.jsonDiff(_a[_pp], _b[_pp])
        // if target key is different
        else if (_a[_pp] !== _b[_pp])
            return 2

    return undefined
}
// ===================================== Json Diff =====================================


// ===================================== Fast Filter =====================================
/**
@func filter
a custom high-performance filter

@perf
60% faster than the built-in JavaScript filter func

@typedef {(e: *) => boolean} filterFnAny
@param {*[]} a
@param {filterFnAny} fn
@return {*[]}
*/
module.exports.filter = (a, fn) => {
    const f = [] //final
    for (let b of a)
        if (fn(b))
            f.push(b)
    return f
}
// ===================================== Fast Filter =====================================



// ===================================== Promise =====================================
/**
 * Resolve a promise with following function
 * @param {number} ms Timeout
 * @param {() => void} callback Function to execute
 * @returns
 */
module.exports.resolve = (callback, ms) =>
    new Promise((resolve) => setTimeout(() => resolve(callback), ms ? ms : 50))
// ===================================== Promise =====================================



// ===================================== Node Unload =====================================
/**
 * Deletes a node module and all associated children
 * from node require cache
 * @param {string} moduleName The name of the module or
 *                            absolute/relative path to it
 */
module.exports.unload = (moduleName) => {
    let solvedName = require.resolve(moduleName),
        nodeModule = require.cache[solvedName]
    if (nodeModule) {
        for (let i = 0; i < nodeModule.children.length; i++) {
            let child = nodeModule.children[i]
            this.unload(child.filename)
        }
        delete require.cache[solvedName]
    }
}
// ===================================== Node Unload =====================================



// ===================================== JSON Compress =====================================
/**
 * Compress json into lzw String
 * @param {Object|Array} json input json
 * @returns {String} output string
 */
module.exports.zip = json => require('lz-string').compress(require('jsonpack').pack(json))
/**
 * Decompress lzw string into json
 * @param {String} lzw input string
 * @returns {Object} output json
 */
module.exports.unzip = lzw => require('jsonpack').unpack(require('lz-string').decompress(lzw))
// ===================================== JSON Compress =====================================