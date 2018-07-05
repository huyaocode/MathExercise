/**
 * 分数类
 */
function Fraction() {
    this.moleculeRage = 5;  //分子范围
    this.denominatorRage = 15;  //分母范围
}
/**
 *  将数字转成分数
 *  3 -> 3 / 1
 *  3/5 -> 3 / 5
 *  1’1/4 -> 5 / 4
 */
Fraction.prototype.transformFraction = function (num) {
    if(typeof(num) == 'object'){
        return num;
    }
    num += '';
    var d = 0, m;
    if (!num.match('/')) {   //如果是数字类型
        d = +num;
        m = 1;
    } else {
        var arr = num.split('’');
        if (arr.length > 1) { //如果有带着的数
            d = 1 * arr[0];
            arr[0] = arr[1];
        }
        arr = arr[0].split('/');
        d = d * arr[1] + 1 * arr[0];     //带的数乘以分母
        m = 1 * arr[1];
    }

    return { d: d, m: m };
}
/**
 * 随机生成分数
 * return 
 */
Fraction.prototype.createFractionNum = function () {
    var molecule = Math.ceil(Math.random() * this.moleculeRage);    //分子
    var denominator = Math.ceil(Math.random() * this.denominatorRage);//分母

    return { d: denominator, m: molecule };
}

/**
 * 分数加法
 */
Fraction.prototype.addFraction = function (num1, num2) {

    var numArr = this.sharing(num1, num2);
    var d, m;
    d = numArr[0].d + numArr[1].d;
    m = numArr[0].m;

    return { d: d, m: m };
}
/**
 * 分数减法
 */
Fraction.prototype.subFraction = function (num1, num2) {

    var numArr = this.sharing(num1, num2);
    var d, m;
    d = numArr[0].d - numArr[1].d;
    m = numArr[0].m;

    return { d: d, m: m };
}
/**
 * 分数乘法
 */
Fraction.prototype.multFraction = function  (num1, num2) {

    var d, m;
    d = num1.d * num2.d;
    m = num1.m * num2.m;

    return { d: d, m: m };
}
/**
 * 分数除法
 */
Fraction.prototype.diviFraction = function  (num1, num2) {

    var d, m;
    d = num1.d * num2.m;
    m = num1.m * num2.d;

    return { d: d, m: m };
}
/**
 *  通分
 */
Fraction.prototype.sharing = function (num1, num2) {

    var minCM = minComMultiple(num1.m, num2.m); //求得两数的最小公倍数
    num1.d = num1.d * (minCM / num1.m);
    num2.d = num2.d * (minCM / num2.m);
    num1.m = minCM;
    num2.m = minCM;
    //最小公倍数
    function minComMultiple(m, n){
        var m,n,a,b,c;
        a = m;
        b = n;
        while (b != 0) {
            c = a % b;
            a = b;
            b = c;
        }
        return m * n / a;
    }
    
    return [num1, num2];
}
/**
 *  约分
 */
Fraction.prototype.appointment = function (fraction) {
    var m = fraction.m;
    var d = fraction.d;
    var isDminZero = false;
    if(d < 0){
        d *= -1;
        isDminZero = true;
    }
    for (let i = 2; i <= d; i++) {
        //如果分子分母都能被这个数除尽
        if (d % i == 0 && m % i == 0) {
            d /= i;
            m /= i;
            i--;
            continue;
        }
    }
    if(isDminZero){
        d *= -1;
    }
    return { d: d, m: m };
}
