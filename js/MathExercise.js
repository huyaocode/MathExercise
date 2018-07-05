
function MathExercise(){

    this.iProblemNum = 10;  //题目数量
    this.maxNumRange = 10;  //题目中的最大数字
    this.maxOperateNum = 10; //最多10个运算符
    this.arrOperators = ['+', '-', 'x', '÷'];
    this.oExercise = {};
    this.calculate = new Caculate();
}

/**
 * 初始
 */
MathExercise.prototype.init = function() {
    //生成问题和答案
    for(let i = 0; i < this.iProblemNum; i++){
        let problem, answer,repeatFlag
        do{
            problem = this.createProblem();

            answer = this.getAnswer(problem);
            
            repeatFlag = this.createRepeatFlag(answer, problem);
        } while(this.oExercise[repeatFlag])    //判断是否已经有这个算式

        this.oExercise[repeatFlag] = {
            id: i,
            problem: problem,
            answer: answer,
        };
    }
};

/**
 * 生成问题
 */
MathExercise.prototype.createProblem = function() {

    var problem = [];   //问题数组
    var maxNumRange = this.maxNumRange;
    operateNum = this.arrOperators.length;

    var len = Math.ceil( Math.random() * this.maxOperateNum);
    var bracketLeft = false;    //左括号flag

    while(len > 0){
        len--;
        if( !bracketLeft ){   //如果没有左括号
            if( Math.random() > 0.7){ //并且随机数大于0.7
                problem.push( '(' );
                bracketLeft = true;
            }
        }
        let num;
        if(Math.random() > 0.8){
            num = Math.ceil( Math.random() * maxNumRange);
        } else{
            num = this.createFraction();
        }
        
        let op = this.arrOperators[ Math.floor(  Math.random() * operateNum ) ];
        num = Math.ceil( Math.random() * maxNumRange);
        problem.push( num );
        if(bracketLeft){
            if( Math.random() > 0.3 && problem[problem.length-2] != '('){ //并且随机数大于0.7
                problem.push( ')' );
                bracketLeft = false;
            }
        }
        
        problem.push( op );
    }

    let num = Math.ceil( Math.random() * maxNumRange);
    problem.push( num );
    if(bracketLeft){
        problem.push( ')' );
    }
    if(problem.length == 4 &&  problem[0] == '('){
        problem = problem.slice(1,3);   //去除多余括号
    }
    return problem;
};

/**
 * 生成判重flag
 */
MathExercise.prototype.createRepeatFlag = function(answer, problem) {
    let repeatFlag;
    repeatFlag = ''+ answer.d+'/'+answer.m + '=';
    var temparr = [];
    for(let i = 0;i < problem.length; i++){
        temparr.push(problem[i]);
    }
    temparr.sort();
    repeatFlag += temparr.join('');

    return repeatFlag;
};


/*
 * 得到答案
 */
MathExercise.prototype.getAnswer = function(problem) {

    return this.calculate.getanswer(problem);
};

/*
 * 得到数组
 */
MathExercise.prototype.getQuestions = function() {

    return this.oExercise;
};

/*
 * 判题
 */
MathExercise.prototype.judgment = function(exp, ans) {


};

/*
 * 生成分数
 */
MathExercise.prototype.createFraction = function() {


}

