var restURL = "http://fairmarketing.cloudapp.net/rest1.0/endpoint.jsp?"
//var restURL = "http://localhost:8084/rest1.0/endpoint.jsp?"

function userInfoCallback(data)
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
}

function getCookie(paramName)
{
    var name = paramName + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function logUserIP()
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
}

function createRankHackerProject(keyword,location)
{
    keyword = encodeURI(keyword);
    location = encodeURI(location);
    
    var username = getCookie("username");
    if(username == "")
    {
        username = "guest";
    }
    
    //Show the progress bar and suppress the competitors box
    document.getElementById("loadingDiv").style.display = "";
    //document.getElementById('data').style.display = "";
    
    document.getElementById("googleHead").style.display = "none";
    document.getElementById("competitorForm").style.display = "none";
    document.getElementById("initiateButton").style.display = "none";
        
    var targetURL = restURL + "command=createProject&username="+username+"&keyword="+keyword+"&location="+location+"&z=" + Math.random();
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
            var projectID = responseData.projectid;
            
            //projectID = "100";
            
            document.getElementById("projectid").value = projectID;
            //console.log("projectid="+projectID);
            checkGeoRankerDone(projectID);
        }
    }
    
    xmlhttp.open("POST",targetURL,true);
    xmlhttp.send();
}

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

function createAccount()
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
}

function loginAccount()
{
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    
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
                alert("Error: The email address and password you provided do not match our records.");
            }
        }
    }
    
    xmlhttp.open("POST",targetURL,true);
    xmlhttp.send();
}

function remindPassword()
{
    var email = document.getElementById('remind-email').value;
    
    var targetURL = restURL + "command=remindPassword&username="+email+"&z=" + Math.random();
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
                alert("Please check your email for a message from SSD Fair Marketing containing a new password for your account.");
                document.getElementById("remind").style.display = "none";
            }
            else
            {
                alert("Error: We were unable to find an account under that email address.");
            }
        }
    }
    
    xmlhttp.open("POST",targetURL,true);
    xmlhttp.send();
}

function test()
{
    //Show the progress bar and suppress the competitors box
    document.getElementById("loadingDiv").style.display = "";
    document.getElementById('data').style.display = "";
    
    document.getElementById("googleHead").style.display = "none";
    document.getElementById("competitorForm").style.display = "none";
    document.getElementById("initiateButton").style.display = "none";
    
    var projectID = "117";
    document.getElementById("projectid").value = projectID;
    checkGeoRankerDone(projectID);
}

//jQuery action button overrides
$('#gotoComparison').click(runUserAhrefsAnalysis);

$('#gotoInventory').click(runAhrefsAnalysis);

$('#createAccountButton').click(createAccount);

$('#loginButton').click(loginAccount);

$('#recoverButton').click(remindPassword);

$('#get-started').click(validateGetStarted);
function validateGetStarted(e)
{
    var keyword = $('#keyword');
    var location = $('#location');
    document.getElementById('georankerdone').value = "0";
    document.getElementById('projectid').value = "0";
    document.getElementById('ahrefsdone').value = "0";
    document.getElementById('userahrefsdone').value = "0";
    document.getElementById('chartdatareceived').value = "0";
    
    if(!keyword.val() || !location.val())
    {
        e.preventDefault();
        $('#intro-form').addClass('has-error');
        return false;
    }
    else
    {
        $('#intro-form').removeClass('has-error').addClass('has-success');
        var throttle = logUserIP();
//-->        
//        throttle = "false";
//<--        
        if(throttle == 'true')
        {
            e.preventDefault();
            alert("It appears that you have run this tool several times already. Please create an account in order to continue with additional hacks.");
            return false;
        }
        else
        {
            createRankHackerProject(keyword.val(),location.val());
            //test();
        }
    }
}