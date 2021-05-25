var list = [
    {name: 'Hilmar Cheese Company', dist: 1, tags:['high', 'out']},
    {name: 'California State University Stanislaus', dist: 3.8, tags:['high']},
    {name: 'Hilmar Country Plaza', dist: 1, tags:['high']},
    {name: 'Carnegie Arts Center', dist: 1, tags:['out']},
    {name: 'Ricos Pizza', dist: 1, tags:['high', 'out']},
    {name: 'Elegant Bull', dist: 1, tags:['out']},
    {name: 'ABCABAC', dist: 1, tags:['out']},
    {name: 'CGDFS', dist: 1, tags:['high']},
    {name: 'AHUEE', dist: 1, tags:['high', 'out']},
    {name: 'FamRest', dist: 1, tags:['fam', 'rest']},
    {name: 'HighRest', dist: 1, tags:['high', 'rest']},
    {name: 'HighFamOut', dist: 1, tags:['high','fam', 'out']},
    {name: 'HighFam', dist: 1, tags:['high', 'fam']},
    {name: 'Out', dist: 1, tags:['out']},
    {name: 'Fam', dist: 1, tags:['fam']},
    {name: 'High', dist: 1, tags:['high']},
    {name: 'Rest', dist: 1, tags:['rest']},
    {name: 'All', dist: 1, tags:['high', 'out','fam','rest']},
    {name: 'Carmellon', dist: 1, tags:['high', 'out']},
]


function makeList(tag){
    var arr = []
    var rank = 1
    list.forEach(x => {
        if(x.tags.includes(tag)){
            var temp = {}
            temp['name'] = x.name;
            temp['dist'] = x.dist;
            temp['rank'] = rank++;
            arr.push(temp);
        }
    })
    return arr;
}


var highlightList = makeList("high");
var outdoorList = makeList("out");
var familyList = makeList("fam");
var restaurantList = makeList("rest");

var currList;
//array of sub-list for every page
var currListPages;
var currPage;
var itemPerPage = 5; //item per page


function setListPages(arr){
    currList = arr;
    currListPages = []
    currPage = 0;
    divide = 0;
    while(divide+itemPerPage < currList.length){
        currListPages.push(arr.slice(divide,divide+itemPerPage));
        divide+=itemPerPage;
    }
    currListPages.push(arr.slice(divide));
}

function setHtmlList(arr){
    code = "<ul>";
    arr.forEach(x => {
        code+= "<li class=\"list-item\"><div class=\"list-item-text\">"+ x.rank + ". " + x.name + "</div> <div class=\"list-item-distance\">" + x.dist + "</div></li>"
    });
    code += "</ul>"
    document.getElementById("list").innerHTML = code;
    if(currPage != currListPages.length -1)
        document.getElementById("page-number").innerHTML = (currPage*itemPerPage)+1 + " - "+(itemPerPage*(currPage+1))+" of "+currList.length;
    else
        document.getElementById("page-number").innerHTML = (currPage*itemPerPage)+1 + " - "+currList.length+" of "+currList.length;
}

function pageButton(str){
    switch(str){
        case "back":
            if(currPage > 0){
                setHtmlList(currListPages[--currPage])
            }
            break;
        case "next":
            console.log(currListPages.length)
            if(currPage < currListPages.length - 1){
                setHtmlList(currListPages[++currPage]);
            }
    }
}

var tabs = document.querySelectorAll('.tab,.tab-selected');
console.log(tabs);
var selectedTab;

//intializing high tab as selected
setListPages(highlightList);
setHtmlList(currListPages[currPage]);
var highTab = document.getElementById("high");
highTab.classList.remove("tab");
highTab.classList.add("tab-selected");
selectedTab = highTab;

function tabSelectDesignChange(tab){
    selectedTab.classList.remove("tab-selected");
    selectedTab.classList.add("tab")
    tab.classList.remove("tab");
    tab.classList.add("tab-selected");
    selectedTab = tab;
}

for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function() {
        switch(this.id){
            case "high":
                setListPages(highlightList);
                setHtmlList(currListPages[currPage]);
                tabSelectDesignChange(this);
                break;
             case "out":
                setListPages(outdoorList);
                setHtmlList(currListPages[currPage]);
                tabSelectDesignChange(this);
                break;
             case "fam":
                setListPages(familyList);
                setHtmlList(currListPages[currPage]);
                tabSelectDesignChange(this);
                break;
             case "rest":
                setListPages(restaurantList);  
                setHtmlList(currListPages[currPage]);
                tabSelectDesignChange(this);
        }
    }, false);
}

