var body=document.querySelector("body");
var button=document.getElementsByName("button");
var startGame=document.getElementById("startGame");
var endGame=document.getElementById("endGame");
var timeNum=document.getElementById("timeNum");
var openInfo=document.getElementById("openInfo");
var information=document.getElementById("information");
var table=document.getElementById("table");

var i=0;
var buttonOrder=new Array();
var buttonFocus=new Array(-1,-1);
var currentFocus=0;
var start=false;
var currentTime=0;
var timeout;
var remainNum;

body.onload=function()
{
    initial();
}
for(let i=0;i<80;i++)
{
    // const num=i;

    button[i].onclick=function()
    {
        clickButton(i);
    }
}
startGame.onclick=function()
{
    if(start)
        return;
    start=true;
    initial();
    gameStart();
}
endGame.onclick=function()
{
    if(!start)
        return;
    start=false;
    gameEnd();
}

function gameStart()
{
    timeNum.innerHTML=currentTime;
    information.innerHTML="游戏开始！"
    currentTime++;
    timeout=setTimeout("gameStart();",1000);
}
function gameEnd()
{
    clearTimeout(timeout);
    information.innerHTML="游戏尚未开始！";
    currentTime=0;
    timeNum.innerHTML=currentTime;
    for(var i=0;i<80;i++)
        button[i].innerHTML=buttonOrder[i];
}

function initial()
{
    var useState=new Array();
    for(var i=0;i<8;i++)
        useState[i]=10;

    var randId;
    for(var i=0;i<80;i++)
    {
        button[i].innerHTML="";
        button[i].style.visibility="visible";
        // console.log(i);
        for(;;)
        {
            randId=Math.round(Math.random()*8);
            if(randId==8)
                randId=0;
            if(!useState[randId])
                continue;
            useState[randId]--;
            buttonOrder[i]=randId;
            break;
        }
    }
    remainNum=80;

    // button[10].style.visibility="hidden";
    // button[10].style.visibility="visible";
}

// localStorage.clear();
review();

var color=0;
var number;
var number1;
var end=true;
var initialStyle;
function colorChange()
{
    end=false;
    button[number].style.background="rgb("+color+","+color+","+color+")";
    button[number1].style.background="rgb("+color+","+color+","+color+")";
    color+=20;
    if(color>256&&color!=275)
        color=255;

    if(color<256)
    {
        setTimeout("colorChange();",50);
    }
    else
    {
        button[number].style.class="btn btn-primary";
        button[number].innerHTML="";
        button[number1].innerHTML="";
        if(buttonOrder[number] == buttonOrder[number1])
        {
            // alert("success");
            button[number].style.visibility="hidden";
            button[number1].style.visibility="hidden";
            remainNum-=2;
            console.log(remainNum);
            if(!remainNum)
            {
                clearTimeout(timeout);
                currentTime--;
                information.innerHTML="成功完成！";
                var grade;
                var name;
                if(!localStorage.getItem("grade"))
                {
                    console.log("重新开始");
                    grade=new Array();
                    name=new Array();
                    grade[0]=currentTime;
                    name[0]=prompt("恭喜您成功完成，请输入您的姓名","bingo");
                    if(name[0]=="")
                        name[0]="匿名用户";
                    localStorage.setItem("grade",JSON.stringify(grade));
                    localStorage.setItem("name",JSON.stringify(name));
                }
                else
                {
                    grade=JSON.parse(localStorage.getItem("grade"));
                    name=JSON.parse(localStorage.getItem("name"));
                    // console.log(name);
                    // console.log(grade);
                    var i=0,j=0;
                    for(;i<grade.length;i++)
                    {
                        if(grade[i]<currentTime)
                            continue;
                        
                        // console.log("插入中间\n位置:",i,"\ngrade.length:"+grade.length,"\n")
                        for(j=grade.length;j>i;j--)
                        {
                            grade[j]=grade[j-1];
                            name[j]=name[j-1];
                        }

                        grade[i]=currentTime;
                        name[i]=prompt("恭喜您成功完成，请输入您的姓名","bingo");
                        if(name[i]=="")
                            name[i]="匿名用户"
                        break;
                    }
                    if(i==grade.length)
                    {
                        grade[i]=currentTime;
                        name[i]=prompt("恭喜您成功完成，请输入您的姓名","bingo");
                        if(name[i]=="")
                            name[i]="匿名用户"
                    }
                    localStorage.setItem("grade",JSON.stringify(grade));
                    localStorage.setItem("name",JSON.stringify(name));
                }
                review();
                currentTime=0;
                start=false;
            }
        }
        end=true;
    }
}

function review()
{
    var grade;
    var name;
    grade=JSON.parse(localStorage.getItem("grade"));
    name=JSON.parse(localStorage.getItem("name"));

    var innerText="<thead class='w-100 thead-light'><tr class='row'><th class='col-6'>玩家</th><th class='col-6'>成绩</th></tr></thead>";
    innerText+="<tbody class='w-100'>";
    for(var i in grade)
    {
        innerText+="<tr class='row'><td class='col-6'>"+name[i]+"</td><td class='col-6'>"+grade[i]+"s</td></tr>";
    }
    innerText+="</tbody>";
    table.innerHTML=innerText;
}

function clickButton(order)
{
    // for(var i in buttonFocus)
    //     if(buttonFocus[i]==order)
    //     {
    //         button[order].innerHTML="";
    //         buttonFocus[i]=-1;
    //         if(currentFocus!=i)
    //             currentFocus=(currentFocus+1)%2;
    //         return;
    //     }
    // if(buttonFocus[currentFocus]!=-1)
    //     button[buttonFocus[currentFocus]].innerHTML="";
    // button[order].innerHTML=buttonOrder[order];
    // buttonFocus[currentFocus]=order;
    // currentFocus=(currentFocus+1)%2;
    if(!start)
    {
        openInfo.click();
        return;
    }
    if(!end)
        return;
    if(currentFocus==1&&buttonFocus[0]==order)
        return;

    button[order].innerHTML=buttonOrder[order];
    buttonFocus[currentFocus]=order;
    currentFocus=(currentFocus+1)%2;

    if(currentFocus==0)
    {
        // for(var color=255;color>0;color--)
        // {
        //     for(var i=0;i<100;i++)
        //     {
        //         button[buttonFocus[0]].style.background="rgb("+color+","+color+","+color+")";
        //         button[buttonFocus[1]].style.background="rgb("+color+","+color+","+color+")";
        //         console.log(color);
        //     }
        // }

        color=0;
        number=buttonFocus[0];
        number1=buttonFocus[1];
        colorChange();

        // button[buttonFocus[0]].innerHTML="";
        // button[buttonFocus[1]].innerHTML="";
        // // console.log(buttonFocus[0],buttonFocus[1]);
        // if(buttonOrder[buttonFocus[0]] == buttonOrder[buttonFocus[1]])
        // {
        //     // alert("success");
        //     button[buttonFocus[0]].style.visibility="hidden";
        //     button[buttonFocus[1]].style.visibility="hidden";
        // }
    }
}