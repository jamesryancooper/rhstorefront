function getURLParameter(name)
{
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

function authorizeUser()
{
    var username = getURLParameter("username");
    var userFullName = getURLParameter("fullname");
    var destURL = getURLParameter("destination");
    
    document.cookie = "username="+username;
    document.cookie = "userFullName="+userFullName;
    window.location = destURL+".html";
}