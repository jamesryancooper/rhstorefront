//////////////////////////////////////////////////////  //
//    EVENTS ON PAGE LOADED                             //
//////////////////////////////////////////////////////  //

$(window).load(function () { // makes sure the whole site is loaded
	"use strict";

	//$('#loading').fadeOut(); // will first fade out the loading animation
	//$('#preloader').delay(100).fadeOut('slow'); // will fade out the white DIV that covers the website.
	//$("body").removeClass("page-loading");
	return false;

});

//////////////////////////////////////////////////////  //
//    BAR CHART                                         //
//////////////////////////////////////////////////////  //
function drawCharts(annualData, monthlyData, weeklyData) {
    
        var userData1 = new Array(12);
        var competitorData1 = new Array(12);
        var datesData = new Array(12);

        var currentDate = new Date();
        currentDate.setDate(1);
        
        for(var e=0; e<annualData.length; e++)
        {
            var tempData = annualData[e].split(":");
            userData1[e] = parseInt(tempData[0]);
            competitorData1[e] = parseInt(tempData[1]);
            
            var newdate = new Date(currentDate);
            newdate.setMonth(newdate.getMonth() - (11-e));
            datesData[e] = $.datepicker.formatDate("M y", new Date(newdate));
        }

        var data1 = google.visualization.arrayToDataTable([
                ['Month', 'You', 'Competitors'],
                [datesData[0], userData1[0], competitorData1[0]],
                [datesData[1], userData1[1], competitorData1[1]],
                [datesData[2], userData1[2], competitorData1[2]],
                [datesData[3], userData1[3], competitorData1[3]],
                [datesData[4], userData1[4], competitorData1[4]],
                [datesData[5], userData1[5], competitorData1[5]],
                [datesData[6], userData1[6], competitorData1[6]],
                [datesData[7], userData1[7], competitorData1[7]],
                [datesData[8], userData1[8], competitorData1[8]],
                [datesData[9], userData1[9], competitorData1[9]],
                [datesData[10], userData1[10], competitorData1[10]],
                [datesData[11], userData1[11], competitorData1[11]]
        ]);
        var options1 = {
                vAxis: {title: "Pieces of Content"},
                hAxis: {title: "Month"},
                width: '1050',
                height: '300',
                colors: ['#14fdce', '#CBC7C7'],
                backgroundColor: {fill: 'transparent'},
                seriesType: "area",
                series: {
                        0: {type: "area"},
                        1: {type: "area"}
                }
        };

        var chartAnnual = new google.visualization.ComboChart(document.getElementById('chart-annual'));
        chartAnnual.draw(data1, options1);


        // Some raw data (not necessarily accurate)
        var userData2 = new Array(4);
        var competitorData2 = new Array(4);
        for(var e=0; e<monthlyData.length; e++)
        {
            var tempData = monthlyData[e].split(":");
            userData2[e] = parseInt(tempData[0]);
            competitorData2[e] = parseInt(tempData[1]);
        }

        var data2 = google.visualization.arrayToDataTable([
                ['Week', 'You', 'Competitors'],
                ['Week 1', userData2[0], competitorData2[0]],
                ['Week 2', userData2[1], competitorData2[1]],
                ['Week 3', userData2[2], competitorData2[2]],
                ['Week 4', userData2[3], competitorData2[3]]
        ]);
        var options2 = {
                vAxis: {title: "Pieces of Content"},
                hAxis: {title: "Week"},
                width: '1050',
                height: '300',
                colors: ['#14fdce', '#CBC7C7'],
                backgroundColor: {fill: 'transparent'},
                seriesType: "area",
                series: {
                        0: {type: "area"},
                        1: {type: "area"}
                }
        };

        var chartMonthly = new google.visualization.ComboChart(document.getElementById('chart-month'));
        chartMonthly.draw(data2, options2);


        // Some raw data (not necessarily accurate)
        var userData3 = new Array(7);
        var competitorData3 = new Array(7);
        for(var e=0; e<weeklyData.length; e++)
        {
            var tempData = weeklyData[e].split(":");
            userData3[e] = parseInt(tempData[0]);
            competitorData3[e] = parseInt(tempData[1]);
        }

        var data3 = google.visualization.arrayToDataTable([
                ['Day', 'You', 'Competitors'],
                ['Day 1', userData3[0], competitorData3[0]],
                ['Day 2', userData3[1], competitorData3[1]],
                ['Day 3', userData3[2], competitorData3[2]],
                ['Day 4', userData3[3], competitorData3[3]],
                ['Day 5', userData3[4], competitorData3[4]],
                ['Day 6', userData3[5], competitorData3[5]],
                ['Day 7', userData3[6], competitorData3[6]]
        ]);
        var options3 = {
                vAxis: {title: "Pieces of Content"},
                hAxis: {title: "Day"},
                width: '1050',
                height: '300',
                colors: ['#14fdce', '#CBC7C7'],
                backgroundColor: {fill: 'transparent'},
                seriesType: "area",
                series: {
                        0: {type: "area"},
                        1: {type: "area"}
                }
        };

        var chartWeekly = new google.visualization.ComboChart(document.getElementById('chart-week'));
        chartWeekly.draw(data3, options3);
}

