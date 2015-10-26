var indexTracker = 0;
var peopleArray  = [];
var autoTime = setInterval(fadeNext, 10000);
var fadeTime = 600;
$(document).ready(function(){

    getData();

    $('.container').on('click', '#prev', function() {
        clearInterval(autoTime);
        fadePrev();
        autoTime = setInterval(fadeNext, 10000)
    });

    $('.container').on('click', '#next', function(){
        clearInterval(autoTime);
        fadeNext();
        autoTime = setInterval(fadeNext, 10000)
    });
    //$('.prev').on('click', prevSlide); why no work!!!!????!!???
});
function fadeNext () {
    $('.ppl-group').fadeOut(fadeTime, function(){
        nextSlide();
    }).fadeIn(fadeTime);
}

function fadePrev () {
    $('.ppl-group').fadeOut(fadeTime, function(){
        prevSlide();
    }).fadeIn(fadeTime);
}

function getData () {

        $.ajax({
            type : "GET",
            url : "/data",
            success : function(data) {
            peopleArray = data.zeta;
                //console.log(peopleArray);
                appendDom();
        }
    });
}

function appendDom() {

        i = indexTracker;

        $(".container").append("<div class='well'><div class='ppl-group'></div><div class='nav-group'></div></div>");
        var $el = $(".ppl-group");
        var url = '<a href="'+peopleArray[i].github+'" target="_blank">' + peopleArray[i].github +'</a>';
        //var img = (data.people[i].imageURL).toString();
        //$(".container").append("<div id='prev' class='btn btn-info'>Prev</div>");
        $el.append("<div id='imageURL'>" +'<img src="'+peopleArray[i].imageURL+'">' + "</div>");
        $el.append("<div id='name'>" + 'Name : ' + "<strong>" + peopleArray[i].name + "<strong></div>");
        $el.append("<div id='github'>" + 'GitHub : ' + url  + "</div>");
        $el.append("<div id='comment'>" + 'Comment : '+ "<span class='comment-style'>" +  peopleArray[i].shoutout + "</span></div>");

        //$(".container").append("<div id='next' class='btn btn-info'>Next</div>");
        //$el = $(".container").children().children().last();
        $el = $('.nav-group')

        createPrevButtons($el);
        createIndexPoints($el)
        createNextButtons($el);
        updateIndexPoints();
}

function updateDom() {
    i = indexTracker;
    var url = '<a href="'+peopleArray[i].github+'" target="_blank">' + peopleArray[i].github +'</a>';
    //$(".container").("<div class='well'></div>");
    //$("#imageURL").html("<div id='imageURL'>" +'<img src="'+peopleArray[i].imageURL+'">' + "</div>");
    $("#imageURL").html("<img src="+peopleArray[i].imageURL+">");
    $("#name").html('Name : ' + "<strong>" + peopleArray[i].name + "<strong>");
    $("#github").html('GitHub : ' + url);
    //$("#github").html("<div id='github'>" + 'GitHub : ' + peopleArray[i].github + "</div>");
    $("#comment").html('Comment : '+ "<span class='comment-style'>" +  peopleArray[i].shoutout + "</span>");
}

function nextSlide() {
    indexTracker++;
    if(indexTracker >= peopleArray.length){
        indexTracker = 0;
    }
    updateIndexPoints();
    updateDom();
}

function prevSlide () {

    indexTracker--;
    if(indexTracker < 0){
        indexTracker = peopleArray.length -1;
    }
    updateIndexPoints();
    updateDom();
}

function createPrevButtons($el) {
    $el = $('.nav-group')
    $el.append("<div id='prev' class='btn btn-info'>Prev</div>");
}

function createNextButtons($el) {
    $el = $('.nav-group')
    $el.append("<div id='next' class='btn btn-info'>Next</div>");
}

function createIndexPoints($el){
    //create divs - visual
    $el = $('.nav-group')
    for (var i = 0; i < peopleArray.length; i++) {
        //we need i, 1 one for each element
        $el.append("<div class='index-point' id='index"+i+"'></div>");
    }
}
function updateIndexPoints() {

    for (var i = 0; i < peopleArray.length; i++) {
        $("#index" + i).removeClass("index-point-active");

        if (i == indexTracker) {
            $("#index" + i).addClass("index-point-active");
        }
    }
}