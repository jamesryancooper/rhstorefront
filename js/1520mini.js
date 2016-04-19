function getURLParameter(name)
{
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

function authorizeUser()
{
    var username = getURLParameter("username");
    var userFullName = getURLParameter("fullname");
    var destURL = getURLParameter("destination");
    var projectURL = getURLParameter("projecturl");
    
    var projectID = getURLParameter("pid");
    var clientURL = getURLParameter("client");
    var competitor1 = getURLParameter("c1");
    var competitor2 = getURLParameter("c2");
    var competitor3 = getURLParameter("c3");
    var competitor4 = getURLParameter("c4");
    var competitor5 = getURLParameter("c5");
    
    var qs = "";
    if(typeof projectURL !== "undefined" && projectURL !== "null" && projectURL !== null)
    {
        qs = "?purl="+projectURL;
    }
    if(typeof clientURL !== "undefined" && clientURL !== "null" && clientURL !== null)
    {
        qs = "?purl="+clientURL;
    }
    if(typeof projectID !== "undefined" && projectID !== "null" && projectID !== null)
    {
        qs = "?pid="+projectID+"&purl="+clientURL+"&c0="+clientURL+"&c1="+competitor1+"&c2="+competitor2+"&c3="+competitor3+"&c4="+competitor4+"&c5="+competitor5;
    }
    
    document.cookie = "username="+username;
    document.cookie = "userFullName="+userFullName;
    window.location = destURL+".html"+qs;
}