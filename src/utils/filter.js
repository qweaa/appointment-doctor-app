function preToFixed(m,n){
    if(typeof m == 'number' || typeof m == 'string'){
        m = m.toString();
        var len = m.length;
        for(let i=0; i < n-len; i++){
            m = "0" + m
        }
        return m
    }else{
        console.log("preToFixed(m,n)中的m需要为数字类型或数字字符串类型")
    }
}
// 格式化金钱
function formatMoney(Money){
  if (typeof Money === 'number') {
    Money = Money + ''
  }
  if (typeof Money !== 'string') {
    return Money
  }
  var star = Money.indexOf('.');
  if (star === -1) {
    Money += '.00'
  } else {
    var len = Money.length
    if (len - star === 2) {
      Money += '0'
    }
  }
  return Money
}


function getDate(t){
  return new Date(Number(t)).toLocaleString('chinese',{hour12: false})
}

module.exports = {
    preToFixed: preToFixed,
    formatMoney:formatMoney,
    getDate,
}