(function() {
	//////////////////////////////////////////////////////  //
	//    DYNAMIC CHART SWAP                                //
	//////////////////////////////////////////////////////  //

		//////////////////////////////////////////////////////  //
		//    CLEAR TIMEOUTS	  		            		    //
		//////////////////////////////////////////////////////  //
		var clearChart1;
		var clearChart2;
		var clearChart3;

		function stopTimer() {
			clearTimeout(clearChart1);
			clearTimeout(clearChart2);
			clearTimeout(clearChart3);
		}

		//////////////////////////////////////////////////////  //
		//    REGISTRATION  & LOGIN MODAL		  		        //
		//////////////////////////////////////////////////////  //
		var annualBox = $("#box-annual");
		var monthBox = $("#box-month");
		var weekBox = $("#box-week");
		var annualChart = $(".chart-annual");
		var monthChart = $(".chart-month");
		var weekChart = $(".chart-week");
                
                /*var annualBox = document.getElementById('box-annual');
                var monthBox = document.getElementById('box-month');
                var weekBox = document.getElementById('box-week');
                var annualChart = document.getElementById('chart-annual');
                var monthChart = document.getElementById('chart-month');
                var weekChart = document.getElementById('chart-week');*/

		//////////////////////////////////////////////////////  //
		//    ANNUAL			  		            		    //
		//////////////////////////////////////////////////////  //
		$(annualBox).on("mouseenter", function() {

			$(document)

				.queue('annualSwap', function(next) {
					//console.log("annual hover");
					$(monthChart).addClass("noopacity");
					$(weekChart).addClass("noopacity");
					clearChart1 = setTimeout(next, 50); // delay

				})

				.queue('annualSwap', function(next) {

					$(monthChart).addClass("nodisplay");
					$(weekChart).addClass("nodisplay");
					$(annualChart).removeClass("nodisplay");
					clearChart2 = setTimeout(next, 50); // delay

				})

				.queue('annualSwap', function(next) {

					$(annualChart).removeClass("noopacity");
					clearChart3 = setTimeout(next, 50); // delay

				})

				.queue('annualSwap', function(){
					stopTimer();
				})

				.dequeue('annualSwap');

		});

		//////////////////////////////////////////////////////  //
		//    MONTHLY			  		            		    //
		//////////////////////////////////////////////////////  //
		$(monthBox).on("mouseenter", function() {

			$(document)

				.queue('monthSwap', function(next) {
					//console.log("month hover");
					$(annualChart).addClass("noopacity");
					$(weekChart).addClass("noopacity");
					clearChart1 = setTimeout(next, 50); // delay

				})

				.queue('monthSwap', function(next) {

					$(annualChart).addClass("nodisplay");
					$(weekChart).addClass("nodisplay");
					$(monthChart).removeClass("nodisplay");
					clearChart2 = setTimeout(next, 50); // delay

				})

				.queue('monthSwap', function(next) {

					$(monthChart).removeClass("noopacity");
					clearChart3 = setTimeout(next, 50); // delay

				})

				.queue('monthSwap', function(){
					stopTimer();
				})

				.dequeue('monthSwap');

		});

		//////////////////////////////////////////////////////  //
		//    WEEKLY			  		            		    //
		//////////////////////////////////////////////////////  //
		$(weekBox).on("mouseenter", function() {

			$(document)

				.queue('weekSwap', function(next) {
					//console.log("week hover");
					$(monthChart).addClass("noopacity");
					$(annualChart).addClass("noopacity");
					clearChart1 = setTimeout(next, 50); // delay
				})

				.queue('weekSwap', function(next) {

					$(monthChart).addClass("nodisplay");
					$(annualChart).addClass("nodisplay");
					$(weekChart).removeClass("nodisplay");
					clearChart2 = setTimeout(next, 50); // delay

				})

				.queue('weekSwap', function(next) {

					$(weekChart).removeClass("noopacity");
					clearChart3 = setTimeout(next, 50); // delay
				})

				.queue('weekSwap', function(){
					stopTimer();
				})

				.dequeue('weekSwap');

		});
})();

