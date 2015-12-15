//var restURL = "http://fairmarketing.cloudapp.net/rest1.0/endpoint.jsp?"
var restURL = "http://localhost:8084/rest1.0/endpoint.jsp?"

/*function userInfoCallback(data)
{
    var clientIP = data["ip_address"];
    document.cookie = "client_ip="+clientIP;
}

function detectIP()
{
    var snifferURL = "http://api.hostip.info/get_json.php";
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var ip = xmlhttp.responseText;
            var ipInfo = JSON.parse(ip);
            var clientIP = ipInfo.ip;
            //var xForwarder = ipInfo.http_forwarded_for;
            
            //Set a cookie initially; we'll log it to the database once they try to submit a competitor request
            document.cookie = "client_ip="+clientIP;
            //document.cookie = "x_forwarder="+xForwarder;
        }
    }
    
    xmlhttp.open("POST",snifferURL,true);
    xmlhttp.send();
}*/

function getCookie(paramName)
{
    var name = paramName + "=";
    var ca = document.cookie.split('; ');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

/*function logUserIP()
{
    var clientIP = getCookie("client_ip");
    //var xForwarder = getCookie("x_forwarder");
    var xForwarder = "0.0.0.0";
    
    var targetURL = restURL + "command=logIP&clientIP="+clientIP+"&xForwarder="+xForwarder+"&z=" + Math.random();
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
            var response = xmlhttp.responseText;
            var responseData = JSON.parse(response);
            if(responseData.status === "Success")
            {
                var throttle = responseData.throttle;
            }
            
            return throttle;
        }
    }
    
    xmlhttp.open("POST",targetURL,true);
    xmlhttp.send();
}*/

function getGeoRankerCompetitors(projectID, callback)
{
    var targetURL = restURL + "command=getCompetitorsHTML&projectid="+projectID+"&z=" + Math.random();
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    var htmlData = "";
    
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
            var response = xmlhttp.responseText;
            var responseData = JSON.parse(response);
            htmlData = responseData.html;
            callback(htmlData);
        }
    }
    
    xmlhttp.open("POST",targetURL,true);
    xmlhttp.send();
    
}

function checkGeoRankerDone(projectID)
{
    var targetURL = restURL + "command=checkGeoRankerDone&projectid="+projectID+"&z=" + Math.random();
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
            var response = xmlhttp.responseText;
            var responseData = JSON.parse(response);
            var rsCount = responseData.records;
            if(rsCount > 0)
            {
                document.getElementById('georankerdone').value = "1";
                window.clearInterval(repeater);
            }
        }
    }
    
    var repeater = window.setInterval(function(){
        xmlhttp.open("POST",targetURL,true);
        xmlhttp.send();
    }, 2500);
    
}

function checkAhrefsDone(projectID)
{
    var targetURL = restURL + "command=checkAhrefsDone&projectid="+projectID+"&z=" + Math.random();
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
            var response = xmlhttp.responseText;
            var responseData = JSON.parse(response);
            var rsCount = responseData.status;
            if(rsCount > 0)
            {
                document.getElementById('ahrefsdone').value = "1";
                window.clearInterval(repeater);
            }
        }
    }
    
    var repeater = window.setInterval(function(){
        xmlhttp.open("POST",targetURL,true);
        xmlhttp.send();
    }, 2500);
    
}

function checkUserAhrefsDone(projectID)
{
    var targetURL = restURL + "command=checkUserAhrefsDone&projectid="+projectID+"&z=" + Math.random();
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
            var response = xmlhttp.responseText;
            var responseData = JSON.parse(response);
            var rsCount = responseData.status;
            if(rsCount > 0)
            {
                document.getElementById('userahrefsdone').value = "1";
                window.clearInterval(repeater);
            }
        }
    }
    
    var repeater = window.setInterval(function(){
        xmlhttp.open("POST",targetURL,true);
        xmlhttp.send();
    }, 2500);
    
}

function getGeoRankerCompetitorsArray(projectID, callback)
{
    var targetURL = restURL + "command=getCompetitorsJSON&projectid="+projectID+"&z=" + Math.random();
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
            var response = xmlhttp.responseText;
            var responseData = JSON.parse(response);
            var data = responseData.competitors;
            
            var competitorsObject = JSON.parse(data);
            var competitors = [];
            for(var i = 0; i < competitorsObject.length; i++)
            {
                competitors[i] = competitorsObject[i].url;
            }
            callback(competitors);
        }
    }

    xmlhttp.open("POST",targetURL,true);
    xmlhttp.send();
}

