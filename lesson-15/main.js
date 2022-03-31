function makeCounter() {
    let count = 0;

    return function () {
        return count++;
    };
}

let counter1 = makeCounter();


console.log(counter1()) //0
console.log(counter1()) //1
console.log(counter1()) //2


//Когда внутренняя функция начинает выполняться, начинается поиск переменной count++ изнутри-наружу:
//Локальные переменные вложенной функции…
//Переменные внешней функции…
//И так далее, пока не будут достигнуты глобальные переменные.

//В этом примере count будет найден на шаге 2. Когда внешняя переменная модифицируется, она изменится там, где была найдена. Значит, count++ найдёт внешнюю переменную и увеличит её значение в лексическом окружении, которому она принадлежит. Как если бы у нас было let count = 1.




//Для каждого вызова makeCounter() создаётся новое лексическое окружение функции, со своим собственным count. Так что, получившиеся функции counter – независимы.

let counter2 = makeCounter();
let counter3 = makeCounter();

console.log(counter2()) //0
console.log(counter2()) //1

console.log(counter3()) //0
console.log(counter3()) //1
console.log(counter3()) //2
console.log(counter3()) //3

//В JavaScript у каждой выполняемой функции, блока кода и скрипта есть связанный с ними внутренний (скрытый) объект, называемый лексическим окружением LexicalEnvironment.

// Объект лексического окружения состоит из двух частей:
// 1) Environment Record – объект, в котором как свойства хранятся все локальные переменные (а также некоторая другая информация, такая как значение this).
// 2) Ссылка на внешнее лексическое окружение – то есть то, которое соответствует коду снаружи (снаружи от текущих фигурных скобок).

//"Переменная" – это просто свойство специального внутреннего объекта: Environment Record. «Получить или изменить переменную», означает, «получить или изменить свойство этого объекта».

//В отличие от переменных, объявленных с помощью let, функции полностью инициализируются не тогда, когда выполнение доходит до них, а РАНЬШЕ - когда создаётся лексическое окружение. Даже если функция объявлена после переменной, она уже инициализированна до появления этой переменной. Поэтому, к ней можно обращаться до объявления и функции, и переменной.

//Когда код хочет получить доступ к переменной – сначала происходит поиск во внутреннем лексическом окружении, затем во внешнем, затем в следующем и так далее, до глобального. Внутри функции своё внутреннее лексическое окружение.