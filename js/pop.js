var BaseImg = document.createElement('img')
BaseImg.setAttribute("src",
    "data:image/bmp;base64,Qk0uBgAAAAAAAIoAAAB8AAAAEwAAABMAAAABACAAAwAAAKQFAABiAQAAYgEAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAA/0JHUnOAwvUoYLgeFSCF6wFAMzMTgGZmJkBmZgagmZkJPArXAyRcjzIAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///9///////////////9z////AP///wD///8e////x////x7///8A////f/////////////////7+/qD+/v4K/v7+AAAAAAD///8A////gP/////////o////Kf///wD///8A////Hv///8f///8e////AP///4D//////////////97+/v4k////AP///wsAAAAA////AP///3//////////s/7+/gv+/v4A////AP///x7////H////Hv///wD///9///////////X+/v5d////AP///wv///+XAAAAAP///wD///9//////////37///8A////AP///wD///8e////x////x7///8A////gP////////+o/v7+Cv///wD///9Y////9AAAAAD///8A////gP////r///9R////AP7+/gD///8A////Hv///8f///8e////AP///4L////h/v7+Jf///wD///8j////2/////8AAAAA////AP///4L////b////F////wD///8A////AP///x7////H////Hv///wD///91/v7+ZP///wD///8K////oP//////////AAAAAP///wD///+E////lP///wD///8P////L////wD///8e////x////x7///8A/v7+NP7+/g////8A////Wf////T//////////wAAAAD///8A////df///1P///8A////L////2n///8A////Hv///8f///8e////AP///wD///8A////JP///9n///////////////8AAAAA////AP///2T///8g////AP///3X///9/////AP///x7////H////Hv///wD+/v4A/v7+Cv///6L/////////////////////AAAAAP///wD///8y////D////wv///+3////g////wD///8e////x////x7///8A/Pz8Av///2D////1/////////////////////wAAAAD///8A////AP///wD///8b////6P///4H///8A////Hv///8f///8e////AP7+/gj///+Y//////////////////////////8AAAAA////AP7+/gD///8A////Tv////n///+A////AP///x7////H////Hv///wD///8A/v7+Gv///6b/////////////////////AAAAAAAAAAD+/v4AKCgoAP///4//////////f////wD///8e////x////x7///8A////AP///wD+/v4Y////pf///////////////wAAAAAAAAAA////AP///xf////W/////////3////8A////Hv///8f///8e////AP7+/jn+/v4e/v7+AP///xf///+l//////////8AAAAAAAAAAP///wD///8q////6P////////9/////AP///x7////H////Hv///wD///9/////sv7+/hn+/v4A////Fv///6X/////AAAAAP///wD///8A////cv//////////////f////wD///8e////x////x7///8A////gP////////+t/v7+GP7+/gD///8Y////mgAAAAD+/v4A/v7+C////7T//////////////4D///8A////Hv///8f///8e////AP///3///////////////63+/v4X/v7+AP///wsAAAAA////AP///yn////o//////////////9/////AP///x7////H////Hv///wD///9/////////////////////rf7+/hj+/v4AAAAAAP///wD///9z////////////////////f////wD///8e////x////x7///8A////f//////////////////////+/v6f/v7+Cw=="
    );

function makeIcon(isRun) {
    var C = document.createElement("canvas");
    var J = C.getContext('2d');
    J.fillStyle = isRun ? "#FF0000" : "#000000";
    J.fillRect(0, 0, 19, 19);
    J.drawImage(BaseImg, 0, 0);
    return { imageData: J.getImageData(0, 0, 19, 19) };
}

function ChangeStatus(sta) {
    document.getElementById("status").innerHTML = sta;
    //======Change Icon========
    chrome.browserAction.setIcon(makeIcon((sta == "Started")));
    //======================
}

function fill(Arr) {
    document.getElementById('xk1').value = Arr[0];
    document.getElementById('xk2').value = Arr[1];
    document.getElementById('xk3').value = Arr[2];
    document.getElementById('xk4').value = Arr[3];
}


function sta() {
    var Arr = [];
    Arr.push(document.getElementById('xk1').value);
    Arr.push(document.getElementById('xk2').value);
    Arr.push(document.getElementById('xk3').value);
    Arr.push(document.getElementById('xk4').value);
    chrome.tabs.getSelected(null,
        function (tab) {
            chrome.tabs.sendMessage(tab.id, {
                "isStop": false,
                "kh_Array": Arr,
            },
                function (response) {
                    ChangeStatus(response);
                });
        });
}
function end() {
    chrome.tabs.getSelected(null,
        function (tab) {
            chrome.tabs.sendMessage(tab.id, {
                "isStop": true
            },
                function (response) {
                    ChangeStatus(response);
                });
        });
}

function Par(url) {
    var pattern = /^(?:(\w+):\/\/)?(?:(\w+):?(\w+)?@)?([^:\/\?#]+)(?::(\d+))?(\/[^\?#]+)?(?:\?([^#]+))?(?:#(\w+))?/;
    var result = pattern.exec(url);
    return result;
}

function clone(destination, source) {
    for (var property in source) {
        if (typeof source[property] === "object" && source[property] !== null && destination[property]) {
            clone(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
};

function Xk_Yes() {
    var F = document.getElementById('sta');
    var G = document.getElementById('end');
    F.onclick = sta;
    G.onclick = end;
}

function XK_No() {
    document.getElementById("Outer").innerHTML = "<div>这个东西只能在选课系统里面用哦~<br>by 也爱你们的喵</div>";
    document.getElementById("Outer").style.removeProperty['width'];
}

window.onload = function () {
    chrome.tabs.getSelected(null,
        function (tab) {
            chrome.tabs.sendMessage(tab.id, {
                "nil": "nil"
            },
                function (response) {
                    try {
                        if (response[0] == "Started") fill(response[1]);
                        ChangeStatus(response[0]);
                    } catch (e) {
                        //maybe Nothing to do
                        console.log(e);
                    }
                    console.log(response);
                });
        });
    chrome.tabs.query({
        'active': true,
        'lastFocusedWindow': true
    },
        function (tabs) {
            Par(tabs[0].url)[4] === "222.30.49.10" ? Xk_Yes() : XK_No();
        });

};
