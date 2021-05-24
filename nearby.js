// TODO: Retain style after clicking button

function makeList(arr,prefix){
    for(var i=0;i<Math.floor(Math.random()*100);i++){
        arr.push(i+1+". "+prefix+i)
    }
    return arr;
}
var highlightList = makeList([],"highlight");
var outdoorList = makeList([],"outdoor");
var familyList = makeList([],"family");
var restaurantList = makeList([],"restaurant");

//array of sub-list for every page
var currList;
var currListPages;
var currPage;
var ipp = 5; //item per page

// var toggle = false;
// var btn = document.getElementById("btn");
// btn.addEventListener("click",function(){
//     if(!toggle){
//         toggle = true;
//         btn.className = "red";
//     } else {
//         toggle = false;
//         btn.className = "blue";
//     }
// }); 
function setListPages(arr){
    currList = arr;
    currListPages = []
    currPage = 0;
    divide = 0;
    while(divide+ipp < currList.length){
        currListPages.push(arr.slice(divide,divide+ipp));
        divide+=ipp;
    }
    currListPages.push(arr.slice(divide));
}
function setHtmlList(arr){
    code = "<ul>";
    arr.forEach(x => {
        code+= "<li><div class=\"list-item\"><div class=\"list-item-text\">"+ x + "</div> <div class=\"list-item-distance\">" + "3.8 km" + "</div></div></li>"
    });
    code += "</ul>"
    document.getElementById("list").innerHTML = code;
    if(currPage != currListPages.length -1)
        document.getElementById("page-number").innerHTML = (currPage*ipp)+1 + " - "+(ipp*(currPage+1))+" of "+currList.length;
    else
        document.getElementById("page-number").innerHTML = (currPage*ipp)+1 + " - "+currList.length+" of "+currList.length;


}

function displayList(str){
    switch(str){
        case "highlight":
            setListPages(highlightList);
            setHtmlList(currListPages[currPage]);
            break;
         case "outdoor":
            setListPages(outdoorList);
            setHtmlList(currListPages[currPage]);
            break;
         case "family":
            setListPages(familyList);
            setHtmlList(currListPages[currPage]);
            break;
         case "restaurant":
            setListPages(restaurantList);  
            setHtmlList(currListPages[currPage]);
    }
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
console.log(highlightList);
console.log(outdoorList);
console.log(familyList);
console.log(restaurantList);
