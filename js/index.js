
var exercise = new MathExercise();
var arrQus = [];  //题目数量
var language = $("#language option:selected").val();
var time = 20; // 倒计时
var timer = null
/**
 * 根据年级出题
 * @param {*} grade 
 */
function createQ(grade){
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
}

//程序开始
$('.start').on('click',function(){
    let greade = $("input[name='grade']:checked").val();
    if(greade){
        createQ(greade);
        $('.wrapper .welcome').css('display', 'none');
        nextQues();
        timer = setInterval(() => {
            time --;
            $('#time').text(time)
            if(time === 0) {
                nextQues()
                time = 20
            }
        },  1000)
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

var quesIndex = -1;

function nextQues(){
    if(quesIndex < 0){
        quesIndex++;
        //生成题目
        var qus = arrQus[quesIndex].qus;
        $('.problem').text( qus.problem.join(" ") + " = ?");

        return;
    }
    quesIndex++;
    //计算用户输入的题目
    let pAns = $('#inputAns').val() //获取用户输入
    if(pAns){   //如果用户有输入
        let f = new Fraction()
        let p = f.transformFraction(pAns)
        let pD = p.d
        let pM = p.m
        pAns = pD/pM;
        $('#inputAns').val('')  //输入框置为空
    }
    //计算题的答案，算成小数
    let d , m;
    d = arrQus[quesIndex - 1].qus.answer.d;
    m = arrQus[quesIndex - 1].qus.answer.m;
    let tAns = d/m;
    if(quesIndex == arrQus.length ){
        $('.wrapper').hide();
        $('.container').show(300)
        arrQus[quesIndex - 1].qus.pAns = pAns;
        arrQus[quesIndex - 1].qus.isCorrect = Math.abs(pAns - tAns) <= 0.001
        generateGrade();
        clearInterval(timer);
        return 
    }
     //生成题目
    var qus = arrQus[quesIndex].qus;
    $('.problem').text( qus.problem.join(" ") + " = ?");
    
    
    
    //写入用户的输入和题是否正确
    arrQus[quesIndex - 1].qus.pAns = pAns;
    arrQus[quesIndex - 1].qus.isCorrect = Math.abs(pAns - tAns) <= 0.001
    
    time = 20
    $('#time').text('' + time)
    
}

function generateGrade() {
    console.log(arrQus)
    let html = ''
    for(let i=0;i<arrQus.length;i++) {
        var qus = arrQus[i].qus;
        html += `
            <tr>
                <td>${i+1}</td>
                <td>${qus.problem.join(" ") + " = ?"}</td>
                <td>${qus.answer.d + (qus.answer.m !== 1 ? '/' + qus.answer.m : '')}</td>
                <td>${qus.pAns}</td>
                <td>${qus.isCorrect ? '正确':"错误"}</td>
            </tr>
        `
    }
    $('#tbody').html(html)
    let score = 0
    for(let i=0;i<arrQus.length;i++) {
        if(arrQus[i].qus.isCorrect) {
            score ++
        }
    }
    $('body').append(`<p class="text-center">你对了:${score}</p>`)
}