function runAhrefsAnalysis()
{
    var projectID = document.getElementById('projectid').value;
    var IDs = "";
    //var URLs = "";
    var counter = 0;
    //var safeURL = "";
    //$("input[name*='competitorURL']:checked").each(function() {
    $('#competitorsListAll input:checked').each(function() {
        if(counter == 0)
        {
            //safeURL = $(this).val();
            //safeURL = safeURL.replace("&","%26")
            //URLs = $(this).val();
            //URLs = safeURL;
            //IDs = $("#linkID_"+counter).val();
            IDs = $(this).attr('value');
        }
        else
        {
            //safeURL = $(this).val();
            //safeURL = safeURL.replace("&","%26")
            //URLs += "|"+safeURL;
            //IDs += "|"+$("#linkID_"+counter).val();
            IDs += "|" + $(this).attr('value');
        }
        counter++;
     });
    
    //alert(projectID);
    //alert(IDs);
    //alert(URLs);
    
    //Show the analyzing spinner and suppress the inventory box
    document.getElementById("analyzingDiv").style.display = "";
    
    document.getElementById("inventory").style.display = "none";
    document.getElementById("user").style.display = "none";
    
    var targetURL = restURL + "command=processAhrefs&projectid="+projectID+"&linkids="+IDs+"&z=" + Math.random();
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
            /*var response = xmlhttp.responseText;
            var responseData = JSON.parse(response);
            var status = responseData.status;
            var countInfo = responseData.counts;
            
            if(status === "complete")
            {
                document.getElementById('ahrefsdone').value = "1";
                callback(countInfo);
            }*/
            checkAhrefsDone(projectID);
        }
    }

    xmlhttp.open("POST",targetURL,true);
    xmlhttp.send();
}

function getAhrefsData(callback)
{
    var projectID = document.getElementById('projectid').value;
    var targetURL = restURL + "command=getAhrefsData&projectid="+projectID+"&z=" + Math.random();
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
            var response = xmlhttp.responseText;
            var responseData = JSON.parse(response);
            var countInfo = responseData.counts;
            callback(countInfo);
        }
    }

    xmlhttp.open("POST",targetURL,true);
    xmlhttp.send();
}

function runUserAhrefsAnalysis()
{
    var projectID = document.getElementById('projectid').value;
    var url = document.getElementById('userUrl').value;
    
    //Show the analyzing spinner and suppress the inventory box
    document.getElementById("user-analyzer").style.display = "";
    
    document.getElementById("comparison").style.display = "none";
    document.getElementById("inventory").style.display = "none";
    document.getElementById("user").style.display = "none";
    
    var targetURL = restURL + "command=processUserAhrefs&projectid="+projectID+"&site="+url+"&z=" + Math.random();
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
            /*var response = xmlhttp.responseText;
            var responseData = JSON.parse(response);
            var status = responseData.status;
            var countInfo = responseData.counts;
            var weeklyInfo = responseData.weeklyData;
            var monthlyInfo = responseData.monthlyData;
            var annualInfo = responseData.annualData;
            
            if(status === "complete")
            {
                document.getElementById('userahrefsdone').value = "1";
                callback(countInfo,weeklyInfo,monthlyInfo,annualInfo);
            }*/
            checkUserAhrefsDone(projectID);
        }
    }

    xmlhttp.open("POST",targetURL,true);
    xmlhttp.send();
}

function getUserAhrefsData(callback)
{
    var projectID = document.getElementById('projectid').value;
    var url = document.getElementById('userUrl').value;
    
    //Show the analyzing spinner and suppress the inventory box
    document.getElementById("user-analyzer").style.display = "";
    
    document.getElementById("comparison").style.display = "none";
    
    var targetURL = restURL + "command=getUserAhrefsData&projectid="+projectID+"&z=" + Math.random();
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
            var response = xmlhttp.responseText;
            var responseData = JSON.parse(response);
            //var status = responseData.status;
            var countInfo = responseData.counts;
            var weeklyInfo = responseData.weeklyData;
            var monthlyInfo = responseData.monthlyData;
            var annualInfo = responseData.annualData;
            
            callback(countInfo,weeklyInfo,monthlyInfo,annualInfo);
        }
    }

    xmlhttp.open("POST",targetURL,true);
    xmlhttp.send();
}

/*function createAccount()
{
    var email = document.getElementById('register-email').value;
    var password = document.getElementById('register-password').value;
    
    var targetURL = restURL + "command=createAccount&username="+email+"&password="+password+"&z=" + Math.random();
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
            var response = xmlhttp.responseText;
            var responseData = JSON.parse(response);
            if(responseData.status == "Success")
            {
                document.cookie = "username="+email;
                document.getElementById("register").style.display = "none";
            }
            else
            {
                alert("Error: The email address you entered already exists in our system.");
            }
        }
    }
    
    xmlhttp.open("POST",targetURL,true);
    xmlhttp.send();
}*/

//jQuery action buttons

$('#login_submit_button').click(loginAccount);

$('#login_cancel_button').click(hideLogin);

$('#login_button').click(showLogin);

$('#password_remind_button').click(remindPassword);

$('#initiate-rank-hack').click(initiateRankHack);

$('#get-declassified-comparison').click(getDeclassifiedComparison);

