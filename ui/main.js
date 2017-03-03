console.log('Loaded!');

/*//Change the text of center-text div

var element= document.getElementById('center-text');

element.innerHTML='Hello';

//Move the image
var img = document.getElementById('madi');
var marginLeft=0;
function moveRight(){
    marginLeft+=2;
    img.style.marginLeft= marginLeft+'px';
}
img.onclick= function(){
    var interval=setInterval(moveRight,50);
    //img.style.marginLeft ='100px';
};*/


var button =document.getElementById('counter');

button.onclick = function(){
    //Create a request object
    var request=new XMLHttpRequest();

    //Capture Response and store it in a variable
    request.onreadystatechange =function(){
      if(request.readyState === XMLHttpRequest.DONE){
          //Take some action
          if(request.status===200){
              var counter=request.responseText;
              var span=document.getElementById('count');
              span.innerHTML=counter.toString();

          }
      }
    };
    //Make the request
    request.open('GET', 'http://localhost:8080/counter',true);
    request.send(null);

};


var submit= document.getElementById('submit_btn');

submit.onclick = function(){
    //Create a request object
    var request=new XMLHttpRequest();

    //Capture Response and store it in a variable
    request.onreadystatechange =function(){
      if(request.readyState === XMLHttpRequest.DONE){
          //Take some action
          if(request.status===200){
                var names=request.responseText;
                names= JSON.parse(names);
                var list='';
                for(var i=0;i<names.length;i++){
                    list+='<li>'+ names[i] + '</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML=list;

          }
      }
    };
    //Submit Name
    var nameInput= document.getElementById('name');
    var name=nameInput.value;
    //Make the request
    request.open('GET', 'http://localhost:8080/submit-name?name=' + name,true);
    request.send(null);

};

var login = document.getElementById('login_btn');
login.onclick = function(){
    //Create a request object
    var request=new XMLHttpRequest();

    //Capture Response and store it in a variable
    request.onreadystatechange =function(){
      if(request.readyState === XMLHttpRequest.DONE){
          //Take some action
          if(request.status===200){
                console.log('User logged in');
                alert('Logged in successfully!');
                }
                else if(request.status===403){
                  alert('Username/password is incorrect');
                }
                else if(request.status===500){
                  alert('Internal server error');
          }
      }
    };
    //Make request
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    //console.log(username);
    //console.log(password);

    //Make the request
    request.open('POST', 'http://localhost:8080/login',true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username:username, password:password}));

};
