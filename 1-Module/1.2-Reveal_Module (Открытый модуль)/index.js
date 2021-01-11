//-------------------Example - 1-------------------

(function (win, doc) {
  const module = (function () {
    const _leadself = "Me: ",
      _leadcomputer = "PC: ",
      _aSaid = ["This is a Cyber Chat"],
      _msgYes = "Yes, that's a great idea.",
      _msgNo = "No, that must be a mistake.",
      _aSassyStuff = [
        "Like mold on books, grow myths on history.",
        "She moved like a poem and smiled like a sphinx.",
        "As long as we don’t die, this is gonna be one hell of a story.",
        "She laughed, and the desert sang.",
        "You’ve got about as much charm as a dead slug.",
      ];

    function _echo(msg) {
      _aSaid.push("<div>" + msg + "</div>");

      const aSaidLength = _aSaid.length,
        start = Math.max(aSaidLength - 6, 0),
        out = "";

      for (let i = start; i < aSaidLength; i++) {
        out += _aSaid[i];
      }

      doc.querySelector(".advert").innerHTML = out;
      doc.querySelector("#talk span").textContent = msg;
    }

    function talk(msg) {
      _echo(_leadself + msg);
    }

    function replayYesNo() {
      const msg = Math.random() > 0.5 ? _msgYes : _msgNo;
      _echo(_leadcomputer + msg);
    }

    function saySassyStuff() {
      const msg = _aSassyStuff[Math.floor(Math.random() * _aSassyStuff.length)];
      _echo(_leadcomputer + msg);
    }

    /** открываем функции и переменные, назначая их свойствам объекта */

    return {
      talk,
      replayYesNo,
      saySassyStuff,
    };
  })();

  doc.addEventListener("DOMContentLoaded", function () {
    module.talk("this is great");
    module.replayYesNo();
    module.saySassyStuff();
  });

  if (!win.targetModule) win.targetModule = module;
})(window, document);
