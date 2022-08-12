function generate_password($length, $include_alpha_l, $include_alpha_u, $include_num, $include_symbols){
    //validacion
    $error = validation($length, $include_alpha_l, $include_alpha_u, $include_num, $include_symbols);
    //if errores
    if ($error.length > 0){
    return show_error($error);
    }
    //crear contraseña
    let $password = keygen($length, $include_alpha_l, $include_alpha_u, $include_num, $include_symbols);
    //password break lines variable
    $password = break_lines($password);
    
    //return password
    return $password;
    }
    function keygen($length, $include_alpha_l, $include_alpha_u, $include_num, $include_symbols){
    let $alpha_l = new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o',`p`,'q','r','s','t','u','v','w','x','y','z');
    let $alpha_u = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
    let $num = new Array(0,1,2,3,4,5,6,7,8,9);
    let $symbols = new Array('-','_','!','?','$','@','#','%','&');
    
    let $password = "";
    let $charset = new Array();
    
    //including--alpha
    if ($include_alpha_l){
    $alpha_l.each(function($value,$key){
    $charset.push($value);
    });
    }
    if ($include_alpha_u){
    $alpha_u.each(function($value,$key){
    $charset.push($value);
    });
    }
    if ($include_num){
    $num.each(function($value,$key){
    $charset.push($value);
    });
    }
    if ($include_symbols){
    $symbols.each(function($value,$key){
    $charset.push($value);
    });
    }
    
    //index random
    $charset.compact();
    $charset_maxindex = $charset.length - 1;
    $indexes = new Array();
    for (var $i=0; $i < $length; $i++){
    let $rand_num = Math.ceil(Math.random() * 100);
    while ($rand_num > $charset_maxindex){
    $rand_num = Math.ceil(Math.random() * 100);
    }
    $indexes.push($rand_num);
    }
    
    //values para index
    $indexes.each(function($value,$key){
    $password += $charset[$value];
    });
    
    return $password;
    }
    function validation($length, $include_alpha_l, $include_alpha_u, $include_num, $include_symbols){
    let $error = new Array();
    
    //validacion1
    if ($length < 1 || $length > 200){
    $error.push("Not valid length");
    }
    
    //validacion2
    if (!$include_alpha_l && !$include_alpha_u && !$include_num && !$include_symbols){
    $error.push("Select one category at least");
    }
    
    return $error;
    }
    function break_lines($password){
    let $output = "";
    
    //valores para index
    let $password_length = $password.length;
    let $c = 0;
    for (var $i=0; $i < $password_length; $i++){
    $output += $password.charAt($i);
    $c++;
    if ($c == 10){
    $output += "<wbr>";
    $c = 0;
    }
    }
    
    return $output;
    }
    function show_error($errors){
    let $output = "<ul>";
    $errors.each(function($value,$key){
    $output += "<li>"+$value+"</li>";
    });
    $output += "</ul>";
    
    return "<div class='error'><b>Error:</b><br>"+$output+"</div>";
    }
