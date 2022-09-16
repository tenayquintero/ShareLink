//se crea la funcion y se asignan los caracteres a usar
function generatePasswordRand(length,type) {
    let characters;
    switch(type){
        case 'num':
            characters = "0123456789";
            break;
        case 'alf':
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
        case 'rand':
            //bucle
            break;
        default:
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            break;
    }
    let pass = "";
    for (let i=0; i < length; i++){
        if(type === 'rand'){
            pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
        }else{
            pass += characters.charAt(Math.floor(Math.random()*characters.length));   
        }
    }
    return pass;
}
//  console.log(generatePasswordRand(9))


