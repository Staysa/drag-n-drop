window.onload = function() {
    if (localStorage.length < 2){
        window.location.href = "/test_Drag-n-Drop/index.html"
    } else {
        for (var i =0; i < localStorage.length; i++) {
            var allItems = JSON.parse(localStorage.getItem(localStorage.key(i))),
                id = localStorage.key(i);

            console.log(allItems);

            if (allItems.publish == true) {
                var buildTab = '<input type="radio" id="' + id + '" name="ak" checked/>' + '<label for="' + id + '">' + allItems.name + '</label>' +
                    '<div class="content">' +
                        '<textarea id="text" class="component" readonly style="position:absolute;left:' + allItems.ltext + 'px;top:' + allItems.ttext + 'px">' + allItems.text + '</textarea>' +
                        '<button type="button" id="okButton" class="component" style="position:absolute;left:' + allItems.lokButton + 'px;top:' + allItems.tokButton + 'px">Button OK</button>' +
                        '<button type="button" id="cancelButton" class="component" style="position:absolute;left:' + allItems.lcancelButton + 'px;top:' + allItems.tcancelButton + 'px">Button Cancel</button>' +
                        '<img src="img/pony.png" id="pony" class="component" style="position:absolute; left:' + allItems.lpony + 'px;top:' + allItems.tpony + 'px">' +
                    '</div>';
                var createTabs = document.getElementById('createTabs'),
                    div = document.createElement('div');

                div.innerHTML = buildTab;
                createTabs.appendChild(div);

            } else {
                console.log('NO PUBLISHED')
            }
        }
    }
};