%{
    // Importar librerías
    const {Aritmetica} = require("../js/Expresion/aritmetica");
    const {Relacional} = require("../js/Expresion/relacionales");
    const {Logico} = require("../js/Expresion/logico");
    const {Primitivo} = require("../js/Expresion/primitivo");
    const {OpAritmetica,OpRelacional,OpLogico,TipoDato} = require("../js/Abstract/resultado");
    const {Cout} = require("../js/Instruccion/cout");
    const {Bloque} = require("../js/Instruccion/bloque");
    const {FN_IF} = require("../js/Instruccion/control/if");
    const {AST} = require("../js/AST");
    const {Tolower} = require("../js/Expresion/tolower");
    const {Toupper} = require("../js/Expresion/toupper");
    const {Round} = require("../js/Expresion/round");
    const {Tostring} = require("../js/Expresion/tostring");
    const {Ternario} = require("../js/Expresion/ternario");
    const {Casteo} = require("../js/Expresion/casteos");
    const {Dvariables} = require("../js/Instruccion/dvariables");
    const {Subebaja} = require("../js/Instruccion/increydecre");
    const {Valorid} = require("../js/Expresion/valorid");
    const {Avariable} = require("../js/Instruccion/actualizarvalor")
    const {Length}=require("../js/Expresion/length");
    const {Break} = require("../js/Instruccion/break");
    const {Continue} = require("../js/Instruccion/continue");
    const {Dowhile} = require("../js/Instruccion/dowhile");
    const {While} = require("../js/Instruccion/while");


%}
%lex // Inicia parte léxica

%options case-insensitive

