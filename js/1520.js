//var restURL = "http://fairmarketing.cloudapp.net/rest1.0/endpoint.jsp?"
var restURL = "http://localhost:8084/rest1.0/endpoint.jsp?"

function getURLParameter(name)
{
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

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

$('#alert_close_button').click(hideAlert);

$('#login_button').click(showLogin);

$('#logout_link').click(logout);

$('#password_remind_button').click(remindPassword);

$('#initiate-rank-hack').click(initiateRankHack);

$('#get-declassified-comparison').click(getDeclassifiedComparison);

$('#create-new-report-button').click(createNewReport);

//$('#save-password-button').click(saveAuthenticationPassword);

function logout()
{
    //Expire the cookies
    document.cookie = 'session_id=';
    document.cookie = 'project_id=';
    document.cookie = 'username=';
    document.cookie = 'email=';
    
    window.location = "index.html";
}

function loginAccount()
{
    var email = $('#user-email').val().trim();
    var password = $('#user-password').val().trim();

    if(email == '' || email.indexOf("@") == -1)
    {
        $("#login-response").html("Error: Please provide a valid email address.");
    }
    else if(password == '')
    {
        alert("hi");
        $("#login-response").html("Error: Please enter your password.");
    }
    else
    {
        //Show the spinner
        $("#login-response").html("<div class='three-quarters-loader-small'></div>");
        
        $.ajax({url: restURL, data: {'command':'loginAccount','username':email,'password':password}, type: 'post', async: true, success: function postResponse(returnData){
                var info = JSON.parse(returnData);

                if(info.status == "success")
                {
                    document.cookie = "username="+email;
                    window.location = "dashboard.html";
                }
                else if(info.status == "error")
                {
                    $("#login-response").html(info.message);
                }
            }
        });
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

function hideAlert()
{
    document.getElementById("dimmer").style.display = "none";
    document.getElementById("alert-window").style.display = "none";
}

function showAlert(msgContent)
{
    $('#alert-msg-body').html(msgContent);
    document.getElementById("alert-window").style.display = "block";
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
    
    url_validate = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    //url_validate = /(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    
    if(competitorURL.indexOf("ftp://") == -1 || competitorURL.indexOf("http://") == -1 || competitorURL.indexOf("https://") == -1)
    {
        competitorURL = "http://"+competitorURL;
    }
    
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

function createRankHackerProjectFromDashboard(clientURL,competitorURL1,competitorURL2,competitorURL3,competitorURL4,competitorURL5)
{
    clientURL = encodeURI(clientURL);
    competitorURL1 = encodeURI(competitorURL1);
    competitorURL2 = encodeURI(competitorURL2);
    competitorURL3 = encodeURI(competitorURL3);
    competitorURL4 = encodeURI(competitorURL4);
    competitorURL5 = encodeURI(competitorURL5);
    
    var username = getCookie("username");
    if(username == "")
    {
        username = "guest";
    }
    getSessionID(function(sessionID){
        
        document.cookie = "session_id="+sessionID;
        //Once you have a valid session, create the project
        $.ajax({url: restURL, data: {'command':'createProjectFromDashboard','username':username,'sessionID':sessionID,'clientURL':clientURL,'competitorURL1':competitorURL1,'competitorURL2':competitorURL2,'competitorURL3':competitorURL3,'competitorURL4':competitorURL4,'competitorURL5':competitorURL5}, type: 'post', async: true, success: function postResponse(returnData){
                var info = JSON.parse(returnData);

                if(info.status == "success")
                {
                    window.location = "dashboard.html";
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
    var projectID = getCookie("project_id");
    var sessionID = getCookie("session_id");
    
    var clientURL = $('#client-url').val().trim();
    var clientName = $('#client-name').val().trim();
    var clientEmail = $('#client-email').val().trim();
    
    //var them1 = $('#them1').val();  //We already have this saved
    var them2 = $('#them2').val().trim();
    var them3 = $('#them3').val().trim();
    var them4 = $('#them4').val().trim();
    var them5 = $('#them5').val().trim();
    
    if(clientURL != '' && clientName != '' && clientEmail != '')
    {
        //Save the email to cookie so that we can re-send verification later on if needed
        document.cookie = "email="+clientEmail;
        
        //Initiate the Cognitive calls
        $.ajax({url: restURL, data: {'command':'requestFullReport','sessionid':sessionID,'projectid':projectID,'clienturl':clientURL,'clientname':clientName,'clientemail':clientEmail,'them2':them2,'them3':them3,'them4':them4,'them5':them5}, type: 'post', async: true, success: function postResponse(returnData){
                var info = JSON.parse(returnData);

                if(info.status == "success")
                {
                    window.location = "declassify.html";
                }
            }
        });
        
    }
}

function authenticateToken()
{
    var email = getURLParameter("email");
    var token = getURLParameter("token");
    
    $.ajax({url: restURL, data: {'command':'authenticateToken','email':email,'token':token}, type: 'post', async: true, success: function postResponse(returnData){
                var info = JSON.parse(returnData);

                if(info.status == "success")
                {
                    document.getElementById('success-message').style.display = "";
                    document.getElementById('create-password-message').style.display = "";
                    document.getElementById('password-form').style.display = "";
                }
                else if(info.status == "error")
                {
                    document.getElementById('error-message').style.display = "";
                    document.getElementById('retry-message').style.display = "";
                }
            }
        });
}

function saveAuthenticationPassword()
{
    var email = getURLParameter("email");
    var password = $('#authenticate-user-password').val().trim();

    if(password != '')
    {
        $.ajax({url: restURL, data: {'command':'saveAuthenticationPassword','email':email,'password':password}, type: 'post', async: true, success: function postResponse(returnData){
                    var info = JSON.parse(returnData);

                    if(info.status == "success")
                    {
                        window.location = "dashboard.html";
                    }
                }
            });
    }
}

function checkProjectDone()
{
    var projectID = getCookie("project_id");
    
    if(projectID != '')
    {
        setInterval(function(){
            
            $.ajax({url: restURL, data: {'command':'checkProjectDone','projectid':projectID}, type: 'post', async: true, success: function postResponse(returnData){
                    var info = JSON.parse(returnData);

                    if(info.status == "success")
                    {
                        if(info.completed == "yes")
                        {
                            window.location = "verify.html";
                        }
                    }
                }
            });
            
        },15000);
    }
}

function resendVerification()
{
    var email = getCookie("email");
    
    if(email != '')
    {    
        $.ajax({url: restURL, data: {'command':'resendUserVerification','email':email}, type: 'post', async: true, success: function postResponse(returnData){
                var info = JSON.parse(returnData);

                if(info.status == "success")
                {
                    showAlert("A new verification email has been sent. Please check your email.");
                }
            }
        });
    }
    else
    {
        showAlert("Error: We were unable to re-send your verification email.")
    }
}

function loadProjectDashboard()
{
    var username = getCookie("username");
    if(username != '')
    {    
        $.ajax({url: restURL, data: {'command':'getProjectDashboardData','username':username}, type: 'post', async: true, success: function postResponse(returnData){
                var info = JSON.parse(returnData);

                if(info.status == "success")
                {
                    var numProjects = parseInt(info.projectsCount);
                    var userFullName = info.userFullName;
                    
                    //Set the welcome message
                    $('#dashboard-user-full-name').html(userFullName);
                    
                    var finalOutput = "";
                    var colCounter = 0;
                    for(var i=0; i<numProjects; i++)
                    {
                        var entry = info.data[i];
                        
                        var projectID = entry.projectID;
                        var runDate = entry.runDate;
                        var percentComplete = parseFloat(entry.percentComplete);
                        var projectTitle = entry.projectTitle;
                        
                        var cardHTML = "";
                        var ulHTMLBefore = "";
                        var ulHTMLAfter = "";
                        if(colCounter == 0)
                        {
                            //Create a new row
                            ulHTMLBefore = "<ul class=\"row\">\n";
                            ulHTMLAfter = "";
                        }
                        else if(colCounter == 2)
                        {
                            //terminate the row
                            ulHTMLBefore = "";
                            ulHTMLAfter = "</ul>\n";
                        }
                        else
                        {
                            //No row HTML needed
                            ulHTMLBefore = "";
                            ulHTMLAfter = "";
                        }
                        
                        //Create a card and add it to the div
                        if(percentComplete == 100)
                        {
                            cardHTML += "<li class=\"col-lg-4 matchheight\">\n";
                            cardHTML += "<div class=\"project-cart-box box-shadow-ot\">\n";
                            cardHTML += "<div class=\"card-header\">\n";
                            cardHTML += "<h1 class=\"project_name_sort\"><a href=\"report.html?pid="+projectID+"\">"+projectTitle+"</a></h1>\n";
                            cardHTML += "</div>\n";
                            cardHTML += "<div class=\"card-box-detail card-box-detail-outer\">\n";
                            cardHTML += "<ul class=\"you-v-them\">\n";
                            cardHTML += "<li class=\"col-lg-5 text-right\">YOU</li>\n";
                            cardHTML += "<li class=\"col-lg-2 text-center\">vs</li>\n";
                            cardHTML += "<li class=\"col-lg-5 text-left\">THEM</li>\n";
                            cardHTML += "</ul>\n";
                            cardHTML += "<h2>REVEALED</h2>\n";
                            cardHTML += "</div>\n";
                            cardHTML += "<div class=\"card-box-bottom\">\n";
                            cardHTML += "<div class=\"project-date-card date_sort\"><i class=\"eagle-icon\"></i>"+runDate+"</div>\n";
                            cardHTML += "<a href=\"report.html?pid="+projectID+"\" class=\"project-status-card  project_status_sort\"> VIEW REPORT </a>\n";
                            cardHTML += "</div>\n";
                            cardHTML += "</div>\n";
                            cardHTML += "</li>\n";
                        }
                        else
                        {
                            cardHTML += "<li class=\"col-lg-4 matchheight\">\n";
                            cardHTML += "<div class=\"project-cart-box box-shadow-ot\">\n";
                            cardHTML += "<div class=\"card-header\">\n";
                            cardHTML += "<h1 class=\"project_name_sort\"><a href=\"#\">"+projectTitle+"</a></h1>\n";
                            cardHTML += "</div>\n";
                            cardHTML += "<div class=\"report-processing card-box-detail card-box-detail-outer\">\n";
                            cardHTML += "<div class=\"blink\">\n";
                            cardHTML += "<img src=\"images/eagle-holder.png\" alt=\"\">\n";
                            cardHTML += "<h2> PROCESSING</h2>\n";
                            cardHTML += "</div>\n";
                            cardHTML += "</div>\n";
                            cardHTML += "<div class=\"card-box-bottom\">\n";
                            cardHTML += "<div class=\"progress\">\n";
                            cardHTML += "<div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\""+percentComplete+"\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:"+percentComplete+"%\">\n";
                            cardHTML += "<span class=\"sr-only\">"+percentComplete+"% Complete</span>\n";
                            cardHTML += "</div>\n";
                            cardHTML += "</div>\n";
                            cardHTML += "</div>\n";
                            cardHTML += "</div>\n";
                            cardHTML += "</li>";
                        }
                        
                        finalOutput += ulHTMLBefore+cardHTML+ulHTMLAfter;
                        
                        colCounter++;
                        if(colCounter == 3)
                        {
                            colCounter = 0;
                        }
                        
                        if(i == (numProjects-1) && colCounter != 0)
                        {
                            //If it's the last project and you haven't finished the row, terminate the UL
                            finalOutput += "</ul>";
                        }
                    }
                    $('#card-container').html(finalOutput);
                }
            }
        });
    }
    else
    {
        window.location = "index.html";
    }
}

function createNewReport()
{
    var clientURL = $('#client-url').val();
    var competitorURL1 = $('#competitor-url-1').val();
    var competitorURL2 = $('#competitor-url-2').val();
    var competitorURL3 = $('#competitor-url-3').val();
    var competitorURL4 = $('#competitor-url-4').val();
    var competitorURL5 = $('#competitor-url-5').val();
    
    url_validate = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    //url_validate = /(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    
    if(clientURL.trim() == '')
    {
        $('#client-url').attr('placeholder', 'Please enter your URL');
        $('#client-url').parent('li').addClass('invalid');
        $('#client-url').parent('li').removeClass('valid');
        return false;
    }
    else if(competitorURL1.trim() == '')
    {
        $('#competitor-url-1').attr('placeholder', 'Please enter at least one competitor URL');
        $('#competitor-url-1').parent('li').addClass('invalid');
        $('#competitor-url-1').parent('li').removeClass('valid');
        return false;
    }
    else if(!url_validate.test(clientURL))
    {
        /*$('#client-url').attr('placeholder', 'You must enter a proper URL');
        $('#client-url').parent('li').addClass('invalid');
        $('#client-url').parent('li').removeClass('valid');*/
        return false;
    }
    else if(!url_validate.test(competitorURL1))
    {
        /*$('#competitor-url-1').attr('placeholder', 'Please enter at least one competitor URL');
        $('#competitor-url-1').parent('li').addClass('invalid');
        $('#competitor-url-1').parent('li').removeClass('valid');*/
        return false;
    }
    else if(!url_validate.test(competitorURL2) && competitorURL2.trim() != "")
    {
        /*$('#competitor-url-2').attr('placeholder', 'Please enter at least one competitor URL');
        $('#competitor-url-2').parent('li').addClass('invalid');
        $('#competitor-url-2').parent('li').removeClass('valid');*/
        return false;
    }
    else if(!url_validate.test(competitorURL3) && competitorURL3.trim() != "")
    {
        /*$('#competitor-url-3').attr('placeholder', 'Please enter at least one competitor URL');
        $('#competitor-url-3').parent('li').addClass('invalid');
        $('#competitor-url-3').parent('li').removeClass('valid');*/
        return false;
    }
    else if(!url_validate.test(competitorURL4) && competitorURL4.trim() != "")
    {
        /*$('#competitor-url-4').attr('placeholder', 'Please enter at least one competitor URL');
        $('#competitor-url-4').parent('li').addClass('invalid');
        $('#competitor-url-4').parent('li').removeClass('valid');*/
        return false;
    }
    else if(!url_validate.test(competitorURL5) && competitorURL5.trim() != "")
    {
        /*$('#competitor-url-5').attr('placeholder', 'Please enter at least one competitor URL');
        $('#competitor-url-5').parent('li').addClass('invalid');
        $('#competitor-url-5').parent('li').removeClass('valid');*/
        return false;
    }
    else
    {
        //alert("success");
        createRankHackerProjectFromDashboard(clientURL.trim(),competitorURL1.trim(),competitorURL2.trim(),competitorURL3.trim(),competitorURL4.trim(),competitorURL5.trim());
    }
}

function loadProjectData()
{
    var projectID = getURLParameter("pid");
    if(projectID != '')
    {
        $.ajax({url: restURL, data: {'command':'getProjectData','projectid':projectID}, type: 'post', async: true, success: function postResponse(returnData){
                var info = JSON.parse(returnData);

                if(info.status == "success")
                {
                    //Fill in the project data here
                    var entry = info.data[0];
                    
                    var userFullName = entry.userFullName;
                    var runDate = entry.runDate;
                    var projectTitle = entry.projectTitle;
                    var competitor1ID = entry.competitor1ID;
                    var competitor1URL = entry.competitor1URL;
                    var competitor2ID = entry.competitor2ID;
                    var competitor2URL = entry.competitor2URL;
                    var competitor3ID = entry.competitor3ID;
                    var competitor3URL = entry.competitor3URL;
                    var competitor4ID = entry.competitor4ID;
                    var competitor4URL = entry.competitor4URL;
                    var competitor5ID = entry.competitor5ID;
                    var competitor5URL = entry.competitor5URL;
                    var monthsList = entry.monthsList;
                    var clientCounts = entry.clientCounts;
                    var competitorCounts = entry.competitorCounts;
                    
                        var clientMonthlyNumbers = clientCounts.split(",");
                        var clientTotalNum = 0;
                        for(var i=0; i<clientMonthlyNumbers.length; i++)
                        {
                            clientTotalNum += parseInt(clientMonthlyNumbers[i]);
                        }
                        var clientMonthlyNum = Math.ceil(clientTotalNum/12);
                        var clientWeeklyNum = Math.ceil(clientMonthlyNum/4);
                    
                        var competitorMonthlyNumbers = competitorCounts.split(",");
                        var competitorTotalNum = 0;
                        for(var i=0; i<competitorMonthlyNumbers.length; i++)
                        {
                            competitorTotalNum += parseInt(competitorMonthlyNumbers[i]);
                        }
                        var competitorMonthlyNum = Math.ceil(competitorTotalNum/12);
                        var competitorWeeklyNum = Math.ceil(competitorMonthlyNum/4);
                    
                    var blogCount = parseFloat(entry.blog);
                    var pressReleaseCount = parseFloat(entry.pressRelease);
                    var directoryCount = parseFloat(entry.articleDirectory)+parseFloat(entry.webDirectory);
                    var forumCount = parseFloat(entry.forum);
                    var imageCount = 0;
                    var infographicsCount = 0;
                    var ecommerceCount = parseFloat(entry.ecommerce);
                    var wikiCount = parseFloat(entry.wiki);
                    
                    //Update the elements on the report
                    $('#reportTitleSmall').html('> '+projectTitle);
                    $('#preparedFor').html(userFullName);
                    $('#reportDate').html(runDate);
                    $('#preparedFor').html(userFullName);
                    $('#preparedFor').html(userFullName);
                    $('#preparedFor').html(userFullName);
                    $('#preparedFor').html(userFullName);
                    $('#preparedFor').html(userFullName);
                    $('#preparedFor').html(userFullName);
                    $('#preparedFor').html(userFullName);
                    $('#preparedFor').html(userFullName);
                    $('#preparedFor').html(userFullName);
                    $('#preparedFor').html(userFullName);
                }
            }
        });
    }
    else
    {
        window.location = "dashboard.html";
    }
}