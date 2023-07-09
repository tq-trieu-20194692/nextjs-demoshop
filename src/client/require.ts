import "core-js"

String.prototype.ucwords = function () {
    return this.toLowerCase().replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
    })
}

Number.prototype.format = function (n: number = 0, x: number = 3) {
    const re = '\\d(?=(\\d{' + x + '})+' + (n > 0 ? '\\.' : '$') + ')';

    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
}
