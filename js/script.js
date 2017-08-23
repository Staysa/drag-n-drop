window.onload = function() {

    var pony = document.getElementById('pony'),
        text = document.getElementById('text'),
        okButton = document.getElementById('okButton'),
        cancelButton = document.getElementById('cancelButton'),
        close = document.getElementById('close'),
        name = document.getElementById('nameCanvas'),
        gallery = document.getElementById('gallery'),
        canvas = document.createElement('main');

    /*work with elements on sidebar*/

    disableDragstart();

    pony.onmousedown = function(e) {
        getElementPosition(pony, e)
    };
    text.onmousedown = function(e) {
        getElementPosition(text, e)
    };
    okButton.onmousedown = function(e) {
        getElementPosition(okButton, e)
    };
    cancelButton.onmousedown = function(e) {
        getElementPosition(cancelButton, e)
    };
    close.onclick = function() {
        closeAll()
    };


    function getElementPosition(element, event) {
        var coords = getCoords(element),
            shiftX = event.pageX - coords.left,
            shiftY = event.pageY - coords.top;

        function moveAt(event) {
            element.style.left = event.pageX - shiftX + 'px';
            element.style.top = event.pageY - shiftY + 'px';
        }

        element.style.position = 'absolute';

        moveAt(event);

        element.style.zIndex = '100';

        document.onmousemove = function(e) {
            moveAt(e);
        };

        element.onmouseup = function() {
            document.onmousemove = null;
            element.onmouseup = null;
        }
    }

    function getCoords(elem) {
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    function closeAll() {
        location.reload();
        document.getElementById('nameCanvas').value = ""; //WHYYY???
        createID();
    }

    function disableDragstart() {
        var component = document.querySelectorAll('.component');
        for (var i = 0; i < component.length; i++) {
            component[i].ondragstart = function() {
                console.log('dragstart');
                return false;
            };
        }
    }

    /*work with elements in local storage*/

    if (typeof(Storage) !== "undefined") {

        var save = document.getElementById('save'),
            load = document.getElementById('loadItem'),
            publish = document.getElementById('publish');

        publish.onclick = function() {
            if (publish.checked) {
                console.log('publish.checked');
            } else {
                console.log('publish.NO');
            }
        };

        init();

        save.onclick = function() {

            var aboutAll = {
                publish: publish.checked,
                name: name.value,
                text: text.value,
                ltext: text.getBoundingClientRect().left,
                ttext: text.getBoundingClientRect().top,
                lokButton: okButton.getBoundingClientRect().left,
                tokButton: okButton.getBoundingClientRect().top,
                lcancelButton: cancelButton.getBoundingClientRect().left,
                tcancelButton: cancelButton.getBoundingClientRect().top,
                lpony: pony.getBoundingClientRect().left,
                tpony: pony.getBoundingClientRect().top
            };
            console.log(aboutAll);

                if (aboutAll.name.length > 0) {
                    localStorage.setItem(localStorage.getItem('currentID'), JSON.stringify(aboutAll));
                } else {
                    alert('You need move elements to canvas and give a name for save your item.')
                }

            closeAll();

            createID();

        };

        load.onclick  = function() {
            if (localStorage.length <= 1) {
                var hideEmpty = document.getElementById('hideEmpty');
                hideEmpty.style.display = 'none';
            } else {
                var nothing = document.getElementById('nothing');
                nothing.style.display = 'none';
                if (document.querySelector('.load-item')) {
                    clearLoadList();
                }
                addItem();
            }
        };

        gallery.onclick = function() {
            closeAll()
        };

        function init() {
            var currentID = localStorage.getItem('currentID');

            if (currentID != null ) {
                var data = JSON.parse(localStorage.getItem(currentID));

                if (data != null) {

                    if (data.name.length < 1) {
                        text.value = "";
                    } else {
                        text.value = data.text;
                    }

                    name.value = data.name;
                    text.setAttribute("style", "position: absolute; left: " + data.ltext + "px;" + "top: " + data.ttext + "px");
                    okButton.setAttribute("style", "position: absolute; left: " + data.lokButton + "px;" + "top: " + data.tokButton + "px");
                    cancelButton.setAttribute("style", "position: absolute; left: " + data.lcancelButton + "px;" + "top: " + data.tcancelButton + "px");
                    pony.setAttribute("style", "position: absolute; left: " + data.lpony + "px;" + "top: " + data.tpony + "px");
                }
            } else {
                createID();
            }
        }

        function createID() {
            var newId = localStorage.length + 1;

            if (localStorage.getItem(newId) != null) {
                newId += 1;
            }

            localStorage.setItem('currentID', newId)
        }

        function addItem() {
            for (var i =0; i < localStorage.length; i++) {
                var allItems = JSON.parse(localStorage.getItem(localStorage.key(i))),
                    id = localStorage.key(i);

                console.log(allItems);

                if (allItems.name) {
                    var buildTab = '<button type="submit" id="' + id + '" class="load-item">' + allItems.name + '</button>';
                    var createTabs = document.getElementById('items'),
                        li = document.createElement('li');

                    li.innerHTML = buildTab;
                    createTabs.appendChild(li);
                }
            }

            var items = document.querySelectorAll('#items > li'),
                buttons = document.getElementsByClassName('load-item');

            for (var i = 0; i < buttons.length; i++) {
                buttons[i].onclick = function() {

                    var x = this.id;
                    console.log(localStorage.setItem('currentID', x));
                };
            }
        }

        function clearLoadList() {
            var myNode = document.getElementById("items");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        }

    } else {
        alert('Sorry! No Web Storage support...');
    }

};