%%
//Palabras reservadas
\s+                                 //ignora espacios
[\t\r\n\f]+    //ignora espacios
"//".*           {/*Comentario de una linea*/}     
[/][*][^]*[*]+([^/*][^*]*[*]+)*[/]        /* Ignorar comentarios multilinea */

[0-9]+("."[0-9]+)\b     return 'DOUBLE';
[0-9]+\b                return 'NUMBER';



//Instrucciones de control
"if"                    return 'IF';
"else"                  return 'ELSE';
"{"                     return 'LLAVEIZQ';
"}"                     return 'LLAVEDER';
//Funcion cout
"cout"                  return 'COUT';
"<<"                    return '<<';
"endl"                  return 'SALTOCOUT';
//Funcion tolower,toupper,round,length,TypeOf,ToString,c_str
"tolower"               return 'TOLOWER';
"toupper"               return 'TOUPPER';
"round"                 return 'ROUND';
"length"                return 'LENGHT';
"typeof"                return 'TYPEOF';
"std::tostring"         return 'TOSTRING';
"c_str"                 return 'CSTR';
//ternario
"?"                     return 'SADM';
//iNCREMENTO Y DECREMENTO 
"++"                    return 'MASD';
"--"                    return 'MEND';
//cICLO DO-WHILE
"do"                    return 'DO';
"while"                 return 'WHILE';
//cierres
"break"                 return 'BREAK';
"continue"              return 'CONTINUE';
"return"                return 'RETURN';

// signos
"("                     return 'PARIZQ';
")"                     return 'PARDER';
// Aritmeticas
"+"                     return 'MAS';
"-"                     return 'RES';
"*"                     return 'MUL';
"/"                     return 'DIV';
";"                     return 'PYC';
"."                     return 'PF';
","                     return 'CM';
":"                     return 'DP';
"%"                     return 'MOD';
"pow"                   return 'POW';
// Relacionales
"=="                    return 'IGUAL';
"!="                    return 'DISTINTO';
"<="                    return 'MENORIGUAL';
"<"                     return 'MENOR';
">="                    return 'MAYORIGUAL';
">"                     return 'MAYOR';
"="                     return 'ASIGNACION';
//logicos
"&&"                    return 'AND';
"||"                    return 'OR';
"!"                     return 'NOT';
// Cadenas             "asdfasdfasf"
[\"][^\\\"]*([\\][\\\"ntr][^\\\"]*)*[\"]	{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'([^\']|['\n']|[\t]|[\r]|[\u])\'               { yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }
"true"                                          {return 'TRUE';}
"false"                                         {return 'FALSE';}
"int"|"double"|"bool"|"char"|"std::string"      {return 'TIPOD';}
([a-z])[a-z0-9_]*                               {return 'ID';}


<<EOF>>                 return 'EOF';

.	        			   {    console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext);    }

// Finaliza parte de Léxica
/lex

// precedencia
%right 'PF'
%right 'TIPOD'
%right 'SADM'
%right 'NOT'
%left 'OR'
%left 'AND'
%left 'IGUAL','DISTINTO','MENOR','MENORIGUAL','MAYOR','MAYORIGUAL'
%left 'MAS', 'RES'
%left 'MUL','DIV','MOD'
%nonassoc 'POW'
%right UMINUS 

// Inicio de gramática
%start ini

// Parte sintáctica  - Definición de la gramática
%%

ini : instrucciones EOF { return new AST($1);}
;

instrucciones: instrucciones instruccion    {  $1.push($2); $$ = $1;}
            | instruccion                   { $$ =  [$1];}
            
;

instruccion: 
            fn_cout PYC                { $$ = $1;}
            | fn_if                     { $$ = $1;}
            |fn_dvariables PYC          { $$ = $1;}
            |subebaja  PYC              { $$ = $1;}
            |avariables PYC             { $$ = $1;}
            |fn_dowhile PYC             { $$ = $1;}
            |fn_while                   { $$ = $1;}
            |BREAK PYC                  {$$ = new Break(@1.first_line,@1.first_column);}
            |CONTINUE PYC               {$$ = new Continue(@1.first_line,@1.first_column);}  
            //|error PYC                  {console.log("Error sintactico en la Linea: " + this._$.first_line + " en la Columna: " + this._$.first_column);}
            ;
            
fn_while
        : WHILE PARIZQ expresion PARDER bloque {$$ = new While($3,$5,@1.first_line,@1.first_column);}
;
fn_dowhile
        : DO bloque WHILE PARIZQ expresion PARDER {$$ = new Dowhile($5,$2,@1.first_line,@1.first_column);}
;
// Para sitetisar un dato, se utiliza $$
expresion: RES expresion %prec UMINUS                   { $$ = new Aritmetica(new Primitivo(0,0,0),$2,OpAritmetica.RESTA,@1.first_line,@1.first_column);} 
        | expresion MAS expresion                       { $$ = new Aritmetica($1,$3,OpAritmetica.SUMA,@2.first_line,@2.first_column);}
        | expresion RES expresion                       { $$ = new Aritmetica($1,$3,OpAritmetica.RESTA,@2.first_line,@2.first_column);}
        | expresion MUL expresion                       { $$ =  new Aritmetica($1,$3,OpAritmetica.PRODUCTO,@2.first_line,@2.first_column);}
        | expresion DIV expresion                       { $$ =  new Aritmetica($1,$3,OpAritmetica.DIVISION,@2.first_line,@2.first_column);}
        | expresion MOD expresion                       {$$ =  new Aritmetica($1,$3,OpAritmetica.MOD,@2.first_line,@2.first_column);}
        | POW PARIZQ expresion CM expresion PARDER      {$$ =  new Aritmetica($3,$5,OpAritmetica.POW,@1.first_line,@1.first_column);}
        | relacionales                                  { $$ = $1;}
        | logicos                                       { $$ = $1;}
        | NUMBER                                        { $$ = new Primitivo($1,TipoDato.NUMBER,@1.first_line,@1.first_column); }
        | DOUBLE                                        { $$ =  new Primitivo($1,TipoDato.DOUBLE,@1.first_line,@1.first_column); }
        | TRUE                                          { $$ =  new Primitivo($1,TipoDato.BOOLEANO,@1.first_line,@1.first_column); }
        | FALSE                                         { $$ =  new Primitivo($1,TipoDato.BOOLEANO,@1.first_line,@1.first_column); }
        | CADENA                                        { $$ =  new Primitivo($1,TipoDato.STRING,@1.first_line,@1.first_column); }
        | CARACTER                                      { $$ =  new Primitivo($1,TipoDato.CHAR,@1.first_line,@1.first_column); }
        | PARIZQ expresion PARDER                       { $$ = $2;}
        | TOLOWER PARIZQ expresion PARDER               {$$ = new Tolower($3,@1.first_line,@1.first_column);}
        | TOUPPER PARIZQ expresion PARDER               {$$ = new Toupper($3,@1.first_line,@1.first_column);}
        | ROUND PARIZQ expresion PARDER                 {$$ = new Round($3,@1.first_line,@1.first_column);}  
        | TOSTRING PARIZQ expresion PARDER              {$$ = new Tostring($6,@1.first_line,@1.first_column);}
        | expresion SADM expresion DP expresion         {$$ = new Ternario($1,$3,$5,@1.first_line,@1.first_column);}
        | PARIZQ TIPOD PARDER expresion                 {$$ = new Casteo($2,$4,@1.first_line,@1.first_column);}
        | ID                                            {$$ = new Valorid($1,@1.first_line,@1.first_column);}
        | expresion PF LENGHT PARIZQ PARDER             {$$ = new Length($1,@1.first_line,@1.first_column);}
            
;
//actualizar vALORES
avariables
        :ID ASIGNACION expresion                        {$$ = new Avariable($1,$3,@1.first_line,@1.first_column)}
;
//Incremento y Decremento
subebaja
        : ID MASD                                       {$$ = new Subebaja($1,true,@1.first_line,@1.first_column);}
        | ID MEND                                       {$$ = new Subebaja($1,false,@1.first_line,@1.first_column);}
;
relacionales
        : expresion IGUAL expresion       { $$ =  new Relacional($1,$3,OpRelacional.IGUAL,@2.first_line,@2.first_column);}
        | expresion DISTINTO expresion    { $$ =  new Relacional($1,$3,OpRelacional.DISTINTO,@2.first_line,@2.first_column);}
        | expresion MENOR expresion       { $$ =  new Relacional($1,$3,OpRelacional.MENOR,@2.first_line,@2.first_column);}
        | expresion MENORIGUAL expresion  { $$ =  new Relacional($1,$3,OpRelacional.MENORIGUAL,@2.first_line,@2.first_column);}
        | expresion MAYOR expresion       { $$ =  new Relacional($1,$3,OpRelacional.MAYOR,@2.first_line,@2.first_column);}
        | expresion MAYORIGUAL expresion  { $$ =  new Relacional($1,$3,OpRelacional.MAYORIGUAL,@2.first_line,@2.first_column);}
;

logicos
        : expresion AND expresion       { $$ =  new Logico($1,$3,OpLogico.AND,@2.first_line,@2.first_column);}
        | expresion OR  expresion       { $$ =  new Logico($1,$3,OpLogico.OR,@2.first_line,@2.first_column);}
        | NOT expresion                 { $$ =  new Logico(null,$2,OpLogico.NOT,@1.first_line,@1.first_column);}
;
//Declaracion variables
fn_dvariables:
        TIPOD listavar findeclaracion   {$$ = new Dvariables($1,$2,$3,@1.first_line,@1.first_column);}
;
listavar
        :listavar CM ID                {$1.push($3); $$ =$1;}
        |ID                            {$$ = [$1];}
;

findeclaracion
        :                            {$$=null;}
        | ASIGNACION expresion       {$$ = $2;}
;

//PARA PODER IMPRIMIR
fn_cout: COUT '<<' expresion  { $$ = new Cout($3,false,@1.first_line,@1.first_column);}
        | COUT '<<' expresion '<<' SALTOCOUT { $$ = new Cout($3,true,@1.first_line,@1.first_column)}
;


// Bloque de instrucciones
bloque
        : LLAVEIZQ instrucciones LLAVEDER      { $$= new Bloque($2);}
        | LLAVEIZQ  LLAVEDER                    { $$ = new Bloque([]); }
;
// Sentencia de control
fn_if
        : IF PARIZQ expresion PARDER bloque     { $$ = new FN_IF($3,$5,null,@1.first_line,@1.first_column);}
        | IF PARIZQ expresion PARDER bloque ELSE bloque     { $$ = new FN_IF($3,$5,$7,@1.first_line,@1.first_column);}
        | IF PARIZQ expresion PARDER bloque ELSE fn_if     { $$ = new FN_IF($3,$5,$7,@1.first_line,@1.first_column);}
;