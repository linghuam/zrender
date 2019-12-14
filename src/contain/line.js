
/**
 * 线段包含判断
 * @param  {number}  x0
 * @param  {number}  y0
 * @param  {number}  x1
 * @param  {number}  y1
 * @param  {number}  lineWidth
 * @param  {number}  x
 * @param  {number}  y
 * @return {boolean}
 */
export function containStroke(x0, y0, x1, y1, lineWidth, x, y) {
    if (lineWidth === 0) {
        return false;
    }
    var _l = lineWidth;
    var _a = 0;
    var _b = x0;
    // Quick reject
    if (
        (y > y0 + _l && y > y1 + _l)
        || (y < y0 - _l && y < y1 - _l)
        || (x > x0 + _l && x > x1 + _l)
        || (x < x0 - _l && x < x1 - _l)
    ) {
        return false;
    }

    /* 已知直线上两点求直线的一般式方程 [2] 
    已知直线上的两点P1(X1,Y1) P2(X2,Y2)， P1 P2两点不重合。
    对于AX+BY+C=0：
    当x1=x2时，直线方程为x-x1=0
    当y1=y2时，直线方程为y-y1=0
    当x1≠x2，y1≠y2时，直线的斜率k=(y2-y1)/(x2-x1)
    故直线方程为y-y1=(y2-y1)/(x2-x1)×(x-x1)
    即x2y-x1y-x2y1+x1y1=(y2-y1)x-x1(y2-y1)
    即(y2-y1)x-(x2-x1)y-x1(y2-y1)+(x2-x1)y1=0
    即(y2-y1)x+(x1-x2)y+x2y1-x1y2=0 ①
    可以发现，当x1=x2或y1=y2时，①式仍然成立。所以直线AX+BY+C=0的一般式方程就是：
    A = Y2 - Y1
    B = X1 - X2
    C = X2*Y1 - X1*Y2
    */
    // 点到直线距离公式：d = Math.abs(A * x + B * y + C) / Math.sqrt(A * A + B * B);
    // https://zhuanlan.zhihu.com/p/26307123
    if (x0 !== x1) {
        _a = (y0 - y1) / (x0 - x1);
        _b = (x0 * y1 - x1 * y0) / (x0 - x1);
    }
    else {
        return Math.abs(x - x0) <= _l / 2;
    }
    var tmp = _a * x - y + _b;
    var _s = tmp * tmp / (_a * _a + 1);
    return _s <= _l / 2 * _l / 2;
}