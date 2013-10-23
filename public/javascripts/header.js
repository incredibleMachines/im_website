$(document).ready(function(){

var navActive=false;
var mobileCheck=false;

if($('.logoMobile').css('display')=='none'){
                mobileCheck=true;
}

        $('header').click(function(){
                if($('.logoMobile').css('display')=='block'){
                
                if(navActive==false){
                        $('nav').css('display','block');
                        $('.buttonMobile').addClass('active');
                        navActive=true;
                }
                else{
                        $('nav').css('display','none');
                        $('.buttonMobile').removeClass('active');
                        navActive=false;
                }
        }

        });

headerResize= function(){
        if($('.logoMobile').css('display')=='none'){
                $('nav').css('display','block');
                $('.buttonMobile').removeClass('active');
                switchCheck=false;
                navActive=false;
        }
        else{
                if(switchCheck==false){
                        $('nav').css('display','none');
                        switchCheck=true;
                }
        }

}

  window.addEventListener('resize', headerResize, false);


});