
var exercise = new MathExercise();

// var grade = $('.grade')[0];

var oQus = {};  //题目数量
var language = $("#language option:selected").val();

$('#language').on('click', function(){
    changeLan();
})

$('.start').on('click',function(){
    let greade = $("input[name='grade']:checked").val();
    if(greade){
        createQ(greade);
        $('.wrapper .welcome').css('display', 'none');
    }
})

/**
 * 修改语言
 */
function changeLan(){
    var lan = $("#language option:selected").val();
    var text = window[lan+'Text'];
    $('#welcoming').text(text.welcome);
    $('.chooseG').text(text.chooseGrade);

    var gradeStr = "";
    for(let i = 1 ; i <= 6; i++){
        gradeStr += `<input type="radio" name="grade" value="`+ i +`" id="grade1" ><label for="grade`+ i +`">`+ i + text.grade + `</label>`;
        if(i == 3){
            gradeStr += "<div></div>";
        }
    }
    $('.grade').html(gradeStr);
    $('.start').html(text.start);
    $('#next').text(text.next);
}

/**
 * 根据年级出题
 * @param {*} grade 
 */
function createQ(grade){

    var num = 6, range = 10, opnum = 1, arrop =['+', '-'];
    num += grade * 4;
    range *= grade;
    opnum += grade;
    if(grade > 2){
        arrop.push('x');
        arrop.push('÷');
    }

    exercise.iProblemNum = num;  //题目数量
    exercise.maxNumRange = range;  //题目中的最大数字
    exercise.maxOperateNum = opnum; //最多10个运算符
    exercise.arrOperators = arrop;
    exercise.init();
    oQus = exercise.getQuestions();
}
