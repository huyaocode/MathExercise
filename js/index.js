
var exercise = new MathExercise();

// var grade = $('.grade')[0];

var arrQus = [];  //题目数量
var language = $("#language option:selected").val();

/**
 * 根据年级出题
 * @param {*} grade 
 */
function createQ(grade){
    console.log('grade',grade)
    var num = 6, range = 10, opnum = 1, arrop =['+', '-'];
    grade = +grade;
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
    let oQ = exercise.getQuestions();
    for(let i in oQ){
        arrQus.push({index: i, qus: oQ[i]});
    }
    console.log(arrQus);
}

//程序开始
$('.start').on('click',function(){
    let greade = $("input[name='grade']:checked").val();
    if(greade){
        createQ(greade);
        $('.wrapper .welcome').css('display', 'none');
        nextQues();
    }
})

$('#language').on('click', changeLan);

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
        gradeStr += `<input type="radio" name="grade" value="`+ i +`" id="grade`+ i +`" ><label for="grade`+ i +`">`+ i + text.grade + `</label>`;
        if(i == 3){
            gradeStr += "<div></div>";
        }
    }
    $('.grade').html(gradeStr);
    $('.start').html(text.start);
    $('#next').text(text.next);
}

$('.next').on('click', nextQues);

var quesIndex = 0;

// var arrCorrect = [];
// var arrWrong = [];

function nextQues(){
    var qus = arrQus[quesIndex].qus;
    
    $('.problem').text( qus.problem.join(" ") + " = ?");
    $('#inputAns').attr("value", '' + qus.answer.d + '/' + qus.answer.m);
    if(quesIndex + 1 == arrQus.length){
        alert('做完了')
    }
    quesIndex++;
}