function loginAccount()
{
    var email = $('#user-email').val();
    var password = $('#user-password').val();
    
    if(email.trim() == '' || email.indexOf("@") == -1)
    {
        $("#login-response").html("Error: Please provide a valid email address.");
    }
    else if(password.trim() == '')
    {
        $("#login-response").html("Error: Please enter your password.");
    }
    else
    {
    
        var targetURL = restURL + "command=loginAccount&username="+email+"&password="+password+"&z=" + Math.random();
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState===4 && xmlhttp.status===200)
            {
                var response = xmlhttp.responseText;
                var responseData = JSON.parse(response);
                if(responseData.status == "Success")
                {
                    document.cookie = "username="+email;
                    document.getElementById("login").style.display = "none";
                }
                else
                {
                    $("#login-response").html("Error: The email address and password you provided do not match our records.");
                }
            }
        }

        xmlhttp.open("POST",targetURL,true);
        xmlhttp.send();
    }
}

function hideLogin()
{
    document.getElementById("dimmer").style.display = "none";
    document.getElementById("login-window").style.display = "none";
}

function showLogin()
{
    document.getElementById("login-window").style.display = "block";
    document.getElementById("dimmer").style.display = "block";
}

function remindPassword()
{
    var email = $('#user-email').val();
    
    if(email.trim() == '')
    {
        $("#login-response").html("Error: Please provide a valid email address.");
    }
    else
    {
        $.ajax({url: restURL, data: {'command':'remindPassword','username':email}, type: 'post', async: true, success: function postResponse(returnData){
                var info = JSON.parse(returnData);

                if(info.status == "success")
                {
                    $("#login-response").html("Please check your email for a message from SSD Fair Marketing containing a new password for your account.");
                }
                else if(info.status == "error")
                {
                    $("#login-response").html("Error: We were unable to find an account under that email address.");
                }
            }
        });
    }
}

function initiateRankHack()
{
    var competitorURL = $('#competitor-url').val();
    
    //url_validate = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    url_validate = /(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    
    if(competitorURL.trim() == '')
    {
        $('#competitor-url').attr('placeholder', 'Please enter a URL');
        $('#competitor-url').parent('li').addClass('invalid');
        $('#competitor-url').parent('li').removeClass('valid');
        return false;
    }
    else if(!url_validate.test(competitorURL))
    {
        /*$('#competitor-url').attr('placeholder', 'You must enter a proper URL');
        $('#competitor-url').parent('li').addClass('invalid');
        $('#competitor-url').parent('li').removeClass('valid');*/
        return false;
    }
    else
    {
        createRankHackerProject(competitorURL.trim());
    }
}

function getSessionID(callback)
{
    var sessionID = getCookie("session_id");
    if(sessionID == '' || sessionID == null)
    {
        $.ajax({url: restURL, data: {'command':'getSession'}, type: 'post', async: true, success: function postResponse(returnData){
                var info = JSON.parse(returnData);

                if(info.status == "success")
                {
                    sessionID = info.sessionid;
                    callback(sessionID);
                }
            }
        });
    }
    else
    {
        callback(sessionID);
    }
    
}

function createRankHackerProject(competitorURL)
{
    competitorURL = encodeURI(competitorURL);
    
    var username = getCookie("username");
    if(username == "")
    {
        username = "guest";
    }
    getSessionID(function(sessionID){
        
        document.cookie = "session_id="+sessionID;
        //Once you have a valid session, create the project
        $.ajax({url: restURL, data: {'command':'createProject','username':username,'sessionID':sessionID,'competitorURL':competitorURL}, type: 'post', async: true, success: function postResponse(returnData){
                var info = JSON.parse(returnData);

                if(info.status == "success")
                {
                    var projectID = info.projectid;
                    document.cookie = "project_id="+projectID;
                    window.location = "gather.html";
                }
            }
        });
    });
}

function startInitialAhrefsRequest()
{
    var projectID = getCookie("project_id");
    
    $.ajax({url: restURL, data: {'command':'runInitialAhrefs','projectid':projectID}, type: 'post', async: true, success: function postResponse(returnData){
            var info = JSON.parse(returnData);

            if(info.status == "success")
            {
                window.location = "inventory.html";
            }
        }
    });
}

function getInitialInventoryCounts()
{
    var projectID = getCookie("project_id");

    $.ajax({url: restURL, data: {'command':'getInitialInventoryCounts','projectid':projectID}, type: 'post', async: true, success: function postResponse(returnData){
            var info = JSON.parse(returnData);

            if(info.status == "success")
            {
                var entry = info.data[0];
                
                var url = entry.competitorURL;
                var runDate = entry.runDate;
                var annualCount = entry.annualCount;
                var monthlyCount = Math.ceil(annualCount/12);
                var weeklyCount = Math.ceil(monthlyCount/4);
                
                $('#inventory-competitor-url').html(url);
                $('#them1').val(url);
                $('#report-created-date').html(runDate);
                /*$('#timer_id').html(annualCount);
                $('#timer_id2').html(monthlyCount);
                $('#timer_id3').html(weeklyCount);*/
                
                var timer_id = new countUp("timer_id", 0, parseInt(annualCount), 0, 5);
                var timer_id2 = new countUp("timer_id2", 0, parseInt(monthlyCount), 0, 2.5);
                var timer_id3 = new countUp("timer_id3", 0, parseInt(weeklyCount), 0, 1);
                timer_id.start();
                timer_id2.start();
                timer_id3.start();
            }
        }
    });
}

function getDeclassifiedComparison()
{
    
}