//////////////////////////////////////////////////////  //
//    EVENTS ON DOCUMENT READY                          //
//////////////////////////////////////////////////////  //
$(document).ready(function() {
	"use strict";

	//////////////////////////////////////////////////////  //
	//    SMOOTH SCROLL FIX			            		    //
	//////////////////////////////////////////////////////  //
	$(function() {

		$('a[href*=#]:not([href=#])').filter(":not(#tabs *)").click(function() {

			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

				if (target.length) {
				  $('html,body').animate({
					scrollTop: target.offset().top
				  }, 1000);
				  return false;
				}

			}

		});

  	});

	//////////////////////////////////////////////////////  //
	//    BUTTONS DEPRESSED FIX		            		    //
	//////////////////////////////////////////////////////  //
	$(".btn, #navbar .navbar-nav *").mouseup(function(){$(this).blur();});

	//////////////////////////////////////////////////////  //
	// SHOW MODAL
	//////////////////////////////////////////////////////  //
	$('#data.modal').on('show.bs.modal', function (e) {

		var button = e.relatedTarget;

		//if($('#data').hasClass('no-modal')) {
			//console.log("here");
			//e.stopPropegation();
			//$('intro-form').validator('validate');

		//} else {

			$('.blurable').addClass('blur');

			$('#crt-output').removeClass('output');
			$('#crt-glitch').removeClass('glitch');

			$('.modal.fadeable')
				.removeClass('animated fadeOut')
				.addClass('animated fadeIn');

			$('.header-centered.fadeable')
				.removeClass('animated fadeIn')
				.addClass('animated fadeOut');

		//}

	});

	//////////////////////////////////////////////////////  //
	// HIDE MODAL
	//////////////////////////////////////////////////////  //
	$('#data.modal').on('hide.bs.modal', function () {

                document.getElementById('competitorsListAll').innerHTML = "";
                document.getElementById('keyword').value = "";
                document.getElementById('location').value = "";
                document.getElementById('projectid').value = "0";
                document.getElementById('georankerdone').value = "0";
                document.getElementById('ahrefsdone').value = "0";
                document.getElementById('userahrefsdone').value = "0";
                document.getElementById('chartdatareceived').value = "0";
                document.getElementById("loadingDiv").style.display = "";
                document.getElementById("loading").style.display = "";
                
                $('#intro-form').removeClass('has-success');

		$('.modal.fadeable')
			.removeClass('animated fadeIn')
			.addClass('animated fadeOut');

		$('.header-centered.fadeable')
			.removeClass('animated fadeOut')
			.addClass('animated fadeIn');

		$('.blurable').removeClass('blur');

		$('#crt-output').addClass('output');
		$('#crt-glitch').addClass('glitch');

	});

	//////////////////////////////////////////////////////  //
	//    DYNAMIC MODAL CONTENT                             //
	//////////////////////////////////////////////////////  //
    $(function() {

		//////////////////////////////////////////////////////  //
		//    CLEAR TIMEOUTS	  		            		    //
		//////////////////////////////////////////////////////  //
                var clearMe0;
		var clearMe1;
		var clearMe2;
		var clearMe3;
		var clearMe4;
		var clearMe5;
		var clearMe6;

		function stopTimer() {
                        clearTimeout(clearMe0);
			clearTimeout(clearMe1);
			clearTimeout(clearMe2);
			clearTimeout(clearMe3);
			clearTimeout(clearMe4);
			clearTimeout(clearMe5);
			clearTimeout(clearMe6);
		}

		//////////////////////////////////////////////////////  //
		//    REGISTRATION  & LOGIN MODAL		  		        //
		//////////////////////////////////////////////////////  //
		var login = $("#login");
		var remind = $("#remind");
		var register = $("#register");
		var email = $("#email");
		var gotoRegister = $(".gotoRegister");
		var gotoLogin = $(".gotoLogin");
		var gotoRemind = $(".gotoRemind");
		var gotoEmailReport = $("#gotoEmailReport");

		//////////////////////////////////////////////////////  //
		//    REGISTER			  		            		    //
		//////////////////////////////////////////////////////  //
		$(gotoRegister).on("click", function() {

			$(document)

				.queue('register', function(next) {

					$(email).addClass("noopacity");
					$(".email").addClass("noopacity");
					$(login).addClass("noopacity");
					$(remind).addClass("noopacity");
					$(".remind").addClass("noopacity");
					clearMe1 = setTimeout(next, 300); // delay
					//console.log("step 2");
				})

				.queue('register', function(next) {

					$(email).addClass("nodisplay");
					$(".email").addClass("nodisplay");
					$(login).addClass("nodisplay");
					$(remind).addClass("nodisplay");
					$(".remind").addClass("nodisplay");
					$(register).removeClass("nodisplay");
					$(".login-register").removeClass("nodisplay");
					$("p.gotoRegister").addClass("noopacity");
					clearMe2 = setTimeout(next, 300); // delay
					//console.log("step 3");

				})

				.queue('register', function(next) {

					$(register).removeClass("noopacity");
					$(".login-register").removeClass("noopacity");
					$("p.gotoRegister").addClass("nodisplay");
					$("p.gotoLogin").removeClass("nodisplay");
					clearMe3 = setTimeout(next, 300); // delay
					//console.log("step 4");
				})

				.queue('register', function(next) {

					$("p.gotoLogin").removeClass("noopacity");
					clearMe4 = setTimeout(next, 300); // delay
					//console.log("step 5");
				})

				.queue('register', function(){
					stopTimer();
					//console.log("step 6");
				})

				.dequeue('register');

		});

		//////////////////////////////////////////////////////  //
		//    LOGIN         	  		            		    //
		//////////////////////////////////////////////////////  //
		$(gotoLogin).on("click", function() {

			$(document)

				.queue('login', function(next) {

					$(email).addClass("noopacity");
					$(".email").addClass("noopacity");
					$(register).addClass("noopacity");
					$(remind).addClass("noopacity");
					$(".remind").addClass("noopacity");
					clearMe1 = setTimeout(next, 300); // delay

				})

				.queue('login', function(next) {

					$(email).addClass("nodisplay");
					$(".email").addClass("nodisplay");
					$(register).addClass("nodisplay");
					$(remind).addClass("nodisplay");
					$(".remind").addClass("nodisplay");
					$(login).removeClass("nodisplay");
					$(".login-register").removeClass("nodisplay");
					$("p.gotoLogin").addClass("noopacity");
					clearMe2 = setTimeout(next, 300); // delay

				})

				.queue('login', function(next) {

					$(login).removeClass("noopacity");
					$(".login-register").removeClass("noopacity");
					$("p.gotoLogin").addClass("nodisplay");
					$("p.gotoRegister").removeClass("nodisplay");
					clearMe3 = setTimeout(next, 300); // delay

				})

				.queue('login', function(next) {

					$("p.gotoRegister").removeClass("noopacity");
					clearMe4 = setTimeout(next, 300); // delay

				})

				.queue('login', function(){
					stopTimer();
				})

				.dequeue('login');

		});

		//////////////////////////////////////////////////////  //
		//    REMIND         	  		            		    //
		//////////////////////////////////////////////////////  //
		$(gotoRemind).on("click", function() {

			$(document)

				.queue('remind', function(next) {

					$(email).addClass("noopacity");
					$(".email").addClass("noopacity");
					$(register).addClass("noopacity");
					$(login).addClass("noopacity");
					$(".login-register").addClass("noopacity");
					clearMe1 = setTimeout(next, 300); // delay

				})

				.queue('remind', function(next) {

					$(email).addClass("nodisplay");
					$(".email").addClass("nodisplay");
					$(register).addClass("nodisplay");
					$(login).addClass("nodisplay");
					$(".login-register").addClass("nodisplay");
					$("p.gotoLogin").addClass("noopacity");
					$(remind).removeClass("nodisplay");
					$(".remind").removeClass("nodisplay");
					clearMe2 = setTimeout(next, 300); // delay

				})

				.queue('remind', function(next) {

					$("p.gotoLogin").addClass("nodisplay");
					$(remind).removeClass("noopacity");
					$(".remind").removeClass("noopacity");
					$("p.gotoRegister").removeClass("nodisplay");
					clearMe3 = setTimeout(next, 300); // delay

				})

				.queue('remind', function(next) {

					$("p.gotoRegister").removeClass("noopacity");
					clearMe4 = setTimeout(next, 300); // delay

				})

				.queue('remind', function(){
					stopTimer();
				})

				.dequeue('remind');

		});

		//////////////////////////////////////////////////////  //
		//    EMAIL         	  		            		    //
		//////////////////////////////////////////////////////  //
		$(gotoEmailReport).on("click", function() {

			$(document)

				.queue('email', function(next) {

					$(register).addClass("noopacity");
					$(login).addClass("noopacity");
					$(remind).addClass("noopacity");
					$(".remind").addClass("noopacity");
					$(".login-register").addClass("noopacity");
					clearMe1 = setTimeout(next, 300); // delay

				})

				.queue('email', function(next) {

					$(register).addClass("nodisplay");
					$(login).addClass("nodisplay");
					$(remind).addClass("nodisplay");
					$(".remind").addClass("nodisplay");
					$(".login-register").addClass("nodisplay");
					$("p.gotoLogin").addClass("noopacity");
					$(email).removeClass("nodisplay");
					$(".email").removeClass("nodisplay");
					clearMe2 = setTimeout(next, 300); // delay

				})

				.queue('email', function(next) {

					$("p.gotoLogin").addClass("nodisplay");
					$(email).removeClass("noopacity");
					$(".email").removeClass("noopacity");
					$("p.gotoRegister").removeClass("nodisplay");
					clearMe3 = setTimeout(next, 300); // delay

				})

				.queue('email', function(next) {

					$("p.gotoRegister").removeClass("noopacity");
					clearMe4 = setTimeout(next, 300); // delay

				})

				.queue('email', function(){
					stopTimer();
				})

				.dequeue('email');

		});

		//////////////////////////////////////////////////////  //
		//    COMPARISON         	  		            		//
		//////////////////////////////////////////////////////  //
		var comparison = $("#comparison");
		var showComparison = $(".showComparison");
		var gotoComparison = $("#gotoComparison");
		var userAnalyzer = $("#user-analyzer");

		$(gotoComparison).on("click", function() {

		   $(document)

				.queue('comparison', function(next) {

					$(inventory).addClass("animated fadeOut");
					$(user).addClass("animated fadeOut");
					clearMe1 = setTimeout(next, 300); // delay

				})

				.queue('comparison', function(next) {

					$(inventory).addClass("noopacity nodisplay");
					$(user).addClass("noopacity nodisplay");
					$(userAnalyzer).addClass("animated fadeIn");
					clearMe2 = setTimeout(next, 300); // delay

				})

				.queue('comparison', function(next) {

					$(userAnalyzer).removeClass("noopacity nodisplay");
                                        $('html, body').animate({
                                            scrollTop: $(userAnalyzer).offset().top
                                            }, 300);
                                        //var position = $(userAnalyzer).position();
                                        //scroll(0,position.top);
                                        //$(userAnalyzer).scrollTop($(userAnalyzer)[0].scrollHeight);

                                        //Wait until the Ahrefs data is ready
                                        var holdOn3 = window.setInterval(function(){

                                            var userAhrefsDone = document.getElementById("userahrefsdone").value;

                                            var inventoryCount01 = document.getElementById('inventory-count01').innerHTML;
                                            var inventoryCount02 = document.getElementById('inventory-count02').innerHTML;
                                            var inventoryCount03 = document.getElementById('inventory-count03').innerHTML;

                                            if(userAhrefsDone === "1")
                                            {
                                                //Clear the interval and load the competitors
                                                window.clearInterval(holdOn3);

                                                //var projectID = document.getElementById('projectid').value;

                                                getUserAhrefsData(function(countResults,weeklyResults,monthlyResults,annualResults){

                                                var resultData = countResults.split("|");
                                                var weeklyData = weeklyResults.split("|");
                                                var monthlyData = monthlyResults.split("|");
                                                var annualData = annualResults.split("|");

                                                //Set the chart data
                                                /*document.getElementById('annualdata').value = annualData;
                                                document.getElementById('monthlydata').value = monthlyData;
                                                document.getElementById('weeklydata').value = weeklyData;*/
                                                //drawCharts();

                                                //Now let's draw the charts
                                                drawCharts(annualData, monthlyData, weeklyData);

                                                    //Set the inventory count stuff
                                                    //////////////////////////////////////////////////////  //
                                                    //    COUNTUP			  		            		    //
                                                    //////////////////////////////////////////////////////  //
                                                    var options = {
                                                            useEasing : true,
                                                            useGrouping : true,
                                                            separator : ',',
                                                            decimal : '.',
                                                            prefix : '',
                                                            suffix : ''
                                                    };

                                                    //alert("setting funcs");

                                                    //var inventoryCount01 = new countUp("inventory-count01", Math.round(resultData[0]*0.5), resultData[0], 0, 3, options);
                                                    //var inventoryCount02 = new countUp("inventory-count02", Math.round(resultData[1]*0.5), resultData[1], 0, 3, options);
                                                    //var inventoryCount03 = new countUp("inventory-count03", Math.round(resultData[2]*0.5), resultData[2], 0, 3, options);

                                                    var count01 = new countUp("count01", Math.round(resultData[0]*0.5), resultData[0]-inventoryCount01, 0, 3, options);
                                                    var count02 = new countUp("count02", Math.round(resultData[1]*0.5), resultData[1]-inventoryCount02, 0, 3, options);
                                                    var count03 = new countUp("count03", Math.round(resultData[2]*0.5), resultData[2]-inventoryCount03, 0, 3, options);

                                                    //alert("displaying divs");


                                                    //alert("starting funcs");
                                                    //inventoryCount01.start();
                                                    //inventoryCount02.start();
                                                    //inventoryCount03.start();
                                                    //var count01 = new countUp("count01", -3259, -3289, 0, 3, options);
                                                    //var count02 = new countUp("count02", -432, -486, 0, 3, options);
                                                    //var count03 = new countUp("count03", -12, -6, 0, 3, options);

                                                    //$('#inventory-count01').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {if (isInView) {inventoryCount01.start();} return false;});
                                                    //$('#inventory-count02').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {if (isInView) {inventoryCount02.start();} return false;});
                                                    //$('#inventory-count03').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {if (isInView) {inventoryCount03.start();} return false;});
                                                    $('#count01').on('inview', function(event, isInView, visiblePartX, visiblePartY) {if (isInView) {count01.start();} return false;});
                                                    $('#count02').on('inview', function(event, isInView, visiblePartX, visiblePartY) {if (isInView) {count02.start();} return false;});
                                                    $('#count03').on('inview', function(event, isInView, visiblePartX, visiblePartY) {if (isInView) {count03.start();} return false;});

                                                    //Show the charts and suppress the analyzing spinner
                                                    document.getElementById('user-analyzer').style.display = "none";
                                                    document.getElementById('comparison').style.display = "block";
                                                });

                                                clearMe3 = setTimeout(next, 300); // delay
                                            }
                                            else
                                            {
                                                //Do nothing
                                            }
                                        },2500);

					//clearMe3 = setTimeout(next, 1000); // delay

				})

				.queue('comparison', function(next) {

					$(userAnalyzer).removeClass("animated fadeIn");
					$(userAnalyzer).addClass("animated fadeOut");
					clearMe4 = setTimeout(next, 300); // delay

				})

				.queue('comparison', function(next) {

					$(userAnalyzer).addClass("noopacity nodisplay");
					$(comparison).addClass("animated fadeIn");
					clearMe5 = setTimeout(next, 300); // delay

				})

				.queue('comparison', function(next) {

					$(comparison).removeClass("noopacity nodisplay");
					clearMe6 = setTimeout(next, 300); // delay

				})

				.queue('comparison', function(){
					  stopTimer();
					  //console.log("comparison queue is done");
				 })

				.dequeue('comparison');

		});

		return false;

    });

//////////////////////////////////////////////////////  //
//    DOCUMENT READY: EVENTS ON MOBILE                  //
//////////////////////////////////////////////////////  //
  if ($(window).width() < 768) {
    
    ///// DON'T SCROLL ON TABS
    $('#navbar .nav a').filter(":not(#tabs *)").on('click', function(){
      $("#navbar-header .navbar-toggle").on("click");
      return false;
    });
    
  } // EVENTS ON MOBILE ENDS HERE

//////////////////////////////////////////////////////  //
//    DOCUMENT READY: EVENTS ON DESKTOP                 //
//////////////////////////////////////////////////////  // 
  if ($(window).width() > 768) {
    
    ///// SCROLL ANIMATIONS
    $('.anim-from-right').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        // element is visible in the viewport
        $(this).addClass('animated fadeInRight');
        $(this).css({'opacity' : '1'});
      }
       return false;
    });
    
    
    $('.anim-from-left').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        // element is visible in the viewport
        $(this).addClass('animated fadeInLeft');
        $(this).css({'opacity' : '1'});
      }
       return false;
    });
    
    
    $('.anim-fade-in').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        // element is visible in the viewport
        $(this).addClass('animated fadeIn');
        $(this).css({'opacity' : '1'});
      }
       return false;
    });

    $('.anim-fade-out').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        // element is invisible in the viewport
        $(this).addClass('animated fadeOut');
        $(this).css({'opacity' : '0'});
      }
       return false;
    });
	
    $('.anim-fade-down').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        // element is visible in the viewport
        $(this).addClass('animated fadeInDown');
        $(this).css({'opacity' : '1'});
      }
       return false;
    });
    
    $('.anim-fade-up').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        // element is visible in the viewport
        $(this).addClass('animated fadeInUp');
        $(this).css({'opacity' : '1'});
      }
       return false;
    });
    
    $('.anim-bounce').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        // element is visible in the viewport
        $(this).addClass('animated bounceIn');
        $(this).css({'opacity' : '1'});
      }
       return false;
    });
    
    $('.anim-bounce-left').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        // element is visible in the viewport
        $(this).addClass('animated bounceInLeft');
        $(this).css({'opacity' : '1'});
      }
       return false;
    });
    
    $('.anim-bounce-right').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        // element is visible in the viewport
        $(this).addClass('animated bounceInRight');
        $(this).css({'opacity' : '1'});
      }
       return false;
    });
    
    $('.anim-bounce-down').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        // element is visible in the viewport
        $(this).addClass('animated bounceInDown');
        $(this).css({'opacity' : '1'});
      }
       return false;
    });
    
    $('.anim-bounce-up').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        // element is visible in the viewport
        $(this).addClass('animated bounceInUp');
        $(this).css({'opacity' : '1'});
      }
       return false;
    });
    
    $('.anim-zoom-down').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        // element is visible in the viewport
        $(this).addClass('animated zoomInDown');
        $(this).css({'opacity' : '1'});
      }
       return false;
    });
    
    $('.anim-zoom-up').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        // element is visible in the viewport
        $(this).addClass('animated zoomInUp');
        $(this).css({'opacity' : '1'});
      }
       return false;
    });
    
  } // EVENTS ON DESKTOP ENDS HERE
  
}); // DOCUMENT READY ENDS HERE