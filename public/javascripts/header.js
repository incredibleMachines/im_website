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
                        $('.project-vid').css('padding-top',$('nav').height());
                        navActive=true;
                }
                else{
                        $('nav').css('display','none');
                        $('.project-vid').css('padding-top',0);
                        $('.buttonMobile').removeClass('active');
                        navActive=false;
                }
        }

        });

headerResize= function(){
        if($('.logoMobile').css('display')=='none'){
                $('nav').css('display','block');
                $('.project-vid').css('padding-top',0);
                $('.buttonMobile').removeClass('active');
                navActive=false;
        }
        else{
                $('nav').css('display','none');
        }

}

  window.addEventListener('resize', headerResize, false);


});